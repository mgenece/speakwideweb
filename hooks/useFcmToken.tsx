'use client';

import { requestNotificationPermission, stopNotifications } from '@/lib/fcm-helpers';
import { messaging } from '@/lib/firebase';
import { onMessage } from 'firebase/messaging';
import { useCallback, useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { useNotificationHandler } from './useNotificationHandler';

export const useFcmToken = () => {
  const [token, setToken] = useState<string | null>(null);
  const [notificationPermission, setNotificationPermission] =
    useState<NotificationPermission>('default');
  const [isLoading, setIsLoading] = useState(true);
  const [isEnabled, setIsEnabled] = useState(true);
  const initialized = useRef(false);
  const { handleFcmMessage } = useNotificationHandler();

  const unsubscribeRef = useRef<(() => void) | null>(null);

  const initializeFCM = async () => {
    try {
      if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
        console.warn('***Service workers not supported');
        setIsLoading(false);
        return;
      }

      // Check current permission status
      setNotificationPermission(Notification.permission);

      // Request permission and get token
      const fcmToken = await requestNotificationPermission();

      if (fcmToken) {
        setToken(fcmToken);
        setNotificationPermission('granted');
        setIsEnabled(true);

        // Set up foreground message listener
        const messagingInstance = await messaging();
        if (messagingInstance) {
          const unsubscribe = onMessage(messagingInstance, payload => {
            console.warn(payload, '***');
            handleFcmMessage({ payload, isEnabled });
          });

          // Store unsubscribe function
          unsubscribeRef.current = unsubscribe;
        }
      } else {
        setNotificationPermission(Notification.permission);
        setIsEnabled(false);
      }
    } catch (error) {
      console.error('Error initializing FCM:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Function to disable notifications
  const disableNotifications = useCallback(async () => {
    try {
      setIsLoading(true);

      // Unsubscribe from message listener
      if (unsubscribeRef.current) {
        unsubscribeRef.current();
        unsubscribeRef.current = null;
      }

      // Stop notifications and delete token
      const result = await stopNotifications();

      if (result.success) {
        setToken(null);
        setIsEnabled(false);
        toast.success('Notifications disabled successfully');
        return { success: true };
      } else {
        toast.error('Failed to disable notifications');
        return { success: false, error: result.error };
      }
    } catch (error) {
      console.error('Error disabling notifications:', error);
      toast.error('Error disabling notifications');
      return { success: false, error };
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Function to enable notifications
  const enableNotifications = useCallback(async () => {
    try {
      setIsLoading(true);
      await initializeFCM();
      toast.success('Notifications enabled successfully');
      return { success: true };
    } catch (error) {
      console.error('Error enabling notifications:', error);
      toast.error('Error enabling notifications');
      return { success: false, error };
    }
  }, []);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    initializeFCM();

    // Cleanup function
    return () => {
      if (unsubscribeRef.current) {
        unsubscribeRef.current();
      }
    };
  }, []);

  return {
    token,
    notificationPermission,
    isLoading,
    isEnabled,
    disableNotifications,
    enableNotifications,
  };
};
