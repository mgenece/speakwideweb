import { forgotOtpVerifyApi } from '@/api/functions/auth.api';
import { storageKeys } from '@/config/constants';
import { useAppDispatch } from '@/hooks/redux/useAppDispatch';
import { removerFromSessionStorage } from '@/lib/functions/storage.lib';
import { setForgotPassToken } from '@/redux-toolkit/slices/forgotPass.slice';
import { Box, Grid2, InputLabel } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useState } from 'react';
import toast from 'react-hot-toast';
import OTPInput from 'react-otp-input';
import ButtonCommon from '../common/ButtonCommon';

interface IProps {
  forgotData: {
    type: string;
    role: string;
    phone: string;
    email: string;
  };
}

export default function OtpForgotPass({ forgotData }: IProps) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [otp, setOtp] = useState('');

  const forgotOtpVerifyMutaion = useMutation({
    mutationFn: forgotOtpVerifyApi,
    onSuccess: data => {
      removerFromSessionStorage(storageKeys.sessionStorage.forgotOtp);
      toast.success('OTP verification successful');
      dispatch(setForgotPassToken(data.data.resetToken));
      router.push('/auth/new-password');
    },
  });

  //   dispatch(setForgotPassToken('HelloTest'));

  //   console.log(forgotData, '***');

  const handleSubmit = () => {
    forgotOtpVerifyMutaion.mutate({ ...forgotData, otp: otp });

    // router.push('/auth/new-password');
  };
  return (
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
                  type='number'
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
          isLoading={forgotOtpVerifyMutaion.isPending}
          disabled={otp.length !== 4}
          onClick={handleSubmit}
        >
          Verify OTP
        </ButtonCommon>
      </Grid2>
    </Grid2>
  );
}
