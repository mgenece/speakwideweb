import { sharedFilesDetailsArray } from '@/json/mock/demo.mock';
import { SharedFileListStyled } from '@/styles/StyledComponents/SharedFileListStyled';
import BinIcon from '@/ui/Icons/BinIcon';
import CrossIcon2 from '@/ui/Icons/CrossIcon2';
import DocIcon from '@/ui/Icons/DocIcon';
import PdfIcon from '@/ui/Icons/PdfIcon';
import { Box, IconButton, Stack, Typography } from '@mui/material';

interface ISharedFileListProps {
  onClose: () => void;
}

export default function SharedFileList({ onClose }: ISharedFileListProps) {
  return (
    <SharedFileListStyled>
      <Stack
        direction={'row'}
        alignItems={'center'}
        justifyContent={'space-between'}
        flexWrap={'wrap'}
        className='heading-stack'
      >
        <Typography className='heading'>Shared Files</Typography>
        <IconButton
          disableRipple
          aria-label='modal-close-button'
          className='close-button'
          onClick={onClose}
        >
          <CrossIcon2 />
        </IconButton>
      </Stack>
      <Stack gap={'16px'} className='list-stack'>
        {sharedFilesDetailsArray.map((item, index) => (
          <Stack
            direction={'row'}
            alignItems={'center'}
            justifyContent={'space-between'}
            flexWrap={'wrap'}
            className='row-stack'
            key={index}
          >
            <Stack direction={'row'} flexWrap={'wrap'} spacing={'12px'} className='left-stack'>
              <i className='icon'>{item.type === 'pdf' ? <PdfIcon /> : <DocIcon />}</i>
              <Box>
                <Typography variant='body2'>{item?.fileName}</Typography>
                <Typography className='size'>{item?.size}</Typography>
              </Box>
            </Stack>
            <IconButton disableRipple aria-label='dlete-button' className='delete-btn'>
              <BinIcon />
            </IconButton>
          </Stack>
        ))}
      </Stack>
    </SharedFileListStyled>
  );
}
