import { subscriptionListInterpreterApi } from '@/api/functions/subscription';
import PricingCard from '@/components/PricingCard/PricingCard';
import SectionHeading from '@/components/SectionHeading/SectionHeading';
import { queryKeys } from '@/config/constants';
import { ISubscriptionPlanInter } from '@/typescript/interface/subscription.interface';
import DoubleArrow from '@/ui/Icons/DoubleArrow';
import { Box, Button, Container, Grid2, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';

interface IProps {
  handelSessionModal: () => void;
}

interface PricingFeature {
  name: string;
  status: boolean;
}

interface PricingPlanContent {
  name: string;
  trial: string;
  isFree?: boolean;
  price: string;
  priceDetails: string;
  plansFeature: PricingFeature[];
  id: string;
}

export function transformPlans(plans: ISubscriptionPlanInter[]): PricingPlanContent[] {
  return plans.map(plan => {
    const isFree = plan.price === 0;

    // Convert session text
    const sessionText = !plan?.plans?.no_of_sessions
      ? plan.plans.isUnlimitedSession
        ? 'Allowed Number of Sessions: Unlimited'
        : 'Allowed Number of Sessions: 0'
      : `Allowed Number of Sessions: ${plan?.plans?.no_of_sessions + ' sessions/month'}`;

    // Example mapping rules for Pay Frequency (customize as needed)
    const payFrequency = isFree ? 'Twice a Month' : 'Weekly';

    const features: PricingFeature[] = [
      {
        name: sessionText,
        status: true,
      },
      {
        name: `Pay Frequency: ${payFrequency}`,
        status: true,
      },
      {
        name: 'Priority Response',
        status: plan.plans.priority_response || false, // Example: free plan false, paid true
      },
      {
        name: '24/7 Support',
        status: plan.plans.allday_support || false, // Example: free plan false, paid true
      },
    ];

    return {
      name: plan.title.replace('Monthly Plan', '').trim(), // "Free Monthly Plan" → "Free"
      trial: `${plan.free_trial_in_days} days`,
      isFree: isFree ? true : undefined,
      price: isFree ? '' : `$${plan.price}`,
      priceDetails: isFree ? '' : '/month',
      plansFeature: features,
      id: plan._id,
    };
  });
}

function SubscriptionInterpreterList({ handelSessionModal }: IProps) {
  const router = useRouter();
  const subscriptionQuery = useQuery({
    queryKey: queryKeys.interpreterSubscriptionList,
    queryFn: subscriptionListInterpreterApi,
  });

  const subscriptionPlanData = subscriptionQuery.data?.data || [];

  const data = transformPlans(subscriptionPlanData);

  // console.log(data, '***t');

  return (
    <Container fixed>
      <Box className='subscribePlanheading'>
        <Grid2 container rowSpacing={3} columnSpacing={3} className='subscribePlanrow'>
          <Grid2 size={{ xs: 12, lg: 8 }} className='subscribePlanrowLf'>
            <SectionHeading>
              <Typography variant='h1' className='mainHead'>
                <Typography variant='caption'>Subscription</Typography> Plans
              </Typography>
              <Typography variant='body1' className='desc-content'>
                Everything you need to grow and earn as a professional interpreter. Choose the plan
                that works best for you.
              </Typography>
            </SectionHeading>
          </Grid2>
          <Grid2 size={{ xs: 12, lg: 4 }} className='subscribePlanrowRt'>
            <Button className='seasonRatebtn' onClick={handelSessionModal}>
              View Session Rates{' '}
              <i className='icon'>
                <DoubleArrow />
              </i>
            </Button>
          </Grid2>
        </Grid2>
      </Box>

      <Box className='subscribePlanDetails'>
        <Grid2 container rowSpacing={2.8} columnSpacing={3} justifyContent='center'>
          {data.map((item, index) => (
            <Grid2 size={{ xs: 12, lg: 4, md: 6 }} key={index}>
              <PricingCard
                {...item}
                type='interpreter'
                handleSubscribeClick={() => {
                  router.push(`/interpreter/payment/payment-method/?plan=${item.id}`);
                }}
              />
            </Grid2>
          ))}
        </Grid2>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', my: 7 }}>
        <Typography
          sx={{ cursor: 'pointer', zIndex: 500 }}
          onClick={() => window.open('/subscription-tc/', '_blank', 'noopener,noreferrer')}
        >
          Terms & Conditions
        </Typography>
      </Box>
    </Container>
  );
}

export default SubscriptionInterpreterList;
