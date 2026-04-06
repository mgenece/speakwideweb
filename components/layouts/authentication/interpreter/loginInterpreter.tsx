import { loginInterpreterApi } from '@/api/functions/auth.api';
import { storageKeys } from '@/config/constants';
import { refreshFCMToken } from '@/lib/fcm-helpers';
import { isSubscriptionActiveOrTrial } from '@/lib/functions/_helpers.lib';
import { getCookie, setCookieClient } from '@/lib/functions/storage.lib';
import { strictEmailRegex } from '@/lib/regex';
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

// Validation schema
const loginSchema = yup.object({
  email: yup
    .string()
    .required('Email is required')
    .matches(strictEmailRegex, 'Please enter a valid email address'),
  password: yup.string().required('Password is required'),
  rememberMe: yup.boolean().default(false),
});

type LoginFormData = yup.InferType<typeof loginSchema>;

const personaStatus = ['completed', 'approved'];

export default function LoginInterpreter() {
  const router = useRouter();
  const loginInterpretor = useMutation({
    mutationFn: loginInterpreterApi,
    onSuccess: data => {
      const loginData = data.data;
      if (!loginData.gender) {
        toast.success('Provide your profile information');
        sessionStorage.setItem(storageKeys.sessionStorage.onBoardData, JSON.stringify(loginData));
        setCookieClient(storageKeys.cookies.onBoardToken, data.token);
        setCookieClient(storageKeys.cookies.userRole, 'interpreter');
        router.push('/interpreter/onboard/add-profile-details');
        return;
      }
      if (!personaStatus.includes(loginData.personaVerifyStatus)) {
        toast.success('Verify your identity.');
        sessionStorage.setItem(storageKeys.sessionStorage.onBoardData, JSON.stringify(loginData));
        setCookieClient(storageKeys.cookies.onBoardToken, data.token);
        setCookieClient(storageKeys.cookies.userRole, 'interpreter');
        router.push(`/interpreter/onboard/verify-user/?id=${loginData._id}`);
        return;
      }
      if (!loginData.isAvailabilityAdded) {
        toast.success('Add availability.');
        sessionStorage.setItem(storageKeys.sessionStorage.onBoardData, JSON.stringify(loginData));
        setCookieClient(storageKeys.cookies.onBoardToken, data.token);
        setCookieClient(storageKeys.cookies.userRole, 'interpreter');
        router.push('/interpreter/onboard/set-availabality/');
        return;
      }

      if (!isSubscriptionActiveOrTrial(loginData?.subscriptionDetails)) {
        if (loginData?.subscriptionDetails) {
          toast.error('Subscription expired.');
        } else {
          toast.error('Please subscribe a plan.');
        }
        setCookieClient(storageKeys.cookies.onBoardToken, data.token);
        setCookieClient(storageKeys.cookies.userRole, 'interpreter');
        router.push('/interpreter/payment/pricing/');
        return;
      }

      if (!loginData.isBankAccountAdded) {
        toast.error('Link your bank account.');
        setCookieClient(storageKeys.cookies.onBoardToken, data.token);
        setCookieClient(storageKeys.cookies.userRole, 'interpreter');
        router.push('/interpreter/payment/add-bank-account/');
        return;
      }

      // console.log(data, '**');
      refreshFCMToken();
      toast.success('Login successful');
      setCookieClient(storageKeys.cookies.jwtToken, data.token);
      setCookieClient(storageKeys.cookies.userRole, 'interpreter');

      router.push('/interpreter/dashboard/');
    },
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: true,
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    const deviceToken = getCookie(storageKeys.cookies.fcmToken);
    loginInterpretor.mutate({
      user_name: data.email,
      password: data.password,
      deviceToken: deviceToken || '',
    });
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
                  {...field}
                  labelName='Email'
                  placeholder='Enter your email'
                  endAdornment={<MailIcon />}
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
                  {...field}
                  labelName='Password'
                  placeholder='Enter your password'
                  isPassword
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
                name='rememberMe'
                control={control}
                render={({ field }) => (
                  <FormControlLabel
                    control={<Checkbox {...field} checked={field.value} disableRipple />}
                    label='Remember me'
                  />
                )}
              />
              <Link href='/auth/forgot-password?role=interpreter' className='forgot-password-link'>
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
              disabled={loginInterpretor.isPending}
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
            href={'https://play.google.com/store/apps/details?id=com.speakwideinterpreter'}
            target='_blank'
          >
            <Image src={'/assets/icons/google-play.svg'} alt='icon485' height={100} width={100} />
          </Link>

          <Link
            href={'https://apps.apple.com/in/app/speakwide-interpreter/id6756371190'}
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
