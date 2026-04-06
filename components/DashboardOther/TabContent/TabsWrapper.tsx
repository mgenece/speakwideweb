import FileDisputeModalContent from '@/components/FileDisputeModalContent/FileDisputeModalContent';
import RatingModalContent from '@/components/RatingModalContent/RatingModalContent';
import RequestSessionModalContent from '@/components/RequestSessionModalContent/RequestSessionModalContent';
import {
  completeActionlist,
  completeTableData,
  interpreterRequestTableData,
  requestActionlist,
  scheduleActionlist,
  scheduleTableData,
} from '@/json/mock/demo.mock';
import {
  CustomMenuPaper,
  TabsWrapperPaper,
} from '@/styles/StyledComponents/DashboardMainTabStyled';
import { IDashboardTabsChildProps } from '@/typescript/interface/commonall.interface';
import CustomButtonPrimary from '@/ui/CustomButtons/CustomButtonPrimary';
import CustomPagination from '@/ui/CustomPagination/CustomPagination';
import ClockIcon from '@/ui/Icons/ClockIcon';
import InfoIcon from '@/ui/Icons/InfoIcon';
import LocationOnIcon from '@/ui/Icons/LocationOnIcon';
import MenuDotIcon from '@/ui/Icons/MenuDotIcon';
import WarningIcon from '@/ui/Icons/WarningIcon';
import MuiModalWrapper from '@/ui/Modal/MuiModalWrapper';
import {
  Box,
  Button,
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
import { useRouter } from 'next/router';
import React from 'react';

const TabsWrapper = ({ tabType }: IDashboardTabsChildProps) => {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const theme = useTheme();

  // const userSessionList = useQuery({
  //   queryKey: queryKeys.userSessionList('schedule'),
  //   queryFn: () => getClientSessions({ list_type: 'schedule' }),
  //   enabled: tabType === 'Scheduled',
  // });

  // const sessionId = userSessionList.data?.data?.[0]?._id || '';

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
        return scheduleTableData;
      case 'Completed':
        return completeTableData;
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

  return (
    <TabsWrapperPaper elevation={0}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date & Duration</TableCell>
              <TableCell>Description</TableCell>
              <TableCell align={tabType === 'Scheduled' ? 'right' : 'center'}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.map((item, index) => (
              <TableRow key={index}>
                <TableCell>
                  {item.interpreterName && (
                    <Typography variant='body1' fontWeight={500} mb={'3px'}>
                      {item.interpreterName}
                    </Typography>
                  )}
                  <Typography variant='body1' fontWeight={600}>
                    {item.day}{' '}
                    {item.callHappen && (
                      <span style={{ fontWeight: 400, color: theme.palette.customColors.light }}>
                        (call is happening now)
                      </span>
                    )}
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
                            color: theme.palette.primary.main,
                            fontWeight: 400,
                            fontStyle: 'italic',
                            marginLeft: '8px',
                          }}
                        >
                          English - Spanish
                        </span>
                      </Typography>
                    </ListItem>
                    {item.address && (
                      <ListItem disablePadding>
                        <i>
                          <LocationOnIcon />
                        </i>
                        <Typography variant='body2'>{item.address}</Typography>
                      </ListItem>
                    )}
                  </List>
                </TableCell>
                <TableCell>
                  <Typography variant='body1' fontWeight={500}>
                    Presurgery consult & review
                  </Typography>
                </TableCell>
                <TableCell align='center'>
                  <Stack
                    direction='row'
                    alignItems='center'
                    justifyContent={tabType === 'Scheduled' ? 'flex-end' : 'center'}
                    className='action-btn-group'
                  >
                    {tabType === 'Scheduled' && item.isJoinSession ? (
                      <Button
                        variant='contained'
                        color='primary'
                        className='primaryBtn'
                        onClick={() => {
                          // const url = router.basePath + `/user/dashboard/session?id=${sessionId}`;
                          // window.open(url, '_blank');
                        }}
                      >
                        Join Session
                      </Button>
                    ) : null}
                    <IconButton
                      id='basic-button'
                      aria-controls={open ? 'basic-menu' : undefined}
                      aria-haspopup='true'
                      aria-expanded={open ? 'true' : undefined}
                      onClick={handleClick}
                      disableRipple
                    >
                      <MenuDotIcon />
                    </IconButton>
                  </Stack>
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
                    {(tabType === 'Requests'
                      ? requestActionlist
                      : tabType === 'Scheduled'
                        ? scheduleActionlist
                        : tabType === 'Completed'
                          ? completeActionlist
                          : []
                    ).map((data, index) => (
                      <MenuItem
                        onClick={() => {
                          if (data.label === 'Edit Session Details') {
                            handleModalOpen();
                          } else if (data.label === 'Cancel Session') {
                            handleCnacel();
                          } else if (data.label === 'Chat History') {
                            router.push('/user/dashboard/chat-history/');
                          } else if (data.label === 'Provide Feedback') {
                            handleRatingModalToggle();
                          } else if (data.label === 'Raise a Dispute') {
                            handleDisputeModalToggle();
                          } else {
                            handleClose();
                          }
                        }}
                        disableGutters
                        disableRipple
                        disableTouchRipple
                        key={index}
                      >
                        <i className={tabType === 'Scheduled' ? 'i-schedule' : undefined}>
                          {data.icon}
                        </i>{' '}
                        <span>{data.label}</span>
                      </MenuItem>
                    ))}
                  </Menu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <CustomPagination count={10} />
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
        containerHeading='File Dispute'
      >
        <FileDisputeModalContent handleClose={handleDisputeModalToggle} sessionId={''} />
      </MuiModalWrapper>
    </TabsWrapperPaper>
  );
};

export default TabsWrapper;
