import assest from '@/json/assest';
import { PaymentInvoiceMainWrapper } from '@/styles/StyledComponents/PaymentInvoiceMainWrapper';
import ArrowBtnIcon from '@/ui/Icons/ArrowBtnIcon';
import DollarPaymentIcon from '@/ui/Icons/DollarPaymentIcon';
import InvoiceCardIcon from '@/ui/Icons/InvoiceCardIcon';
import {
  Box,
  Button,
  Chip,
  Container,
  Grid2,
  List,
  ListItem,
  Stack,
  Typography,
} from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/router';

export default function PaymentInvoiceMain({ type }: { type?: 'interpreter' }) {
  const router = useRouter();
  return (
    <PaymentInvoiceMainWrapper>
      <Box className='wrapper_mainInfoInvoice'>
        <Image
          src={assest.invoiceBgShape}
          alt='bg-image'
          width={1920}
          height={1800}
          className='bgShapeImg'
        />
        <Container fixed maxWidth='lg'>
          <Box
            className='wrapper_topBtnWrapper'
            sx={{ display: 'flex', alignItems: 'center', gap: 2, cursor: 'pointer' }}
            onClick={() => {
              router.back();
            }}
          >
            <ArrowBtnIcon IconColor='currentcolor' />
            Back
          </Box>
          <Box className='detailsInfoice'>
            <Typography variant='body1'>Invoice Details</Typography>
          </Box>
          <Box className='invoice_wrapperTopTitle'>
            <Box className='wrapper_leftInfo'>
              <Stack direction='row' alignItems='center' gap='15px'>
                <Typography variant='h1'>INV4257-09-011</Typography>
                <Chip label='Paid' />
              </Stack>
              <Typography variant='body1' className='priceTxt'>
                <Typography variant='caption'>
                  {type === 'interpreter' ? '$4.99' : '$49'}&nbsp;
                </Typography>
                Paid at Mar4, 2025
              </Typography>
            </Box>
            <Button type='button' variant='contained' color='primary' className='downLoadBtn'>
              Download Invoice
            </Button>
          </Box>
          <Box className='wrapper_btnInfo'>
            <Grid2 container spacing={1.5}>
              <Grid2 size={{ lg: 8, md: 7, xs: 12 }}>
                <Box className='wrapper_leftBoxInvoice'>
                  <Typography variant='h2'>Payment batch March 2025</Typography>
                  <Box className='innerMiddleInfo'>
                    <List disablePadding>
                      <ListItem disablePadding>
                        <Typography variant='body1'>Billed to</Typography>
                        <Typography variant='caption'>george_w@gmail.com</Typography>
                      </ListItem>
                      <ListItem disablePadding>
                        <Typography variant='body1'>Billing Details</Typography>
                        <Typography variant='caption'>George Williams</Typography>
                      </ListItem>
                    </List>
                    <List disablePadding>
                      <ListItem disablePadding>
                        <Typography variant='body1'>Invoice No</Typography>
                        <Typography variant='caption'>INV4257-09-11</Typography>
                      </ListItem>
                      <ListItem disablePadding>
                        <Typography variant='body1'>Payment Plan</Typography>
                        <Typography variant='caption'>Silver</Typography>
                      </ListItem>
                      <ListItem disablePadding>
                        <Typography variant='body1'>Transaction Id</Typography>
                        <Typography variant='caption'>#123546897</Typography>
                      </ListItem>
                      <ListItem disablePadding>
                        <Typography variant='body1'>Payment Method</Typography>
                        <Typography variant='caption'>Bank Transfer</Typography>
                      </ListItem>
                    </List>
                  </Box>
                  <Box className='termsConditionTxt'>
                    <Typography variant='body1' className='titleTxt'>
                      Terms & Conditions
                    </Typography>
                    <Typography variant='body1'>
                      Potter ipsum wand elf parchment wingardium. Heir gamp’s juice headless to
                      hermione ollivanders petrified.
                    </Typography>
                  </Box>
                </Box>
              </Grid2>
              <Grid2 size={{ lg: 4, md: 5, xs: 12 }}>
                <Box className='wrapper_rightLog'>
                  <Typography variant='body1' className='titleTxtTop'>
                    Log
                  </Typography>
                  <Box className='innerWrapper_progress'>
                    <List disablePadding>
                      <ListItem disablePadding className='active'>
                        <i>
                          <InvoiceCardIcon />
                        </i>
                        <Box className='wrapper_txtWrap'>
                          <Typography variant='body1' className='btdTxt'>
                            Subscription Status Active
                          </Typography>
                          <Typography variant='body1'>16Jan, 2024 10:30am</Typography>
                        </Box>
                      </ListItem>
                      <ListItem disablePadding>
                        <i>
                          <InvoiceCardIcon />
                        </i>
                        <Box className='wrapper_txtWrap'>
                          <Typography variant='body1' className='btdTxt'>
                            Invoice was sent to email
                          </Typography>
                          <Typography variant='body1'>16Jan, 2024 10:30am</Typography>
                        </Box>
                      </ListItem>
                      <ListItem disablePadding>
                        <i>
                          <DollarPaymentIcon />
                        </i>
                        <Box className='wrapper_txtWrap'>
                          <Typography variant='body1' className='btdTxt'>
                            Payment Successful
                          </Typography>
                          <Typography variant='body1'>16Jan, 2024 10:30am</Typography>
                        </Box>
                      </ListItem>
                    </List>
                  </Box>
                </Box>
              </Grid2>
            </Grid2>
          </Box>
        </Container>
      </Box>
    </PaymentInvoiceMainWrapper>
  );
}
