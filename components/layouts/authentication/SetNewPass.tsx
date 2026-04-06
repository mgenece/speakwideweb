import { setNewPassForgotApi } from '@/api/functions/auth.api';
import { setNewPasswordSchema } from '@/lib/schema/auth.schema';
import { RootState } from '@/redux-toolkit/store/store';
import InputFieldCommon from '@/ui/CommonInput/CommonInput';
import LockIcon from '@/ui/Icons/LockIcon';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Grid2 } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';

interface FormData {
  newPassword: string;
  reEnterPassword: string;
}

export default function SetNewPass() {
  const { token } = useSelector((state: RootState) => state.forgotPassTokenSlice);
  const router = useRouter();
  const newPassMutation = useMutation({
    mutationFn: setNewPassForgotApi,
    onSuccess: () => {
      toast.success('Password changed successfully.');
      router.push('/auth/login');
    },
  });

  useEffect(() => {
    if (!token) {
      router.push('/auth/login');
    }
  }, [token]);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(setNewPasswordSchema),
    mode: 'onChange',
  });

  const onSubmit = async (data: FormData) => {
    newPassMutation.mutate({
      new_password: data.newPassword,
      confirm_password: data.reEnterPassword,
      resetToken: token,
    });
    return data;
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Grid2 container spacing={2}>
        <Grid2 size={{ xs: 12 }}>
          <Controller
            name='newPassword'
            control={control}
            defaultValue=''
            render={({ field }) => (
              <InputFieldCommon
                {...field}
                labelName='New Password'
                placeholder='Enter your password'
                isPassword
                startAdornment={<LockIcon />}
                error={!!errors.newPassword}
                helperText={errors.newPassword?.message}
              />
            )}
          />
        </Grid2>
        <Grid2 size={{ xs: 12 }}>
          <Controller
            name='reEnterPassword'
            control={control}
            defaultValue=''
            render={({ field }) => (
              <InputFieldCommon
                {...field}
                labelName='Re-enter Password'
                placeholder='Confirm your password'
                isPassword
                startAdornment={<LockIcon />}
                error={!!errors.reEnterPassword}
                helperText={errors.reEnterPassword?.message}
              />
            )}
          />
        </Grid2>
        <Grid2 size={{ xs: 12 }}>
          <Button
            variant='contained'
            color='primary'
            className='primary-gradiant-btn'
            fullWidth
            type='submit'
          >
            Save
          </Button>
        </Grid2>
      </Grid2>
    </form>
  );
}
