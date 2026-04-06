import { createPaymentIntentApi, createSetupIntentUserApi } from '@/api/functions/pyment';
import { subscriptionListUserApi } from '@/api/functions/subscription';
import { queryKeys } from '@/config/constants';
import { useUserData } from '@/hooks/react-query/useVisitor';
import assest from '@/json/assest';
import { PaymentMethodMainWrapper } from '@/styles/StyledComponents/PaymentMethodMainWrapper';
import { ISubscriptionPlan } from '@/typescript/interface/subscription.interface';
import ArrowBtnIcon from '@/ui/Icons/ArrowBtnIcon';
import { Box, CircularProgress, Container, Grid2, List, ListItem, Typography } from '@mui/material';
import { useMutation, useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import PaymentProcessor from '@/components/PaymentMethodMain/PaymentProcessor';
import StripeSection from '@/components/PaymentMethodMain/StripeSection';
import { queryClient } from '@/pages/_app';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import ButtonCommon from '../../common/ButtonCommon';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function PaymentMethodUser() {
  const [selectedPlan, setSelectedPlan] = useState<ISubscriptionPlan>();
  const [paymentMethodId, setPaymentMethodId] = useState('');
  const { userData } = useUserData();
  const router = useRouter();
  const { plan } = router.query;

  const SubscriptionQuery = useQuery({
    queryKey: queryKeys.userSubscriptionList,
    queryFn: subscriptionListUserApi,
  });

  const setupIntentQuery = useQuery({
    queryKey: queryKeys.createSetupIntent,
    queryFn: createSetupIntentUserApi,
    refetchOnMount: true,
  });

  const clientSecretSetup = setupIntentQuery.data?.data.clientSecret || null;

  const createPaymentIntentMutation = useMutation({
    mutationFn: createPaymentIntentApi,
  });

  const paymentClientSecret = createPaymentIntentMutation.data?.data?.client_secret;
  const subscriptionId = createPaymentIntentMutation.data?.data?.subscriptionId;

  // I know following code block for paymentClientSecret === null can cause issue but backend Shubhrajyoti assured me this will work reliably. Forgive me.

  if (paymentClientSecret === null) {
    toast.success('Trial Activated');
    router.push(`/user/payment/payment-confirmation?subscriptionId=${subscriptionId}`);
  }

  useEffect(() => {
    const subscriptionList = SubscriptionQuery.data?.data;
    if (subscriptionList?.length && plan) {
      const selectedPlanTemp = subscriptionList.filter(item => item._id === plan);
      if (selectedPlanTemp.length) {
        setSelectedPlan(selectedPlanTemp[0]);
      } else {
        toast.error('Invalid plan');
      }
    }
  }, [plan, SubscriptionQuery.data?.data?.length]);

  return (
    <PaymentMethodMainWrapper>
      <Box className='wrapper_mainPayemntWrapper'>
        <Image
          src={assest.bgSHapeImgPayments}
          alt='bg-image'
          width={1920}
          height={1800}
          className='bgShapeImg'
        />
        <Container fixed maxWidth='xl'>
          <Box
            className='wrapper_topBtnWrapper'
            sx={{ display: 'flex', alignItems: 'center', gap: 2, cursor: 'pointer' }}
            onClick={() => {
              router.back();
            }}
          >
            <ArrowBtnIcon IconColor='currentcolor' />
            Back To Pricing
          </Box>
          <Box className='wrapper_infoPayment'>
            <Grid2 container spacing={{ lg: 4.5, md: 3, xs: 2.5 }}>
              <Grid2 size={{ lg: 7.5, md: 6.5, xs: 12 }}>
                <Box className='innerPaymentWrap'>
                  <Typography variant='h1'>
                    <Typography variant='caption'>Please</Typography> Select Your Preferred Payment
                    Method
                  </Typography>

                  {paymentClientSecret ? (
                    <Elements stripe={stripePromise}>
                      <PaymentProcessor
                        clientSecret={paymentClientSecret}
                        paymentMethodId={paymentMethodId}
                        amount={selectedPlan?.price}
                        currency='USD'
                        onSuccess={() =>
                          router.push(
                            `/user/payment/payment-confirmation?subscriptionId=${subscriptionId}`
                          )
                        }
                        onError={error => {
                          console.error('Payment failed:', error);
                        }}
                      />
                    </Elements>
                  ) : (
                    <Box className='wrapper_innerPaymenTBox'>
                      {clientSecretSetup ? (
                        <Elements
                          options={{ clientSecret: clientSecretSetup }}
                          stripe={stripePromise}
                        >
                          <StripeSection
                            cardAddSuccess={() => {
                              queryClient.invalidateQueries({
                                queryKey: queryKeys.createSetupIntent,
                              });
                            }}
                            getPaymentMethodId={id => {
                              setPaymentMethodId(id);
                            }}
                          />
                        </Elements>
                      ) : (
                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                          <CircularProgress />
                        </Box>
                      )}
                    </Box>
                  )}
                </Box>
              </Grid2>
              <Grid2 size={{ lg: 4.5, md: 5.5, xs: 12 }}>
                <Box className='rightPartWrap'>
                  <Box className='planSummeryInfo'>
                    <Typography variant='h2'>Plan Summary</Typography>
                    <Box className='wrapPlanInfo'>
                      <Typography variant='body1' className='titleTxtBld'>
                        Plan Amount
                      </Typography>
                      <List disablePadding>
                        <ListItem disablePadding>
                          <Typography variant='body1'>Amount</Typography>
                          <Typography variant='caption'>${selectedPlan?.price}</Typography>
                        </ListItem>
                        <ListItem disablePadding>
                          <Typography variant='body1'>Subscription Plan</Typography>
                          <Typography variant='caption'>{selectedPlan?.title}</Typography>
                        </ListItem>
                      </List>
                    </Box>
                    <Box className='wrapPlanInfo noBorder'>
                      <Typography variant='body1' className='titleTxtBld'>
                        Account Summary
                      </Typography>
                      <List disablePadding>
                        <ListItem disablePadding>
                          <Typography variant='body1'>Full Name</Typography>
                          <Typography variant='caption'>{userData?.full_name}</Typography>
                        </ListItem>
                        <ListItem disablePadding>
                          <Typography variant='body1'>Email Address</Typography>
                          <Typography variant='caption'>{userData?.email}</Typography>
                        </ListItem>
                        <ListItem disablePadding>
                          <Typography variant='body1'>Phone Number</Typography>
                          <Typography variant='caption'>{userData?.phone}</Typography>
                        </ListItem>
                      </List>
                    </Box>
                  </Box>
                  {!paymentClientSecret && (
                    <Box className='btnWrapper'>
                      {selectedPlan?.stripePriceId && paymentMethodId && (
                        <ButtonCommon
                          type='button'
                          variant='contained'
                          color='primary'
                          fullWidth
                          isLoading={createPaymentIntentMutation.isPending}
                          onClick={() => {
                            createPaymentIntentMutation.mutate({
                              priceId: selectedPlan?.stripePriceId,
                              paymentMethodId: paymentMethodId,
                            });

                            // router.push('/user/onboard/payment-confirmation');
                          }}
                        >
                          Proceed
                        </ButtonCommon>
                      )}
                    </Box>
                  )}
                </Box>
              </Grid2>
            </Grid2>
          </Box>
        </Container>
      </Box>
    </PaymentMethodMainWrapper>
  );
}
