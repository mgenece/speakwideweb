import { langListApi } from '@/api/functions/cms.api';
import { createSetupIntentUserApi } from '@/api/functions/pyment';
import PaymentProcessor from '@/components/PaymentMethodMain/PaymentProcessor';
import StripeSection from '@/components/PaymentMethodMain/StripeSection';
import RequestSessionModalContent from '@/components/RequestSessionModalContent/RequestSessionModalContent';
import { queryKeys } from '@/config/constants';
import { useUserData } from '@/hooks/react-query/useVisitor';
import DashboardWrapper from '@/layout/DashboardWrapper/DashboardWrapper';
import { queryClient } from '@/pages/_app';
import { RequestSessionWrapper } from '@/styles/StyledComponents/RequestSessionWrapper';
import CommonAutocomplete from '@/ui/CommonAutoComplete/CommonAutoComplete';
import CustomButtonPrimary from '@/ui/CustomButtons/CustomButtonPrimary';
import DirectionIcon from '@/ui/Icons/DirectionIcon';
import MuiModalWrapper from '@/ui/Modal/MuiModalWrapper';
import { showWarnToast } from '@/ui/Toast/ToastUtils';
import { Box, Grid2, Stack, Typography } from '@mui/material';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import toast from 'react-hot-toast';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const RequestSession = () => {
  const { userData } = useUserData();
  const languageQuery = useQuery({
    queryKey: queryKeys.langList,
    queryFn: langListApi,
  });

  const setupIntentQuery = useQuery({
    queryKey: queryKeys.createSetupIntent,
    queryFn: createSetupIntentUserApi,
    refetchOnMount: true,
  });

  const clientSecretSetup = setupIntentQuery.data?.data?.clientSecret || undefined;

  const [lang, setLang] = useState<{
    lang1: { value: string; label: string } | null;
    lang2: { value: string; label: string } | null;
  }>({
    lang1: null,
    lang2: null,
  });

  const [paymentMethodId, setPaymentMethodId] = useState('');

  const [paymentData, setPaymentData] = useState({
    clientSecret: '',
    paymentIntentId: '',
    amount: 0,
  });

  const languages =
    languageQuery.data?.data?.map(item => ({
      value: item._id,
      label: item.language_display_name,
    })) || [];

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    if (lang.lang1 && lang.lang2 && paymentMethodId) {
      setOpen(true);
      return;
    }
    if (!lang.lang1 || !lang.lang2) {
      showWarnToast('Please select both the languages.');
      return;
    }
    if (!paymentMethodId) {
      showWarnToast('Please select card for payment.');
    }
  };
  // const [isSearch, setIsSearch] = useState(false);
  // const handleSearch = () => {
  //   setIsSearch(!isSearch);
  // };
  return (
    <DashboardWrapper>
      {/* {isSearch ? (
        <SearchNoFoundWraaper>
          <figure>
            <Image width={325} height={325} src={assest.searchIcon} alt='no-found' />
          </figure>
          <Typography>Searching for Interpreter....</Typography>
        </SearchNoFoundWraaper>
      ) : ( */}
      <RequestSessionWrapper>
        <Box className='requestSessionTopBox'>
          <Typography variant='h2' className='requestSessionTitle'>
            <span>Hello</span> {userData?.full_name || ''}!
          </Typography>
          <Typography>Interpreters Are Standing by.....</Typography>
        </Box>
        <Box className='languageListItem'>
          <Typography className='languageListTitle'>Choose Languages for Interpretation</Typography>
          <Box className='mainActocomepetBox'>
            <Grid2 container spacing={{ lg: 1, xs: 2 }} alignItems='center'>
              <Grid2 size={{ lg: 5.75, md: 5, sm: 12, xs: 12 }}>
                <CommonAutocomplete
                  label='English'
                  options={languages}
                  onSelect={data => {
                    setLang(prev => ({ ...prev, lang1: data }));
                  }}
                />
              </Grid2>
              <Grid2 size={{ lg: 0.5, md: 2, sm: 12, xs: 12 }}>
                <Stack direction='row' justifyContent='center'>
                  <Box component='i' lineHeight={0} sx={{ rotate: { md: 'initial', xs: '90deg' } }}>
                    <DirectionIcon />
                  </Box>
                </Stack>
              </Grid2>
              <Grid2 size={{ lg: 5.75, md: 5, sm: 12, xs: 12 }}>
                <CommonAutocomplete
                  label='Spanish'
                  options={languages}
                  onSelect={data => {
                    setLang(prev => ({ ...prev, lang2: data }));
                  }}
                />
              </Grid2>
            </Grid2>
            <Box py={2}>
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
                      setPaymentMethodId(id);
                    }}
                  />
                </Elements>
              )}
            </Box>

            <Stack
              direction='row'
              alignItems='center'
              justifyContent='center'
              className='btnStackWrap'
            >
              <CustomButtonPrimary
                variant='contained'
                color='primary'
                className='primary-gradiant-btn requestSessionBtn'
                onClick={handleOpen}
              >
                Request a Session
              </CustomButtonPrimary>
            </Stack>
          </Box>
        </Box>
      </RequestSessionWrapper>
      {/* )} */}

      {lang.lang1 && lang.lang2 && (
        <MuiModalWrapper
          open={open}
          onClose={() => setOpen(false)}
          isHeadingContainerWithTitle
          containerHeading='Request an Interpreter'
          className='requestSessionModal'
        >
          {!paymentData.clientSecret ? (
            <RequestSessionModalContent
              handleClose={() => {
                setOpen(false);
              }}
              selectedLang={
                {
                  lang1: lang.lang1,
                  lang2: lang.lang2,
                } as {
                  lang1: { value: string; label: string };
                  lang2: { value: string; label: string };
                }
              }
              paymentMethodId={paymentMethodId}
              getPaymentData={data =>
                setPaymentData({
                  paymentIntentId: data.paymentIntentId,
                  clientSecret: data.clientSecret,
                  amount: data.amount,
                })
              }
            />
          ) : (
            <Elements
              stripe={stripePromise}
              options={{
                clientSecret: paymentData.clientSecret,
              }}
            >
              <PaymentProcessor
                clientSecret={paymentData.clientSecret}
                paymentMethodId={paymentMethodId} // ✅ this should be the saved card/payment method ID
                amount={paymentData.amount}
                onSuccess={() => {
                  toast.success('Session request successful!');
                  setPaymentData({ amount: 0, clientSecret: '', paymentIntentId: '' });
                  setOpen(false);
                }}
              />
            </Elements>
          )}
        </MuiModalWrapper>
      )}
    </DashboardWrapper>
  );
};

export default RequestSession;
