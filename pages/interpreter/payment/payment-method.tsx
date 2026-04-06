import PaymentMethodInt from '@/components/layouts/Subscription/interpreter/PaymentMethod';
import Wrapper from '@/layout/wrapper/Wrapper';

export default function PaymentMethod() {
  return (
    <Wrapper isFixedHeader>
      <PaymentMethodInt />
    </Wrapper>
  );
}
