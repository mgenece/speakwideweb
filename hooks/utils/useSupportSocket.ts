// hooks/utils/useSupportSocket.ts
import { baseUrl } from '@/api/endpoints';
import { storageKeys } from '@/config/constants';
import { getCookie } from '@/lib/functions/storage.lib';
import { IChatMsg } from '@/typescript/types/chat.types';
import { useEffect, useRef, useState } from 'react';
import { Socket, io } from 'socket.io-client';

export const useSupportSocket = (userId: string, roomId: string) => {
  const socketRef = useRef<Socket | null>(null);
  const [messages, setMessages] = useState<IChatMsg[]>([]);
  const getAuthToken = () => getCookie(storageKeys.cookies.jwtToken);

  useEffect(() => {
    if (!userId || !roomId) return;

    const token = getAuthToken();
    if (!token) return;

    // Initialize socket connection
    const socket = io(baseUrl, {
      transports: ['websocket', 'polling'],
      auth: { 'x-access-token': token },
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionAttempts: 5,
    });

    socketRef.current = socket;

    // Listen for connection
    socket.on('connect', () => {
      // console.log('✅ Support socket connected:', socket.id);

      // Emit read message event for support
      socket.emit('support_read_message', { room_id: roomId });
    });

    // Listen for new support messages
    const newMessageEvent = `${roomId}_${userId}_support_new_message`;

    // console.log(roomId, userId, '***');

    socket.on(newMessageEvent, (message: IChatMsg) => {
      // console.log('📨 New support message received:', message);
      setMessages(prev => [...prev, message]);
    });

    socket.on('disconnect', () => {
      console.warn('❌ Support socket disconnected');
    });

    socket.on('error', error => {
      console.error('⚠️ Support socket error:', error);
    });

    // Cleanup on unmount
    return () => {
      socket.off(newMessageEvent);
      socket.disconnect();
    };
  }, [userId, roomId]);

  return {
    socket: socketRef.current,
    messages,
    setMessages,
  };
};
