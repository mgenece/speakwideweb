import CrossIcon from '@/ui/Icons/CrossIcon';
import ImageIcon2 from '@/ui/Icons/ImageIcon2'; // Assuming this is your image icon
import { Download as DownloadIcon } from '@mui/icons-material';
import { Box, Button, IconButton, InputLabel, Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import FileUploadMultiple from './FileUploadMultiple'; // Your existing component

interface IExistingFile {
  url: string;
  filename: string;
}

interface IFileUploadMultipleEditProps {
  existingFiles: IExistingFile[];
  onChange: (data: { keepUrls: string[]; newFiles: File[] }) => void;
  supportedFileText?: string;
  maxFiles?: number;
  accept?: string;
  size?: number;
  error?: string;
}

// Download function (same as before)
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

export const FileUploadMultipleEdit: React.FC<IFileUploadMultipleEditProps> = ({
  existingFiles = [],
  onChange,
  supportedFileText = 'PNG, JPEG, PDF files only 2MB each',
  maxFiles = 5,
  accept = 'image/png, image/jpeg, image/jpg, application/pdf',
  size,
  error = '',
}) => {
  const [keptFiles, setKeptFiles] = useState<IExistingFile[]>(existingFiles);
  const [newFiles, setNewFiles] = useState<File[]>([]);

  // Get file icon based on file type
  const getFileIcon = (filename: string) => {
    const extension = filename?.toLowerCase().split('.').pop();
    if (['png', 'jpg', 'jpeg', 'gif', 'webp'].includes(extension || '')) {
      return <ImageIcon2 />;
    }
    // You can add more icon types here based on file extensions
    return <ImageIcon2 />; // Default to image icon
  };

  // Handle download
  const handleDownload = (url: string, filename: string) => {
    downloadFile(url, filename);
  };

  // Remove existing file
  const handleRemoveExistingFile = (urlToRemove: string) => {
    const updatedKeptFiles = keptFiles.filter(file => file.url !== urlToRemove);
    setKeptFiles(updatedKeptFiles);

    // Trigger onChange
    const keepUrls = updatedKeptFiles.map(f => f.url);
    onChange({ keepUrls, newFiles });
  };

  // Handle new files from FileUploadMultiple component
  const handleNewFilesChange = (files: File[]) => {
    const totalExistingFiles = keptFiles.length;
    const maxNewFiles = Math.max(0, maxFiles - totalExistingFiles);
    const limitedNewFiles = files.slice(0, maxNewFiles);

    setNewFiles(limitedNewFiles);

    // Trigger onChange
    const keepUrls = keptFiles.map(f => f.url);
    onChange({ keepUrls, newFiles: limitedNewFiles });
  };

  // Initialize kept files on mount
  useEffect(() => {
    setKeptFiles(existingFiles);
  }, [existingFiles]);

  const totalFiles = keptFiles.length + newFiles.length;

  return (
    <Box>
      <InputLabel>Drivers License / Identification Card</InputLabel>
      <Box className='grey-box'>
        {/* Existing Files Display */}
        {keptFiles.length > 0 && (
          <Stack
            direction={'row'}
            alignItems={'center'}
            flexWrap={'wrap'}
            className='file-list-stack'
            gap={'5px'}
            sx={{ mb: '8px' }}
          >
            {keptFiles.map(file => (
              <Stack
                key={file.url}
                direction={'row'}
                alignItems={'center'}
                flexWrap={'wrap'}
                spacing={'8px'}
                className='border-stack'
                sx={{
                  border: `1px solid rgb(217, 217, 217)`,
                  borderRadius: '50px',
                  py: '5px',
                  pl: '15px',
                }}
              >
                <i className='icon'>{getFileIcon(file.filename)}</i>
                <Typography variant='body2'>{file.filename}</Typography>
                <IconButton
                  size='small'
                  aria-label='download'
                  className='download-icon-btn'
                  onClick={() => handleDownload(file.url, file.filename)}
                  sx={{ p: 0.5 }}
                >
                  <DownloadIcon fontSize='small' />
                </IconButton>
                <Button
                  disableRipple
                  aria-label='remove'
                  className='cross-icon-btn'
                  onClick={() => handleRemoveExistingFile(file.url)}
                >
                  <CrossIcon />
                </Button>
              </Stack>
            ))}
          </Stack>
        )}

        {/* New File Upload Component */}

        <FileUploadMultiple
          supportedFileText={`${supportedFileText} (${maxFiles - totalFiles} slots remaining)`}
          maxFiles={maxFiles - keptFiles.length}
          accept={accept}
          onChange={handleNewFilesChange}
          size={size}
          error={error}
        />
      </Box>
    </Box>
  );
};
