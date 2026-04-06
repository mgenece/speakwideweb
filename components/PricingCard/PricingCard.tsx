import { PricingCardStyled } from '@/styles/StyledComponents/PricingCardStyled';
import CustomButtonPrimary from '@/ui/CustomButtons/CustomButtonPrimary';
import RadioCheckedIcon from '@/ui/Icons/RadioCheckedIcon';
import RadioUncheckIcon from '@/ui/Icons/RadioUncheckIcon';
import { Box, Chip, List, ListItem, Radio, Stack, Typography } from '@mui/material';
import { useRouter } from 'next/router';

type plansFeatureDetails = {
  name: string;
  status: boolean;
};

export interface PricingCardInterface {
  name: string;
  trial: string;
  price: string;
  id: string;
  priceDetails: string;
  hasRequest?: boolean;
  isFree?: boolean;
  noSubBtn?: boolean;
  plansFeature?: plansFeatureDetails[];
  type?: 'interpreter';
  handleSubscribeClick?: () => void;
}

function PricingCard({
  name,
  trial,
  price,
  priceDetails,
  plansFeature,
  hasRequest,
  type,
  isFree,
  noSubBtn,
  handleSubscribeClick,
  id,
}: PricingCardInterface) {
  const router = useRouter();

  // console.log(trial, '***t');

  return (
    <PricingCardStyled className={type === 'interpreter' ? 'interpreterCard' : ''}>
      <Box className='PricingCardOuter'>
        <Box className='PricingCardTop'>
          <Box className='priceStatus'>
            <Typography variant='h4' className='typePrc'>
              {name}
            </Typography>
            {type === 'interpreter' ? (
              <Typography variant='body1'>+ {trial} free trial</Typography>
            ) : (
              <Typography variant='body1'>
                + Get <strong style={{ fontWeight: 600 }}>{trial}</strong> free trial
              </Typography>
            )}
          </Box>
          <Box className='priceAmount'>
            {!isFree ? (
              price ? (
                <>
                  <Typography variant='caption' className='priceTotal'>
                    {price}
                  </Typography>
                  <Typography variant='caption' className='priceYearMnth'>
                    {priceDetails}
                  </Typography>
                </>
              ) : (
                <Typography variant='caption' className='customprice'>
                  Custom <br />
                  Pricing
                </Typography>
              )
            ) : (
              <Chip
                className='chip-class'
                label={
                  <Stack
                    direction={'row'}
                    alignItems={'center'}
                    justifyContent={'space-between'}
                    spacing={'5px'}
                  >
                    <Radio checked icon={<RadioUncheckIcon />} checkedIcon={<RadioCheckedIcon />} />
                    <Typography variant='body1'>Free</Typography>
                  </Stack>
                }
              />
            )}
          </Box>
        </Box>
        {type === 'interpreter' && !noSubBtn && (
          <CustomButtonPrimary
            type='button'
            variant='outlined'
            color='primary'
            onClick={handleSubscribeClick}
            className='subs-btn'
          >
            Subscribe
          </CustomButtonPrimary>
        )}
        <Box className='PricingCardMiddle'>
          <Typography variant='body1' className='planGetsHd'>
            This plan gets
          </Typography>
          <Box className='planfeatureBox'>
            <List>
              {plansFeature?.map((item, index) => (
                <ListItem key={index} className={item?.status ? 'active' : 'inactive'}>
                  {item?.name}
                </ListItem>
              ))}
            </List>
          </Box>
        </Box>
        <Box className='PricingCardBtm'>
          {type !== 'interpreter' &&
            !noSubBtn &&
            (!hasRequest ? (
              <CustomButtonPrimary
                type='button'
                variant='outlined'
                color='primary'
                onClick={() => router.push(`/user/payment/payment-method?plan=${id}`)}
              >
                Subscribe
              </CustomButtonPrimary>
            ) : (
              <CustomButtonPrimary
                type='button'
                variant='outlined'
                color='primary'
                onClick={() => router.push('/user/payment/payment-method')}
              >
                Request Quote
              </CustomButtonPrimary>
            ))}
        </Box>
      </Box>
    </PricingCardStyled>
  );
}

export default PricingCard;
