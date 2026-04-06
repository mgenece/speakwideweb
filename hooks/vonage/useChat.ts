// hooks/useChat.ts
import { getChatHistoryApi, saveChatApi, uploadFileApi } from '@/api/functions/videoSession.api';
import { safeJsonParse } from '@/lib/functions/_helpers.lib';
import { IChatMessage, IChatState } from '@/typescript/interface/vonage.interface';
import { useMutation } from '@tanstack/react-query';
import { useCallback, useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';

export const useChat = (session: any, currentConnectionId?: string) => {
  const [chatState, setChatState] = useState<IChatState>({
    messages: [],
    currentMessage: '',
    username: '',
    showChat: false,
    unreadCount: 0,
  });

  const chatMessagesRef = useRef<HTMLDivElement>(null);
  const prevCountRef = useRef<number>(0);
  const loadedSessionIdRef = useRef<string | null>(null);

  // Mutations
  const fileUploadMutation = useMutation({ mutationFn: uploadFileApi });
  const saveChatMutation = useMutation({ mutationFn: saveChatApi });
  const getChatHistoryMutation = useMutation({ mutationFn: getChatHistoryApi });

  const uploadedFile = fileUploadMutation?.data?.data?.[0];

  // Load chat history once per session
  useEffect(() => {
    if (!session?.id) return;
    loadedSessionIdRef.current = session.id;

    getChatHistoryMutation.mutate(session.id, {
      onSuccess: data => {
        const parsed = (data?.data?.docs.reverse() || [])
          .map((item: any) => {
            const payload = safeJsonParse<any>(item.message);
            if (!payload) return null;

            const isFile = payload?.type === 'file';
            const tsISO = payload?.timestamp || item?.createdAt || new Date().toISOString();

            const msg: IChatMessage = {
              id: `${item?._id || `${payload?.username || 'system'}-${tsISO}`}`,
              username: payload?.username || item?.senderName || 'Unknown',
              message: isFile ? undefined : payload?.message || '',
              timestamp: new Date(tsISO),
              connectionId: 'history',
              type: (payload?.type as IChatMessage['type']) || 'user',
              fileData: isFile
                ? {
                    fileName: payload?.fileData?.fileName,
                    fileSize: payload?.fileData?.fileSize,
                    fileType: payload?.fileData?.fileType,
                    downloadUrl: payload?.fileData?.downloadUrl,
                  }
                : undefined,
            };
            return msg;
          })
          .filter(Boolean);
        setChatState(prev => ({ ...prev, messages: parsed as IChatMessage[] }));
      },
    });
  }, [session?.connection?.id]);

  // Handle file upload completion -> signal + persist
  useEffect(() => {
    if (!fileUploadMutation.isSuccess || !uploadedFile || !session || !chatState.username) return;

    const messagePayload = {
      username: chatState.username,
      timestamp: new Date().toISOString(),
      type: 'file' as const,
      fileData: {
        fileName: uploadedFile.fileName,
        fileSize: uploadedFile.fileSize,
        fileType: uploadedFile.fileType,
        downloadUrl: uploadedFile.downloadUrl,
      },
    };
    const msgData = JSON.stringify(messagePayload);

    session.signal({ type: 'chat', data: msgData }, (error: any) => {
      if (error) {
        const errorMessage: IChatMessage = {
          id: `error-${Date.now()}`,
          username: 'System',
          message: `Failed to share file: ${uploadedFile.fileName}`,
          timestamp: new Date(),
          connectionId: 'system',
          type: 'system',
        };
        setChatState(prev => ({ ...prev, messages: [...prev.messages, errorMessage] }));
      } else {
        saveChatMutation.mutate({
          sessionId: session?.id,
          senderName: chatState.username,
          message: msgData,
        });
        setChatState(prev => ({
          ...prev,
          messages: prev.messages.filter(m => !m.id.startsWith('uploading-')),
        }));
      }
    });

    fileUploadMutation.reset();
  }, [
    fileUploadMutation.isSuccess,
    uploadedFile,
    session,
    chatState.username,
    saveChatMutation,
    fileUploadMutation,
  ]);

  // Handle file upload error
  useEffect(() => {
    if (!fileUploadMutation.isError) return;

    setChatState(prev => ({
      ...prev,
      messages: [
        ...prev.messages.filter(m => !m.id.startsWith('uploading-')),
        {
          id: `error-${Date.now()}`,
          username: 'System',
          message: `Failed to upload file: ${
            fileUploadMutation.error instanceof Error
              ? fileUploadMutation.error.message
              : 'Unknown error'
          }`,
          timestamp: new Date(),
          connectionId: 'system',
          type: 'system',
        },
      ],
    }));

    fileUploadMutation.reset();
  }, [fileUploadMutation.isError, fileUploadMutation.error, fileUploadMutation]);

  // Send file: show placeholder then upload
  const sendFileMessage = useCallback(
    (file: File) => {
      if (!file || !session || !chatState.username.trim()) return;

      const uploadingMessage: IChatMessage = {
        id: `uploading-${Date.now()}`,
        username: chatState.username,
        message: `📤 Uploading ${file.name}...`,
        timestamp: new Date(),
        connectionId: currentConnectionId || 'self',
        type: 'system',
      };

      setChatState(prev => ({ ...prev, messages: [...prev.messages, uploadingMessage] }));

      const formData = new FormData();
      formData.append('files', file);
      fileUploadMutation.mutate(formData);
    },
    [session, chatState.username, currentConnectionId, fileUploadMutation]
  );

  // Auto-scroll when new message appended
  useEffect(() => {
    const list = chatMessagesRef.current;
    if (!list) return;
    if (chatState.messages.length > prevCountRef.current) {
      list.scrollTop = list.scrollHeight;
    }
    prevCountRef.current = chatState.messages.length;
  }, [chatState.messages.length]);

  // Unread count logic
  // useEffect(() => {
  //   if (!chatState.showChat && chatState.messages.length > 0) {
  //     const last = chatState.messages[chatState.messages.length - 1];
  //     if (last?.connectionId !== currentConnectionId && last?.type === 'user') {
  //       setChatState(prev => ({ ...prev, unreadCount: prev.unreadCount + 1 }));
  //     }
  //   }
  // }, [chatState.messages.length, chatState.showChat, currentConnectionId]);

  // // Reset unread on open
  // useEffect(() => {
  //   if (chatState.showChat) {
  //     setChatState(prev => ({ ...prev, unreadCount: 0 }));
  //   }
  // }, [chatState.showChat]);

  // Listen for incoming messages -> append
  useEffect(() => {
    if (!session) return;

    const handleChatSignal = (event: any) => {
      try {
        const payload = JSON.parse(event.data);
        const newMessage: IChatMessage = {
          id: `${event.from?.connectionId || 'system'}-${Date.now()}`,
          username: payload.username,
          message: payload.message,
          timestamp: new Date(payload.timestamp),
          connectionId: event.from?.connectionId || 'system',
          type: payload.type || 'user',
          fileData: payload.fileData,
        };
        if (!chatState.showChat) {
          toast.success(`"${payload?.message || 'File received'}" - ${payload?.username}`);
          setChatState(prev => ({ ...prev, unreadCount: prev.unreadCount + 1 }));
        }

        setChatState(prev => ({ ...prev, messages: [...prev.messages, newMessage] }));
      } catch (error) {
        console.error('Error parsing chat message:', error);
      }
    };

    if (chatState.showChat) {
      setChatState(prev => ({ ...prev, unreadCount: 0 }));
    }

    session.on('signal:chat', handleChatSignal);
    return () => {
      session.off?.('signal:chat', handleChatSignal);
    };
  }, [session?.connection?.id, chatState.showChat]);

  // Send text message -> signal + persist
  const sendMessage = useCallback(() => {
    if (!session || !chatState.currentMessage.trim() || !chatState.username.trim()) return;

    const payload = {
      username: chatState.username,
      message: chatState.currentMessage.trim(),
      timestamp: new Date().toISOString(),
      type: 'user' as const,
    };
    const msgData = JSON.stringify(payload);

    session.signal({ type: 'chat', data: msgData }, (error: any) => {
      if (error) {
        setChatState(prev => ({
          ...prev,
          messages: [
            ...prev.messages,
            {
              id: `error-${Date.now()}`,
              username: 'System',
              message: 'Failed to send message.',
              timestamp: new Date(),
              connectionId: 'system',
              type: 'system',
            },
          ],
        }));
      } else {
        saveChatMutation.mutate({
          sessionId: session?.id,
          senderName: chatState.username,
          message: msgData,
        });
        setChatState(prev => ({ ...prev, currentMessage: '' }));
      }
    });
  }, [session?.connection?.id, chatState.currentMessage, chatState.username, saveChatMutation]);

  // State update helpers
  const updateCurrentMessage = useCallback((message: string) => {
    setChatState(prev => ({ ...prev, currentMessage: message }));
  }, []);

  const updateUsername = useCallback((username: string) => {
    setChatState(prev => ({ ...prev, username }));
  }, []);

  const toggleChat = useCallback(() => {
    setChatState(prev => ({ ...prev, showChat: !prev.showChat }));
  }, []);

  const sendSystemMessage = useCallback((message: string) => {
    const systemMessage: IChatMessage = {
      id: `system-${Date.now()}`,
      username: 'System',
      message,
      timestamp: new Date(),
      connectionId: 'system',
      type: 'system',
    };
    setChatState(prev => ({ ...prev, messages: [...prev.messages, systemMessage] }));
  }, []);

  // console.log(chatState.unreadCount, '***');

  return {
    chatState,
    chatMessagesRef,
    sendMessage,
    updateCurrentMessage,
    updateUsername,
    toggleChat,
    sendSystemMessage,
    sendFileMessage,
    isUploadingFile: fileUploadMutation.isPending,
  };
};
