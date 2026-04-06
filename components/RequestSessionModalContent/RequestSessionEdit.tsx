import { createSetupIntentUserApi } from '@/api/functions/pyment';
import StripeSection from '@/components/PaymentMethodMain/StripeSection';
import { queryKeys } from '@/config/constants';
import { queryClient } from '@/pages/_app';
import { AccessTime, CalendarMonth } from '@mui/icons-material';
import { Box, Divider, Grid, Paper, Stack, Typography } from '@mui/material';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { useState } from 'react';
import toast from 'react-hot-toast';
import PaymentProcessor from '../PaymentMethodMain/PaymentProcessor';
import SessionEditForm from './SessionEditForm';

interface IRequestSessionEditProps {
  handleClose: () => void;
  id: string;
  BottomButtonText?: string;
}
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const RequestSessionEdit = ({ id, handleClose }: IRequestSessionEditProps) => {
  const [editState, setEditState] = useState<'form' | 'card'>('form');
  const [paymentData, setPaymentData] = useState({
    extraAmount: 0,
    paymentIntentId: '',
    paymentMethodId: '',
    clientSecret: '',
    platform_fee_amount: '',
  });

  const handleCompletion = () => {
    toast.success('Session modified successfully!');
    queryClient.invalidateQueries({ queryKey: ['user-session-list'] });
    queryClient.invalidateQueries({
      queryKey: queryKeys.interpreterSessionDetail(id),
    });
    handleClose();
  };

  const [adjustedData, setAdjustedData] = useState({
    existingStart: '',
    existingEnd: '',
    requestedStart: '',
    requestedEnd: '',
    finalStart: '',
    finalEnd: '',
    existingDurationInMinutes: 0,
    newDurationInMinutes: 0,
    extraAmount: 0,
  });

  const setupIntentQuery = useQuery({
    queryKey: queryKeys.createSetupIntent,
    queryFn: createSetupIntentUserApi,
    refetchOnMount: true,
  });

  //   console.log(paymentData, '***p');

  const clientSecretSetup = setupIntentQuery.data?.data?.clientSecret || undefined;
  const platformFeeAmount = Number(paymentData.platform_fee_amount || 0);

  // console.log(paymentData, '***');

  if (editState === 'card') {
    return (
      <Box>
        <Paper
          elevation={0}
          sx={{
            p: 3,
            bgcolor: 'background.default',
            borderRadius: 2,
            border: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Typography variant='h6' fontWeight={600} gutterBottom>
            Session Adjustment Summary
          </Typography>

          <Divider sx={{ my: 2 }} />

          <Grid container spacing={3}>
            {/* Existing Session */}
            <Grid item xs={12} sm={6}>
              <Box>
                <Typography variant='caption' color='text.secondary' fontWeight={500}>
                  EXISTING SESSION
                </Typography>
                <Stack spacing={1} mt={1}>
                  <Box display='flex' alignItems='center' gap={1}>
                    <CalendarMonth fontSize='small' color='action' />
                    <Box>
                      <Typography variant='body2' color='text.secondary'>
                        Start
                      </Typography>
                      <Typography variant='body1'>
                        {dayjs(adjustedData.existingStart).format('MMM D, YYYY h:mm A')}
                      </Typography>
                    </Box>
                  </Box>
                  <Box display='flex' alignItems='center' gap={1}>
                    <CalendarMonth fontSize='small' color='action' />
                    <Box>
                      <Typography variant='body2' color='text.secondary'>
                        End
                      </Typography>
                      <Typography variant='body1'>
                        {dayjs(adjustedData.existingEnd).format('MMM D, YYYY h:mm A')}
                      </Typography>
                    </Box>
                  </Box>
                  <Box display='flex' alignItems='center' gap={1}>
                    <AccessTime fontSize='small' color='action' />
                    <Box>
                      <Typography variant='body2' color='text.secondary'>
                        Duration
                      </Typography>
                      <Typography variant='body1'>
                        {adjustedData.existingDurationInMinutes} minutes
                      </Typography>
                    </Box>
                  </Box>
                </Stack>
              </Box>
            </Grid>

            {/* Divider for mobile */}
            <Grid item xs={12} sx={{ display: { sm: 'none' } }}>
              <Divider />
            </Grid>

            {/* New Session */}
            <Grid item xs={12} sm={6}>
              <Box>
                <Typography variant='caption' color='primary.main' fontWeight={500}>
                  ADJUSTED SESSION
                </Typography>
                <Stack spacing={1} mt={1}>
                  <Box display='flex' alignItems='center' gap={1}>
                    <CalendarMonth fontSize='small' color='primary' />
                    <Box>
                      <Typography variant='body2' color='text.secondary'>
                        Start
                      </Typography>
                      <Typography variant='body1'>
                        {dayjs(adjustedData.finalStart).format('MMM D, YYYY h:mm A')}
                      </Typography>
                    </Box>
                  </Box>
                  <Box display='flex' alignItems='center' gap={1}>
                    <CalendarMonth fontSize='small' color='primary' />
                    <Box>
                      <Typography variant='body2' color='text.secondary'>
                        End
                      </Typography>
                      <Typography variant='body1'>
                        {dayjs(adjustedData.finalEnd).format('MMM D, YYYY h:mm A')}
                      </Typography>
                    </Box>
                  </Box>
                  <Box display='flex' alignItems='center' gap={1}>
                    <AccessTime fontSize='small' color='primary' />
                    <Box>
                      <Typography variant='body2' color='text.secondary'>
                        Duration
                      </Typography>
                      <Typography variant='body1' color='primary.main' fontWeight={500}>
                        {adjustedData.newDurationInMinutes} minutes
                      </Typography>
                    </Box>
                  </Box>
                </Stack>
              </Box>
            </Grid>
          </Grid>

          <Divider sx={{ my: 2 }} />

          {/* Payment Summary */}
          <Box
            sx={{
              bgcolor: 'primary.50',
              p: 3,
              borderRadius: 2,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'stretch',
              gap: 2,
            }}
          >
            <Stack spacing={0.5} sx={{ flex: 1 }}>
              <Typography variant='body1' fontWeight={600}>
                Additional charge for extra time
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                {adjustedData.newDurationInMinutes - adjustedData.existingDurationInMinutes} mins
                added
              </Typography>
            </Stack>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-end',
                justifyContent: 'space-between',
                minWidth: 140,
                height: '100%',
              }}
            >
              <Box>
                <Typography variant='body2' color='text.secondary'>
                  Estimated subtotal
                </Typography>
                <Typography variant='h5' color='primary.main' fontWeight={600}>
                  ${paymentData.extraAmount.toFixed(2)}
                </Typography>
              </Box>
              <Typography variant='body2' color='text.secondary'>
                Platform fee (included): ${platformFeeAmount.toFixed(2)}
              </Typography>
            </Box>
          </Box>
        </Paper>
        <Typography className='languageListTitle' py={1.5}>
          Select Your card to make payment for the session
        </Typography>
        {Boolean(clientSecretSetup) && (
          <Elements options={{ clientSecret: clientSecretSetup }} stripe={stripePromise}>
            <StripeSection
              cardAddSuccess={() => {
                queryClient.invalidateQueries({
                  queryKey: queryKeys.createSetupIntent,
                });
              }}
              getPaymentMethodId={id => {
                setPaymentData(prev => ({ ...prev, paymentMethodId: id }));
              }}
            />

            {paymentData.clientSecret && (
              <PaymentProcessor
                clientSecret={paymentData.clientSecret}
                paymentMethodId={paymentData.paymentMethodId}
                amount={paymentData.extraAmount}
                onSuccess={() => {
                  handleCompletion();
                }}
              />
            )}
          </Elements>
        )}
      </Box>
    );
  }

  return (
    <SessionEditForm
      id={id}
      handleClose={data => {
        if (data?.duration_comparision?.extraAmount) {
          setPaymentData({
            extraAmount: data.duration_comparision.extraAmount,
            paymentIntentId: data?.paymentIntentId || '',
            paymentMethodId: '',
            clientSecret: data?.clientSecret || '',
            platform_fee_amount: data.duration_comparision.platform_fee_amount || '',
          });
          setAdjustedData({
            ...data.duration_comparision,
          });
          setEditState('card');
        } else {
          handleCompletion();
        }
      }}
    />
  );
};

export default RequestSessionEdit;
