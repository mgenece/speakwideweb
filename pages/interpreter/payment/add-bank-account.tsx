import AddBankAccountSection from '@/components/layouts/Subscription/interpreter/AddBankAccount';
import Wrapper from '@/layout/wrapper/Wrapper';
import { SetAvailabalityWrapper } from '@/styles/StyledComponents/SetAvailabalityWrapper';

function AddBankAccount() {
  return (
    <SetAvailabalityWrapper
      width='100%'
      minHeight='100svh'
      position='relative'
      sx={{
        '.headerContainer': {
          paddingBottom: '14px',
          zIndex: 2,
          position: 'relative',
        },
      }}
    >
      <Wrapper>
        <AddBankAccountSection />
      </Wrapper>
    </SetAvailabalityWrapper>
  );
}

export default AddBankAccount;
