import { getAllNotificationApi } from '@/api/functions/notifications';
import { queryKeys } from '@/config/constants';
import { useNotificationHandler } from '@/hooks/useNotificationHandler';
import { Box, CircularProgress, List, ListItem, ListItemText, Typography } from '@mui/material';
import { useInfiniteQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import InfiniteScroll from 'react-infinite-scroll-component';

function NotificationList() {
  const { markNotificationRead } = useNotificationHandler();
  const { data, fetchNextPage, hasNextPage, isLoading, isError } = useInfiniteQuery({
    queryKey: queryKeys.notificationListAll,
    queryFn: ({ pageParam = 1 }) => getAllNotificationApi({ page: pageParam as number, limit: 10 }),
    initialPageParam: 1,
    getNextPageParam: lastPage => {
      if (!lastPage || !lastPage.data) {
        return undefined;
      }

      const { page, totalPages } = lastPage.data;

      if (typeof page !== 'number' || typeof totalPages !== 'number') {
        return undefined;
      }

      return page < totalPages ? page + 1 : undefined;
    },
    refetchOnMount: true,
  });

  const allNotifications = data?.pages?.flatMap(page => page?.data?.docs ?? []) ?? [];

  if (isLoading) {
    return (
      <Box display='flex' justifyContent='center' py={4}>
        <CircularProgress size={24} />
      </Box>
    );
  }

  if (isError) {
    return (
      <Typography textAlign='center' py={2} color='error'>
        Failed to load notifications
      </Typography>
    );
  }

  if (!allNotifications.length) {
    return (
      <Typography textAlign='center' py={2} color='text.secondary'>
        No notifications
      </Typography>
    );
  }

  return (
    <InfiniteScroll
      dataLength={allNotifications.length}
      next={fetchNextPage}
      hasMore={hasNextPage ?? false}
      loader={
        <Box display='flex' justifyContent='center' py={2}>
          <CircularProgress size={20} />
        </Box>
      }
      height={360}
      style={{
        overflowX: 'hidden',
      }}
      scrollThreshold={0.9}
      endMessage={
        <Box display='flex' justifyContent='center' py={2}>
          <Typography variant='caption' color='text.disabled'>
            No more notifications
          </Typography>
        </Box>
      }
    >
      <List disablePadding>
        {allNotifications.map(notif => (
          <ListItem
            key={notif._id}
            alignItems='flex-start'
            sx={{
              bgcolor: notif.is_read ? 'transparent' : 'action.hover',
              borderRadius: 1,
              my: 0.5,
              mx: 0.5,
              cursor: 'pointer',
              '&:hover': { bgcolor: 'action.selected' },
            }}
            onClick={() => {
              const baseUrl = window.location.origin;

              markNotificationRead(notif.uid);

              if (notif.data.type === 'session_requested') {
                window.open(
                  `${baseUrl}/interpreter/dashboard/?sessionDetail=${notif.data?.session_id}`,
                  '_blank'
                );
                return;
              }

              if (notif.data.type === 'session_accepted') {
                window.open(
                  `${baseUrl}/user/dashboard/?sessionDetail=${notif.data?.session_id}`,
                  '_blank'
                );
                return;
              }

              if (notif.data.type === 'session_updated') {
                window.open(
                  `${baseUrl}/interpreter/dashboard/?sessionDetail=${notif.data?.session_id}`,
                  '_blank'
                );
                return;
              }

              if (notif.data.type === 'scheduled_session_updated') {
                window.open(
                  `${baseUrl}/interpreter/dashboard/?sessionDetail=${notif.data?.session_id}`,
                  '_blank'
                );
                return;
              }

              if (notif.data.type === 'subscription_sharing') {
                window.open(`${baseUrl}/user/dashboard/payment-subscription/?section=invitation`);
              }
            }}
          >
            <ListItemText
              primary={
                <Typography variant='subtitle2' fontWeight={notif.is_read ? 400 : 600}>
                  {notif.data.title}
                </Typography>
              }
              secondary={
                <Box component='div'>
                  <Typography
                    component='span'
                    variant='body2'
                    color='text.secondary'
                    display='block'
                    noWrap
                    sx={{ maxWidth: 260 }}
                  >
                    {notif.data.body}
                  </Typography>
                  <Typography component='span' variant='caption' color='text.disabled'>
                    {dayjs(notif.sent_at).fromNow()}
                  </Typography>
                </Box>
              }
            />
          </ListItem>
        ))}
      </List>
    </InfiniteScroll>
  );
}

export default NotificationList;
