import SharedFileList from '@/components/DashboardOther/ChatHistoryMain/SharedFileList';
import SharedLinkList from '@/components/DashboardOther/ChatHistoryMain/SharedLinkList';
import assest from '@/json/assest';
import { ChatHistoryMainStyled } from '@/styles/StyledComponents/ChatHistoryMainStyled';
import MuiModalWrapper from '@/ui/Modal/MuiModalWrapper';
import { Box, Stack, useMediaQuery, useTheme } from '@mui/material';
import Image from 'next/image';
import { useState } from 'react';
import { ChatPanelUser } from './ChatPanel';
import { SessionListUser } from './SessionListUser';

function ChatHistoryUser() {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.down('md'));
  const isSmallScreen = useMediaQuery('(max-width:899px)');
  const isLandscape = useMediaQuery('(orientation: landscape)');

  const [toggleUserDetails, setToggleUserDetails] = useState(false);
  const [selectedSession, setSelectedSession] = useState({ id: '', vonage: '' });
  const [isSharedModalOpen, setIsSharedModalOpen] = useState(false);
  const [isSharedLinksOpen, setIsSharedLinksModalOpen] = useState(false);

  const handleToggleUserDetails = () => {
    setToggleUserDetails(!toggleUserDetails);
  };

  const handleSelectSession = (data: { id: string; vonage: string }) => {
    // if (!isSmallScreen) {
    setSelectedSession({ id: data.id, vonage: data.vonage });
    // }
  };

  const handleToggleSharedModal = () => {
    setIsSharedModalOpen(!isSharedModalOpen);
  };

  const handleToggleSharedLinksModal = () => {
    setIsSharedLinksModalOpen(!isSharedLinksOpen);
  };

  return (
    <ChatHistoryMainStyled>
      {isLandscape && isSmallScreen ? (
        <Stack direction='row' alignItems='center' justifyContent='center'>
          <Box
            position='fixed'
            top={0}
            left={0}
            right={0}
            zIndex={'999'}
            width='100%'
            height='100%'
            bgcolor={theme.palette.common.black}
          >
            <Image
              src={assest.rotatePhone}
              alt='rotate-phone-gif'
              width={500}
              height={900}
              priority
              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            />
          </Box>
        </Stack>
      ) : (
        <Box className='bordered-box'>
          <Box className='inner-main-box'>
            <Box className='chat-main-box'>
              <SessionListUser
                onChatSelect={handleSelectSession}
                isMobile={isMd}
                selectedSessionId={selectedSession.vonage}
              />

              <ChatPanelUser
                isOpen={Boolean(selectedSession.id)}
                onBack={() => setSelectedSession({ id: '', vonage: '' })}
                onToggleDetails={handleToggleUserDetails}
                isMobile={isMd}
                session={selectedSession}
              />

              {/* <ProfileDetailPanel
                isOpen={toggleUserDetails}
                onClose={handleToggleUserDetails}
                onOpenSharedFiles={handleToggleSharedModal}
                onOpenSharedLinks={handleToggleSharedLinksModal}
              /> */}
            </Box>
          </Box>
        </Box>
      )}

      <MuiModalWrapper
        open={isSharedModalOpen}
        onClose={handleToggleSharedModal}
        className='sharedFileModal'
      >
        <SharedFileList onClose={handleToggleSharedModal} />
      </MuiModalWrapper>
      <MuiModalWrapper
        open={isSharedLinksOpen}
        onClose={handleToggleSharedLinksModal}
        className='sharedFileModal'
      >
        <SharedLinkList className='shared-link' onClose={handleToggleSharedLinksModal} />
      </MuiModalWrapper>
    </ChatHistoryMainStyled>
  );
}

export default ChatHistoryUser;
