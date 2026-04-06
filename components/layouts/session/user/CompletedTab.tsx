import { addRemoveFavouriteApi } from '@/api/functions/other.api';
import { getInvoiceApi } from '@/api/functions/pyment';
import FileDisputeModalContent from '@/components/FileDisputeModalContent/FileDisputeModalContent';
import RatingModalContent from '@/components/RatingModalContent/RatingModalContent';
import { queryKeys } from '@/config/constants';
import { useInfiniteClientSessionList } from '@/hooks/useInfiniteClientSessionList';
import { calculateDuration, formatDateTime } from '@/lib/functions/_helpers.lib';
import { queryClient } from '@/pages/_app';
import {
  CustomMenuPaper,
  TabsWrapperPaper,
} from '@/styles/StyledComponents/DashboardMainTabStyled';
import { IClientSession } from '@/typescript/interface/session.interface';
import ClockIcon from '@/ui/Icons/ClockIcon';
import LocationOnIcon from '@/ui/Icons/LocationOnIcon';
import MenuChatHistoryIcon from '@/ui/Icons/MenuChatHistoryIcon';
import MenuDotIcon from '@/ui/Icons/MenuDotIcon';
import MenuFeedbackIcon from '@/ui/Icons/MenuFeedbackIcon';
import MenuInvoiceIocn from '@/ui/Icons/MenuInvoiceIocn';
import MenuRaiseIcon from '@/ui/Icons/MenuRaiseIcon';
import MenuStarIcon from '@/ui/Icons/MenuStarIcon';
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
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import InfiniteScroll from 'react-infinite-scroll-component';

/* -------------------------------------------------------------------------- */
/*                          MAIN COMPONENT (PARENT)                           */
/* -------------------------------------------------------------------------- */

const CompletedTab = () => {
  const { sessions, fetchMoreData, hasNextPage, isLoading, isError } = useInfiniteClientSessionList(
    {
      listType: 'completed',
      itemsPerPage: 10,
    }
  );

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
                  <TableCell colSpan={3} align='center'>
                    <Typography variant='body2' color='textSecondary' py={3}>
                      No sessions found
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                sessions.map(item => <SessionRow key={item._id} item={item} />)
              )}
            </TableBody>
          </Table>
        </InfiniteScroll>
      </TableContainer>
    </TabsWrapperPaper>
  );
};

/* -------------------------------------------------------------------------- */
/*                               CHILD COMPONENT                              */
/* -------------------------------------------------------------------------- */

const SessionRow = ({ item }: { item: IClientSession }) => {
  const router = useRouter();

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [modalType, setModalType] = useState<'rating' | 'dispute' | null>(null);

  const open = Boolean(anchorEl);
  const { day, time } = useMemo(() => formatDateTime(item.start_date_time), [item.start_date_time]);
  const duration = useMemo(
    () => calculateDuration(item.start_date_time, item.end_date_time),
    [item.start_date_time, item.end_date_time]
  );

  const downloadInvoiceMutation = useMutation({
    mutationFn: getInvoiceApi,
    onSuccess: data => {
      const url = data?.data.url;
      if (window && url) window?.open(url, '_blank');
    },
  });

  const mutation = useMutation({
    mutationFn: addRemoveFavouriteApi,
    onSuccess: data => {
      toast.success(data?.message || 'Operation successful.');
      queryClient.invalidateQueries({ queryKey: queryKeys.listFavourite });
      queryClient.invalidateQueries({ queryKey: ['user-session-list'] });
      // router.push('/user/dashboard/favorite-list/');
    },
  });

  const actions = [
    { label: 'Provide Feedback', key: 'feedback', icon: <MenuFeedbackIcon /> },
    { label: 'Raise a Dispute', key: 'dispute', icon: <MenuRaiseIcon /> },
    { label: 'Chat History', key: 'chat', icon: <MenuChatHistoryIcon /> },
    { label: 'Download Invoice', key: 'invoice', icon: <MenuInvoiceIocn /> },
    {
      label: item.isFavorite ? 'Remove Interpreter from Favorites' : 'Add Interpreter to Favorites',
      key: 'favorite',
      icon: <MenuStarIcon />,
    },
  ];

  const handleMenuClick = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    setAnchorEl(e.currentTarget);
  };

  const handleMenuClose = () => setAnchorEl(null);

  const handleAction = (key: string) => {
    handleMenuClose();
    switch (key) {
      case 'feedback':
        setModalType('rating');
        break;
      case 'dispute':
        setModalType('dispute');
        break;
      case 'chat':
        router.push(`/user/dashboard/chat-history/?session=${item._id}`);
        break;
      case 'invoice':
        item?.transaction_details?.[0]?.invoiceId &&
          downloadInvoiceMutation.mutate(item?.transaction_details?.[0]?.invoiceId);
        // console.log(item?.transaction_details?.[0]?.invoiceId, '***');
        toast('Downloading invoice…');
        break;
      case 'favorite': {
        const interpreterId = item.interpreter_details?._id ?? '';
        if (!interpreterId) return toast.error('Interpreter not found.');
        mutation.mutate(interpreterId);
        break;
      }
      default:
        console.warn('Unhandled menu action:', key);
    }
  };

  return (
    <>
      <TableRow hover>
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
          <IconButton onClick={handleMenuClick} disableRipple>
            <MenuDotIcon />
          </IconButton>
        </TableCell>
      </TableRow>

      {/* Menu */}
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

      {/* Modals */}
      <MuiModalWrapper
        open={modalType === 'rating'}
        onClose={() => setModalType(null)}
        className='rating-modal'
      >
        <RatingModalContent handleClose={() => setModalType(null)} sessionId={item._id} />
      </MuiModalWrapper>

      <MuiModalWrapper
        open={modalType === 'dispute'}
        onClose={() => setModalType(null)}
        className='file-dispute-modal'
        isHeadingContainerWithTitle
        containerHeading='File Dispute'
      >
        <FileDisputeModalContent handleClose={() => setModalType(null)} sessionId={item._id} />
      </MuiModalWrapper>
    </>
  );
};

export default CompletedTab;
