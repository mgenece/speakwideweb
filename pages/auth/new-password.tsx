import AuthWrapper from '@/components/AuthWrapper/AuthWrapper';
import SetNewPass from '@/components/layouts/authentication/SetNewPass';
import { AuthContent } from '@/styles/StyledComponents/AuthWrapperStyled';

export default function NewPassword() {
  return (
    <AuthWrapper
      headingSpan='New'
      mainHeding='Password'
      subText='Please enter a new password'
      isBack
    >
      <AuthContent>
        <SetNewPass />
      </AuthContent>
    </AuthWrapper>
  );
}
