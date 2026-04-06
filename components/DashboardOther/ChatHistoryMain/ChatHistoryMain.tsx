import assest from '@/json/assest';
import {
  sharedFilesArray,
  sharedLinksArray,
  userListArray,
  userMessageListArray,
} from '@/json/mock/demo.mock';
import { ChatHistoryMainStyled } from '@/styles/StyledComponents/ChatHistoryMainStyled';
import InputFieldCommon from '@/ui/CommonInput/CommonInput';
import CustomButtonPrimary from '@/ui/CustomButtons/CustomButtonPrimary';
import BarIcon from '@/ui/Icons/BarIcon';
import CrossIcon from '@/ui/Icons/CrossIcon';
import DoubleTickIcon from '@/ui/Icons/DoubleTickIcon';
import EmailIcon from '@/ui/Icons/EmailIcon';
import FileIcon from '@/ui/Icons/FileIcon';
import LanguageIcon from '@/ui/Icons/LanguageIcon';
import PdfIcon from '@/ui/Icons/PdfIcon';
import PhoneIcon from '@/ui/Icons/PhoneIcon';
import SearchIconSmall from '@/ui/Icons/SearchIconSmall';
import ThreeDotIcon from '@/ui/Icons/ThreeDotIcon';
import TickIcon from '@/ui/Icons/TickIcon';
import MuiModalWrapper from '@/ui/Modal/MuiModalWrapper';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import {
  Avatar,
  Badge,
  Box,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import Image from 'next/image';
import React from 'react';
import SharedFileList from './SharedFileList';
import SharedLinkList from './SharedLinkList';

export function stringAvatar(name: string) {
  const [first = '', second = ''] = name.split(' ');
  return {
    children: `${first[0] || ''}${second[0] || ''}`,
  };
}

export default function ChatHistoryMain() {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.down('md'));
  const isSmallScreen = useMediaQuery('(max-width:899px)');
  const [chatMenu, setChatMenu] = React.useState<null | HTMLElement>(null);
  const [toggleUserDetails, setToggleUserDetails] = React.useState(false);
  const [toggleMiddleSection, setToggleMiddleSection] = React.useState(false);
  const [isSharedModalOpen, setIsSharedModalOpen] = React.useState(false);
  const [isSharedLinksOpen, setIsSharedLinksModalOpen] = React.useState(false);
  const isLandscape = useMediaQuery('(orientation: landscape)');

  const handleToggleUserDetails = () => {
    setToggleUserDetails(!toggleUserDetails);
  };

  const handleToggleMiddleSection = () => {
    setToggleMiddleSection(!toggleMiddleSection);
  };

  const handleToggleSharedModal = () => {
    setIsSharedModalOpen(!isSharedModalOpen);
  };

  const handleToggleSharedLinksModal = () => {
    setIsSharedLinksModalOpen(!isSharedLinksOpen);
  };

  const isChatMenuOpen = Boolean(chatMenu);

  const handleChatMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setChatMenu(event.currentTarget);
  };

  const handleChatMenuClose = () => {
    setChatMenu(null);
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
              {/* Left Content */}
              <Box className='left-box'>
                <InputFieldCommon
                  className='search-field'
                  placeholder='Search...'
                  endAdornment={<SearchIconSmall />}
                />

                <Stack className='main-item-stack' spacing={'5px'}>
                  {userListArray?.map((item, index) => (
                    <Stack
                      direction={'row'}
                      flexWrap={'wrap'}
                      className={`message-item-stack ${index === 0 ? 'active-chat' : ''}`}
                      key={index}
                      {...(isMd ? { onClick: handleToggleMiddleSection } : {})}
                    >
                      <figure className='user-img-fig'>
                        <Image
                          src={item.userImage}
                          width={50}
                          height={50}
                          alt={`user-image-${index}`}
                        />
                      </figure>
                      <Box className='middle-cls'>
                        <Typography className='user-name' variant='body2'>
                          {item.name}
                        </Typography>
                        <Typography className='user-message'>{item.message}</Typography>
                      </Box>
                      <Box className='right-cls'>
                        <Typography className='time'>{item.sentTime}</Typography>
                        {!item.unreadCount ? (
                          <i className={`icon ${item?.hasSeen ? 'seen' : ''}`}>
                            {item.isDelivered ? <DoubleTickIcon /> : <TickIcon />}
                          </i>
                        ) : (
                          <Badge
                            badgeContent={item.unreadCount}
                            color='primary'
                            className='unread-count'
                          />
                        )}
                      </Box>
                    </Stack>
                  ))}
                </Stack>
              </Box>

              {/* Middle Content */}
              <Box className={`middle-box ${toggleMiddleSection ? 'open' : ''}`}>
                <Box className='middle-inner-box'>
                  <Box className='header-box-bordered'>
                    <Stack
                      className='header-box-inner'
                      direction={'row'}
                      alignItems={'center'}
                      justifyContent={'space-between'}
                      flexWrap={'wrap'}
                    >
                      <Stack
                        direction={'row'}
                        alignItems={'center'}
                        spacing={'10px'}
                        flexWrap={'wrap'}
                      >
                        {isMd && (
                          <IconButton
                            disableRipple
                            onClick={handleToggleMiddleSection}
                            aria-label='back-button'
                            className='back-btn'
                          >
                            <ArrowBackIosIcon />
                          </IconButton>
                        )}
                        <Typography className='name-head'>John Williams</Typography>
                      </Stack>
                      <Box>
                        <IconButton
                          disableRipple
                          onClick={handleToggleUserDetails}
                          className='details-btn'
                          aria-label='details-button'
                        >
                          <BarIcon />
                        </IconButton>
                        <IconButton
                          disableRipple
                          id='chat-menu-button'
                          aria-controls={isChatMenuOpen ? 'chat-menu' : undefined}
                          aria-haspopup='true'
                          aria-expanded={isChatMenuOpen ? 'true' : undefined}
                          onClick={handleChatMenuOpen}
                          aria-label='menu-button'
                          className='menu-open-btn'
                        >
                          <ThreeDotIcon />
                        </IconButton>
                      </Box>

                      <Menu
                        id='chat-menu'
                        anchorEl={chatMenu}
                        open={isChatMenuOpen}
                        onClose={handleChatMenuClose}
                        slotProps={{
                          list: {
                            'aria-labelledby': 'chat-menu-button',
                          },
                        }}
                      >
                        <MenuItem onClick={handleChatMenuClose}>Demo 1</MenuItem>
                        <MenuItem onClick={handleChatMenuClose}>Demo 2</MenuItem>
                      </Menu>
                    </Stack>
                  </Box>
                  <Box className='msg-main-body'>
                    <Stack spacing={'12px'}>
                      <Box className='day-indicator-box'>
                        <Chip label='Today' className='day-indicator-chip' />
                      </Box>
                      {userMessageListArray.map((item, index) => (
                        <Stack
                          className={`msg-stack ${item.type === 'sender' ? 'sender' : ''}`}
                          direction={item.type === 'sender' ? 'row-reverse' : 'row'}
                          flexWrap={'wrap'}
                          gap={{ xl: '28px', xs: '10px' }}
                          key={index}
                        >
                          {item.userImage ? (
                            <figure className='user-fig'>
                              <Image src={item.userImage} width={50} height={50} alt='user-image' />
                            </figure>
                          ) : (
                            <Avatar {...stringAvatar(item.name)} className='avatar-class' />
                          )}

                          <Box className='message-box'>
                            <Box className='inner-box'>
                              <Typography className='msg-text'>{item.message}</Typography>
                              {item.hasFile && (
                                <Stack
                                  direction={'row'}
                                  alignItems={'center'}
                                  flexWrap={'wrap'}
                                  sx={{ pt: '10px' }}
                                  className='file-stack'
                                  spacing={'12px'}
                                >
                                  <i>
                                    <PdfIcon />
                                  </i>
                                  <Box>
                                    <Typography className='file-name'>{item.fileName}</Typography>
                                    <Typography className='file-size'>{item.fileSize}</Typography>
                                  </Box>
                                </Stack>
                              )}
                            </Box>
                            <Stack
                              direction={item.type === 'sender' ? 'row-reverse' : 'row'}
                              alignItems={'center'}
                              flexWrap={'wrap'}
                              sx={{ pt: '6px' }}
                              gap={'6px'}
                            >
                              <Typography className='time'>{item.sentTime}</Typography>
                              <i className='read-icon'>
                                <DoubleTickIcon
                                  IconColor={theme.palette.customColors.color225DFF}
                                />
                              </i>
                            </Stack>
                          </Box>
                        </Stack>
                      ))}
                    </Stack>
                  </Box>
                </Box>
              </Box>

              {/* Right Content */}
              <Box className={`right-box ${toggleUserDetails ? 'open' : ''}`}>
                <Box className='top-box'>
                  <IconButton
                    disableRipple
                    aria-label='close-button'
                    className='cross-info-btn'
                    onClick={handleToggleUserDetails}
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
                    <Stack
                      direction={'row'}
                      alignItems={'center'}
                      flexWrap={'wrap'}
                      spacing={'10px'}
                    >
                      <i className='icon'>
                        <EmailIcon />
                      </i>
                      <Typography className='value' variant='body2'>
                        john.doe@gmail.com
                      </Typography>
                    </Stack>
                    <Stack
                      direction={'row'}
                      alignItems={'center'}
                      flexWrap={'wrap'}
                      spacing={'10px'}
                    >
                      <i className='icon'>
                        <PhoneIcon />
                      </i>
                      <Typography className='value' variant='body2'>
                        +56 231456789
                      </Typography>
                    </Stack>
                    <Stack
                      direction={'row'}
                      alignItems={'center'}
                      flexWrap={'wrap'}
                      spacing={'10px'}
                    >
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
                        onClick={handleToggleSharedModal}
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
                        onClick={handleToggleSharedLinksModal}
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
