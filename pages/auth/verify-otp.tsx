import AuthWrapper from '@/components/AuthWrapper/AuthWrapper';
import EmailOtpUser from '@/components/layouts/authentication/user/EmailOtpUser';
import LoaderCommon from '@/components/layouts/common/Loader';
import { storageKeys } from '@/config/constants';
import { getFromSessionStorage } from '@/lib/functions/storage.lib';
import { AuthContent } from '@/styles/StyledComponents/AuthWrapperStyled';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function VerifyOtp() {
  const [email, setEmail] = useState('');
  const router = useRouter();
  useEffect(() => {
    const emailTemp = getFromSessionStorage(storageKeys.sessionStorage.otpEmail);
    if (emailTemp) {
      setEmail(emailTemp);
    } else {
      router.push('/');
    }
  }, []);

  if (!email) {
    return <LoaderCommon />;
  }

  return (
    <AuthWrapper
      headingSpan='Verify '
      mainHeding='OTP'
      subText='One Time Password(OTP) has been sent to '
      subTextSpan={email}
      isBack
    >
      <AuthContent>
        <EmailOtpUser email={email} />
      </AuthContent>
    </AuthWrapper>
  );
}
