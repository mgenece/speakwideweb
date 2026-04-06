import PricingUser from '@/components/layouts/Subscription/user/PricingTable';
import SubscriptionListing from '@/components/layouts/Subscription/user/SubscriptionListing';
import Wrapper from '@/layout/wrapper/Wrapper';
import { useState } from 'react';

function Index() {
  const [sessionRate, setSessionRate] = useState(false);

  const handelSessionModal = () => {
    setSessionRate(!sessionRate);
  };
  return (
    <Wrapper isFixedHeader>
      <SubscriptionListing handelSessionModal={handelSessionModal} />
      <PricingUser handelSessionModal={handelSessionModal} sessionRate={sessionRate} />
    </Wrapper>
  );
}

export default Index;
