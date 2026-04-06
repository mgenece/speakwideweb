import { IChatMsg } from '@/typescript/types/chat.types';

import { formatTimestamp } from '@/hooks/utils/messageUtils';
import { Box, Paper, Stack, Typography, useTheme } from '@mui/material';
import { FileAttachment } from './FileAttachment';

interface ChatMessageProps {
  message: IChatMsg;
  isCurrentUser: boolean;
}

export function ChatMessage({ message, isCurrentUser }: ChatMessageProps) {
  const theme = useTheme();
  const senderName = 'Admin';

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: isCurrentUser ? 'flex-end' : 'flex-start',
        mb: 2,
      }}
    >
      <Stack
        direction='row'
        spacing={1}
        sx={{
          maxWidth: '70%',
          alignItems: 'flex-start',
          flexDirection: isCurrentUser ? 'row-reverse' : 'row',
        }}
      >
        {!isCurrentUser && (
          <Box
            sx={{
              width: 32,
              height: 32,
              borderRadius: '50%',
              overflow: 'hidden',
              bgcolor:
                message.sender_type === 'admin'
                  ? theme.palette.error.main
                  : theme.palette.primary.main,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <Typography variant='caption' sx={{ color: 'white' }}>
              {senderName.charAt(0).toUpperCase()}
            </Typography>
          </Box>
        )}

        <Box sx={{ minWidth: 0 }}>
          <Paper
            elevation={0}
            sx={{
              p: 1.5,
              bgcolor: isCurrentUser ? theme.palette.primary.main : theme.palette.grey[200],
              color: isCurrentUser
                ? theme.palette.primary.contrastText
                : theme.palette.text.primary,
              borderRadius: 2,
            }}
          >
            {!isCurrentUser && (
              <Typography variant='caption' sx={{ fontWeight: 600, display: 'block', mb: 0.5 }}>
                {senderName}
              </Typography>
            )}

            {message.text && <Typography variant='body2'>{message.text}</Typography>}

            {message.files && message.files.length > 0 && (
              <Box sx={{ mt: message.text ? 1 : 0 }}>
                {message.files.map((file, idx) => (
                  <FileAttachment key={idx} file={file} isCurrentUser={isCurrentUser} />
                ))}
              </Box>
            )}
          </Paper>

          <Typography
            variant='caption'
            color='text.secondary'
            sx={{
              display: 'block',
              mt: 0.5,
              textAlign: isCurrentUser ? 'right' : 'left',
              px: 1,
            }}
          >
            {formatTimestamp(message.chat_date)}
            {message.seen_by && message.seen_by.length > 1 && isCurrentUser && <span> • Read</span>}
          </Typography>
        </Box>
      </Stack>
    </Box>
  );
}
