/* eslint-disable @next/next/no-img-element */
import { maxFileSize } from '@/config/constants';
import { UploadFileStyled } from '@/styles/StyledComponents/UploadFileStyled';
import UploadIcon from '@/ui/Icons/UploadIcon';
import CloseIcon from '@mui/icons-material/Close';
import { Box, BoxProps, Button, Grid, IconButton, Typography } from '@mui/material';
import React, { useState } from 'react';

export interface IFileUpload extends Omit<BoxProps, 'onChange'> {
  supportedFileText: string;
  fileIcon?: React.ReactNode;
  buttonText?: string;
  accept?: string;
  onChange?: (files: File[]) => void;
  maxFiles?: number; // New prop for maximum number of files
  size?: number;
  error?: string;
}

const validateFileType = (fileType: string, accept: string) => {
  const allowedTypes = accept.split(',');
  const match = allowedTypes.some(item => fileType === item.trim());
  return match;
};

const validateFileSize = (fileSize: number, allowedSize: number) => {
  return allowedSize >= fileSize;
};

function FileUploadMultiple({
  supportedFileText,
  fileIcon = <UploadIcon />,
  buttonText = 'Upload files',
  accept = 'image/png, image/jpeg',
  onChange,
  maxFiles = 5, // Default maximum files
  size = maxFileSize,
  sx,
  error,
  ...rest
}: IFileUpload) {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [errorMsg, setErrorMsg] = useState('');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (files.length === 0) return;

    // Check if adding new files would exceed maxFiles limit
    if (selectedFiles.length + files.length > maxFiles) {
      setErrorMsg(`Maximum ${maxFiles} files allowed`);
      event.target.value = '';
      return;
    }

    const validFiles: File[] = [];
    let hasError = false;

    for (const file of files) {
      if (!validateFileType(file.type, accept)) {
        setErrorMsg(`File type not supported: ${file.name}`);
        hasError = true;
        break;
      }

      if (!validateFileSize(file.size, size)) {
        setErrorMsg(`File size exceeded: ${file.name}`);
        hasError = true;
        break;
      }

      validFiles.push(file);
    }

    if (!hasError) {
      setErrorMsg('');
      const updatedFiles = [...selectedFiles, ...validFiles];
      setSelectedFiles(updatedFiles);
      onChange?.(updatedFiles);
    }

    // Reset the input value to allow selecting the same files again
    event.target.value = '';
  };

  const handleRemoveFile = (indexToRemove: number) => {
    const updatedFiles = selectedFiles.filter((_, index) => index !== indexToRemove);
    setSelectedFiles(updatedFiles);
    onChange?.(updatedFiles);
  };

  const handleRemoveAllFiles = () => {
    setErrorMsg('');
    setSelectedFiles([]);
    onChange?.([]);
  };

  if (selectedFiles.length > 0) {
    return (
      <Box sx={{ width: '100%' }} {...rest}>
        {/* Header with file count and clear all button */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 2,
          }}
        >
          <Typography variant='body2'>
            {selectedFiles.length} of {maxFiles} files selected
          </Typography>
          <Button size='small' onClick={handleRemoveAllFiles} sx={{ textTransform: 'none' }}>
            Clear All
          </Button>
        </Box>

        {/* Files grid */}
        <Grid container spacing={2}>
          {selectedFiles.map((file, index) => {
            const isImage = file.type.startsWith('image/');

            return (
              <Grid item xs={12} sm={6} md={4} key={`${file.name}-${index}`}>
                <Box
                  sx={{
                    border: '1px dashed #e9dbff',
                    borderRadius: '10px',
                    p: 2,
                    position: 'relative',
                    height: 148,
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <Box
                    sx={{
                      flex: 1,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      overflow: 'hidden',
                    }}
                  >
                    <img
                      src={isImage ? URL.createObjectURL(file) : '/assets/icons/doc.png'}
                      alt='Preview'
                      style={{
                        maxWidth: '100%',
                        maxHeight: '80px',
                        objectFit: 'contain',
                      }}
                    />
                  </Box>

                  <IconButton
                    onClick={() => handleRemoveFile(index)}
                    size='small'
                    sx={{
                      position: 'absolute',
                      top: 4,
                      right: 4,
                      backgroundColor: 'rgba(0, 0, 0, 0.6)',
                      color: 'white',
                      width: 24,
                      height: 24,
                      '&:hover': {
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                      },
                    }}
                  >
                    <CloseIcon fontSize='small' />
                  </IconButton>

                  <Typography
                    variant='body2'
                    noWrap
                    sx={{
                      textAlign: 'center',
                      mt: 1,
                      fontSize: '0.75rem',
                    }}
                    title={file.name}
                  >
                    {file.name}
                  </Typography>
                </Box>
              </Grid>
            );
          })}

          {/* Add more files button if under limit */}
          {selectedFiles.length < maxFiles && (
            <Grid item xs={12} sm={6} md={4}>
              <Box
                sx={{
                  border: '2px dashed #e9dbff',
                  borderRadius: '10px',
                  height: 148,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Button
                  component='label'
                  variant='outlined'
                  startIcon={fileIcon}
                  sx={{
                    flexDirection: 'column',
                    height: '100%',
                    width: '100%',
                    textTransform: 'none',
                    border: 'none',
                    '&:hover': {
                      //   border: 'none',
                      backgroundColor: 'rgba(97, 42, 179, 0.527)',
                    },
                  }}
                >
                  <Typography variant='caption'>Add More</Typography>
                  <input
                    type='file'
                    accept={accept}
                    multiple
                    onChange={handleFileChange}
                    style={{
                      clip: 'rect(0 0 0 0)',
                      clipPath: 'inset(50%)',
                      height: 1,
                      overflow: 'hidden',
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      whiteSpace: 'nowrap',
                      width: 1,
                    }}
                  />
                </Button>
              </Box>
            </Grid>
          )}
        </Grid>

        {(errorMsg || error) && (
          <Typography sx={{ color: 'red', fontSize: '14px', mt: 1 }}>
            {errorMsg || error}
          </Typography>
        )}
      </Box>
    );
  }

  return (
    <UploadFileStyled sx={sx} {...rest}>
      <Button
        component='label'
        variant='contained'
        className='fileiconBtn'
        tabIndex={-1}
        startIcon={fileIcon}
        disableRipple
      >
        <Typography variant='caption' className='uplaodFileTxt'>
          {buttonText}
        </Typography>
        <Typography variant='caption' className='supportFileTxt'>
          {supportedFileText}
        </Typography>
        <Typography variant='caption' sx={{ opacity: 0.7, fontSize: '0.7rem' }}>
          (Max {maxFiles} files)
        </Typography>
        <input
          type='file'
          accept={accept}
          multiple
          onChange={handleFileChange}
          style={{
            clip: 'rect(0 0 0 0)',
            clipPath: 'inset(50%)',
            height: 1,
            overflow: 'hidden',
            position: 'absolute',
            bottom: 0,
            left: 0,
            whiteSpace: 'nowrap',
            width: 1,
          }}
        />
      </Button>
      {(errorMsg || error) && (
        <p style={{ color: 'red', fontSize: '14px', marginInlineStart: '14px' }}>
          {errorMsg || error}
        </p>
      )}
    </UploadFileStyled>
  );
}

export default FileUploadMultiple;
