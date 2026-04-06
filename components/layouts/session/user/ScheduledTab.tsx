import { cancelSessionApi } from '@/api/functions/session.api';
import RequestSessionEdit from '@/components/RequestSessionModalContent/RequestSessionEdit';
import { queryKeys } from '@/config/constants';
import { useInfiniteClientSessionList } from '@/hooks/useInfiniteClientSessionList';
import { scheduleActionlist } from '@/json/mock/demo.mock';
import { calculateDuration, formatDateTime, getJoinStatus } from '@/lib/functions/_helpers.lib';
import { queryClient } from '@/pages/_app';
import {
  CustomMenuPaper,
  TabsWrapperPaper,
} from '@/styles/StyledComponents/DashboardMainTabStyled';
import CustomButtonPrimary from '@/ui/CustomButtons/CustomButtonPrimary';
import ClockIcon from '@/ui/Icons/ClockIcon';
import LocationOnIcon from '@/ui/Icons/LocationOnIcon';
import MenuDotIcon from '@/ui/Icons/MenuDotIcon';
import WarningIcon from '@/ui/Icons/WarningIcon';
import MuiModalWrapper from '@/ui/Modal/MuiModalWrapper';
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
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
} from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useState } from 'react';
import toast from 'react-hot-toast';
import InfiniteScroll from 'react-infinite-scroll-component';
import ButtonCommon from '../../common/ButtonCommon';

const ScheduledTab = () => {
  const router = useRouter();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(null);
  const [editSession, setEditSession] = useState(false);
  const open = Boolean(anchorEl);

  const cancelSessionMutation = useMutation({
    mutationFn: cancelSessionApi,
    onSuccess: () => {
      toast.success('Session cancelled successfully!');
      queryClient.invalidateQueries({ queryKey: queryKeys.clientSessionList('') });
      setCancelOpen(false);
    },
  });

  // const [modalOpen, setModalOpen] = useState(false);
  const [cancelOpen, setCancelOpen] = useState(false);

  const { sessions, fetchMoreData, hasNextPage, isLoading, isError } = useInfiniteClientSessionList(
    {
      listType: 'schedule',
      itemsPerPage: 10,
    }
  );

  const handleCancelToggle = () => setCancelOpen(prev => !prev);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>, sessionId: string) => {
    setAnchorEl(event.currentTarget);
    setSelectedSessionId(sessionId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMenuAction = (actionLabel: string) => {
    handleMenuClose();
    if (actionLabel === 'Cancel Session') {
      handleCancelToggle();
      return;
    }

    if (actionLabel === 'Session Details') {
      if (selectedSessionId) {
        router.replace({
          pathname: router.pathname,
          query: { sessionDetail: selectedSessionId },
        });
      }
      return;
    }

    if (actionLabel === 'Edit Session Details') {
      setEditSession(true);
      return;
    }
  };

  // console.log(selectedSessionId, '***s');

  // Helper function to format date and time

  if (isLoading) {
    return (
      <TabsWrapperPaper elevation={0}>
        <Box display='flex' justifyContent='center' alignItems='center' minHeight='400px'>
          <CircularProgress />
        </Box>
      </TabsWrapperPaper>
    );
  }

  if (isError) {
    return (
      <TabsWrapperPaper elevation={0}>
        <Box display='flex' justifyContent='center' alignItems='center' minHeight='400px'>
          <Typography color='error'>Error loading sessions. Please try again.</Typography>
        </Box>
      </TabsWrapperPaper>
    );
  }

  return (
    <TabsWrapperPaper elevation={0}>
      <TableContainer
        id='scrollableDiv'
        sx={{
          maxHeight: '600px',
          overflow: 'auto',
          position: 'relative',
        }}
      >
        <InfiniteScroll
          dataLength={sessions.length}
          next={fetchMoreData}
          hasMore={hasNextPage || false}
          loader={
            <Box display='flex' justifyContent='center' padding={2}>
              <CircularProgress size={30} />
            </Box>
          }
          endMessage={
            sessions.length > 0 ? (
              <Box textAlign='center' padding={2}>
                <Typography variant='body2' color='textSecondary'>
                  No more sessions to load
                </Typography>
              </Box>
            ) : null
          }
          scrollableTarget='scrollableDiv'
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Session Number</TableCell>
                <TableCell>Date & Duration</TableCell>
                <TableCell>Description</TableCell>

                <TableCell align='center'>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sessions.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} align='center'>
                    <Typography variant='body2' color='textSecondary' py={3}>
                      No sessions found
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                sessions.map(item => {
                  const { day, time } = formatDateTime(item.start_date_time);
                  const duration = calculateDuration(item.start_date_time, item.end_date_time);

                  return (
                    <TableRow key={item._id}>
                      <TableCell>{item.session_ref_number}</TableCell>
                      <TableCell>
                        <Typography variant='body1' fontWeight={600}>
                          {day}
                        </Typography>
                        <Stack direction='row' gap={1} alignItems='center'>
                          <ClockIcon />
                          <Typography>
                            {time} ({duration})
                          </Typography>
                        </Stack>
                        {item.location && (
                          <Stack direction='row' gap={1} alignItems='center'>
                            <LocationOnIcon />
                            <Typography variant='body2'>{item.location}</Typography>
                          </Stack>
                        )}
                      </TableCell>

                      <TableCell>
                        <Typography fontWeight={500}>
                          {item.language_one} - {item.language_two}
                        </Typography>
                        <Typography variant='caption' color='textSecondary'>
                          {item.type} • {item.format}
                        </Typography>
                      </TableCell>

                      <TableCell align='center'>
                        <Stack direction={'row'} gap={2} width={10}>
                          <Button
                            variant='contained'
                            color='primary'
                            sx={{
                              minWidth: '100px',
                              padding: '4px 4px',
                              fontSize: '0.75rem',
                            }}
                            onClick={() => {
                              const { canJoin, joinAvailableAt } = getJoinStatus({
                                startDateTime: item.start_date_time,
                                endDateTime: item.end_date_time,
                              });
                              if (canJoin) {
                                const url = `${router.basePath}/user/dashboard/session?id=${item?._id}`;
                                window.open(url, '_blank');
                              } else {
                                toast.error(
                                  `Meeating has not started yet. You can join on ${joinAvailableAt}.`
                                );
                              }
                            }}
                          >
                            Join Session
                          </Button>
                          <IconButton onClick={e => handleMenuClick(e, item._id)} disableRipple>
                            <MenuDotIcon />
                          </IconButton>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </InfiniteScroll>
      </TableContainer>

      {/* ******** Menu ******** */}

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        slotProps={{
          paper: {
            elevation: 0,
            component: CustomMenuPaper,
          },
        }}
      >
        {scheduleActionlist.map((action, idx) => (
          <MenuItem key={idx} onClick={() => handleMenuAction(action.label)}>
            {action.icon} {action.label}
          </MenuItem>
        ))}
      </Menu>

      <MuiModalWrapper
        open={editSession}
        onClose={() => setEditSession(false)}
        isHeadingContainerWithTitle
        containerHeading='Edit Session'
      >
        <RequestSessionEdit
          handleClose={() => setEditSession(false)}
          id={selectedSessionId as string}
        />
      </MuiModalWrapper>

      {/* ******** Cancel ******** */}

      <MuiModalWrapper open={cancelOpen} onClose={handleCancelToggle}>
        <Box className='cancel-session-modal'>
          <Stack direction='row' alignItems='center' gap={1.5}>
            <WarningIcon />
            <Typography>CANCEL THIS SESSION</Typography>
          </Stack>
          <Typography mt={2}>Are you sure you want to cancel this session?</Typography>
          <Stack direction='row' justifyContent='flex-end' mt={3} gap={2}>
            <CustomButtonPrimary variant='outlined' onClick={handleCancelToggle}>
              No
            </CustomButtonPrimary>
            <ButtonCommon
              isLoading={cancelSessionMutation.isPending}
              variant='contained'
              onClick={() => {
                if (selectedSessionId) cancelSessionMutation.mutate(selectedSessionId);
              }}
            >
              Yes, Cancel
            </ButtonCommon>
          </Stack>
        </Box>
      </MuiModalWrapper>
    </TabsWrapperPaper>
  );
};

export default ScheduledTab;
