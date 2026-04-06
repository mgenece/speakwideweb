'use client';

import { useFcmToken } from '@/hooks/useFcmToken';
import { useEffect } from 'react';
import toast from 'react-hot-toast';

interface NotificationProviderProps {
  children?: React.ReactNode;
}

export default function NotificationProvider({ children }: NotificationProviderProps) {
  const { notificationPermission, isLoading } = useFcmToken();

  useEffect(() => {
    if (!isLoading && notificationPermission === 'denied') {
      toast.error('Notifications are blocked. Please enable them in browser settings.');
    }
  }, [isLoading, notificationPermission]);

  return <>{children}</>;
}
