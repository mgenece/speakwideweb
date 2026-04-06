// src/hooks/useFcmMessageHandler.ts
'use client';

import { markReadApi } from '@/api/functions/notifications';
import SessionRequestNotification from '@/components/layouts/notification/SessionRequestNotification';
import { queryKeys } from '@/config/constants';
import { queryClient } from '@/pages/_app';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export const useNotificationHandler = () => {
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';

  const markNotificationReadMutation = useMutation({
    mutationFn: markReadApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.notificationListAll });
      queryClient.invalidateQueries({ queryKey: queryKeys.unreadNotificationCount });
    },
  });

  const handleFcmMessage = ({ payload, isEnabled }: { payload: any; isEnabled: boolean }) => {
    console.warn('***Foreground message received:', payload);

    if (!isEnabled) {
      console.warn('***Notifications disabled, skipping');
      return;
    }

    const { type, title, body } = payload.data || {};

    switch (type) {
      case 'session_requested':
        queryClient.invalidateQueries({ queryKey: ['interpreter-session-list'] });
        queryClient.invalidateQueries({ queryKey: queryKeys.notificationListAll });
        queryClient.invalidateQueries({ queryKey: queryKeys.unreadNotificationCount });

        toast.custom(t => (
          <SessionRequestNotification
            title={title}
            body={body}
            onClick={() => {
              markNotificationReadMutation.mutate(payload.data?.uid as string);
              window.open(
                `${baseUrl}/interpreter/dashboard/?sessionDetail=${payload.data?.session_id}`,
                '_blank'
              );
              toast.dismiss(t.id);
            }}
          />
        ));
        break;

      case 'session_accepted':
        queryClient.invalidateQueries({ queryKey: queryKeys.clientSessionList('') });
        queryClient.invalidateQueries({ queryKey: queryKeys.notificationListAll });
        queryClient.invalidateQueries({ queryKey: queryKeys.unreadNotificationCount });

        toast.custom(t => (
          <SessionRequestNotification
            title={title}
            body={body}
            onClick={() => {
              markNotificationReadMutation.mutate(payload.data?.uid as string);
              window.open(
                `${baseUrl}/user/dashboard/?sessionDetail=${payload.data?.session_id}`,
                '_blank'
              );
              toast.dismiss(t.id);
            }}
          />
        ));
        break;
      case 'session_cancelled':
        toast.error(`Session was cancelled: ${title || ''}`);
        break;

      case 'scheduled_session_updated':
        queryClient.invalidateQueries({ queryKey: ['interpreter-session-list'] });
        queryClient.invalidateQueries({ queryKey: queryKeys.notificationListAll });
        queryClient.invalidateQueries({ queryKey: queryKeys.unreadNotificationCount });

        toast.custom(t => (
          <SessionRequestNotification
            title={title}
            body={body}
            onClick={() => {
              markNotificationReadMutation.mutate(payload.data?.uid as string);
              window.open(
                `${baseUrl}/interpreter/dashboard/?sessionDetail=${payload.data?.session_id}`,
                '_blank'
              );
              toast.dismiss(t.id);
            }}
          />
        ));
        break;

      default:
        console.warn('Unhandled FCM message type:', type);
        break;
    }
  };

  return { handleFcmMessage, markNotificationRead: markNotificationReadMutation.mutate };
};
