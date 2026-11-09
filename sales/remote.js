// BANIYAS DAILY SALES - outside-office viewer. Reads the encrypted files published by the office server and decrypts them on this phone.
// The key reaches the phone only through the pairing QR code (URL fragment, never sent to any server). This page holds no figures.
'use strict';
(function () {
  const PAIR = 'bsa_pair', APP_V = '1';
  const $app = document.getElementById('app');
  const b64d = (s) => { s = s.replace(/-/g, '+').replace(/_/g, '/'); s += '='.repeat((4 - s.length % 4) % 4); return Uint8Array.from(atob(s), (c) => c.charCodeAt(0)); };
  const cat = (...a) => { const o = new Uint8Array(a.reduce((n, x) => n + x.length, 0)); let i = 0; for (const x of a) { o.set(x, i); i += x.length; } return o; };
  const getPair = () => { try { return JSON.parse(localStorage.getItem(PAIR) || 'null'); } catch (e) { return null; } };
  const standalone = () => !!navigator.standalone || matchMedia('(display-mode: standalone)').matches;
  const msg = (en, ar) => `<div class="loading" style="line-height:1.7"><b>${en}</b><br><span dir="rtl">${ar}</span></div>`;

  function takePairing() {
    const m = location.hash.match(/^#p=([\w-]+)$/); if (!m) return false;
    try {
      const p = JSON.parse(new TextDecoder().decode(b64d(m[1])));
      if (!p.u || !p.k) return false;
      localStorage.setItem(PAIR, JSON.stringify({ u: p.u, k: p.k, n: p.n || '' }));
      return true;
    } catch (e) { return false; }
  }

  async function decrypt(kb64, env) {
    const enc = new TextEncoder();
    const K = await crypto.subtle.importKey('raw', b64d(kb64), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
    const ek = new Uint8Array(await crypto.subtle.sign('HMAC', K, enc.encode('enc')));
    const mk = new Uint8Array(await crypto.subtle.sign('HMAC', K, enc.encode('mac')));
    const iv = b64d(env.iv), ct = b64d(env.ct);
    const vkey = await crypto.subtle.importKey('raw', mk, { name: 'HMAC', hash: 'SHA-256' }, false, ['verify']);
    if (!await crypto.subtle.verify('HMAC', vkey, b64d(env.mac), cat(enc.encode('v1'), iv, ct))) throw new Error('This phone needs a new QR code from the office.');
    const akey = await crypto.subtle.importKey('raw', ek, { name: 'AES-CTR' }, false, ['decrypt']);
    const gz = await crypto.subtle.decrypt({ name: 'AES-CTR', counter: iv, length: 128 }, akey, ct);
    return JSON.parse(await new Response(new Blob([gz]).stream().pipeThrough(new DecompressionStream('gzip'))).text());
  }

  let index = null, basket = null; const days = new Map();
  async function get(name) {
    const p = getPair();
    const r = await fetch(p.u + '/' + name + '?t=' + Date.now(), { cache: 'no-store' });
    if (!r.ok) throw new Error(name === 'index.json' ? 'The phone copy is not ready yet. Please try again shortly.' : 'This day is not available on the phone yet.');
    return decrypt(p.k, await r.json());
  }
  async function day(d) { if (!days.has(d)) days.set(d, await get('d-' + d + '.json')); return days.get(d); }

  window.BSA_REMOTE = async (path) => {
    const u = new URL(path, 'http://x'), q = u.searchParams;
    if (u.pathname === '/api/meta' || !index) {
      const fresh = await get('index.json');
      if (!index || fresh.at !== index.at) { days.clear(); basket = null; }
      index = fresh;
      if (u.pathname === '/api/meta') return index.meta;
    }
    if (u.pathname === '/api/daily') return index.daily;
    if (u.pathname === '/api/day') { const f = await day(q.get('date')); return { ...f.views[q.get('branch') || 'all'], meta: index.meta }; }
    if (u.pathname === '/api/year') return (await day(q.get('date'))).year;
    if (u.pathname === '/api/basket') {
      if (!basket) basket = await get('basket.json');
      const k = q.get('from') ? [q.get('kind'), q.get('from'), q.get('to'), q.get('branch') || 'all'].join('|') : q.get('kind');
      return basket[k] || { available: false };
    }
    throw new Error('Not available on the phone.');
  };

  function startApp() { const s = document.createElement('script'); s.src = 'app.js?v=' + APP_V; document.body.appendChild(s); }

  const paired = takePairing();
  if (typeof DecompressionStream === 'undefined') { $app.innerHTML = msg('Please update this phone to iOS 16.4 or later.', 'يرجى تحديث الهاتف إلى iOS 16.4 أو أحدث.'); return; }
  if (!getPair()) { $app.innerHTML = msg('Scan the QR code from the office to open this app.', 'امسح رمز QR من المكتب لفتح هذا التطبيق.'); return; }
  if (paired && !standalone()) {
    $app.innerHTML = msg('Set up. Tap Share, then Add to Home Screen, and open the app from the new icon.', 'تم الإعداد. اضغط مشاركة ثم إضافة إلى الشاشة الرئيسية، وافتح التطبيق من الأيقونة الجديدة.') +
      '<div style="text-align:center"><button id="go" style="height:40px;padding:0 18px;border:0;border-radius:10px;background:#0B6B37;color:#fff;font-weight:600">Open here / افتح هنا</button></div>';
    document.getElementById('go').addEventListener('click', () => { history.replaceState(null, '', location.pathname + '#/today'); startApp(); });
    return;
  }
  if (paired) history.replaceState(null, '', location.pathname + '#/today');
  startApp();
})();
