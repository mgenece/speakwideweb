import { loginUserApi, resendEmailOtpApi, resendPhoneOtpApi } from '@/api/functions/auth.api';
import { storageKeys } from '@/config/constants';
import { refreshFCMToken } from '@/lib/fcm-helpers';
import { isSubscriptionActiveOrTrial } from '@/lib/functions/_helpers.lib';
import {
  getCookie,
  getFromSessionStorage,
  saveInSessionStorage,
  setCookieClient,
} from '@/lib/functions/storage.lib';
import { userLoginSchema } from '@/lib/schema/auth.schema';
import { AuthContent } from '@/styles/StyledComponents/AuthWrapperStyled';
import InputFieldCommon from '@/ui/CommonInput/CommonInput';
import MailIcon from '@/ui/Icons/MailIcon';
import { yupResolver } from '@hookform/resolvers/yup';
import { Checkbox, FormControlLabel, Grid2, Stack } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Controller, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import * as yup from 'yup';
import ButtonCommon from '../../common/ButtonCommon';

import { Box } from '@mui/material';
import Image from 'next/image';

type LoginFormData = yup.InferType<typeof userLoginSchema>;

export default function LoginUser() {
  const router = useRouter();
  const paymentPhone = router.query?.device === 'phone';

  const resendOtpPhoneMutation = useMutation({
    mutationFn: resendPhoneOtpApi,
    onSuccess: () => {
      toast.success('OTP successfully sent to your phone.');
    },
  });

  const resendOtpEmailMutation = useMutation({
    mutationFn: resendEmailOtpApi,
    onSuccess: () => {
      toast.success('OTP successfully sent to your email.');
      const phone = getFromSessionStorage(storageKeys.sessionStorage.otpPhone);
      resendOtpPhoneMutation.mutate({ phone: phone as string, role: 'user', type: 'phone' });
    },
  });

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userLoginSchema),
    defaultValues: {
      email: '',
      password: '',
      remember: true,
    },
  });

  const remember = watch('remember');

  const loginMutation = useMutation({
    mutationFn: loginUserApi,
    onSuccess: data => {
      const LoginData = data.data;
      // console.log(paymentPhone, '***p');

      if (!LoginData.isEmailOtpVerified) {
        toast.error('Please verify email and phone number.');
        resendOtpEmailMutation.mutate({ email: LoginData.email, role: 'user', type: 'email' });

        const emailStoreSuccess = saveInSessionStorage(
          storageKeys.sessionStorage.otpEmail,
          LoginData.email
        );
        const phoneStoreSuccess = saveInSessionStorage(
          storageKeys.sessionStorage.otpPhone,
          LoginData.phone
        );
        saveInSessionStorage(
          storageKeys.sessionStorage.hasSmsConsent,
          String(LoginData.has_sms_consent)
        );
        if (emailStoreSuccess && phoneStoreSuccess) {
          router.push('/auth/verify-otp/');
        }
        return;
      }
      if (!LoginData.isPhoneOtpVerified && LoginData.has_sms_consent) {
        toast.error('Please verify phone number.');
        resendOtpPhoneMutation.mutate({ phone: LoginData.phone, role: 'user', type: 'phone' });
        const phoneStoreSuccess = saveInSessionStorage(
          storageKeys.sessionStorage.otpPhone,
          LoginData.phone
        );

        if (phoneStoreSuccess && LoginData.has_sms_consent) {
          router.push('/auth/verify-otp-phone');
        }
        return;
      }
      if (!LoginData.isBusinessAdded) {
        toast.error('Please add business data.');
        setCookieClient(storageKeys.cookies.onBoardToken, data.token);
        setCookieClient(storageKeys.cookies.userRole, 'user');
        router.push('/user/onboard/business-details');
        return;
      }

      if (!isSubscriptionActiveOrTrial(LoginData?.subscriptionDetails)) {
        if (LoginData?.subscriptionDetails) {
          toast.error('Subscription expired.');
        } else {
          toast.error('Please subscribe a plan.');
        }
        setCookieClient(storageKeys.cookies.onBoardToken, data.token);
        setCookieClient(storageKeys.cookies.userRole, 'user');
        router.push('/user/payment/pricing/');
        return;
      }

      refreshFCMToken();
      toast.success('Login successful.');
      setCookieClient(storageKeys.cookies.jwtToken, data.token);
      setCookieClient(storageKeys.cookies.userRole, 'user');
      if (remember) {
        setCookieClient(storageKeys.cookies.refreshToken, data.refresh_token);
      }
      router.push('/user/dashboard/');
      return;
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    if (paymentPhone) {
      setCookieClient('device-payment', 'true');
    }
    const deviceToken = getCookie(storageKeys.cookies.fcmToken);
    loginMutation.mutate({
      user_name: data.email,
      password: data.password,
      deviceToken: deviceToken || '',
    });
    return data;
  };

  return (
    <AuthContent>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid2 container spacing={2}>
          <Grid2 size={{ xs: 12 }}>
            <Controller
              name='email'
              control={control}
              render={({ field }) => (
                <InputFieldCommon
                  labelName='Email'
                  placeholder='Enter your email'
                  endAdornment={<MailIcon />}
                  {...field}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
              )}
            />
          </Grid2>
          <Grid2 size={{ xs: 12 }}>
            <Controller
              name='password'
              control={control}
              render={({ field }) => (
                <InputFieldCommon
                  labelName='Password'
                  placeholder='Enter your password'
                  isPassword
                  {...field}
                  error={!!errors.password}
                  helperText={errors.password?.message}
                />
              )}
            />
          </Grid2>
          <Grid2 size={{ xs: 12 }}>
            <Stack
              direction='row'
              alignItems='center'
              justifyContent='space-between'
              className='remember-sec'
            >
              <Controller
                name='remember'
                control={control}
                render={({ field }) => (
                  <FormControlLabel
                    control={<Checkbox {...field} checked={field.value} disableRipple />}
                    label='Remember me'
                  />
                )}
              />
              <Link href='/auth/forgot-password?role=user' className='forgot-password-link'>
                Forgot Password?
              </Link>
            </Stack>
          </Grid2>
          <Grid2 size={{ xs: 12 }}>
            <ButtonCommon
              type='submit'
              variant='contained'
              color='primary'
              className='primary-gradiant-btn'
              fullWidth
              isLoading={loginMutation.isPending}
            >
              Login
            </ButtonCommon>
          </Grid2>
        </Grid2>

        <Box
          sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2 }}
          height={80}
        >
          <Link
            href={'https://play.google.com/store/apps/details?id=com.speakwideuser'}
            target='_blank'
          >
            <Image src={'/assets/icons/google-play.svg'} alt='icon485' height={100} width={100} />
          </Link>

          <Link
            href={'https://apps.apple.com/in/app/speakwide-client/id6756369423'}
            target='_blank'
          >
            <Image
              src={'/assets/icons/app-store-apple-logo.svg'}
              alt='icon485'
              height={100}
              width={100}
            />
          </Link>
        </Box>
      </form>
    </AuthContent>
  );
}
