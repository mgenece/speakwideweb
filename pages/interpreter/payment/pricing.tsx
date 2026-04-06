import SubscriptionInterpreterList from '@/components/layouts/Subscription/interpreter/SubscriptionList';
import PricingInterpreter from '@/components/layouts/Subscription/user/PricingTable';
import assest from '@/json/assest';
import Wrapper from '@/layout/wrapper/Wrapper';
import { PricingPageStyled } from '@/styles/StyledComponents/PricingPageStyled';
import MuiModalWrapper from '@/ui/Modal/MuiModalWrapper';
import { Box } from '@mui/material';
import Image from 'next/image';
import { useState } from 'react';

function Index() {
  const [sessionRate, setSessionRate] = useState(false);

  const handelSessionModal = () => {
    setSessionRate(!sessionRate);
  };

  return (
    <Wrapper isFixedHeader>
      <PricingPageStyled>
        <Box className='subscribePlanOuter'>
          <Image
            src={assest.pricingBgShapeImg}
            alt='shape-image'
            width={1920}
            height={1800}
            className='bgShapeImgPricing'
          />
          <SubscriptionInterpreterList handelSessionModal={handelSessionModal} />
        </Box>
      </PricingPageStyled>
      <MuiModalWrapper
        open={sessionRate}
        onClose={handelSessionModal}
        className='sessionModalPricing'
      >
        <PricingInterpreter handelSessionModal={handelSessionModal} sessionRate={sessionRate} />
      </MuiModalWrapper>
    </Wrapper>
  );
}

export default Index;
