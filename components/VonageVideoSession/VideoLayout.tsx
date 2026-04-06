// components/VideoLayout.tsx
import { useInterpreterData } from '@/hooks/react-query/useVisitor';
import { calculateTimeGap } from '@/lib/functions/_helpers.lib';
import { inter, manrope } from '@/mui-theme/_muiTheme';
import { VideoCallDurationWrapper } from '@/styles/StyledComponents/VideoCallWrapper';
import { ISubscriber } from '@/typescript/interface/vonage.interface';
import RacordIcon from '@/ui/Icons/RacordIcon';
import VideoCallIcon from '@/ui/Icons/VideoCallIcon';
import { showWarnToast } from '@/ui/Toast/ToastUtils';
import PeopleIcon from '@mui/icons-material/People';
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';

interface VideoLayoutProps {
  publisher: any;
  subscribers: ISubscriber[];
  publisherRef: React.RefObject<HTMLDivElement | null>;
  subscribersRef: React.RefObject<HTMLDivElement | null>;
  publisherContainerId: string;
  endTime: string;
  sessionData: {
    clientName: string;
    interpreterName: string;
    language_one: string;
    language_two: string;
  };
}

interface ITimeGap {
  hours: number;
  minutes: number;
  seconds: number;
  formatted: string;
  isPast: boolean;
}

interface ITimeGap {
  hours: number;
  minutes: number;
  seconds: number;
  formatted: string;
  isPast: boolean;
}

const TimeLeft = ({ endTime }: { endTime: string }) => {
  const [time, setTime] = useState<ITimeGap>(() => calculateTimeGap(endTime));
  const hasShownToast = useRef(false);
  const hasEnded = useRef(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const newTime = calculateTimeGap(endTime);
      setTime(newTime);

      const totalMinutesLeft = newTime.hours * 60 + newTime.minutes;

      if (totalMinutesLeft <= 15 && !newTime.isPast && !hasShownToast.current) {
        showWarnToast('Only 15 minutes left.');
        hasShownToast.current = true;
      }

      if (newTime.isPast && !hasEnded.current) {
        hasEnded.current = true;
        clearInterval(interval);
        toast.error('Meeting will end shortly.');
        setTimeout(() => {
          window.location.href = '/user/dashboard/';
        }, 5000);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [endTime]);

  const theme = useTheme();
  return (
    <Button
      variant='contained'
      color='primary'
      className='recordBtn'
      startIcon={<RacordIcon />}
      sx={{
        bgcolor: theme.palette.common.white,
        borderColor: theme.palette.common.white,
      }}
    >
      {String(time.hours).padStart(2, '0')}:{String(time.minutes).padStart(2, '0')}:
      {String(time.seconds).padStart(2, '0')}
    </Button>
  );
};

export const VideoLayout: React.FC<VideoLayoutProps> = ({
  publisher,
  subscribers,
  publisherRef,
  subscribersRef,
  publisherContainerId,
  endTime,
  sessionData,
}) => {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));
  const { interpreterData } = useInterpreterData();

  // Style the subscriber containers to fill the main area
  useEffect(() => {
    if (subscribersRef.current) {
      const subscriberContainers = subscribersRef.current.querySelectorAll('[id^="subscriber-"]');
      subscriberContainers.forEach((container: Element, index: number) => {
        const htmlContainer = container as HTMLDivElement;
        if (index === 0) {
          // First subscriber gets the main area
          htmlContainer.style.cssText = `
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
            background-color: #000;
            border: none;
            border-radius: 8px;
            margin: 0;
            display: block;
            overflow: hidden;
          `;
        } else {
          // Additional subscribers can be hidden or shown in a small strip
          htmlContainer.style.cssText = `
            display: none;
          `;
        }
      });
    }
  }, [subscribers.length]);

  return (
    <Box sx={{ width: '100%', position: 'relative' }}>
      {/* header */}
      <VideoCallDurationWrapper
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
            {/* George-Williams’ Spanish Class */}
            {`${interpreterData?._id ? sessionData.clientName : sessionData.interpreterName}'s Session (${sessionData.language_one} -> ${sessionData.language_two})`}
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
          <TimeLeft endTime={endTime} />
        </Stack>
      </VideoCallDurationWrapper>

      <Box className='fullVideoWrap'>
        {/* Main Video Area */}
        <Card sx={{ mb: 3 }} className='mainVideo'>
          <CardContent sx={{ p: { xs: 2, sm: 3 }, pb: { xs: '0 !important' } }}>
            {/* Header */}
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: { xs: 0, sm: 2 },
                flexWrap: 'wrap',
                gap: 1,
              }}
            >
              <Typography
                variant={isSmall ? 'h6' : 'h5'}
                component='h2'
                sx={{
                  fontWeight: 600,
                  color: 'text.primary',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                }}
              >
                <PeopleIcon color='primary' />
                {subscribers.length > 0 ? 'Main Video' : 'Waiting for participants...'}
              </Typography>

              {subscribers.length > 1 && (
                <Chip
                  label={`${subscribers.length} participants total`}
                  color='primary'
                  variant='outlined'
                  size='small'
                />
              )}
            </Box>

            {/* Main Video Container */}
            <Box
              sx={{
                width: '100%',
                aspectRatio: '16/9',
                backgroundColor: 'grey.900',
                border: 2,
                borderColor: 'success.main',
                borderRadius: 2,
                position: 'relative',
                overflow: 'hidden',
                minHeight: { xs: '100%', sm: '100%', md: '100%' },
                maxHeight: { xs: '100%', sm: '100%', md: '100%' },
                height: {
                  xs: 'calc(100dvh - 220px)',
                  sm: 'calc(100dvh - 220px)',
                  md: 'calc(100dvh - 250px)',
                  lg: 'calc(100dvh - 270px)',
                },
                boxShadow: 4,
              }}
            >
              {/* Subscribers Container */}
              <Box
                ref={subscribersRef}
                id='subscribers-container'
                sx={{
                  width: '100%',
                  height: '100%',
                  position: 'relative',
                }}
              />

              {/* Placeholder when no participants */}
              {subscribers.length === 0 && (
                <Box
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    textAlign: 'center',
                    zIndex: 1,
                    color: 'grey.400',
                  }}
                >
                  <PeopleIcon
                    sx={{
                      fontSize: { xs: 48, sm: 64, md: 80 },
                      mb: 2,
                      opacity: 0.7,
                    }}
                  />
                  <Typography
                    variant={isSmall ? 'body1' : 'h6'}
                    sx={{
                      color: 'grey.400',
                      fontWeight: 500,
                    }}
                  >
                    Waiting for other participants to join...
                  </Typography>
                  <Typography
                    variant='body2'
                    sx={{
                      color: 'grey.500',
                      mt: 1,
                    }}
                  >
                    Share your meeting link to get started
                  </Typography>
                </Box>
              )}
            </Box>
          </CardContent>
        </Card>

        {/* Your Video Section */}
        <Card className='yourVideo' sx={{ background: 'transparent' }}>
          <CardContent sx={{ p: 0, pb: '0 !important' }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                alignItems: { xs: 'stretch', sm: 'center' },
                gap: 2,
              }}
            >
              {/* Publisher Video Container */}
              <Box
                ref={publisherRef}
                id={publisherContainerId}
                sx={{
                  width: { xs: '100%', sm: 200, md: 250 },
                  height: { xs: 140, sm: 150, md: 188 },
                  backgroundColor: publisher ? 'grey.900' : 'grey.700',
                  border: 2,
                  borderColor: 'primary.main',
                  borderRadius: 2,
                  position: 'relative',
                  overflow: 'hidden',
                  flexShrink: 0,
                  boxShadow: 3,
                }}
              />
            </Box>
          </CardContent>
        </Card>
      </Box>

      {/* Additional Participants Info (if more than 1) */}
      {subscribers.length > 1 && (
        <Card sx={{ mt: 2 }}>
          <CardContent sx={{ p: 2 }}>
            <Typography
              variant='subtitle2'
              component='h4'
              sx={{
                mb: 1,
                color: 'text.secondary',
                fontWeight: 600,
              }}
            >
              Other Participants ({subscribers.length - 1} not shown)
            </Typography>

            <Alert
              severity='info'
              sx={{
                '& .MuiAlert-message': {
                  fontSize: '0.875rem',
                },
              }}
            >
              Additional participants are connected but not displayed in the current view.
              Participant switching feature coming soon!
            </Alert>
          </CardContent>
        </Card>
      )}
    </Box>
  );
};
