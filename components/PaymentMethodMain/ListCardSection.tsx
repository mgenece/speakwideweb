import { deleteCardApi, setDefaultPaymentApi } from '@/api/functions/pyment';
import { queryKeys } from '@/config/constants';
import { IBankAccountPayment, IPaymentMethod } from '@/typescript/interface/subscription.interface';
import CrossIcon from '@/ui/Icons/CrossIcon';
import MuiModalWrapper from '@/ui/Modal/MuiModalWrapper';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import DeleteIcon from '@mui/icons-material/Delete';
import InfoOutlineIcon from '@mui/icons-material/InfoOutlined';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  IconButton,
  List,
  ListItem,
  Radio,
  Tooltip,
  Typography,
} from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import ButtonCommon from '../layouts/common/ButtonCommon';

interface IProps {
  paymentList: { card: IPaymentMethod[]; bank: IBankAccountPayment[] };
  getPaymentMethodId: (id: string) => void;
}

function ListCardSection({ paymentList, getPaymentMethodId }: IProps) {
  const [confirmationModal, setConfirmationModal] = useState<{
    id: string;
    type: 'card' | 'bank';
  } | null>(null);
  const [selectedPayment, setSelectedPayment] = useState<string>('');
  const queryClient = useQueryClient();

  const allPaymentIds = [...paymentList.card.map(c => c.id), ...paymentList.bank.map(b => b.id)];

  useEffect(() => {
    // Only reset if current selection doesn't exist anymore or if nothing is selected
    if (!selectedPayment || !allPaymentIds.includes(selectedPayment)) {
      const defaultBank = paymentList?.bank?.find(b => b.isDefault);
      const defaultCard = paymentList?.card?.find(c => c.isDefault);

      if (defaultBank) {
        setSelectedPayment(defaultBank.id);
      } else if (defaultCard) {
        setSelectedPayment(defaultCard.id);
      } else if (paymentList.card[0]?.id) {
        setSelectedPayment(paymentList.card[0].id);
      } else if (paymentList.bank[0]?.id) {
        setSelectedPayment(paymentList.bank[0].id);
      }
    }
  }, [allPaymentIds.length, selectedPayment]);

  useEffect(() => {
    if (selectedPayment) {
      getPaymentMethodId(selectedPayment);
    }
  }, [selectedPayment]);

  const deleteCardMutation = useMutation({
    mutationFn: deleteCardApi,
    onSuccess: () => {
      toast.success('Payment method deleted successfully');
      queryClient.invalidateQueries({ queryKey: queryKeys.listCard });
      queryClient.invalidateQueries({ queryKey: queryKeys.listBank });
      setConfirmationModal(null);
    },
    // onError: () => {
    //   // console.log(e.status, '***');
    //   // toast.error('Failed to delete payment method. Please try again.');
    // },
  });

  const setDefaultPaymentMutation = useMutation({
    mutationFn: setDefaultPaymentApi,
    onSuccess: () => {
      toast.success('Default payment method updated successfully');
      queryClient.invalidateQueries({ queryKey: queryKeys.listCard });
      queryClient.invalidateQueries({ queryKey: queryKeys.listBank });
    },
    onError: () => {
      toast.error('Failed to set default payment method. Please try again.');
    },
  });

  const handleDeletePayment = () => {
    if (confirmationModal) {
      deleteCardMutation.mutate({ cardId: confirmationModal.id });
    }
  };

  const handlePaymentSelect = (paymentId: string) => {
    setSelectedPayment(paymentId);
  };

  const handleSetDefault = (paymentId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setDefaultPaymentMutation.mutate({ paymentMethodId: paymentId });
  };

  const itemToDelete =
    confirmationModal?.type === 'card'
      ? paymentList.card?.find(item => item.id === confirmationModal?.id)
      : paymentList.bank?.find(item => item.id === confirmationModal?.id);

  const getAccountTypeLabel = (type: string) => {
    return type.charAt(0).toUpperCase() + type.slice(1);
  };

  return (
    <Box sx={{ mb: 3 }}>
      {/* Cards Section */}
      {paymentList?.card?.length > 0 && (
        <Box sx={{ mb: 3, p: 2, border: '1px solid #e0e0e0', borderRadius: 2 }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              mb: 2,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <CreditCardIcon sx={{ mr: 1, color: 'primary.main' }} />
              <Typography
                variant='body1'
                className='cmnBolTitle'
                sx={{ marginBottom: '0 !important' }}
              >
                Saved Cards
              </Typography>
            </Box>
            <Tooltip title={'Used only for subscription billing.'}>
              <InfoOutlineIcon />
            </Tooltip>
          </Box>
          <List disablePadding>
            {paymentList?.card.map(item => (
              <ListItem
                key={item.id}
                disablePadding
                sx={{
                  mb: 1,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  cursor: 'pointer',
                  p: 1,
                  borderRadius: 1,
                  '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.04)',
                  },
                }}
                onClick={() => handlePaymentSelect(item.id)}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                  <Radio
                    checked={selectedPayment === item.id}
                    value={item.id}
                    name='payment-method-radio'
                    onClick={e => e.stopPropagation()}
                    onChange={() => handlePaymentSelect(item.id)}
                  />
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant='body2'>
                      •••• •••• •••• {item.card.last4} - Expires {item.card.exp_month}/
                      {item.card.exp_year}
                    </Typography>
                    {item.isDefault && (
                      <Chip label='Default' size='small' color='primary' sx={{ height: 20 }} />
                    )}
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Tooltip title={item.isDefault ? 'Default payment method' : 'Set as default'}>
                    <IconButton
                      aria-label='set default card'
                      size='small'
                      onClick={e => handleSetDefault(item.id, e)}
                      disabled={
                        item.isDefault ||
                        setDefaultPaymentMutation.isPending ||
                        deleteCardMutation.isPending
                      }
                      sx={{
                        color: item.isDefault ? 'primary.main' : 'action.disabled',
                      }}
                    >
                      {setDefaultPaymentMutation.isPending &&
                      setDefaultPaymentMutation.variables?.paymentMethodId === item.id ? (
                        <CircularProgress size={20} />
                      ) : item.isDefault ? (
                        <StarIcon fontSize='small' />
                      ) : (
                        <StarBorderIcon fontSize='small' />
                      )}
                    </IconButton>
                  </Tooltip>
                  <IconButton
                    aria-label='delete card'
                    color='error'
                    size='small'
                    onClick={e => {
                      e.stopPropagation();
                      setConfirmationModal({ id: item.id, type: 'card' });
                    }}
                    disabled={deleteCardMutation.isPending || setDefaultPaymentMutation.isPending}
                  >
                    {deleteCardMutation.isPending &&
                    deleteCardMutation.variables?.cardId === item.id ? (
                      <CircularProgress size={20} color='error' />
                    ) : (
                      <DeleteIcon fontSize='small' />
                    )}
                  </IconButton>
                </Box>
              </ListItem>
            ))}
          </List>
        </Box>
      )}

      {/* Bank Accounts Section */}
      {paymentList?.bank?.length > 0 && (
        <Box sx={{ mb: 3, p: 2, border: '1px solid #e0e0e0', borderRadius: 2 }}>
          <Box
            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <AccountBalanceIcon sx={{ mr: 1, color: 'primary.main' }} />
              <Typography
                variant='body1'
                className='cmnBolTitle'
                sx={{ marginBottom: '0 !important' }}
              >
                Bank Accounts
              </Typography>
            </Box>
            <Tooltip title={'Used only for subscription billing.'}>
              <InfoOutlineIcon />
            </Tooltip>
          </Box>
          <List disablePadding>
            {paymentList.bank.map(item => (
              <ListItem
                key={item.id}
                disablePadding
                sx={{
                  mb: 1,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  cursor: 'pointer',
                  p: 1,
                  borderRadius: 1,
                  '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.04)',
                  },
                }}
                onClick={() => handlePaymentSelect(item.id)}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                  <Radio
                    checked={selectedPayment === item.id}
                    value={item.id}
                    name='payment-method-radio'
                    onClick={e => e.stopPropagation()}
                    onChange={() => handlePaymentSelect(item.id)}
                  />
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography variant='body2'>
                        {item.bankName} •••• {item.last4}
                      </Typography>
                      {item.isDefault && (
                        <Chip label='Default' size='small' color='primary' sx={{ height: 20 }} />
                      )}
                    </Box>
                    <Typography variant='caption' color='text.secondary'>
                      {getAccountTypeLabel(item.accountCategory)} •{' '}
                      {getAccountTypeLabel(item.accountType)} • {item.status.toUpperCase()}
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Tooltip title={item.isDefault ? 'Default payment method' : 'Set as default'}>
                    <IconButton
                      aria-label='set default bank account'
                      size='small'
                      onClick={e => handleSetDefault(item.id, e)}
                      disabled={
                        item.isDefault ||
                        setDefaultPaymentMutation.isPending ||
                        deleteCardMutation.isPending
                      }
                      sx={{
                        color: item.isDefault ? 'primary.main' : 'action.disabled',
                      }}
                    >
                      {setDefaultPaymentMutation.isPending &&
                      setDefaultPaymentMutation.variables?.paymentMethodId === item.id ? (
                        <CircularProgress size={20} />
                      ) : item.isDefault ? (
                        <StarIcon fontSize='small' />
                      ) : (
                        <StarBorderIcon fontSize='small' />
                      )}
                    </IconButton>
                  </Tooltip>
                  <IconButton
                    aria-label='delete bank account'
                    color='error'
                    size='small'
                    onClick={e => {
                      e.stopPropagation();
                      setConfirmationModal({ id: item.id, type: 'bank' });
                    }}
                    disabled={deleteCardMutation.isPending || setDefaultPaymentMutation.isPending}
                  >
                    {deleteCardMutation.isPending &&
                    deleteCardMutation.variables?.cardId === item.id ? (
                      <CircularProgress size={20} color='error' />
                    ) : (
                      <DeleteIcon fontSize='small' />
                    )}
                  </IconButton>
                </Box>
              </ListItem>
            ))}
          </List>
        </Box>
      )}

      {/* Confirmation Modal */}
      <MuiModalWrapper
        open={Boolean(confirmationModal)}
        onClose={() => {
          if (!deleteCardMutation.isPending) {
            setConfirmationModal(null);
          }
        }}
        className='sessionModalPricing'
      >
        <Box sx={{ position: 'relative', p: 3 }}>
          <IconButton
            onClick={() => {
              if (!deleteCardMutation.isPending) {
                setConfirmationModal(null);
              }
            }}
            sx={{ position: 'absolute', right: 8, top: 8 }}
            disabled={deleteCardMutation.isPending}
          >
            <CrossIcon />
          </IconButton>

          <Box sx={{ mt: 2 }}>
            <Typography variant='h3' sx={{ mb: 2 }}>
              Delete {confirmationModal?.type === 'card' ? 'Card' : 'Bank Account'}
            </Typography>
            <Typography>
              Are you sure you want to delete{' '}
              {confirmationModal?.type === 'card' ? (
                <>
                  the card ending in <strong>{(itemToDelete as IPaymentMethod)?.card.last4}</strong>
                </>
              ) : (
                <>
                  the {(itemToDelete as IBankAccountPayment)?.bankName} account ending in{' '}
                  <strong>{(itemToDelete as IBankAccountPayment)?.last4}</strong>
                </>
              )}
              ?
            </Typography>
            <Typography>This action cannot be undone.</Typography>

            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 3 }}>
              <Button
                variant='outlined'
                onClick={() => {
                  setConfirmationModal(null);
                }}
                disabled={deleteCardMutation.isPending}
              >
                No
              </Button>
              <ButtonCommon
                variant='contained'
                onClick={handleDeletePayment}
                isLoading={deleteCardMutation.isPending}
              >
                Yes, Delete
              </ButtonCommon>
            </Box>
          </Box>
        </Box>
      </MuiModalWrapper>
    </Box>
  );
}

export default ListCardSection;
