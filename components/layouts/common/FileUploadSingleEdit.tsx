import CrossIcon from '@/ui/Icons/CrossIcon';
import ImageIcon2 from '@/ui/Icons/ImageIcon2';
import { Download as DownloadIcon } from '@mui/icons-material';
import { Box, BoxProps, IconButton, Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import FileUploadSingle from './FileUploadSingle'; // Your existing component

interface IExistingFile {
  url: string;
  filename: string;
}

export interface IFileUploadSingleEdit extends Omit<BoxProps, 'onChange'> {
  existingFile?: IExistingFile;
  supportedFileText: string;
  fileIcon?: React.ReactNode;
  buttonText?: string;
  accept?: string;
  onChange?: (data: { keepUrl: string | null; newFile: File | null }) => void;
  size?: number;
  error?: string;
}

// Download function
export async function downloadFile(url: string, filename?: string) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch file');

    const blob = await response.blob();
    const blobUrl = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = blobUrl;
    a.download = filename || url.split('/').pop() || 'download';

    document.body.appendChild(a);
    a.click();
    a.remove();

    // Clean up
    window.URL.revokeObjectURL(blobUrl);
  } catch (error) {
    console.error('Download failed:', error);
  }
}

// Get file icon based on file type
const getFileIcon = (filename: string) => {
  const extension = filename?.toLowerCase().split('.').pop();
  if (['png', 'jpg', 'jpeg', 'gif', 'webp'].includes(extension || '')) {
    return <ImageIcon2 />;
  }
  // Add more icon types here based on file extensions
  return <ImageIcon2 />; // Default to image icon
};

function FileUploadSingleEdit({
  existingFile,
  supportedFileText,
  fileIcon,
  buttonText = 'Upload file',
  accept = 'image/png, image/jpeg',
  onChange,
  size,
  sx,
  error,
  ...rest
}: IFileUploadSingleEdit) {
  const [keptFile, setKeptFile] = useState<IExistingFile | null>(existingFile || null);
  const [newFile, setNewFile] = useState<File | null>(null);

  // Initialize kept file on mount or when existingFile changes
  useEffect(() => {
    setKeptFile(existingFile || null);
  }, [existingFile]);

  // Handle download
  const handleDownload = (url: string, filename: string) => {
    downloadFile(url, filename);
  };

  // Remove existing file
  const handleRemoveExistingFile = () => {
    setKeptFile(null);
    onChange?.({ keepUrl: null, newFile });
  };

  // Handle new file selection
  const handleNewFileChange = (file: File | null) => {
    setNewFile(file);
    onChange?.({ keepUrl: keptFile?.url || null, newFile: file });
  };

  // If there's an existing file being kept and no new file selected
  if (keptFile?.filename && !newFile) {
    return (
      <Box sx={sx} {...rest}>
        <Stack
          direction={'row'}
          alignItems={'center'}
          spacing={'8px'}
          sx={{
            border: `1px dashed #e9dbff`,
            borderRadius: '10px',
            py: '10px',
            px: '15px',
            backgroundColor: '#fafafa',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>{getFileIcon(keptFile.filename)}</Box>

          <Typography variant='body2' sx={{ flex: 1, minWidth: 0 }} noWrap>
            {keptFile.filename}
          </Typography>

          <IconButton
            size='small'
            aria-label='download'
            onClick={() => handleDownload(keptFile.url, keptFile.filename)}
            sx={{ p: 0.5 }}
          >
            <DownloadIcon fontSize='small' />
          </IconButton>

          <IconButton
            size='small'
            aria-label='remove'
            onClick={handleRemoveExistingFile}
            sx={{ p: 0.5 }}
          >
            <CrossIcon />
          </IconButton>
        </Stack>

        {error && (
          <Typography variant='caption' sx={{ color: 'red', fontSize: '14px', ml: '14px', mt: 1 }}>
            {error}
          </Typography>
        )}
      </Box>
    );
  }

  // Show the regular upload component when no existing file or when existing file is removed
  return (
    <FileUploadSingle
      supportedFileText={supportedFileText}
      fileIcon={fileIcon}
      buttonText={buttonText}
      accept={accept}
      onChange={handleNewFileChange}
      size={size}
      sx={sx}
      error={error}
      {...rest}
    />
  );
}

export default FileUploadSingleEdit;
