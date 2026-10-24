// Outside-office viewer: reads the encrypted position published by the Mac mini and decrypts it on this phone.
// The key reaches the phone only through the pairing QR code (URL fragment, never sent to any server).
'use strict';
window.BK_REMOTE = true;
const PAIR_KEY = 'bk_pair', ENV_KEY = 'bk_env';
const b64d = s => { s = s.replace(/-/g, '+').replace(/_/g, '/'); s += '='.repeat((4 - s.length % 4) % 4); return Uint8Array.from(atob(s), c => c.charCodeAt(0)); };
const cat = (...a) => { const o = new Uint8Array(a.reduce((n, x) => n + x.length, 0)); let i = 0; for (const x of a) { o.set(x, i); i += x.length; } return o; };

function getPair() { try { return JSON.parse(localStorage.getItem(PAIR_KEY) || 'null'); } catch (e) { return null; } }
function unpairPhone() { try { localStorage.removeItem(PAIR_KEY); localStorage.removeItem(ENV_KEY); } catch (e) {} }

// "#p=<base64url JSON {u, k}>" from the pairing QR. Kept in the address bar in Safari so "Add to Home Screen" carries it
// into the home-screen app (which has its own storage); removed from the address bar once running from the home screen.
function takePairingFromUrl() {
  const m = location.hash.match(/^#p=([\w-]+)$/); if (!m) return false;
  try {
    const p = JSON.parse(new TextDecoder().decode(b64d(m[1])));
    if (!p.u || !p.k) return false;
    localStorage.setItem(PAIR_KEY, JSON.stringify({u: p.u, k: p.k, n: p.n || ''}));
    localStorage.removeItem(ENV_KEY);
  } catch (e) { return false; }
  if (navigator.standalone) history.replaceState(null, '', location.pathname + '#home');
  return true;
}
const isStandalone = () => !!navigator.standalone || matchMedia('(display-mode: standalone)').matches;

async function decryptEnvelope(kb64, env) {
  const enc = new TextEncoder();
  const K = await crypto.subtle.importKey('raw', b64d(kb64), {name: 'HMAC', hash: 'SHA-256'}, false, ['sign']);
  const ek = new Uint8Array(await crypto.subtle.sign('HMAC', K, enc.encode('enc')));
  const mk = new Uint8Array(await crypto.subtle.sign('HMAC', K, enc.encode('mac')));
  const iv = b64d(env.iv), ct = b64d(env.ct);
  const vkey = await crypto.subtle.importKey('raw', mk, {name: 'HMAC', hash: 'SHA-256'}, false, ['verify']);
  if (!await crypto.subtle.verify('HMAC', vkey, b64d(env.mac), cat(enc.encode('v1'), iv, ct))) { const e = new Error('key'); e.status = 403; throw e; }
  const akey = await crypto.subtle.importKey('raw', ek, {name: 'AES-CTR'}, false, ['decrypt']);
  return JSON.parse(new TextDecoder().decode(await crypto.subtle.decrypt({name: 'AES-CTR', counter: iv, length: 128}, akey, ct)));
}

async function remoteLoad() {
  const p = getPair(); if (!p) { const e = new Error('not paired'); e.status = 401; throw e; }
  let env, offline = false;
  try {
    const r = await fetch(p.u + (p.u.includes('?') ? '&' : '?') + 't=' + Date.now(), {cache: 'no-store'});
    if (!r.ok) throw new Error('HTTP ' + r.status);
    env = await r.json();
    try { localStorage.setItem(ENV_KEY, JSON.stringify(env)); } catch (e) {}   // only the encrypted copy is kept
  } catch (e) {
    env = JSON.parse(localStorage.getItem(ENV_KEY) || 'null'); if (!env) throw e; offline = true;
  }
  const d = await decryptEnvelope(p.k, env); d._offline = offline; return d;
}

// ---- "position updated" notifications (Web Push; iPhone: only from the home-screen icon, iOS 16.4+)
const PUSH_KEY = 'bk_push';
if ('serviceWorker' in navigator) navigator.serviceWorker.register('sw.js').catch(() => {});
const pushSupported = () => 'serviceWorker' in navigator && 'PushManager' in window && 'Notification' in window;
function pushIsOn() {
  try { return !!localStorage.getItem(PUSH_KEY) && Notification.permission === 'granted'; } catch (e) { return false; }
}
// cfg = D.push from the decrypted position: {url, key (publishable), bucket, vapid}. The subscription is stored in a
// private Supabase bucket that the publishable key can only add to; the Mac mini reads it when Ahmad publishes.
async function enablePush(cfg) {
  if (!pushSupported()) { const e = new Error('install'); e.code = 'install'; throw e; }
  if (await Notification.requestPermission() !== 'granted') { const e = new Error('denied'); e.code = 'denied'; throw e; }
  const reg = await navigator.serviceWorker.ready;
  const sub = await reg.pushManager.getSubscription() || await reg.pushManager.subscribe({userVisibleOnly: true, applicationServerKey: b64d(cfg.vapid)});
  const id = (crypto.randomUUID ? crypto.randomUUID() : Date.now() + '-' + Math.random().toString(36).slice(2)) + '.json';
  const p = getPair() || {};
  const h = {'apikey': cfg.key, 'Content-Type': 'application/json'};
  if (!cfg.key.startsWith('sb_')) h.Authorization = 'Bearer ' + cfg.key;   // legacy anon JWT
  const r = await fetch(`${cfg.url}/storage/v1/object/${cfg.bucket}/${id}`, {method: 'POST', headers: h,
    body: JSON.stringify({endpoint: sub.endpoint, phone: p.n || '', at: new Date().toISOString()})});
  if (!r.ok) throw new Error('HTTP ' + r.status + ' ' + (await r.text()).slice(0, 120));
  localStorage.setItem(PUSH_KEY, JSON.stringify({id, endpoint: sub.endpoint}));
}
