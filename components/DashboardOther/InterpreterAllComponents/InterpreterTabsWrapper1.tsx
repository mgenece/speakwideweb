import FileDisputeModalContent from '@/components/FileDisputeModalContent/FileDisputeModalContent';
import RatingModalContent from '@/components/RatingModalContent/RatingModalContent';
import RequestSessionModalContent from '@/components/RequestSessionModalContent/RequestSessionModalContent';
import assest from '@/json/assest';
import { interpreterRequestTableData } from '@/json/mock/demo.mock';
import { RequestedAppointmentDrawerStyled } from '@/styles/StyledComponents/ RequestedAppointmentDrawerStyled';
import { CancelScheduleSessionStyled } from '@/styles/StyledComponents/CancelScheduleSessionStyled';
import {
  CustomMenuPaper,
  InterpreterTabsWrapperPaper,
} from '@/styles/StyledComponents/DashboardMainTabStyled';
import { IDashboardTabsChildProps } from '@/typescript/interface/commonall.interface';
import CustomButtonPrimary from '@/ui/CustomButtons/CustomButtonPrimary';
import CalenderIcon2 from '@/ui/Icons/CalenderIcon2';
import CancelSessionIcon from '@/ui/Icons/CancelSessionIcon';
import ClockIcon from '@/ui/Icons/ClockIcon';
import CopyIcon from '@/ui/Icons/CopyIcon';
import CrossIcon2 from '@/ui/Icons/CrossIcon2';
import EmailIcon from '@/ui/Icons/EmailIcon';
import InfoIcon from '@/ui/Icons/InfoIcon';
import LanguageIcon from '@/ui/Icons/LanguageIcon';
import MapIcon from '@/ui/Icons/MapIcon';
import MenuDotIcon from '@/ui/Icons/MenuDotIcon';
import PhoneIcon from '@/ui/Icons/PhoneIcon';
import ProfileIcon from '@/ui/Icons/ProfileIcon';
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
  Menu,
  MenuItem,
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
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

const InterpreterTabsWrapper1 = ({ tabType }: IDashboardTabsChildProps) => {
  const theme = useTheme();
  const router = useRouter();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const getTableData = () => {
    switch (tabType) {
      case 'Requests':
        return interpreterRequestTableData;
      case 'Scheduled':
        return interpreterRequestTableData;
      case 'Completed':
        return interpreterRequestTableData;
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
    <InterpreterTabsWrapperPaper elevation={0}>
      <TableContainer>
        <Table>
          <TableHead>
            {tabType === 'Completed' ? (
              <TableRow>
                <TableCell sx={{ minWidth: '180px' }}>Client Name</TableCell>
                <TableCell sx={{ minWidth: '280px' }}>Session Date & Duration</TableCell>
                <TableCell sx={{ minWidth: '200px' }}>Description</TableCell>
                <TableCell sx={{ minWidth: '280px' }}>Location</TableCell>
              </TableRow>
            ) : tabType === 'Scheduled' ? (
              <TableRow>
                <TableCell sx={{ minWidth: '180px' }}>Client Name</TableCell>
                <TableCell sx={{ minWidth: '280px' }}>Session Date & Duration</TableCell>
                <TableCell sx={{ minWidth: '200px' }}>Description</TableCell>
                <TableCell sx={{ minWidth: '280px' }}>Location</TableCell>
                <TableCell sx={{ minWidth: '280px' }}>Link</TableCell>
                <TableCell align='center'>Action</TableCell>
              </TableRow>
            ) : (
              <TableRow>
                <TableCell sx={{ minWidth: '180px' }}>Client Name</TableCell>
                <TableCell sx={{ minWidth: '300px' }}>Session Date & Duration</TableCell>
                <TableCell sx={{ minWidth: '200px' }}>Description</TableCell>
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
                  {item.interpreterName && (
                    <Typography variant='body1' fontWeight={400} mb={'3px'}>
                      {item.interpreterName}
                    </Typography>
                  )}
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
                            fontWeight: 500,
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
                    {item.description}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    variant='body1'
                    fontWeight={500}
                    sx={{ maxWidth: '190px', whiteSpace: 'normal' }}
                  >
                    47 W 13th St, New York, NY 10011, USA
                  </Typography>
                </TableCell>
                {tabType === 'Scheduled' && (
                  <TableCell align='left'>
                    <Link href='#url'>https://georgetown.zoom.us/j/7 ...</Link>
                  </TableCell>
                )}
                {tabType === 'Completed' || tabType === 'Scheduled' ? null : (
                  <TableCell align='center'>
                    <Button
                      type='button'
                      className='textBtn'
                      disableRipple
                      onClick={handleToggleRequestDrawer}
                    >
                      View Details
                    </Button>
                  </TableCell>
                )}

                {tabType === 'Scheduled' && (
                  <TableCell align='center'>
                    <IconButton
                      id='basic-button'
                      aria-controls={open ? 'basic-menu' : undefined}
                      aria-haspopup='true'
                      aria-expanded={open ? 'true' : undefined}
                      onClick={handleClick}
                      disableRipple
                      sx={{ transform: 'rotate(90deg)' }}
                    >
                      <MenuDotIcon />
                    </IconButton>

                    <Menu
                      id='basic-menu'
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleClose}
                      slotProps={{
                        paper: {
                          elevation: 0,
                          component: CustomMenuPaper,
                          sx: {
                            ul: {
                              padding: '10px 15px',
                            },

                            '&::before': {
                              content: '""',
                              display: 'block',
                              position: 'absolute',
                              top: 0,
                              right: 14,
                              width: 10,
                              height: 10,
                              bgcolor: 'background.paper',
                              transform: 'translateY(-50%) rotate(45deg)',
                              zIndex: 0,
                              boxShadow: '0px 5px 12px 0px #A393B81A',
                            },
                          },
                        },
                      }}
                      transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                    >
                      <MenuItem
                        onClick={() => {
                          handleClose();
                          handleToggleScheduledDrawer();
                        }}
                      >
                        Details
                      </MenuItem>
                      <MenuItem
                        onClick={() => {
                          handleClose();
                          handleToggleRequestCancelModal();
                        }}
                      >
                        Request Cancellation
                      </MenuItem>
                    </Menu>
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

      {/* Requested Appointment Drawer */}
      <RequestedAppointmentDrawerStyled
        open={isRequestDrawerOpen}
        onClose={handleToggleRequestDrawer}
        anchor='right'
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
            <Typography className='drawer-title'>Requested Appointment</Typography>
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
          </Grid2>
        </Box>
        <Box className='btn-box'>
          <CustomButtonPrimary
            disableRipple
            variant='contained'
            aria-label='Approve'
            fullWidth
            className='add-btn'
            onClick={handleToggleRequestDrawer}
          >
            Approve
          </CustomButtonPrimary>
          <CustomButtonPrimary
            disableRipple
            variant='outlined'
            aria-label='Decline'
            fullWidth
            className='cancel-btn'
            onClick={handleToggleRequestDrawer}
          >
            Decline
          </CustomButtonPrimary>
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
                    <Typography className='desc-content' sx={{ wordBreak: 'break-all' }}>
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

export default InterpreterTabsWrapper1;
