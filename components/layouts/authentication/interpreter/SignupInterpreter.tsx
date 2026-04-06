import { signupInterpreterApiV2 } from '@/api/functions/auth.api';
import { cmsDataApi } from '@/api/functions/cms.api';
import InterpreterSignupAgrement from '@/components/InterpreterSignupAgrement/InterpreterSignupAgrement';
import { storageKeys } from '@/config/constants';
import { getCookie, setCookieClient } from '@/lib/functions/storage.lib';
import { singupSchemaInterpreter } from '@/lib/schema/auth.schema';
import InputFieldCommon from '@/ui/CommonInput/CommonInput';
import CheckBoxEmptyIcon from '@/ui/Icons/CheckBoxEmptyIcon';
import CheckedIconCheckBox from '@/ui/Icons/CheckedIconCheckBox';
import MailIcon from '@/ui/Icons/MailIcon';
import PhoneIcon2 from '@/ui/Icons/PhoneIcon2';
import UserIcon from '@/ui/Icons/UserIcon';
import MuiModalWrapper from '@/ui/Modal/MuiModalWrapper';
import { PhoneInputCommon } from '@/ui/PhoneInput';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Checkbox, FormControlLabel, Grid2, Typography } from '@mui/material';
import { useMutation, useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import ButtonCommon from '../../common/ButtonCommon';

// Define form data type
interface IFormData {
  fullName: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
  agreeToSms?: boolean;
}

export default function SignupInterpreter() {
  const [interpreterAgrement, setInterpreterAgrement] = useState(false);
  const signupMutation = useMutation({
    mutationFn: signupInterpreterApiV2,
    onSuccess: data => {
      sessionStorage.setItem(storageKeys.sessionStorage.onBoardData, JSON.stringify(data));
      setCookieClient(storageKeys.cookies.onBoardToken, data.data.token);
      setCookieClient(storageKeys.cookies.userRole, 'interpreter');
      toast.success('Registration successful');
      router.push('/interpreter/onboard/add-profile-details');
    },
  });

  const { data } = useQuery({
    queryKey: ['interpreter-agreement'],
    queryFn: () => cmsDataApi({ slug: 'interpreter-agreement' }),
  });

  const agreement = data?.data;

  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<IFormData>({
    resolver: yupResolver(singupSchemaInterpreter),
    defaultValues: {
      fullName: '',
      email: '',
      phoneNumber: '',
      password: '',
      confirmPassword: '',
      agreeToSms: false,
    },
    mode: 'onTouched',
  });

  const onSubmit = (data: IFormData) => {
    setInterpreterAgrement(true);
    return data;
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Grid2 container spacing={2}>
          <Grid2 size={{ xs: 12 }}>
            <Controller
              name='fullName'
              control={control}
              render={({ field }) => (
                <InputFieldCommon
                  {...field}
                  labelName='Full Name'
                  placeholder='Enter your name'
                  endAdornment={<UserIcon />}
                  error={!!errors.fullName}
                  helperText={errors.fullName?.message}
                />
              )}
            />
          </Grid2>

          <Grid2 size={{ xs: 12 }}>
            <Controller
              name='email'
              control={control}
              render={({ field }) => (
                <InputFieldCommon
                  {...field}
                  labelName='Email'
                  placeholder='Enter your email'
                  type='email'
                  endAdornment={<MailIcon />}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
              )}
            />
          </Grid2>

          <Grid2 size={{ xs: 12 }}>
            <Controller
              name='phoneNumber'
              control={control}
              render={({ field }) => (
                <PhoneInputCommon
                  value={field.value}
                  onChange={field.onChange}
                  labelName='Phone Number'
                  placeholder='Enter your phone number'
                  // defaultCountry='in'
                  error={!!errors.phoneNumber}
                  helperText={errors.phoneNumber?.message}
                  fullWidth
                  endAdornment={<PhoneIcon2 />}
                />
              )}
            />
          </Grid2>

          <Grid2 size={{ xs: 12 }}>
            <Controller
              name='agreeToSms'
              control={control}
              render={({ field }) => (
                <Box>
                  <FormControlLabel
                    className='checkbox'
                    sx={{ alignItems: 'flex-start', ml: '0px' }}
                    control={
                      <Checkbox
                        {...field}
                        checked={field.value}
                        icon={<CheckBoxEmptyIcon IconHeight='16' IconWidth='16' />}
                        checkedIcon={<CheckedIconCheckBox />}
                        sx={{ pt: '5px', pl: '0px' }}
                      />
                    }
                    label={
                      <Typography variant='caption' sx={{ display: 'block' }}>
                        I consent to receive SMS messages from Speakwide related to account
                        notifications and two-factor authentication (2FA) at the phone number
                        provided. Message frequency may vary. Message and data rates may apply.
                        Reply STOP to opt out or HELP for assistance.
                      </Typography>
                    }
                  />
                  {errors.agreeToSms && (
                    <Typography
                      variant='caption'
                      color='error'
                      sx={{ display: 'block', mt: 0.5, ml: 4 }}
                    >
                      {errors.agreeToSms.message}
                    </Typography>
                  )}
                </Box>
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
            <Controller
              name='confirmPassword'
              control={control}
              render={({ field }) => (
                <InputFieldCommon
                  {...field}
                  labelName='Confirm Password'
                  placeholder='Re-Enter your password'
                  isPassword
                  error={!!errors.confirmPassword}
                  helperText={errors.confirmPassword?.message}
                />
              )}
            />
          </Grid2>

          <Grid2 size={{ xs: 12 }}>
            <ButtonCommon
              variant='contained'
              color='primary'
              className='primary-gradiant-btn'
              fullWidth
              type='submit'
              loading={signupMutation.isPending}
            >
              Continue
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

      <MuiModalWrapper
        open={interpreterAgrement}
        sx={{
          '.MuiDialog-container': {
            '.MuiPaper-root': {
              maxHeight: 'initial',
              '.MuiDialogContent-root': {
                padding: '0px',
              },
            },
          },
        }}
      >
        <InterpreterSignupAgrement
          handleClose={() => setInterpreterAgrement(false)}
          content={agreement?.content}
          handleContinue={() => {
            const formData = watch();
            const deviceToken = getCookie(storageKeys.cookies.fcmToken);
            const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
            signupMutation.mutate({
              full_name: formData.fullName,
              email: formData.email,
              phone: formData.phoneNumber,
              password: formData.password,
              confirm_password: formData.confirmPassword,
              timeZone: userTimeZone,
              deviceToken: deviceToken || '',
            });
            setInterpreterAgrement(false);
          }}
        />
      </MuiModalWrapper>
    </>
  );
}
