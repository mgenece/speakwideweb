import { getSubscriptionDetailsApi } from '@/api/functions/pyment';
import { useInterpreterData } from '@/hooks/react-query/useVisitor';
import assest from '@/json/assest';
import { onboardingTokenConvert } from '@/lib/functions/_helpers.lib';
import { PaymentConfirmationMainWrapper } from '@/styles/StyledComponents/PaymentConfirmationMainWrapper';
import InvoiceBtnIcon from '@/ui/Icons/InvoiceBtnIcon';
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Grid2,
  List,
  ListItem,
  Typography,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

function PymentConfirmationInt() {
  const router = useRouter();
  const { subscriptionId } = router.query;
  const { interpreterData, invalidateInterpreterData } = useInterpreterData();

  const subscriptionDetailQeury = useQuery({
    queryKey: [subscriptionId],
    queryFn: () => getSubscriptionDetailsApi(subscriptionId as string),
    enabled: typeof subscriptionId === 'string',
    refetchOnMount: true,
    retry: failureCount => {
      return failureCount < 5;
    },
    retryDelay: 2000,
  });

  const subscriptionData = subscriptionDetailQeury.data?.data || null;

  if (subscriptionDetailQeury.isLoading) {
    return (
      <Box height={'40vh'} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <CircularProgress />
      </Box>
    );
  }

  invalidateInterpreterData();
  onboardingTokenConvert();

  return (
    <PaymentConfirmationMainWrapper>
      <Box className='paymentConfirmation_mainWrapper'>
        <Image
          src={assest.paymentConfirmationBg}
          alt='bg-image'
          width={1920}
          height={1800}
          className='bgShapeImg'
        />
        <Container fixed maxWidth='lg'>
          <Grid2 container spacing={{ lg: 3, xs: 2.5 }}>
            <Grid2 size={{ lg: 7.5, md: 6.5, xs: 12 }}>
              <Box className='wrapper_leftInfoBox'>
                <Typography variant='h1'>Your Payment is Successful!</Typography>
                <Box className='wrapper_innerAllinfo'>
                  <Typography variant='body1'>
                    Hello {interpreterData?.full_name}, Thank you for your payment of{' '}
                    <Typography variant='caption'>
                      ${subscriptionData?.transactionAmount || '0'}
                    </Typography>{' '}
                    on{' '}
                    <Typography variant='caption'>
                      {dayjs(subscriptionData?.transactionDateTime).format('MMMM D, YYYY')}
                    </Typography>
                  </Typography>
                  <Typography variant='body1' className='boldTxtTitle'>
                    Thank You For Using Speakwide!
                  </Typography>
                  {subscriptionData?.invoiceUrl && (
                    <Box className='invoiceBtn'>
                      <Link href={subscriptionData?.invoiceUrl}>
                        <InvoiceBtnIcon />
                        <Typography variant='caption'>View Invoice</Typography>
                      </Link>
                    </Box>
                  )}

                  {interpreterData?.isBankAccountAdded ? (
                    <Button
                      type='button'
                      variant='contained'
                      color='primary'
                      className='goDashboardBtn'
                      onClick={() => router.push('/interpreter/dashboard')}
                    >
                      Go to Dashboard
                    </Button>
                  ) : (
                    <Button
                      type='button'
                      variant='contained'
                      color='primary'
                      className='goDashboardBtn'
                      onClick={() => router.push('/interpreter/payment/add-bank-account/')}
                    >
                      Continue
                    </Button>
                  )}
                </Box>
              </Box>
            </Grid2>
            <Grid2 size={{ lg: 4.5, md: 5.5, xs: 12 }}>
              <Box className='planSummeryInfo'>
                <Typography variant='h2'>Payment Info</Typography>
                <Box className='wrapPlanInfo'>
                  <List disablePadding>
                    <ListItem disablePadding>
                      <Typography variant='body1'>Total</Typography>
                      <Typography variant='caption'>
                        ${subscriptionData?.transactionAmount || '0'}
                      </Typography>
                    </ListItem>
                    <ListItem disablePadding>
                      <Typography variant='body1'>Payment Plan</Typography>
                      <Typography variant='caption'>
                        {subscriptionData?.planName || 'Trial'}
                      </Typography>
                    </ListItem>
                    {subscriptionData?.transactionId && (
                      <ListItem disablePadding>
                        <Typography variant='body1'>Transaction Id</Typography>
                        <Typography variant='caption'>{subscriptionData?.transactionId}</Typography>
                      </ListItem>
                    )}

                    <ListItem disablePadding>
                      <Typography variant='body1'>Payment Date</Typography>
                      <Typography variant='caption'>
                        {dayjs(subscriptionData?.transactionDateTime).format('MMMM D, YYYY')}
                      </Typography>
                    </ListItem>
                  </List>
                </Box>
              </Box>
            </Grid2>
          </Grid2>
        </Container>
      </Box>
    </PaymentConfirmationMainWrapper>
  );
}

export default PymentConfirmationInt;
