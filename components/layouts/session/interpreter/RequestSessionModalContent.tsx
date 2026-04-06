import { mediaUrl } from '@/api/endpoints';
import {
  approveSessionApi,
  rejectSessionApi,
  sessionDetailInterpreterApi,
  updatedSessionAproveRejectApi,
} from '@/api/functions/session.api';
import { queryKeys } from '@/config/constants';
import { useInterpreterData } from '@/hooks/react-query/useVisitor';
import assest from '@/json/assest';
import { queryClient } from '@/pages/_app';
import CalenderIcon2 from '@/ui/Icons/CalenderIcon2';
import CrossIcon2 from '@/ui/Icons/CrossIcon2';
import EmailIcon from '@/ui/Icons/EmailIcon';
import LanguageIcon from '@/ui/Icons/LanguageIcon';
import LocationOnIcon from '@/ui/Icons/LocationOnIcon';
import MapIcon from '@/ui/Icons/MapIcon';
import PhoneIcon from '@/ui/Icons/PhoneIcon';
import ProfileIcon from '@/ui/Icons/ProfileIcon';
import VideoIcon from '@/ui/Icons/VideoIcon';
import { Box, Grid2, IconButton, Skeleton, Stack, Typography } from '@mui/material';
import { useMutation, useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import Image from 'next/image';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import ButtonCommon from '../../common/ButtonCommon';

// Format date and time
const formatDateTime = (startDate: string, endDate: string) => {
  if (!startDate) return 'N/A';
  const start = dayjs(startDate);
  const end = dayjs(endDate);
  const dayOfWeek = start.format('dddd');
  const date = start.format('D MMMM');
  const startTime = start.format('h:mma');
  const endTime = end.format('h:mma');
  return `${dayOfWeek}, ${date}, ${startTime} - ${endTime}`;
};

function RequestSessionDetailContent({ handleToggleDrawer }: { handleToggleDrawer: () => void }) {
  const router = useRouter();
  const { sessionDetail } = router.query;
  const { interpreterData } = useInterpreterData();

  const handleRefetch = () => {
    queryClient.invalidateQueries({
      queryKey: queryKeys.interpreterSessionDetail(sessionDetail as string),
    });
    queryClient.invalidateQueries({
      queryKey: ['interpreter-session-list'],
    });
  };

  const sessionDetailQuery = useQuery({
    queryKey: queryKeys.interpreterSessionDetail(sessionDetail as string),
    queryFn: () => sessionDetailInterpreterApi(sessionDetail as string),
    enabled: Boolean(sessionDetail && typeof sessionDetail === 'string'),
  });

  const approveSessionMutation = useMutation({
    mutationFn: approveSessionApi,
    onSuccess: () => {
      handleRefetch();
      toast.success('Session request accepted successfully');
    },
  });

  const updatedAcceptRejectMutation = useMutation({
    mutationFn: updatedSessionAproveRejectApi,
    onSuccess: () => {
      handleRefetch();
    },
  });

  const rejectSessionMutation = useMutation({
    mutationFn: rejectSessionApi,
    onSuccess: () => {
      handleRefetch();
      toast.success('Session request rejected successfully');
    },
  });

  const sessionData = sessionDetailQuery?.data?.data;

  if (typeof sessionDetail !== 'string') {
    return null;
  }

  // Loading state
  if (sessionDetailQuery.isLoading) {
    return (
      <>
        <Stack
          direction={'row'}
          alignItems={'center'}
          justifyContent={'space-between'}
          flexWrap={'wrap'}
          className='head-stack'
        >
          <Stack direction={'row'} alignItems={'center'} spacing={'10px'}>
            <Typography className='drawer-title'>Requested Appointment</Typography>
            <IconButton
              disableRipple
              aria-label='close-button'
              className='close-btn'
              onClick={handleToggleDrawer}
            >
              <CrossIcon2 />
            </IconButton>
          </Stack>
        </Stack>
        <Box className='main-body'>
          <Grid2 container spacing={'16px'}>
            <Grid2 size={{ xs: 12 }}>
              <Box className='common-box'>
                <Skeleton variant='text' width={80} height={30} />
                <Box className='coloured-box'>
                  <Stack direction={'row'} spacing={2}>
                    <Skeleton variant='circular' width={62} height={62} />
                    <Box sx={{ flex: 1 }}>
                      <Skeleton variant='text' width='40%' height={30} />
                      <Skeleton variant='text' width='60%' />
                      <Skeleton variant='text' width='50%' />
                    </Box>
                  </Stack>
                </Box>
              </Box>
            </Grid2>
            <Grid2 size={{ xs: 12 }}>
              <Box className='common-box'>
                <Skeleton variant='text' width={150} height={30} />
                <Box className='coloured-box'>
                  <Skeleton variant='rectangular' height={150} />
                </Box>
              </Box>
            </Grid2>
            <Grid2 size={{ xs: 12 }}>
              <Box className='common-box'>
                <Skeleton variant='text' width={100} height={30} />
                <Box className='coloured-box'>
                  <Skeleton variant='rectangular' height={100} />
                </Box>
              </Box>
            </Grid2>
          </Grid2>
        </Box>
      </>
    );
  }

  // Error or no data state
  if (sessionDetailQuery.isError || !sessionData) {
    return (
      <>
        <Stack
          direction={'row'}
          alignItems={'center'}
          justifyContent={'space-between'}
          flexWrap={'wrap'}
          className='head-stack'
        >
          <Stack direction={'row'} alignItems={'center'} spacing={'10px'}>
            <Typography className='drawer-title'>Requested Appointment</Typography>
            <IconButton
              disableRipple
              aria-label='close-button'
              className='close-btn'
              onClick={handleToggleDrawer}
            >
              <CrossIcon2 />
            </IconButton>
          </Stack>
        </Stack>
        <Box className='main-body'>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '300px',
              textAlign: 'center',
              p: 3,
            }}
          >
            <Typography variant='h6' sx={{ mb: 1, fontWeight: 600 }}>
              No Session Found
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              The requested session details could not be loaded. Please try again later.
            </Typography>
          </Box>
        </Box>
      </>
    );
  }

  return (
    <>
      <Stack
        direction={'row'}
        alignItems={'center'}
        justifyContent={'space-between'}
        flexWrap={'wrap'}
        className='head-stack'
      >
        <Stack
          direction={'row'}
          alignItems={'center'}
          justifyContent={'space-between'}
          flexWrap={'wrap'}
          spacing={'10px'}
        >
          <Typography className='drawer-title'>Requested Appointment</Typography>
          <IconButton
            disableRipple
            aria-label='close-button'
            className='close-btn'
            onClick={handleToggleDrawer}
          >
            <CrossIcon2 />
          </IconButton>
        </Stack>
      </Stack>
      <Box className='main-body'>
        <Typography variant='h5' pb={2}>
          Session Reference Number: {sessionData?.session_ref_number}
        </Typography>
        <Grid2 container spacing={'16px'}>
          <Grid2 size={{ xs: 12 }}>
            <Box className='common-box'>
              <Typography className='cmn-head'>Client</Typography>
              <Box className='coloured-box'>
                <Box className='profile-box'>
                  <Stack direction={{ sm: 'row', xs: 'column' }} flexWrap={'wrap'}>
                    <Box className='left-box'>
                      <figure>
                        <Image
                          src={
                            sessionData.client?.profile_image
                              ? mediaUrl(`user_profile_pic/${sessionData.client?.profile_image}`)
                              : assest.dashboardHeaderAvatarImage
                          }
                          width={72}
                          height={72}
                          alt='profile-image'
                        />
                      </figure>
                    </Box>
                    <Box className='right-box'>
                      <Typography className='user-name'>
                        {sessionData.client?.full_name || 'N/A'}
                      </Typography>
                      <Stack direction={'row'} flexWrap={'wrap'} rowGap={'10px'} columnGap={'20px'}>
                        <Stack direction={'row'} flexWrap={'wrap'} spacing={'10px'}>
                          <i className='icon'>
                            <PhoneIcon />
                          </i>
                          <Typography className='value' variant='body2'>
                            {sessionData.client?.phone || 'N/A'}
                          </Typography>
                        </Stack>
                        <Stack direction={'row'} flexWrap={'wrap'} spacing={'10px'}>
                          <i className='icon'>
                            <EmailIcon />
                          </i>
                          <Typography className='value' variant='body2'>
                            {sessionData.client?.email || 'N/A'}
                          </Typography>
                        </Stack>
                        {sessionData.location && (
                          <Stack direction={'row'} flexWrap={'wrap'} spacing={'10px'}>
                            <i className='icon'>
                              <MapIcon IconWidth='14' IconHeight='14' />
                            </i>
                            <Typography className='value' variant='body2'>
                              {sessionData.location}
                            </Typography>
                          </Stack>
                        )}
                      </Stack>
                    </Box>
                  </Stack>
                </Box>
              </Box>
            </Box>
          </Grid2>
          <Grid2 size={{ xs: 12 }}>
            <Box className='common-box session-box'>
              <Typography className='cmn-head'>Session Information</Typography>
              <Box className='coloured-box'>
                <Box className='profile-box'>
                  <Grid2 container rowSpacing={{ sm: '20px', xs: '10px' }} columnSpacing={'40px'}>
                    <Grid2 size={{ sm: 6.5, xs: 12 }}>
                      <Stack direction={'row'} flexWrap={'wrap'}>
                        <i className='icon'>
                          <CalenderIcon2 />
                        </i>
                        <Box className='right-part'>
                          <Typography className='label' variant='body2'>
                            Date
                          </Typography>
                          <Typography className='value' variant='body2'>
                            {formatDateTime(sessionData.start_date_time, sessionData.end_date_time)}
                          </Typography>
                        </Box>
                      </Stack>
                    </Grid2>
                    <Grid2 size={{ sm: 5.5, xs: 12 }}>
                      <Stack direction={'row'} flexWrap={'wrap'}>
                        <i className='icon'>
                          <ProfileIcon />
                        </i>
                        <Box className='right-part'>
                          <Typography className='label' variant='body2'>
                            Appointment Type
                          </Typography>
                          <Typography className='value' variant='body2'>
                            {sessionData.type?.expertise_display_name || 'N/A'}
                          </Typography>
                        </Box>
                      </Stack>
                    </Grid2>
                    <Grid2 size={{ sm: 6.5, xs: 12 }}>
                      <Stack direction={'row'} flexWrap={'wrap'}>
                        <i className='icon'>
                          <VideoIcon />
                        </i>
                        <Box className='right-part'>
                          <Typography className='label' variant='body2'>
                            Session Platform
                          </Typography>
                          <Typography className='value' variant='body2'>
                            {sessionData.format?.title || 'N/A'}
                          </Typography>
                        </Box>
                      </Stack>
                    </Grid2>
                    <Grid2 size={{ sm: 5.5, xs: 12 }}>
                      <Stack direction={'row'} flexWrap={'wrap'}>
                        <i className='icon'>
                          <LanguageIcon />
                        </i>
                        <Box className='right-part'>
                          <Typography className='label' variant='body2'>
                            Languages
                          </Typography>
                          <Typography className='value' variant='body2'>
                            {[
                              sessionData.language_one?.language_display_name,
                              sessionData.language_two?.language_display_name,
                            ]
                              .filter(Boolean)
                              .join(', ') || 'N/A'}
                          </Typography>
                        </Box>
                      </Stack>
                    </Grid2>

                    <Grid2 size={{ sm: 5.5, xs: 12 }}>
                      <Stack direction='row'>
                        <i className='icon'>
                          <LocationOnIcon />
                        </i>
                        <Box className='right-part'>
                          <Typography variant='body2'>{sessionData?.location}</Typography>
                        </Box>
                      </Stack>
                    </Grid2>
                  </Grid2>
                </Box>
              </Box>
            </Box>
          </Grid2>
          <Grid2 size={{ xs: 12 }}>
            <Box className='common-box session-box'>
              <Typography className='cmn-head'>Description</Typography>
              <Box className='coloured-box'>
                <Typography className='desc-content'>
                  {sessionData.details || 'No description provided'}
                </Typography>
              </Box>
            </Box>
          </Grid2>
        </Grid2>
      </Box>
      <Box className='btn-box'>
        {!sessionData.approvedBy ? (
          <ButtonCommon
            disableRipple
            variant='contained'
            aria-label='Approve'
            fullWidth
            className='add-btn'
            isLoading={approveSessionMutation.isPending}
            onClick={() => {
              if (rejectSessionMutation.isPending) return;
              approveSessionMutation.mutate(sessionData._id);
            }}
          >
            Approve
          </ButtonCommon>
        ) : interpreterData?._id === sessionData.approvedBy._id ? (
          sessionData?.is_update_requested ? (
            <Stack direction={'row'} gap={2}>
              <ButtonCommon
                disableRipple
                variant='contained'
                aria-label='Approve'
                fullWidth
                className='add-btn'
                isLoading={updatedAcceptRejectMutation.isPending}
                onClick={() => {
                  updatedAcceptRejectMutation.mutate({ status: 'approve', id: sessionData._id });
                }}
              >
                Accept
              </ButtonCommon>

              <ButtonCommon
                disableRipple
                variant='outlined'
                aria-label='Decline'
                fullWidth
                className='cancel-btn'
                disabled={rejectSessionMutation.isPending}
                isLoading={
                  updatedAcceptRejectMutation.variables?.status === 'reject' &&
                  updatedAcceptRejectMutation.isPending
                }
                onClick={() => {
                  updatedAcceptRejectMutation.mutate({ status: 'reject', id: sessionData._id });
                }}
              >
                Reject
              </ButtonCommon>
            </Stack>
          ) : (
            <ButtonCommon
              disableRipple
              variant='outlined'
              aria-label='Decline'
              fullWidth
              className='cancel-btn'
              disabled={rejectSessionMutation.isPending}
              isLoading={
                updatedAcceptRejectMutation.variables?.status === 'reject' &&
                rejectSessionMutation.isPending
              }
              onClick={() => {
                if (approveSessionMutation.isPending) return;
                rejectSessionMutation.mutate(sessionData._id);
              }}
            >
              Decline
            </ButtonCommon>
          )
        ) : (
          <ButtonCommon
            disableRipple
            variant='contained'
            aria-label='Approve'
            fullWidth
            className='add-btn'
            disabled
          >
            Not Available
          </ButtonCommon>
        )}
      </Box>
    </>
  );
}

export default RequestSessionDetailContent;
