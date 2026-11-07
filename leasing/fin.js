// Phone app: finance pages (Collections, Bounced and on hold, Rental income, Security deposits, Documents to follow up, More).
// Reads D.fin from /api/data (built by phone.py on the server): amounts and tenant names only, never cheque numbers, banks or scans.
'use strict';
Object.assign(T.en, {
  more: 'More', moreSub: 'Reports and follow-ups', finance: 'Finance', followUp: 'Follow-up', downloads: 'Downloads · office network',
  bouncedOwed: 'Bounced cheques still owed', bouncedOwedSub: '{n} tenants · {a} paid another way', dueNotDep: '{n} cheques due, not deposited', dueNotDepSub: 'Cheque date passed, still in hand',
  renewalSub: 'Renewal status from the leasing team', thisMonth: 'This month · {m}', incRec: 'Rental income recognised', incRecSub: 'From the Rental Income Recognition schedule',
  chqDueMonth: 'Cheques due this month', chqDueMonthSub: '{n} cheques still to come', inBank: 'Cheques in the bank', inBankSub: '{n} deposited, waiting to clear',
  dataLive: 'Data: master data and contracts · {d}',
  collSub2: 'Tenant cheques · from the Cheques register', next30: 'Next 30 days', next90: 'Next 90 days', inBankK: 'In the bank', dueByMonth: 'Cheques due · next 6 months', chqN: '{n} cheques',
  needsAction: 'Needs action', bouncedStill: 'Bounced, still owed', bouncedStillSub: '{n} cheques · {t} tenants', dueND: 'Due, not deposited', dueNDSub: '{n} cheques · date passed',
  onHold: 'On hold', onHoldSub: '{n} cheques · tenant asked to hold', byStatus: 'Cheques by status', notDue: 'Not yet due', notDueSub: 'In hand, dated in the future',
  deposited: 'Deposited', depositedSub: 'In the bank, waiting to clear', cleared: 'Cleared', clearedSub: '{n} cheques since Jan 2025', paidOther: 'Paid another way',
  paidOtherSub: '{n} bounced cheques paid by cash, deposit or transfer', bounced: 'Bounced', bouncedSub: '{n} cheques, before payments', noDate: 'No date', noDateSub: '{n} cheques without a date',
  amountsOnly: 'Amounts only: cheque numbers, banks and scans stay in the office app.',
  bncTitle: 'Bounced & on hold', bncSub: 'Biggest first · after payments received', baniyas: 'Baniyas', alresala: 'Al Resala', moreTenants: '+ {n} more tenants', chqs: '{n} cheques', chq1: '1 cheque',
  incTitle: 'Rental income', incSub: 'Recognised month by month · {y}', yearK: 'Year {y}', toMonth: 'To {m}', perMonthK: 'Per month', byMonth: 'By month', recognised: 'Recognised',
  stillToCome: 'Still to come', openingK: 'Opening 01-Jan-{y}', openingSub: 'Rent received in advance, from the audit file', recognisedIn: 'Recognised in {y}', invoicedIn: 'Invoiced in {y}',
  invoicedSub: 'VAT Invoicing', closingK: 'Closing 31-Dec-{y}', closingSub: 'Received in advance at year end', openingMissing: 'Opening balances from the audit file are not in yet, so the opening and closing balances are not shown.',
  byProperty: 'By property', baseYear: 'Balances as in the audit file for {y}.',
  depTitle: 'Security deposits', depSub: 'Held for tenants · from the audit file and the Daisy files', held: 'Held', leftHeld: 'Tenants left, deposit still held', leftHeldSub: 'Refund, deduct or forfeit · {a}',
  noProof: 'No copy of the deposit cheque or receipt', noProofSub: 'Proof still to attach', byCompanyK: 'By company', depLines: '{n} deposit lines · {l} tenants left', depSame: 'Same figures as Leasing > Tenants Security Deposits.',
  docTitle: 'Documents to follow up', docSub: '{n} units · {c} complete', missingBy: 'Missing, by document', nMissing: '{n} missing', nOld: '{n} expired or incomplete',
  dTw: 'Tawtheeq', dId: 'Owner ID', dTl: 'Trade licence', dCq: 'Cheque copies', dVat: 'VAT certificate', dDep: 'Deposit', dTwS: 'Tawt.', dIdS: 'ID', dTlS: 'Lic.', dCqS: 'Chq.', dVatS: 'VAT', dDepS: 'Dep.',
  haveIt: 'have it', missing: 'missing', oldDoc: 'expired or incomplete', notNeeded: 'not needed', showMissing: 'Missing something', showAll: 'All units',
  vacancyRow: 'Vacant units', vacancyRowSub: 'Budget rent not earned', rCash: 'Cheque cash flow', rCashSub: 'Due, in the bank, cleared, bounced', rInc: 'Rental income recognised', rIncSub: 'By month, {y}',
  chqTitle: 'Cheques', chqForContract: '{n} for this contract', chqDue: 'Due, not deposited', chqNotDue: 'Not yet due', chqDep: 'In the bank', chqCleared: 'Cleared', chqBounced: 'Bounced, still owed',
  chqSettled: 'Paid another way', chqHold: 'On hold', chqOther: 'Other', noCheques: 'No cheques recorded for this contract.', depHeld: 'Held', depProof: 'Cheque copy or receipt attached',
  depNoProof: 'No copy attached yet', depNone: 'No deposit recorded.', depLeft: 'Tenant has left', documents: 'Documents', vatK: 'VAT', vatable: 'Vatable', notVatable: 'Not vatable',
  chillerK: 'Chiller a year', contractK: 'Contract', legalCase: 'legal case', noFin: 'The finance figures could not be worked out. Please tell the finance team.'
});
Object.assign(T.ar, {
  more: 'المزيد', moreSub: 'التقارير والمتابعة', finance: 'المالية', followUp: 'المتابعة', downloads: 'التنزيلات · شبكة المكتب',
  bouncedOwed: 'شيكات مرتجعة لم تُسدَّد', bouncedOwedSub: '{n} مستأجراً · سُدِّد {a} بطرق أخرى', dueNotDep: '{n} شيكاً مستحقاً لم يُودَع', dueNotDepSub: 'تجاوز تاريخ الشيك ولا يزال لدينا',
  renewalSub: 'حالة التجديد من فريق التأجير', thisMonth: 'هذا الشهر · {m}', incRec: 'إيرادات الإيجار المعترف بها', incRecSub: 'من جدول الاعتراف بإيرادات الإيجار',
  chqDueMonth: 'شيكات مستحقة هذا الشهر', chqDueMonthSub: '{n} شيكاً متبقياً', inBank: 'شيكات لدى البنك', inBankSub: '{n} شيكاً مودعاً بانتظار التحصيل',
  dataLive: 'البيانات: البيانات الرئيسية والعقود · {d}',
  collSub2: 'شيكات المستأجرين · من سجل الشيكات', next30: 'خلال 30 يوماً', next90: 'خلال 90 يوماً', inBankK: 'لدى البنك', dueByMonth: 'الشيكات المستحقة · الأشهر الستة القادمة', chqN: '{n} شيكاً',
  needsAction: 'يتطلب إجراء', bouncedStill: 'مرتجعة ولم تُسدَّد', bouncedStillSub: '{n} شيكاً · {t} مستأجراً', dueND: 'مستحقة ولم تُودَع', dueNDSub: '{n} شيكاً · تجاوز التاريخ',
  onHold: 'معلّقة', onHoldSub: '{n} شيكاً · بطلب من المستأجر', byStatus: 'الشيكات حسب الحالة', notDue: 'غير مستحقة بعد', notDueSub: 'لدينا، بتاريخ لاحق',
  deposited: 'مودعة', depositedSub: 'لدى البنك بانتظار التحصيل', cleared: 'محصّلة', clearedSub: '{n} شيكاً منذ يناير 2025', paidOther: 'سُدِّدت بطرق أخرى',
  paidOtherSub: '{n} شيكاً مرتجعاً سُدِّد نقداً أو بإيداع أو تحويل', bounced: 'مرتجعة', bouncedSub: '{n} شيكاً قبل السداد', noDate: 'بدون تاريخ', noDateSub: '{n} شيكاً بدون تاريخ',
  amountsOnly: 'المبالغ فقط: أرقام الشيكات والبنوك والصور تبقى في تطبيق المكتب.',
  bncTitle: 'المرتجعة والمعلّقة', bncSub: 'الأكبر أولاً · بعد خصم ما سُدِّد', baniyas: 'بني ياس', alresala: 'الرسالة', moreTenants: '+ {n} مستأجرين آخرين', chqs: '{n} شيكات', chq1: 'شيك واحد',
  incTitle: 'إيرادات الإيجار', incSub: 'المعترف بها شهرياً · {y}', yearK: 'سنة {y}', toMonth: 'حتى {m}', perMonthK: 'شهرياً', byMonth: 'حسب الشهر', recognised: 'معترف بها',
  stillToCome: 'متبقية', openingK: 'الرصيد الافتتاحي 01-01-{y}', openingSub: 'إيجار مقبوض مقدماً، من ملف التدقيق', recognisedIn: 'المعترف بها في {y}', invoicedIn: 'المفوترة في {y}',
  invoicedSub: 'فواتير ضريبة القيمة المضافة', closingK: 'الرصيد الختامي 31-12-{y}', closingSub: 'مقبوض مقدماً في نهاية السنة', openingMissing: 'لم تُدخَل الأرصدة الافتتاحية من ملف التدقيق بعد، لذلك لا تظهر الأرصدة الافتتاحية والختامية.',
  byProperty: 'حسب العقار', baseYear: 'الأرصدة كما في ملف التدقيق لسنة {y}.',
  depTitle: 'تأمينات المستأجرين', depSub: 'محتفظ بها للمستأجرين · من ملف التدقيق وملفات ديزي', held: 'المحتفظ به', leftHeld: 'مستأجرون غادروا ولا يزال التأمين لدينا', leftHeldSub: 'رد أو خصم أو مصادرة · {a}',
  noProof: 'لا توجد صورة لشيك التأمين أو الإيصال', noProofSub: 'المستند لم يُرفق بعد', byCompanyK: 'حسب الشركة', depLines: '{n} بنداً · {l} مستأجرين غادروا', depSame: 'نفس أرقام التأجير > تأمينات المستأجرين.',
  docTitle: 'مستندات للمتابعة', docSub: '{n} وحدة · {c} مكتملة', missingBy: 'الناقص حسب المستند', nMissing: '{n} ناقص', nOld: '{n} منتهٍ أو غير مكتمل',
  dTw: 'توثيق', dId: 'هوية المالك', dTl: 'الرخصة التجارية', dCq: 'صور الشيكات', dVat: 'شهادة الضريبة', dDep: 'التأمين', dTwS: 'توثيق', dIdS: 'هوية', dTlS: 'رخصة', dCqS: 'شيكات', dVatS: 'ضريبة', dDepS: 'تأمين',
  haveIt: 'متوفر', missing: 'ناقص', oldDoc: 'منتهٍ أو غير مكتمل', notNeeded: 'غير مطلوب', showMissing: 'بها نقص', showAll: 'كل الوحدات',
  vacancyRow: 'الوحدات الشاغرة', vacancyRowSub: 'إيجار الموازنة غير المحقق', rCash: 'التدفق النقدي للشيكات', rCashSub: 'المستحقة، لدى البنك، المحصّلة، المرتجعة', rInc: 'إيرادات الإيجار المعترف بها', rIncSub: 'حسب الشهر، {y}',
  chqTitle: 'الشيكات', chqForContract: '{n} لهذا العقد', chqDue: 'مستحقة ولم تُودَع', chqNotDue: 'غير مستحقة بعد', chqDep: 'لدى البنك', chqCleared: 'محصّلة', chqBounced: 'مرتجعة ولم تُسدَّد',
  chqSettled: 'سُدِّدت بطرق أخرى', chqHold: 'معلّقة', chqOther: 'أخرى', noCheques: 'لا توجد شيكات مسجلة لهذا العقد.', depHeld: 'المحتفظ به', depProof: 'صورة الشيك أو الإيصال مرفقة',
  depNoProof: 'لم تُرفق صورة بعد', depNone: 'لا يوجد تأمين مسجل.', depLeft: 'غادر المستأجر', documents: 'المستندات', vatK: 'ضريبة القيمة المضافة', vatable: 'خاضع للضريبة', notVatable: 'غير خاضع',
  chillerK: 'التبريد سنوياً', contractK: 'العقد', legalCase: 'قضية قانونية', noFin: 'تعذر احتساب الأرقام المالية. يرجى إبلاغ فريق المالية.'
});
ICON.more = '<circle cx="5" cy="12" r="1.6"/><circle cx="12" cy="12" r="1.6"/><circle cx="19" cy="12" r="1.6"/>';

// ------------------------------------------------------------------ helpers
const FIN = () => D && D.fin;
const cosOf = () => co === 'ALL' ? ['BAN', 'ALR'] : [co];
function ctot(k) { return cosOf().reduce((s, c) => { const x = ((FIN().cheques.totals[c] || {})[k]) || {}; s.n += x.n || 0; s.a += x.a || 0; s.owed += x.owed || 0; return s; }, {n: 0, a: 0, owed: 0}); }
function cdue(i) { return cosOf().reduce((s, c) => { const x = FIN().cheques.due[c][i]; s.n += x[0]; s.a += x[1]; return s; }, {n: 0, a: 0}); }
const monName = (ym, long) => new Date(ym + '-15T12:00:00').toLocaleDateString(loc(), long ? {month: 'long', year: 'numeric'} : {month: 'short'});
const ROW = (l, sub, r, href, cls) => `<${href ? `a href="${href}"` : 'div'} class="row"><div class="l"><b>${l}</b>${sub ? `<small>${sub}</small>` : ''}</div><div class="r ${cls || ''}">${r}${href ? ' ' + fwd() : ''}</div></${href ? 'a' : 'div'}>`;
const NUMR = (x, cls) => `<span class="num ${cls || ''}">${fmt(x)}</span>`;
const noFin = () => `<div class="wrap"><div class="card pad note">${t('noFin')}</div></div>`;
function mbars(items, colour) {   // [{v, label, cap, colour}]
  const top = Math.max(1, ...items.map(x => x.v));
  return `<div class="mbars">${items.map(x => `<div>${x.cap != null ? `<span class="num">${x.cap}</span>` : ''}<i style="height:${Math.max(0, x.v / top * 100).toFixed(0)}%;background:${x.colour || colour || STATUS_COLOUR.leased}"></i><small>${x.label}</small></div>`).join('')}</div>`;
}
const DOC_KEYS = ['Tw', 'Id', 'Tl', 'Cq', 'Vat', 'Dep'];
const DOC_SYM = s => s === 'ok' ? '<i class="dk ok">✓</i>' : s === 'no' ? '<i class="dk no">✗</i>' : s === 'old' ? '<i class="dk old">!</i>' : '<i class="dk na">–</i>';
const docDone = s => s.every(x => x === 'ok' || x === 'na' || x === 'none' || x === '');
const docLegend = () => `<div class="legend" style="margin-top:8px"><span>${DOC_SYM('ok')} ${t('haveIt')}</span><span>${DOC_SYM('no')} ${t('missing')}</span><span>${DOC_SYM('old')} ${t('oldDoc')}</span><span>${DOC_SYM('na')} ${t('notNeeded')}</span></div>`;
const coOfProp = key => { const p = D.properties.find(x => x.key === key); return p ? p.company : ''; };

// ------------------------------------------------------------------ home: extra alerts and the month card
function homeFinAlerts() {
  if (!FIN()) return '';
  const b = ctot('bounced'), s = ctot('settled'), pd = ctot('pastdue');
  const tn = FIN().cheques.tenants.filter(x => x.kind === 'bounced' && cosOf().includes(x.co)).length;
  return `<a class="alert red" href="#bounced"><div><b>${t('bouncedOwed')}</b><small>${t('bouncedOwedSub', {n: tn, a: fmtM(s.a)})}</small></div><div class="r num">${fmtM(b.owed)}</div></a>
    <a class="alert amber" href="#collections"><div><b>${t('dueNotDep', {n: pd.n})}</b><small>${t('dueNotDepSub')}</small></div><div class="r num">${fmtM(pd.a)}</div></a>`;
}
function homeMonthCard() {
  const F = FIN(); if (!F) return '';
  const ym = F.as_of.slice(0, 7), m = +ym.slice(5) - 1, y = F.income[ym.slice(0, 4)];
  const inc = y ? cosOf().reduce((s, c) => s + (y.co[c].months[m] || 0), 0) : 0;
  const due = cdue(0), dep = ctot('deposited');
  return `<div class="sec"><div class="sec-h">${t('thisMonth', {m: monName(ym, true)})}</div><div class="card">
    ${ROW(t('incRec'), t('incRecSub'), NUMR(inc), '#income')}${ROW(t('chqDueMonth'), t('chqDueMonthSub', {n: due.n}), NUMR(due.a), '#collections')}${ROW(t('inBank'), t('inBankSub', {n: dep.n}), `<span class="num">${fmtM(dep.a)}</span>`, '#collections')}</div></div>`;
}

// ------------------------------------------------------------------ collections
function collectionsScreen() {
  if (!FIN()) return head(t('collTitle'), t('collSub2'), null, coSeg()) + noFin();
  const F = FIN(), d30 = ctot('notdue');
  const sumMonths = n => cosOf().reduce((s, c) => s + F.cheques.next[c][String(n)][1], 0);
  const b = ctot('bounced'), pd = ctot('pastdue'), h = ctot('hold'), dep = ctot('deposited'), cl = ctot('cleared'), se = ctot('settled'), nd = ctot('nodate');
  const tn = F.cheques.tenants.filter(x => x.kind === 'bounced' && cosOf().includes(x.co)).length;
  const bars = F.cheques.months.map((ym, i) => { const x = cdue(i); return {v: x.a, label: monName(ym), cap: fmtM(x.a)}; });
  return head(t('collTitle'), t('collSub2'), null, coSeg() + `<div class="kpis"><div><small>${t('next30')}</small><b class="num">${fmtM(sumMonths(30))}</b></div><div><small>${t('next90')}</small><b class="num">${fmtM(sumMonths(90))}</b></div><div><small>${t('inBankK')}</small><b class="num">${fmtM(dep.a)}</b></div></div>`) + `<div class="wrap">
    <div class="sec"><div class="sec-h">${t('dueByMonth')}<span class="muted">${t('chqN', {n: F.cheques.months.reduce((s, _, i) => s + cdue(i).n, 0)})}</span></div><div class="card pad">${mbars(bars)}</div></div>
    <div class="sec"><div class="sec-h">${t('needsAction')}</div>
      <a class="alert red" href="#bounced"><div><b>${t('bouncedStill')}</b><small>${t('bouncedStillSub', {n: b.n, t: tn})}</small></div><div class="r num">${fmtM(b.owed)} ${fwd()}</div></a>
      <div class="alert amber"><div><b>${t('dueND')}</b><small>${t('dueNDSub', {n: pd.n})}</small></div><div class="r num">${fmtM(pd.a)}</div></div>
      <a class="alert white" href="#bounced"><div><b>${t('onHold')}</b><small>${t('onHoldSub', {n: h.n})}</small></div><div class="r num">${fmtM(h.a)} ${fwd()}</div></a></div>
    <div class="sec"><div class="sec-h">${t('byStatus')}</div><div class="card">
      ${ROW(t('notDue'), t('notDueSub'), `<span class="num">${fmtM(d30.a)}</span>`)}${ROW(t('deposited'), t('depositedSub'), `<span class="num">${fmtM(dep.a)}</span>`)}
      ${ROW(t('cleared'), t('clearedSub', {n: cl.n}), `<span class="num">${fmtM(cl.a)}</span>`)}${ROW(t('paidOther'), t('paidOtherSub', {n: se.n}), `<span class="num">${fmtM(se.a)}</span>`)}
      ${ROW(t('bounced'), t('bouncedSub', {n: b.n}), `<span class="num neg">${fmtM(b.a)}</span>`)}${nd.n ? ROW(t('noDate'), t('noDateSub', {n: nd.n}), `<span class="num">${fmtM(nd.a)}</span>`) : ''}</div></div>
    <div class="note">${t('amountsOnly')}</div></div>`;
}

function bouncedScreen() {
  if (!FIN()) return head(t('bncTitle'), '', '#collections') + noFin();
  const list = FIN().cheques.tenants.filter(x => cosOf().includes(x.co));
  const bl = list.filter(x => x.kind === 'bounced'), hl = list.filter(x => x.kind === 'hold');
  const per = c => FIN().cheques.totals[c].bounced ? FIN().cheques.totals[c].bounced.owed || 0 : 0;
  const shown = view.all ? bl : bl.slice(0, 15);
  const line = x => ROW(esc(x.tenant || '—'), `${esc(x.props.join(', '))} · ${x.n === 1 ? t('chq1') : t('chqs', {n: x.n})}`, NUMR(x.a, x.kind === 'bounced' ? 'neg' : ''));
  return head(t('bncTitle'), t('bncSub'), null, coSeg() + `<div class="kpis"><div><small>${t('bouncedStill')}</small><b class="num">${fmtM(ctot('bounced').owed)}</b></div><div><small>${t('baniyas')}</small><b class="num">${fmtM(per('BAN'))}</b></div><div><small>${t('alresala')}</small><b class="num">${fmtM(per('ALR'))}</b></div></div>`)
    .replace(topBar(), `<a class="back" href="#collections">${chev()}${t('collTitle')}</a>`) + `<div class="wrap">
    <div class="sec"><div class="sec-h" style="color:var(--red)">${t('bouncedStill')}<span class="muted">${bl.length}</span></div><div class="card">${shown.map(line).join('') || `<div class="row muted">${t('nothing')}</div>`}
      ${bl.length > shown.length ? `<button class="row note" style="border:0;background:none;width:100%;text-align:start" onclick="view.all=1;render()">${t('moreTenants', {n: bl.length - shown.length})}</button>` : ''}</div></div>
    <div class="sec"><div class="sec-h">${t('onHold')}<span class="muted num">${fmtM(ctot('hold').a)}</span></div><div class="card">${hl.slice(0, 15).map(line).join('') || `<div class="row muted">${t('nothing')}</div>`}</div></div>
    <div class="note">${t('amountsOnly')}</div></div>`;
}

// ------------------------------------------------------------------ rental income
function incomeScreen() {
  const F = FIN(); if (!F) return head(t('incTitle'), '', '#more') + noFin();
  const years = Object.keys(F.income).sort(), y = view.year && F.income[view.year] ? view.year : (F.income[F.as_of.slice(0, 4)] ? F.as_of.slice(0, 4) : years[years.length - 1]);
  const Y = F.income[y], cs = cosOf();
  const months = Array.from({length: 12}, (_, i) => cs.reduce((s, c) => s + (Y.co[c].months[i] || 0), 0)), tot = months.reduce((s, x) => s + x, 0);
  const cur = F.as_of.slice(0, 4) === y ? +F.as_of.slice(5, 7) - 1 : y < F.as_of.slice(0, 4) ? 12 : 0;   // months before this one are past
  const toNow = months.slice(0, cur).reduce((s, x) => s + x, 0);
  const seg = `<div class="seg full" style="grid-template-columns:repeat(${years.length},minmax(0,1fr))">${years.map(k => `<button class="${k === y ? 'on' : ''}" onclick="view.year='${k}';render()">${k}</button>`).join('')}</div>`;
  const coCard = c => { const p = Y.co[c], rec = p.months.reduce((s, x) => s + x, 0);
    return `<div class="sec"><div class="sec-h">${t(c + 'full')}</div><div class="card">${p.opening_ok ? ROW(t('openingK', {y}), t('openingSub'), NUMR(p.open)) : ''}${ROW(t('recognisedIn', {y}), '', NUMR(rec))}
      ${!Y.is_base && p.billed ? ROW(t('invoicedIn', {y}), t('invoicedSub'), NUMR(p.billed)) : ''}${p.opening_ok ? ROW(t('closingK', {y}), t('closingSub'), NUMR(p.close)) : `<div class="row note">${t('openingMissing')}</div>`}</div></div>`; };
  const props = Y.props.filter(x => cs.includes(x[0]));
  return head(t('incTitle'), t('incSub', {y}), null, coSeg() + seg + `<div class="kpis"><div><small>${t('yearK', {y})}</small><b class="num">${fmtM(tot)}</b></div><div><small>${cur > 0 && cur < 12 ? t('toMonth', {m: monName(y + '-' + String(cur).padStart(2, '0'))}) : t('recognised')}</small><b class="num">${fmtM(cur ? toNow : 0)}</b></div><div><small>${t('perMonthK')}</small><b class="num">${fmtM(tot / 12)}</b></div></div>`)
    .replace(topBar(), `<a class="back" href="#more">${chev()}${t('more')}</a>`) + `<div class="wrap">
    <div class="sec"><div class="sec-h">${t('byMonth')}</div><div class="card pad">${mbars(months.map((v, i) => ({v, label: monName(y + '-' + String(i + 1).padStart(2, '0')).slice(0, 3), colour: i < cur ? STATUS_COLOUR.leased : STATUS_COLOUR.confirmed})))}
      <div class="legend" style="margin-top:6px"><span><i style="background:${STATUS_COLOUR.leased}"></i>${t('recognised')}</span><span><i style="background:${STATUS_COLOUR.confirmed}"></i>${t('stillToCome')}</span></div></div></div>
    ${Y.is_base ? `<div class="note">${t('baseYear', {y})}</div>` : ''}
    ${cs.map(coCard).join('')}
    <div class="sec"><div class="sec-h">${t('byProperty')}</div><div class="card">${props.map(([c, k, v]) => ROW(esc(pname(k)), t(c), NUMR(v))).join('') || `<div class="row muted">${t('nothing')}</div>`}</div></div></div>`;
}

// ------------------------------------------------------------------ security deposits
function depositsScreen() {
  const F = FIN(); if (!F) return head(t('depTitle'), '', '#more') + noFin();
  const cs = cosOf(), s = k => cs.reduce((a, c) => a + (F.deposits[c][k] || 0), 0);
  return head(t('depTitle'), t('depSub'), null, coSeg() + `<div class="kpis"><div><small>${t('held')}</small><b class="num">${fmtM(s('held'))}</b></div><div><small>${t('baniyas')}</small><b class="num">${fmtM(F.deposits.BAN.held)}</b></div><div><small>${t('alresala')}</small><b class="num">${fmtM(F.deposits.ALR.held)}</b></div></div>`)
    .replace(topBar(), `<a class="back" href="#more">${chev()}${t('more')}</a>`) + `<div class="wrap">
    <div class="sec"><div class="sec-h">${t('needsAction')}</div>
      <div class="alert amber"><div><b>${t('leftHeld')}</b><small>${t('leftHeldSub', {a: fmt(s('left_amt'))})}</small></div><div class="r num">${s('left')}</div></div>
      <div class="alert white"><div><b>${t('noProof')}</b><small>${t('noProofSub')}</small></div><div class="r num">${s('noproof')}</div></div></div>
    <div class="sec"><div class="sec-h">${t('byCompanyK')}</div><div class="card">${cs.map(c => ROW(t(c + 'full'), t('depLines', {n: F.deposits[c].lines, l: F.deposits[c].left}), NUMR(F.deposits[c].held))).join('')}</div></div>
    <div class="note">${t('depSame')}</div></div>`;
}

// ------------------------------------------------------------------ documents to follow up
function docsScreen() {
  const F = FIN(); if (!F) return head(t('docTitle'), '', '#more') + noFin();
  const cs = cosOf(), rows = F.docs.filter(r => cs.includes(coOfProp(r.p))), done = rows.filter(r => docDone(r.s)).length;
  const onlyMissing = view.docAll ? false : true, shown = onlyMissing ? rows.filter(r => !docDone(r.s)) : rows;
  const cnt = (i, s) => rows.filter(r => r.s[i] === s).length;
  const byP = {}; shown.forEach(r => (byP[r.p] = byP[r.p] || []).push(r));
  const ukey = s => String(s || '').split(/(\d+)/).map(x => /^\d+$/.test(x) ? x.padStart(8, '0') : x).join('');
  const grid = list => `<div class="card pad"><table class="dgrid"><tr><th></th>${DOC_KEYS.map(k => `<th>${t('d' + k + 'S')}</th>`).join('')}</tr>${list.sort((a, b) => ukey(a.code).localeCompare(ukey(b.code))).map(r =>
      `<tr><td><b>${esc(r.tenant || '—')}</b><small class="num">${esc(r.no || '')}${r.code ? ' · ' + esc(r.code) : ''}</small></td>${r.s.map(x => `<td>${DOC_SYM(x)}</td>`).join('')}</tr>`).join('')}</table></div>`;
  return head(t('docTitle'), t('docSub', {n: rows.length, c: done}), null, coSeg()).replace(topBar(), `<a class="back" href="#more">${chev()}${t('more')}</a>`) + `<div class="wrap">
    <div class="sec"><div class="sec-h">${t('missingBy')}</div><div class="card">${DOC_KEYS.map((k, i) => ROW(t('d' + k), cnt(i, 'old') ? t('nOld', {n: cnt(i, 'old')}) : '', `<span class="neg">${t('nMissing', {n: cnt(i, 'no')})}</span>`)).join('')}</div></div>
    <div class="chips"><button class="chip ${onlyMissing ? 'on' : ''}" onclick="view.docAll=0;render()">${t('showMissing')} ${rows.length - done}</button><button class="chip ${onlyMissing ? '' : 'on'}" onclick="view.docAll=1;render()">${t('showAll')} ${rows.length}</button></div>
    ${Object.entries(byP).sort((a, b) => b[1].length - a[1].length).map(([p, list]) => `<div class="sec"><div class="sec-h">${esc(pname(p))}<span class="muted">${t('units', {n: list.length})}</span></div>${grid(list)}</div>`).join('') || `<div class="empty">${t('nothing')}</div>`}
    ${docLegend()}</div>`;
}

// ------------------------------------------------------------------ more (was Reports)
function moreScreen() {
  const F = FIN(), y = F ? F.as_of.slice(0, 4) : '';
  const docs = F ? F.docs.filter(r => cosOf().includes(coOfProp(r.p))) : [];
  const dl = (k, n, s) => `<div class="row"><div class="l"><b>${n}</b><small>${s}</small></div>${REMOTE ? '' : `<a class="btn ghost" style="height:36px;font-size:12px" href="/api/export/${k}.csv" download>${t('download')}</a>`}</div>`;
  return head(t('more'), t('moreSub')) + `<div class="wrap">
    ${F ? `<div class="sec"><div class="sec-h">${t('finance')}</div><div class="card">${ROW(t('incTitle'), t('incSub', {y}), '', '#income')}${ROW(t('depTitle'), t('noProofSub'), '', '#deposits')}${ROW(t('bncTitle'), t('bncSub'), '', '#bounced')}</div></div>
    <div class="sec"><div class="sec-h">${t('followUp')}</div><div class="card">${ROW(t('docTitle'), t('docSub', {n: docs.length, c: docs.filter(r => docDone(r.s)).length}), '', '#docs')}${ROW(t('vacancyRow'), t('vacancyRowSub'), '', '#vacancy')}</div></div>` : ''}
    <div class="sec"><div class="sec-h">${t('downloads')}</div><div class="card">${dl('register', t('rRegister'), t('rRegisterSub'))}${dl('occupancy', t('rOcc'), t('rOccSub'))}${dl('expiries', t('rExp'), t('rExpSub'))}${dl('vacancy', t('rVac'), t('rVacSub'))}
      ${F ? dl('cashflow', t('rCash'), t('rCashSub')) + dl('income' + y, t('rInc'), t('rIncSub', {y})) : ''}</div></div>
    <div class="note">${REMOTE ? t('officeOnly') : t('dataFrom', {f: esc(D.file || ''), t: D.imported_at ? dstr(D.imported_at.slice(0, 10)) : ''})}</div></div>`;
}

// ------------------------------------------------------------------ lease page: cheques, deposit, documents
function leaseFin(u) {
  const F = FIN(), L = F && u.ref ? F.leases[u.ref] : null; if (!L) return '';
  const order = [['Due', 'chqDue', 'amber'], ['Not due', 'chqNotDue', ''], ['Deposited', 'chqDep', ''], ['Cleared', 'chqCleared', ''], ['Bounced', 'chqBounced', 'neg'], ['Settled', 'chqSettled', ''], ['On hold', 'chqHold', ''], ['Other', 'chqOther', '']];
  const n = Object.values(L.cheques).reduce((s, x) => s + x[0], 0);
  const cq = n ? order.filter(([k]) => L.cheques[k]).map(([k, lbl, cls]) => ROW(t(lbl), L.cheques[k][0] === 1 ? t('chq1') : t('chqs', {n: L.cheques[k][0]}), NUMR(L.cheques[k][1], cls))).join('') : `<div class="row muted">${t('noCheques')}</div>`;
  const dp = L.dep && L.dep.held ? ROW(t('depHeld'), (L.dep.proof ? t('depProof') : t('depNoProof')) + (L.dep.left ? ' · ' + t('depLeft') : ''), NUMR(L.dep.held)) : `<div class="row muted">${t('depNone')}</div>`;
  const dc = L.docs ? `<div class="card pad"><div class="dchips">${L.docs.map((s, i) => `<span>${DOC_SYM(s)} ${t('d' + DOC_KEYS[i])}</span>`).join('')}</div></div>` : '';
  return `<div class="sec"><div class="sec-h">${t('chqTitle')}<span class="muted">${t('chqForContract', {n})}</span></div><div class="card">${cq}</div></div>
    <div class="sec"><div class="sec-h">${t('depTitle')}</div><div class="card">${dp}</div></div>
    ${dc ? `<div class="sec"><div class="sec-h">${t('documents')}</div>${dc}</div>` : ''}`;
}
function leaseRows(u) {
  const F = FIN(), L = F && u.ref ? F.leases[u.ref] : null; if (!L) return '';
  return `<div class="row"><span class="muted">${t('contractK')}</span><b class="num">${esc(u.ref)}</b></div>
    <div class="row"><span class="muted">${t('vatK')}</span><b>${L.vatable ? t('vatable') : t('notVatable')}</b></div>
    ${L.chiller ? `<div class="row"><span class="muted">${t('chillerK')}</span><b class="num">${fmt(L.chiller)}</b></div>` : ''}`;
}
