// components/chat/ChatHeader.tsx - With Close Button
import ChatIcon from '@mui/icons-material/Chat';
import CloseIcon from '@mui/icons-material/Close';
import { Avatar, Box, IconButton, Typography, useMediaQuery, useTheme } from '@mui/material';
import React from 'react';

interface ChatHeaderProps {
  messageCount: number;
  username: string;
  onClose?: () => void; // NEW: Close function
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({ username, onClose }) => {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      sx={{
        p: { xs: 2, sm: 2.5 },
        backgroundColor: 'customColors.colorEBDFFF',
        color: 'primary.contrastText',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: '10px 10px 0 0',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flex: 1 }}>
        <Avatar
          sx={{
            width: { xs: 32, sm: 40 },
            height: { xs: 32, sm: 40 },
            backgroundColor: 'primary.main',
          }}
        >
          <ChatIcon sx={{ fontSize: { xs: 18, sm: 22 } }} />
        </Avatar>

        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography
            variant={isSmall ? 'subtitle1' : 'h6'}
            component='h2'
            sx={{
              fontWeight: 700,
              fontSize: { xs: '1rem', sm: '1.15rem' },
              lineHeight: 1.2,
              color: 'text.primary',
            }}
          >
            Chat
          </Typography>

          <Typography
            variant='caption'
            sx={{
              opacity: 0.9,
              fontSize: { xs: '0.75rem', sm: '0.8rem' },
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              display: 'block',
              color: 'grey.A700',
            }}
          >
            Chatting as: <strong>{username || 'Anonymous'}</strong>
          </Typography>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        {/* Close button - always show */}
        {onClose && (
          <IconButton
            onClick={onClose}
            sx={{
              color: 'primary.main',
              p: 0.5,
              '&:hover': {
                backgroundColor: 'primary.dark',
              },
            }}
          >
            <CloseIcon sx={{ fontSize: 20 }} />
          </IconButton>
        )}
      </Box>
    </Box>
  );
};
