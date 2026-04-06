import { uploadFileApi } from '@/api/functions/videoSession.api';
import { IFileAttachment } from '@/typescript/types/chat.types';
import AttachIcon from '@/ui/Icons/AttachIcon';
import SendIcon from '@/ui/Icons/SendIcon';
import CloseIcon from '@mui/icons-material/Close';
import { Box, CircularProgress, IconButton, Stack, TextField, Typography } from '@mui/material';
import { useRef, useState } from 'react';

interface ChatMessageInputProps {
  onSendMessage: (text: string, files: IFileAttachment[]) => void;
  disabled?: boolean;
  isLoading?: boolean;
  placeholder?: string;
  maxRows?: number;
  allowFileUpload?: boolean;
  acceptedFileTypes?: string;
}

export default function ChatMessageInput({
  onSendMessage,
  disabled = false,
  isLoading = false,
  placeholder = 'Type Message',
  maxRows = 4,
  allowFileUpload = true,
  acceptedFileTypes = '*/*',
}: ChatMessageInputProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [messageText, setMessageText] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
    // Reset input to allow selecting the same file again
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSendMessage = async () => {
    if ((!messageText.trim() && !selectedFile) || disabled) return;

    setIsUploading(true);
    let uploadedFiles: IFileAttachment[] = [];

    try {
      if (selectedFile) {
        const formData = new FormData();
        formData.append('files', selectedFile);

        const uploadResponse = await uploadFileApi(formData);

        uploadedFiles = uploadResponse.data.map((fileData: any) => ({
          file: fileData.fileName,
          downloadUrl: fileData.downloadUrl,
          type: fileData.fileType,
          size: fileData.fileSize,
        }));
      }

      onSendMessage(messageText || 'Sent attachment', uploadedFiles);

      // Clear inputs after successful send
      setMessageText('');
      setSelectedFile(null);
    } catch (error) {
      console.error('❌ Error sending message:', error);
      // Keep the selected file and message on error so user can retry
    } finally {
      setIsUploading(false);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage();
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
  };

  const isDisabled = disabled || isUploading || isLoading;
  const canSend = !isDisabled && (messageText.trim() || selectedFile);

  return (
    <Box className='msg-footer'>
      {selectedFile && (
        <Box sx={{ mb: 1, p: 1, bgcolor: 'action.hover', borderRadius: 1 }}>
          <Stack direction='row' alignItems='center' justifyContent='space-between' spacing={1}>
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography
                variant='body2'
                sx={{
                  fontWeight: 500,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {selectedFile.name}
              </Typography>
              <Typography variant='caption' color='text.secondary'>
                {formatFileSize(selectedFile.size)}
              </Typography>
            </Box>
            <IconButton
              size='small'
              onClick={handleRemoveFile}
              disabled={isUploading}
              aria-label='remove file'
              sx={{ flexShrink: 0 }}
            >
              <CloseIcon fontSize='small' />
            </IconButton>
          </Stack>
        </Box>
      )}

      <Stack direction={'row'} alignItems={'center'} flexWrap={'wrap'} className='msg-stack'>
        <TextField
          className='text-field'
          placeholder={placeholder}
          value={messageText}
          onChange={e => setMessageText(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={isDisabled}
          multiline
          maxRows={maxRows}
        />
        {allowFileUpload && (
          <IconButton
            className='attack-button'
            aria-label='attach'
            disabled={isDisabled || !!selectedFile}
            onClick={() => fileInputRef.current?.click()}
          >
            <AttachIcon />
            <input
              ref={fileInputRef}
              type='file'
              title='Upload'
              hidden
              onChange={handleFileSelect}
              accept={acceptedFileTypes}
            />
          </IconButton>
        )}
        <IconButton
          className='send-button'
          aria-label='send'
          onClick={handleSendMessage}
          disabled={!canSend}
        >
          {isUploading ? <CircularProgress size={20} /> : <SendIcon />}
        </IconButton>
      </Stack>
    </Box>
  );
}
