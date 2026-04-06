import { initiateChatApi } from '@/api/functions/dispute.api';
import { useUserData } from '@/hooks/react-query/useVisitor';
import assest from '@/json/assest';
import { manrope } from '@/mui-theme/_muiTheme';
import { HelpOptionsStyled } from '@/styles/StyledComponents/HelpOptionsStyled';
import { HelpSupportMainStyled } from '@/styles/StyledComponents/HelpSupportMainStyled';
import CustomButtonPrimary from '@/ui/CustomButtons/CustomButtonPrimary';
import ArrowrightIcon from '@/ui/Icons/ArrowrightIcon';
import ChatIcon from '@/ui/Icons/ChatIcon';
import CrossIcon from '@/ui/Icons/CrossIcon';
import EmailIcon from '@/ui/Icons/EmailIcon';
import PhoneIcon2 from '@/ui/Icons/PhoneIcon2';
import MuiModalWrapper from '@/ui/Modal/MuiModalWrapper';
import { Box, Button, IconButton, Stack, Typography } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import Image from 'next/image';
import { useState } from 'react';
import SupportChatDrawer from './SupportChatDrawer';

export default function HelpSupportMain() {
  const { userData } = useUserData();

  const senderType = (userData ? 'client' : 'interpreter') as 'client' | 'interpreter';

  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);
  const [isChatDrawerOpen, setIsChatDrawerOpen] = useState(false);

  const initiateChatMutation = useMutation({ mutationFn: initiateChatApi });

  const handleToggleOptionModal = () => {
    initiateChatMutation.mutate(senderType);
    setIsOptionModalOpen(!isOptionModalOpen);
  };

  const handleToggleChatDrawer = () => {
    setIsChatDrawerOpen(!isChatDrawerOpen);
  };

  // console.log(initiateChatMutation.data?.data?.room_id, '***');

  return (
    <HelpSupportMainStyled>
      <Box className='bordered-box'>
        <Stack
          className='inner-main-box'
          direction={{ md: 'row', xs: 'column' }}
          alignItems={'center'}
          justifyContent={{ md: 'space-between', xs: 'center' }}
          flexWrap={'wrap'}
        >
          <Box className='left-box'>
            <Typography variant='h1' className='heading'>
              Help & Support
            </Typography>
            <Typography variant='body1' className='content'>
              Get instant support from our team. We're here to help you with any questions or
              concerns.
            </Typography>
            <CustomButtonPrimary
              variant='contained'
              aria-label='Contact Support'
              className='support-btn'
              onClick={handleToggleOptionModal}
            >
              Contact Support
            </CustomButtonPrimary>
          </Box>
          <Box>
            <figure className='fig-class'>
              <Image
                src={assest.helpSupportImage}
                width={500}
                height={500}
                alt='help-support-image'
              />
            </figure>
          </Box>
        </Stack>
      </Box>

      <MuiModalWrapper
        open={isOptionModalOpen}
        onClose={handleToggleOptionModal}
        className='helpSupportModal'
      >
        <HelpOptionsStyled>
          <Box className='white-box'>
            <Typography className='head-title' fontFamily={manrope.style.fontFamily}>
              Choose Option to Proceed
            </Typography>
            <IconButton
              disableRipple
              aria-label='close-button'
              className='close-button'
              onClick={handleToggleOptionModal}
            >
              <CrossIcon />
            </IconButton>
            <Stack spacing={'8px'} className='inner-btn-stack'>
              <Button
                fullWidth
                startIcon={<ChatIcon />}
                endIcon={<ArrowrightIcon />}
                className='option-btn'
                disableRipple
                aria-label='Chat'
                onClick={() => {
                  handleToggleOptionModal();
                  handleToggleChatDrawer();
                }}
              >
                Chat
              </Button>
              <Button
                fullWidth
                startIcon={<PhoneIcon2 />}
                endIcon={<ArrowrightIcon />}
                className='option-btn'
                disableRipple
                aria-label='Call'
                onClick={handleToggleOptionModal}
              >
                Call
              </Button>
              <Button
                fullWidth
                startIcon={<EmailIcon IconWidth='24' IconHeight='24' IconColor='currentColor' />}
                endIcon={<ArrowrightIcon />}
                className='option-btn'
                disableRipple
                aria-label='Email'
                onClick={handleToggleOptionModal}
              >
                Email
              </Button>
            </Stack>
          </Box>
        </HelpOptionsStyled>
      </MuiModalWrapper>

      {Boolean(initiateChatMutation.data?.data?.room_id) && isChatDrawerOpen && (
        <SupportChatDrawer
          roomId={initiateChatMutation.data?.data?.room_id}
          open={isChatDrawerOpen}
          onClose={handleToggleChatDrawer}
        />
      )}
    </HelpSupportMainStyled>
  );
}
