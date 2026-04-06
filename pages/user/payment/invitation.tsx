import InvitationUser from '@/components/layouts/Subscription/user/InvitationUser';
import assest from '@/json/assest';
import Wrapper from '@/layout/wrapper/Wrapper';
import { PaymentConfirmationMainWrapper } from '@/styles/StyledComponents/PaymentConfirmationMainWrapper';
import { Box, Container } from '@mui/material';
import Image from 'next/image';

function Invitation() {
  return (
    <Wrapper isFixedHeader>
      <PaymentConfirmationMainWrapper>
        <Box className='paymentConfirmation_mainWrapper'>
          <Image
            src={assest.paymentConfirmationBg}
            alt='bg-image'
            width={1920}
            height={1800}
            className='bgShapeImg'
            style={{ zIndex: -1 }}
          />
          <Container fixed maxWidth='lg' sx={{ zIndex: 5 }}>
            <InvitationUser />
          </Container>
        </Box>
      </PaymentConfirmationMainWrapper>
    </Wrapper>
  );
}

export default Invitation;
