import { downloadFile, formatFileSize } from '@/hooks/utils/messageUtils';
import { IFileAttachment } from '@/typescript/types/chat.types';

import DownloadIcon from '@mui/icons-material/Download';
import ImageIcon from '@mui/icons-material/Image';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import VideoFileIcon from '@mui/icons-material/VideoFile';
import { Box, IconButton, Paper, Stack, Typography, useTheme } from '@mui/material';

interface FileAttachmentProps {
  file: IFileAttachment;
  isCurrentUser: boolean;
}

export function FileAttachment({ file }: FileAttachmentProps) {
  const theme = useTheme();

  const getFileIcon = (type: string) => {
    if (type?.includes('pdf')) return <PictureAsPdfIcon />;
    if (type?.includes('image')) return <ImageIcon />;
    if (type?.includes('video')) return <VideoFileIcon />;
    return <InsertDriveFileIcon />;
  };

  const handleDownload = () => {
    const fileName = file.file;
    downloadFile(fileName);
  };

  // console.log(file, '***');

  return (
    <Paper
      elevation={0}
      sx={{
        p: 1.5,
        mt: 1,
        borderRadius: 1,
        border: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Stack direction='row' alignItems='center' spacing={1}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {getFileIcon(file.type)}
        </Box>

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
            {file?.file?.replace(/^\d+_/, '') || file.file}
          </Typography>
          <Typography variant='caption'>{formatFileSize(file.size)}</Typography>
        </Box>

        <IconButton size='small' onClick={handleDownload}>
          <DownloadIcon fontSize='small' />
        </IconButton>
      </Stack>
    </Paper>
  );
}
