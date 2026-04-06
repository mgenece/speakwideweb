'use client';
import FileDisputeInt from '@/components/FileDisputeModalContent/FileDisputeInt';
import RatingModalContent from '@/components/RatingModalContent/RatingModalContent';
import { useInfiniteSessionList } from '@/hooks/useInfiniteSessionList';
import { calculateDuration, formatDateTime } from '@/lib/functions/_helpers.lib';
import {
  CustomMenuPaper,
  TabsWrapperPaper,
} from '@/styles/StyledComponents/DashboardMainTabStyled';
import ClockIcon from '@/ui/Icons/ClockIcon';
import MenuChatHistoryIcon from '@/ui/Icons/MenuChatHistoryIcon';
import MenuDotIcon from '@/ui/Icons/MenuDotIcon';
import MenuRaiseIcon from '@/ui/Icons/MenuRaiseIcon';
import MuiModalWrapper from '@/ui/Modal/MuiModalWrapper';
import {
  Box,
  CircularProgress,
  IconButton,
  List,
  ListItem,
  Menu,
  MenuItem,
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
import InfiniteScroll from 'react-infinite-scroll-component';

const CompletedTab = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedSessionId, setSelectedSessionId] = useState('');
  const [modalData, setModalData] = useState({ sessionId: '', type: '' });

  const router = useRouter();

  const { sessions, fetchMoreData, hasNextPage, isLoading, isError } = useInfiniteSessionList({
    listType: 'completed',
    itemsPerPage: 10,
  });

  const open = Boolean(anchorEl);

  const actions = [
    // { label: 'Provide Feedback', key: 'feedback', icon: <MenuFeedbackIcon /> },
    { label: 'Raise a Dispute', key: 'dispute', icon: <MenuRaiseIcon /> },
    { label: 'Chat History', key: 'chat', icon: <MenuChatHistoryIcon /> },
  ];

  const onMenuOpen = (event: React.MouseEvent<HTMLElement>, sessionId: string) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
    setSelectedSessionId(sessionId);
  };

  const handleAction = (key: string) => {
    handleMenuClose();
    switch (key) {
      case 'feedback':
        setModalData({ sessionId: selectedSessionId, type: 'feedback' });
        break;
      case 'dispute':
        setModalData({ sessionId: selectedSessionId, type: 'dispute' });
        break;
      case 'chat':
        router.push(`/interpreter/dashboard/chat-history/?session=${selectedSessionId}`);
        break;
      default:
        console.warn('Unhandled menu action:', key);
    }
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedSessionId('');
    setModalData({ sessionId: '', type: '' });
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
    <>
      <TabsWrapperPaper>
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
                              <ClockIcon />
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
                          <IconButton onClick={event => onMenuOpen(event, item._id)} disableRipple>
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
      </TabsWrapperPaper>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        slotProps={{
          paper: { elevation: 0, component: CustomMenuPaper },
        }}
      >
        {actions.map(({ label, key, icon }) => (
          <MenuItem key={key} onClick={() => handleAction(key)}>
            {icon} {label}
          </MenuItem>
        ))}
      </Menu>

      <MuiModalWrapper
        open={modalData.type === 'dispute'}
        onClose={() => setModalData({ sessionId: '', type: '' })}
        className='file-dispute-modal'
        isHeadingContainerWithTitle
        containerHeading='File Dispute'
      >
        <FileDisputeInt
          handleClose={() => setModalData({ sessionId: '', type: '' })}
          sessionId={modalData.sessionId}
        />
      </MuiModalWrapper>

      <MuiModalWrapper
        open={modalData.type === 'feedback'}
        onClose={() => setModalData({ sessionId: '', type: '' })}
        className='rating-modal'
      >
        <RatingModalContent
          sessionId={modalData.sessionId}
          handleClose={() => setModalData({ sessionId: '', type: '' })}
        />
      </MuiModalWrapper>
    </>
  );
};

export default CompletedTab;
