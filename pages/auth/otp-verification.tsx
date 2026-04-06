import AuthWrapper from '@/components/AuthWrapper/AuthWrapper';
import OtpForgotPass from '@/components/layouts/authentication/OtpForgotPass';
import LoaderCommon from '@/components/layouts/common/Loader';
import { storageKeys } from '@/config/constants';
import { getFromSessionStorage } from '@/lib/functions/storage.lib';
import { AuthContent } from '@/styles/StyledComponents/AuthWrapperStyled';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function OtpVerification() {
  const [forgotData, setForgotData] = useState({ type: '', role: '', phone: '', email: '' });
  const router = useRouter();
  useEffect(() => {
    const userDataStr = getFromSessionStorage(storageKeys.sessionStorage.forgotOtp);

    if (userDataStr) {
      const userData = JSON.parse(userDataStr);
      setForgotData(userData);
    } else {
      router.push('/');
    }
  }, []);

  if (!forgotData.type) {
    return <LoaderCommon />;
  }
  return (
    <AuthWrapper
      headingSpan='OTP'
      mainHeding='Verification'
      subText={`OTP has been sent to ${forgotData.email || forgotData.phone}`}
      isBack
    >
      <AuthContent>
        <OtpForgotPass forgotData={forgotData} />
      </AuthContent>
    </AuthWrapper>
  );
}
