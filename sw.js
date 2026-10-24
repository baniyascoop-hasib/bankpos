// Service worker for the phone app: shows the "position updated" notification sent by the Mac mini on Publish.
// The push carries no data (no figures pass through the push service); the text is fixed here.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));
self.addEventListener('push', e => {
  e.waitUntil(self.registration.showNotification('Bank position updated · تم تحديث الأرصدة', {
    body: 'The new balances are published. Tap to view.\nتم نشر الأرصدة الجديدة. اضغط للعرض.',
    icon: 'icon-192.png', badge: 'icon-64.png', tag: 'bank-position', renotify: true
  }));
});
self.addEventListener('notificationclick', e => {
  e.notification.close();
  e.waitUntil(self.clients.matchAll({type: 'window', includeUncontrolled: true}).then(ws => {
    for (const w of ws) { w.postMessage('reload'); return w.focus(); }
    return self.clients.openWindow('./#home');
  }));
});
