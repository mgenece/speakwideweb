// components/chat/ChatPanel.tsx
import { IChatMessage } from '@/typescript/interface/vonage.interface';
import WavingHandIcon from '@mui/icons-material/WavingHand';
import { Box, Paper, Typography, useMediaQuery, useTheme } from '@mui/material';
import { keyframes } from '@mui/system';
import React, { useEffect } from 'react';
import { ChatHeader } from './ChatHeader';
import { ChatInput } from './ChatInput';
import { ChatMessage } from './ChatMessage';

const wave = keyframes`
  0%, 100% { transform: rotate(0deg); }
  25% { transform: rotate(-10deg); }
  75% { transform: rotate(10deg); }
`;

interface ChatPanelProps {
  messages: IChatMessage[];
  currentMessage: string;
  username: string;
  onMessageChange: (message: string) => void;
  onSendMessage: () => void;
  chatMessagesRef: React.RefObject<HTMLDivElement | null>;
  currentConnectionId?: string;
  onFileShare: (file: File) => void;
  isUploadingFile: boolean;
  onClose: () => void;
}

export const ChatPanel: React.FC<ChatPanelProps> = ({
  messages,
  currentMessage,
  username,
  onMessageChange,
  onSendMessage,
  chatMessagesRef,
  currentConnectionId,
  onFileShare,
  isUploadingFile,
  onClose,
}) => {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));

  // Scroll anchor at the end of the messages list
  const endRef = React.useRef<HTMLDivElement | null>(null);

  // Scroll to bottom on initial mount
  useEffect(() => {
    const id = requestAnimationFrame(() => {
      endRef.current?.scrollIntoView({ behavior: 'auto', block: 'end' });
    });
    return () => cancelAnimationFrame(id);
  }, []);

  // Scroll to bottom whenever a new message arrives
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [messages.length]);

  return (
    <Paper
      elevation={3}
      sx={{
        width: {
          xs: '100%', // Full width on mobile
          sm: '100%', // Full width on small tablets
        },
        padding: '20px',
        background: '#FBF8FF',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: { xs: 0, sm: 2 },
        overflow: 'hidden',
        boxShadow: 'none',
      }}
    >
      {/* Header with close button */}
      <ChatHeader messageCount={messages.length} username={username} onClose={onClose} />

      {/* Messages Container */}
      <Box
        ref={chatMessagesRef}
        sx={{
          flex: 1,
          p: { xs: 1, sm: 2 },
          overflowY: 'auto',
          backgroundColor: 'primary.light',
          position: 'relative',
          '&::-webkit-scrollbar': { width: { xs: 4, sm: 6 } },
          '&::-webkit-scrollbar-track': { backgroundColor: 'grey.100', borderRadius: 1 },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'grey.400',
            borderRadius: 1,
            '&:hover': { backgroundColor: 'grey.500' },
          },
        }}
      >
        {messages.length === 0 ? (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              textAlign: 'center',
              py: 4,
            }}
          >
            <WavingHandIcon
              sx={{
                fontSize: { xs: 48, sm: 64 },
                color: 'primary.main',
                mb: 2,
                animation: `${wave} 2s ease-in-out infinite`,
              }}
            />
            <Typography
              variant={isSmall ? 'h6' : 'h5'}
              component='h3'
              sx={{ color: 'text.primary', fontWeight: 600, mb: 1 }}
            >
              No messages yet
            </Typography>
            <Typography
              variant='body2'
              sx={{ color: 'text.secondary', maxWidth: 250, lineHeight: 1.5 }}
            >
              Start the conversation by sending a message or sharing a file!
            </Typography>
          </Box>
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 1, sm: 1.5 }, pb: 1 }}>
            {messages.map(message => (
              <ChatMessage
                key={message.id}
                message={message}
                currentConnectionId={currentConnectionId}
                username={username}
              />
            ))}
            {/* Scroll anchor to ensure we end up at the latest message */}
            <div ref={endRef} />
          </Box>
        )}

        {isUploadingFile && (
          <Box
            sx={{
              position: 'sticky',
              bottom: 0,
              left: 0,
              right: 0,
              backgroundColor: 'info.50',
              border: '1px solid',
              borderColor: 'info.200',
              borderRadius: 1,
              p: 1,
              mt: 1,
              display: 'flex',
              alignItems: 'center',
              gap: 1,
            }}
          >
            <Box
              sx={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                backgroundColor: 'info.main',
                animation: `${wave} 1s ease-in-out infinite`,
              }}
            />
            <Typography variant='caption' color='info.dark'>
              Uploading file...
            </Typography>
          </Box>
        )}
      </Box>

      {/* Input Section */}
      <ChatInput
        currentMessage={currentMessage}
        username={username}
        onMessageChange={onMessageChange}
        onSendMessage={onSendMessage}
        onFileShare={onFileShare}
        isUploading={isUploadingFile}
      />
    </Paper>
  );
};
