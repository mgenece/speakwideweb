import { disputeChatHistory } from '@/api/functions/dispute.api';
import { useInterpreterData, useUserData } from '@/hooks/react-query/useVisitor';

import { createTempMessage } from '@/hooks/utils/messageUtils';
import { useDisputeSocket } from '@/hooks/utils/useDisputeSocket';
import {
  IActionHistoryPanelProps,
  IChatMsg,
  IFileAttachment,
  IMessagePayload,
} from '@/typescript/types/chat.types';
import { Box, CircularProgress, Paper, Typography, useTheme } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';
import { ChatInput } from './ChatSection/ChatInput';
import { ChatMessage } from './ChatSection/ChatMessage';

export function ActionHistoryPanel({ disputeId, senderType }: IActionHistoryPanelProps) {
  const theme = useTheme();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const { userData } = useUserData();
  const { interpreterData } = useInterpreterData();
  const userId = userData?._id || interpreterData?._id || '';

  const chatHistoryQuery = useQuery({
    queryKey: ['dispute-chat-history', disputeId, senderType],
    queryFn: () => disputeChatHistory({ type: senderType, disputeId }),
    enabled: Boolean(senderType && disputeId),
    refetchOnMount: true,
  });

  const roomId = chatHistoryQuery?.data?.data?.room_data?.room_id;
  const { socket, messages, setMessages } = useDisputeSocket(userId, roomId);

  // console.log(socket, '***m');

  const clientEmit = `send_support_dispute_message`;

  useEffect(() => {
    if (chatHistoryQuery.data?.data?.docs) {
      const historyMessages: IChatMsg[] = chatHistoryQuery.data.data.docs.map(msg => {
        return {
          _id: msg._id,
          sender_id: msg.sender_data._id,
          text: msg.text,
          chat_date: new Date(msg.chat_date),
          sender_type: msg.sender_type,
          chat_type: msg.chat_type,
          files: msg.files,
          sender_data: msg.sender_data,
        };
      });

      setMessages(historyMessages);
    }
  }, [chatHistoryQuery.data, setMessages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = (payload: IMessagePayload, uploadedFiles: IFileAttachment[]) => {
    const tempMessage = createTempMessage(
      userId,
      senderType,
      payload.text,
      uploadedFiles,
      userData
    );

    setMessages(prev => [...prev, tempMessage]);

    console.warn('***📤 Sending message1:', payload);
    socket?.emit(clientEmit, payload);
  };

  return (
    <Box className='cmnBoxInner'>
      <Typography variant='body1' className='topTitleTxt'>
        Action History
      </Typography>
      <Box className='wrapper_innerListAll'>
        <Box sx={{ mt: 2 }}>
          <Paper
            ref={chatContainerRef}
            elevation={0}
            sx={{
              height: '100%',
              maxHeight: '500px',
              overflowY: 'auto',
              p: 2,
              bgcolor: theme.palette.background.default,
            }}
          >
            {chatHistoryQuery.isLoading ? (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '100%',
                }}
              >
                <CircularProgress size={30} />
              </Box>
            ) : messages.length === 0 ? (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '100%',
                }}
              >
                <Typography variant='body2' color='text.secondary'>
                  No messages yet. Start the conversation!
                </Typography>
              </Box>
            ) : (
              messages.map(msg => (
                <ChatMessage key={msg._id} message={msg} isCurrentUser={msg.sender_id === userId} />
              ))
            )}
            <div ref={messagesEndRef} />
          </Paper>

          <ChatInput
            socket={socket}
            userId={userId}
            disputeId={disputeId}
            senderType={senderType}
            onSendMessage={handleSendMessage}
            disabled={!socket || !userId || chatHistoryQuery.isLoading}
          />
        </Box>
      </Box>
    </Box>
  );
}
