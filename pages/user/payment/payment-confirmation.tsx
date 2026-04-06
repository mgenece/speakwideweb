import PaymentConfirmationUser from '@/components/layouts/Subscription/user/PaymentConfirmation';
import Wrapper from '@/layout/wrapper/Wrapper';

export default function PaymentConfirmation() {
  return (
    <Wrapper isFixedHeader>
      <PaymentConfirmationUser />
    </Wrapper>
  );
}
