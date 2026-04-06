import { signUpMutation } from '@/api/functions/auth.api';
import { cmsDataApi } from '@/api/functions/cms.api';
import UserSignupAgreement from '@/components/UserSignupAgreement/UserSignupAgreement';
import { storageKeys } from '@/config/constants';
import { saveInSessionStorage } from '@/lib/functions/storage.lib';
import { strictEmailRegex } from '@/lib/regex';
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
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { parsePhoneNumber } from 'react-phone-number-input';
import * as yup from 'yup';
import ButtonCommon from '../../common/ButtonCommon';

// Update schema to remove agreeToTerms since it's now in modal
const signupSchemaUserModified = yup.object({
  fullName: yup.string().required('Full name is required'),
  email: yup
    .string()
    .required('Email is required')
    .matches(strictEmailRegex, 'Please enter a valid email address'),
  phoneNumber: yup
    .string()
    .required('Phone number is required')
    .test('valid-phone', 'Please enter a valid phone number', value => {
      if (!value) return true; // Allow empty - required() will handle it
      try {
        const phoneNumber = parsePhoneNumber(value);
        return phoneNumber?.isValid() ?? false;
      } catch {
        return false;
      }
    }),
  password: yup
    .string()
    .trim()
    .max(50, 'Maximum 50 charecters allowed')
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(/[a-z]/, 'At least one lowercase letter required')
    .matches(/[A-Z]/, 'At least one uppercase letter required')
    .matches(/\d/, 'At least one number required')
    .matches(/[^\w\s]/, 'At least one special character required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Confirm password is required'),
  agreeToSms: yup.boolean(),
});

type SignupFormData = yup.InferType<typeof signupSchemaUserModified>;

function SignupFormUser() {
  const [userAgreement, setUserAgreement] = useState(false);
  const router = useRouter();
  const { sharingId } = router.query;
  const [acceptInvitation, setAcceptInvitation] = useState(false);

  useEffect(() => {
    if (typeof sharingId === 'string') {
      setAcceptInvitation(true);
    }
  }, [sharingId]);

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: yupResolver(signupSchemaUserModified),
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

  const { data } = useQuery({
    queryKey: ['user-agreement'],
    queryFn: () => cmsDataApi({ slug: 'client-agreement' }),
  });

  const agreement = data?.data;

  const userSignUpMutation = useMutation({
    mutationFn: signUpMutation,
    onSuccess: response => {
      const formData = watch();
      const emailStoreSuccess = saveInSessionStorage(
        storageKeys.sessionStorage.otpEmail,
        formData.email
      );
      const phoneStoreSuccess = saveInSessionStorage(
        storageKeys.sessionStorage.otpPhone,
        formData.phoneNumber
      );
      const tokenStorageSuccess = saveInSessionStorage(
        storageKeys.cookies.onBoardToken,
        response.data.data.token
      );
      const hasSmsConsent = response.data.data.user.has_sms_consent;
      saveInSessionStorage(storageKeys.sessionStorage.hasSmsConsent, String(hasSmsConsent));
      if (emailStoreSuccess && phoneStoreSuccess && tokenStorageSuccess) {
        router.push('/auth/verify-otp/');
      }
    },
  });

  const onSubmit = (data: SignupFormData) => {
    setUserAgreement(true);
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

          {sharingId && typeof sharingId === 'string' && (
            <FormControlLabel
              className='checkbox'
              control={
                <Checkbox
                  checked={acceptInvitation}
                  onChange={() => {
                    setAcceptInvitation(prev => !prev);
                  }}
                  icon={<CheckBoxEmptyIcon IconHeight='16' IconWidth='16' />}
                  checkedIcon={<CheckedIconCheckBox />}
                />
              }
              label={
                <Typography
                  variant='caption'
                  sx={{
                    a: {
                      color: 'inherit',
                      fontWeight: '700',
                      textDecoration: 'underline',
                      transition: 'all .3s ease',
                      '&:hover': {
                        textDecoration: 'underline',
                        // color: theme.palette.customColors.lightPurple,
                      },
                    },
                  }}
                >
                  I agree the
                </Typography>
              }
            />
          )}

          <Grid2 size={{ xs: 12 }}>
            <ButtonCommon
              type='submit'
              variant='contained'
              color='primary'
              className='primary-gradiant-btn'
              fullWidth
              loading={userSignUpMutation.isPending}
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

      <MuiModalWrapper
        open={userAgreement}
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
        <UserSignupAgreement
          handleClose={() => setUserAgreement(false)}
          content={agreement?.content}
          handleContinue={() => {
            const formData = watch();
            const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
            const submitData = new FormData();
            submitData.append('full_name', formData.fullName);
            submitData.append('email', formData.email);
            submitData.append('phone', formData.phoneNumber);
            submitData.append('password', formData.password);
            submitData.append('confirm_password', formData.confirmPassword);
            submitData.append('timeZone', userTimeZone);
            submitData.append('has_sms_consent', String(formData.agreeToSms));
            submitData.append('deviceType', 'Web');
            userSignUpMutation.mutate(submitData);
            if (acceptInvitation && typeof sharingId === 'string') {
              submitData.append('sharingId', sharingId);
            }
            setUserAgreement(false);
          }}
        />
      </MuiModalWrapper>
    </>
  );
}

export default SignupFormUser;
