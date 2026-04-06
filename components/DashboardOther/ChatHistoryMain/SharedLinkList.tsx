import { sharedLinksDetailsArray } from '@/json/mock/demo.mock';
import { SharedFileListStyled } from '@/styles/StyledComponents/SharedFileListStyled';
import BinIcon from '@/ui/Icons/BinIcon';
import CrossIcon2 from '@/ui/Icons/CrossIcon2';
import { Box, IconButton, Stack, Typography } from '@mui/material';

interface ISharedLinkListProps {
  onClose: () => void;
  className?: string;
}

export default function SharedLinkList({ onClose, className }: ISharedLinkListProps) {
  return (
    <SharedFileListStyled className={className}>
      <Stack
        direction={'row'}
        alignItems={'center'}
        justifyContent={'space-between'}
        flexWrap={'wrap'}
        className='heading-stack'
      >
        <Typography className='heading'>Shared Links</Typography>
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
        {sharedLinksDetailsArray.map((item, index) => (
          <Stack
            direction={'row'}
            alignItems={'center'}
            justifyContent={'space-between'}
            flexWrap={'wrap'}
            className='row-stack'
            key={index}
          >
            <Stack direction={'row'} flexWrap={'wrap'} spacing={'12px'} className='left-stack'>
              <i className='icon'>{item.icon}</i>
              <Box>
                <Typography variant='body2'>{item?.name}</Typography>
                <Typography className='size'>{item?.link}</Typography>
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
