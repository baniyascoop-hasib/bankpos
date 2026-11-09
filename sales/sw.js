// Service worker for the Daily Sales phone app: shows the "figures updated" notification sent by the office server.
// The push carries no data (no figures pass through the push service); the text is fixed here.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (e) => e.waitUntil(self.clients.claim()));
self.addEventListener('push', (e) => {
  e.waitUntil(self.registration.showNotification('Daily sales updated · تم تحديث المبيعات', {
    body: 'New sales figures are available. Tap to view.\nتوفرت أرقام مبيعات جديدة. اضغط للعرض.',
    icon: 'icon-192.png', badge: 'icon-192.png', tag: 'daily-sales', renotify: true,
  }));
});
self.addEventListener('notificationclick', (e) => {
  e.notification.close();
  e.waitUntil(self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((ws) => {
    for (const w of ws) return w.focus();
    return self.clients.openWindow('./#/today');
  }));
});
