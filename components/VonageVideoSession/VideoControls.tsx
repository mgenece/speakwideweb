// components/VideoControls.tsx
import ChatIcon from '@mui/icons-material/Chat';
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import PhoneIcon from '@mui/icons-material/Phone';
import VideocamIcon from '@mui/icons-material/Videocam';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';
import { Badge, Box, Fab, useMediaQuery, useTheme } from '@mui/material';
import React, { useCallback, useEffect, useRef, useState } from 'react';

interface VideoControlsProps {
  hasAudio: boolean;
  hasVideo: boolean;
  onToggleAudio: () => void;
  onToggleVideo: () => void;
  onDisconnect: () => void;
  toggleChat: () => void;
  unreadChatCount: number;
  isAudio: boolean;
}

export const VideoControls: React.FC<VideoControlsProps> = ({
  hasAudio,
  hasVideo,
  onToggleAudio,
  onToggleVideo,
  onDisconnect,
  toggleChat,
  unreadChatCount = 0,
  isAudio,
}) => {
  const theme = useTheme();
  const isXSmall = useMediaQuery(theme.breakpoints.down(480));

  // Auto-hide only (no SDK deps)
  const [isVisible, setIsVisible] = useState(true);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const controlsRef = useRef<HTMLDivElement>(null);

  const clearHideTimeout = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  const setHideTimeout = useCallback(() => {
    clearHideTimeout();
    timeoutRef.current = setTimeout(() => setIsVisible(false), 3000);
  }, [clearHideTimeout]);

  const showControls = useCallback(() => {
    setIsVisible(true);
    setHideTimeout();
  }, [setHideTimeout]);

  useEffect(() => {
    const handleMouseMove = () => showControls();

    const handleMouseEnter = () => {
      clearHideTimeout();
      setIsVisible(true);
    };
    const handleMouseLeave = () => setHideTimeout();

    document.addEventListener('mousemove', handleMouseMove);

    const el = controlsRef.current;
    if (el) {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    }

    setHideTimeout();

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      if (el) {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      }
      clearHideTimeout();
    };
  }, [showControls, setHideTimeout, clearHideTimeout]);

  return (
    <Box
      ref={controlsRef}
      sx={{
        position: 'fixed',
        bottom: { xs: 16, sm: 20, md: 24 },
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 1000,
        opacity: isVisible ? 1 : 0,
        visibility: isVisible ? 'visible' : 'hidden',
        transition: 'opacity 0.3s ease, visibility 0.3s ease',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          gap: { xs: 1, sm: 1.5, md: 2 },
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          borderRadius: { xs: 3, sm: 4, md: 5 },
          p: { xs: 1, sm: 1.5, md: 2 },
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
          maxWidth: { xs: '280px', sm: '320px', md: '380px' },
        }}
      >
        {/* Audio */}
        <Fab
          size={isXSmall ? 'small' : 'medium'}
          onClick={onToggleAudio}
          aria-label={hasAudio ? 'Mute audio' : 'Unmute audio'}
          sx={{
            backgroundColor: hasAudio ? '#F1E9FF' : '#8142E9',
            color: '#120248',
            width: { xs: 30, sm: 40, md: 40 },
            height: { xs: 30, sm: 40, md: 40 },
            minHeight: 'auto',
            '&:hover': { backgroundColor: hasAudio ? 'success.dark' : 'error.dark' },
          }}
        >
          {hasAudio ? (
            <MicIcon sx={{ fontSize: { xs: 18, sm: 20, md: 22 } }} />
          ) : (
            <MicOffIcon sx={{ fontSize: { xs: 18, sm: 20, md: 22 } }} />
          )}
        </Fab>

        {/* Video */}
        {!isAudio && (
          <Fab
            size={isXSmall ? 'small' : 'medium'}
            onClick={onToggleVideo}
            aria-label={hasVideo ? 'Turn off video' : 'Turn on video'}
            sx={{
              backgroundColor: hasAudio ? '#F1E9FF' : '#8142E9',
              color: '#120248',
              width: { xs: 30, sm: 40, md: 40 },
              height: { xs: 30, sm: 40, md: 40 },
              minHeight: 'auto',
              '&:hover': { backgroundColor: hasVideo ? 'warning.dark' : 'error.dark' },
            }}
          >
            {hasVideo ? (
              <VideocamIcon sx={{ fontSize: { xs: 18, sm: 20, md: 22 } }} />
            ) : (
              <VideocamOffIcon sx={{ fontSize: { xs: 18, sm: 20, md: 22 } }} />
            )}
          </Fab>
        )}

        {/* Chat with unread badge (over the Fab) */}
        <Box sx={{ position: 'relative', display: 'inline-flex', overflow: 'visible' }}>
          <Badge
            badgeContent={unreadChatCount}
            color='error'
            max={99}
            overlap='circular'
            invisible={unreadChatCount <= 0}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            slotProps={{
              badge: {
                sx: {
                  position: 'absolute',
                  zIndex: 5,
                  right: -6,
                  top: -6,
                  transform: 'none',
                  fontSize: { xs: '0.65rem', sm: '0.7rem' },
                  minWidth: { xs: 16, sm: 18 },
                  height: { xs: 16, sm: 18 },
                  lineHeight: 1,
                  pointerEvents: 'none',
                },
              },
            }}
            sx={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
          />
          <Fab
            size={isXSmall ? 'small' : 'medium'}
            onClick={toggleChat}
            aria-label='Toggle chat'
            sx={{
              backgroundColor: '#F1E9FF',
              color: '#120248',
              width: { xs: 30, sm: 40, md: 40 },
              height: { xs: 30, sm: 40, md: 40 },
              minHeight: 'auto',
              position: 'relative',
              overflow: 'visible',
              '&:hover': { backgroundColor: 'info.dark' },
              zIndex: 1,
            }}
          >
            <ChatIcon sx={{ fontSize: { xs: 18, sm: 20, md: 22 } }} />
          </Fab>
        </Box>

        {/* Disconnect */}
        <Fab
          size={isXSmall ? 'small' : 'medium'}
          onClick={onDisconnect}
          aria-label='Disconnect'
          sx={{
            backgroundColor: 'error.main',
            color: '#120248',
            width: { xs: 30, sm: 40, md: 40 },
            height: { xs: 30, sm: 40, md: 40 },
            minHeight: 'auto',
            '&:hover': { backgroundColor: 'error.dark' },
          }}
        >
          <PhoneIcon
            sx={{
              fontSize: { xs: 18, sm: 20, md: 22 },
              transform: 'rotate(135deg)',
            }}
          />
        </Fab>
      </Box>
    </Box>
  );
};
