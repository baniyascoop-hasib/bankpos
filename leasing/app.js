// Baniyas & Al Resala leasing app (management). Plain JS, no build step. Data: /api/data (latest Rental Register snapshot).
'use strict';
const T = {
  en: {
    org: 'Properties & Leasing', orgSub: 'Baniyas · Al Resala', all: 'All', BAN: 'Baniyas', ALR: 'Al Resala',
    BANfull: 'Baniyas Cooperative', ALRfull: 'Al Resala Investment', rentRoll: 'Annual rent roll · live leases · as of {d}',
    aed: 'AED', propsUnits: '{p} properties · {u} leasable units', occupancy: 'Occupancy', leased: 'Leased', expired: 'Expired',
    vacant: 'Vacant', notready: 'Not ready', soon: 'Ends ≤ 90 days', ended: 'End date passed', fitout: 'Under fit-out', confirmed: 'Signed, not open',
    none: 'No register record', attention: 'Needs attention', expiredNR: '{n} expired, not renewed', atRisk: 'Rent at risk', endIn90: '{n} leases end in 90 days',
    within30: '{n} within 30 days · {a}', vacantUnits: '{n} vacant units', budgetYear: 'Budget rent {a} a year', overdue: 'Overdue rent',
    notConnected: 'Not connected yet – comes from the BC tenant accounts', byCompany: 'By company', allProps: 'All properties',
    ofLeased: '{p} properties · {l} of {u} leased · {o}', home: 'Home', properties: 'Properties', collections: 'Collections', leases: 'Leases', reports: 'Reports',
    propsSub: '{n} properties · by annual rent', units: '{n} units', leasedPct: '{p} leased', endSoon: '{n} end ≤ 90 d', annualRent: 'Annual rent',
    leasedOf: 'Leased', unitMap: 'Units', tapUnit: 'tap a unit for its lease', floorPlan: 'Floor plan', openPlan: 'Open the floor plan',
    largest: 'Largest tenants', unitsN: '{n} units', share: '{p} of rent', unitTypes: '{t}', back: 'Back', plan: 'Floor plan', planHint: 'Tap a unit · turn the phone for a larger map',
    allUnits: 'All units', tapAny: 'Tap any unit on the plan to see the tenant, status and rent.', tenantDetails: 'Lease details', fromRegister: 'not in register',
    lease: 'Lease', tawteeq: 'Tawteeq contract', term: 'Term', endsIn: 'Ends in', days: '{n} days', daysAgo: '{n} days ago', unitT: 'Unit', type: 'Type', status: 'Status',
    remark: 'Register remark', budget: 'Budget rent', payments: 'Payments & balance', paySoon: 'Cheques and balance will come from the BC tenant accounts.',
    leasesTitle: 'Leases & renewals', asOf: 'As of {d}', expiredNotRenewed: 'Expired, not renewed', atRiskShort: '{a} at risk', noTenant: '+ {n} units with no tenant on record',
    endingIn: 'Ending in the next {n} days', ends: 'ends {d}', passed: 'End date passed, still shown as leased', nothing: 'Nothing here.',
    vacancyTitle: 'Vacant units', vacancySub: 'Rent not earned at budget rates', perYear: 'Budget / year', perMonth: 'Per month', notReadyUnits: 'Not ready to lease',
    collTitle: 'Collections', collSub: 'Billed, collected and overdue rent', collSoon: 'Collections, aging, cheques held and bounced cheques will show here once the app reads the tenant accounts from Business Central.',
    reportsTitle: 'Reports', reportsSub: 'Same figures as the app · Excel (CSV)', rRegister: 'Rental register', rRegisterSub: 'Every unit, tenant and rent',
    rOcc: 'Occupancy by property', rOccSub: 'Leased, expired, vacant, not ready', rExp: 'Lease expiry schedule', rExpSub: 'Next 12 months',
    rVac: 'Vacant & not-ready units', rVacSub: 'With budget rent', download: 'Download', dataFrom: 'Data: {f} · uploaded {t}',
    signin: 'Sign in', username: 'Username', password: 'Password', wrong: 'Wrong username or password.', signout: 'Sign out', chpw: 'Change password',
    oldpw: 'Current password', newpw: 'New password (8+ characters)', save: 'Save', cancel: 'Cancel', pwdone: 'Password changed.',
    admin: 'Data & users', empty: 'No Rental Register has been uploaded yet.', uploadHint: 'An admin uploads the Rental Register under Data & users.',
    importTitle: 'Upload Rental Register', importSub: 'The weekly "Rental Register <date>.xlsx" (Baniyas + Alresala sheets).', choose: 'Choose file',
    imports: 'Uploads', users: 'Users', addUser: 'Add user', newPw: 'New password', viewer: 'management (view only)', adminRole: 'admin',
    shown: 'Give this password to {u} privately. It is shown only once.', kiosk: 'kiosk',
    update: 'Update data', renewal: 'Renewal', note: 'Note', corrected: 'Updated by the leasing team · {u} · {d}',
    refresh: 'Refresh', unpair: 'Remove from this phone', unpairQ: 'Remove the leasing app data from this phone? It will need a new QR code from the office.',
    pairTitle: 'This phone is not set up', pairBody: 'Ask the finance team in the office for your QR code and scan it with the iPhone camera.',
    installHint: 'Set up. Now tap Share, then Add to Home Screen, and open the app from the new icon.', badKey: 'This phone needs a new QR code from the office.',
    thisPhone: 'This phone', offlineR: 'No connection – showing the last data received.', officeOnly: 'Downloads work on the office network (management app on the office Wi-Fi).'
  },
  ar: {
    org: 'العقارات والتأجير', orgSub: 'بني ياس · الرسالة', all: 'الكل', BAN: 'بني ياس', ALR: 'الرسالة',
    BANfull: 'جمعية بني ياس التعاونية', ALRfull: 'الرسالة للاستثمار', rentRoll: 'إجمالي الإيجار السنوي · العقود السارية · حتى {d}',
    aed: 'درهم', propsUnits: '{p} عقارات · {u} وحدة قابلة للتأجير', occupancy: 'نسبة الإشغال', leased: 'مؤجرة', expired: 'منتهية',
    vacant: 'شاغرة', notready: 'غير جاهزة', soon: 'تنتهي خلال 90 يوماً', ended: 'انتهى تاريخ العقد', fitout: 'قيد التجهيز', confirmed: 'موقّع ولم يفتتح',
    none: 'غير مسجلة في السجل', attention: 'يتطلب المتابعة', expiredNR: '{n} عقود منتهية غير مجددة', atRisk: 'إيجار معرّض للخطر', endIn90: '{n} عقداً تنتهي خلال 90 يوماً',
    within30: '{n} خلال 30 يوماً · {a}', vacantUnits: '{n} وحدات شاغرة', budgetYear: 'إيجار الموازنة {a} سنوياً', overdue: 'إيجارات متأخرة',
    notConnected: 'غير مربوط بعد – من حسابات المستأجرين في BC', byCompany: 'حسب الشركة', allProps: 'كل العقارات',
    ofLeased: '{p} عقارات · {l} من {u} مؤجرة · {o}', home: 'الرئيسية', properties: 'العقارات', collections: 'التحصيل', leases: 'العقود', reports: 'التقارير',
    propsSub: '{n} عقارات · حسب الإيجار السنوي', units: '{n} وحدة', leasedPct: '{p} مؤجرة', endSoon: '{n} تنتهي خلال 90 يوماً', annualRent: 'الإيجار السنوي',
    leasedOf: 'مؤجرة', unitMap: 'الوحدات', tapUnit: 'اضغط على الوحدة لعرض عقدها', floorPlan: 'المخطط', openPlan: 'عرض مخطط الطوابق',
    largest: 'أكبر المستأجرين', unitsN: '{n} وحدات', share: '{p} من الإيجار', unitTypes: '{t}', back: 'رجوع', plan: 'مخطط الطوابق', planHint: 'اضغط على الوحدة · أدر الهاتف لخريطة أكبر',
    allUnits: 'كل الوحدات', tapAny: 'اضغط على أي وحدة في المخطط لعرض المستأجر والحالة والإيجار.', tenantDetails: 'تفاصيل العقد', fromRegister: 'غير موجود في السجل',
    lease: 'العقد', tawteeq: 'رقم توثيق', term: 'المدة', endsIn: 'ينتهي بعد', days: '{n} يوماً', daysAgo: 'منذ {n} يوماً', unitT: 'الوحدة', type: 'النوع', status: 'الحالة',
    remark: 'ملاحظة السجل', budget: 'إيجار الموازنة', payments: 'الدفعات والرصيد', paySoon: 'الشيكات والرصيد ستأتي من حسابات المستأجرين في BC.',
    leasesTitle: 'العقود والتجديدات', asOf: 'حتى {d}', expiredNotRenewed: 'منتهية وغير مجددة', atRiskShort: '{a} معرّض للخطر', noTenant: '+ {n} وحدات بدون مستأجر مسجل',
    endingIn: 'تنتهي خلال {n} يوماً', ends: 'ينتهي {d}', passed: 'انتهى تاريخ العقد ولا تزال تظهر مؤجرة', nothing: 'لا يوجد شيء هنا.',
    vacancyTitle: 'الوحدات الشاغرة', vacancySub: 'إيجار غير محقق حسب أسعار الموازنة', perYear: 'الموازنة سنوياً', perMonth: 'شهرياً', notReadyUnits: 'غير جاهزة للتأجير',
    collTitle: 'التحصيل', collSub: 'الإيجارات المفوترة والمحصلة والمتأخرة', collSoon: 'سيظهر هنا التحصيل وأعمار الذمم والشيكات الآجلة والمرتجعة عند ربط التطبيق بحسابات المستأجرين في Business Central.',
    reportsTitle: 'التقارير', reportsSub: 'نفس أرقام التطبيق · Excel (CSV)', rRegister: 'سجل الإيجارات', rRegisterSub: 'كل وحدة ومستأجر وإيجار',
    rOcc: 'الإشغال حسب العقار', rOccSub: 'مؤجرة، منتهية، شاغرة، غير جاهزة', rExp: 'جدول انتهاء العقود', rExpSub: 'الأشهر الـ 12 القادمة',
    rVac: 'الوحدات الشاغرة وغير الجاهزة', rVacSub: 'مع إيجار الموازنة', download: 'تنزيل', dataFrom: 'البيانات: {f} · رُفعت {t}',
    signin: 'تسجيل الدخول', username: 'اسم المستخدم', password: 'كلمة المرور', wrong: 'اسم المستخدم أو كلمة المرور غير صحيحة.', signout: 'تسجيل الخروج', chpw: 'تغيير كلمة المرور',
    oldpw: 'كلمة المرور الحالية', newpw: 'كلمة المرور الجديدة (8 أحرف أو أكثر)', save: 'حفظ', cancel: 'إلغاء', pwdone: 'تم تغيير كلمة المرور.',
    admin: 'البيانات والمستخدمون', empty: 'لم يتم رفع سجل الإيجارات بعد.', uploadHint: 'يرفع المسؤول سجل الإيجارات من صفحة البيانات والمستخدمين.',
    importTitle: 'رفع سجل الإيجارات', importSub: 'ملف "Rental Register <التاريخ>.xlsx" الأسبوعي (ورقتا بني ياس والرسالة).', choose: 'اختر الملف',
    imports: 'الملفات المرفوعة', users: 'المستخدمون', addUser: 'إضافة مستخدم', newPw: 'كلمة مرور جديدة', viewer: 'الإدارة (عرض فقط)', adminRole: 'مسؤول',
    shown: 'أعطِ كلمة المرور هذه إلى {u} بشكل خاص. تظهر مرة واحدة فقط.', kiosk: 'كشك',
    update: 'تحديث البيانات', renewal: 'التجديد', note: 'ملاحظة', corrected: 'حدّثه فريق التأجير · {u} · {d}',
    refresh: 'تحديث', unpair: 'إزالة من هذا الهاتف', unpairQ: 'إزالة بيانات التأجير من هذا الهاتف؟ ستحتاج إلى رمز QR جديد من المكتب.',
    pairTitle: 'هذا الهاتف غير مُعد', pairBody: 'اطلب رمز QR الخاص بك من فريق المالية في المكتب وامسحه بكاميرا الآيفون.',
    installHint: 'تم الإعداد. اضغط على مشاركة ثم إضافة إلى الشاشة الرئيسية، وافتح التطبيق من الأيقونة الجديدة.', badKey: 'يحتاج هذا الهاتف إلى رمز QR جديد من المكتب.',
    thisPhone: 'هذا الهاتف', offlineR: 'لا يوجد اتصال – يتم عرض آخر بيانات تم استلامها.', officeOnly: 'التنزيل متاح على شبكة المكتب.'
  }
};
const STATUS_COLOUR = {leased: '#0B6B37', soon: '#D99A1E', ended: '#C2551F', expired: '#A3172D', fitout: '#3F78C6', confirmed: '#8CC79C', vacant: '#FFFFFF', notready: '#9AA59E', none: '#D5DBD6'};
const STATUS_INK = {leased: '#FFFFFF', soon: '#13261B', ended: '#FFFFFF', expired: '#FFFFFF', fitout: '#FFFFFF', confirmed: '#13261B', vacant: '#8A5A00', notready: '#13261B', none: '#4A5A50'};
const PILL = {leased: '', soon: 'amber', ended: 'amber', expired: 'red', fitout: 'blue', confirmed: '', vacant: 'amber', notready: 'grey', none: 'grey'};

let lang = 'en', co = 'ALL', user = null, D = null, menuOpen = false, view = {}, flash = null, notice = null;
const REMOTE = !!window.LZ_REMOTE;
try { lang = localStorage.getItem('lz_lang') || 'en'; co = localStorage.getItem('lz_co') || 'ALL'; } catch (e) {}

const $ = s => document.querySelector(s);
const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'}[c]));
const t = (k, v) => (T[lang][k] || T.en[k] || k).replace(/\{(\w+)\}/g, (_, x) => v && v[x] != null ? v[x] : '');
const fmt = n => Math.round(n || 0).toLocaleString('en-US');
const fmtM = n => Math.abs(n) >= 1e6 ? (n / 1e6).toFixed(2) + 'M' : fmt(n);
const N = n => `<span class="num">${fmt(n)}</span>`;
const pct = (a, b) => b ? (a / b * 100).toFixed(1) + '%' : '—';
const loc = () => lang === 'ar' ? 'ar-AE-u-nu-latn' : 'en-GB';
const dstr = (iso, o) => iso ? new Date(iso + 'T12:00:00').toLocaleDateString(loc(), o || {day: 'numeric', month: 'short', year: 'numeric'}) : '—';
const pname = key => { const p = D.properties.find(x => x.key === key); return p ? (lang === 'ar' ? p.name_ar : p.name) : key; };

async function api(path, opt) {
  const r = await fetch(path, Object.assign({credentials: 'same-origin', headers: {'Content-Type': 'application/json'}}, opt || {}));
  const j = await r.json().catch(() => ({}));
  if (!r.ok) { const e = new Error(j.error || r.statusText); e.status = r.status; throw e; }
  return j;
}
const post = (p, b) => api(p, {method: 'POST', body: JSON.stringify(b)});

// ------------------------------------------------------------------ data
function daysTo(iso) { return iso ? Math.round((new Date(iso + 'T12:00:00') - new Date(D.as_of + 'T12:00:00')) / 864e5) : null; }
function sOf(u) {                       // register status -> display status
  if (!u) return 'none';
  if (u.status === 'Rented') { const d = daysTo(u.end); return d == null ? 'leased' : d < 0 ? 'ended' : d <= 90 ? 'soon' : 'leased'; }
  return {Expired: 'expired', Vacant: 'vacant', 'Not Ready': 'notready'}[u.status] || 'none';
}
function units(filterCo) {
  const c = filterCo == null ? co : filterCo;
  return D.units.filter(u => u.status !== 'Cancelled' && (c === 'ALL' || u.company === c));
}
function stats(us) {
  const by = s => us.filter(u => u.status === s);
  const rented = by('Rented'), exp = by('Expired');
  const soonList = rented.filter(u => { const d = daysTo(u.end); return d != null && d >= 0 && d <= 90; });
  return {
    n: us.length, leased: rented.length, expired: exp.length, vacant: by('Vacant').length, notready: by('Not Ready').length,
    rent: rented.reduce((s, u) => s + (u.amount || 0), 0), atRisk: exp.reduce((s, u) => s + (u.amount || 0), 0),
    vacantBudget: by('Vacant').reduce((s, u) => s + (u.budget || 0), 0), soon: soonList.length, soonRent: soonList.reduce((s, u) => s + (u.amount || 0), 0),
    soon30: soonList.filter(u => daysTo(u.end) <= 30).length, soon30Rent: soonList.filter(u => daysTo(u.end) <= 30).reduce((s, u) => s + (u.amount || 0), 0)
  };
}
function propList() {
  return D.properties.filter(p => co === 'ALL' || p.company === co).map(p => Object.assign({}, p, {st: stats(D.units.filter(u => u.property === p.key && u.status !== 'Cancelled'))}))
    .filter(p => p.st.n).sort((a, b) => b.st.rent - a.st.rent);
}

// ------------------------------------------------------------------ shell
const ICON = {
  home: '<path d="M3 11l9-7 9 7v9H3z"/>', properties: '<rect x="4" y="3" width="16" height="18" rx="1"/><path d="M8 7h2M14 7h2M8 11h2M14 11h2M8 15h2M14 15h2"/>',
  collections: '<rect x="3" y="6" width="18" height="13" rx="2"/><path d="M3 10h18M7 15h4"/>', leases: '<rect x="4" y="5" width="16" height="16" rx="2"/><path d="M8 3v4M16 3v4M4 10h16"/>',
  reports: '<path d="M6 3h9l4 4v14H6z"/><path d="M14 3v5h5M9 13h7M9 17h7"/>'
};
const chev = () => `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="${lang === 'ar' ? 'M9 18l6-6-6-6' : 'M15 18l-6-6 6-6'}"/></svg>`;
const fwd = () => `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="${lang === 'ar' ? 'M15 18l-6-6 6-6' : 'M9 18l6-6-6-6'}"/></svg>`;
function topBar() {
  return `<div class="bar"><div class="brand"><div class="mark"><img src="icon-64.png" alt=""></div><div><b>${t('org')}</b><small>${t('orgSub')}</small></div></div>
    <div class="tools"><div class="seg" role="group" aria-label="Language"><button class="${lang === 'en' ? 'on' : ''}" onclick="setLang('en')">EN</button><button class="${lang === 'ar' ? 'on' : ''}" onclick="setLang('ar')">ع</button></div>
    <button class="iconbtn" aria-label="Menu" onclick="toggleMenu()"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6"/></svg></button></div></div>
    ${menuOpen && REMOTE ? `<div class="menu"><div class="who">${t('thisPhone')}</div><button onclick="menuOpen=false;D=null;load()">${t('refresh')}</button><button onclick="unpair()">${t('unpair')}</button></div>` : ''}
    ${menuOpen && !REMOTE ? `<div class="menu"><div class="who">${esc(user.name)}</div>${user.role === 'admin' || user.role === 'leasing' ? `<a href="/update">${t('update')}</a>` : ''}<button onclick="changePw()">${t('chpw')}</button><button onclick="signOut()">${t('signout')}</button></div>` : ''}`;
}
function coSeg() {
  return `<div class="seg full" role="group" aria-label="Company">${['ALL', 'BAN', 'ALR'].map(c => `<button class="${co === c ? 'on' : ''}" onclick="setCo('${c}')">${t(c === 'ALL' ? 'all' : c)}</button>`).join('')}</div>`;
}
function head(title, sub, backHref, extra) {
  return `<div class="top">${backHref ? `<a class="back" href="${backHref}">${chev()}${t('back')}</a>` : topBar()}<div><div class="title">${title}</div>${sub ? `<div class="subtitle">${sub}</div>` : ''}</div>${extra || ''}</div>`;
}
function nav(active) {
  return `<nav class="tabs"><div>${['home', 'properties', 'collections', 'leases', 'reports'].map(k => `<a href="#${k}" class="${active === k ? 'on' : ''}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">${ICON[k]}</svg>${t(k)}</a>`).join('')}</div></nav>`;
}
const legendHtml = keys => `<div class="legend">${keys.map(k => `<span><i style="background:${STATUS_COLOUR[k]};${k === 'vacant' ? 'border:1.5px dashed #8A5A00;box-sizing:border-box' : ''}"></i>${t(k)}</span>`).join('')}</div>`;

// ------------------------------------------------------------------ screens
function home() {
  const s = stats(units()), props = propList();
  const occW = k => (s[k] / s.n * 100).toFixed(2) + '%';
  const coRow = c => { const x = stats(units(c)), np = D.properties.filter(p => p.company === c && D.units.some(u => u.property === p.key)).length;
    return `<a class="row" href="#properties" onclick="setCo('${c}', true)"><div class="l"><b>${t(c + 'full')}</b><small>${t('ofLeased', {p: np, l: x.leased, u: x.n, o: pct(x.leased, x.n)})}</small></div><div class="r">${N(x.rent)}</div></a>`; };
  return `<div class="top hero">${topBar()}${coSeg()}<div class="hero-total"><small>${t('rentRoll', {d: dstr(D.as_of)})}</small>
      <div class="big">${t('aed')} ${N(s.rent)}</div><div class="sub">${t('propsUnits', {p: props.length, u: s.n})}</div></div></div>
    <div class="float"><div class="sec-h"><span style="font-size:13px">${t('occupancy')}</span><b class="num" style="font-size:22px">${pct(s.leased, s.n)}</b></div>
      <div class="meter" style="height:12px"><i style="width:${occW('leased')};background:${STATUS_COLOUR.leased}"></i><i style="width:${occW('expired')};background:${STATUS_COLOUR.expired}"></i><i style="width:${occW('vacant')};background:#D99A1E"></i><i style="width:${occW('notready')};background:${STATUS_COLOUR.notready}"></i></div>
      <div class="counts"><div><b class="num">${s.leased}</b>${t('leased')}</div><div><b class="num" style="color:var(--red)">${s.expired}</b>${t('expired')}</div><div><b class="num" style="color:var(--amber)">${s.vacant}</b>${t('vacant')}</div><div><b class="num">${s.notready}</b>${t('notready')}</div></div></div>
    <div class="wrap">
      <div class="sec"><div class="sec-h">${t('attention')}</div>
        <a class="alert red" href="#leases"><div><b>${t('expiredNR', {n: s.expired})}</b><small>${t('atRisk')}</small></div><div class="r num">${fmt(s.atRisk)}</div></a>
        <a class="alert amber" href="#leases"><div><b>${t('endIn90', {n: s.soon})}</b><small>${t('within30', {n: s.soon30, a: fmt(s.soon30Rent)})}</small></div><div class="r num">${fmt(s.soonRent)}</div></a>
        <a class="alert white" href="#vacancy"><div><b>${t('vacantUnits', {n: s.vacant})}</b><small>${t('budgetYear', {a: fmt(s.vacantBudget)})}</small></div><div class="r">${fwd()}</div></a>
        <a class="alert white" href="#collections"><div><b>${t('overdue')}</b><small>${t('notConnected')}</small></div><div class="r">—</div></a></div>
      ${co === 'ALL' ? `<div class="sec"><div class="sec-h">${t('byCompany')}<a href="#properties">${t('allProps')}</a></div><div class="card">${coRow('BAN')}${coRow('ALR')}</div></div>` : ''}
      <div class="note">${t('dataFrom', {f: esc(D.file), t: dstr(D.imported_at.slice(0, 10))})}</div>
    </div>`;
}

function propertiesScreen() {
  const props = propList();
  return head(t('properties'), t('propsSub', {n: props.length}), null, coSeg()) + `<div class="wrap">${props.map(p => {
    const s = p.st, w = k => (s[k] / s.n * 100).toFixed(2) + '%';
    return `<a class="pcard" href="#property/${p.key}"><div class="h"><div><b>${esc(lang === 'ar' ? p.name_ar : p.name)}</b><small>${t(p.company)} · ${t('units', {n: s.n})}</small></div><div class="r num">${fmt(s.rent)}</div></div>
      <div class="meter" style="height:8px"><i style="width:${w('leased')};background:${STATUS_COLOUR.leased}"></i><i style="width:${w('expired')};background:${STATUS_COLOUR.expired}"></i><i style="width:${w('vacant')};background:#D99A1E"></i><i style="width:${w('notready')};background:${STATUS_COLOUR.notready}"></i></div>
      <div class="pills"><span class="pill">${t('leasedPct', {p: pct(s.leased, s.n)})}</span>${s.expired ? `<span class="pill red">${s.expired} ${t('expired')}</span>` : ''}${s.vacant ? `<span class="pill amber">${s.vacant} ${t('vacant')}</span>` : ''}${s.notready ? `<span class="pill grey">${s.notready} ${t('notready')}</span>` : ''}${s.soon ? `<span class="pill amber">${t('endSoon', {n: s.soon})}</span>` : ''}</div></a>`;
  }).join('')}</div>`;
}

function propertyScreen(key) {
  const p = D.properties.find(x => x.key === key); if (!p) return home();
  const us = D.units.filter(u => u.property === key && u.status !== 'Cancelled').sort((a, b) => a.code.localeCompare(b.code, 'en', {numeric: true}));
  const s = stats(us);
  const ten = {};
  us.filter(u => u.status === 'Rented').forEach(u => { const k = (u.tenant || '—').replace(/\s+-\s+.*$/, ''); (ten[k] = ten[k] || {n: 0, a: 0}); ten[k].n++; ten[k].a += u.amount || 0; });
  const top = Object.entries(ten).sort((a, b) => b[1].a - a[1].a).slice(0, 5);
  const types = {}; us.forEach(u => { types[u.unit_type] = (types[u.unit_type] || 0) + 1; });
  return `<div class="top"><a class="back" href="#properties">${chev()}${t('properties')}</a><div><div class="title">${esc(pname(key))}</div><div class="subtitle">${t(p.company)} · ${Object.entries(types).map(([k, v]) => v + ' ' + esc(k)).join(' · ')}</div></div>
      <div class="kpis"><div><small>${t('annualRent')}</small><b class="num">${fmtM(s.rent)}</b></div><div><small>${t('leasedOf')}</small><b class="num">${s.leased} / ${s.n}</b></div><div><small>${t('atRisk')}</small><b class="num">${fmt(s.atRisk)}</b></div></div></div>
    <div class="wrap">
      ${p.plan ? `<a class="btn" href="#plan/${key}">${t('openPlan')}</a>` : ''}
      <div class="sec"><div class="sec-h">${t('unitMap')}<span class="muted">${t('tapUnit')}</span></div><div class="card pad" style="display:flex;flex-direction:column;gap:10px">
        <div class="tiles">${us.map(u => `<a href="#unit/${u.id}" aria-label="${esc(u.code + ' ' + t(sOf(u)))}" title="${esc(u.code)}" style="background:${STATUS_COLOUR[sOf(u)]};${sOf(u) === 'vacant' ? 'border:1.5px dashed #8A5A00' : ''}"></a>`).join('')}</div>
        ${legendHtml(['leased', 'soon', 'ended', 'expired', 'vacant', 'notready'])}</div></div>
      <div class="sec"><div class="sec-h">${t('largest')}</div><div class="card">${top.map(([k, v]) => `<div class="row"><div class="l"><b>${esc(k)}</b><small>${t('unitsN', {n: v.n})} · ${t('share', {p: pct(v.a, s.rent)})}</small></div><div class="r num">${fmt(v.a)}</div></div>`).join('')}</div></div>
    </div>`;
}

function planScreen(key) {
  const P = D.plans[key]; if (!P) return propertyScreen(key);
  const fl = P.floors.find(f => f.id === (view.floor || 'G')) || P.floors[0];
  const [X0, Y0, W, H] = P.frame, pc = (v, tot) => (v / tot * 100).toFixed(3) + '%';
  const reg = {}; D.units.filter(u => u.property === key).forEach(u => { if (!reg[u.code] || (!reg[u.code].tenant && u.tenant)) reg[u.code] = u; });
  const disp = pu => { const r = pu.reg ? reg[pu.reg] : null;
    if (pu.plan === 'service') return 'none';
    if (r && r.status === 'Cancelled') return 'none';
    // signed tenant still fitting out: the plan knows before the register does
    if (r) { const s = sOf(r); return (s === 'leased' || s === 'soon' || s === 'vacant') && (pu.plan === 'fitout' || pu.plan === 'confirmed') ? pu.plan : s; }
    return pu.plan === 'op' ? 'leased' : pu.plan; };
  const f = view.filter || 'all';
  const all = fl.units.map(disp), cnt = k => all.filter(x => x === k).length;
  const sel = fl.units.find(pu => pu.code === view.sel);
  const selReg = sel && sel.reg ? reg[sel.reg] : null;
  const chips = [['all', t('allUnits')], ['expired', t('expired') + ' ' + cnt('expired')], ['soon', t('soon') + ' ' + cnt('soon')], ['vacant', t('vacant') + ' ' + cnt('vacant')], ['fitout', t('fitout') + ' ' + cnt('fitout')]];
  const sheet = sel ? (() => { const s = disp(sel); return `<div class="sheet"><div class="sec-h" style="align-items:flex-start"><div><div style="font-size:15px">${esc(selReg && selReg.tenant ? selReg.tenant : sel.label)}</div><div class="note">${esc(sel.code)}${sel.reg && sel.reg !== sel.code ? ' (' + esc(sel.reg) + ')' : ''}${sel.area ? ' · ' + sel.area + ' m²' : ''}</div></div><span class="pill ${PILL[s]}">${t(s)}</span></div>
      <div class="sec-h" style="font-size:13px;font-weight:500"><span class="muted" style="font-weight:500">${t('annualRent')} <b class="num" style="color:var(--ink);font-size:14px">${selReg && selReg.amount ? fmt(selReg.amount) : '—'}</b>${selReg && selReg.end ? ' · ' + t('ends', {d: dstr(selReg.end)}) : ''}</span></div>
      ${selReg ? `<a class="btn" href="#unit/${selReg.id}">${t('tenantDetails')}</a>` : `<div class="note">${t('fromRegister')}</div>`}</div>`; })() : `<div class="sheet note">${t('tapAny')}</div>`;
  return `<div class="top"><a class="back" href="#property/${key}">${chev()}${esc(pname(key))}</a><div><div class="title">${t('plan')}</div><div class="subtitle">${t('planHint')}</div></div>
      <div class="seg two" role="group" aria-label="Floor" style="${P.floors.length < 2 ? 'display:none' : ''}">${P.floors.map(x => `<button class="${x.id === fl.id ? 'on' : ''}" onclick="view.floor='${x.id}';view.sel=null;render()">${esc(lang === 'ar' ? x.name_ar : x.name)}</button>`).join('')}</div></div>
    <div class="wrap"><div class="chips">${chips.map(([k, l]) => `<button class="chip ${f === k ? 'on' : ''}" onclick="view.filter='${k}';render()">${esc(l)}</button>`).join('')}</div>
      <div class="plan-layout"><div class="map-col"><div class="card pad"><div class="map" dir="ltr" style="aspect-ratio:${W} / ${H}">
        ${fl.blocks.map(([x, y, w, h]) => `<div class="blk" style="left:${pc(x - X0, W)};top:${pc(y - Y0, H)};width:${pc(w, W)};height:${pc(h, H)}"></div>`).join('')}
        ${fl.units.map((pu, i) => { const s = disp(pu), on = f === 'all' || s === f;
          return `<button class="u ${view.sel === pu.code ? 'sel' : ''}" onclick="view.sel='${esc(pu.code)}';render()" aria-label="${esc(pu.code + ' ' + pu.label + ' – ' + t(s))}"
            style="left:${pc(pu.x - X0, W)};top:${pc(pu.y - Y0, H)};width:${pc(pu.w, W)};height:${pc(pu.h, H)};background:${STATUS_COLOUR[s]};color:${STATUS_INK[s]};opacity:${on ? 1 : .18};${s === 'vacant' ? 'border:1.5px dashed #8A5A00;' : ''}"><span>${pu.w >= 60 && pu.h >= 30 ? esc(pu.label) : ''}</span></button>`; }).join('')}
        ${fl.doors.map(([x, y, en, ar]) => `<div class="door" style="left:${pc(x - X0, W)};top:${pc(y - Y0, H)}"><svg width="9" height="9" viewBox="0 0 24 24" fill="#13261B" aria-hidden="true"><path d="M12 3l9 16H3z"/></svg>${esc(lang === 'ar' ? ar : en)}</div>`).join('')}
      </div><div style="margin-top:8px">${legendHtml(['leased', 'soon', 'expired', 'fitout', 'confirmed', 'vacant'])}</div></div></div>
      <div class="side">${sheet}</div></div></div>`;
}

function unitScreen(id) {
  const u = D.units.find(x => String(x.id) === String(id)); if (!u) return home();
  const s = sOf(u), d = daysTo(u.end);
  return `<div class="top"><a class="back" href="#property/${u.property}">${chev()}${esc(pname(u.property))}</a><div><div class="title">${esc(u.tenant || u.code)}</div><div class="subtitle">${t('unitT')} <span class="num">${esc(u.code)}</span> · ${esc(u.unit_type || '')} · ${t(u.company)}</div></div>
      <div class="sec-h" style="font-weight:500"><div><small style="opacity:.85;font-size:11px">${t('annualRent')}</small><div style="font-size:26px;font-weight:700">${u.amount ? N(u.amount) + ' ' + t('aed') : '—'}</div></div><span class="pill ${PILL[s]}" style="background:#fff">${t(s)}</span></div></div>
    <div class="wrap">
      <div class="sec"><div class="sec-h">${t('lease')}</div><div class="card">
        <div class="row"><span class="muted">${t('tawteeq')}</span><b class="num">${esc(u.contract || '—')}</b></div>
        <div class="row"><span class="muted">${t('term')}</span><b>${dstr(u.start)} – ${dstr(u.end)}</b></div>
        ${d != null ? `<div class="row"><span class="muted">${t('endsIn')}</span><span class="pill ${d < 0 ? 'red' : d <= 90 ? 'amber' : ''}">${d < 0 ? t('daysAgo', {n: -d}) : t('days', {n: d})}</span></div>` : ''}
        ${u.budget ? `<div class="row"><span class="muted">${t('budget')}</span><b class="num">${fmt(u.budget)}</b></div>` : ''}
        ${u.renewal ? `<div class="row"><span class="muted">${t('renewal')}</span><span class="pill">${esc(u.renewal)}</span></div>` : ''}
        ${u.note ? `<div class="row"><span class="muted">${t('note')}</span><span style="font-size:12px;text-align:end">${esc(u.note)}</span></div>` : ''}
        ${u.remark ? `<div class="row"><span class="muted">${t('remark')}</span><span style="font-size:12px;text-align:end">${esc(u.remark)}</span></div>` : ''}</div>
        ${u.edited_at ? `<div class="note">${t('corrected', {u: esc(u.edited_by), d: dstr(u.edited_at.slice(0, 10))})}</div>` : ''}</div>
      <div class="sec"><div class="sec-h">${t('payments')}</div><div class="card pad note">${t('paySoon')}</div></div>
    </div>`;
}

function leasesScreen() {
  const us = units(), win = view.win || 30;
  const exp = us.filter(u => u.status === 'Expired').sort((a, b) => (b.amount || 0) - (a.amount || 0));
  const withT = exp.filter(u => u.tenant), noT = exp.filter(u => !u.tenant);
  const ending = us.filter(u => u.status === 'Rented' && u.end && daysTo(u.end) >= 0 && daysTo(u.end) <= win).sort((a, b) => daysTo(a.end) - daysTo(b.end));
  const passed = us.filter(u => u.status === 'Rented' && u.end && daysTo(u.end) < 0).sort((a, b) => daysTo(a.end) - daysTo(b.end));
  const tab = n => { const l = us.filter(u => u.status === 'Rented' && u.end && daysTo(u.end) >= 0 && daysTo(u.end) <= n);
    return `<button class="${win === n ? 'on' : ''}" onclick="view.win=${n};render()">${t('days', {n})}<br><span class="num">${l.length} · ${fmtM(l.reduce((s, u) => s + (u.amount || 0), 0))}</span></button>`; };
  const row = (u, sub) => `<a class="row" href="#unit/${u.id}"><div class="l"><b>${esc(u.tenant || u.code)}</b><small>${esc(pname(u.property))} · <span class="num">${esc(u.code)}</span> · ${sub}</small>${u.renewal ? `<small><span class="pill">${esc(u.renewal)}</span></small>` : ''}</div><div class="r num">${fmt(u.amount)}</div></a>`;
  return head(t('leasesTitle'), t('asOf', {d: dstr(D.as_of)}), null, coSeg() + `<div class="tabs3">${tab(30)}${tab(60)}${tab(90)}</div>`) + `<div class="wrap">
    <div class="sec"><div class="sec-h" style="color:var(--red)">${t('expiredNotRenewed')}<span class="num">${t('atRiskShort', {a: fmt(exp.reduce((s, u) => s + (u.amount || 0), 0))})}</span></div>
      <div class="card">${withT.map(u => row(u, u.end ? t('ends', {d: dstr(u.end)}) : t('expired'))).join('') || `<div class="row muted">${t('nothing')}</div>`}
      ${noT.length ? `<div class="row note">${t('noTenant', {n: noT.length})} (<span class="num">${noT.map(u => esc(u.code)).join(', ')}</span>)</div>` : ''}</div></div>
    <div class="sec"><div class="sec-h">${t('endingIn', {n: win})}<span class="muted">${ending.length}</span></div><div class="card">${ending.map(u => row(u, t('ends', {d: dstr(u.end)}))).join('') || `<div class="row muted">${t('nothing')}</div>`}</div></div>
    ${passed.length ? `<div class="sec"><div class="sec-h" style="color:var(--amber)">${t('passed')}<span class="muted">${passed.length}</span></div><div class="card">${passed.map(u => row(u, t('ends', {d: dstr(u.end)}))).join('')}</div></div>` : ''}
  </div>`;
}

function vacancyScreen() {
  const us = units(), vac = us.filter(u => u.status === 'Vacant'), nr = us.filter(u => u.status === 'Not Ready');
  const total = vac.reduce((s, u) => s + (u.budget || 0), 0);
  const byP = {}; vac.forEach(u => { (byP[u.property] = byP[u.property] || []).push(u); });
  const nrP = {}; nr.forEach(u => { nrP[u.property] = (nrP[u.property] || 0) + 1; });
  return `<div class="top"><a class="back" href="#home">${chev()}${t('home')}</a><div><div class="title">${t('vacancyTitle')}</div><div class="subtitle">${t('vacancySub')}</div></div>${coSeg()}
      <div class="kpis"><div><small>${t('vacant')}</small><b class="num">${vac.length}</b></div><div><small>${t('perYear')}</small><b class="num">${fmt(total)}</b></div><div><small>${t('perMonth')}</small><b class="num">${fmt(total / 12)}</b></div></div></div>
    <div class="wrap">${Object.entries(byP).sort((a, b) => b[1].reduce((s, u) => s + (u.budget || 0), 0) - a[1].reduce((s, u) => s + (u.budget || 0), 0)).map(([k, list]) => `
      <div class="sec"><div class="sec-h">${esc(pname(k))}<span class="muted"><span class="num">${fmt(list.reduce((s, u) => s + (u.budget || 0), 0))}</span></span></div><div class="card">
        ${list.sort((a, b) => (b.budget || 0) - (a.budget || 0)).map(u => `<a class="row" href="#unit/${u.id}"><div class="l"><b class="num">${esc(u.code)}</b><small>${esc(u.unit_type || '')}</small></div><div class="r num">${u.budget ? fmt(u.budget) : '—'}</div></a>`).join('')}</div></div>`).join('') || `<div class="empty">${t('nothing')}</div>`}
      ${Object.entries(nrP).map(([k, n]) => `<div class="dark"><div><small>${t('notReadyUnits')}</small><div style="font-weight:700">${n} · ${esc(pname(k))}</div></div></div>`).join('')}
    </div>`;
}

function collectionsScreen() {
  return head(t('collTitle'), t('collSub'), null, coSeg()) + `<div class="wrap"><div class="card pad note" style="font-size:13px;line-height:1.5">${t('collSoon')}</div></div>`;
}

function reportsScreen() {
  const r = (k, n, s) => `<div class="row"><div class="l"><b>${t(n)}</b><small>${t(s)}</small></div>${REMOTE ? '' : `<a class="btn ghost" style="height:36px;font-size:12px" href="/api/export/${k}.csv" download>${t('download')}</a>`}</div>`;
  if (REMOTE) return head(t('reportsTitle'), t('reportsSub')) + `<div class="wrap"><div class="card">${r('register', 'rRegister', 'rRegisterSub')}${r('occupancy', 'rOcc', 'rOccSub')}${r('expiries', 'rExp', 'rExpSub')}${r('vacancy', 'rVac', 'rVacSub')}</div><div class="note">${t('officeOnly')}</div></div>`;
  return head(t('reportsTitle'), t('reportsSub')) + `<div class="wrap"><div class="card">${r('register', 'rRegister', 'rRegisterSub')}${r('occupancy', 'rOcc', 'rOccSub')}${r('expiries', 'rExp', 'rExpSub')}${r('vacancy', 'rVac', 'rVacSub')}</div>
    <div class="note">${t('dataFrom', {f: esc(D.file || ''), t: D.imported_at ? dstr(D.imported_at.slice(0, 10)) : ''})}</div></div>`;
}

async function adminScreen() {
  if (user.role !== 'admin') { location.hash = '#home'; return ''; }
  const [imps, us] = await Promise.all([api('/api/imports'), api('/api/users')]);
  return head(t('admin'), '', '#home') + `<div class="wrap">
    ${flash ? `<div class="msg ${flash.bad ? 'bad' : ''}">${esc(flash.text)}</div>` : ''}
    <div class="sec"><div class="sec-h">${t('importTitle')}</div><div class="card pad" style="display:flex;flex-direction:column;gap:10px"><div class="note">${esc(t('importSub'))}</div>
      <label class="btn" style="cursor:pointer">${t('choose')}<input type="file" accept=".xlsx" hidden onchange="uploadRegister(this)"></label></div></div>
    <div class="sec"><div class="sec-h">${t('imports')}</div><div class="card pad"><table class="list"><tr><th>As of</th><th>File</th><th>Units</th><th>Uploaded</th></tr>
      ${imps.map(i => `<tr><td class="num">${i.as_of}</td><td>${esc(i.file)}</td><td class="num">${i.units}</td><td class="num">${esc(i.imported_at.replace('T', ' '))}</td></tr>`).join('')}</table></div></div>
    <div class="sec"><div class="sec-h">${t('users')}</div><div class="card pad"><table class="list">${us.map(x => `<tr><td>${esc(x.username)}</td><td>${esc(x.name)}</td><td>${x.role}</td><td>${x.active ? '' : 'off'}${x.failed >= 5 ? ' locked' : ''}</td><td><button class="chip" onclick="userAct('reset',${x.id})">${t('newPw')}</button></td></tr>`).join('')}</table>
      <div style="display:flex;gap:6px;flex-wrap:wrap;margin-top:10px"><input id="nu" placeholder="username" style="height:36px;border:1px solid #C9D2CB;border-radius:8px;padding:0 8px"><input id="nn" placeholder="name" style="height:36px;border:1px solid #C9D2CB;border-radius:8px;padding:0 8px">
        <select id="nr" style="height:36px;border:1px solid #C9D2CB;border-radius:8px"><option value="viewer">${t('viewer')}</option><option value="admin">${t('adminRole')}</option></select><button class="chip" onclick="addUser()">${t('addUser')}</button></div>
      ${view.secret ? `<div class="note" style="margin-top:8px">${t('shown', {u: esc(view.secret.username)})}</div><div class="secret">${esc(view.secret.password)}</div>` : ''}</div></div>
  </div>`;
}

// ------------------------------------------------------------------ actions
function setLang(l) { lang = l; try { localStorage.setItem('lz_lang', l); } catch (e) {} render(); }
function setCo(c, keep) { co = c; try { localStorage.setItem('lz_co', c); } catch (e) {} if (!keep) render(); }
function toggleMenu() { menuOpen = !menuOpen; render(); }
async function uploadRegister(input) {
  const f = input.files[0]; if (!f) return;
  const fd = new FormData(); fd.append('file', f);
  try { const r = await fetch('/api/import', {method: 'POST', body: fd, credentials: 'same-origin'}); const j = await r.json(); if (!r.ok) throw new Error(j.error);
        flash = {text: `${f.name}: as of ${j.as_of} · ${j.units} units · ` + Object.entries(j.by_status).map(([k, v]) => k + ' ' + v).join(', ')}; D = await api('/api/data'); }
  catch (e) { flash = {bad: true, text: e.message}; }
  render();
}
async function userAct(action, id) { try { view.secret = await post('/api/users', {action, id}); } catch (e) { flash = {bad: true, text: e.message}; } render(); }
async function addUser() { try { view.secret = await post('/api/users', {action: 'add', username: $('#nu').value, name: $('#nn').value, role: $('#nr').value}); } catch (e) { flash = {bad: true, text: e.message}; } render(); }
async function signOut() { await post('/api/logout', {}).catch(() => {}); user = null; D = null; menuOpen = false; render(); }
function changePw() {
  menuOpen = false;
  $('#root').innerHTML = `<form class="login" onsubmit="return savePw(event)"><h1>${t('chpw')}</h1><label class="field">${t('oldpw')}<input id="o" type="password" autocomplete="current-password" required></label>
    <label class="field">${t('newpw')}<input id="n" type="password" autocomplete="new-password" minlength="8" required></label><div class="err" id="err"></div>
    <button class="btn">${t('save')}</button><button type="button" class="btn ghost" onclick="render()">${t('cancel')}</button></form>`;
}
async function savePw(e) { e.preventDefault(); try { await post('/api/password', {old: $('#o').value, new: $('#n').value}); alert(t('pwdone')); render(); } catch (x) { $('#err').textContent = x.message; } return false; }
function loginScreen() {
  $('#root').innerHTML = `<form class="login" onsubmit="return doLogin(event)"><img src="logo-wordmark.png" alt="Baniyas Cooperative Society"><h1>${t('org')}</h1>
    <div class="seg" style="align-self:center;background:var(--line)"><button type="button" class="${lang === 'en' ? 'on' : ''}" style="color:var(--green)" onclick="setLang('en')">EN</button><button type="button" class="${lang === 'ar' ? 'on' : ''}" style="color:var(--green)" onclick="setLang('ar')">ع</button></div>
    <label class="field">${t('username')}<input id="u" autocomplete="username" autocapitalize="none" required></label><label class="field">${t('password')}<input id="p" type="password" autocomplete="current-password" required></label>
    <div class="err" id="err"></div><button class="btn">${t('signin')}</button></form>`;
}
async function doLogin(e) { e.preventDefault(); try { user = (await post('/api/login', {username: $('#u').value, password: $('#p').value})).user; await load(); } catch (x) { $('#err').textContent = x.status === 401 ? t('wrong') : x.message; } return false; }

// ------------------------------------------------------------------ router
async function render() {
  document.documentElement.lang = lang; document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  if (!user) return REMOTE ? pairScreen() : loginScreen();
  const [route, arg] = (location.hash.slice(1) || 'home').split('/');
  if (route === 'admin') { const html = await adminScreen(); $('#root').innerHTML = `<div class="app">${html}</div>${nav('')}`; return; }
  if (!D) { $('#root').innerHTML = `<div class="app">${head(t('org'))}<div class="empty">…</div></div>`; return; }
  if (D.empty) { $('#root').innerHTML = `<div class="app">${head(t('org'))}<div class="empty">${t('empty')}<br><br>${t('uploadHint')}${user.role === 'admin' ? `<br><br><a class="btn" href="#admin">${t('admin')}</a>` : ''}</div></div>`; return; }
  const screens = {home: [home, 'home'], properties: [propertiesScreen, 'properties'], property: [() => propertyScreen(arg), 'properties'], plan: [() => planScreen(arg), 'properties'],
                   unit: [() => unitScreen(arg), 'properties'], leases: [leasesScreen, 'leases'], vacancy: [vacancyScreen, 'home'], collections: [collectionsScreen, 'collections'], reports: [reportsScreen, 'reports']};
  const [fn, tab] = screens[route] || screens.home;
  const banner = (notice ? `<div class="wrap"><div class="msg">${t(notice)}</div></div>` : '') + (D._offline ? `<div class="wrap"><div class="msg bad">${t('offlineR')}</div></div>` : '');
  $('#root').innerHTML = `<div class="app ${route === 'plan' ? 'wide' : ''}">${fn()}${banner}</div>${nav(tab)}`;
}
function pairScreen(msg) {
  $('#root').innerHTML = `<div class="login"><img src="logo-wordmark.png" alt="${t('org')}"><h1>${t(msg || 'pairTitle')}</h1><p class="note" style="text-align:center">${t('pairBody')}</p>
    <div class="seg" style="align-self:center;background:var(--line)"><button type="button" class="${lang === 'en' ? 'on' : ''}" style="color:var(--green)" onclick="setLang('en')">EN</button><button type="button" class="${lang === 'ar' ? 'on' : ''}" style="color:var(--green)" onclick="setLang('ar')">ع</button></div></div>`;
}
function unpair() { if (!confirm(t('unpairQ'))) return; unpairPhone(); user = null; D = null; menuOpen = false; render(); }
async function load() {
  if (REMOTE) {
    try { D = await remoteLoad(); }
    catch (x) { D = null; if (x.status === 403) { user = null; return pairScreen('badKey'); } if (x.status === 401) user = null; else D = {empty: true, properties: []}; }
    return render();
  }
  try { D = await api('/api/data'); } catch (x) { if (x.status === 401) { user = null; D = null; } } render();
}
let lastRoute = '';
window.addEventListener('hashchange', () => { if (/^#p=/.test(location.hash)) return location.reload(); const r = location.hash.split('/')[0]; if (r !== lastRoute) { view = {}; flash = null; window.scrollTo(0, 0); } lastRoute = r; menuOpen = false; render(); });
(async () => {
  if (REMOTE) {
    if (takePairingFromUrl() && !isStandalone()) notice = 'installHint';
    if (!/^#\w/.test(location.hash) || /^#p=/.test(location.hash)) history.replaceState(null, '', location.pathname + location.search + (navigator.standalone ? '#home' : location.hash));
    user = getPair() ? {name: '', role: 'viewer'} : null;
    lastRoute = location.hash.split('/')[0]; render(); if (user) load(); return;
  }
  try { user = (await api('/api/me')).user; } catch (e) { user = null; } lastRoute = location.hash.split('/')[0]; render(); if (user) load();
})();
