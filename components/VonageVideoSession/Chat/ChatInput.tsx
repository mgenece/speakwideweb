/* eslint-disable prettier/prettier */
// components/chat/ChatInput.tsx
import AttachFileIcon from '@mui/icons-material/AttachFile';
import CloseIcon from '@mui/icons-material/Close';
import DescriptionIcon from '@mui/icons-material/Description';
import ImageIcon from '@mui/icons-material/Image';
import SendIcon from '@mui/icons-material/Send';
import VideoFileIcon from '@mui/icons-material/VideoFile';
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  IconButton,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import React, { useRef, useState } from 'react';

interface ChatInputProps {
  currentMessage: string;
  username: string;
  onMessageChange: (message: string) => void;
  onSendMessage: () => void;
  onFileShare: (file: File) => void;
  isUploading: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({
  currentMessage,
  username,
  onMessageChange,
  onSendMessage,
  onFileShare,
  isUploading,
}) => {
  const theme = useTheme();
  const isXSmall = useMediaQuery(theme.breakpoints.down(480));

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSend();
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      event.target.value = '';
    }
  };

  const handleSend = () => {
    if (isUploading) return;

    if (selectedFile) {
      onFileShare(selectedFile);
      setSelectedFile(null);
    } else if (currentMessage.trim()) {
      onSendMessage();
    }
  };

  const handleRemoveFile = () => {
    if (!isUploading) {
      setSelectedFile(null);
    }
  };

  const getFileIcon = (fileType: string) => {
    const iconSize = isXSmall ? 18 : 20;
    if (fileType.startsWith('image/')) return <ImageIcon sx={{ fontSize: iconSize }} />;
    if (fileType.startsWith('video/')) return <VideoFileIcon sx={{ fontSize: iconSize }} />;
    return <DescriptionIcon sx={{ fontSize: iconSize }} />;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  const isUsernameValid = username.trim();
  const hasContent = (currentMessage.trim() || selectedFile) && isUsernameValid;

  return (
    <Box
      sx={{
        p: { xs: 1.5, sm: 2 },
        // borderTop: '1px solid',
        // borderColor: 'divider',
        backgroundColor: 'primary.light',
        borderRadius: { xs: 0, sm: '0 0 8px 8px' },
        // Mobile specific adjustments
        ...(isXSmall && {
          position: 'sticky',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 10,
          boxShadow: '0 -2px 10px rgba(0,0,0,0.1)',
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
        }),
      }}
    >
      {/* File Preview */}
      {selectedFile && (
        <Box
          sx={{
            mb: 2,
            p: { xs: 1, sm: 1.5 },
            backgroundColor: isUploading ? 'action.hover' : 'primary.50',
            borderRadius: 2,
            border: '1px solid',
            borderColor: isUploading ? 'divider' : 'primary.200',
            opacity: isUploading ? 0.7 : 1,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: { xs: 1, sm: 1.5 },
                flex: 1,
                minWidth: 0,
              }}
            >
              {isUploading ? (
                <CircularProgress size={isXSmall ? 16 : 20} sx={{ color: 'primary.main' }} />
              ) : (
                getFileIcon(selectedFile.type)
              )}
              <Box
                sx={{
                  minWidth: 0,
                  flex: 1,
                }}
              >
                <Typography
                  variant={isXSmall ? 'caption' : 'body2'}
                  sx={{
                    fontWeight: 600,
                    color: isUploading ? 'text.secondary' : 'primary.main',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    fontSize: { xs: '0.8rem', sm: '0.875rem' },
                  }}
                >
                  {selectedFile.name}
                </Typography>
                <Typography
                  variant='caption'
                  color='text.secondary'
                  sx={{
                    fontSize: { xs: '0.7rem', sm: '0.75rem' },
                  }}
                >
                  {formatFileSize(selectedFile.size)} •{' '}
                  {selectedFile.type?.split('/')[1]?.toUpperCase() || 'FILE'}
                </Typography>
              </Box>
            </Box>

            <IconButton
              size='small'
              onClick={handleRemoveFile}
              disabled={isUploading}
              sx={{
                color: 'error.main',
                flexShrink: 0,
                p: { xs: 0.5, sm: 1 },
                '&:hover': {
                  backgroundColor: 'error.50',
                },
                '&:disabled': {
                  color: 'action.disabled',
                },
              }}
            >
              <CloseIcon sx={{ fontSize: { xs: 16, sm: 18 } }} />
            </IconButton>
          </Box>

          {/* Status Chip */}
          <Box sx={{ mt: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
            <Chip
              label={isUploading ? (isXSmall ? 'Uploading...' : 'Uploading...') : 'Ready to send'}
              size='small'
              color={isUploading ? 'default' : 'success'}
              sx={{
                fontSize: { xs: '0.7rem', sm: '0.75rem' },
                height: { xs: 20, sm: 24 },
                ...(isUploading && {
                  '& .MuiChip-label': {
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.5,
                  },
                }),
              }}
              icon={
                isUploading ? (
                  <CircularProgress size={10} sx={{ color: 'inherit !important' }} />
                ) : undefined
              }
            />

            {isUploading && !isXSmall && (
              <Typography variant='caption' color='text.secondary' sx={{ fontSize: '0.7rem' }}>
                Please wait...
              </Typography>
            )}
          </Box>
        </Box>
      )}

      {/* Input Area */}
      <Box
        sx={{
          display: 'flex',
          gap: { xs: 0.5, sm: 1 },
          alignItems: 'center',
          flexDirection: { xs: 'row', sm: 'row' },
          border: '1px solid #EDE1FF',
          backgroundColor: 'common.white',
          borderRadius: '10px',
          padding: '10px 13px',
        }}
      >
        {/* Mobile: Full width input area */}
        {isXSmall ? (
          <Box sx={{ display: 'flex', gap: 0.5, width: '100%', mb: 1 }}>
            {/* File Upload Button */}
            <IconButton
              onClick={() => fileInputRef.current?.click()}
              disabled={!isUsernameValid || isUploading}
              sx={{
                backgroundColor: isUsernameValid && !isUploading ? 'grey.600' : 'grey.300',
                color: 'white',
                width: 36,
                height: 36,
                '&:hover': {
                  backgroundColor: isUsernameValid && !isUploading ? 'grey.700' : 'grey.300',
                },
                '&:disabled': {
                  backgroundColor: 'grey.300',
                  color: 'grey.500',
                },
              }}
            >
              <AttachFileIcon sx={{ fontSize: 18 }} />
            </IconButton>

            {/* Message Input */}
            <TextField
              fullWidth
              variant='outlined'
              placeholder={selectedFile ? 'Add message...' : 'Type message...'}
              value={currentMessage}
              onChange={e => onMessageChange(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={!isUsernameValid || isUploading}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 3,
                  backgroundColor: isUsernameValid && !isUploading ? 'white' : 'grey.100',
                  fontSize: '0.9rem',
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: isUploading ? 'divider' : 'primary.main',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: isUploading ? 'divider' : 'primary.main',
                    borderWidth: 2,
                  },
                },
                '& .MuiOutlinedInput-input': {
                  py: 1.2,
                },
              }}
              className='messageInput'
            />
          </Box>
        ) : (
          /* Desktop/Tablet: Horizontal layout */
          <>
            {/* File Upload Button */}
            <IconButton
              onClick={() => fileInputRef.current?.click()}
              disabled={!isUsernameValid || isUploading}
              sx={{
                // backgroundColor: isUsernameValid && !isUploading ? 'grey.600' : 'grey.300',
                // color: 'white',
                // width: { xs: 36, sm: 40 },
                // height: { xs: 36, sm: 40 },
                // '&:hover': {
                //   backgroundColor: isUsernameValid && !isUploading ? 'grey.700' : 'grey.300',
                // },
                // '&:disabled': {
                //   backgroundColor: 'grey.300',
                //   color: 'grey.500',
                // },
                backgroundColor: 'transparent',
                padding: '0px',
              }}
              title={
                !isUsernameValid
                  ? 'Enter username to share files'
                  : isUploading
                    ? 'Upload in progress'
                    : 'Share file'
              }
            >
              <AttachFileIcon sx={{ fontSize: { xs: 18, sm: 20 } }} />
            </IconButton>

            {/* Message Input */}
            <TextField
              fullWidth
              variant='outlined'
              placeholder={selectedFile ? 'Add a message (optional)' : `Type a message...`}
              value={currentMessage}
              onChange={e => onMessageChange(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={!isUsernameValid || isUploading}
              className='messageInput'
              sx={{
                '&.MuiOutlinedInput-root': {
                  borderRadius: { xs: 3, sm: 4 },
                  backgroundColor: isUsernameValid && !isUploading ? 'white' : 'grey.100',
                  fontSize: { xs: '0.9rem', sm: '1rem' },

                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: isUploading ? 'divider' : 'primary.main',
                    border: 'none',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: isUploading ? 'divider' : 'primary.main',
                    borderWidth: 2,
                    border: 'none',
                  },
                  '&.MuiOutlinedInput-notchedOutline': {
                    border: 'none',
                  },
                },
                '& .MuiOutlinedInput-input': {
                  // py: { xs: 1.2, sm: 1.5 },
                  border: 'none',
                  padding: '0 10px',
                },
              }}
            />
          </>
        )}

        {/* Hidden File Input */}
        <input
          ref={fileInputRef}
          type='file'
          onChange={handleFileSelect}
          style={{ display: 'none' }}
          accept='*/*'
          disabled={!isUsernameValid || isUploading}
        />

        {/* Send Button */}
        <Button
          variant='contained'
          onClick={handleSend}
          disabled={!hasContent || isUploading}
          sx={{
            width: { xs: 30, sm: 30 },
            minWidth: '30px',
            height: { xs: 30, sm: 30 },
            borderRadius: '10px',
            fontSize: { xs: '0.8rem', sm: '0.875rem' },
            fontWeight: 600,
            padding: '0',
            backgroundColor: hasContent && !isUploading ? 'primary.main' : 'primary.main',
            '&:hover': {
              backgroundColor: hasContent && !isUploading ? 'primary.dark' : 'grey.300',
            },
            // '&:disabled': {
            //   backgroundColor: 'grey.300',
            //   color: 'grey.500',
            // },
          }}
        >
          {isUploading ? (
            <CircularProgress size={14} sx={{ color: 'inherit' }} />
          ) : (
            <SendIcon sx={{ fontSize: { xs: 16, sm: 18 }, color: theme.palette.common?.white }} />
          )}
          {/* {isUploading ? (isXSmall ? 'Uploading...' : 'Uploading') : 'Send'} */}
        </Button>
      </Box>

      {/* Helper Text */}
      {!isUsernameValid && (
        <Typography
          variant='caption'
          color='error'
          sx={{
            display: 'block',
            textAlign: 'center',
            mt: 1,
            fontSize: { xs: '0.7rem', sm: '0.75rem' },
          }}
        >
          Enter a username to start chatting and sharing files
        </Typography>
      )}

      {/* File Info Helper */}
      {isUsernameValid && !selectedFile && !isUploading && !isXSmall && (
        <Typography
          variant='caption'
          color='text.secondary'
          sx={{
            display: 'block',
            textAlign: 'center',
            mt: 1,
            fontSize: '0.75rem',
          }}
        >
          Click 📎 to attach files • Press Enter to send messages
        </Typography>
      )}

      {/* Upload Progress Helper */}
      {isUploading && (
        <Typography
          variant='caption'
          color='primary'
          sx={{
            display: 'block',
            textAlign: 'center',
            mt: 1,
            fontWeight: 500,
            fontSize: { xs: '0.7rem', sm: '0.75rem' },
          }}
        >
          🔄 Upload in progress...{!isXSmall && " Please don't close this window"}
        </Typography>
      )}
    </Box>
  );
};
