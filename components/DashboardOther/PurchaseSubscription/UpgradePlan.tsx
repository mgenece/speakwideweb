import { getSubscriptionDetailsApi } from '@/api/functions/pyment';
import { useInterpreterData, useUserData } from '@/hooks/react-query/useVisitor';
import { UpgradePlanStack } from '@/styles/StyledComponents/PaymentandsubscriptionStyled';
import { Chip, Grid2, Paper, Stack, Typography, useTheme } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import Link from 'next/link';

export default function UpgradePlan() {
  const theme = useTheme();
  const { userData } = useUserData();
  const { interpreterData } = useInterpreterData();

  const subscriptionId =
    userData?.subscriptionDetails?.subscriptionId ||
    interpreterData?.subscriptionDetails?.subscriptionId ||
    null;

  const subscriptionDetailQeury = useQuery({
    queryKey: [subscriptionId],
    queryFn: () => getSubscriptionDetailsApi(subscriptionId as string),
    enabled: typeof subscriptionId === 'string',
  });

  const subscriptionData = subscriptionDetailQeury.data?.data || null;

  const isUser = Boolean(userData?._id);

  const isShared = userData?.subscriptionDetails?.isSheared;

  // console.log(isShared, '***');

  return (
    <UpgradePlanStack className='cmn-gradiant'>
      <Paper elevation={0} className='cmn-paper-box plan-paper-root'>
        <Grid2 container spacing={0.5} alignItems='center'>
          <Grid2 size={{ lg: 4, xs: 12 }}>
            <Stack
              direction='column'
              alignItems='flex-start'
              flexWrap='wrap'
              gap={1}
              className='upgrade-plan-stack'
            >
              <Chip
                label={
                  isShared
                    ? userData?.subscriptionDetails?.planDetails.title
                    : subscriptionData?.planName?.toUpperCase() || 'NA'
                }
              />
              <Link
                href={isUser ? '/user/payment/pricing' : '/interpreter/payment/pricing'}
                className='plan-link'
              >
                Change Plan
              </Link>
            </Stack>
          </Grid2>
          <Grid2 size={{ lg: 4, xs: 12 }}>
            <Stack
              direction='column'
              alignItems='flex-start'
              flexWrap='wrap'
              gap={1}
              className='expiration-date-stack'
            >
              <Typography variant='body2' color={theme.palette.grey.A700}>
                Expiration Date
              </Typography>
              <Typography variant='body1' fontWeight={500}>
                {subscriptionData
                  ? dayjs(subscriptionData?.currentPeriodEnd).format('MMMM D, YYYY')
                  : 'NA'}
              </Typography>
            </Stack>
          </Grid2>

          <Grid2 size={{ lg: 4, xs: 12 }}>
            <Stack
              direction='column'
              alignItems='flex-end'
              flexWrap='wrap'
              gap={1}
              className='expiration-date-stack'
            >
              <Typography variant='body2' color={theme.palette.grey.A700}>
                Price
              </Typography>
              <Typography variant='body1' fontWeight={500}>
                {subscriptionData ? `$${subscriptionData?.transactionAmount}` : 'NA'}
              </Typography>
            </Stack>
          </Grid2>
        </Grid2>
      </Paper>
    </UpgradePlanStack>
  );
}
