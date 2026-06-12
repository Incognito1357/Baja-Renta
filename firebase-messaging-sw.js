// Firebase Messaging Service Worker — Baja Renta
importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyCluq8UBfeJwtGEJ9CE4yh4PUSU-P6PsmY",
  authDomain: "baja-renta.firebaseapp.com",
  projectId: "baja-renta",
  storageBucket: "baja-renta.firebasestorage.app",
  messagingSenderId: "444376140507",
  appId: "1:444376140507:web:131151df5e526073fc9afe"
});

const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage(function(payload) {
  console.log('Background message:', payload);
  const { title, body, icon } = payload.notification || {};
  self.registration.showNotification(title || 'Baja Renta', {
    body: body || '',
    icon: icon || '/icon-192.png',
    badge: '/icon-192.png',
    data: payload.data || {},
  });
});

// Handle notification click
self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  event.waitUntil(
    clients.openWindow('https://bajarenta.com')
  );
});
