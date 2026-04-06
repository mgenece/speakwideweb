import CrossIcon from '@/ui/Icons/CrossIcon';
import DocumentsIcon from '@/ui/Icons/DocumentsIcon';
import { Box, Button, IconButton, InputLabel, Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import FileExpiryDate from './FileExpiryDate';

// Import your download icon - you can use any download icon from your icon library
// import DownloadIcon from '@/ui/Icons/DownloadIcon';
// Or use Material-UI's download icon
import { Download as DownloadIcon } from '@mui/icons-material';
import { Dayjs } from 'dayjs';

interface IExistingFile {
  url: string;
  filename: string;
  expiryDate?: string; // ISO string
}

interface INewFileWithExpiry {
  file: File;
  expiryDate: string;
}

interface INewFileInput {
  id: number;
  file: File | null;
  expiryDate: Dayjs | null;
}

interface IFileExpiryDateEditProps {
  existingFiles?: IExistingFile[];
  onChange: (data: { keepUrls: string[]; newFiles: INewFileWithExpiry[] }) => void;
  supportedFileText?: string;
  errorText?: string;
  maxFiles?: number;
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

export const FileExpiryDateEdit: React.FC<IFileExpiryDateEditProps> = ({
  existingFiles = [],
  onChange,
  supportedFileText = 'PNG, JPEG, PDF files only 2MB',
  errorText = '',
  maxFiles = 5,
}) => {
  const [keptFiles, setKeptFiles] = useState<IExistingFile[]>(existingFiles);
  const [newFiles, setNewFiles] = useState<INewFileWithExpiry[]>([]);

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

  // Handle new files from FileExpiryDate component
  const handleNewFilesChange = (files: INewFileInput[]) => {
    const newFiles = files.map(item => ({
      file: item.file as File,
      expiryDate: item.expiryDate ? item.expiryDate?.toISOString() : '',
    }));
    setNewFiles(newFiles);

    // Trigger onChange
    const keepUrls = keptFiles.map(f => f.url);

    onChange({ keepUrls, newFiles: newFiles });
  };

  // Initialize kept files on mount
  useEffect(() => {
    setKeptFiles(existingFiles);
  }, [existingFiles]);

  const totalFiles = keptFiles.length + newFiles.length;

  return (
    <Box>
      <InputLabel>Upload & Attach Certificates / Documents</InputLabel>
      <Box className='grey-box'>
        {/* Existing Files Display */}
        {keptFiles.length > 0 && (
          <Stack
            direction={'row'}
            alignItems={'center'}
            flexWrap={'wrap'}
            gap={'5px'}
            sx={{
              mb: '8px',
            }}
          >
            {keptFiles.map(file => (
              <Stack
                key={file.url}
                direction={'row'}
                alignItems={'center'}
                flexWrap={'wrap'}
                spacing={'8px'}
                sx={{
                  border: `1px solid rgb(217, 217, 217)`,
                  borderRadius: '50px',
                  py: '5px',
                  pl: '15px',
                }}
              >
                <i className='icon'>
                  <DocumentsIcon IconWidth='20' IconHeight='20' />
                </i>
                <Typography variant='body2'>{file.filename}</Typography>
                {file.expiryDate && (
                  <Typography variant='caption' color='text.secondary'>
                    (Expires: {new Date(file.expiryDate).toLocaleDateString()})
                  </Typography>
                )}
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

        <FileExpiryDate
          onChange={handleNewFilesChange}
          supportedFileText={`${supportedFileText} (${maxFiles - totalFiles} slots remaining)`}
          errorText={errorText}
          maxFiles={maxFiles - keptFiles.length}
        />
      </Box>
    </Box>
  );
};
