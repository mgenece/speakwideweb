import { useInfiniteSessionList } from '@/hooks/useInfiniteSessionList';
import { scheduleIntActionlist } from '@/json/mock/demo.mock';
import { calculateDuration, formatDateTime, getJoinStatus } from '@/lib/functions/_helpers.lib';
import {
  CustomMenuPaper,
  TabsWrapperPaper,
} from '@/styles/StyledComponents/DashboardMainTabStyled';
import ClockIcon from '@/ui/Icons/ClockIcon';
import MenuDotIcon from '@/ui/Icons/MenuDotIcon';
import {
  Box,
  Button,
  CircularProgress,
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
} from '@mui/material';
import { useRouter } from 'next/router';
import { useState } from 'react';
import toast from 'react-hot-toast';
import InfiniteScroll from 'react-infinite-scroll-component';
import CancelSession from './CancelSession';

const ScheduledTab = () => {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [modalData, setModalData] = useState({ sessionId: '', type: '' });
  const handleMenuClose = () => {
    setAnchorEl(null);
    setModalData({ sessionId: '', type: '' });
  };

  const { sessions, fetchMoreData, hasNextPage, isLoading, isError } = useInfiniteSessionList({
    listType: 'schedule',
    itemsPerPage: 10,
  });

  const handleMenuAction = (actionLabel: string) => {
    if (actionLabel === 'Session Details') {
      router.replace({
        pathname: router.pathname,
        query: { sessionDetail: modalData.sessionId },
      });
      return;
    }

    if (actionLabel === 'Request Cancellation') {
      setModalData(prev => ({ ...prev, type: 'cancel' }));
      return;
    }
  };

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
    <TabsWrapperPaper>
      <TableContainer
        id='scrollableDiv'
        sx={{
          maxHeight: 'calc(100vh - 350px)',
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
                <TableCell>Client Name</TableCell>
                <TableCell>Session Date & Duration</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Location</TableCell>
                <TableCell align='center'>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sessions.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} align='center'>
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
                      <TableCell className='sessRefTd'>{item.session_ref_number}</TableCell>
                      <TableCell className='clntNmTd'>{item.client}</TableCell>
                      <TableCell className='clntTimeTd'>
                        <Typography variant='body1'>{day}</Typography>
                        <List disablePadding>
                          <ListItem disablePadding sx={{ gap: 0.5 }}>
                            <i>
                              <ClockIcon />
                            </i>
                            <Typography fontWeight={600}>
                              {time} ({duration})
                            </Typography>
                          </ListItem>
                        </List>
                      </TableCell>
                      <TableCell className='langSecTd'>
                        <Typography variant='body2'>
                          {item.language_one} - {item.language_two}
                        </Typography>
                        <Typography variant='caption' color='textSecondary'>
                          {item.type} • {item.format}
                        </Typography>
                      </TableCell>
                      <TableCell className='locationscTd'>
                        {item.location || 'No location specified'}
                      </TableCell>
                      <TableCell align='center' className='viewdtlsTd'>
                        <Stack direction={'row'} gap={0.5}>
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
                                const url = `${router.basePath}/interpreter/dashboard/session?id=${item?._id}`;

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
                          <IconButton
                            onClick={event => {
                              setAnchorEl(event.currentTarget);
                              setModalData(prev => ({ ...prev, sessionId: item._id }));
                            }}
                            disableRipple
                          >
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

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        slotProps={{
          paper: {
            elevation: 0,
            component: CustomMenuPaper,
          },
        }}
      >
        {scheduleIntActionlist.map((action, idx) => (
          <MenuItem key={idx} onClick={() => handleMenuAction(action.label)}>
            {action.icon} {action.label}
          </MenuItem>
        ))}
      </Menu>

      {/* CANCEL SCHEDULE SESSION MODAL START HERE */}
      <CancelSession
        isOpen={modalData.type === 'cancel'}
        handleClose={() => {
          handleMenuClose();
        }}
        sessionId={modalData.sessionId}
      />
    </TabsWrapperPaper>
  );
};

export default ScheduledTab;
