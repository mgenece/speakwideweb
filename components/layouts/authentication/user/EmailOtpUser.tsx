import { resendEmailOtpApi, verifyOtpApi } from '@/api/functions/auth.api';
import { storageKeys } from '@/config/constants';
import { getFromSessionStorage, removerFromSessionStorage } from '@/lib/functions/storage.lib';
import { Box, Grid2, InputLabel, Typography } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useState } from 'react';
import toast from 'react-hot-toast';
import OTPInput from 'react-otp-input';
import ButtonCommon from '../../common/ButtonCommon';

function EmailOtpUser({ email }: { email: string }) {
  const router = useRouter();
  const [otp, setOtp] = useState('');
  const verifyOtpMutation = useMutation({
    mutationFn: verifyOtpApi,
    onSuccess: () => {
      toast.success('Email verification successful.');
      const isRemoveSuccess = removerFromSessionStorage(storageKeys.sessionStorage.otpEmail);
      const smsConsent = getFromSessionStorage(storageKeys.sessionStorage.hasSmsConsent);
      if (isRemoveSuccess && smsConsent === 'true') {
        router.push('/auth/verify-otp-phone');
      } else {
        router.push('/auth/login');
      }
    },
  });

  const resendOtpEmailMutation = useMutation({
    mutationFn: resendEmailOtpApi,
    onSuccess: () => {
      toast.success('OTP successfully sent to your email.');
    },
  });

  const handleVerifyOtp = () => {
    verifyOtpMutation.mutate({ email: email, otp: otp, role: 'user', type: 'email' });
  };

  const handleResendOtp = () => {
    resendOtpEmailMutation.mutate({ email, role: 'user', type: 'email' });
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
            isLoading={verifyOtpMutation.isPending}
            onClick={handleVerifyOtp}
          >
            Verify OTP
          </ButtonCommon>
        </Grid2>
        <Grid2 size={{ xs: 12 }}>
          <Typography>
            Didn't receive otp ?{' '}
            <ButtonCommon isLoading={resendOtpEmailMutation.isPending} onClick={handleResendOtp}>
              Resend
            </ButtonCommon>
          </Typography>
        </Grid2>
      </Grid2>
    </form>
  );
}

export default EmailOtpUser;
