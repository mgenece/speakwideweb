'use client';

import RequestSessionEdit from '@/components/RequestSessionModalContent/RequestSessionEdit';
import { useInfiniteClientSessionList } from '@/hooks/useInfiniteClientSessionList';
import { requestActionlist } from '@/json/mock/demo.mock';
import { calculateDuration, formatDateTime } from '@/lib/functions/_helpers.lib';
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
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

interface IModalState {
  type: 'edit' | 'cancel' | '';
}

const RequestsTab = () => {
  const router = useRouter();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [selectedSessionId, setSelectedSessionId] = React.useState<string | null>(null);
  const open = Boolean(anchorEl);

  const [modalState, setModalState] = useState<IModalState>({ type: '' });

  const { sessions, fetchMoreData, hasNextPage, isLoading, isError } = useInfiniteClientSessionList(
    {
      listType: 'request',
      itemsPerPage: 10,
    }
  );

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>, sessionId: string) => {
    setAnchorEl(event.currentTarget);
    setSelectedSessionId(sessionId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleCloseModal = () => {
    setModalState({ type: '' });
    setSelectedSessionId(null);
  };

  const handleMenuAction = (actionLabel: string) => {
    handleMenuClose();
    if (actionLabel === 'Session Details') {
      if (selectedSessionId) {
        router.replace({
          pathname: router.pathname,
          query: { sessionDetail: selectedSessionId },
        });
      }
      return;
    }
    if (actionLabel === 'Cancel Session') {
      setModalState({ type: 'cancel' });
      return;
    }

    if (actionLabel === 'Edit Session Details') {
      setModalState({ type: 'edit' });
      return;
    }

    if (actionLabel === 'Request Change') {
      return;
    }

    router.push('/user/dashboard/chat-history/');
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
                        <IconButton onClick={e => handleMenuClick(e, item._id)} disableRipple>
                          <MenuDotIcon />
                        </IconButton>
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
        {requestActionlist.map((action, idx) => (
          <MenuItem key={idx} onClick={() => handleMenuAction(action.label)}>
            {action.icon} {action.label}
          </MenuItem>
        ))}
      </Menu>

      <MuiModalWrapper
        open={modalState.type === 'edit'}
        onClose={handleCloseModal}
        isHeadingContainerWithTitle
        containerHeading='Edit Session'
      >
        <RequestSessionEdit handleClose={handleCloseModal} id={selectedSessionId as string} />
      </MuiModalWrapper>

      <MuiModalWrapper open={modalState.type === 'cancel'} onClose={handleCloseModal}>
        <Box className='cancel-session-modal'>
          <Stack direction='row' alignItems='center' gap={1.5}>
            <WarningIcon />
            <Typography>CANCEL THIS SESSION</Typography>
          </Stack>
          <Typography mt={2}>Are you sure you want to cancel this session?</Typography>
          <Stack direction='row' justifyContent='flex-end' mt={3} gap={2}>
            <CustomButtonPrimary variant='outlined' onClick={handleCloseModal}>
              No
            </CustomButtonPrimary>
            <CustomButtonPrimary variant='contained' onClick={handleCloseModal}>
              Yes, Cancel
            </CustomButtonPrimary>
          </Stack>
        </Box>
      </MuiModalWrapper>
    </TabsWrapperPaper>
  );
};

export default RequestsTab;
