import FileDisputeModalContent from '@/components/FileDisputeModalContent/FileDisputeModalContent';
import RatingModalContent from '@/components/RatingModalContent/RatingModalContent';
import RequestSessionModalContent from '@/components/RequestSessionModalContent/RequestSessionModalContent';
import assest from '@/json/assest';
import { interpreterSessionRequestTableData } from '@/json/mock/demo.mock';
import { RequestedAppointmentDrawerStyled } from '@/styles/StyledComponents/ RequestedAppointmentDrawerStyled';
import { CancelScheduleSessionStyled } from '@/styles/StyledComponents/CancelScheduleSessionStyled';
import { InterpreterTabsWrapperPaper } from '@/styles/StyledComponents/DashboardMainTabStyled';
import { ISessionTabsChildProps } from '@/typescript/interface/commonall.interface';
import CustomButtonPrimary from '@/ui/CustomButtons/CustomButtonPrimary';
import CalenderIcon2 from '@/ui/Icons/CalenderIcon2';
import CancelSessionIcon from '@/ui/Icons/CancelSessionIcon';
import ClockIcon from '@/ui/Icons/ClockIcon';
import CopyIcon from '@/ui/Icons/CopyIcon';
import CrossIcon2 from '@/ui/Icons/CrossIcon2';
import EmailIcon from '@/ui/Icons/EmailIcon';
import InfoIcon from '@/ui/Icons/InfoIcon';
import LanguageIcon from '@/ui/Icons/LanguageIcon';
import LanguageIcon2 from '@/ui/Icons/LanguageIcon2';
import MapIcon from '@/ui/Icons/MapIcon';
import PendingIcon2 from '@/ui/Icons/PendingIcon2';
import PersonIcon from '@/ui/Icons/PersonIcon';
import PhoneIcon from '@/ui/Icons/PhoneIcon';
import ProfileIcon from '@/ui/Icons/ProfileIcon';
import ReminderIcon from '@/ui/Icons/ReminderIcon';
import VideoIcon from '@/ui/Icons/VideoIcon';
import WarningIcon from '@/ui/Icons/WarningIcon';
import MuiModalWrapper from '@/ui/Modal/MuiModalWrapper';
import {
  Box,
  Button,
  Grid2,
  IconButton,
  List,
  ListItem,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useTheme,
} from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';

const InterpreterSessionTabsWrapper1 = ({ tabType }: ISessionTabsChildProps) => {
  const theme = useTheme();
  const router = useRouter();

  //   const sessionListQuery = useQuery({
  //     queryKey: queryKeys.interpreterSessionList('schedule'),
  //     queryFn: () => getInterpreterSessions({ list_type: 'schedule' }),
  //     enabled: tabType === 'Active',
  //   });

  const sessionId = '';

  const getTableData = () => {
    switch (tabType) {
      case 'Active':
        return interpreterSessionRequestTableData;
      case 'Declined':
        return interpreterSessionRequestTableData;
      case 'Completed':
        return interpreterSessionRequestTableData;
      default:
        return [];
    }
  };

  const tableData = getTableData();

  const [modalOpen, setModalOpen] = React.useState(false);
  const handleModalOpen = () => {
    setModalOpen(!modalOpen);
  };

  const [cnacel, setCnacel] = React.useState(false);
  const handleCnacel = () => {
    setCnacel(!cnacel);
  };

  const [isRatingModalOpen, setIsRatingModalOpen] = React.useState(false);
  const handleRatingModalToggle = () => {
    setIsRatingModalOpen(!isRatingModalOpen);
  };

  const [isDisputeModalOpen, setIsDisputeModalOpen] = React.useState(false);
  const handleDisputeModalToggle = () => {
    setIsDisputeModalOpen(!isDisputeModalOpen);
  };

  const [isRequestDrawerOpen, setIsRequestDrawerOpen] = React.useState(false);
  const handleToggleRequestDrawer = () => {
    setIsRequestDrawerOpen(!isRequestDrawerOpen);
  };

  const [isRequestCancelModalOpen, setIsRequestCancelModalOpen] = React.useState(false);
  const handleToggleRequestCancelModal = () => {
    setIsRequestCancelModalOpen(!isRequestCancelModalOpen);
  };

  const [isScheduledDrawerOpen, setIsScheduledDrawerOpen] = React.useState(false);
  const handleToggleScheduledDrawer = () => {
    setIsScheduledDrawerOpen(!isScheduledDrawerOpen);
  };

  return (
    <InterpreterTabsWrapperPaper elevation={0} className='session-tabs'>
      <TableContainer>
        <Table>
          <TableHead>
            {tabType === 'Completed' ? (
              <TableRow>
                <TableCell sx={{ minWidth: '180px' }}>Client Name</TableCell>
                <TableCell sx={{ minWidth: '300px' }}>Session Date & Duration</TableCell>
                <TableCell sx={{ minWidth: '200px' }}>Topic</TableCell>
                <TableCell sx={{ minWidth: '200px' }}>Format</TableCell>
                <TableCell sx={{ minWidth: '200px' }}>Location</TableCell>
                <TableCell align='center' sx={{ minWidth: '180px' }}>
                  Action
                </TableCell>
              </TableRow>
            ) : tabType === 'Declined' ? (
              <TableRow>
                <TableCell sx={{ minWidth: '180px' }}>Client Name</TableCell>
                <TableCell sx={{ minWidth: '280px' }}>Session Date & Duration</TableCell>
                <TableCell sx={{ minWidth: '200px' }}>Topic</TableCell>
                <TableCell sx={{ minWidth: '200px' }}>Format</TableCell>
                <TableCell sx={{ minWidth: '280px' }}>Location</TableCell>
              </TableRow>
            ) : (
              <TableRow>
                <TableCell sx={{ minWidth: '180px' }}>Client Name</TableCell>
                <TableCell sx={{ minWidth: '300px' }}>Session Date & Duration</TableCell>
                <TableCell sx={{ minWidth: '200px' }}>Topic</TableCell>
                <TableCell sx={{ minWidth: '200px' }}>Format</TableCell>
                <TableCell sx={{ minWidth: '200px' }}>Location</TableCell>
                <TableCell align='center'>Action</TableCell>
              </TableRow>
            )}
          </TableHead>
          <TableBody>
            {tableData.map((item, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Typography variant='body1' fontWeight={400} mb={'3px'}>
                    {item.clientName}
                  </Typography>
                </TableCell>
                <TableCell>
                  {/* {item?.interpreterName && (
                    <Typography variant='body1' fontWeight={400} mb={'3px'}>
                      {item?.interpreterName}
                    </Typography>
                  )} */}
                  <Typography variant='body1' fontWeight={400}>
                    {item.day}
                  </Typography>
                  <List disablePadding className='duration-list'>
                    <ListItem disablePadding>
                      <i>
                        <ClockIcon />
                      </i>
                      <Typography variant='body1' fontWeight={600}>
                        {item.time}{' '}
                        <span
                          style={{
                            color: theme.palette.customColors.placeText,
                            fontWeight: 400,
                            fontStyle: 'italic',
                            marginLeft: '8px',
                          }}
                        >
                          English - Spanish
                        </span>
                      </Typography>
                    </ListItem>
                  </List>
                </TableCell>
                <TableCell>
                  <Typography
                    variant='body1'
                    fontWeight={500}
                    mb={'3px'}
                    sx={{ maxWidth: '128px', whiteSpace: 'normal' }}
                  >
                    {item.topic}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    variant='body1'
                    fontWeight={500}
                    sx={{ maxWidth: '190px', whiteSpace: 'normal' }}
                  >
                    {item.format}
                  </Typography>
                </TableCell>
                <TableCell>
                  {item.location && (
                    <Typography
                      variant='body1'
                      fontWeight={500}
                      sx={{ maxWidth: '190px', whiteSpace: 'normal' }}
                    >
                      {item.location}
                    </Typography>
                  )}
                </TableCell>
                {tabType === 'Declined' || tabType === 'Completed' ? null : (
                  <TableCell align='center'>
                    <Button
                      type='button'
                      className='primary-gradiant-btn join-session-btn'
                      disableRipple
                      aria-label='Join Session'
                      onClick={() => {
                        const url =
                          router.basePath + `/interpreter/dashboard/session?id=${sessionId}`;
                        window.open(url, '_blank');
                      }}
                    >
                      Join Session
                    </Button>
                  </TableCell>
                )}
                {tabType === 'Completed' && (
                  <TableCell align='center'>
                    <Button
                      type='button'
                      className='textBtn'
                      disableRipple
                      aria-label='Join Session'
                      onClick={handleToggleRequestDrawer}
                    >
                      View Details
                    </Button>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <MuiModalWrapper
        open={modalOpen}
        onClose={handleModalOpen}
        isHeadingContainerWithTitle
        containerHeading='Edit Session'
        className='requestSessionModal'
      >
        <RequestSessionModalContent handleClose={handleModalOpen} BottomButtonText='Save ' />
      </MuiModalWrapper>
      <MuiModalWrapper open={cnacel} onClose={handleCnacel} className='cnacelSessionModal'>
        <Box className='topBox'>
          <Stack direction={'row'} alignItems='center' gap={'14px'}>
            <i>
              <WarningIcon />
            </i>
            <Typography>CANCEL THIS SESSION</Typography>
          </Stack>
        </Box>
        <Box className='bottomBox'>
          <Typography className='cancelTextHeading'>
            Are you sure you want to cancel this session?
          </Typography>
          <Box className='cancelingText'>
            <i>
              <InfoIcon IconColor={theme.palette.error.main} />
            </i>
            <Typography>
              Cancelling this session may result in penalty fees according to our cancellation
              policy
            </Typography>
          </Box>
          <Stack
            direction='row'
            alignItems='center'
            justifyContent='flex-end'
            className='buttonGroup'
          >
            <CustomButtonPrimary
              variant='outlined'
              color='primary'
              className='coloredPrimaryButtonOutlined'
              onClick={handleCnacel}
            >
              No
            </CustomButtonPrimary>
            <CustomButtonPrimary
              variant='contained'
              color='primary'
              className='coloredPrimaryButton'
              onClick={handleCnacel}
            >
              Yes, Cancel
            </CustomButtonPrimary>
          </Stack>
        </Box>
      </MuiModalWrapper>

      {/* Rate your session Modal */}
      <MuiModalWrapper
        open={isRatingModalOpen}
        onClose={handleRatingModalToggle}
        className='rating-modal'
      >
        <RatingModalContent handleClose={handleRatingModalToggle} />
      </MuiModalWrapper>

      {/* File Dispute Modal */}
      <MuiModalWrapper
        open={isDisputeModalOpen}
        onClose={handleDisputeModalToggle}
        className='file-dispute-modal'
        isHeadingContainerWithTitle
        containerHeading='Request an Interpreter'
      >
        <FileDisputeModalContent handleClose={handleDisputeModalToggle} sessionId={''} />
      </MuiModalWrapper>

      {/* Session History Drawer */}
      <RequestedAppointmentDrawerStyled
        open={isRequestDrawerOpen}
        onClose={handleToggleRequestDrawer}
        anchor='right'
        className='session-history'
      >
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
            <Typography className='drawer-title'>Session History</Typography>
            <IconButton
              disableRipple
              aria-label='close-button'
              className='close-btn'
              onClick={handleToggleRequestDrawer}
            >
              <CrossIcon2 />
            </IconButton>
          </Stack>
        </Stack>
        <Box className='main-body'>
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
                            src={assest.reqUserImg}
                            width={62}
                            height={62}
                            alt='profile-image'
                          />
                        </figure>
                      </Box>
                      <Box className='right-box'>
                        <Typography className='user-name'>Jerome Bellingham</Typography>
                        <Stack
                          direction={'row'}
                          flexWrap={'wrap'}
                          rowGap={'10px'}
                          columnGap={'20px'}
                        >
                          <Stack direction={'row'} flexWrap={'wrap'} spacing={'10px'}>
                            <i className='icon'>
                              <PhoneIcon />
                            </i>
                            <Typography className='value' variant='body2'>
                              +56 231456789
                            </Typography>
                          </Stack>
                          <Stack direction={'row'} flexWrap={'wrap'} spacing={'10px'}>
                            <i className='icon'>
                              <EmailIcon />
                            </i>
                            <Typography className='value' variant='body2'>
                              john.doe@gmail.com
                            </Typography>
                          </Stack>
                          <Stack direction={'row'} flexWrap={'wrap'} spacing={'10px'}>
                            <i className='icon'>
                              <MapIcon IconWidth='14' IconHeight='14' />
                            </i>
                            <Typography className='value' variant='body2'>
                              George Street, Red Mine, New York USA
                            </Typography>
                          </Stack>
                        </Stack>
                      </Box>
                    </Stack>
                  </Box>
                </Box>
              </Box>
            </Grid2>
            <Grid2 size={{ xs: 12 }}>
              <Box className='common-box session-date'>
                <Typography className='cmn-head'>Session Date & Timings</Typography>
                <Box className='coloured-box'>
                  <Box className='profile-box'>
                    <Stack
                      direction={'row'}
                      alignItems={'center'}
                      flexWrap={'wrap'}
                      rowGap={'17px'}
                      columnGap={'30px'}
                    >
                      <Stack
                        direction={'row'}
                        alignItems={'center'}
                        flexWrap={'wrap'}
                        spacing={'10px'}
                      >
                        <i className='icon'>
                          <CalenderIcon2 />
                        </i>
                        <Typography className='value' variant='body2'>
                          13July, 2025
                        </Typography>
                      </Stack>
                      <Stack
                        direction={'row'}
                        alignItems={'center'}
                        flexWrap={'wrap'}
                        spacing={'10px'}
                      >
                        <i className='icon'>
                          <ReminderIcon />
                        </i>
                        <Typography className='value' variant='body2'>
                          10:00AM
                        </Typography>
                      </Stack>
                      <Stack
                        direction={'row'}
                        alignItems={'center'}
                        flexWrap={'wrap'}
                        spacing={'10px'}
                      >
                        <i className='icon'>
                          <PendingIcon2 />
                        </i>
                        <Typography className='value' variant='body2'>
                          45 mins
                        </Typography>
                      </Stack>
                      <Stack
                        direction={'row'}
                        alignItems={'center'}
                        flexWrap={'wrap'}
                        spacing={'10px'}
                      >
                        <i className='icon'>
                          <LanguageIcon2 />
                        </i>
                        <Typography className='value' variant='body2'>
                          English - Spanish
                        </Typography>
                      </Stack>
                      <Stack
                        direction={'row'}
                        alignItems={'center'}
                        flexWrap={'wrap'}
                        spacing={'10px'}
                      >
                        <i className='icon'>
                          <PersonIcon />
                        </i>
                        <Typography className='value' variant='body2'>
                          In Person
                        </Typography>
                      </Stack>
                    </Stack>
                  </Box>
                </Box>
              </Box>
            </Grid2>
            <Grid2 size={{ xs: 12 }}>
              <Box className='common-box desc-box'>
                <Typography className='cmn-head'>Description</Typography>
                <Box className='coloured-box'>
                  <Typography className='desc-content'>
                    Figma ipsum component variant main layer. Rotate pencil italic layout group
                    vertical star hand star. Auto arrow asset device connection component selection
                    frame inspect. Follower selection content pencil thumbnail rectangle line device
                    layer horizontal.
                  </Typography>
                </Box>
              </Box>
            </Grid2>
            <Grid2 size={{ xs: 12 }}>
              <Box className='common-box onsite-box'>
                <Typography className='cmn-head'>Onsite Location</Typography>
                <Box className='coloured-box'>
                  <Stack direction={'row'} alignItems={'center'} flexWrap={'wrap'} spacing={'10px'}>
                    <i className='icon'>
                      <MapIcon IconWidth='14' IconHeight='14' />
                    </i>
                    <Typography className='value' variant='body2'>
                      47 W 13th St, New York, NY 10011, USA
                    </Typography>
                  </Stack>
                </Box>
              </Box>
            </Grid2>
            <Grid2 size={{ xs: 12 }}>
              <CustomButtonPrimary
                disableRipple
                aria-label='View Chat History'
                fullWidth
                className='view-btn'
                onClick={() => router.push('/interpreter/dashboard/chat-history/')}
              >
                View Chat History
              </CustomButtonPrimary>
            </Grid2>
          </Grid2>
        </Box>
      </RequestedAppointmentDrawerStyled>

      {/* CANCEL SCHEDULE SESSION MODAL START HERE */}
      <MuiModalWrapper
        open={isRequestCancelModalOpen}
        onClose={handleToggleRequestCancelModal}
        className='subscriptionSessionModal'
      >
        <CancelScheduleSessionStyled>
          <Box className='subscription-cancel-sec'>
            <Box className='inner-box'>
              <i className='icon-wrap'>
                <CancelSessionIcon />
              </i>
              <Typography variant='h4' fontWeight={600}>
                Are you sure you want to cancel the scheduled session?
              </Typography>
              <Typography
                fontSize='14px'
                className='content'
                color={theme.palette.customColors.darkTextColor}
              >
                Cancelling this session may result in penalty fees according to our cancellation
                policy
              </Typography>
            </Box>
          </Box>
          <Stack
            direction='row'
            alignItems='center'
            justifyContent='center'
            flexWrap='wrap'
            className='btn-stack'
          >
            <Button
              variant='contained'
              color='primary'
              className='primaryBtn'
              onClick={handleToggleRequestCancelModal}
            >
              Yes
            </Button>
            <Button
              variant='contained'
              color='primary'
              className='no-btn'
              onClick={handleToggleRequestCancelModal}
            >
              No
            </Button>
          </Stack>
        </CancelScheduleSessionStyled>
      </MuiModalWrapper>

      {/* Scheduled Appointment Drawer */}
      <RequestedAppointmentDrawerStyled
        open={isScheduledDrawerOpen}
        onClose={handleToggleScheduledDrawer}
        anchor='right'
        className='scheduled-appointment'
      >
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
            <Typography className='drawer-title'>Scheduled Appointment</Typography>
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
                            src={assest.reqUserImg}
                            width={62}
                            height={62}
                            alt='profile-image'
                          />
                        </figure>
                      </Box>
                      <Box className='right-box'>
                        <Typography className='user-name'>Jerome Bellingham</Typography>
                        <Stack
                          direction={'row'}
                          flexWrap={'wrap'}
                          rowGap={'10px'}
                          columnGap={'20px'}
                        >
                          <Stack direction={'row'} flexWrap={'wrap'} spacing={'10px'}>
                            <i className='icon'>
                              <PhoneIcon />
                            </i>
                            <Typography className='value' variant='body2'>
                              +56 231456789
                            </Typography>
                          </Stack>
                          <Stack direction={'row'} flexWrap={'wrap'} spacing={'10px'}>
                            <i className='icon'>
                              <EmailIcon />
                            </i>
                            <Typography className='value' variant='body2'>
                              john.doe@gmail.com
                            </Typography>
                          </Stack>
                          <Stack direction={'row'} flexWrap={'wrap'} spacing={'10px'}>
                            <i className='icon'>
                              <MapIcon IconWidth='14' IconHeight='14' />
                            </i>
                            <Typography className='value' variant='body2'>
                              George Street, Red Mine, New York USA
                            </Typography>
                          </Stack>
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
                              Thrusday, 12 November, 9:00am - 10:00am
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
                              Video Call
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
                              Video
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
                              English, Spanish, German
                            </Typography>
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
                    Potter ipsum wand elf parchment wingardium. Woes eyes dervish parseltongue for.
                    Erumpent kedavra mimbletonia now witch quills hearing head trace. Map wheels i’d
                    hand pumpkin petrified splinched galleons granger. Now parchment kedavra
                    minister shack wizard mellow aragog quidditch stunning.
                  </Typography>
                </Box>
              </Box>
            </Grid2>
            <Grid2 size={{ xs: 12 }}>
              <Box className='common-box session-box'>
                <Typography className='cmn-head'>Link to Join</Typography>
                <Box className='coloured-box copy-box'>
                  <Stack
                    direction={'row'}
                    alignItems={'center'}
                    justifyContent={'space-between'}
                    flexWrap={'wrap'}
                  >
                    <Typography className='desc-content'>
                      https://georgetown.zoom.us/j/7749989447/hfgd/889438934
                    </Typography>
                    <IconButton disableRipple aria-label='copy-button' className='copy-button'>
                      <CopyIcon />
                    </IconButton>
                  </Stack>
                </Box>
              </Box>
            </Grid2>
          </Grid2>
        </Box>
        <Box className='btn-box'>
          <CustomButtonPrimary
            disableRipple
            variant='contained'
            aria-label='Sync To Calendar'
            fullWidth
            className='add-btn'
            onClick={() => {
              handleToggleScheduledDrawer();
              router.push('/interpreter/dashboard/update-availabality');
            }}
          >
            Sync To Calendar
          </CustomButtonPrimary>
        </Box>
      </RequestedAppointmentDrawerStyled>
    </InterpreterTabsWrapperPaper>
  );
};

export default InterpreterSessionTabsWrapper1;
