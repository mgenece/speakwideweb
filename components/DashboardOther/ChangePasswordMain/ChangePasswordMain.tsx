import { intPasswordChangeApi } from '@/api/functions/profile.api';
import { ChangePasswordMainStyled } from '@/styles/StyledComponents/ChangePasswordMainStyled';
import InputFieldCommon from '@/ui/CommonInput/CommonInput';
import CustomButtonPrimary from '@/ui/CustomButtons/CustomButtonPrimary';
import { Box, Grid2, InputLabel, Stack, Typography } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useState } from 'react';

interface PasswordFormState {
  old_password: string;
  new_password: string;
  confirm_password: string;
}

interface PasswordRule {
  label: string;
  success: boolean;
  validator: (password: string) => boolean;
}

export default function ChangePasswordMain() {
  const router = useRouter();

  const [formData, setFormData] = useState<PasswordFormState>({
    old_password: '',
    new_password: '',
    confirm_password: '',
  });

  const [errors, setErrors] = useState({
    old_password: '',
    new_password: '',
    confirm_password: '',
  });

  const passwordChangeMutation = useMutation({
    mutationFn: intPasswordChangeApi,
    onSuccess: () => {
      router.push('/interpreter/dashboard/profile/');
    },
    onError: (error: any) => {
      setErrors(prev => ({
        ...prev,
        old_password: error?.response?.data?.message || 'Failed to change password',
      }));
    },
  });

  const passwordRules: PasswordRule[] = [
    {
      label: 'Minimum characters 8',
      success: formData.new_password.length >= 8,
      validator: pwd => pwd.length >= 8,
    },
    {
      label: 'One Uppercase character',
      success: /[A-Z]/.test(formData.new_password),
      validator: pwd => /[A-Z]/.test(pwd),
    },
    {
      label: 'One Lowercase character',
      success: /[a-z]/.test(formData.new_password),
      validator: pwd => /[a-z]/.test(pwd),
    },
    {
      label: 'One Special character',
      success: /[!@#$%^&*(),.?":{}|<>]/.test(formData.new_password),
      validator: pwd => /[!@#$%^&*(),.?":{}|<>]/.test(pwd),
    },
    {
      label: 'One Number',
      success: /\d/.test(formData.new_password),
      validator: pwd => /\d/.test(pwd),
    },
  ];

  const handleInputChange =
    (field: keyof PasswordFormState) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setFormData(prev => ({ ...prev, [field]: value }));

      // Clear error for the field being edited
      if (errors[field]) {
        setErrors(prev => ({ ...prev, [field]: '' }));
      }
    };

  const validateForm = (): boolean => {
    const newErrors = {
      old_password: '',
      new_password: '',
      confirm_password: '',
    };

    if (!formData.old_password) {
      newErrors.old_password = 'Old password is required';
    }

    if (!formData.new_password) {
      newErrors.new_password = 'New password is required';
    } else if (!passwordRules.every(rule => rule.validator(formData.new_password))) {
      newErrors.new_password = 'Password does not meet all requirements';
    }

    if (!formData.confirm_password) {
      newErrors.confirm_password = 'Confirm password is required';
    } else if (formData.new_password !== formData.confirm_password) {
      newErrors.confirm_password = 'Passwords do not match';
    }

    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error !== '');
  };

  const handleSubmit = () => {
    if (validateForm()) {
      passwordChangeMutation.mutate(formData);
    }
  };

  const isFormValid =
    formData.old_password &&
    formData.new_password &&
    formData.confirm_password &&
    passwordRules.every(rule => rule.success) &&
    formData.new_password === formData.confirm_password;

  return (
    <ChangePasswordMainStyled>
      <Box className='bordered-box'>
        <Box className='inner-main-box'>
          <Grid2 container spacing={{ xl: '40px', xs: '20px' }}>
            <Grid2 size={{ md: 5, xs: 12 }}>
              <Box className='left-part'>
                <Grid2 container spacing={{ xs: '16px' }}>
                  <Grid2 size={{ xs: 12 }}>
                    <Box className='label-withInput-box'>
                      <InputLabel className='label'>Old Password</InputLabel>
                      <InputFieldCommon
                        placeholder='*************'
                        className='input-field'
                        isPassword
                        value={formData.old_password}
                        onChange={handleInputChange('old_password')}
                        error={!!errors.old_password}
                        helperText={errors.old_password}
                      />
                    </Box>
                  </Grid2>
                  <Grid2 size={{ xs: 12 }}>
                    <Box className='label-withInput-box'>
                      <InputLabel className='label'>New Password</InputLabel>
                      <InputFieldCommon
                        placeholder='*************'
                        className='input-field'
                        isPassword
                        value={formData.new_password}
                        onChange={handleInputChange('new_password')}
                        error={!!errors.new_password}
                        helperText={errors.new_password}
                      />
                    </Box>
                  </Grid2>
                  <Grid2 size={{ xs: 12 }}>
                    <Box className='label-withInput-box'>
                      <InputLabel className='label'>Confirm New Password</InputLabel>
                      <InputFieldCommon
                        placeholder='*************'
                        className='input-field'
                        isPassword
                        value={formData.confirm_password}
                        onChange={handleInputChange('confirm_password')}
                        error={!!errors.confirm_password}
                        helperText={errors.confirm_password}
                      />
                    </Box>
                  </Grid2>
                </Grid2>
              </Box>
            </Grid2>
            <Grid2 size={{ md: 7, xs: 12 }}>
              <Box className='right-part'>
                <Typography className='info-text'>
                  Please add all necessary characters to create new password
                </Typography>
                <Stack spacing={{ xs: '10px' }}>
                  {passwordRules.map((rule, index) => (
                    <Typography
                      key={index}
                      className={`validation-rule${rule.success ? ' success' : ''}`}
                      variant='body2'
                    >
                      {rule.label}
                    </Typography>
                  ))}
                </Stack>
              </Box>
            </Grid2>
          </Grid2>
        </Box>
      </Box>

      <Stack
        direction={'row'}
        justifyContent={{ sm: 'space-between', xs: 'center' }}
        flexWrap={'wrap'}
        sx={{ mt: { md: '52px', xs: '30px' } }}
        gap={{ md: 0, xs: '10px' }}
        alignItems={'center'}
      >
        <CustomButtonPrimary
          aria-label='Go Back'
          className='go-back-btn'
          disableRipple
          onClick={() => router.back()}
          disabled={passwordChangeMutation.isPending}
        >
          Go Back
        </CustomButtonPrimary>
        <CustomButtonPrimary
          variant='contained'
          aria-label='Change Password'
          className='change-password-btn'
          disableRipple
          onClick={handleSubmit}
          disabled={!isFormValid || passwordChangeMutation.isPending}
        >
          {passwordChangeMutation.isPending ? 'Changing...' : 'Change Password'}
        </CustomButtonPrimary>
      </Stack>
    </ChangePasswordMainStyled>
  );
}
