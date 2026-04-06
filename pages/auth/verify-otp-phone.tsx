import AuthWrapper from '@/components/AuthWrapper/AuthWrapper';
import PhoneOtpUser from '@/components/layouts/authentication/user/PhoneOtpUser';
import LoaderCommon from '@/components/layouts/common/Loader';
import { storageKeys } from '@/config/constants';
import { getFromSessionStorage } from '@/lib/functions/storage.lib';
import { AuthContent } from '@/styles/StyledComponents/AuthWrapperStyled';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function VerifyOtpPhone() {
  const [phone, setPhone] = useState('');
  const router = useRouter();
  useEffect(() => {
    const phoneTemp = getFromSessionStorage(storageKeys.sessionStorage.otpPhone);
    const emailTemp = getFromSessionStorage(storageKeys.sessionStorage.otpEmail);
    if (emailTemp) {
      router.push('/auth/verify-otp/');
    } else if (phoneTemp) {
      setPhone(phoneTemp);
    } else {
      router.push('/');
    }
  }, []);

  if (!phone) {
    return <LoaderCommon />;
  }
  return (
    <AuthWrapper
      headingSpan='Verify '
      mainHeding='OTP'
      subText='One Time Password(OTP) has been sent to '
      subTextSpan={phone}
      isBack
    >
      <AuthContent>
        <PhoneOtpUser phone={phone} />
      </AuthContent>
    </AuthWrapper>
  );
}
