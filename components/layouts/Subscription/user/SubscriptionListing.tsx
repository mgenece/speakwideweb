import { subscriptionListUserApi } from '@/api/functions/subscription';
import PricingCard from '@/components/PricingCard/PricingCard';
import SectionHeading from '@/components/SectionHeading/SectionHeading';
import { queryKeys } from '@/config/constants';
import assest from '@/json/assest';
import { PricingPageStyled } from '@/styles/StyledComponents/PricingPageStyled';
import { ISubscriptionPlan } from '@/typescript/interface/subscription.interface';
import DoubleArrow from '@/ui/Icons/DoubleArrow';
import { Box, Button, CircularProgress, Container, Grid2, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';

interface IProps {
  handelSessionModal: () => void;
}

export const transformToPricingPlanContent = (data: ISubscriptionPlan[]) => {
  return data.map(plan => {
    const features = [
      { name: `Users: ${plan.plans.no_of_users}`, status: true },
      { name: 'Audio', status: !!plan.plans.audio },
      { name: 'Video', status: !!plan.plans.video },
      { name: 'Translation', status: !!plan.plans.translation },
      { name: 'Simultaneous', status: !!plan.plans.simultaneous },
      {
        name: 'Access to Certified Interpreters',
        status: !!plan.plans.certified_interpreter_access,
      },
      { name: 'Priority Response', status: !!plan.plans.priority_response },
      { name: '24/7 Support', status: !!plan.plans.allday_support },
    ];

    return {
      id: plan._id,
      name: plan.title,
      trial: `${plan.free_trial_in_days} days`,
      price: `$${plan.price}`,
      priceDetails: plan.type === 'monthly' ? '/month' : '/yaerly',
      plansFeature: features,
    };
  });
};

function SubscriptionListing({ handelSessionModal }: IProps) {
  const SubscriptionQuery = useQuery({
    queryKey: queryKeys.userSubscriptionList,
    queryFn: subscriptionListUserApi,
  });

  const planData = transformToPricingPlanContent(SubscriptionQuery.data?.data || []);

  // console.log(planData, '***t');

  return (
    <PricingPageStyled>
      <Box className='subscribePlanOuter'>
        <Image
          src={assest.pricingBgShapeImg}
          alt='shape-image'
          width={1920}
          height={1800}
          className='bgShapeImgPricing'
        />
        <Container fixed>
          <Box className='subscribePlanheading'>
            <Grid2 container rowSpacing={3} columnSpacing={3} className='subscribePlanrow'>
              <Grid2 size={{ xs: 12, lg: 8 }} className='subscribePlanrowLf'>
                <SectionHeading>
                  <Typography variant='h1' className='mainHead'>
                    <Typography variant='caption'>Subscription</Typography> Plans
                  </Typography>
                  <Typography variant='body1'>
                    Explore our pricing plans and choose the option that best suits your needs.
                  </Typography>
                  <Typography variant='body1'>
                    {' '}
                    We value your subscription and are committed to delivering our highest quality
                    of service
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
              {planData.length ? (
                planData?.map((item, index) => (
                  <Grid2 size={{ xs: 12, lg: 4, md: 6 }} key={index}>
                    <PricingCard
                      id={item.id}
                      name={item.name}
                      trial={item.trial}
                      price={item.price}
                      priceDetails={item.priceDetails}
                      plansFeature={item.plansFeature}
                    />
                  </Grid2>
                ))
              ) : (
                <CircularProgress />
              )}
            </Grid2>
          </Box>
        </Container>
      </Box>
    </PricingPageStyled>
  );
}

export default SubscriptionListing;
