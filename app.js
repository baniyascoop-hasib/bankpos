// Baniyas bank position - management app (EN / AR). Plain JS, no build step.
'use strict';
const T = {
  en: {
    org: 'Baniyas Cooperative Society', app: 'Daily bank position', signin: 'Sign in', username: 'Username', password: 'Password',
    wrong: 'Wrong username or password.', total: 'Total in bank accounts', updated: 'Updated {t} by {n}', accounts: '{n} accounts',
    free: 'Free to use', available: 'Available balance', blocked: 'Blocked / reserved', yesterday: 'Yesterday', details: 'Details',
    in: 'In', out: 'Out', receipts: '{n} receipts', payments: '{n} payments', byco: 'By company', BAN: 'Baniyas Cooperative Society',
    ALR: 'Al Resala Investment & Properties', banksfd: 'Banks + fixed deposits', fds: 'Deposits', due30: '{n} due within 30 days',
    home: 'Home', banks: 'Banks', inout: 'In / Out', deposits: 'Deposits', loan: 'Loan', hedging: 'Hedging',
    banksTitle: 'Bank accounts', banksSub: 'Balances on {d} · zero balances hidden', inTitle: 'Money in and out',
    moneyIn: 'Money in', moneyOut: 'Money out', top10: 'Largest 10 payments', more: '+ {n} more payments', none: 'Nothing recorded.',
    depTitle: 'Deposits & guarantees', fixed: 'Fixed deposits', rate: '{r}% a year', rateTbc: 'rate to be confirmed', matures: 'Matures {d}',
    daysLeft: '{n} days left', atMaturity: 'At maturity', noMaturity: 'no fixed maturity', guarantees: 'Bank guarantees', gTotal: 'Total guarantees',
    loanTitle: 'FAB term loan', outstanding: 'Outstanding today', limit: 'Limit', drawn: 'Drawn to date', stillAvail: 'Still available',
    nextInst: 'Next instalment · {d}', keep: 'Keep 1.4× (≈ AED {a}) in the rental account', days: '{n} days', paid: 'Paid to bank so far',
    instPaid: 'Instalments paid', ofInt: 'of which interest', ofPrin: 'of which principal', fromTo: 'From Jun 2022 to {d}', where: 'Where the loan went',
    hedgeLink: 'Hedging on this loan', hedgeSub: '{n} interest rate swaps · {a} covered', hedgeTitle: 'Interest rate hedging', hedgeSubT: 'What the swaps saved or cost each quarter',
    saved: 'Saved', cost: 'Cost', net: 'Net so far', quarters: '{n} quarters', cash: 'cash settled', everyQ: 'Every quarter', swaps: 'Swaps in place',
    swap: 'Swap {n}', mtm: 'Market value of the swaps (not cash)', gainYear: 'Change this year', aed: 'AED', signout: 'Sign out', update: 'Update screen',
    chpw: 'Change password', oldpw: 'Current password', newpw: 'New password (8+ characters)', save: 'Save', cancel: 'Cancel', pwdone: 'Password changed.',
    empty: 'No position has been published yet.', offline: 'Cannot reach the server. Showing the last position loaded.', schedAsOf: 'Loan schedule as of {d}', sinceLast: 'Since last update', byDay: 'Day by day', refresh: 'Refresh', unpair: 'Remove from this phone', unpairQ: 'Remove the bank position from this phone? It will need a new QR code from the office.',
    pairTitle: 'This phone is not set up', pairBody: 'Ask the finance team in the office for your QR code and scan it with the iPhone camera.', installHint: 'Set up. Now tap Share, then Add to Home Screen, and open the app from the new icon.',
    badKey: 'This phone needs a new QR code from the office.', thisPhone: 'This phone', offlineR: 'No connection. Showing the last position received.'
  },
  ar: {
    org: 'جمعية بني ياس التعاونية', app: 'الموقف المصرفي اليومي', signin: 'تسجيل الدخول', username: 'اسم المستخدم', password: 'كلمة المرور',
    wrong: 'اسم المستخدم أو كلمة المرور غير صحيحة.', total: 'إجمالي أرصدة الحسابات البنكية', updated: 'آخر تحديث {t} بواسطة {n}', accounts: '{n} حسابات',
    free: 'المتاح للاستخدام', available: 'الرصيد المتاح', blocked: 'محجوز / احتياطي', yesterday: 'أمس', details: 'التفاصيل',
    in: 'الوارد', out: 'الصادر', receipts: '{n} مقبوضات', payments: '{n} دفعات', byco: 'حسب الشركة', BAN: 'جمعية بني ياس التعاونية',
    ALR: 'الرسالة للاستثمار وتطوير العقارات', banksfd: 'البنوك + الودائع الثابتة', fds: 'الودائع', due30: '{n} تستحق خلال 30 يوماً',
    home: 'الرئيسية', banks: 'البنوك', inout: 'الوارد/الصادر', deposits: 'الودائع', loan: 'القرض', hedging: 'التحوط',
    banksTitle: 'الحسابات البنكية', banksSub: 'الأرصدة في {d} · الحسابات الصفرية مخفية', inTitle: 'الوارد والصادر',
    moneyIn: 'الوارد', moneyOut: 'الصادر', top10: 'أكبر 10 دفعات', more: '+ {n} دفعات أخرى', none: 'لا توجد حركات.',
    depTitle: 'الودائع والضمانات', fixed: 'الودائع الثابتة', rate: '{r}% سنوياً', rateTbc: 'سعر الفائدة قيد التأكيد', matures: 'تستحق {d}',
    daysLeft: 'متبقي {n} يوماً', atMaturity: 'عند الاستحقاق', noMaturity: 'بدون تاريخ استحقاق', guarantees: 'الضمانات البنكية', gTotal: 'إجمالي الضمانات',
    loanTitle: 'قرض بنك أبوظبي الأول', outstanding: 'الرصيد القائم اليوم', limit: 'الحد', drawn: 'المسحوب حتى الآن', stillAvail: 'المتبقي',
    nextInst: 'القسط القادم · {d}', keep: 'الاحتفاظ بـ 1.4× (≈ {a} درهم) في حساب الإيجارات', days: '{n} يوماً', paid: 'المدفوع للبنك حتى الآن',
    instPaid: 'الأقساط المدفوعة', ofInt: 'منها فوائد', ofPrin: 'منها أصل القرض', fromTo: 'من يونيو 2022 إلى {d}', where: 'أين استُخدم القرض',
    hedgeLink: 'التحوط على هذا القرض', hedgeSub: '{n} عقود مقايضة · تغطي {a}', hedgeTitle: 'التحوط من أسعار الفائدة', hedgeSubT: 'ما وفرته أو كلفته المقايضات كل ربع سنة',
    saved: 'وفورات', cost: 'تكلفة', net: 'الصافي حتى الآن', quarters: '{n} أرباع', cash: 'نقداً', everyQ: 'كل ربع سنة', swaps: 'عقود المقايضة القائمة',
    swap: 'مقايضة {n}', mtm: 'القيمة السوقية للمقايضات (غير نقدية)', gainYear: 'التغير هذا العام', aed: 'درهم', signout: 'تسجيل الخروج', update: 'شاشة التحديث',
    chpw: 'تغيير كلمة المرور', oldpw: 'كلمة المرور الحالية', newpw: 'كلمة المرور الجديدة (8 أحرف أو أكثر)', save: 'حفظ', cancel: 'إلغاء', pwdone: 'تم تغيير كلمة المرور.',
    empty: 'لم يتم نشر أي موقف بعد.', offline: 'تعذر الاتصال بالخادم. يتم عرض آخر موقف محمّل.', schedAsOf: 'جدول القرض حتى {d}', sinceLast: 'منذ آخر تحديث', byDay: 'حسب اليوم', refresh: 'تحديث', unpair: 'إزالة من هذا الهاتف', unpairQ: 'إزالة الموقف المصرفي من هذا الهاتف؟ ستحتاج إلى رمز QR جديد من المكتب.',
    pairTitle: 'هذا الهاتف غير مُعد', pairBody: 'اطلب رمز QR الخاص بك من فريق المالية في المكتب وامسحه بكاميرا الآيفون.', installHint: 'تم الإعداد. اضغط على مشاركة ثم إضافة إلى الشاشة الرئيسية، وافتح التطبيق من الأيقونة الجديدة.',
    badKey: 'يحتاج هذا الهاتف إلى رمز QR جديد من المكتب.', thisPhone: 'هذا الهاتف', offlineR: 'لا يوجد اتصال. يتم عرض آخر موقف تم استلامه.'
  }
};
const BANK_AR = {FAB: 'بنك أبوظبي الأول', ADCB: 'بنك أبوظبي التجاري', 'ADCB Islamic': 'أبوظبي التجاري الإسلامي'};
const PROJ_AR = {'Souq Sarab': 'سوق سراب', 'Baniyas Center': 'مركز بني ياس', 'Souq Samha': 'سوق سمحة', 'Yas Island': 'جزيرة ياس'};
let lang = 'en', user = null, D = null, tab = 'home', menuOpen = false, notice = null;
const REMOTE = !!window.BK_REMOTE;
try { lang = localStorage.getItem('bk_lang') || 'en'; } catch (e) {}

const $ = s => document.querySelector(s);
const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'}[c]));
const t = (k, v) => (T[lang][k] || T.en[k] || k).replace(/\{(\w+)\}/g, (_, x) => v && v[x] != null ? v[x] : '');
const fmt = (n, sign) => { const r = Math.round(n || 0); const s = Math.abs(r).toLocaleString('en-US'); return (r < 0 ? '−' : (sign && r > 0 ? '+' : '')) + s; };
const fmtM = n => (Math.abs(n) >= 1e6 ? (n / 1e6).toFixed(1) + 'M' : fmt(n));
const N = (n, sign) => `<span class="num">${fmt(n, sign)}</span>`;
const loc = () => lang === 'ar' ? 'ar-AE-u-nu-latn' : 'en-GB';
const dstr = (iso, o) => iso ? new Date(iso.length === 10 ? iso + 'T12:00:00' : iso).toLocaleDateString(loc(), o || {day: 'numeric', month: 'short', year: 'numeric'}) : '';
const dlong = iso => dstr(iso, {weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'});
const tstr = iso => iso ? new Date(iso).toLocaleTimeString(lang === 'ar' ? 'ar-AE-u-nu-latn' : 'en-GB', {hour: '2-digit', minute: '2-digit'}) : '';
// several days when the last publish was before yesterday (e.g. Monday: Fri - Sun)
const period = () => D.movement_from && D.movement_from < D.movement_date ? dstr(D.movement_from, {weekday: 'short', day: 'numeric', month: 'short'}) + ' – ' + dstr(D.movement_date, {weekday: 'short', day: 'numeric', month: 'short'}) : null;
const bank = b => lang === 'ar' ? (BANK_AR[b] || b) : b;

async function api(path, opt) {
  const r = await fetch(path, Object.assign({credentials: 'same-origin', headers: {'Content-Type': 'application/json'}}, opt || {}));
  const j = await r.json().catch(() => ({}));
  if (!r.ok) { const e = new Error(j.error || r.statusText); e.status = r.status; throw e; }
  return j;
}

function setLang(l) {
  lang = l; try { localStorage.setItem('bk_lang', l); } catch (e) {}
  document.documentElement.lang = l; document.documentElement.dir = l === 'ar' ? 'rtl' : 'ltr';
  render();
}

// ------------------------------------------------------------------ shell
const ICONS = {
  home: '<path d="M3 11l9-7 9 7v9H3z"/>', banks: '<path d="M3 9l9-5 9 5"/><path d="M5 10v8M10 10v8M14 10v8M19 10v8M3 20h18"/>',
  inout: '<path d="M7 4v16M7 20l-3-3M7 20l3-3M17 20V4M17 4l-3 3M17 4l3 3"/>', deposits: '<rect x="3" y="6" width="18" height="13" rx="2"/><path d="M3 10h18"/>',
  loan: '<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>'
};
function topBar() {
  return `<div class="bar"><div class="brand"><div class="mark"><img src="icon-64.png" alt=""></div><div><b>${t('org')}</b><small>${t('app')}</small></div></div>
    <div class="tools"><div class="lang" role="group" aria-label="Language"><button class="${lang === 'en' ? 'on' : ''}" onclick="setLang('en')">EN</button><button class="${lang === 'ar' ? 'on' : ''}" onclick="setLang('ar')">ع</button></div>
    <button class="iconbtn" aria-label="Menu" onclick="toggleMenu()"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6"/></svg></button></div></div>
    ${menuOpen && REMOTE ? `<div class="menu"><div class="who">${t('thisPhone')}</div><button onclick="menuOpen=false;D=null;load()">${t('refresh')}</button><button onclick="unpair()">${t('unpair')}</button></div>` : ''}
    ${menuOpen && !REMOTE ? `<div class="menu"><div class="who">${esc(user.name)}</div>${user.role !== 'viewer' ? `<a href="/update">${t('update')}</a>` : ''}<button onclick="changePw()">${t('chpw')}</button><button onclick="signOut()">${t('signout')}</button></div>` : ''}`;
}
function screenHead(title, sub) { return `<div class="top">${topBar()}<div><div class="title">${title}</div>${sub ? `<div class="subtitle">${sub}</div>` : ''}</div></div>`; }
function nav() {
  return `<nav class="tabs"><div>${['home', 'banks', 'inout', 'deposits', 'loan'].map(k => `<a href="#${k}" class="${tab === k || (k === 'loan' && tab === 'hedging') ? 'on' : ''}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">${ICONS[k]}</svg>${t(k)}</a>`).join('')}</div></nav>`;
}
function toggleMenu() { menuOpen = !menuOpen; render(); }

// ------------------------------------------------------------------ screens
function home() {
  const n = D.accounts.length, dep = D.deposits.length;
  return `<div class="top hero">${topBar()}<div class="hero-total"><small>${t('total')} · ${dlong(D.position_date)}</small>
      <div class="big">${N(D.total)} <span style="font-size:18px">${t('aed')}</span></div>
      <div class="sub">${t('updated', {t: tstr(D.published_at), n: esc(D.published_by)})} · ${t('accounts', {n})}</div></div></div>
    <div class="float"><div><div class="k">${t('free')}</div><div class="v">${N(D.free)}</div></div><div><div class="k">${t('available')}</div><div class="v">${N(D.available)}</div></div>
      <div><div class="k">${t('blocked')}</div><div class="v neg">${N(D.blocked)}</div></div></div>
    <div class="wrap">
      <div class="sec"><div class="sec-h">${period() ? t('sinceLast') + ' · ' + period() : t('yesterday') + ' · ' + dstr(D.movement_date, {weekday: 'long', day: 'numeric', month: 'long'})}<a href="#inout">${t('details')}</a></div>
        <div class="grid2"><a class="tile" href="#inout"><div class="k pos">${t('in')}</div><div class="v">${N(D.in_total, true)}</div><div class="s">${t('receipts', {n: D.in_count})}</div></a>
          <a class="tile" href="#inout"><div class="k neg">${t('out')}</div><div class="v">${N(-D.out_total)}</div><div class="s">${t('payments', {n: D.out_count})}</div></a></div></div>
      <div class="sec"><div class="sec-h">${t('byco')}</div><a class="card" href="#banks" style="color:inherit">
        ${['BAN', 'ALR'].map(c => `<div class="row"><div class="l"><b>${t(c)}</b><small>${['FAB', 'ADCB'].filter(b => D.by_company[c].by_bank[b]).map(b => bank(b) + ' ' + fmtM(D.by_company[c].by_bank[b])).join(' · ')}</small></div><div class="r">${N(D.by_company[c].total)}</div></div>`).join('')}</a></div>
      <a class="dark" href="#deposits"><div><small>${t('banksfd')}</small><div><b>${N(D.banks_plus_deposits)}</b> ${t('aed')}</div></div>
        <div style="text-align:end;font-size:12px;opacity:.85">${t('fds')} ${N(D.deposit_total)}<br>${D.deposits_due_30 ? t('due30', {n: D.deposits_due_30}) : ''}</div></a>
    </div>`;
}

function banks() {
  const sec = c => {
    const list = D.accounts.filter(a => a.company === c); if (!list.length) return '';
    return `<div class="sec"><div class="co-h"><span>${t(c)}</span><span class="num">${fmt(D.by_company[c].total)}</span></div><div class="card">
      ${list.map(a => `<div class="row"><div class="l"><b>${esc(a.name)}</b><small class="num">${esc(a.number)}</small>${a.blocked ? `<small><span class="pill red">${t('blocked')} ${fmt(a.blocked)}</span></small>` : ''}</div><div class="r ${a.current < 0 ? 'neg' : ''}">${N(a.current)}</div></div>`).join('')}</div></div>`;
  };
  return screenHead(t('banksTitle'), t('banksSub', {d: dstr(D.position_date)})) + `<div class="wrap">${sec('BAN')}${sec('ALR')}
    <div class="dark"><div><small>${t('total')}</small><div><b>${N(D.total)}</b> ${t('aed')}</div></div></div></div>`;
}

function inout() {
  const days = D.by_day && D.by_day.length > 1 ? `<div class="sec"><div class="sec-h">${t('byDay')}</div><div class="card">${D.by_day.map(x => `<div class="row"><div class="l"><b>${dstr(x.date, {weekday: 'long', day: 'numeric', month: 'short'})}</b></div><div class="r"><span class="pos">${N(x.in, true)}</span> &nbsp; <span class="neg">${N(-x.out)}</span></div></div>`).join('')}</div></div>` : '';
  return screenHead(t('inTitle'), period() || dlong(D.movement_date)) + `<div class="wrap">${days}
    <div class="grid2"><div class="tile"><div class="k pos">${t('moneyIn')}</div><div class="v">${N(D.in_total, true)}</div><div class="s">${t('receipts', {n: D.in_count})}</div></div>
      <div class="tile"><div class="k neg">${t('moneyOut')}</div><div class="v">${N(-D.out_total)}</div><div class="s">${t('payments', {n: D.out_count})}</div></div></div>
    <div class="sec"><div class="sec-h">${t('moneyIn')}</div><div class="card">${D.in_groups.length ? D.in_groups.map(g => `<div class="row"><div class="l"><b>${esc(g.label)}</b><small>${t('receipts', {n: g.count})}</small></div><div class="r pos">${N(g.amount, true)}</div></div>`).join('') : `<div class="row muted">${t('none')}</div>`}</div></div>
    <div class="sec"><div class="sec-h">${t('top10')}</div><div class="card">${D.out_top.length ? D.out_top.map(m => `<div class="row"><div class="l"><b>${esc(m.party)}</b><small class="num">${esc(m.ref || '')}</small></div><div class="r">${N(-m.amount)}</div></div>`).join('') : `<div class="row muted">${t('none')}</div>`}
      ${D.out_rest.count ? `<div class="row"><div class="l"><small>${t('more', {n: D.out_rest.count})}</small></div><div class="r">${N(-D.out_rest.amount)}</div></div>` : ''}</div></div></div>`;
}

function deposits() {
  const gTot = D.guarantees.reduce((s, g) => s + g.amount, 0);
  return screenHead(t('depTitle'), dlong(D.position_date)) + `<div class="wrap">
    <div class="sec"><div class="co-h"><span>${t('fixed')}</span><span class="num">${fmt(D.deposit_total)}</span></div><div class="card">
      ${D.deposits.map(d => `<div class="row"><div class="l"><b>${esc(d.name)} · ${bank(d.bank)}</b><small class="num">${esc(d.number)}</small>
        <small>${d.rate ? t('rate', {r: d.rate.toFixed(2)}) : t('rateTbc')} · ${d.maturity ? t('matures', {d: dstr(d.maturity)}) : t('noMaturity')}</small>
        ${d.days != null ? `<small><span class="pill ${d.days <= 30 ? 'warn' : ''}">${t('daysLeft', {n: d.days})}</span></small>` : ''}</div>
        <div class="r">${N(d.principal)}${d.maturity_amount ? `<small>${t('atMaturity')} ${N(d.maturity_amount)}</small>` : ''}</div></div>`).join('')}</div></div>
    <div class="sec"><div class="co-h"><span>${t('guarantees')}</span><span class="num">${fmt(gTot)}</span></div><div class="card">
      ${D.guarantees.map(g => `<div class="row"><div class="l"><b>${esc(g.name)}</b><small>${bank(g.bank)} · <span class="num">${esc(g.ref)}</span></small>${g.beneficiary ? `<small>${esc(g.beneficiary)}</small>` : ''}</div><div class="r">${N(g.amount)}</div></div>`).join('')}</div></div>
    <div class="dark"><div><small>${t('banksfd')}</small><div><b>${N(D.banks_plus_deposits)}</b> ${t('aed')}</div></div></div></div>`;
}

function loan() {
  const L = D.loan; if (!L || !L.limit) return screenHead(t('loanTitle')) + `<div class="empty">${t('none')}</div>`;
  const days = Math.round((new Date(L.next_due + 'T12:00:00') - new Date(D.position_date + 'T12:00:00')) / 864e5);
  const swapTot = D.swaps.reduce((s, x) => s + x.notional, 0), maxP = Math.max(...L.by_project.map(p => p[1]));
  return screenHead(t('loanTitle'), 'AA2535100147') + `<div class="wrap">
    <div class="card pad"><div class="note">${t('outstanding')}</div><div style="font-size:28px;font-weight:700;margin:4px 0 12px">${t('aed')} ${N(L.outstanding)}</div>
      <div class="meter"><i style="width:${L.outstanding / L.limit * 100}%;background:var(--green)"></i><i style="width:${L.principal_paid / L.limit * 100}%;background:#9CC8AE"></i></div>
      <div class="grid3" style="margin-top:12px;font-size:11px"><div><div class="muted">${t('limit')}</div><b class="num">${fmtM(L.limit)}</b></div><div><div class="muted">${t('drawn')}</div><b class="num">${fmtM(L.drawn)}</b></div><div><div class="muted">${t('stillAvail')}</div><b class="num">${fmtM(L.limit - L.drawn)}</b></div></div></div>
    <div class="card pad" style="border-inline-start:4px solid var(--amber)"><div class="sec-h">${t('nextInst', {d: dstr(L.next_due)})}<span class="pill warn">${t('days', {n: days})}</span></div>
      <div style="font-size:22px;font-weight:700;margin:6px 0">${N(L.next_amount)}</div><div class="note">${t('keep', {a: (L.next_amount * 1.4 / 1e6).toFixed(1) + 'M'})}</div></div>
    <div class="sec"><div class="sec-h">${t('paid')}</div><div class="card">
      <div class="row"><div class="l"><b>${t('instPaid')}</b><small>${t('fromTo', {d: dstr(L.schedule_as_of)})}</small></div><div class="r">${N(L.instalments_paid)}</div></div>
      <div class="row"><div class="l"><small>${t('ofInt')}</small></div><div class="r">${N(L.interest_paid)}</div></div>
      <div class="row"><div class="l"><small>${t('ofPrin')}</small></div><div class="r">${N(L.principal_paid)}</div></div></div></div>
    <div class="sec"><div class="sec-h">${t('where')}</div><div class="card pad bars">
      ${L.by_project.map(p => `<div><div style="display:flex;justify-content:space-between;font-size:13px"><span>${lang === 'ar' ? (PROJ_AR[p[0]] || p[0]) : esc(p[0])}</span><b class="num">${fmtM(p[1])}</b></div><div class="meter" style="margin-top:4px"><i style="width:${p[1] / maxP * 100}%;background:var(--green)"></i></div></div>`).join('')}</div></div>
    <a class="dark" href="#hedging"><div><small>${t('hedgeLink')}</small><div style="font-size:14px;font-weight:600">${t('hedgeSub', {n: D.swaps.length, a: fmtM(swapTot)})}</div></div><span style="font-size:20px">${lang === 'ar' ? '‹' : '›'}</span></a>
    <div class="note">${t('schedAsOf', {d: dstr(L.schedule_as_of)})}</div></div>`;
}

function hedging() {
  const H = D.hedge || [], sv = H.filter(q => q.amount > 0), cs = H.filter(q => q.amount < 0);
  const S = sv.reduce((s, q) => s + q.amount, 0), C = -cs.reduce((s, q) => s + q.amount, 0), mx = Math.max(1, ...H.map(q => Math.abs(q.amount)));
  const M = D.mtm || [], m0 = M[0], m1 = M[M.length - 1];
  return screenHead(t('hedgeTitle'), t('hedgeSubT')) + `<div class="wrap">
    <div class="grid3"><div class="tile"><div class="k pos">${t('saved')}</div><div class="v" style="font-size:16px">${N(S)}</div><div class="s">${t('quarters', {n: sv.length})}</div></div>
      <div class="tile"><div class="k neg">${t('cost')}</div><div class="v" style="font-size:16px">${N(C)}</div><div class="s">${t('quarters', {n: cs.length})}</div></div>
      <div class="tile"><div class="k">${t('net')}</div><div class="v ${S - C < 0 ? 'neg' : 'pos'}" style="font-size:16px">${N(S - C, true)}</div><div class="s">${t('cash')}</div></div></div>
    <div class="sec"><div class="sec-h">${t('everyQ')}<span><span class="neg">■</span> ${t('cost')} &nbsp; <span class="pos">■</span> ${t('saved')}</span></div><div class="card pad bars">
      ${H.map(q => `<div class="qbar" dir="ltr"><b>${dstr(q.quarter_end, {month: 'short', year: '2-digit'})}</b>
        <div class="neg-side">${q.amount < 0 ? `<span class="neg num">${fmt(q.amount)}</span><i style="width:${Math.abs(q.amount) / mx * 100}%"></i>` : ''}</div>
        <div class="pos-side">${q.amount > 0 ? `<i style="width:${q.amount / mx * 100}%"></i><span class="pos num">${fmt(q.amount, true)}</span>` : ''}</div></div>`).join('')}</div></div>
    <div class="sec"><div class="sec-h">${t('swaps')}</div><div class="card">${D.swaps.map((s, i) => `<div class="row"><div class="l"><b>${t('swap', {n: i + 1})}</b><small class="num">${esc(s.ref)}</small></div><div class="r">${N(s.notional)}</div></div>`).join('')}</div></div>
    ${m0 ? `<div class="sec"><div class="sec-h">${t('mtm')}</div><div class="card">${M.map(m => `<div class="row"><div class="l"><b>${dstr(m.date)}</b></div><div class="r ${m.value < 0 ? 'neg' : 'pos'}">${N(m.value, true)}</div></div>`).join('')}
      ${M.length > 1 ? `<div class="row"><div class="l"><small>${t('gainYear')}</small></div><div class="r ${m1.value - m0.value < 0 ? 'neg' : 'pos'}">${N(m1.value - m0.value, true)}</div></div>` : ''}</div></div>` : ''}</div>`;
}

// ------------------------------------------------------------------ render / auth
function render() {
  document.documentElement.lang = lang; document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  const root = $('#root');
  if (!user) return REMOTE ? pairScreen() : loginScreen();
  if (!D) { root.innerHTML = `<div class="app">${screenHead(t('app'))}<div class="empty">…</div></div>`; return; }
  if (D.empty) { root.innerHTML = `<div class="app">${screenHead(t('app'))}<div class="empty">${t('empty')}</div></div>`; return; }
  const screens = {home, banks, inout, deposits, loan, hedging};
  root.innerHTML = `<div class="app">${(screens[tab] || home)()}${notice ? `<div class="wrap"><div class="pill">${t(notice)}</div></div>` : ''}${D._offline ? `<div class="wrap"><div class="pill warn">${t(REMOTE ? 'offlineR' : 'offline')}</div></div>` : ''}</div>${nav()}`;
}
function loginScreen() {
  $('#root').innerHTML = `<form class="login" onsubmit="return doLogin(event)"><img src="logo-wordmark.png" alt="${t('org')}"><h1>${t('app')}</h1>
    <div class="lang" style="align-self:center;background:var(--line)"><button type="button" class="${lang === 'en' ? 'on' : ''}" style="color:var(--green)" onclick="setLang('en')">EN</button><button type="button" class="${lang === 'ar' ? 'on' : ''}" style="color:var(--green)" onclick="setLang('ar')">ع</button></div>
    <label class="field">${t('username')}<input id="u" autocomplete="username" autocapitalize="none" required></label>
    <label class="field">${t('password')}<input id="p" type="password" autocomplete="current-password" required></label>
    <div class="err" id="err"></div><button class="btn">${t('signin')}</button></form>`;
}
async function doLogin(e) {
  e.preventDefault();
  try { const r = await api('/api/login', {method: 'POST', body: JSON.stringify({username: $('#u').value, password: $('#p').value})}); user = r.user; await load(); }
  catch (x) { $('#err').textContent = x.status === 401 ? t('wrong') : x.message; }
  return false;
}
async function signOut() { await api('/api/logout', {method: 'POST'}).catch(() => {}); user = null; D = null; menuOpen = false; render(); }
async function changePw() {
  menuOpen = false;
  $('#root').innerHTML = `<form class="login" onsubmit="return savePw(event)"><h1>${t('chpw')}</h1>
    <label class="field">${t('oldpw')}<input id="o" type="password" autocomplete="current-password" required></label>
    <label class="field">${t('newpw')}<input id="n" type="password" autocomplete="new-password" minlength="8" required></label>
    <div class="err" id="err"></div><button class="btn">${t('save')}</button><button type="button" class="btn ghost" onclick="render()">${t('cancel')}</button></form>`;
}
async function savePw(e) {
  e.preventDefault();
  try { await api('/api/password', {method: 'POST', body: JSON.stringify({old: $('#o').value, new: $('#n').value})}); alert(t('pwdone')); render(); }
  catch (x) { $('#err').textContent = x.message; }
  return false;
}
function pairScreen(msg) {
  $('#root').innerHTML = `<div class="login"><img src="logo-wordmark.png" alt="${t('org')}"><h1>${t(msg || 'pairTitle')}</h1><p class="note" style="text-align:center">${t('pairBody')}</p>
    <div class="lang" style="align-self:center;background:var(--line)"><button type="button" class="${lang === 'en' ? 'on' : ''}" style="color:var(--green)" onclick="setLang('en')">EN</button><button type="button" class="${lang === 'ar' ? 'on' : ''}" style="color:var(--green)" onclick="setLang('ar')">ع</button></div></div>`;
}
function unpair() { if (!confirm(t('unpairQ'))) return; unpairPhone(); user = null; D = null; menuOpen = false; render(); }
async function load() {
  if (REMOTE) {
    try { D = await remoteLoad(); }
    catch (x) {
      D = null;
      if (x.status === 403) { user = null; return pairScreen('badKey'); }
      if (x.status === 401) user = null; else D = {empty: true};
    }
    return render();
  }
  try { D = await api('/api/dashboard'); try { localStorage.setItem('bk_last', JSON.stringify(D)); } catch (e) {} }
  catch (x) {
    if (x.status === 401) { user = null; D = null; }
    else { try { D = JSON.parse(localStorage.getItem('bk_last')); if (D) D._offline = true; } catch (e) {} }
  }
  render();
}
window.addEventListener('hashchange', () => { if (/^#p=/.test(location.hash)) return location.reload(); tab = location.hash.slice(1) || 'home'; menuOpen = false; render(); window.scrollTo(0, 0); });
document.addEventListener('visibilitychange', () => { if (!document.hidden && user) load(); });
(async () => {
  if (REMOTE) {
    if (takePairingFromUrl() && !isStandalone()) notice = 'installHint';
    tab = /^#\w+$/.test(location.hash) ? location.hash.slice(1) : 'home';
    user = getPair() ? {name: '', role: 'viewer'} : null;
    render(); if (user) load(); return;
  }
  tab = location.hash.slice(1) || 'home';
  try { user = (await api('/api/me')).user; } catch (e) { user = null; }
  render(); if (user) load();
})();
