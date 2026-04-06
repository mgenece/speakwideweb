import AuthWrapper from '@/components/AuthWrapper/AuthWrapper';
import ForgotPass from '@/components/layouts/authentication/ForgotPass';
import { AuthContent } from '@/styles/StyledComponents/AuthWrapperStyled';

export default function ForgotPassword() {
  return (
    <AuthWrapper
      headingSpan='Forgot'
      mainHeding='Password!'
      subText='Enter your email address to get OTP'
      isBack
    >
      <AuthContent>
        <ForgotPass />
      </AuthContent>
    </AuthWrapper>
  );
}
