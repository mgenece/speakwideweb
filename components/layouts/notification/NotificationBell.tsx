'use client';

import { getNotificationUnreadCount, markReadAllApi } from '@/api/functions/notifications';
import { queryKeys } from '@/config/constants';
import { useFcmToken } from '@/hooks/useFcmToken';
import { queryClient } from '@/pages/_app';
import CheckIcon from '@mui/icons-material/Check';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import NotificationsOffIcon from '@mui/icons-material/NotificationsOff';
import {
  Badge,
  Box,
  Button,
  Divider,
  IconButton,
  Popover,
  Stack,
  Switch,
  Typography,
} from '@mui/material';
import { useMutation, useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import React, { useState } from 'react';
import NotificationList from './NotificationList';

dayjs.extend(relativeTime);

export default function NotificationBell() {
  const { disableNotifications, enableNotifications } = useFcmToken();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [liveEnabled, setLiveEnabled] = useState(true);

  const readAllMutation = useMutation({
    mutationFn: markReadAllApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.notificationListAll });
      queryClient.invalidateQueries({ queryKey: queryKeys.unreadNotificationCount });
    },
  });

  const unreadCountQuery = useQuery({
    queryKey: queryKeys.unreadNotificationCount,
    queryFn: getNotificationUnreadCount,
  });

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const unreadCount = unreadCountQuery.data?.data?.unread_count || 0;

  const handleClose = () => {
    setAnchorEl(null);
  };

  const toggleLiveNotifications = () => {
    setLiveEnabled(prev => !prev);
    if (liveEnabled) {
      disableNotifications();
    } else {
      enableNotifications();
    }
  };

  const open = Boolean(anchorEl);

  return (
    <Box>
      <IconButton onClick={handleOpen} color='inherit'>
        {liveEnabled ? (
          <Badge
            color='error'
            variant={unreadCount ? 'standard' : 'dot'}
            invisible={unreadCount === 0}
            badgeContent={unreadCount}
          >
            <NotificationsNoneIcon />
          </Badge>
        ) : (
          <NotificationsOffIcon />
        )}
      </IconButton>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            width: 420,
            borderRadius: 2,
            boxShadow: 4,
            p: 1,
          },
        }}
      >
        {/* Header */}
        <Stack direction='row' justifyContent='space-between' alignItems='center' px={1.5} py={1}>
          <Typography variant='subtitle1' fontWeight={600}>
            Notifications
          </Typography>
          {unreadCount > 0 && (
            <Button
              size='small'
              startIcon={<CheckIcon />}
              onClick={() => {
                // console.log('markAllAsRead');
                readAllMutation.mutate();
              }}
            >
              Mark all read
            </Button>
          )}
        </Stack>

        <Divider />

        {/* Notification list - only render when popover is open */}
        {open && <NotificationList />}

        <Divider />

        {/* Live notification toggle */}
        <Stack direction='row' alignItems='center' justifyContent='space-between' px={1.5} py={1}>
          <Stack direction='row' alignItems='center' spacing={1}>
            <NotificationsOffIcon fontSize='small' color='action' />
            <Typography variant='body2'>Push Notifications</Typography>
          </Stack>
          <Switch checked={liveEnabled} onChange={toggleLiveNotifications} />
        </Stack>
      </Popover>
    </Box>
  );
}
