import { forgotpassApi } from '@/api/functions/auth.api';
import { storageKeys } from '@/config/constants';
import { saveInSessionStorage } from '@/lib/functions/storage.lib';
import { strictEmailRegex } from '@/lib/regex';
import InputFieldCommon from '@/ui/CommonInput/CommonInput';
import MailIcon from '@/ui/Icons/MailIcon';
import { yupResolver } from '@hookform/resolvers/yup';
import { Grid2 } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { Controller, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import * as yup from 'yup';
import ButtonCommon from '../common/ButtonCommon';

const forgotPasswordSchema = yup.object({
  email: yup
    .string()
    .required('Email is required')
    .matches(strictEmailRegex, 'Please enter a valid email address'),
});

type ForgotPasswordFormData = yup.InferType<typeof forgotPasswordSchema>;

export default function ForgotPass() {
  const router = useRouter();
  const rolet = router.query?.role;
  const role = rolet === 'user' ? 'user' : 'interpreter';

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: yupResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  const forgotMutation = useMutation({
    mutationFn: forgotpassApi,
    onSuccess: (_, variables) => {
      const data = {
        type: 'email',
        role,
        email: variables.email,
      };
      saveInSessionStorage(storageKeys.sessionStorage.forgotOtp, JSON.stringify(data));
      toast.success('OTP sent to your email.');
      router.push('/auth/otp-verification');
    },
  });

  const onSubmit = (data: ForgotPasswordFormData) => {
    forgotMutation.mutate({ email: data.email, role, type: 'email' });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid2 container spacing={2}>
        <Grid2 size={{ xs: 12 }}>
          <Controller
            name='email'
            control={control}
            render={({ field }) => (
              <InputFieldCommon
                {...field}
                labelName='Email Address'
                placeholder='Enter your email'
                endAdornment={<MailIcon />}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            )}
          />
        </Grid2>
        <Grid2 size={{ xs: 12 }}>
          <ButtonCommon
            type='submit'
            variant='contained'
            color='primary'
            className='primary-gradiant-btn'
            fullWidth
            isLoading={forgotMutation.isPending}
          >
            Send OTP
          </ButtonCommon>
        </Grid2>
      </Grid2>
    </form>
  );
}
