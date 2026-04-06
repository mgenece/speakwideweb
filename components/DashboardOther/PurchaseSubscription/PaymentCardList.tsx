import { createSetupIntentUserApi } from '@/api/functions/pyment';
import StripeSection from '@/components/PaymentMethodMain/StripeSection';
import { queryKeys } from '@/config/constants';
import { queryClient } from '@/pages/_app';
import { PaymentCardListPaper } from '@/styles/StyledComponents/PaymentandsubscriptionStyled';
import { Paper } from '@mui/material';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useQuery } from '@tanstack/react-query';
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function PaymentCardList() {
  const setupIntentQuery = useQuery({
    queryKey: queryKeys.createSetupIntent,
    queryFn: createSetupIntentUserApi,
    refetchOnMount: true,
  });

  const clientSecretSetup = setupIntentQuery.data?.data?.clientSecret || undefined;

  return (
    <PaymentCardListPaper className='cmn-gradiant'>
      <Paper elevation={0} className='cmn-paper-box'>
        {/* <Box className='paper-head'>
          <Grid2 container spacing={1}>
            <Grid2 size={{ sm: 6, xs: 12 }}>
              <Typography variant='h6' className='heading-h6'>
                Card List
              </Typography>
            </Grid2>
          </Grid2>
        </Box> */}
        {Boolean(clientSecretSetup) && (
          <Elements options={{ clientSecret: clientSecretSetup }} stripe={stripePromise}>
            <StripeSection
              cardAddSuccess={() => {
                queryClient.invalidateQueries({
                  queryKey: queryKeys.createSetupIntent,
                });
              }}
              getPaymentMethodId={() => {}}
            />
          </Elements>
        )}
      </Paper>
    </PaymentCardListPaper>
  );
}
