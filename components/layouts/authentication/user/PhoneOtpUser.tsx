import { resendPhoneOtpApi, verifyOtpApi } from '@/api/functions/auth.api';
import { storageKeys } from '@/config/constants';
import { removerFromSessionStorage, setCookieClient } from '@/lib/functions/storage.lib';
import { Box, Grid2, InputLabel, Typography } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useState } from 'react';
import toast from 'react-hot-toast';
import OTPInput from 'react-otp-input';
import ButtonCommon from '../../common/ButtonCommon';

export default function PhoneOtpUser({ phone }: { phone: string }) {
  const router = useRouter();
  const [otp, setOtp] = useState('');

  const token = sessionStorage.getItem(storageKeys.cookies.onBoardToken);

  const verifyOtpMutation = useMutation({
    mutationFn: verifyOtpApi,
    onSuccess: () => {
      if (token) {
        setCookieClient(storageKeys.cookies.onBoardToken, token);
        setCookieClient(storageKeys.cookies.userRole, 'user');
      }
      toast.success('Phone verification successful.');
      const isRemoveSuccess = removerFromSessionStorage(storageKeys.sessionStorage.otpPhone);
      removerFromSessionStorage(storageKeys.cookies.onBoardToken);
      if (isRemoveSuccess) {
        router.push('/user/onboard/business-details');
      }
    },
  });
  const resendOtpPhoneMutation = useMutation({
    mutationFn: resendPhoneOtpApi,
    onSuccess: () => {
      toast.success('OTP successfully sent to your phone.');
    },
  });

  const handleVerifyOtp = () => {
    verifyOtpMutation.mutate({ phone: phone, otp: otp, role: 'user', type: 'phone' });
  };

  const handleResendOtp = () => {
    resendOtpPhoneMutation.mutate({ phone, role: 'user', type: 'phone' });
  };

  return (
    <form>
      <Grid2 container spacing={2}>
        <Grid2 size={{ xs: 12 }}>
          <Box className='otp-content'>
            <InputLabel>OTP</InputLabel>
            <OTPInput
              value={otp}
              onChange={setOtp}
              numInputs={4}
              shouldAutoFocus
              renderInput={(props, index) => {
                const isFilled = otp[index] && otp[index].trim() !== '';
                return (
                  <input
                    {...props}
                    placeholder='-'
                    className={`otp-input ${isFilled ? 'filled' : ''}`}
                  />
                );
              }}
              containerStyle='otp-container'
              skipDefaultStyles
            />
          </Box>
        </Grid2>
        <Grid2 size={{ xs: 12 }}>
          <ButtonCommon
            variant='contained'
            color='primary'
            className='primary-gradiant-btn'
            fullWidth
            disabled={otp.length !== 4}
            onClick={handleVerifyOtp}
            isLoading={verifyOtpMutation.isPending}
          >
            Verify OTP
          </ButtonCommon>
        </Grid2>
        <Grid2 size={{ xs: 12 }}>
          <Typography>
            Didn't receive otp ?{' '}
            <ButtonCommon isLoading={resendOtpPhoneMutation.isPending} onClick={handleResendOtp}>
              Resend
            </ButtonCommon>
          </Typography>
        </Grid2>
      </Grid2>
    </form>
  );
}
