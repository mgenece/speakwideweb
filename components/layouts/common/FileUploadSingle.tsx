/* eslint-disable @next/next/no-img-element */
import { maxFileSize } from '@/config/constants';
import { UploadFileStyled } from '@/styles/StyledComponents/UploadFileStyled';
import UploadIcon from '@/ui/Icons/UploadIcon';
import CloseIcon from '@mui/icons-material/Close';
import { Box, BoxProps, Button, IconButton, Typography } from '@mui/material';
import React, { useState } from 'react';

export interface IFileUpload extends Omit<BoxProps, 'onChange'> {
  supportedFileText: string;
  fileIcon?: React.ReactNode;
  buttonText?: string;
  accept?: string;
  onChange?: (file: File | null) => void;

  size?: number;
  error?: string;
}

const validateFileType = (fileType: string, accept: string) => {
  const allowedTypes = accept.split(',');
  const match = allowedTypes.some(item => fileType === item.trim());
  return match;
};

const validateFileSize = (fileSize: number, allowedSize: number) => {
  //   console.log(allowedSize, fileSize, '***');
  return allowedSize >= fileSize;
};

function FileUploadSingle({
  supportedFileText,
  fileIcon = <UploadIcon />,
  buttonText = 'Upload files',
  accept = 'image/png, image/jpeg',
  onChange,
  size = maxFileSize,

  sx,
  error,
  ...rest
}: IFileUpload) {
  const [selectedFile, setSelectedFile] = useState<File | null>();
  const [errorMsg, setErrorMsg] = useState('');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    if (!file) {
      return;
    }
    if (validateFileType(file.type, accept)) {
      if (validateFileSize(file.size, size)) {
        setErrorMsg('');
        setSelectedFile(file);
      } else {
        setErrorMsg('File size exceeded');
      }
    } else {
      setErrorMsg('File type not supported');
    }

    onChange?.(file);

    // Reset the input value to allow selecting the same file again
    event.target.value = '';
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    onChange?.(null);
  };

  const isImage = selectedFile?.type.startsWith('image/');

  if (selectedFile) {
    return (
      <Box
        width={'100%'}
        height={'148px'}
        sx={{
          border: '1px dashed #e9dbff',
          borderRadius: '10px',
          display: 'flex',
          justifyContent: 'center',
          p: '10px',
        }}
        {...rest}
      >
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            overflow: 'hidden',
            borderColor: 'grey.300',
          }}
        >
          {
            <img
              src={isImage ? URL.createObjectURL(selectedFile) : '/assets/icons/doc.png'}
              alt='Preview'
              style={{
                width: '100%',
                height: '100px',
                objectFit: 'contain',
                display: 'block',
              }}
            />
          }

          <IconButton
            onClick={handleRemoveFile}
            size='small'
            sx={{
              position: 'absolute',
              top: 0,
              right: 0,
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

          <Box
            sx={{
              pt: 0.5,
              textAlign: 'center',
            }}
          >
            <Typography variant='body2' noWrap>
              {selectedFile.name}
            </Typography>
          </Box>
        </Box>
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
        <input
          type='file'
          accept={accept}
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
      <p style={{ color: 'red', fontSize: '14px', marginInlineStart: '14px' }}>
        {errorMsg || error}
      </p>
    </UploadFileStyled>
  );
}

export default FileUploadSingle;
