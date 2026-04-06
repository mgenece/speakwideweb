import PymentConfirmationInt from '@/components/layouts/Subscription/interpreter/PymentConfirmation';
import Wrapper from '@/layout/wrapper/Wrapper';

export default function PaymentConfirmation() {
  return (
    <Wrapper isFixedHeader>
      <PymentConfirmationInt />
    </Wrapper>
  );
}
