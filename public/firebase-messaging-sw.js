importScripts('https://www.gstatic.com/firebasejs/10.11.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.11.1/firebase-messaging-compat.js');

const baseURL = self.location.origin;

function urlGen({ type, sessionId }) {
  switch (type) {
    case 'session_requested':
      return `${baseURL}/interpreter/dashboard/?sessionDetail=${sessionId}`;

    case 'session_accepted':
      return `${baseURL}/user/dashboard/?sessionDetail=${sessionId}`;
    default:
      return baseURL;
  }
}

// Fetch Firebase config from the server to avoid hardcoding credentials in this public file.
const messagingPromise = fetch(`${baseURL}/api/firebase-sw-config`)
  .then(res => res.json())
  .then(config => {
    const firebase = self.firebase;
    if (!firebase.apps.length) {
      firebase.initializeApp(config);
    }
    return firebase.messaging();
  });

messagingPromise.then(messaging => {
  messaging.onBackgroundMessage(async payload => {
    const clientList = await clients.matchAll({ type: 'window', includeUncontrolled: true });

    let appInForeground = false;
    for (const client of clientList) {
      if (client.url.includes(self.location.origin)) {
        try {
          if (client.focused || client.visibilityState === 'visible') {
            appInForeground = true;
            break;
          }
        } catch {
          // Ignore focus/visibility checks when the browser disallows access.
        }
      }
    }

    if (appInForeground) {
      return;
    }

    const { title, body, imageUrl, type, session_id: sessionId } = payload.data;
    const notificationTitle = title || 'New Notification';
    const notificationOptions = {
      body: body || '',
      icon: `${baseURL}/assets/images/logoOnly.png`,
      image: imageUrl || undefined,
      data: { url: urlGen({ type, sessionId }) },
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
  });
});

// Handle notification clicks
self.addEventListener('notificationclick', event => {
  event.notification.close();
  const targetUrl = event.notification.data?.url || baseURL;

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(clientList => {
      for (const client of clientList) {
        if (client.url === targetUrl && 'focus' in client) {
          return client.focus();
        }
      }
      return clients.openWindow(targetUrl);
    })
  );
});
