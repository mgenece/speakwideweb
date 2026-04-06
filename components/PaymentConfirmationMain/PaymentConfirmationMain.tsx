import assest from '@/json/assest';
import { PaymentConfirmationMainWrapper } from '@/styles/StyledComponents/PaymentConfirmationMainWrapper';
import InvoiceBtnIcon from '@/ui/Icons/InvoiceBtnIcon';
import { Box, Button, Container, Grid2, List, ListItem, Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function PaymentConfirmationMain({ type }: { type?: 'interpreter' }) {
  const router = useRouter();
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
          <Grid2 container spacing={{ lg: 6, md: 3, xs: 2.5 }}>
            <Grid2 size={{ lg: 7.5, md: 6.5, xs: 12 }}>
              <Box className='wrapper_leftInfoBox'>
                <Typography variant='h1'>Your Payment is Successful!</Typography>
                <Box className='wrapper_innerAllinfo'>
                  <Typography variant='body1'>
                    Hello George, Thank you for your payment of{' '}
                    <Typography variant='caption'>
                      {type === 'interpreter' ? '$4.99' : '$49'}
                    </Typography>{' '}
                    on
                    <Typography variant='caption'> Mar4, 2025</Typography> using Bank Account&nbsp;
                    <Typography variant='caption'>****45623</Typography>
                  </Typography>
                  <Typography variant='body1' className='boldTxtTitle'>
                    Thank You For Using Speakwide!
                  </Typography>
                  <Box className='invoiceBtn'>
                    <Link href='/interpreter/payment-invoice'>
                      <InvoiceBtnIcon />
                      <Typography variant='caption'>View Invoice</Typography>
                    </Link>
                  </Box>
                  <Button
                    type='button'
                    variant='contained'
                    color='primary'
                    className='goDashboardBtn'
                    onClick={() =>
                      type === 'interpreter'
                        ? router.push('/interpreter/dashboard')
                        : router.push('/user/dashboard')
                    }
                  >
                    Go to Dashboard
                  </Button>
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
                        {type === 'interpreter' ? '$4.99' : '$49'}
                      </Typography>
                    </ListItem>
                    <ListItem disablePadding>
                      <Typography variant='body1'>Payment Plan</Typography>
                      <Typography variant='caption'>Silver</Typography>
                    </ListItem>
                    <ListItem disablePadding>
                      <Typography variant='body1'>Transaction Id</Typography>
                      <Typography variant='caption'>#1256346566</Typography>
                    </ListItem>
                    <ListItem disablePadding>
                      <Typography variant='body1'>Payment Date</Typography>
                      <Typography variant='caption'>Mar4, 2025</Typography>
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
