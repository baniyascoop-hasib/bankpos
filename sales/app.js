/* BANIYAS COOPERATIVE SOCIETY - Daily Sales App (view only - nothing can be downloaded) */
'use strict';
(function () {
  const $app = document.getElementById('app');
  const S = {
    lang: (() => { try { return localStorage.getItem('bsa_lang') || 'en'; } catch { return 'en'; } })(),
    meta: null, date: null, branch: 'all', cache: new Map(), data: null, loading: false,
    sortK: 's', fvVeg: false, catSeg: 0, cal: null,
  };
  const T = () => window.I18N[S.lang];

  // ------------------------------------------------------------ helpers
  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const fmt = (n) => (n == null || isNaN(n) ? '–' : Math.round(n).toLocaleString('en-US'));
  const fmt1 = (n) => (n == null || isNaN(n) ? '–' : (Math.round(n * 10) / 10).toLocaleString('en-US', { minimumFractionDigits: 1, maximumFractionDigits: 1 }));
  const fmt2 = (n) => (n == null || isNaN(n) ? '–' : n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }));
  const pc = (a, b) => (b ? (a / b - 1) * 100 : null);
  const arrow = (p) => (p == null ? '' : (p >= 0 ? '▲ ' : '▼ ') + Math.abs(p).toFixed(1) + '%');
  const cls = (p) => (p == null ? 'mut' : p >= 0 ? 'up' : 'down');
  const dlt = (a, b, extra = '') => { const p = pc(a, b); return p == null ? `<span class="d mut ${extra}">${T().na}</span>` : `<span class="d num ${cls(p)} ${extra}">${arrow(p)}</span>`; };
  const D = (iso) => new Date(iso + 'T00:00:00Z');
  const addDays = (iso, n) => { const d = D(iso); d.setUTCDate(d.getUTCDate() + n); return d.toISOString().slice(0, 10); };
  const wdOf = (iso) => D(iso).getUTCDay();
  const dLabel = (iso) => { const d = D(iso); return `${T().wd[d.getUTCDay()]}${S.lang === 'ar' ? '،' : ','} ${String(d.getUTCDate()).padStart(2, '0')} ${T().mon[d.getUTCMonth()]} ${d.getUTCFullYear()}`; };
  const lyOf = (s) => { const y = +s.slice(0, 4) - 1, md = s.slice(5); return md === '02-29' ? y + '-02-28' : y + '-' + md; };
  const cmpW = () => dShort(S.data.cmpDate) + ' ' + S.data.cmpDate.slice(0, 4);
  const dShort = (iso) => { const d = D(iso); return `${String(d.getUTCDate()).padStart(2, '0')} ${T().mon[d.getUTCMonth()]}`; };
  const bName = (code) => { const b = S.meta.branches.find((x) => x.code === code); return b ? b[S.lang] : code; };
  const nm = (o) => (o && typeof o === 'object' ? o[S.lang] || o.en : o);
  const rtl = () => S.lang === 'ar';
  const chevBack = () => `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="${rtl() ? 'M9 5l7 7-7 7' : 'M15 5l-7 7 7 7'}"/></svg>`;
  const chevFwd = (op = 1) => `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" style="opacity:${op}"><path d="${rtl() ? 'M15 5l-7 7 7 7' : 'M9 5l7 7-7 7'}"/></svg>`;
  const money = (n) => rtl() ? `<span class="num">${fmt(n)}</span> ${T().aed}` : `<span class="num">${T().aed} ${fmt(n)}</span>`;
  const logo = '<div class="logo"><img src="logo.png" alt="Baniyas Cooperative Society" width="32" height="32" style="border-radius:16px;display:block"></div>';

  // ------------------------------------------------------------ data
  async function api(path, opts) {
    if (window.BSA_REMOTE) return window.BSA_REMOTE(path); // phone copy outside the office
    const r = await fetch(path, Object.assign({ credentials: 'same-origin', headers: { 'Content-Type': 'application/json' } }, opts || {}));
    if (r.status === 401) { const e = new Error('login'); e.login = true; throw e; }
    if (!r.ok) throw new Error('HTTP ' + r.status);
    return r.json();
  }
  async function loadDay(date, branch) {
    const key = date + '|' + branch;
    if (S.cache.has(key)) return S.cache.get(key);
    const d = await api('/api/day?date=' + date + '&branch=' + branch);
    S.cache.set(key, d);
    return d;
  }
  async function refresh() {
    S.loading = true;
    try {
      if (!S.meta) S.meta = await api('/api/meta');
      if (!S.meta.latest) { S.data = null; render(); return; }
      if (!S.date) S.date = S.meta.latestComplete || S.meta.latest;
      S.data = await loadDay(S.date, 'all');
      S.sec = S.branch === 'all' ? S.data : await loadDay(S.date, S.branch);
    } catch (e) {
      if (e.login) return renderLogin();
      $app.innerHTML = `<div class="loading">Error: ${esc(e.message)}</div>`; return;
    } finally { S.loading = false; }
    render();
  }

  // ------------------------------------------------------------ shell
  const ICON = {
    today: '<path d="M3 11l9-7 9 7v9H3z"/>',
    branches: '<path d="M3 9l2-5h14l2 5"/><path d="M3 9h18v11H3z"/><path d="M9 20v-6h6v6"/>',
    sections: '<rect x="3" y="3" width="7.5" height="7.5" rx="1.5"/><rect x="13.5" y="3" width="7.5" height="7.5" rx="1.5"/><rect x="3" y="13.5" width="7.5" height="7.5" rx="1.5"/><rect x="13.5" y="13.5" width="7.5" height="7.5" rx="1.5"/>',
    month: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',
    reports: '<path d="M14 3H6v18h12V7z"/><path d="M14 3v4h4M9 13h6M9 17h6"/>',
  };
  const TAB_OF = { today: 'today', branches: 'branches', branch: 'branches', sections: 'sections', fv: 'sections', bakery: 'sections', 'bakery-items': 'sections', tenants: 'sections', tenant: 'sections', ccu: 'sections', month: 'month', reports: 'reports', hours: 'reports', 'samoon-basket': 'reports', 'day-by-day': 'reports', 'subsidy-basket': 'reports' };
  function tabbar(route) {
    const on = TAB_OF[route] || 'today';
    return `<nav class="tabbar">${Object.keys(ICON).map((k) => `<a href="#/${k}" class="${on === k ? 'on' : ''}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">${ICON[k]}</svg>${T().tabs[k]}</a>`).join('')}</nav>`;
  }
  const route = () => { const h = location.hash.replace(/^#\/?/, ''); const [r, a] = h.split('/'); return { r: r || 'today', a: a ? decodeURIComponent(a) : null }; };

  function render() {
    document.documentElement.lang = S.lang; document.documentElement.dir = T().dir;
    if (!S.meta) return;
    if (!S.data) { $app.innerHTML = `<div class="loading">${T().noData}</div>`; return; }
    const { r, a } = route();
    const V = VIEWS[r] || VIEWS.today;
    $app.innerHTML = `<div class="view">${V(a)}</div>${tabbar(r)}${S.cal ? calendar() : ''}`;
  }

  // ------------------------------------------------------------ shared pieces
  const langToggle = () => `<div class="lang"><button data-act="lang" data-v="en" class="${S.lang === 'en' ? 'on' : ''}">EN</button><button data-act="lang" data-v="ar" class="${S.lang === 'ar' ? 'on' : ''}">ع</button></div>`;
  function datebar() {
    const m = S.meta;
    return `<div class="datebar">
      <button class="arrow" data-act="prev" ${S.date <= m.first ? 'disabled' : ''} aria-label="Previous day">${chevBack()}</button>
      <button class="datebtn" data-act="cal"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/></svg>${esc(dLabel(S.date))}<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6"><path d="M6 9l6 6 6-6"/></svg></button>
      <button class="arrow" data-act="next" ${S.date >= m.latest ? 'disabled' : ''} aria-label="Next day">${chevFwd()}</button></div>`;
  }
  function weekChart(series, prevSeries, color = '#0B6B37', unitK = true) {
    const max = Math.max(1, ...series.map((x) => x.v || 0), ...(prevSeries || []).map((x) => x.v || 0));
    const bars = series.map((x, i) => {
      const last = i === series.length - 1;
      return `<div class="col"><div class="v num" style="${last ? 'font-weight:700;color:var(--ink)' : ''}">${unitK ? fmt((x.v || 0) / 1000) + 'k' : fmt(x.v)}</div><div class="b" style="height:${Math.round((x.v || 0) / max * 80)}px;background:${last ? color : '#BFDCCB'}"></div></div>`;
    }).join('');
    const lbl = series.map((x, i) => `<div style="${i === series.length - 1 ? 'font-weight:700;color:var(--ink)' : ''}">${T().wdShort[wdOf(x.date)]}</div>`).join('');
    return `<div class="cols" style="height:104px">${bars}</div><div class="lbls">${lbl}</div>`;
  }
  const hbar = (w, color) => `<div class="hbar"><div style="width:${Math.max(0, Math.min(100, w))}%;background:${color}"></div></div>`;
  function hoursChart(h) {
    const slice = h.slice(6, 24), max = Math.max(1, ...slice), pk = slice.indexOf(Math.max(...slice));
    return `<div class="hours">${slice.map((v, i) => `<div class="${i === pk ? 'pk' : ''}" style="height:${Math.round(v / max * 68) + 2}px" title="${i + 6}:00 ${v}"></div>`).join('')}</div>
      <div style="display:flex;justify-content:space-between;font-size:10px;color:var(--muted)" class="num"><span>06</span><span>10</span><span>14</span><span>18</span><span>23</span></div>`;
  }

  // ------------------------------------------------------------ views
  const VIEWS = {};

  VIEWS.today = () => {
    const d = S.data, t = d.today, L = T(), w = cmpW();
    const postedN = 4 - t.notPosted.length;
    const pT = pc(t.salesLfl, t.cmpLfl);
    const basket = t.bills ? t.sales / t.bills : null, basketC = t.cmpBills ? t.cmpLfl / t.cmpBills : null, basketL = t.billsLfl ? t.salesLfl / t.billsLfl : null;
    // key points
    const keys = [];
    const both = t.branches.filter((b) => b.posted && b.cmp);
    const up = both.filter((b) => b.sales >= b.cmp), down = both.filter((b) => b.sales < b.cmp);
    if (up.length) keys.push({ ic: '▲', bg: '#E3F1E8', fg: '#0B6B37', href: '#/branches', t: up.length === 4 ? L.keyAllGrew : L.keyGrew(up.map((b) => bName(b.code)).join(rtl() ? ' و' : ', ')), s: L.keyGrewSub(fmt(up.reduce((a, b) => a + b.sales - b.cmp, 0)), w) });
    if (down.length) { const x = down.sort((a, b) => pc(a.sales, a.cmp) - pc(b.sales, b.cmp))[0]; keys.push({ ic: '▼', bg: '#FBE9EC', fg: '#8A1426', href: '#/branch/' + x.code, t: L.keyDown(bName(x.code), Math.abs(pc(x.sales, x.cmp)).toFixed(1)), s: L.keyDownSub(fmt(x.sales), fmt(x.cmp), w) }); }
    const M = d.month, pM = pc(M.total.lflCur, M.total.lflPrev);
    if (pM != null) keys.push({ ic: '◷', bg: '#FDF3E1', fg: '#8A5A00', href: '#/month', t: L.keyMonth(arrow(pM), (L.monF[M.prevMonth - 1] + " " + M.prevYear)), s: L.keyMonthSub(fmt(M.total.mtd)) });
    const rows = [...t.branches].sort((a, b) => b.sales - a.sales).map((b) => `<a class="row" href="#/branch/${b.code}"><div class="n">${esc(bName(b.code))}</div>
      <div class="right">${b.posted ? `<div class="num" style="font-size:14px;font-weight:700">${fmt(b.sales)}</div>${dlt(b.sales, b.cmp, 'pill')}` : `<span class="d mut">${L.notPostedBranch.split('.')[0]}</span>`}</div></a>`).join('');
    return `<div class="hero green">
      <div class="top"><div class="brandrow">${logo}<div><div class="h-t">${L.greet}</div><div class="h-s">${L.who}</div></div></div>${langToggle()}</div>
      ${datebar()}
      <div style="display:flex;flex-direction:column;gap:6px"><div class="op85" style="font-size:13px">${L.totalSales(postedN, postedN === 4)}</div>
      <div class="big">${money(t.sales)}</div>
      <div class="chiprow"><span class="chip num ${cls(pT)}">${arrow(pT) || L.na}</span><span class="op85">${L.vsLast(w)} (<span class="num">${fmt(t.cmpLfl)}</span>)${both.length < postedN ? ' · ' + L.lflN(both.length) : ''}</span></div></div></div>
      <div class="card shadow float"><div class="trio">
        <div><div class="kv-l">${L.customers}</div><div class="kv-v num">${fmt(t.bills)}</div>${dlt(t.billsLfl, t.cmpBills)}</div>
        <div><div class="kv-l">${L.basket}</div><div class="kv-v num">${fmt2(basket)}</div>${dlt(basketL, basketC)}</div>
        <a href="#/month" style="color:inherit"><div class="kv-l">${L.monthVsLast}</div><div class="kv-v num ${cls(pM)}">${arrow(pM) || '–'}</div><div class="d mut num">${fmt(M.total.mtd)}</div></a>
      </div></div>
      <div class="wrap">
        ${t.notPosted.length ? `<div class="notice">${L.notPosted(t.notPosted.map(bName).join(', '))}</div>` : ''}
        ${window.BSA_PUSH && window.BSA_PUSH.available() && !window.BSA_PUSH.isOn() ? `<div class="card" style="display:flex;justify-content:space-between;align-items:center;gap:10px"><span style="font-size:12.5px">${L.notifyHint}</span><button class="smbtn" data-act="push">${L.notifyOn}</button></div>` : ""}
        <div class="sectitle">${L.whatToKnow}</div>
        <div class="card" style="padding:2px 14px">${keys.map((k) => `<a class="key" href="${k.href}"><div class="ic" style="background:${k.bg};color:${k.fg}">${k.ic}</div><div><div class="t">${esc(k.t)}</div><div class="s num">${esc(k.s)}</div></div></a>`).join('')}</div>
        <div class="sectitle"><span>${L.branches}</span><a href="#/branches" style="font-size:13px">${L.seeAll}</a></div>
        <div class="card" style="padding:2px 14px">${rows}</div>
      </div>`;
  };

  VIEWS.branches = () => {
    const d = S.data, t = d.today, L = T(), k = S.sortK;
    const list = [...t.branches].sort((a, b) => k === 's' ? b.sales - a.sales : k === 'c' ? b.bills - a.bills : (pc(b.sales, b.cmp) ?? -999) - (pc(a.sales, a.cmp) ?? -999));
    const max = Math.max(1, ...list.map((b) => (k === 'c' ? b.bills : b.sales)));
    const rows = list.map((b, i) => `<a class="row" href="#/branch/${b.code}" style="gap:12px">
      <div class="num" style="width:26px;height:26px;border-radius:8px;background:#E3F1E8;color:var(--brand);font-size:12px;font-weight:700;display:flex;align-items:center;justify-content:center;flex:none">${i + 1}</div>
      <div style="flex:1;min-width:0;display:flex;flex-direction:column;gap:4px">
        <div style="display:flex;justify-content:space-between"><span class="n">${esc(bName(b.code))}</span><span class="num" style="font-weight:700">${k === 'c' ? fmt(b.bills) : fmt(b.sales)}</span></div>
        ${hbar((k === 'c' ? b.bills : b.sales) / max * 100, 'var(--brand)')}
        <div style="display:flex;justify-content:space-between" class="sub"><span class="num">${b.posted ? L.custBasket(fmt(b.bills), fmt2(b.bills ? b.sales / b.bills : null)) : L.notPostedBranch}</span>${k === 'c' ? dlt(b.bills, b.cmpBills) : dlt(b.sales, b.cmp)}</div>
      </div>${chevFwd(0.5)}</a>`).join('');
    const mx = t.mix, tot = mx.bcs + mx.tenants + mx.subsidy || 1, MC = ['#0B6B37', '#D99A1E', '#1F5C8A'];
    const vals = [mx.bcs, mx.tenants, mx.subsidy], cvals = [t.mixCmp.bcs, t.mixCmp.tenants, t.mixCmp.subsidy];
    const wt = t.week.reduce((a, x) => a + x.v, 0), wp = t.weekPrev.reduce((a, x) => a + x.v, 0);
    return `<div class="subhdr"><h1>${L.branches}</h1><div class="s">${esc(dLabel(S.date))}</div>
      <div class="seg" style="grid-template-columns:repeat(3,1fr)">${[['s', L.sortSales], ['d', L.sortGrowth], ['c', L.sortCust]].map(([v, l]) => `<button data-act="sort" data-v="${v}" class="${k === v ? 'on' : ''}">${l}</button>`).join('')}</div></div>
      <div class="wrap"><div class="card" style="padding:2px 14px">${rows}</div>
      <div class="card"><h3>${L.mix}</h3><div class="mixbar">${vals.map((v, i) => `<div style="flex:${v};background:${MC[i]}"></div>`).join('')}</div>
        <div class="trio" style="margin-top:8px">${vals.map((v, i) => `<div><div class="kv-l">${L.mixNames[i]}</div><div class="num" style="font-size:14px;font-weight:700">${fmt(v)}</div><div class="sub num" style="font-size:11px;color:var(--muted)">${(v / tot * 100).toFixed(1)}% · ${dlt(v, cvals[i])}</div></div>`).join('')}</div></div>
      <div class="card"><h3>${L.sales7}<small>${L.thousands}</small></h3>${weekChart(t.week)}<div class="sub num" style="font-size:11px;color:var(--muted);margin-top:6px">${L.weekTotal} ${fmt(wt / 1000)}k · ${L.lastWeek} ${fmt(wp / 1000)}k · ${dlt(wt, wp)}</div></div></div>`;
  };

  VIEWS.branch = (code) => {
    const L = T(), b = S.data.branchDetail[code] || S.data.branchDetail['01'], w = cmpW();
    const p = pc(b.sales, b.cmp), basket = b.bills ? b.sales / b.bills : null, basketC = b.cmpBills ? b.cmp / b.cmpBills : null;
    const MC = ['#0B6B37', '#D99A1E', '#1F5C8A'], vals = [b.mix.bcs, b.mix.tenants, b.mix.subsidy], cv = [b.mixCmp.bcs, b.mixCmp.tenants, b.mixCmp.subsidy], tot = b.sales || 1;
    const lists = [b.supermarket.map((x) => ({ name: x.name, sales: x.sales, cmp: x.cmp })), b.tenants.map((x) => ({ name: nm(x.name), sales: x.sales, cmp: x.cmp })), b.subsidy.map((x) => ({ name: nm(x.name), sales: x.sales, cmp: x.cmp }))];
    const li = lists[S.catSeg] || [], lmax = Math.max(1, ...li.map((x) => x.sales));
    const pm = pc(b.lflCur, b.lflPrev);
    return `<div class="hero green" style="padding-bottom:60px"><button class="back" data-act="back">${chevBack()}${L.branches}</button>
      <div style="display:flex;flex-direction:column;gap:6px"><div class="op85" style="font-size:13px">${esc(bName(code))} · ${esc(dLabel(S.date))}</div>
      <div class="big">${money(b.sales)}</div>
      <div class="chiprow"><span class="chip num ${cls(p)}">${arrow(p) || L.na}</span><span class="op85">${L.vsLast(w)} (<span class="num">${fmt(b.cmp)}</span>)</span></div></div></div>
      <div class="card shadow float"><div class="trio">
        <div><div class="kv-l">${L.customers}</div><div class="kv-v num">${fmt(b.bills)}</div>${dlt(b.bills, b.cmpBills)}</div>
        <div><div class="kv-l">${L.basket}</div><div class="kv-v num">${fmt2(basket)}</div>${dlt(basket, basketC)}</div>
        <div><div class="kv-l">${L.profit}</div><div class="kv-v num">${fmt(b.profit)}</div><div class="d mut num">${b.sales && b.profit != null ? (b.profit / b.sales * 100).toFixed(1) + '%' : ''}</div></div>
      </div></div>
      <div class="wrap">${b.posted ? '' : `<div class="notice">${L.notPostedBranch}</div>`}
      <div class="card"><h3>${L.mix}</h3><div class="mixbar">${vals.map((v, i) => `<div style="flex:${v};background:${MC[i]}"></div>`).join('')}</div>
        ${vals.map((v, i) => `<div class="row" style="padding:7px 0"><span style="font-size:13px"><span class="dot" style="background:${MC[i]}"></span>${L.mixNames[i]}</span><span class="right num" style="font-size:13px"><b>${fmt(v)}</b><span class="mut">${(v / tot * 100).toFixed(1)}%</span>${dlt(v, cv[i], 'pill')}</span></div>`).join('')}</div>
      <div class="card"><h3>${L.topCats}</h3>
        <div class="seg" style="grid-template-columns:repeat(3,1fr);margin-bottom:6px">${[L.segSuper, L.segTen, L.segAlm].map((l, i) => `<button data-act="catseg" data-v="${i}" class="${S.catSeg === i ? 'on' : ''}">${l}</button>`).join('')}</div>
        ${li.map((x) => `<div style="padding:7px 0;border-bottom:1px solid var(--line)"><div style="display:flex;justify-content:space-between;font-size:13px;gap:8px"><span>${esc(x.name)}</span><span class="right num"><b>${fmt(x.sales)}</b>${dlt(x.sales, x.cmp, 'pill')}</span></div>${hbar(x.sales / lmax * 100, MC[S.catSeg])}</div>`).join('') || `<div class="sub" style="color:var(--muted);padding:8px 0">–</div>`}</div>
      <div class="card"><h3>${L.busyHours}<small>${L.hoursNote}</small></h3>${hoursChart(b.hours)}</div>
      <div class="card" style="background:var(--dark);color:#fff;display:flex;justify-content:space-between;align-items:center;gap:10px"><div><div class="op85" style="font-size:12px">${L.monthSoFar(L.monF[+S.date.slice(5, 7) - 1])}</div><div style="font-size:17px;font-weight:700">${money(b.mtd)}</div></div>
        <div style="font-size:12px;text-align:end" class="op85">${L.vsLastMonthSame}<br><span class="num" style="font-weight:700;color:${pm >= 0 ? 'var(--up-l)' : 'var(--down-l)'}">${arrow(pm)}</span></div></div></div>`;
  };

  function branchChips() {
    return `<div class="chips">${[['all', T().allBranches], ...S.meta.branches.map((b) => [b.code, b[S.lang]])].map(([c, l]) => `<button data-act="branch" data-v="${c}" class="${S.branch === c ? 'on' : ''}">${esc(l)}</button>`).join('')}</div>`;
  }
  const secData = () => (S.sec || S.data).sections;

  VIEWS.sections = () => {
    const L = T(), s = secData();
    const ten = s.tenants, best = ten.list.find((x) => x.cmp) || ten.list[0];
    const card = (href, bg, icon, title, sub, cells, extra = '') => `<a href="${href}" class="scard" style="background:${bg}">
      <div style="display:flex;justify-content:space-between;align-items:center"><div style="display:flex;align-items:center;gap:10px"><div class="ico">${icon}</div><div><div style="font-size:15px;font-weight:700">${title}</div><div style="font-size:11px;opacity:.85">${sub}</div></div></div>${chevFwd(0.7)}</div>
      ${extra}<div class="grid">${cells.map((c) => `<div><div class="l">${c[0]}</div><div class="v num">${c[1]}</div>${c[2] || ''}</div>`).join('')}</div></a>`;
    const dl = (a, b) => { const p = pc(a, b); return p == null ? '<div class="l">–</div>' : `<div class="num ${p >= 0 ? 'u' : 'dn'}" style="font-size:11px;font-weight:700">${arrow(p)}</div>`; };
    const svg = (p) => `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">${p}</svg>`;
    return `<div class="subhdr"><h1>${L.sections}</h1><div class="s">${esc(dLabel(S.date))} · ${L.sectionsSub}</div>${branchChips()}</div>
      <div class="wrap">
      ${card('#/ccu', 'var(--dark)', svg('<path d="M12 3l8 4v6c0 4-3.5 7-8 8-4.5-1-8-4-8-8V7z"/><path d="M9 12l2 2 4-4"/>'), L.ccu, L.ccuSub,
        [[L.salesValue, fmt(s.ccu.sales), dl(s.ccu.base, s.ccu.cmp)], [L.shareSuper, s.ccu.share == null ? '–' : fmt1(s.ccu.share) + '%'], [L.units, fmt(s.ccu.units), `<div class="l num">${s.ccu.itemCount} ${L.items}</div>`]])}
      ${card('#/fv', 'var(--brand)', svg('<path d="M12 8c-4 0-7 3-7 6.5S8 21 12 21s7-3 7-6.5S16 8 12 8z"/><path d="M12 8c0-2 1-4 3-5"/>'), L.fv, L.fvSub,
        [[L.total, fmt(s.fv.fruits.sales + s.fv.veg.sales), dl(s.fv.fruits.baseSales + s.fv.veg.baseSales, s.fv.fruits.cmpSales + s.fv.veg.cmpSales)], [L.fruits + ' (' + L.aed + ')', fmt(s.fv.fruits.sales), dl(s.fv.fruits.baseSales, s.fv.fruits.cmpSales)], [L.veg + ' (' + L.kg + ')', fmt(s.fv.veg.kg), dl(s.fv.veg.baseKg, s.fv.veg.cmpKg)]])}
      ${card('#/bakery', 'var(--amber)', svg('<path d="M4 13c0-5 3.5-8 8-8s8 3 8 8v5H4z"/><path d="M9 9v4M12 8v5M15 9v4"/>'), L.bakery, L.bakerySub,
        [[L.salesValue, fmt(s.bakery.sales), dl(s.bakery.base, s.bakery.cmp)], [L.samoonPcs, fmt(s.bakery.samoonPcs), dl(s.bakery.samoonBase, s.bakery.samoonCmp)], [L.last7, fmt(s.bakery.last7), dl(s.bakery.last7, s.bakery.prev7)]])}
      ${card('#/tenants', 'var(--blue)', svg('<path d="M4 10h16v10H4z"/><path d="M3 10l2-5h14l2 5"/><path d="M10 20v-5h4v5"/>'), L.tenants, L.tenantsSub,
        [[L.salesValue, fmt(ten.sales), dl(ten.base, ten.cmp)], [L.best, esc(best ? nm(best.name).split(' (')[0] : '–'), best ? dl(best.base, best.cmp) : ''], [L.tenants, String(ten.list.length)]])}
      </div>`;
  };

  function sectionHead(title, sub, color) {
    return `<div class="subhdr"><button class="back" data-act="go" data-v="#/sections">${chevBack()}${T().sections}</button><h1>${title}</h1><div class="s">${S.branch === 'all' ? T().allBranches : esc(bName(S.branch))} · ${esc(dLabel(S.date))}</div>${branchChips()}</div>`;
  }

  VIEWS.fv = () => {
    const L = T(), fv = secData().fv, veg = S.fvVeg, x = veg ? fv.veg : fv.fruits;
    const heroB = veg ? x.baseKg : x.baseSales, heroC = veg ? x.cmpKg : x.cmpSales, p = pc(heroB, heroC);
    const avg = x.kg ? x.sales / x.kg : null, avgC = x.cmpKg ? x.cmpSales / x.cmpKg : null, avgB = x.baseKg ? x.baseSales / x.baseKg : null;
    const top = x.top.map((i) => `<div class="row"><div><div class="n" style="font-size:13px">${esc(i.desc)}</div><div class="sub num">${veg ? fmt(i.sales) + ' ' + L.aed : (i.kgItem ? fmt1(i.kg) + ' ' + L.kg + ' · ' + fmt2(i.sales / (i.kg || 1)) + ' ' + L.aedPerKg : fmt(i.qty) + ' pcs')}</div></div>
      <div class="right"><b class="num">${veg ? (i.kgItem ? fmt1(i.kg) + ' ' + L.kg : fmt(i.qty) + ' pcs') : fmt(i.sales)}</b>${dlt(i.base, i.cmp, 'pill')}</div></div>`).join('');
    return `${sectionHead(L.fv)}<div class="wrap">
      <div class="seg" style="grid-template-columns:1fr 1fr"><button data-act="fv" data-v="0" class="${!veg ? 'on' : ''}">${L.fruitsBy}</button><button data-act="fv" data-v="1" class="${veg ? 'on' : ''}">${L.vegBy}</button></div>
      <div class="card" style="background:var(--brand);color:#fff"><div class="op85" style="font-size:12px">${veg ? L.vegKg : L.fruitValue}</div>
        <div style="display:flex;align-items:baseline;gap:10px;margin:2px 0"><div class="big" style="font-size:30px">${veg ? `<span class="num">${fmt(x.kg)}</span> ${L.kg}` : money(x.sales)}</div><span class="chip num ${cls(p)}">${arrow(p) || L.na}</span></div>
        <div class="op85" style="font-size:11px">${L.vsLast(cmpW())}</div>
        <div class="trio" style="grid-template-columns:1fr 1fr;border-top:1px solid rgba(255,255,255,.2);margin-top:10px;padding-top:10px">
          <div><div class="op85" style="font-size:11px">${veg ? L.salesValue : L.weightSold}</div><div class="num" style="font-weight:700">${veg ? fmt(x.sales) + ' ' + L.aed : fmt(x.kg) + ' ' + L.kg}</div></div>
          <div><div class="op85" style="font-size:11px">${L.avgKg}</div><div class="num" style="font-weight:700">${fmt2(avg)} <span style="font-size:11px;opacity:.85">${arrow(pc(avgB, avgC))}</span></div></div></div></div>
      <div class="card"><h3>${L.last7}<small>${veg ? L.kg : L.thousands}</small></h3>${weekChart(x.days, null, '#0B6B37', !veg)}</div>
      <div class="card" style="padding:4px 14px"><h3 style="padding-top:10px">${veg ? L.topVeg : L.topFruits}<small>${L.vsLast(cmpW())}</small></h3>${top}</div></div>`;
  };

  VIEWS.bakery = () => {
    const L = T(), b = secData().bakery, p = pc(b.base, b.cmp);
    const max = Math.max(1, ...b.days.map((x) => x.v), ...b.daysPrev.map((x) => x.v));
    const bars = b.days.map((x, i) => `<div style="display:flex;align-items:flex-end;gap:2px;height:92px"><div style="flex:1;height:${Math.round(x.v / max * 86)}px;background:${i === 6 ? 'var(--amber)' : '#D99A1E'};border-radius:3px 3px 0 0"></div><div style="flex:1;height:${Math.round(b.daysPrev[i].v / max * 86)}px;background:#D5DCD3;border-radius:3px 3px 0 0"></div></div>`).join('');
    const gTot = b.groups.reduce((a, g) => a + g.sales, 0) || 1;
    return `<div class="hero amber" style="padding-bottom:60px"><button class="back" data-act="go" data-v="#/sections">${chevBack()}${L.sections}</button>
      <div style="display:flex;flex-direction:column;gap:6px"><div class="op85" style="font-size:13px">${L.bakery} · ${S.branch === 'all' ? L.allBranches : esc(bName(S.branch))} · ${esc(dShort(S.date))}</div>
      <div class="big">${money(b.sales)}</div><div class="chiprow"><span class="chip num ${cls(p)}">${arrow(p) || L.na}</span><span class="op85">${L.vsLast(cmpW())} (<span class="num">${fmt(b.cmp)}</span>)</span></div></div></div>
      <div class="card shadow float"><div class="trio">
        <div><div class="kv-l">${L.last7}</div><div class="kv-v num">${fmt(b.last7)}</div>${dlt(b.last7, b.prev7)}</div>
        <div><div class="kv-l">${L.sameDayLM}</div><div class="kv-v num">${fmt(b.sameDayLastMonth)}</div>${dlt(b.sales, b.sameDayLastMonth)}</div>
        <div><div class="kv-l">${L.samoonPcs}</div><div class="kv-v num">${fmt(b.samoonPcs)}</div>${dlt(b.samoonBase, b.samoonCmp)}</div></div></div>
      <div class="wrap">
      <div class="card"><h3>${L.dailyBakery}<small><span class="dot" style="background:#D99A1E"></span>${L.thisWeek} <span class="dot" style="background:#D5DCD3;margin-inline-start:8px"></span>${L.lastWeek}</small></h3>
        <div class="cols" style="height:92px">${bars}</div><div class="lbls">${b.days.map((x) => `<div>${T().wdShort[wdOf(x.date)]}</div>`).join('')}</div></div>
      <div class="card" style="padding:4px 14px"><h3 style="padding-top:10px">${L.groups7}<small>${L.vsPrior}</small></h3>
        ${b.groups.map((g) => `<div class="row" style="padding:7px 0"><span style="font-size:13px;font-weight:600">${L.bgroups[g.key] || g.key}</span><span class="right num" style="font-size:13px"><b>${fmt(g.sales)}</b><span class="mut" style="font-size:11px">${(g.sales / gTot * 100).toFixed(1)}%</span>${dlt(g.sales, g.cmp, 'pill')}</span></div>`).join('')}</div>
      <a href="#/bakery-items" class="card" style="background:var(--dark);color:#fff;display:flex;justify-content:space-between;align-items:center"><div><div style="font-weight:700">${L.samoonQty}</div><div class="op85" style="font-size:11px">${L.samoonQtySub}</div></div>${chevFwd()}</a></div>`;
  };

  VIEWS['bakery-items'] = () => {
    const L = T(), b = secData().bakery;
    const tot = b.samoon.reduce((a, x) => ({ day: a.day + x.day, d7: a.d7 + x.d7, avg: a.avg + x.avg }), { day: 0, d7: 0, avg: 0 });
    return `<div class="subhdr"><button class="back" data-act="go" data-v="#/bakery">${chevBack()}${L.bakery}</button><h1>${L.samoonQty}</h1><div class="s">${S.branch === 'all' ? L.allBranches : esc(bName(S.branch))} · ${esc(dLabel(S.date))}</div></div>
      <div class="wrap"><div class="trio">
        <div class="card"><div class="kv-l">${L.samoonPcs}</div><div class="kv-v num">${fmt(b.samoonPcs)}</div>${dlt(b.samoonBase, b.samoonCmp)}</div>
        <div class="card"><div class="kv-l">${L.dailyAvg}</div><div class="kv-v num">${fmt(b.samoonAvg7)}</div><div class="d mut">${L.last7}</div></div>
        <div class="card"><div class="kv-l">${L.itemsSold}</div><div class="kv-v num">${fmt(b.itemsSold)}</div></div></div>
      <div class="card"><h3>${L.samoonByType}</h3><table class="tbl"><tr><th>${L.type}</th><th>${L.yesterday}</th><th>${L.d7}</th><th>${L.avgDay}</th></tr>
        ${b.samoon.map((x) => `<tr><td><b>${esc(x.desc)}</b></td><td class="num"><b>${fmt(x.day)}</b></td><td class="num">${fmt(x.d7)}</td><td class="num mut">${fmt(x.avg)}</td></tr>`).join('')}
        <tr class="tot"><td>${L.total}</td><td class="num">${fmt(tot.day)}</td><td class="num">${fmt(tot.d7)}</td><td class="num">${fmt(tot.avg)}</td></tr></table></div>
      <div class="card" style="padding:4px 14px"><h3 style="padding-top:10px">${L.otherTop}<small>${L.aed}</small></h3>
        ${b.others.map((x) => `<div class="row"><span style="font-size:13px;font-weight:600">${esc(x.desc)}</span><span class="right num" style="font-size:13px"><span class="mut">${x.kgItem ? fmt1(x.qty) + ' ' + L.kg : fmt(x.qty)}</span><b>${fmt(x.sales)}</b></span></div>`).join('')}</div></div>`;
  };

  VIEWS.tenants = () => {
    const L = T(), t = secData().tenants, p = pc(t.base, t.cmp), sup = S.data.today.sales;
    return `<div class="hero blue" style="padding-bottom:20px"><button class="back" data-act="go" data-v="#/sections">${chevBack()}${L.sections}</button>
      <div class="op85" style="font-size:13px">${L.allTenants} · ${S.branch === 'all' ? L.allBranches : esc(bName(S.branch))} · ${esc(dShort(S.date))}</div>
      <div style="display:flex;align-items:baseline;gap:10px"><div class="big" style="font-size:30px">${money(t.sales)}</div><span class="chip num ${cls(p)}">${arrow(p) || L.na}</span></div>
      <div class="op85" style="font-size:11px">${L.vsLast(cmpW())} (<span class="num">${fmt(t.cmp)}</span>)${S.branch === 'all' && sup ? ' · ' + (t.sales / sup * 100).toFixed(1) + '% ' + L.shareOfSales : ''}</div>
      ${branchChips()}</div>
      <div class="wrap"><div class="card" style="padding:2px 14px">${t.list.map((x) => `<a class="row" href="#/tenant/${encodeURIComponent(x.key)}"><div><div class="n">${esc(nm(x.name))}</div><div class="sub num">${x.ops.length ? esc(x.ops.join(" · ")) + " · " : ""}${x.kg ? fmt(x.kg) + ' ' + L.kg + ' · ' : ''}${x.share.toFixed(1)}%</div></div><div class="right"><b class="num">${fmt(x.sales)}</b>${dlt(x.base, x.cmp, 'pill')}${chevFwd(0.5)}</div></a>`).join('')}</div>
      <div class="card"><h3>${L.tenantsByBranch}</h3><div class="trio" style="grid-template-columns:repeat(4,1fr)">${t.byBranch.map((b) => `<div><div class="kv-l">${esc(bName(b.code))}</div><div class="num" style="font-weight:700">${fmt(b.sales)}</div></div>`).join('')}</div></div></div>`;
  };

  VIEWS.tenant = (key) => {
    const L = T(), x = secData().tenants.list.find((t) => t.key === key);
    if (!x) return VIEWS.tenants();
    const p = pc(x.base, x.cmp), bmax = Math.max(1, ...x.byBranch.map((b) => b.sales));
    return `<div class="hero blue" style="padding-bottom:20px"><button class="back" data-act="go" data-v="#/tenants">${chevBack()}${L.tenants}</button>
      <div class="op85" style="font-size:13px">${esc(nm(x.name))}${x.ops.length ? " (" + esc(x.ops.join(", ")) + ")" : ""} · ${esc(dShort(S.date))}</div>
      <div style="display:flex;align-items:baseline;gap:10px"><div class="big" style="font-size:30px">${money(x.sales)}</div><span class="chip num ${cls(p)}">${arrow(p) || L.na}</span></div>
      <div class="op85" style="font-size:11px">${L.vsLast(cmpW())} (<span class="num">${fmt(x.cmp)}</span>)${x.kg ? ' · ' + fmt(x.kg) + ' ' + L.kg : ''}</div></div>
      <div class="wrap"><div class="card" style="padding:4px 14px"><h3 style="padding-top:10px">${L.whatSold}</h3>${x.items.map((i) => `<div class="row"><div><div class="n" style="font-size:13px">${esc(i.desc)}</div><div class="sub num">${i.kgItem ? fmt1(i.qty) + ' ' + L.kg : fmt(i.qty)}</div></div><b class="num">${fmt(i.sales)}</b></div>`).join('')}</div>
      <div class="card"><h3>${L.byBranch}</h3>${x.byBranch.sort((a, b) => b.sales - a.sales).map((b) => `<div style="display:grid;grid-template-columns:90px 1fr 60px;gap:8px;align-items:center;font-size:12px;padding:4px 0"><span>${esc(bName(b.code))}${b.ops && b.ops.length ? '<br><small class="mut">' + esc(b.ops.join(", ")) + '</small>' : ''}</span>${hbar(b.sales / bmax * 100, 'var(--blue)')}<b class="num" style="text-align:end">${fmt(b.sales)}</b></div>`).join('')}</div></div>`;
  };

  VIEWS.ccu = () => {
    const L = T(), c = secData().ccu, p = pc(c.base, c.cmp);
    const smax = Math.max(1, ...c.shareDays.map((x) => x.v || 0)), cmax = Math.max(1, ...c.cats.map((x) => x.sales));
    return `<div class="hero dark" style="padding-bottom:16px"><button class="back" data-act="go" data-v="#/sections">${chevBack()}${L.sections}</button>
      <div class="op85" style="font-size:13px">${L.ccu} · ${S.branch === 'all' ? L.allBranches : esc(bName(S.branch))} · ${esc(dShort(S.date))}</div>
      <div style="display:flex;align-items:baseline;gap:10px"><div class="big" style="font-size:30px">${money(c.sales)}</div><span class="chip num ${cls(p)}">${arrow(p) || L.na}</span></div>
      <div class="trio" style="border-top:1px solid rgba(255,255,255,.18);padding-top:10px">
        <div><div class="op85" style="font-size:11px">${L.shareSuper}</div><div class="num" style="font-weight:700">${c.share == null ? '–' : fmt1(c.share) + '%'}</div></div>
        <div><div class="op85" style="font-size:11px">${L.units}</div><div class="num" style="font-weight:700">${fmt(c.units)}</div><div class="op85 num" style="font-size:11px">${c.itemCount} ${L.items}</div></div>
        <div><div class="op85" style="font-size:11px">${L.monthSoFar(L.monF[+S.date.slice(5, 7) - 1])}</div><div class="num" style="font-weight:700">${fmt(c.mtd)}</div></div></div>${branchChips()}</div>
      <div class="wrap">
      <div class="card"><h3>${L.shareTrend}<small>${L.last7}</small></h3><div class="cols" style="height:84px">${c.shareDays.map((x, i) => `<div class="col"><div class="v num">${x.v == null ? '–' : fmt1(x.v) + '%'}</div><div class="b" style="height:${Math.round((x.v || 0) / smax * 60)}px;background:${i === 6 ? 'var(--dark)' : '#D5DCD3'}"></div></div>`).join('')}</div><div class="lbls">${c.shareDays.map((x) => `<div>${T().wdShort[wdOf(x.date)]}</div>`).join('')}</div></div>
      <div class="card"><h3>${L.ccuCats}<small>${L.aed}</small></h3>${c.cats.map((x) => `<div style="display:grid;grid-template-columns:118px 1fr 50px 52px;gap:8px;align-items:center;font-size:12px;padding:4px 0"><span>${esc(x.name)}</span>${hbar(x.sales / cmax * 100, 'var(--dark)')}<b class="num" style="text-align:end">${fmt(x.sales)}</b>${dlt(x.base, x.cmp, 'pill')}</div>`).join('')}</div>
      <div class="card" style="padding:4px 14px"><h3 style="padding-top:10px">${L.topItems}</h3>${c.items.map((i) => `<div class="row"><div><div class="n" style="font-size:13px">${esc(i.desc)}</div><div class="sub num">${fmt(i.qty)}</div></div><b class="num">${fmt(i.sales)}</b></div>`).join('')}</div>
      <div class="card"><h3>${L.byBranch}</h3><div class="trio" style="grid-template-columns:repeat(4,1fr)">${c.byBranch.map((b) => `<div><div class="kv-l">${esc(bName(b.code))}</div><div class="num" style="font-weight:700">${fmt(b.sales)}</div></div>`).join('')}</div></div></div>`;
  };

  S.mview = 'm'; S.yCache = new Map(); let yBusy = false;
  const mySeg = () => `<div class="seg" style="grid-template-columns:1fr 1fr;margin-top:10px"><button data-act="mview" data-v="m" class="${S.mview === 'm' ? 'on' : ''}">${T().segMonth}</button><button data-act="mview" data-v="y" class="${S.mview === 'y' ? 'on' : ''}">${T().segYear}</button></div>`;
  async function loadYear(date) {
    if (yBusy) return; yBusy = true;
    try { if (!S.yCache.has(date)) S.yCache.set(date, await api('/api/year?date=' + date)); } finally { yBusy = false; }
    render();
  }
  const fmtM = (n) => (n == null ? '–' : (n / 1e6).toLocaleString('en-US', { minimumFractionDigits: 1, maximumFractionDigits: 1 }) + 'M');
  function yearView() {
    const L = T(), Y = S.yCache.get(S.date);
    const head = (sub) => `<div class="subhdr"><h1>${L.yearTitle(Y ? Y.year : S.date.slice(0, 4))}</h1><div class="s">${sub}</div>${mySeg()}</div>`;
    if (!Y) { loadYear(S.date).catch(onErr); return head('…') + '<div class="wrap"><div class="loading">…</div></div>'; }
    const t = Y.total, p = pc(t.lflCur, t.lflPrev), prog = t.lyFull ? t.sales / t.lyFull * 100 : null;
    const maxAbs = Math.max(1, ...Y.rows.map((r) => Math.abs(pc(r.lflCur, r.lflPrev) || 0)));
    const mmax = Math.max(1, ...Y.months.map((m) => Math.max(m.cur || 0, m.lyFull || 0)));
    const MC = ['#0B6B37', '#D99A1E', '#1F5C8A'], mx = [Y.mix.bcs, Y.mix.tenants, Y.mix.subsidy], mxl = [Y.mixLy.bcs, Y.mixLy.tenants, Y.mixLy.subsidy], mt = mx.reduce((a, b) => a + b, 0) || 1;
    return head(L.yearSub(esc(dShort(Y.date)), Y.days)) + `<div class="wrap">
      <div class="card" style="background:var(--brand);color:#fff"><div class="op85" style="font-size:12px">${L.ytdSales}</div>
        <div style="display:flex;align-items:baseline;gap:10px;flex-wrap:wrap"><div class="big" style="font-size:30px">${money(t.sales)}</div><span class="chip num ${cls(p)}">${arrow(p) || L.na}</span></div>
        <div class="op85" style="font-size:11px">${L.vsLYsame(Y.lastYear)} (<span class="num">${fmt(t.lflPrev)}</span>) · ${L.lflYears}</div>
        ${prog != null ? `<div style="margin-top:10px;font-size:11px" class="op85">${L.ofLastYear(prog.toFixed(1), Y.lastYear, fmtM(t.lyFull))}</div><div style="height:8px;background:rgba(255,255,255,.25);border-radius:4px;margin-top:4px"><div style="height:8px;width:${Math.min(100, prog)}%;background:#fff;border-radius:4px"></div></div>` : ''}</div>
      ${Y.lyFrom ? `<div class="notice grey">${L.lyPartial(esc(dShort(Y.lyFrom) + ' ' + Y.lyFrom.slice(0, 4)))}</div>` : ''}
      <div class="trio" style="grid-template-columns:1fr 1fr">
        <div class="card"><div class="kv-l">${L.customers}</div><div class="kv-v num">${fmt(t.bills)}</div>${dlt(t.bills, t.lyBills)}<div class="d mut num">${L.basket} ${fmt2(t.basket)} · ${L.lyWas(Y.lastYear, fmt2(t.lyBasket))}</div></div>
        <div class="card"><div class="kv-l">${L.grossMargin}</div><div class="kv-v num">${t.margin == null ? '–' : fmt1(t.margin) + '%'}</div><div class="d mut num">${L.lyWas(Y.lastYear, t.lyMargin == null ? '–' : fmt1(t.lyMargin) + '%')}</div>${t.marginPart ? `<div class="d mut" style="font-size:10px">${L.marginPart}</div>` : ""}<div class="d mut num">${L.avgDay} ${fmt(t.avgDay)}</div></div></div>
      <div class="card"><h3>${L.monthsChart}<small><span class="dot" style="background:var(--brand)"></span>${Y.year} <span class="dot" style="background:#D5DCD3;margin-inline-start:8px"></span>${Y.lastYear}</small></h3>
        <div dir="ltr" style="display:flex;align-items:flex-end;gap:4px;height:110px">${Y.months.map((m) => `<div style="flex:1;display:flex;align-items:flex-end;gap:1px;height:100%" title="${L.mon[m.m - 1]} ${fmt(m.cur)} / ${fmt(m.lyFull)}"><div style="flex:1;height:${Math.round((m.lyFull || 0) / mmax * 100)}%;background:#D5DCD3;border-radius:2px 2px 0 0"></div><div style="flex:1;height:${Math.round((m.cur || 0) / mmax * 100)}%;background:${m.partial ? '#7FB596' : 'var(--brand)'};border-radius:2px 2px 0 0"></div></div>`).join('')}</div>
        <div dir="ltr" style="display:flex;gap:4px;font-size:9px;color:var(--muted);margin-top:4px">${Y.months.map((m) => `<div style="flex:1;text-align:center">${L.mon[m.m - 1]}</div>`).join('')}</div>
        <div style="margin-top:8px">${Y.months.filter((m) => m.cur != null).map((m) => { const q = m.partial ? pc(m.cur, m.ly) : pc(m.cur, m.lyFull); return `<div style="display:flex;justify-content:space-between;font-size:12px;padding:5px 0;border-top:1px solid var(--line)"><span>${L.monF[m.m - 1]}${m.partial ? ' *' : ''}</span><span class="num">${fmtM(m.cur)} <span class="mut">/ ${fmtM(m.partial ? m.ly : m.lyFull)}</span> <b class="${cls(q)}">${arrow(q) || '–'}</b></span></div>`; }).reverse().join('')}</div>
        <div class="d mut" style="font-size:10px;margin-top:4px">${L.partialNote}</div></div>
      <div class="card"><h3>${L.branchesYTD}<small>${L.aed}</small></h3>
        ${Y.rows.map((r) => { const q = pc(r.lflCur, r.lflPrev); const w = q == null ? 0 : Math.abs(q) / maxAbs * 100; return `<a href="#/branch/${r.code}" style="display:flex;flex-direction:column;gap:5px;padding:7px 0;border-top:1px solid var(--line);color:var(--ink)">
          <div style="display:flex;justify-content:space-between;font-size:13px"><b>${esc(bName(r.code))}</b><span class="num"><b>${fmtM(r.sales)}</b> <span class="mut">/ ${fmtM(r.ly)}</span> <span class="${cls(q)}" style="font-weight:700">${arrow(q)}</span></span></div>
          <div dir="ltr" style="display:grid;grid-template-columns:1fr 1fr"><div style="display:flex;justify-content:flex-end;border-right:2px solid var(--ink);height:8px">${q < 0 ? `<div style="width:${w}%;background:var(--down);border-radius:4px 0 0 4px"></div>` : ''}</div><div style="display:flex;height:8px">${q >= 0 ? `<div style="width:${w}%;background:var(--up);border-radius:0 4px 4px 0"></div>` : ''}</div></div>
          <div class="mut num" style="font-size:11px">${L.customers} ${fmt(r.bills)}${r.margin != null ? ' · ' + L.grossMargin + ' ' + fmt1(r.margin) + '%' : ''}</div></a>`; }).join('')}</div>
      <div class="card"><h3>${L.yearMix}<small>${L.aed}</small></h3>
        <div style="display:flex;height:12px;border-radius:6px;overflow:hidden">${mx.map((v, i) => `<div style="width:${v / mt * 100}%;background:${MC[i]}"></div>`).join('')}</div>
        ${mx.map((v, i) => `<div style="display:flex;justify-content:space-between;font-size:12px;padding:6px 0;border-top:${i ? '1px solid var(--line)' : '0'}"><span><span class="dot" style="background:${MC[i]}"></span>${L.mixNames[i]} · ${fmt1(v / mt * 100)}%</span><span class="num"><b>${fmtM(v)}</b> ${dlt(v, mxl[i])}</span></div>`).join('')}</div></div>`;
  }
  VIEWS.month = () => {
    if (S.mview === 'y') return yearView();
    const L = T(), M = S.data.month, tt = M.total, p = pc(tt.lflCur, tt.lflPrev);
    const maxAbs = Math.max(1, ...M.rows.map((r) => Math.abs(pc(r.lflCur, r.lflPrev) || 0)));
    const dmax = Math.max(1, ...M.daily.map((x) => x.v));
    return `<div class="subhdr"><h1>${L.monthTitle(L.monF[M.month - 1], M.year)}</h1><div class="s">${L.monthSub('01', String(M.day).padStart(2, '0') + ' ' + L.mon[M.month - 1], M.day)}</div>${mySeg()}</div>
      <div class="wrap">
      <div class="card" style="background:var(--brand);color:#fff"><div class="op85" style="font-size:12px">${L.mtdSales}</div>
        <div style="display:flex;align-items:baseline;gap:10px"><div class="big" style="font-size:30px">${money(tt.mtd)}</div><span class="chip num ${cls(p)}">${arrow(p) || L.na}</span></div>
        <div class="op85" style="font-size:11px">${L.vsLM} (${(L.monF[M.prevMonth - 1] + " " + M.prevYear)}: <span class="num">${fmt(tt.prev)}</span>) · ${L.lflDays}</div></div>
      <div class="trio" style="grid-template-columns:1fr 1fr">
        <div class="card"><div class="kv-l">${L.projected}</div><div class="kv-v num">${fmt(tt.projected)}</div><div class="d mut num">${M.day}/${M.daysInMonth}</div></div>
        <div class="card"><div class="kv-l">${L.customers}</div><div class="kv-v num">${fmt(tt.bills)}</div><div class="d mut num">${L.basket} ${fmt2(tt.basket)}</div></div></div>
      ${M.hasBudget ? '' : `<div class="notice grey">${L.budgetMissing}</div>`}
      <div class="card"><h3>${L.branchesVsLM}<small>${L.aed}</small></h3>
        ${M.rows.map((r) => { const q = pc(r.lflCur, r.lflPrev); const w = q == null ? 0 : Math.abs(q) / maxAbs * 100; return `<a href="#/branch/${r.code}" style="display:flex;flex-direction:column;gap:5px;padding:7px 0;border-top:1px solid var(--line);color:var(--ink)">
          <div style="display:flex;justify-content:space-between;font-size:13px"><b>${esc(bName(r.code))}</b><span class="num"><b>${fmt(r.mtd)}</b> <span class="${cls(q)}" style="font-weight:700">${arrow(q)}</span></span></div>
          <div dir="ltr" style="display:grid;grid-template-columns:1fr 1fr"><div style="display:flex;justify-content:flex-end;border-right:2px solid var(--ink);height:8px">${q < 0 ? `<div style="width:${w}%;background:var(--down);border-radius:4px 0 0 4px"></div>` : ''}</div><div style="display:flex;height:8px">${q >= 0 ? `<div style="width:${w}%;background:var(--up);border-radius:0 4px 4px 0"></div>` : ''}</div></div></a>`; }).join('')}</div>
      <div class="card"><h3>${L.dailySalesMonth}<small>${L.thousands}</small></h3><div style="display:flex;align-items:flex-end;gap:3px;height:90px">${M.daily.map((x) => `<div style="flex:1;height:${Math.round(x.v / dmax * 86) + 2}px;background:${x.date === S.date ? 'var(--brand)' : '#BFDCCB'};border-radius:3px 3px 0 0" title="${x.date} ${fmt(x.v)}"></div>`).join('')}</div></div></div>`;
  };

  VIEWS.reports = () => {
    const L = T(), m = S.meta;
    const card = (bg, title, sub, tag, href) => `<${href ? `a href="${href}"` : 'div'} class="scard" style="background:${bg};${href ? '' : 'opacity:.75'}"><div style="display:flex;justify-content:space-between;align-items:center;gap:8px"><div style="font-size:16px;font-weight:700">${title}</div><span style="font-size:10px;font-weight:700;background:rgba(255,255,255,.2);border-radius:6px;padding:3px 7px;white-space:nowrap">${tag}</span></div><div style="font-size:12px;opacity:.9">${sub}</div></${href ? 'a' : 'div'}>`;
    return `<div class="subhdr"><h1>${L.reports}</h1><div class="s">${L.reportsSub}</div></div><div class="wrap">
      ${card('#4E3A86', L.rDaily, L.rDailySub, L.open, '#/day-by-day')}
      ${card('var(--brand)', L.rHours, L.rHoursSub, L.open, '#/hours')}
      ${card('var(--amber)', L.rSamoon, L.rLive, L.open, '#/samoon-basket')}
      ${card('var(--blue)', L.rSubsidy, L.rLive, L.open, '#/subsidy-basket')}
      ${card('#5A6B60', L.rStopped, L.rStoppedSub, L.soon)}
      <div class="card" style="padding:2px 14px"><h3 style="padding-top:10px">${L.dataStatus}</h3>
        <div class="row"><span class="sub">${L.lastSync}</span><span class="num" style="font-size:13px">${m.lastSync ? new Date(m.lastSync).toLocaleString('en-GB', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' }) : '–'}</span></div>
        <div class="row"><span class="sub">${L.latestComplete}</span><span class="num" style="font-size:13px">${m.latestComplete ? esc(dShort(m.latestComplete)) : '–'}</span></div>
        <div class="row"><span class="sub">${L.latestDay}</span><span class="num" style="font-size:13px">${m.latest ? esc(dShort(m.latest)) : '–'}</span></div>
        ${window.BSA_PUSH && window.BSA_PUSH.available() ? `<div class="row"><span class="sub">${L.notifyTitle}</span>${window.BSA_PUSH.isOn() ? `<span style="font-size:13px;font-weight:600;color:var(--brand)">✓ ${L.notifyIsOn}</span>` : `<button class="smbtn" data-act="push">${L.notifyOn}</button>`}</div>` : ""}
        <div class="row"><span class="sub">${L.language}</span>${langToggle().replace('class="lang"', 'class="lang" style="background:var(--soft)"').replace(/color:#fff/g, '')}</div>
        ${window.BSA_REMOTE ? "" : `<div class="row"><span></span><button class="smbtn" data-act="logout">${L.signOut}</button></div>`}</div></div>`;
  };

  // ------------------------------------------------------------ basket reports (old-model POS bills)
  S.bkCache = new Map(); S.bkMonths = null; S.bkPeriod = 'last';
  function bkRange() {
    const ms = S.bkMonths || [], full = ms.filter((m, i) => i < ms.length - 1 || m < '2026-08'), last = full[full.length - 1];
    const back = (n) => full[Math.max(0, full.length - n)];
    return { last: [last, last], '3m': [back(3), last], '12m': [back(12), last], all: [ms[0], ms[ms.length - 1]] }[S.bkPeriod];
  }
  let bkBusy = false;
  async function loadBasket(kind) {
    if (bkBusy) return; bkBusy = true;
    try {
      if (!S.bkMonths) { const a = await api('/api/basket?kind=' + kind); S.bkMonths = a.months || []; }
      const [f, t] = bkRange(), key = [kind, f, t, S.branch].join('|');
      if (!S.bkCache.has(key)) S.bkCache.set(key, await api(`/api/basket?kind=${kind}&from=${f}&to=${t}&branch=${S.branch}`));
    } finally { bkBusy = false; }
    render();
  }
  const ymLabel = (ym) => ym ? T().mon[+ym.slice(5, 7) - 1] + ' ' + ym.slice(0, 4) : '';
  function basketView(kind) {
    const L = T(), isS = kind === 'samoon', color = isS ? 'var(--amber)' : 'var(--blue)';
    const head = (inner) => `<div class="subhdr"><button class="back" data-act="go" data-v="#/reports">${chevBack()}${L.reports}</button><h1>${isS ? L.rSamoon : L.rSubsidy}</h1><div class="s">${isS ? L.bSubS : L.bSubA}</div>
      <div class="chips">${[['last', S.bkMonths ? ymLabel(bkRangeFor('last')[0]) : L.pLastM], ['3m', L.p3m], ['12m', L.p12m], ['all', L.pAll]].map(([v, l]) => `<button data-act="bkp" data-v="${v}" class="${S.bkPeriod === v ? 'on' : ''}">${esc(l)}</button>`).join('')}</div>${branchChips()}</div>${inner}`;
    if (!S.bkMonths) { loadBasket(kind).catch(onErr); return head(`<div class="loading">…</div>`); }
    const [f, t] = bkRange(), d = S.bkCache.get([kind, f, t, S.branch].join('|'));
    if (!d) { loadBasket(kind).catch(onErr); return head(`<div class="loading">…</div>`); }
    if (!d.available || !d.drvBills) return head(`<div class="wrap"><div class="notice grey">${L.noBasket}</div></div>`);
    const period = d.from === d.to ? ymLabel(d.from) : ymLabel(d.from) + ' – ' + ymLabel(d.to);
    const cmax = Math.max(1, ...d.cats.map((c) => c.pct));
    const catRows = d.cats.map((c) => `<div style="display:grid;grid-template-columns:116px 1fr 38px 64px;gap:8px;align-items:center;font-size:12px;padding:3px 0"><span>${esc(c.name)}</span>${hbar(c.pct / cmax * 100, color)}<b class="num" style="text-align:end">${Math.round(c.pct)}%</b><span class="num mut" style="text-align:end">${fmt(c.val)}</span></div>`).join('');
    const tmax = Math.max(1, ...d.trend.map((x) => x.share || 0));
    const trend = `<div style="display:flex;align-items:flex-end;gap:2px;height:70px">${d.trend.map((x) => `<div title="${x.month} ${fmt1(x.share)}%" style="flex:1;height:${Math.round((x.share || 0) / tmax * 66) + 2}px;background:${color};opacity:${x.partial ? 0.4 : 1};border-radius:2px 2px 0 0"></div>`).join('')}</div>
      <div style="display:flex;justify-content:space-between;font-size:10px;color:var(--muted)"><span>${ymLabel(d.trend[0].month)}</span><span>${ymLabel(d.trend[d.trend.length - 1].month)}</span></div>`;
    const pAvg = pc(d.avgWith, d.avgWithout);
    let hero, trio, board;
    if (isS) {
      const ring = Math.max(0.5, d.drvShareOfBasket || 0), C2 = 2 * Math.PI * 38;
      hero = `<div class="card" style="background:var(--amber);color:#fff;display:flex;align-items:center;gap:14px">
        <svg width="96" height="96" viewBox="0 0 96 96" role="img" aria-label="${fmt1(d.drvShareOfBasket)}%"><circle cx="48" cy="48" r="38" fill="none" stroke="#F2C14E" stroke-width="14"/><circle cx="48" cy="48" r="38" fill="none" stroke="#fff" stroke-width="14" stroke-dasharray="${(C2 * ring / 100).toFixed(1)} ${C2.toFixed(1)}" transform="rotate(-90 48 48)"/><text x="48" y="46" text-anchor="middle" font-size="15" font-weight="700" fill="#fff">${fmt1(d.drvShareOfBasket)}%</text><text x="48" y="61" text-anchor="middle" font-size="9" fill="#fff">${L.isSamoon}</text></svg>
        <div><div style="font-size:12px;opacity:.9">${L.perAedS}</div><div class="big" style="font-size:28px">${rtl() ? `<span class="num">${fmt2(d.perAed)}</span> ${L.aed}` : `<span class="num">${L.aed} ${fmt2(d.perAed)}</span>`}</div><div style="font-size:12px;opacity:.9">${L.perAedS2}</div></div></div>`;
      trio = [[L.billsWithS, fmt(d.drvBills), `${fmt1(d.share)}% ${L.ofAll}`], [L.avgWithS, fmt2(d.avgWith), `<span class="${cls(pAvg)}">${arrow(pAvg)}</span> ${L.vsOthers}`], [L.onlyS, fmt1(d.onlyPct) + '%', L.ofDrvBillsS]];
      board = L.boardS(fmt1(d.share), fmt(d.drvBills), fmt(d.otherVal), fmt2(d.perAed), fmt1(d.onlyPct), period);
    } else {
      const sw = Math.round(d.avgDrv / d.avgWith * 100);
      hero = `<div class="card" style="background:var(--blue);color:#fff;display:flex;flex-direction:column;gap:10px">
        <div style="display:flex;align-items:baseline;gap:10px"><div class="big num" style="font-size:34px">${fmt1(d.alsoPct)}%</div><div style="font-size:13px">${L.alsoA}</div></div>
        <div style="font-size:12px;opacity:.9">${L.avgBillA} <b class="num">${fmt2(d.avgWith)}</b> ${L.aed}</div>
        <div style="display:flex;height:26px;border-radius:8px;overflow:hidden;font-size:11px;font-weight:700"><div style="width:${sw}%;background:#9CC3E0;color:#13261B;display:flex;align-items:center;padding:0 8px;white-space:nowrap">${L.subLbl} <span class="num" style="margin-inline-start:4px">${fmt0(d.avgDrv)}</span></div><div style="flex:1;background:#fff;color:var(--blue);display:flex;align-items:center;justify-content:flex-end;padding:0 8px;white-space:nowrap">${L.regLbl} <span class="num" style="margin-inline-start:4px">${fmt0(d.avgOther)}</span></div></div>
        <div style="display:flex;justify-content:space-between;font-size:11px;opacity:.9"><span>${L.zeroMargin}</span><span>${L.normalMargin}</span></div></div>`;
      trio = [[L.billsWithA, fmt(d.drvBills), `${fmt1(d.share)}% ${L.ofAll}`], [L.regularSales, fmt(d.otherVal), L.inSameBills], [L.gpRegular, d.otherGP == null ? '–' : fmt(d.otherGP), d.gpCoverage ? L.gpNote(Math.round(d.gpCoverage)) : '']];
      board = L.boardA(fmt(d.drvBills), fmt1(d.share), fmt1(d.alsoPct), fmt(d.otherVal), fmt2(d.otherVal / (d.drvVal || 1)), period);
    }
    return head(`<div class="wrap">${hero}
      <div class="trio">${trio.map((x) => `<div class="card" style="padding:10px 12px"><div class="kv-l">${x[0]}</div><div class="kv-v num">${x[1]}</div><div class="d mut">${x[2]}</div></div>`).join('')}</div>
      <div class="card"><h3>${L.alsoIn}<small>${L.alsoSub}</small></h3>${catRows}</div>
      <div class="card"><h3>${isS ? L.trendS : L.trendA}</h3>${trend}</div>
      <div class="card" style="background:var(--dark);color:#fff"><div style="font-size:11px;font-weight:700;letter-spacing:.5px;color:${isS ? '#F2C14E' : '#9CC3E0'}">${L.forBoard}</div><div style="font-size:13px;line-height:1.5;margin-top:4px">${esc(board)}</div></div>
      <div class="notice grey">${L.sourceNote(esc(d.lastDate ? dShort(d.lastDate) + ' ' + d.lastDate.slice(0, 4) : ''))}</div></div>`);
  }
  function bkRangeFor(p) { const keep = S.bkPeriod; S.bkPeriod = p; const r = bkRange(); S.bkPeriod = keep; return r; }
  const fmt0 = (n) => fmt(n);
  const onErr = (e) => { if (e.login) renderLogin(); else $app.innerHTML = `<div class="loading">Error: ${esc(e.message)}</div>`; };
  // ------------------------------------------------------------ Day by day report (every day and branch since 2023)
  S.dbd = null; S.dbdS = null; let dbdBusy = false;
  async function loadDaily() {
    if (dbdBusy) return; dbdBusy = true;
    try { S.dbd = await api('/api/daily'); } finally { dbdBusy = false; }
    render();
  }
  VIEWS['day-by-day'] = () => {
    const L = T(), X = S.dbd;
    const head = (sub, ctl) => `<div class="subhdr"><button class="back" data-act="go" data-v="#/reports">${chevBack()}${L.reports}</button><h1>${L.rDaily}</h1><div class="s">${sub}</div>${ctl || ''}</div>`;
    if (!X) { loadDaily().catch(onErr); return head('…') + '<div class="wrap"><div class="loading">…</div></div>'; }
    if (!X.start) return head('') + `<div class="wrap"><div class="notice grey">${L.noData}</div></div>`;
    const D0 = Date.parse(X.start + 'T00:00:00Z'), DAY = 864e5, N = X.sales[0].length;
    const isoOf = (i) => new Date(D0 + i * DAY).toISOString().slice(0, 10);
    const ix = (s) => Math.round((Date.parse(s + 'T00:00:00Z') - D0) / DAY);
    if (!S.dbdS) { const d = new Date(S.date + 'T00:00:00Z'); S.dbdS = { y: d.getUTCFullYear(), m: d.getUTCMonth(), br: 'all', mode: 'date', view: 'days', open: null, cell: null }; }
    const st = S.dbdS;
    if (!X.ev) { X.ev = {}; for (const [a, b, k] of X.events || []) for (let t = Date.parse(a + 'T00:00:00Z'); t <= Date.parse(b + 'T00:00:00Z'); t += DAY) X.ev[new Date(t).toISOString().slice(0, 10)] = k; }
    const EV = (d) => (X.ev[d] ? L.ev[X.ev[d]] : null);
    const names = X.codes.map((c) => bName(c));
    const YC = ['#0B6B37', '#1F5C8A', '#D99A1E', '#A3ADA6'], YCH = ['#FFFFFF', '#9CC3E4', '#F2C66F', '#C9D0CB'];
    const fk = (n) => (n == null ? '–' : n >= 1e6 ? (n / 1e6).toFixed(2) + 'M' : Math.round(n / 1000) + 'k');
    const arr = (p) => (p == null ? L.na : arrow(p));
    const chip = (p) => `<span class="dbd-chip num ${p == null ? 'na' : p >= 0 ? 'up' : 'down'}">${arr(p)}</span>`;
    const cs = st.br === 'all' ? [0, 1, 2, 3] : [X.codes.indexOf(st.br)];
    const val = (i, c) => (i < 0 || i >= N ? null : c.reduce((a, k) => a + X.sales[k][i], 0));
    const back = (i, k, ds) => {
      if (st.mode === 'week') return i - 364 * k;
      const y = +ds.slice(0, 4) - k, md = ds.slice(5);
      return ix(md === '02-29' ? y + '-02-28' : y + '-' + md);
    };
    const pair = (i, j, c) => {
      if (j < 0 || j >= N || i >= N) return [null, null];
      let a = 0, b = 0, n = 0;
      for (const k of c) if (X.sales[k][i] > 0 && X.sales[k][j] > 0) { a += X.sales[k][i]; b += X.sales[k][j]; n++; }
      return n ? [a, b] : [null, null];
    };
    const dim = new Date(Date.UTC(st.y, st.m + 1, 0)).getUTCDate(), days = [];
    for (let d = 1; d <= dim; d++) {
      const ds = st.y + '-' + String(st.m + 1).padStart(2, '0') + '-' + String(d).padStart(2, '0');
      if (ds > X.end) break; if (ds < X.start) continue;
      days.push({ d, ds, i: ix(ds), wd: new Date(ds + 'T00:00:00Z').getUTCDay() });
    }
    const years = days.length ? [0, 1, 2, 3].filter((k) => back(days[0].i, k, days[0].ds) >= 0) : [0];
    // each year counts only the branch-days posted in the selected year (fair when the month is still running)
    const tot = years.map((k) => days.reduce((a, x) => { const j = back(x.i, k, x.ds); return a + (j < 0 || j >= N ? 0 : cs.reduce((t, c) => t + (X.sales[c][x.i] > 0 ? X.sales[c][j] : 0), 0)); }, 0));
    let lA = 0, lB = 0, up = 0, cmpd = 0, best = null, worst = null;
    for (const x of days) {
      const [a, b] = pair(x.i, back(x.i, 1, x.ds), cs); if (a == null) continue;
      lA += a; lB += b; cmpd++; const p = pc(a, b); if (p >= 0) up++;
      if (!best || p > best.p) best = { p, x }; if (!worst || p < worst.p) worst = { p, x };
    }
    const ly = st.y - 1, brName = st.br === 'all' ? L.allBranches : names[X.codes.indexOf(st.br)];
    const modeL = st.mode === 'date' ? L.modeDate : L.modeWd;
    const s0 = new Date(X.start + 'T00:00:00Z'), e0 = new Date(X.end + 'T00:00:00Z');
    const canPrev = st.y > s0.getUTCFullYear() || st.m > s0.getUTCMonth(), canNext = st.y < e0.getUTCFullYear() || st.m < e0.getUTCMonth();
    const ctl = `<div class="dbd-mrow"><button data-act="dbdm" data-v="-1" aria-label="${L.prevMonth}" ${canPrev ? '' : 'disabled'}>${chevBack()}</button><b>${L.monF[st.m]} ${st.y}</b><button data-act="dbdm" data-v="1" aria-label="${L.nextMonth}" ${canNext ? '' : 'disabled'}>${chevFwd()}</button></div>
      <div class="chips">${[['all', L.allBranches], ...X.codes.map((c, i) => [c, names[i]])].map(([c, l]) => `<button data-act="dbdbr" data-v="${c}" class="${st.br === c ? 'on' : ''}">${esc(l)}</button>`).join('')}</div>
      <div class="seg" style="grid-template-columns:1fr 1fr"><button data-act="dbdmode" data-v="date" class="${st.mode === 'date' ? 'on' : ''}">${L.sameDate}</button><button data-act="dbdmode" data-v="week" class="${st.mode === 'week' ? 'on' : ''}">${L.sameWd}</button></div>`;
    let h = head(esc(brName) + ' · ' + L.cmpBy(modeL), ctl) + '<div class="wrap">';
    const p = lB ? pc(lA, lB) : null;
    h += `<div class="card" style="background:var(--brand);color:#fff"><div class="op85" style="font-size:12px">${L.monF[st.m]} ${st.y}${days.length && days.length < dim ? ' · 1–' + days[days.length - 1].d : ''} · ${esc(brName)}</div>
      <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap"><div class="big" style="font-size:28px">${money(tot[0])}</div>${chip(p)}</div>
      <div class="op85" style="font-size:11px">${L.vsYearBoth(ly, modeL)}</div>
      <div class="dbd-yrs">${years.map((k, n) => `<div><div class="y"><i class="dbd-sw" style="background:${YCH[n]}"></i>${st.y - k}</div><div class="v num">${fk(tot[n])}</div></div>`).join('')}</div>
      <div class="dbd-facts">
        <div><b class="num">${L.daysOf(up, cmpd)}</b>${L.beatY(ly)}</div>
        <div><b class="num">${fk(days.length ? tot[0] / days.length : null)} ${L.perDay}</b>${L.avgMonth}</div>
        <div><b class="num">${best ? best.x.d + ' ' + L.mon[st.m] + ' ' + arr(best.p) : '–'}</b>${L.strongest}</div>
        <div><b class="num">${worst ? worst.x.d + ' ' + L.mon[st.m] + ' ' + arr(worst.p) : '–'}</b>${L.weakest}</div>
      </div></div>`;
    h += `<div class="seg" style="grid-template-columns:repeat(3,1fr)">${[['days', L.vDays], ['heat', L.vHeat], ['lines', L.vLines]].map(([v, l]) => `<button data-act="dbdview" data-v="${v}" class="${st.view === v ? 'on' : ''}">${l}</button>`).join('')}</div>`;
    const legend = `<div class="dbd-legend">${years.map((k, n) => `<span><i class="dbd-sw" style="background:${YC[n]}"></i>${st.y - k}</span>`).join('')}</div>`;

    if (st.view === 'days') {
      const mx = Math.max(1, ...days.flatMap((x) => years.map((k) => val(back(x.i, k, x.ds), cs) || 0)));
      h += `<div class="card"><h3>${L.everyDay(L.monF[st.m])}<small>${L.tapDay}</small></h3>${legend}<div style="margin-top:6px">`;
      for (const x of [...days].reverse()) {
        const v = val(x.i, cs), j = back(x.i, 1, x.ds), [a, b] = pair(x.i, j, cs), q = a == null ? null : pc(a, b);
        const ev = EV(x.ds), evL = j >= 0 ? EV(isoOf(j)) : null, posted = cs.filter((c) => X.sales[c][x.i] > 0).length;
        h += `<button class="dbd-day ${x.ds === S.date ? 'cur' : ''}" data-act="dbdopen" data-v="${x.ds}" aria-expanded="${st.open === x.ds}">
          <div class="dd ${x.wd === 6 || x.wd === 0 ? 'we' : ''}"><b class="num">${String(x.d).padStart(2, '0')}</b><span>${L.wdShort[x.wd]}</span></div>
          <div class="bars" dir="ltr">${years.map((k, n) => { const vv = val(back(x.i, k, x.ds), cs) || 0; return `<div class="bar" style="width:${Math.max(1, vv / mx * 100)}%;background:${YC[n]}"></div>`; }).join('')}
            <div dir="auto">${ev ? `<span class="dbd-evt">${ev}</span> ` : ''}${evL && evL !== ev ? `<span class="dbd-evt ly">${ly}: ${evL}</span>` : ''}</div></div>
          <div class="rv"><b class="num">${posted ? fmt(v) : L.dbdNotPosted}</b>${chip(q)}</div></button>`;
        if (st.open === x.ds) {
          const bA = cs.reduce((s, c) => s + X.bills[c][x.i], 0), bB = j >= 0 ? cs.reduce((s, c) => s + (X.bills[c][j] || 0), 0) : 0;
          h += `<div class="dbd-det"><table><tr><th>${L.wdShort[x.wd]} ${x.d} ${L.mon[st.m]}</th>${years.map((k) => `<th>${st.y - k}</th>`).join('')}<th>${L.vsY(ly)}</th></tr>
            ${X.codes.map((c, ci) => { const vals = years.map((k) => X.sales[ci][back(x.i, k, x.ds)] || 0); return `<tr><td>${esc(names[ci])}</td>${vals.map((vv) => `<td class="num">${vv ? fk(vv) : '–'}</td>`).join('')}<td class="num">${vals[0] && vals[1] ? arrow(pc(vals[0], vals[1])) : '–'}</td></tr>`; }).join('')}
            </table><div class="ev2">${L.billsDay(fmt(bA), bB ? fmt(bB) : null)}</div></div>`;
        }
      }
      h += `</div></div>`;
    } else if (st.view === 'heat') {
      const cols = `grid-template-columns:repeat(${Math.max(1, days.length)},minmax(0,1fr))`;
      const mix = (a, b, t) => { const q = (s) => [1, 3, 5].map((i) => parseInt(s.slice(i, i + 2), 16)); const A = q(a), B = q(b); return 'rgb(' + A.map((v, i) => Math.round(v + (B[i] - v) * t)).join(',') + ')'; };
      const col = (q) => { if (q == null) return '#E6EAE4'; const t = Math.max(-1, Math.min(1, q / 25)); return t >= 0 ? mix('#EEF1EC', '#0B6B37', t) : mix('#EEF1EC', '#8A1426', -t); };
      const rows = [['all', L.allShort, [0, 1, 2, 3]], ...X.codes.map((c, i) => [c, names[i], [i]])];
      h += `<div class="card"><h3>${L.heatT(ly)}<small>${L.tapSq}</small></h3><div class="dbd-heat" dir="ltr">`;
      for (const [rk, nm, rc] of rows) {
        h += `<div class="hrow"><div class="nm" dir="auto" style="${rk === 'all' ? 'font-weight:700;color:var(--ink)' : ''}">${esc(nm)}</div><div class="cells" style="${cols}">${days.map((x) => { const [a, b] = pair(x.i, back(x.i, 1, x.ds), rc); const q = a == null ? null : pc(a, b); const key = rk + '|' + x.ds; return `<button class="cell ${st.cell === key ? 'sel' : ''}" data-act="dbdcell" data-v="${key}" style="background:${col(q)}" aria-label="${esc(nm)} ${x.d} ${L.mon[st.m]} ${arr(q)}"></button>`; }).join('')}</div></div>`;
      }
      h += `<div class="hrow"><div></div><div class="daynums num" style="${cols}">${days.map((x) => `<span>${x.d % 5 === 0 || x.d === 1 ? x.d : ''}</span>`).join('')}</div></div></div>
        <div class="dbd-scale" dir="ltr"><span>−25%</span><i></i><span>+25%</span></div>`;
      if (st.cell) {
        const [rk, ds] = st.cell.split('|'), x = days.find((d) => d.ds === ds);
        if (x) {
          const rc = rk === 'all' ? [0, 1, 2, 3] : [X.codes.indexOf(rk)], nm = rk === 'all' ? L.allBranches : names[X.codes.indexOf(rk)];
          const j = back(x.i, 1, x.ds), [a, b] = pair(x.i, j, rc), jd = j >= 0 ? isoOf(j) : null;
          h += `<div class="dbd-pick"><b>${esc(nm)} · ${L.wdShort[x.wd]} ${x.d} ${L.mon[st.m]} ${st.y}</b><br><span class="num">${fmt(a)}</span> ${L.aed} · ${L.vsY(jd ? dShort(jd) + ' ' + jd.slice(0, 4) : ly)}: <span class="num">${fmt(b)}</span> · ${arr(a == null ? null : pc(a, b))}${EV(x.ds) ? '<br>' + EV(x.ds) + ' · ' + L.evThis : ''}${jd && EV(jd) ? '<br>' + EV(jd) + ' · ' + L.evCmp : ''}</div>`;
        }
      }
      h += `</div>`;
      const rk = X.codes.map((c, ci) => { let a = 0, b = 0; for (const x of days) { const [p1, p2] = pair(x.i, back(x.i, 1, x.ds), [ci]); if (p1 != null) { a += p1; b += p2; } } return { n: names[ci], p: pc(a, b), a }; }).sort((u, v) => (v.p == null ? -999 : v.p) - (u.p == null ? -999 : u.p));
      h += `<div class="card"><h3>${L.brMonth}<small>${L.vsY(ly)}</small></h3>${rk.map((r) => `<div style="display:flex;justify-content:space-between;align-items:center;padding:7px 0;border-top:1px solid var(--line);font-size:13px"><span>${esc(r.n)}</span><span class="num">${fk(r.a)} ${chip(r.p)}</span></div>`).join('')}</div>`;
    } else {
      h += `<div class="card"><h3>${L.dailyT(L.monF[st.m])}<small>${L.thousands}</small></h3>${legend}${dbdLines(days, years, cs, val, back, EV, YC)}</div>`;
      const wk = years.map((k) => { const s = [0, 0, 0, 0, 0, 0, 0], n = [0, 0, 0, 0, 0, 0, 0]; for (const x of days) { const j = back(x.i, k, x.ds), v = val(j, cs); if (v) { const w = new Date(D0 + j * DAY).getUTCDay(); s[w] += v; n[w]++; } } return s.map((v, w) => (n[w] ? v / n[w] : 0)); });
      const wmx = Math.max(1, ...wk.flat()), order = [0, 1, 2, 3, 4, 5, 6];
      h += `<div class="card"><h3>${L.wkAvg}<small>${L.eachYear(L.monF[st.m])}</small></h3><div class="dbd-wk">${order.map((w) => `<div class="c" dir="ltr">${years.map((k, n) => `<i style="height:${wk[n][w] / wmx * 100}%;background:${YC[n]}"></i>`).join('')}</div>`).join('')}</div><div class="dbd-wkl">${order.map((w) => `<span>${L.wdShort[w]}</span>`).join('')}</div></div>`;
    }

    const ins = [];
    if (cmpd) ins.push(['#E3F1E8', '#0B6B37', '▲', L.insUp(up, cmpd, ly, p == null ? null : arrow(p))]);
    const evDays = days.filter((x) => { const j = back(x.i, 1, x.ds); return EV(x.ds) || (j >= 0 && EV(isoOf(j))); });
    if (evDays.length) ins.push(['#EFE8F7', '#6B3FA0', '☾', L.insEv(evDays.length)]);
    if (st.br === 'all') {
      const rk = X.codes.map((c, ci) => { let a = 0, b = 0, dn = 0; for (const x of days) { const [p1, p2] = pair(x.i, back(x.i, 1, x.ds), [ci]); if (p1 != null) { a += p1; b += p2; if (p1 < p2) dn++; } } return { n: names[ci], dn, p: pc(a, b) }; }).filter((r) => r.p != null).sort((u, v) => u.p - v.p);
      if (rk.length) ins.push(rk[0].p < 0 ? ['#FBE9EC', '#8A1426', '▼', L.insWeak(rk[0].n, arrow(rk[0].p), rk[0].dn, ly)] : ['#FDF3E1', '#8A5A00', '▲', L.insSlow(rk[0].n, arrow(rk[0].p), rk[0].dn, ly)]);
    }
    const np = days.filter((x) => cs.some((c) => !X.sales[c][x.i])).length;
    if (np) ins.push(['#EEF1EC', '#4A5A50', '!', L.insNp(np)]);
    if (ins.length) h += `<div class="card"><h3>${L.standOut}</h3><div class="dbd-ins">${ins.map(([bg, fg, ic, t]) => `<div><i style="background:${bg};color:${fg}">${ic}</i><span>${t}</span></div>`).join('')}</div></div>`;
    h += `<div class="notice grey">${L.dbdNote}</div></div>`;
    return h;
  };
  function dbdLines(days, years, cs, val, back, EV, YC) {
    const W = 340, H = 170, Lp = 30, R = 8, Tp = 8, Bt = 22;
    const ser = years.map((k) => days.map((x) => { const v = val(back(x.i, k, x.ds), cs); return v || null; }));
    const all = ser.flat().filter((v) => v != null); if (!all.length) return '';
    let lo = Math.min(...all), hi = Math.max(...all); const pad = (hi - lo) * 0.08 || 1; lo = Math.max(0, lo - pad); hi += pad;
    const r = (hi - lo) / 4, pw = Math.pow(10, Math.floor(Math.log10(r))), f = r / pw, step = (f <= 1 ? 1 : f <= 2 ? 2 : f <= 2.5 ? 2.5 : f <= 5 ? 5 : 10) * pw;
    const y0 = Math.floor(lo / step) * step, y1 = Math.ceil(hi / step) * step;
    const Xp = (i) => Lp + (days.length < 2 ? 0 : i / (days.length - 1) * (W - Lp - R)), Yp = (v) => Tp + (1 - (v - y0) / (y1 - y0)) * (H - Tp - Bt);
    let g = '';
    for (let v = y0; v <= y1 + 1e-6; v += step) g += `<line x1="${Lp}" x2="${W - R}" y1="${Yp(v)}" y2="${Yp(v)}" stroke="#E6EAE4"/><text x="${Lp - 4}" y="${Yp(v) + 3}" font-size="9" text-anchor="end" fill="#4A5A50">${Math.round(v / 1000)}</text>`;
    days.forEach((x, i) => { if (x.d === 1 || x.d % 5 === 0) g += `<text x="${Xp(i)}" y="${H - 6}" font-size="9" text-anchor="middle" fill="#4A5A50">${x.d}</text>`; if (EV(x.ds)) g += `<rect x="${Xp(i) - 3}" y="${Tp}" width="6" height="${H - Tp - Bt}" fill="#6B3FA0" opacity=".08"/>`; });
    for (let n = ser.length - 1; n >= 0; n--) { let d = '', on = false; ser[n].forEach((v, i) => { if (v == null) { on = false; return; } d += (on ? 'L' : 'M') + Xp(i).toFixed(1) + ' ' + Yp(v).toFixed(1); on = true; }); g += `<path d="${d}" fill="none" stroke="${YC[n]}" stroke-width="${n ? 1.4 : 2.4}" stroke-linejoin="round" stroke-linecap="round"/>`; }
    const li = ser[0].length - 1; if (ser[0][li] != null) g += `<circle cx="${Xp(li)}" cy="${Yp(ser[0][li])}" r="3.5" fill="#0B6B37" stroke="#fff" stroke-width="1.5"/>`;
    return `<svg viewBox="0 0 ${W} ${H}" width="100%" dir="ltr" role="img">${g}</svg>`;
  }

  VIEWS['samoon-basket'] = () => basketView('samoon');
  VIEWS['subsidy-basket'] = () => basketView('subsidy');

  VIEWS.hours = () => {
    const L = T(), d = S.data.branchDetail;
    return `<div class="subhdr"><button class="back" data-act="go" data-v="#/reports">${chevBack()}${L.reports}</button><h1>${L.rHours}</h1><div class="s">${esc(dLabel(S.date))} · ${L.hoursNote}</div></div>
      <div class="wrap">${S.meta.branches.map((b) => { const h = d[b.code].hours, tot = h.reduce((a, x) => a + x, 0), pk = h.indexOf(Math.max(...h)); return `<div class="card"><h3>${esc(b[S.lang])}<small class="num">${fmt(tot)} ${L.bills} · ${String(pk).padStart(2, '0')}:00</small></h3>${hoursChart(h)}</div>`; }).join('')}</div>`;
  };

  // ------------------------------------------------------------ calendar
  function calendar() {
    const L = T(), m = S.meta, vm = S.cal.vm, y = +vm.slice(0, 4), mo = +vm.slice(5, 7) - 1;
    const first = new Date(Date.UTC(y, mo, 1)), dim = new Date(Date.UTC(y, mo + 1, 0)).getUTCDate(), lead = (first.getUTCDay() + 6) % 7;
    let cells = ''; for (let i = 0; i < lead; i++) cells += '<span></span>';
    for (let d = 1; d <= dim; d++) {
      const iso = `${y}-${String(mo + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`, dis = iso < m.first || iso > m.latest;
      cells += `<button class="num ${iso === S.date ? 'sel' : iso === m.latestComplete ? 'latest' : ''}" data-act="pick" data-v="${iso}" ${dis ? 'disabled' : ''}>${d}</button>`;
    }
    const wdh = [1, 2, 3, 4, 5, 6, 0].map((i) => `<div class="wd">${L.wdShort[i]}</div>`).join('');
    const pmOk = vm > m.first.slice(0, 7) + '-01', nmOk = vm < m.latest.slice(0, 7) + '-01';
    return `<div class="sheetbg"><button class="close-area" data-act="calclose" aria-label="${L.close}"></button><div class="sheet" role="dialog">
      <div class="grab"></div><div style="display:flex;justify-content:space-between;align-items:center"><b style="font-size:17px">${L.chooseDate}</b><button class="smbtn" data-act="calclose">${L.close}</button></div>
      <div class="chips"><button data-act="pick" data-v="${m.latestComplete}">${L.latestComplete}</button><button data-act="pick" data-v="${addDays(S.date, -7) < m.first ? m.first : addDays(S.date, -7)}">${L.sameLastWeek}</button><button data-act="pick" data-v="${lyOf(S.date)}" ${lyOf(S.date) < m.first ? 'disabled' : ''}>${L.sameLastYear}</button><button data-act="pick" data-v="${S.date.slice(0, 8)}01" ${S.date.slice(0, 8) + '01' < m.first ? 'disabled' : ''}>${L.first}</button></div>
      <div style="display:flex;justify-content:space-between;align-items:center"><button class="smbtn" data-act="calm" data-v="-1" ${pmOk ? '' : 'disabled'}>${chevBack()}</button><b>${L.monF[mo]} ${y}</b><button class="smbtn" data-act="calm" data-v="1" ${nmOk ? '' : 'disabled'}>${chevFwd()}</button></div>
      <div class="cal">${wdh}${cells}</div><div style="font-size:11px;color:var(--muted);text-align:center">${L.available(dShort(m.first), dShort(m.latest))}</div></div></div>`;
  }

  // ------------------------------------------------------------ login
  function renderLogin(msg) {
    const L = T();
    document.documentElement.dir = L.dir;
    $app.innerHTML = `<div class="login">${logo}<div style="font-size:18px;font-weight:700">${L.who}</div><div>${L.pin}</div>
      <input id="pin" type="password" inputmode="numeric" pattern="[0-9]*" maxlength="8" autocomplete="current-password" aria-label="${L.pin}">
      <button data-act="login">${L.signIn}</button><div class="err">${msg ? esc(msg) : ''}</div></div>`;
    const i = document.getElementById('pin'); i.focus();
    i.addEventListener('keydown', (e) => { if (e.key === 'Enter') doLogin(); });
  }
  async function doLogin() {
    const pin = (document.getElementById('pin') || {}).value || '';
    const r = await fetch('/api/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ pin }) });
    if (r.status === 429) return renderLogin(T().tooMany);
    if (!r.ok) return renderLogin(T().wrongPin);
    S.meta = null; S.cache.clear(); refresh();
  }

  // ------------------------------------------------------------ events
  async function setDate(iso) { S.date = iso; S.cal = null; $app.style.opacity = .6; await refresh(); $app.style.opacity = 1; }
  document.addEventListener('click', async (e) => {
    const el = e.target.closest('[data-act]'); if (!el) return;
    const a = el.dataset.act, v = el.dataset.v;
    if (a === 'login') return doLogin();
    if (a === 'lang') { S.lang = v; try { localStorage.setItem('bsa_lang', v); } catch { /* private mode */ } return render(); }
    if (a === 'prev') return setDate(addDays(S.date, -1));
    if (a === 'next') return setDate(addDays(S.date, 1));
    if (a === 'cal') { S.cal = { vm: S.date.slice(0, 8) + '01' }; return render(); }
    if (a === 'calclose') { S.cal = null; return render(); }
    if (a === 'calm') { const d = D(S.cal.vm); d.setUTCMonth(d.getUTCMonth() + +v); S.cal.vm = d.toISOString().slice(0, 10); return render(); }
    if (a === 'pick') return setDate(v);
    if (a === 'sort') { S.sortK = v; return render(); }
    if (a === 'catseg') { S.catSeg = +v; return render(); }
    if (a === 'fv') { S.fvVeg = v === '1'; return render(); }
    if (a === 'bkp') { S.bkPeriod = v; return render(); }
    if (a === 'mview') { S.mview = v; return render(); }
    if (a === 'push') { const L = T(); try { await window.BSA_PUSH.enable(); } catch (x) { window.alert(x.code === 'install' ? L.notifyInstall : x.code === 'denied' ? L.notifyDenied : L.notifyFail + ' ' + x.message); } return render(); }
    if (a.startsWith('dbd') && S.dbdS) {
      const st = S.dbdS;
      if (a === 'dbdm') { st.m += +v; if (st.m < 0) { st.m = 11; st.y--; } if (st.m > 11) { st.m = 0; st.y++; } st.open = st.cell = null; }
      else if (a === 'dbdbr') st.br = v; else if (a === 'dbdmode') st.mode = v; else if (a === 'dbdview') st.view = v;
      else if (a === 'dbdopen') st.open = st.open === v ? null : v; else if (a === 'dbdcell') st.cell = st.cell === v ? null : v;
      return render();
    }
    if (a === 'branch') { S.branch = v; $app.style.opacity = .6; await refresh(); $app.style.opacity = 1; return; }
    if (a === 'go') { location.hash = v; return; }
    if (a === 'back') { history.length > 1 ? history.back() : (location.hash = '#/today'); return; }
    if (a === 'logout') { await fetch('/api/logout', { method: 'POST' }); S.meta = null; S.cache.clear(); return renderLogin(); }
  });
  window.addEventListener('hashchange', () => { render(); window.scrollTo(0, 0); });
  // refresh figures when the app comes back to the foreground (e.g. next morning)
  document.addEventListener('visibilitychange', () => { if (!document.hidden && S.meta) { S.meta = null; S.cache.clear(); refresh(); } });
  refresh();
})();
