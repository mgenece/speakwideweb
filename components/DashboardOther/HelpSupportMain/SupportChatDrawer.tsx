import { supportChatHistory } from '@/api/functions/dispute.api';
import { useInterpreterData, useUserData } from '@/hooks/react-query/useVisitor';
import { useSupportSocket } from '@/hooks/utils/useSupportSocket';
import { SupportDrawerStyled } from '@/styles/StyledComponents/SupportDrawerStyled';
import { IChatMsg, IFileAttachment } from '@/typescript/types/chat.types';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import {
  Avatar,
  Box,
  CircularProgress,
  IconButton,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';
import { stringAvatar } from '../ChatHistoryMain/ChatHistoryMain';
import { FileAttachment } from '../DisputCommon/ChatSection/FileAttachment';
import ChatMessageInput from './SupportChatInput';

interface SupportChatDrawerProps {
  open: boolean;
  onClose: () => void;
  roomId: string;
}

export default function SupportChatDrawer({ open, onClose, roomId }: SupportChatDrawerProps) {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.down('md'));
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { userData } = useUserData();
  const { interpreterData } = useInterpreterData();
  const userId = userData?._id || interpreterData?._id || '';
  const senderType = (userData ? 'client' : 'interpreter') as 'client' | 'interpreter';
  const currentUserName = userData?.full_name || interpreterData?.full_name || '';

  const chatHistoryQuery = useQuery({
    queryKey: ['support-chat-history', senderType, userId],
    queryFn: () => supportChatHistory(senderType),
    enabled: Boolean(senderType && userId && open),
    refetchOnMount: true,
  });

  // const chatInitiateQuery = useQuery({
  //   queryKey: ['chat-initiate'],
  //   queryFn: () => initiateChatApi('interpreter'),
  // });

  // const roomId = chatHistoryQuery?.data?.data?.room_data?.room_id;
  // console.log(userId, roomId, '***r');
  const { socket, messages, setMessages } = useSupportSocket(userId, roomId || '');

  const supportEmit = 'send_support_message';

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (chatHistoryQuery.data?.data?.docs) {
      const historyMessages: IChatMsg[] = chatHistoryQuery.data.data.docs.map(msg => ({
        _id: msg._id,
        sender_id: msg.sender_data._id,
        text: msg.text,
        chat_date: new Date(msg.chat_date),
        sender_type: msg.sender_type,
        chat_type: msg.chat_type,
        files: msg.files,
        sender_data: msg.sender_data,
      }));

      setMessages(historyMessages);
    }
  }, [chatHistoryQuery.data?.data?.docs?.length, setMessages]);

  const isLoading = chatHistoryQuery.isPending;

  const handleSendMessage = (text: string, files: IFileAttachment[]) => {
    if (!socket || !roomId) return;

    const payload = {
      room_id: roomId,
      text,
      sender_type: senderType,
      chat_type: files.length > 0 ? 'file' : 'text',
      files,
    };

    // console.log('📤 Sending support message:', payload);
    socket.emit(supportEmit, payload);
  };

  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  //   console.log(messages, '***m');

  return (
    <SupportDrawerStyled open={open} onClose={onClose} anchor='right'>
      <Stack
        direction={'row'}
        alignItems={'center'}
        justifyContent={'space-between'}
        flexWrap={'wrap'}
        className='head-stack'
      >
        <Stack direction={'row'} alignItems={'center'} flexWrap={'wrap'} spacing={'10px'}>
          {isMd && (
            <IconButton
              disableRipple
              onClick={onClose}
              aria-label='back-button'
              className='back-btn'
            >
              <ArrowBackIosIcon />
            </IconButton>
          )}
          <Typography className='drawer-title'>Support Chat</Typography>
        </Stack>
      </Stack>

      <Box className='main-body'>
        <Box className='msg-main-body'>
          {isLoading ? (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                minHeight: '300px',
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
                minHeight: '300px',
              }}
            >
              <Typography variant='body2' color='text.secondary'>
                No messages yet. Start the conversation!
              </Typography>
            </Box>
          ) : (
            <Stack spacing={'12px'}>
              {messages.map((msg, index) => {
                const isCurrentUser = msg.sender_id === userId;

                return (
                  <Stack
                    className={`msg-stack ${isCurrentUser ? 'sender' : ''}`}
                    direction={isCurrentUser ? 'row-reverse' : 'row'}
                    flexWrap={'wrap'}
                    gap={{ xl: '28px', xs: '10px' }}
                    key={msg._id || index}
                  >
                    {
                      <Avatar
                        {...stringAvatar(isCurrentUser ? currentUserName : 'Admin')}
                        className='avatar-class'
                      />
                    }

                    <Box className='message-box'>
                      <Box className='inner-box'>
                        <Typography className='msg-text'>{msg.text}</Typography>
                        {msg.files && msg.files.length > 0 && (
                          <Box sx={{ mt: msg.text ? 1 : 0 }}>
                            {msg.files.map((file, idx) => (
                              <FileAttachment key={idx} file={file} isCurrentUser={isCurrentUser} />
                            ))}
                          </Box>
                        )}
                      </Box>
                      <Stack
                        direction={isCurrentUser ? 'row-reverse' : 'row'}
                        alignItems={'center'}
                        flexWrap={'wrap'}
                        sx={{ pt: '6px' }}
                        gap={'6px'}
                      >
                        <Typography className='time'>{formatTime(msg.chat_date)}</Typography>
                      </Stack>
                    </Box>
                  </Stack>
                );
              })}
              <div ref={messagesEndRef} />
            </Stack>
          )}
        </Box>

        <ChatMessageInput
          onSendMessage={handleSendMessage}
          disabled={!socket}
          isLoading={isLoading}
          placeholder='Type Message'
          maxRows={4}
          allowFileUpload={true}
          acceptedFileTypes='*/*'
        />
      </Box>
    </SupportDrawerStyled>
  );
}
