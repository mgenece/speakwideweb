// components/ChatMessage.tsx
import { baseUrlMedia } from '@/api/endpoints';
import { useDownload } from '@/hooks/useDownload';
import { IChatMessage } from '@/typescript/interface/vonage.interface';
import DescriptionIcon from '@mui/icons-material/Description';
import GetAppIcon from '@mui/icons-material/GetApp';
import ImageIcon from '@mui/icons-material/Image';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import VideoFileIcon from '@mui/icons-material/VideoFile';
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Paper,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import React from 'react';

interface ChatMessageProps {
  message: IChatMessage;
  currentConnectionId?: string;
  username: string;
}

interface IFileData {
  fileName: string;
  fileSize: number;
  fileType: string;
  downloadUrl: string;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message, username }) => {
  const theme = useTheme();
  const isXSmall = useMediaQuery(theme.breakpoints.down(480));

  const isOwnMessage = message.username === username;
  const isSystemMessage = message.type === 'system';

  return (
    <Box
      sx={{
        mb: { xs: 1, sm: 2 },
        display: 'flex',
        justifyContent: isOwnMessage && !isSystemMessage ? 'flex-end' : 'flex-start',
      }}
      className={isOwnMessage ? 'ownMessage' : 'otehrMessage'}
    >
      <Paper
        elevation={isXSmall ? 0 : 1}
        sx={
          isOwnMessage
            ? {
                borderRadius: '0',
                width: '100%',
                boxShadow: 'none',
                backgroundColor: 'transparent',
                display: 'flex',
                flexDirection: 'row-reverse',
              }
            : {
                borderRadius: '0',
                width: '100%',
                boxShadow: 'none',
                backgroundColor: 'transparent',
                display: 'flex',
                flexDirection: 'row',
              }
        }
      >
        {/* Message Header */}
        <Box
          sx={{
            p: { xs: 1, sm: 1.5 },
            // maxWidth: { xs: '85%', sm: '80%', md: '70%' },
            // backgroundColor: isSystemMessage
            //   ? 'warning.50'
            //   : isOwnMessage
            //     ? 'primary.50'
            //     : 'background.paper',
            // borderLeft: isXSmall ? 'none' : 4,
            // borderLeftColor: isSystemMessage
            //   ? 'warning.main'
            //   : isOwnMessage
            //     ? 'primary.main'
            //     : 'grey.400',
            borderRadius: isXSmall ? 2 : 5,
            // ...(isXSmall && {
            // borderRadius:
            // isOwnMessage && !isSystemMessage ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
            // border: '1px solid',
            // borderColor: isOwnMessage && !isSystemMessage ? 'primary.200' : 'grey.200',
            // }),
          }}
          className='systemMsgOhtrr'
        >
          <Box
            sx={{ display: 'flex', alignItems: 'center', gap: 1, flex: 1, minWidth: 0 }}
            className='systemMsgRghtr'
          >
            {/* User Avatar (mobile only for non-system messages) */}
            {!isSystemMessage && (
              <Avatar
                sx={{
                  width: 24,
                  height: 24,
                  fontSize: '0.75rem',
                  backgroundColor: isOwnMessage ? 'primary.main' : 'grey.500',
                }}
              >
                {isOwnMessage ? 'Y' : message.username?.charAt(0)?.toUpperCase() || 'U'}
              </Avatar>
            )}

            <Typography
              variant={isXSmall ? 'caption' : 'caption'}
              sx={{
                fontWeight: 600,
                color: isSystemMessage ? 'warning.dark' : 'text.primary',
                fontSize: { xs: '0.7rem', sm: '0.75rem' },
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {isSystemMessage ? '🔔 ' : ''}
              {/* {isOwnMessage ? 'You' : message.username} */}
            </Typography>
          </Box>
        </Box>

        {/* Message Content */}
        <Stack
          direction='column'
          alignItems='flex-end'
          justifyContent='flex-end'
          width={'100%'}
          gap={'7px'}
        >
          {message.type === 'file' ? (
            <FileMessageContent fileData={message.fileData} isXSmall={isXSmall} />
          ) : (
            <Typography
              variant={isXSmall ? 'body2' : 'body2'}
              className={isOwnMessage ? 'ownerMsgMn' : 'outerMsgMn'}
              sx={{
                color: isSystemMessage ? 'warning.dark' : 'rgb(58, 58, 58)',
                lineHeight: 1.4,
                wordWrap: 'break-word',
                fontSize: { xs: '0.85rem', sm: '0.875rem' },
                mt: isXSmall && !isSystemMessage ? 0.5 : 0,
                width: '100%',
                backgroundColor: isOwnMessage ? 'rgb(129, 66, 233)' : 'common.white',
                display: 'flex',
                alignItems: 'center',
                padding: '18px 20px',
                borderRadius: '10px',
                border: isOwnMessage ? 0 : '1px solid #E5E5FF',
              }}
            >
              {message.message}
            </Typography>
          )}
          <Typography
            variant='caption'
            color='text.secondary'
            sx={{
              fontSize: { xs: '0.65rem', sm: '0.7rem' },
              flexShrink: 0,
            }}
            className='timignspn'
          >
            {message.timestamp.toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </Typography>
        </Stack>
      </Paper>
    </Box>
  );
};

// Enhanced File Message Sub-component with mobile support
const FileMessageContent: React.FC<{
  fileData?: IFileData;
  isXSmall?: boolean;
}> = ({ fileData, isXSmall = false }) => {
  const { downloadFile, isDownloading, error } = useDownload();

  const getFileIcon = (fileType?: string) => {
    const iconSize = isXSmall ? 16 : 20;
    if (!fileType) return <DescriptionIcon sx={{ fontSize: iconSize, color: 'text.secondary' }} />;

    const type = fileType.toLowerCase();

    // Images
    if (type.startsWith('image/')) {
      return <ImageIcon sx={{ fontSize: iconSize, color: 'success.main' }} />;
    }

    // Videos
    if (type.startsWith('video/')) {
      return <VideoFileIcon sx={{ fontSize: iconSize, color: 'info.main' }} />;
    }

    // PDF files
    if (type === 'application/pdf' || type.includes('pdf')) {
      return <PictureAsPdfIcon sx={{ fontSize: iconSize, color: 'error.main' }} />;
    }

    // Default to document icon for all other files
    return <DescriptionIcon sx={{ fontSize: iconSize, color: 'text.secondary' }} />;
  };

  const formatFileSize = (sizeInKB?: number) => {
    if (!sizeInKB || sizeInKB === 0) return '0 KB';

    if (sizeInKB < 1024) {
      return `${sizeInKB.toFixed(1)} KB`;
    } else if (sizeInKB < 1024 * 1024) {
      return `${(sizeInKB / 1024).toFixed(1)} MB`;
    } else {
      return `${(sizeInKB / (1024 * 1024)).toFixed(1)} GB`;
    }
  };

  const handleDownload = () => {
    if (fileData && !isDownloading) {
      downloadFile(
        `${baseUrlMedia}/${fileData.downloadUrl}/${fileData.fileName}`,
        fileData.fileName
      );
    }
  };

  if (!fileData) {
    return (
      <Box
        sx={{
          p: { xs: 1, sm: 2 },
          backgroundColor: 'error.50',
          borderRadius: 2,
          border: '1px solid',
          borderColor: 'error.200',
        }}
      >
        <Typography
          variant={isXSmall ? 'caption' : 'body2'}
          color='error.main'
          sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}
        >
          ❌ File data unavailable
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        p: { xs: 1, sm: 2 },
        width: '100%',
        backgroundColor: isXSmall ? 'grey.25' : 'grey.50',
        borderRadius: { xs: 2, sm: 3 },
        border: '1px solid',
        borderColor: 'grey.200',
        transition: 'all 0.2s ease',
        '&:hover': {
          backgroundColor: isDownloading ? (isXSmall ? 'grey.25' : 'grey.50') : 'grey.100',
          borderColor: isDownloading ? 'grey.200' : 'primary.300',
        },
        opacity: isDownloading ? 0.8 : 1,
      }}
    >
      {/* File Info Row */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: { xs: 1, sm: 1.5 },
          mb: { xs: 1, sm: 1.5 },
        }}
      >
        {/* File Icon */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: { xs: 28, sm: 32 },
            height: { xs: 28, sm: 32 },
            backgroundColor: 'background.paper',
            borderRadius: 1.5,
            border: '1px solid',
            borderColor: 'divider',
            flexShrink: 0,
          }}
        >
          {getFileIcon(fileData.fileType)}
        </Box>

        {/* File Details */}
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography
            variant={isXSmall ? 'caption' : 'body2'}
            sx={{
              fontWeight: 600,
              color: 'text.primary',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              maxWidth: '200px',
              mb: 0.25,
              fontSize: { xs: '0.8rem', sm: '0.875rem' },
              lineHeight: 1.2,
            }}
          >
            {fileData.fileName}
          </Typography>
          <Typography
            variant='caption'
            sx={{
              color: 'text.secondary',
              fontSize: { xs: '0.65rem', sm: '0.75rem' },
              display: 'block',
            }}
          >
            {formatFileSize(fileData.fileSize)}
            {fileData.fileType && !isXSmall && (
              <> • {fileData.fileType.split('/')[1]?.toUpperCase() || 'FILE'}</>
            )}
          </Typography>
        </Box>

        {/* Download Progress Indicator (mobile) */}
        {isDownloading && isXSmall && <CircularProgress size={16} thickness={4} />}
      </Box>

      {/* Error Display */}
      {error && (
        <Typography
          variant='caption'
          color='error'
          sx={{
            display: 'block',
            mb: 1,
            fontSize: { xs: '0.65rem', sm: '0.7rem' },
            p: { xs: 0.5, sm: 0 },
            backgroundColor: isXSmall ? 'error.50' : 'transparent',
            borderRadius: isXSmall ? 1 : 0,
          }}
        >
          ⚠️ {error}
        </Typography>
      )}

      {/* Download Button */}
      <Button
        variant={isXSmall ? 'contained' : 'outlined'}
        size='small'
        startIcon={
          isDownloading ? (
            <CircularProgress size={12} sx={{ color: 'inherit' }} />
          ) : (
            <GetAppIcon sx={{ fontSize: { xs: 14, sm: 16 } }} />
          )
        }
        onClick={handleDownload}
        disabled={isDownloading}
        fullWidth
        sx={{
          borderRadius: { xs: 1.5, sm: 2 },
          textTransform: 'none',
          fontSize: { xs: '0.7rem', sm: '0.8rem' },
          fontWeight: 500,
          py: { xs: 0.5, sm: 0.75 },
          minHeight: { xs: 32, sm: 36 },
          // Mobile styling
          ...(isXSmall && {
            backgroundColor: isDownloading ? 'grey.300' : 'primary.main',
            color: 'white',
            '&:hover': {
              backgroundColor: isDownloading ? 'grey.300' : 'primary.dark',
            },
            '&:disabled': {
              backgroundColor: 'grey.300',
              color: 'grey.500',
            },
          }),
          // Desktop styling
          ...(!isXSmall && {
            borderColor: isDownloading ? 'grey.300' : 'primary.300',
            color: isDownloading ? 'text.disabled' : 'primary.main',
            '&:hover': {
              borderColor: isDownloading ? 'grey.300' : 'primary.main',
              backgroundColor: isDownloading ? 'transparent' : 'primary.50',
            },
            '&:disabled': {
              borderColor: 'grey.300',
              color: 'text.disabled',
              backgroundColor: 'transparent',
            },
          }),
        }}
      >
        {isDownloading
          ? isXSmall
            ? 'Downloading...'
            : 'Downloading...'
          : isXSmall
            ? 'Download'
            : 'Download'}
      </Button>
    </Box>
  );
};
