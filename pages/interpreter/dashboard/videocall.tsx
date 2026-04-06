import ConversationComp from '@/components/ConversationComp/ConversationComp';
import useElementSize from '@/hooks/resizeHook/resize';
import assest from '@/json/assest';
import { messageList } from '@/json/mock/demo.mock';
import { inter, manrope } from '@/mui-theme/_muiTheme';
import { MessageInputWrapper } from '@/styles/StyledComponents/ConversationWrapper';
import {
  ChatSection,
  VideoCallDurationWrapper,
  VideoCallScreen,
  VideoCallVideoChat,
  VideoCallWrapper,
} from '@/styles/StyledComponents/VideoCallWrapper';
import BadgeLable from '@/ui/BadgeLable/BadgeLable';
import AttachmentIcon from '@/ui/Icons/AttachmentIcon';
import CaptionIcon from '@/ui/Icons/CaptionIcon';
import Dashboard3 from '@/ui/Icons/Dashboard3';
import EndCallIcon from '@/ui/Icons/EndCallIcon';
import HandsIcon from '@/ui/Icons/HandsIcon';
import LockIcon from '@/ui/Icons/LockIcon';
import MaximizeIcon, { MinimizeIcon } from '@/ui/Icons/MaximizeIcon';
import MessageBtnIcon from '@/ui/Icons/MessageBtnIcon';
import MuteIcon from '@/ui/Icons/MuteIcon';
import RacordIcon, { StopRecordIcon } from '@/ui/Icons/RacordIcon';
import SoundIcon from '@/ui/Icons/SoundIcon';
import ThreeDotsIcon from '@/ui/Icons/ThreeDotsIcon';
import VideoCallIcon from '@/ui/Icons/VideoCallIcon';
import {
  Box,
  Button,
  IconButton,
  List,
  ListItem,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import Draggable from 'react-draggable';

function VideoCall() {
  const theme = useTheme();
  const router = useRouter();
  const [recordStart, setRecordStart] = useState(false);
  const [videoDurationRef, { height: videoDurationHeight }] = useElementSize<HTMLDivElement>();
  const [videoCallActionBtn, { height: videoCallActionBtnHeight }] =
    useElementSize<HTMLDivElement>();
  const [participantsListRef, { height: participantsListHeight }] =
    useElementSize<HTMLDivElement>();
  const isLandscape = useMediaQuery('(orientation: landscape)');
  const isSmallScreen = useMediaQuery('(max-width:899px)');
  const [chatFooterRef, { height: chatFooterHeight }] = useElementSize<HTMLDivElement>();
  const [fullScreen, setFullScreen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const smalldevice = useMediaQuery('(max-width:899px)');
  const [value, setValue] = useState('');
  const [chatSidebarToggle, setChatSidebarToggle] = useState(false);
  const resizeTextarea = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = smalldevice ? '40px' : '50px';
      const newHeight = Math.min(Math.max(textarea.scrollHeight, 40), 120);
      textarea.style.height = `${newHeight}px`;
    }
  };

  useEffect(() => {
    resizeTextarea();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
    resizeTextarea();
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
      setChatSidebarToggle(false);
    }
  };
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [sidebarRef.current]);

  return (
    <>
      {isLandscape && isSmallScreen && (
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
      )}
      <VideoCallWrapper height='100dvh' sx={{ opacity: isLandscape && isSmallScreen ? 0 : 1 }}>
        <VideoCallDurationWrapper
          ref={videoDurationRef}
          direction='row'
          alignItems='center'
          justifyContent='space-between'
          flexWrap='wrap'
          gap={{ md: 1.5, sm: 1, xs: 0.5 }}
        >
          <Stack direction='row' alignItems='center' gap={{ lg: 3, md: 2, xs: 1.2 }}>
            <Box
              component='i'
              bgcolor={theme.palette.common.white}
              width={{ md: '40px', xs: '30px' }}
              height={{ md: '40px', xs: '30px' }}
              borderRadius={'50%'}
              display='flex'
              alignItems='center'
              justifyContent='center'
            >
              <VideoCallIcon />
            </Box>
            <Typography
              fontFamily={manrope.style.fontFamily}
              fontWeight={600}
              fontSize={{ lg: '24px', md: '20px', xs: '16px' }}
              color={theme.palette.common.white}
            >
              George-Williams’ Spanish Class
            </Typography>
          </Stack>
          <Stack
            direction='row'
            alignItems='center'
            justifyContent={{ sm: 'initial', xs: 'space-between' }}
            gap={{ lg: 3, md: 2, xs: 1.2 }}
            width={{ sm: 'auto', xs: '100%' }}
          >
            <Typography
              fontFamily={inter.style.fontFamily}
              fontWeight={400}
              fontSize={{ xs: '14px' }}
              color={theme.palette.common.white}
            >
              Your meeting is being recorded
            </Typography>
            <Button
              variant='contained'
              color='primary'
              className='recordBtn'
              onClick={() => {
                setRecordStart(!recordStart);
              }}
              startIcon={recordStart ? <RacordIcon /> : <StopRecordIcon />}
              sx={{
                bgcolor: theme.palette.common.white,
                borderColor: theme.palette.common.white,
              }}
            >
              1:24:30
            </Button>
          </Stack>
        </VideoCallDurationWrapper>

        <VideoCallVideoChat
          direction='row'
          pt={{ lg: '17px', md: 2, sm: 1.5, xs: 1.2 }}
          height={`calc(100% - ${videoDurationHeight}px)`}
        >
          <VideoCallScreen
            maxWidth={{
              lg: 'calc(100% - 488px)',
              md: 'calc(100% - 358px)',
              xs: '100%',
            }}
            width='100%'
            height='100%'
            paddingRight={{ lg: '15px', md: '12px' }}
            sx={chatSidebarToggle ? { pointerEvents: 'none' } : {}}
          >
            <Box className={`videoCallWrapper ${fullScreen ? 'fullScreen' : ''} `}>
              <Box
                component='figure'
                className='mainScreenWrapper'
                maxHeight={{ lg: `calc(100% - ${videoCallActionBtnHeight}px)`, xs: '100%' }}
                height='100%'
              >
                <img src={assest.callerScreen} />

                <Draggable
                  axis='both'
                  allowAnyClick
                  bounds='parent'
                  defaultPosition={{ x: 0, y: 0 }}
                  handle='.smallVideoconversationBox'
                >
                  <Box className='smallVideoconversationBox'>
                    <Box className='smallScreenVideo' sx={{ position: 'relative' }}>
                      <img src={assest.receiverScreen} />
                    </Box>
                  </Box>
                </Draggable>
                <Button className='fullScreenBtn' onClick={() => setFullScreen(!fullScreen)}>
                  {fullScreen ? <MinimizeIcon /> : <MaximizeIcon />}
                </Button>
              </Box>
              <Box className='videoCallActionBtn' ref={videoCallActionBtn}>
                <Stack
                  direction='row'
                  alignItems='center'
                  flexWrap='wrap'
                  maxWidth='max-content'
                  marginX='auto'
                  borderRadius={{ lg: '10px', md: 2.5, xs: 2 }}
                  bgcolor={theme.palette.customColors.colorF9F5FF}
                  gap={{ lg: 2, md: 1.5, xs: 1 }}
                  p={{ lg: '11px', md: 2, xs: 1.5 }}
                >
                  <Stack
                    direction='row'
                    alignItems='center'
                    flexWrap='nowrap'
                    gap={{ md: 1.5, xs: 1 }}
                    className='actionBtnMenue'
                  >
                    <IconButton>
                      <MuteIcon />
                    </IconButton>
                    <IconButton>
                      <VideoCallIcon />
                    </IconButton>
                    <IconButton>
                      <CaptionIcon />
                    </IconButton>
                    <IconButton>
                      <HandsIcon />
                    </IconButton>
                    <IconButton
                      sx={{ display: { md: 'none', xs: 'flex' } }}
                      onClick={() => setChatSidebarToggle(!chatSidebarToggle)}
                    >
                      <Dashboard3 IconColor='currentColor' />
                    </IconButton>
                    <IconButton>
                      <ThreeDotsIcon />
                    </IconButton>
                  </Stack>
                  <Button
                    className='errorBtn endBtn'
                    onClick={() => router.push('/interpreter/dashboard/session-history/')}
                  >
                    <Typography variant='caption' display={{ lg: 'inline-block', xs: 'none' }}>
                      Leave Meeting
                    </Typography>
                    <Typography
                      variant='caption'
                      className='endCallIcon'
                      display={{ lg: 'none', xs: 'inline-block' }}
                    >
                      <EndCallIcon />
                    </Typography>
                  </Button>
                </Stack>
              </Box>
            </Box>
          </VideoCallScreen>
          <ChatSection
            direction='column'
            width='100%'
            height='100%'
            maxWidth={{ lg: '488px', md: '398px', sm: '360px', xs: '300px' }}
            className={`${chatSidebarToggle ? 'active' : ''}`}
            ref={sidebarRef}
          >
            <Box className='cmn_chatContainer' ref={participantsListRef}>
              <Box
                className='chatParticipantListHeading'
                px={{ lg: '20px', md: '15px', xs: '12px' }}
                py={{ lg: 1, md: 0.8, xs: 0.5 }}
                bgcolor={theme.palette.customColors.colorEBDFFF}
                borderRadius={'10px 10px 0 0'}
              >
                <Typography variant='body1' className='' sx={{ wordBreak: 'break-word' }}>
                  Chats{' '}
                  <Typography variant='caption' display='inline-flex' ml={0.8}>
                    <BadgeLable lable={1} />
                  </Typography>
                </Typography>
              </Box>
              <Box className='chatcontentSectionBody'>
                <Box className='innerBox'>
                  <List disablePadding sx={{ maxHeight: '60px' }}>
                    {Array.from({ length: 1 }).map((data, index: number) => {
                      return (
                        <ListItem
                          key={index}
                          disablePadding
                          sx={{
                            marginBottom: '8px',
                            '&:last-child': {
                              marginBottom: 0,
                            },
                          }}
                        >
                          <Stack
                            direction='row'
                            alignItems='center'
                            justifyContent='space-between'
                            flexWrap='wrap'
                            gap={1.5}
                            width='100%'
                          >
                            <Stack
                              direction='row'
                              alignItems='center'
                              gap={{ lg: '17px', md: '10px', xs: '8px' }}
                            >
                              <Typography
                                component='figure'
                                height={{ lg: '50px', md: 45, xs: 38 }}
                                width={{ lg: '50px', md: 45, xs: 38 }}
                                borderRadius={'50%'}
                                overflow={'hidden'}
                                lineHeight={0}
                              >
                                <Image
                                  height={80}
                                  width={80}
                                  alt='user-image'
                                  src={assest.receiverScreen}
                                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                              </Typography>
                              <Typography
                                variant='body1'
                                color={theme.palette.text.primary}
                                fontWeight={400}
                                fontSize={{ lg: '19px', sm: '16px', xs: '14' }}
                              >
                                Mandy Stone
                              </Typography>
                            </Stack>

                            <i className='soundIconBtn'>
                              <SoundIcon />
                            </i>
                          </Stack>
                        </ListItem>
                      );
                    })}
                  </List>
                </Box>
              </Box>
            </Box>
            <Box
              className='chatsectionWrapper'
              maxHeight={`calc(100% - ${participantsListHeight}px)`}
              height='100%'
            >
              <Box
                className='cmn_chatContainer'
                height='100%'
                display='flex'
                flexDirection='column'
              >
                <Box
                  className='chatParticipantListHeading'
                  px={{ lg: '20px', md: '15px', xs: '12px' }}
                  py={{ lg: 1, md: 0.8, xs: 0.5 }}
                  bgcolor={theme.palette.customColors.colorEBDFFF}
                  borderRadius={'10px 10px 0 0'}
                >
                  <Typography variant='body1' className='' sx={{ wordBreak: 'break-word' }}>
                    Chats{' '}
                    <Typography variant='caption' display='inline-flex' ml={0.8}>
                      <BadgeLable lable={1} />
                    </Typography>
                  </Typography>
                </Box>
                <Box className='chatcontentSectionBody' height='100%'>
                  <Box
                    className='innerBox'
                    height='100%'
                    py={{ lg: '15px !important', xs: '10px !important' }}
                    px={'0px !important'}
                    pb={{ lg: '15px !important', sm: '10px', xs: '0 !important' }}
                  >
                    <List
                      disablePadding
                      sx={{
                        maxHeight: `calc(100% - ${chatFooterHeight}px)`,
                        height: '100%',
                        overflow: 'auto',
                        px: { lg: '22px', xs: '15px' },
                        li: {
                          marginBottom: '8px',
                          '&:last-child': {
                            marginBottom: 0,
                          },
                        },
                      }}
                    >
                      {messageList.map((data, index: number) => (
                        <ListItem
                          disablePadding
                          key={index}
                          sx={{
                            maxWidth: { md: '90%', xs: '95%' },
                            ml: `${data.type == 'sender' ? 'auto' : ''}`,
                          }}
                        >
                          <ConversationComp
                            messageText={data.messageText}
                            timeText={data.timeText}
                            type={data.type === 'sender' ? 'sender' : 'receiver'}
                            userImage={data.userImage}
                          />
                        </ListItem>
                      ))}
                      <ListItem disablePadding>
                        <Stack
                          direction='row'
                          alignItems='center'
                          gap={{ lg: '15px', md: '10px', xs: '8px' }}
                        >
                          <Typography component='i'>
                            <Typography
                              variant='caption'
                              display='inline-block'
                              className='typingloader'
                            />
                          </Typography>
                          <Typography
                            component='figure'
                            height={{ lg: '30px', md: 28, xs: 25 }}
                            width={{ lg: '30px', md: 28, xs: 25 }}
                            borderRadius={'50%'}
                            overflow={'hidden'}
                            lineHeight={0}
                            flexShrink={0}
                            mt={{ lg: 1, md: 0.8, xs: 0.5 }}
                          >
                            <Image
                              height={80}
                              width={80}
                              alt='user-image'
                              src={assest.chatUser2}
                              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                          </Typography>
                        </Stack>
                      </ListItem>
                    </List>
                    <Box
                      className='cahtfooter'
                      ref={chatFooterRef}
                      pt={1}
                      sx={{ px: { lg: '22px', xs: '5px' } }}
                    >
                      <MessageInputWrapper>
                        <Stack
                          alignItems='center'
                          justifyContent='center'
                          className='attachmentBtn'
                        >
                          <AttachmentIcon />
                          <input type='file' className='fileinput' />
                        </Stack>
                        <textarea
                          ref={textareaRef}
                          value={value}
                          onChange={handleChange}
                          className='inputArea'
                          placeholder='Type your message here...'
                        />
                        <IconButton disableRipple className='sendBtn'>
                          <MessageBtnIcon />
                        </IconButton>
                      </MessageInputWrapper>
                      <Typography
                        variant='body1'
                        fontWeight='400'
                        fontSize={'12px'}
                        mt={{ md: 1.2, xs: 1 }}
                        display='inline-flex'
                      >
                        <Typography
                          variant='caption'
                          mr={{ xs: 0.8 }}
                          display='inline-block'
                          lineHeight={0}
                        >
                          <LockIcon
                            IconWidth='16'
                            IconHeight='16'
                            IconColor={theme.palette.primary.main}
                          />
                        </Typography>
                        Your chats are end to end encrypted
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          </ChatSection>
        </VideoCallVideoChat>
      </VideoCallWrapper>
    </>
  );
}

export default VideoCall;
