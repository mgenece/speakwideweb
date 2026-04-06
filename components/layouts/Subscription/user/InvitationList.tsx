import { inviteActionApi } from '@/api/functions/invitation';
import { useUserData } from '@/hooks/react-query/useVisitor';
import { queryClient } from '@/pages/_app';
import {
  AccessTime as AccessTimeIcon,
  Cancel as CancelIcon,
  CheckCircle as CheckCircleIcon,
  Email as EmailIcon,
  CardGiftcard as GiftIcon,
  ThumbDown as ThumbDownIcon,
  ThumbUp as ThumbUpIcon,
  Warning as WarningIcon,
} from '@mui/icons-material';
import {
  alpha,
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import dayjs from 'dayjs';
import React, { useState } from 'react';

export interface ISubscriptionGift {
  _id: string;
  subscriptionId: string;
  toUserMailId: string;
  toUserId: string;
  status: 'pending' | 'accepted' | 'rejected';
  grantedAt: string | null;
  createdAt: string;
  plan: {
    title: string;
    price: number;
    type: string;
  };
  senderUserDetails: {
    full_name: string;
    phone: string;
    email: string;
  };
}

interface SubscriptionGiftCardProps {
  data: ISubscriptionGift[];
}

interface ConfirmationModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  actionType: 'accept' | 'decline' | 'cancel';
  isLoading?: boolean;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  open,
  onClose,
  onConfirm,
  title,
  message,
  actionType,
  isLoading = false,
}) => {
  const getActionColor = () => {
    switch (actionType) {
      case 'accept':
        return 'success';
      case 'decline':
      case 'cancel':
        return 'error';
      default:
        return 'primary';
    }
  };

  return (
    <Dialog
      open={open}
      onClose={isLoading ? undefined : onClose}
      maxWidth='xs'
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          p: 1,
        },
      }}
    >
      <DialogTitle sx={{ pb: 1 }}>
        <Stack direction='row' alignItems='center' spacing={1}>
          <WarningIcon
            sx={{
              color: actionType === 'accept' ? 'success.main' : 'warning.main',
              fontSize: 28,
            }}
          />
          <Typography variant='h6' fontWeight='600'>
            {title}
          </Typography>
        </Stack>
      </DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ color: 'text.primary', fontSize: '0.95rem' }}>
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2, gap: 1 }}>
        <Button
          onClick={onClose}
          disabled={isLoading}
          variant='outlined'
          color='inherit'
          sx={{ borderRadius: 2, textTransform: 'none', minWidth: 80 }}
        >
          No
        </Button>
        <Button
          onClick={onConfirm}
          disabled={isLoading}
          variant='contained'
          color={getActionColor()}
          disableElevation
          sx={{
            borderRadius: 2,
            textTransform: 'none',
            minWidth: 80,
            color: 'white',
          }}
        >
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const SubscriptionCard: React.FC<SubscriptionGiftCardProps> = ({ data }) => {
  const theme = useTheme();
  const { invalidateUserData } = useUserData();

  const [confirmationModal, setConfirmationModal] = useState<{
    open: boolean;
    action: 'accepted' | 'declined' | 'revoked' | null;
    giftId: string | null;
    title: string;
    message: string;
    actionType: 'accept' | 'decline' | 'cancel';
  }>({
    open: false,
    action: null,
    giftId: null,
    title: '',
    message: '',
    actionType: 'accept',
  });

  const invitationAction = useMutation({
    mutationFn: inviteActionApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['invitation-list'] });
      invalidateUserData();
      // Reset modal state directly here to avoid stale closure
      setConfirmationModal({
        open: false,
        action: null,
        giftId: null,
        title: '',
        message: '',
        actionType: 'accept',
      });
    },
  });

  const handleOpenModal = (
    action: 'accepted' | 'declined' | 'revoked',
    giftId: string,
    planTitle: string,
    senderName: string
  ) => {
    let title = '';
    let message = '';
    let actionType: 'accept' | 'decline' | 'cancel' = 'accept';

    switch (action) {
      case 'accepted':
        title = 'Accept Subscription Invitation';
        message = `Are you sure you want to accept the ${planTitle} subscription Invitation from ${senderName}? This will activate the subscription on your account.`;
        actionType = 'accept';
        break;
      case 'declined':
        title = 'Decline Subscription Invitation?';
        message = `Are you sure you want to decline the ${planTitle} subscription Invitation from ${senderName}? This action cannot be undone.`;
        actionType = 'decline';
        break;
      case 'revoked':
        title = 'Cancel Subscription?';
        message = `Are you sure you want to cancel your ${planTitle} subscription? You will lose access to all premium features.`;
        actionType = 'cancel';
        break;
    }

    setConfirmationModal({
      open: true,
      action,
      giftId,
      title,
      message,
      actionType,
    });
  };

  const handleCloseModal = () => {
    if (!invitationAction.isPending) {
      setConfirmationModal({
        open: false,
        action: null,
        giftId: null,
        title: '',
        message: '',
        actionType: 'accept',
      });
    }
  };

  const handleConfirmAction = () => {
    if (confirmationModal.action && confirmationModal.giftId) {
      invitationAction.mutate({
        status: confirmationModal.action,
        shearingId: confirmationModal.giftId,
      });
    }
  };

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const getStatusConfig = (status: ISubscriptionGift['status']) => {
    switch (status) {
      case 'accepted':
        return {
          color: 'success' as const,
          label: 'Accepted',
          bg: alpha(theme.palette.success.main, 0.1),
          icon: <CheckCircleIcon fontSize='small' />,
        };
      case 'rejected':
        return {
          color: 'error' as const,
          label: 'Rejected',
          bg: alpha(theme.palette.error.main, 0.1),
          icon: <CancelIcon fontSize='small' />,
        };
      case 'pending':
      default:
        return {
          color: 'warning' as const,
          label: 'Pending Action',
          bg: alpha(theme.palette.warning.main, 0.1),
          icon: <AccessTimeIcon fontSize='small' />,
        };
    }
  };

  return (
    <>
      <Box sx={{ maxWidth: 500, margin: 'auto', p: 1 }}>
        {data.map(item => {
          const statusConfig = getStatusConfig(item.status);
          const isPending = item.status === 'pending';

          return (
            <Card
              key={item._id}
              variant='outlined'
              sx={{
                mb: 2,
                borderRadius: 3,
                border: `1px solid ${theme.palette.divider}`,
                overflow: 'hidden',
              }}
            >
              <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                {/* Top Row: Plan & Price + Status */}
                <Stack
                  direction='row'
                  justifyContent='space-between'
                  alignItems='flex-start'
                  mb={2}
                >
                  <Box>
                    <Stack direction='row' alignItems='center' spacing={1} mb={0.5}>
                      <Typography variant='h6' fontWeight='700' lineHeight={1.2}>
                        {item.plan.title}
                      </Typography>
                      <Typography variant='subtitle1' color='primary.main' fontWeight='600'>
                        {formatPrice(item.plan.price)}
                      </Typography>
                    </Stack>
                    <Stack direction='row' alignItems='center' spacing={0.5}>
                      <GiftIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
                      <Typography
                        variant='caption'
                        color='text.secondary'
                        sx={{ textTransform: 'uppercase', letterSpacing: 0.5 }}
                      >
                        {item.plan.type} Subscription Gift
                      </Typography>
                    </Stack>
                  </Box>

                  <Chip
                    label={statusConfig.label}
                    size='small'
                    icon={statusConfig.icon}
                    sx={{
                      fontWeight: 600,
                      fontSize: '0.75rem',
                      height: 24,
                      color: `${statusConfig.color}.main`,
                      bgcolor: statusConfig.bg,
                      border: 'none',
                    }}
                  />
                </Stack>

                {/* Middle Row: Sender Details (Compact) */}
                <Box
                  sx={{
                    bgcolor: alpha(theme.palette.action.hover, 0.05),
                    borderRadius: 2,
                    p: 1.5,
                    mb: isPending ? 2 : 0,
                  }}
                >
                  <Stack direction='row' spacing={1.5} alignItems='center'>
                    <Avatar
                      sx={{
                        width: 36,
                        height: 36,
                        fontSize: '0.9rem',
                        bgcolor: theme.palette.secondary.main,
                        fontWeight: 'bold',
                      }}
                    >
                      {item.senderUserDetails.full_name.charAt(0).toUpperCase()}
                    </Avatar>
                    <Box sx={{ minWidth: 0, flex: 1 }}>
                      <Typography variant='body2' fontWeight='600'>
                        Gifted by {item.senderUserDetails.full_name}
                      </Typography>
                      <Stack direction='row' alignItems='center' spacing={0.5}>
                        <EmailIcon sx={{ fontSize: 12, color: 'text.secondary' }} />
                        <Typography variant='caption' color='text.secondary' noWrap>
                          {item.senderUserDetails.email}
                        </Typography>
                      </Stack>
                    </Box>
                  </Stack>
                </Box>

                {/* Bottom Row: Actions or Date */}
                {isPending ? (
                  <Stack direction='row' spacing={1} mt={2}>
                    <Button
                      fullWidth
                      variant='outlined'
                      color='error'
                      size='small'
                      startIcon={<ThumbDownIcon sx={{ fontSize: 18 }} />}
                      onClick={() =>
                        handleOpenModal(
                          'declined',
                          item._id,
                          item.plan.title,
                          item.senderUserDetails.full_name
                        )
                      }
                      disabled={invitationAction.isPending}
                      sx={{ borderRadius: 2, textTransform: 'none' }}
                    >
                      Decline
                    </Button>
                    <Button
                      fullWidth
                      variant='contained'
                      color='success'
                      size='small'
                      startIcon={<ThumbUpIcon sx={{ fontSize: 18 }} />}
                      onClick={() =>
                        handleOpenModal(
                          'accepted',
                          item._id,
                          item.plan.title,
                          item.senderUserDetails.full_name
                        )
                      }
                      disabled={invitationAction.isPending}
                      disableElevation
                      sx={{ borderRadius: 2, textTransform: 'none', color: 'white' }}
                    >
                      Accept
                    </Button>
                  </Stack>
                ) : item.status === 'accepted' ? (
                  <Stack direction='row' spacing={2} alignItems='center' mt={1.5}>
                    <Typography
                      variant='caption'
                      color='text.secondary'
                      sx={{ fontStyle: 'italic', flex: 1 }}
                    >
                      Accepted on {dayjs(item.grantedAt || item.createdAt).format('MMM D, YYYY')}
                    </Typography>
                    <Button
                      variant='outlined'
                      color='error'
                      size='small'
                      startIcon={<CancelIcon sx={{ fontSize: 16 }} />}
                      onClick={() =>
                        handleOpenModal(
                          'revoked',
                          item._id,
                          item.plan.title,
                          item.senderUserDetails.full_name
                        )
                      }
                      disabled={invitationAction.isPending}
                      sx={{ borderRadius: 2, textTransform: 'none' }}
                    >
                      Cancel
                    </Button>
                  </Stack>
                ) : (
                  <Box mt={1.5} display='flex' justifyContent='flex-end'>
                    <Typography
                      variant='caption'
                      color='text.secondary'
                      sx={{ fontStyle: 'italic' }}
                    >
                      Rejected on {dayjs(item.grantedAt || item.createdAt).format('MMM D, YYYY')}
                    </Typography>
                  </Box>
                )}
              </CardContent>
            </Card>
          );
        })}
      </Box>

      {/* Confirmation Modal */}
      <ConfirmationModal
        open={confirmationModal.open}
        onClose={handleCloseModal}
        onConfirm={handleConfirmAction}
        title={confirmationModal.title}
        message={confirmationModal.message}
        actionType={confirmationModal.actionType}
        isLoading={invitationAction.isPending}
      />
    </>
  );
};

export default SubscriptionCard;
