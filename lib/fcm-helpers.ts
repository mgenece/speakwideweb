import { subscribeFCMApi } from '@/api/functions/other.api';
import { storageKeys } from '@/config/constants';
import { deleteToken, getToken } from 'firebase/messaging';
import { destroyCookie, setCookie } from 'nookies';
import { messaging } from './firebase';
import { getCookie } from './functions/storage.lib';

// Request notification permission and get FCM token
export const requestNotificationPermission = async () => {
  try {
    const permission = await Notification.requestPermission();

    if (permission !== 'granted') {
      console.warn('***Notification permission denied');
      return null;
    }

    const messagingInstance = await messaging();
    if (!messagingInstance) return null;

    // Get cached token from cookie
    const cachedToken = getCookie(storageKeys.cookies.fcmToken);
    if (cachedToken) {
      console.warn('***Using cached FCM Token:', cachedToken);
      return cachedToken;
    }

    // ✅ Avoid duplicate registration if SW already controls the page
    if (navigator.serviceWorker.controller) {
      console.warn('***SW already controlling the page — skip registration');
    } else {
      const existingReg = await navigator.serviceWorker.getRegistration(
        '/firebase-messaging-sw.js'
      );
      if (!existingReg) {
        await navigator.serviceWorker.register('/firebase-messaging-sw.js', { scope: '/' });
        console.warn('***Service worker registered');
      } else {
        console.warn('***Service worker already registered');
      }
    }

    // Wait for the active SW
    const readyRegistration = await navigator.serviceWorker.ready;
    console.warn('***Service worker ready');

    // Get FCM token
    const token = await getToken(messagingInstance, {
      vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
      serviceWorkerRegistration: readyRegistration,
    });

    console.warn('***FCM Token generated:', token);

    sendTokenToBackend(token);

    // Cache the token in cookie with 30 days expiry
    const maxAge = 30 * 24 * 60 * 60; // 30 days
    setCookie(null, storageKeys.cookies.fcmToken, token, {
      maxAge,
      path: '/',
      sameSite: 'strict',
    });

    return token;
  } catch (error) {
    console.error('***Error getting FCM token:', error);
    return null;
  }
};

export const sendTokenToBackend = async (token: string) => {
  const userToken = getCookie(storageKeys.cookies.jwtToken);
  try {
    if (userToken) {
      // Use your existing API function
      const data = await subscribeFCMApi({
        token: token,
      });
      console.warn('***Successfully subscribed to topics:', data);
      return { success: true, data };
    }
  } catch (error: any) {
    // Handle axios error
    const errorMessage = error.response?.data || error.message || 'Unknown error';
    console.error('***Failed to subscribe to topics:', errorMessage);
    return { success: false, error: errorMessage };
  }
};

// Send token to backend for unsubscribing from topics
export const unsubscribeFromBackend = async (token: string, topics: string[]) => {
  try {
    const response = await fetch('/api/fcm/unsubscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fcmToken: token,
        topics: topics,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      console.warn('***Successfully unsubscribed from topics:', data);
      return { success: true, data };
    } else {
      const error = await response.json();
      console.error('***Failed to unsubscribe from topics:', error);
      return { success: false, error };
    }
  } catch (error) {
    console.error('***Error unsubscribing from backend:', error);
    return { success: false, error };
  }
};

// Stop receiving notifications (delete FCM token)
export const stopNotifications = async () => {
  try {
    const messagingInstance = await messaging();
    if (!messagingInstance) {
      console.warn('***Messaging instance not available');
      return { success: false, error: 'Messaging not initialized' };
    }

    // Delete the FCM token
    const deleted = await deleteToken(messagingInstance);

    if (deleted) {
      clearFCMToken();

      return { success: true };
    }

    return { success: false, error: 'Failed to delete token' };
  } catch (error) {
    console.error('***Error stopping notifications:', error);
    return { success: false, error };
  }
};

// Revoke browser notification permission (user must manually allow again)
export const revokeNotificationPermission = async () => {
  try {
    // Note: You cannot programmatically revoke browser permissions
    // User must do this manually in browser settings
    // This function just cleans up your app's state

    await stopNotifications();

    console.warn('***Notification state cleared. User must revoke permission in browser settings.');
    return {
      success: true,
      message:
        'Please revoke notification permission in browser settings to fully disable notifications',
    };
  } catch (error) {
    console.error('***Error revoking notification permission:', error);
    return { success: false, error };
  }
};

// Optional: Call this when user logs out to clear the token
export const clearFCMToken = () => {
  destroyCookie(null, storageKeys.cookies.fcmToken, { path: '/' });
  console.warn('***FCM token cleared from cookies');
};

// Optional: Force refresh the token (useful for debugging)
export const refreshFCMToken = async () => {
  clearFCMToken();
  return await requestNotificationPermission();
};
