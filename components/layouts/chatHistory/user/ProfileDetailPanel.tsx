// components/DashboardOther/ChatHistoryMain/RightChatPanel.tsx
import assest from '@/json/assest';
import { sharedFilesArray, sharedLinksArray } from '@/json/mock/demo.mock';
import CustomButtonPrimary from '@/ui/CustomButtons/CustomButtonPrimary';
import CrossIcon from '@/ui/Icons/CrossIcon';
import EmailIcon from '@/ui/Icons/EmailIcon';
import FileIcon from '@/ui/Icons/FileIcon';
import LanguageIcon from '@/ui/Icons/LanguageIcon';
import PhoneIcon from '@/ui/Icons/PhoneIcon';
import { Box, IconButton, Stack, Typography } from '@mui/material';
import Image from 'next/image';

interface ProfileDetailPanelProps {
  isOpen?: boolean;
  onClose?: () => void;
  onOpenSharedFiles?: () => void;
  onOpenSharedLinks?: () => void;
}

function ProfileDetailPanel({
  isOpen,
  onClose,
  onOpenSharedFiles,
  onOpenSharedLinks,
}: ProfileDetailPanelProps) {
  return (
    <Box className={`right-box ${isOpen ? 'open' : ''}`}>
      <Box className='top-box'>
        <IconButton
          disableRipple
          aria-label='close-button'
          className='cross-info-btn'
          onClick={onClose}
        >
          <CrossIcon />
        </IconButton>

        <Box className='header-box'>
          <figure className='user-fig'>
            <Image src={assest.avatarImg} width={500} height={500} alt='user-image' />
          </figure>
          <Typography className='user-name'>John Williams</Typography>
        </Box>
        <Stack spacing={'8px'} className='info-box'>
          <Stack direction={'row'} alignItems={'center'} flexWrap={'wrap'} spacing={'10px'}>
            <i className='icon'>
              <EmailIcon />
            </i>
            <Typography className='value' variant='body2'>
              john.doe@gmail.com
            </Typography>
          </Stack>
          <Stack direction={'row'} alignItems={'center'} flexWrap={'wrap'} spacing={'10px'}>
            <i className='icon'>
              <PhoneIcon />
            </i>
            <Typography className='value' variant='body2'>
              +56 231456789
            </Typography>
          </Stack>
          <Stack direction={'row'} alignItems={'center'} flexWrap={'wrap'} spacing={'10px'}>
            <i className='icon'>
              <LanguageIcon />
            </i>
            <Typography className='value language' variant='body2'>
              <span>Speaks: </span>English, Spanish, Turkish
            </Typography>
          </Stack>
        </Stack>
      </Box>

      <Box className='shared-box'>
        <Box className='common-box'>
          <Stack
            direction={'row'}
            alignItems={'center'}
            justifyContent={'space-between'}
            flexWrap={'wrap'}
            className='header-box'
          >
            <Typography className='title' variant='body2'>
              Shared Files
            </Typography>
            <CustomButtonPrimary
              disableRipple
              className='see-link'
              aria-label='see-all'
              onClick={onOpenSharedFiles}
            >
              See all
            </CustomButtonPrimary>
          </Stack>
          <Box className='body-box'>
            <Stack spacing={'16px'} className='main-stack'>
              {sharedFilesArray?.map((item, index) => (
                <Stack
                  direction={'row'}
                  alignItems={'center'}
                  flexWrap={'wrap'}
                  className='file-stack'
                  spacing={'10px'}
                  key={index}
                >
                  <i className='icon'>
                    <FileIcon />
                  </i>
                  <Typography className='value' variant='body2'>
                    {item?.fileName}
                  </Typography>
                </Stack>
              ))}
            </Stack>
          </Box>
        </Box>
      </Box>

      <Box className='shared-box'>
        <Box className='common-box'>
          <Stack
            direction={'row'}
            alignItems={'center'}
            justifyContent={'space-between'}
            flexWrap={'wrap'}
            className='header-box'
          >
            <Typography className='title' variant='body2'>
              Shared Links
            </Typography>
            <CustomButtonPrimary
              aria-label='see-all'
              className='see-link'
              onClick={onOpenSharedLinks}
            >
              See all
            </CustomButtonPrimary>
          </Stack>
          <Box className='body-box link-box'>
            <Stack spacing={'16px'} className='main-stack'>
              {sharedLinksArray?.map((item, index) => (
                <Stack
                  direction={'row'}
                  alignItems={'center'}
                  flexWrap={'wrap'}
                  className='file-stack'
                  spacing={'10px'}
                  key={index}
                >
                  <i className='icon'>{item.icon}</i>
                  <Box className='right-part'>
                    <Typography className='value' variant='body2'>
                      {item?.name}
                    </Typography>
                    <Typography className='link' variant='body2'>
                      {item?.link}
                    </Typography>
                  </Box>
                </Stack>
              ))}
            </Stack>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default ProfileDetailPanel;
