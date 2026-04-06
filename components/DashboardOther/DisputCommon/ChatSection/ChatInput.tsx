import { uploadFileApi } from '@/api/functions/videoSession.api';
import { formatFileSize } from '@/hooks/utils/messageUtils';
import { IFileAttachment, IMessagePayload } from '@/typescript/types/chat.types';

import AttachFileIcon from '@mui/icons-material/AttachFile';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import {
  Box,
  Chip,
  CircularProgress,
  IconButton,
  Stack,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import { useRef, useState } from 'react';
import { Socket } from 'socket.io-client';

interface ChatInputProps {
  socket: Socket | null;
  userId: string;
  disputeId: string;
  senderType: 'client' | 'interpreter';
  onSendMessage: (payload: IMessagePayload, uploadedFiles: IFileAttachment[]) => void;
  disabled?: boolean;
}

export function ChatInput({
  socket,
  userId,
  disputeId,
  senderType,
  onSendMessage,
  disabled,
}: ChatInputProps) {
  const theme = useTheme();
  const [inputValue, setInputValue] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setSelectedFiles(prev => [...prev, ...Array.from(files)]);
    }
    // Reset input value to allow selecting the same file again
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleRemoveFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if ((!inputValue.trim() && selectedFiles.length === 0) || !socket || !userId) return;

    const messageText = inputValue.trim();
    let uploadedFiles: IFileAttachment[] = [];

    if (selectedFiles.length > 0) {
      setIsUploading(true);
      try {
        const formData = new FormData();
        selectedFiles.forEach(file => formData.append('files', file));

        const uploadResponse = await uploadFileApi(formData);

        // Map the response to FileAttachment format
        uploadedFiles = uploadResponse.data.map((fileData: any) => ({
          file: fileData.fileName,
          downloadUrl: fileData.downloadUrl,
          type: fileData.fileType,
          size: fileData.fileSize,
        }));

        console.warn('***Files uploaded:', uploadedFiles);
      } catch (error) {
        console.error('***File upload error:', error);
        setIsUploading(false);
        return;
      } finally {
        setIsUploading(false);
      }
    }

    // console.log(uploadedFiles, '***U1');

    const messagePayload: IMessagePayload = {
      sender_type: senderType,
      text: messageText || (uploadedFiles.length > 0 ? 'Sent attachments' : ''),
      chat_type: uploadedFiles.length > 0 ? 'file' : 'text',
      files: uploadedFiles,
    };

    if (senderType === 'client') {
      messagePayload.client_dispute_id = disputeId;
    } else {
      messagePayload.interpreter_dispute_id = disputeId;
    }

    onSendMessage(messagePayload, uploadedFiles);

    setInputValue('');
    setSelectedFiles([]);
  };

  return (
    <Box>
      {selectedFiles.length > 0 && (
        <Box sx={{ mb: 1, p: 1, bgcolor: theme.palette.grey[100], borderRadius: 1 }}>
          <Typography variant='caption' color='text.secondary' sx={{ display: 'block', mb: 1 }}>
            Selected files ({selectedFiles.length}):
          </Typography>
          <Stack direction='row' spacing={1} flexWrap='wrap' gap={1}>
            {selectedFiles.map((file, idx) => (
              <Chip
                key={idx}
                label={`${file.name} (${formatFileSize(file.size)})`}
                onDelete={() => handleRemoveFile(idx)}
                deleteIcon={<CloseIcon />}
                size='small'
                sx={{ maxWidth: '100%' }}
              />
            ))}
          </Stack>
        </Box>
      )}

      <form onSubmit={handleSubmit}>
        <Stack direction='row' spacing={1} alignItems='center'>
          <input
            ref={fileInputRef}
            type='file'
            hidden
            multiple
            onChange={handleFileSelect}
            accept='*/*'
          />

          <IconButton
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading || disabled}
            sx={{ color: theme.palette.primary.main }}
            title='Attach files'
          >
            <AttachFileIcon />
          </IconButton>

          <TextField
            fullWidth
            size='small'
            placeholder='Type your message...'
            value={inputValue}
            onChange={e => setInputValue(e.currentTarget.value)}
            disabled={disabled || isUploading}
            multiline
            maxRows={4}
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
          />

          <IconButton
            type='submit'
            color='primary'
            disabled={(!inputValue.trim() && selectedFiles.length === 0) || disabled || isUploading}
            sx={{
              bgcolor: theme.palette.primary.main,
              color: 'white',
              '&:hover': { bgcolor: theme.palette.primary.dark },
              '&:disabled': { bgcolor: theme.palette.action.disabledBackground },
            }}
            title='Send message'
          >
            {isUploading ? <CircularProgress size={24} color='inherit' /> : <SendIcon />}
          </IconButton>
        </Stack>
      </form>
    </Box>
  );
}
