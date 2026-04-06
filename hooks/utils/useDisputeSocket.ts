import { baseUrl } from '@/api/endpoints';
import { storageKeys } from '@/config/constants';
import { getCookie } from '@/lib/functions/storage.lib';
import { IChatMsg } from '@/typescript/types/chat.types';
import { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';

export function useDisputeSocket(userId: string | undefined, roomId: string | undefined) {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [messages, setMessages] = useState<IChatMsg[]>([]);
  const socketRef = useRef<Socket | null>(null);
  const isInitializedRef = useRef(false);

  const getAuthToken = () => getCookie(storageKeys.cookies.jwtToken);

  // Initialize socket connection
  useEffect(() => {
    if (!userId || isInitializedRef.current) return;

    const token = getAuthToken();
    if (!token) return;

    isInitializedRef.current = true;

    const socketInstance = io(baseUrl, {
      transports: ['websocket', 'polling'],
      auth: { 'x-access-token': token },
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionAttempts: 5,
    });

    socketInstance.on('connect', () => {
      console.warn('***✅ Connected to socket:', socketInstance.id);
    });

    socketRef.current = socketInstance;
    setSocket(socketInstance);

    return () => {
      isInitializedRef.current = false;
      socketInstance.disconnect();
      socketRef.current = null;
    };
  }, [userId]);

  // Setup room-specific listeners
  useEffect(() => {
    const socketInstance = socketRef.current;
    if (!socketInstance || !roomId || !userId) return;

    const clientListen = `${roomId}_${userId}_support_dispute_new_message`;

    const handleNewMessage = (data: IChatMsg) => {
      setMessages(prevMessages => {
        const filtered = prevMessages.filter(
          msg =>
            !(
              msg._id.startsWith('temp-') &&
              msg.text === data.text &&
              msg.sender_id === data.sender_id
            )
        );

        const exists = filtered.find(msg => msg._id === data._id);
        if (exists) return prevMessages;

        return [...filtered, data];
      });
    };

    socketInstance.on(clientListen, handleNewMessage);
    console.warn('***📤 Sending message2:', roomId);
    socketInstance.emit('support_dispute_read_message', { room_id: roomId });

    return () => {
      socketInstance.off(clientListen, handleNewMessage);
    };
  }, [roomId, userId]);

  return { socket, messages, setMessages };
}
