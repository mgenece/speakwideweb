import { mediaUrl } from '@/api/endpoints';
import { sessionDetailInterpreterApi } from '@/api/functions/session.api';
import { queryKeys } from '@/config/constants';
import assest from '@/json/assest';
import { RequestedAppointmentDrawerStyled } from '@/styles/StyledComponents/ RequestedAppointmentDrawerStyled';
import CustomButtonPrimary from '@/ui/CustomButtons/CustomButtonPrimary';
import CalenderIcon2 from '@/ui/Icons/CalenderIcon2';
import CrossIcon2 from '@/ui/Icons/CrossIcon2';
import EmailIcon from '@/ui/Icons/EmailIcon';
import LanguageIcon from '@/ui/Icons/LanguageIcon';
import LocationOnIcon from '@/ui/Icons/LocationOnIcon';
import ProfileIcon from '@/ui/Icons/ProfileIcon';
import VideoIcon from '@/ui/Icons/VideoIcon';
import { Box, Grid2, IconButton, Stack, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import Image from 'next/image';
import { useRouter } from 'next/router';

function AppointmentDetailsUser() {
  const router = useRouter();
  const { sessionDetail } = router.query;

  const sessionDetailQuery = useQuery({
    queryKey: queryKeys.interpreterSessionDetail(sessionDetail as string),
    queryFn: () => sessionDetailInterpreterApi(sessionDetail as string),
    enabled: Boolean(sessionDetail && typeof sessionDetail === 'string'),
  });

  const isScheduledDrawerOpen = Boolean(sessionDetail);
  const handleToggleScheduledDrawer = () => {
    router.back();
  };

  const data = sessionDetailQuery.data?.data ?? null;
  const interpreter = data?.approvedBy ?? null;

  const formatSessionDateRange = (startIso?: string, endIso?: string) => {
    if (!startIso || !endIso) return '—';
    const start = dayjs(startIso);
    const end = dayjs(endIso);

    const weekday = start.format('dddd');
    const date = start.format('DD MMMM');
    const startTime = start.format('h:mm A');
    const endTime = end.format('h:mm A');

    return `${weekday}, ${date}, ${startTime} - ${endTime}`;
  };

  return (
    <RequestedAppointmentDrawerStyled
      open={isScheduledDrawerOpen}
      onClose={handleToggleScheduledDrawer}
      anchor='right'
      className='scheduled-appointment'
    >
      <Stack
        direction='row'
        alignItems='center'
        justifyContent='space-between'
        className='head-stack'
      >
        <Stack direction='row' alignItems='center' spacing='10px'>
          {interpreter?._id ? (
            <Typography className='drawer-title'>Scheduled Appointment</Typography>
          ) : (
            <Typography className='drawer-title'>Requested Session</Typography>
          )}

          <IconButton
            disableRipple
            aria-label='close-button'
            className='close-btn'
            onClick={handleToggleScheduledDrawer}
          >
            <CrossIcon2 />
          </IconButton>
        </Stack>
      </Stack>

      <Box className='main-body'>
        <Typography variant='h5' pb={2}>
          Session Reference Number: {data?.session_ref_number}{' '}
        </Typography>
        {sessionDetailQuery.isLoading ? (
          <Box sx={{ p: 2 }}>
            <Typography>Loading session details...</Typography>
          </Box>
        ) : sessionDetailQuery.isError ? (
          <Box sx={{ p: 2 }}>
            <Typography color='error'>Failed to load session details.</Typography>
          </Box>
        ) : (
          <Grid2 container spacing='16px'>
            {/* Interpreter Section */}
            <Grid2 size={{ xs: 12 }}>
              <Box className='common-box'>
                <Typography className='cmn-head'>Interpreter</Typography>
                <Box className='coloured-box'>
                  <Box className='profile-box'>
                    <Stack direction={{ sm: 'row', xs: 'column' }} flexWrap='wrap'>
                      <Box className='left-box'>
                        <figure>
                          <Image
                            src={
                              interpreter?.profile_image
                                ? mediaUrl(`interpreter_profile_pic/${interpreter?.profile_image}`)
                                : assest.dashboardHeaderAvatarImage
                            }
                            width={62}
                            height={62}
                            alt='profile-image'
                          />
                        </figure>
                      </Box>
                      <Box className='right-box'>
                        {interpreter ? (
                          <>
                            <Typography className='user-name'>{interpreter.full_name}</Typography>
                            <Stack direction='row' flexWrap='wrap' rowGap='10px' columnGap='20px'>
                              <Stack direction='row' spacing='10px'>
                                <i className='icon'>
                                  <EmailIcon />
                                </i>
                                <Typography className='value'>
                                  {interpreter.email ?? '—'}
                                </Typography>
                              </Stack>
                            </Stack>
                          </>
                        ) : (
                          <>
                            <Typography className='user-name'>
                              Interpreter not assigned yet
                            </Typography>
                            <Typography className='value' variant='body2'>
                              This session currently has no assigned interpreter.
                            </Typography>
                          </>
                        )}
                      </Box>
                    </Stack>
                  </Box>
                </Box>
              </Box>
            </Grid2>

            {/* Session Info */}
            <Grid2 size={{ xs: 12 }}>
              <Box className='common-box session-box'>
                <Typography className='cmn-head'>Session Information</Typography>
                <Box className='coloured-box'>
                  <Grid2 container rowSpacing='20px' columnSpacing='40px'>
                    <Grid2 size={{ sm: 6.5, xs: 12 }}>
                      <Stack direction='row'>
                        <i className='icon'>
                          <CalenderIcon2 />
                        </i>
                        <Box className='right-part'>
                          <Typography className='label'>Date</Typography>
                          <Typography className='value'>
                            {formatSessionDateRange(data?.start_date_time, data?.end_date_time)}
                          </Typography>
                        </Box>
                      </Stack>
                    </Grid2>

                    <Grid2 size={{ sm: 5.5, xs: 12 }}>
                      <Stack direction='row'>
                        <i className='icon'>
                          <ProfileIcon />
                        </i>
                        <Box className='right-part'>
                          <Typography className='label'>Appointment Type</Typography>
                          <Typography className='value'>{data?.format?.title ?? '—'}</Typography>
                        </Box>
                      </Stack>
                    </Grid2>

                    <Grid2 size={{ sm: 6.5, xs: 12 }}>
                      <Stack direction='row'>
                        <i className='icon'>
                          <VideoIcon />
                        </i>
                        <Box className='right-part'>
                          <Typography className='label'>Session Platform</Typography>
                          <Typography className='value'>
                            {data?.type?.expertise_display_name ?? '—'}
                          </Typography>
                        </Box>
                      </Stack>
                    </Grid2>

                    <Grid2 size={{ sm: 5.5, xs: 12 }}>
                      <Stack direction='row'>
                        <i className='icon'>
                          <LanguageIcon />
                        </i>
                        <Box className='right-part'>
                          <Typography className='label'>Languages</Typography>
                          <Typography className='value'>
                            {[
                              data?.language_one?.language_display_name,
                              data?.language_two?.language_display_name,
                            ]
                              .filter(Boolean)
                              .join(', ') || '—'}
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
                          <Typography variant='body2'>{data?.location}</Typography>
                        </Box>
                      </Stack>
                    </Grid2>
                  </Grid2>
                </Box>
              </Box>
            </Grid2>

            {/* Description */}
            <Grid2 size={{ xs: 12 }}>
              <Box className='common-box session-box'>
                <Typography className='cmn-head'>Description</Typography>
                <Box className='coloured-box'>
                  <Typography className='desc-content'>
                    {data?.details ?? 'No description provided.'}
                  </Typography>
                </Box>
              </Box>
            </Grid2>
          </Grid2>
        )}
      </Box>

      <Box className='btn-box'>
        <CustomButtonPrimary
          disableRipple
          variant='contained'
          fullWidth
          className='add-btn'
          onClick={() => {}}
          disabled={!data}
        >
          Sync To Calendar
        </CustomButtonPrimary>
      </Box>
    </RequestedAppointmentDrawerStyled>
  );
}

export default AppointmentDetailsUser;
