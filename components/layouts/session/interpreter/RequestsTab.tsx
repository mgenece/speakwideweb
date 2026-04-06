'use client';
import { useInfiniteSessionList } from '@/hooks/useInfiniteSessionList';
import { calculateDuration, formatDateTime } from '@/lib/functions/_helpers.lib';
import { TabsWrapperPaper } from '@/styles/StyledComponents/DashboardMainTabStyled';

import ClockIcon from '@/ui/Icons/ClockIcon';
import {
  Box,
  Button,
  CircularProgress,
  List,
  ListItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { useRouter } from 'next/router';
import InfiniteScroll from 'react-infinite-scroll-component';

const RequestsTab = () => {
  const router = useRouter();

  const { sessions, fetchMoreData, hasNextPage, isLoading, isError } = useInfiniteSessionList({
    listType: 'request',
    itemsPerPage: 10,
  });

  const handleOpenDrawer = (id: string) => {
    router.replace({
      pathname: router.pathname,
      query: { sessionDetail: id },
    });
  };

  if (isLoading) {
    return (
      <Box display='flex' justifyContent='center' alignItems='center' minHeight='400px'>
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return (
      <Box display='flex' justifyContent='center' alignItems='center' minHeight='400px'>
        <Typography color='error'>Error loading sessions. Please try again.</Typography>
      </Box>
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
                        <Button
                          onClick={() => handleOpenDrawer(item._id)}
                          className='textBtn'
                          disableRipple
                        >
                          View Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </InfiniteScroll>
      </TableContainer>

      {/* Drawer */}
    </TabsWrapperPaper>
  );
};

export default RequestsTab;
