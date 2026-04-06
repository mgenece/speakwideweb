importScripts('https://www.gstatic.com/firebasejs/10.11.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.11.1/firebase-messaging-compat.js');

const baseURL = self.location.origin;

const firebaseConfig = {
  apiKey: 'AIzaSyCgYgzFi8_JddCkUWsS4KUJp5hUKO3gFKk',
  authDomain: 'speakwide-b8cde.firebaseapp.com',
  projectId: 'speakwide-b8cde',
  storageBucket: 'speakwide-b8cde.firebasestorage.app',
  messagingSenderId: '725578384157',
  appId: '1:725578384157:web:72e42627449f3595d217f4',
};

const firebase = self.firebase;
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

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

messaging.onBackgroundMessage(async payload => {
  console.warn('📩 Background message received:', payload);

  const clientList = await clients.matchAll({ type: 'window', includeUncontrolled: true });
  console.warn('Clients:', clientList);

  // Detect if any window is visible/focused
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
    console.warn('Skipping background notification because tab is active');
    return;
  }

  // Construct notification details
  const { title, body, imageUrl, type, session_id: sessionId } = payload.data;
  const notificationTitle = title || 'New Notification';
  const notificationOptions = {
    body: body || '',
    icon: `${baseURL}/assets/images/logoOnly.png`,
    image: imageUrl || undefined,
    data: { url: urlGen({ type, sessionId }) },
  };

  console.warn('Showing background notification:', notificationTitle);
  self.registration.showNotification(notificationTitle, notificationOptions);
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
