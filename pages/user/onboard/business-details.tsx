import { createBusinessApi } from '@/api/functions/auth.api';
import { businessListApi } from '@/api/functions/cms.api';
import AuthWrapper from '@/components/AuthWrapper/AuthWrapper';
import ButtonCommon from '@/components/layouts/common/ButtonCommon';
import FileUploadSingle from '@/components/layouts/common/FileUploadSingle';
import { queryKeys } from '@/config/constants';
import { useUserData } from '@/hooks/react-query/useVisitor';
import { onboardingTokenConvert } from '@/lib/functions/_helpers.lib';
import { businessDetailsSchema } from '@/lib/schema/auth.schema';
import { AuthContent } from '@/styles/StyledComponents/AuthWrapperStyled';
import InputFieldCommon from '@/ui/CommonInput/CommonInput';
import CustomSelect from '@/ui/CustomSelect/CustomSelect';
import PhoneIcon2 from '@/ui/Icons/PhoneIcon2';
import { PhoneInputCommon } from '@/ui/PhoneInput';
import { yupResolver } from '@hookform/resolvers/yup';
import { Grid2, MenuItem, Typography } from '@mui/material';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';

type BusinessDetailsFormData = yup.InferType<typeof businessDetailsSchema>;

export default function BusinessDetails() {
  const { userData } = useUserData();

  // console.log(user);

  const isSubscriptionAdded = Boolean(userData?.subscriptionDetails?.subscriptionId);

  const router = useRouter();
  const businessDetailsMutation = useMutation({
    mutationFn: createBusinessApi,
    onSuccess: () => {
      if (isSubscriptionAdded) {
        onboardingTokenConvert();
        router.push('/user/dashboard');
      } else {
        router.push('/user/payment/pricing');
      }
    },
  });

  const businessListQuery = useQuery({
    queryKey: queryKeys.businessList,
    queryFn: businessListApi,
  });

  const businessList =
    businessListQuery?.data?.data?.map(item => ({
      label: item.title,
      value: item._id,
    })) || [];

  const { control, handleSubmit, trigger } = useForm<BusinessDetailsFormData>({
    resolver: yupResolver(businessDetailsSchema),
    defaultValues: {
      businessLogo: undefined,
      businessName: '',
      businessEmail: '',
      businessSector: '',
      representativeName: '',
      title: '',
      businessPhone: '',
      streetAddress: '',
      city: '',
      state: '',
      zipCode: '',
      businessWebsite: '',
    },
  });

  const onSubmit = async (data: BusinessDetailsFormData) => {
    const formData = new FormData();
    formData.append('business_name', data.businessName || '');
    formData.append('business_email', data.businessEmail || '');
    formData.append('business_phone', data.businessPhone || '');
    formData.append('business_sector', data.businessSector || '');
    formData.append('business_website', data.businessWebsite || '');
    formData.append('representative_name', data.representativeName || '');
    formData.append('representative_title', data.title || '');
    formData.append('street', data.streetAddress || '');
    formData.append('city', data.city || '');
    formData.append('state', data.state || '');
    formData.append('zipcode', data.zipCode || '');
    formData.append('business_logo', data.businessLogo || '');

    businessDetailsMutation.mutate(formData);
  };

  return (
    <AuthWrapper
      headerRight
      headingSpan='Add'
      mainHeding='Business Details'
      customClass='authWrapperBusiness'
    >
      <AuthContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid2 container spacing={2}>
            <Grid2 size={{ xs: 12 }}>
              <Typography variant='h4' className='inputLabel'>
                Upload Business Logo
              </Typography>
              <Controller
                name='businessLogo'
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <FileUploadSingle
                    supportedFileText='PNG, JPG, JPEG file supported (max file size 20MB)'
                    accept='image/png, image/jpeg, image/jpg'
                    onChange={file => {
                      field.onChange(file);
                      trigger('businessLogo');
                    }}
                    error={error?.message}
                  />
                )}
              />
            </Grid2>

            <Grid2 size={{ xs: 12 }}>
              <Controller
                name='businessName'
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <InputFieldCommon
                    {...field}
                    labelName='Business Name'
                    placeholder='Enter business name'
                    error={!!error}
                    helperText={error?.message}
                  />
                )}
              />
            </Grid2>

            <Grid2 size={{ xs: 12 }}>
              <Controller
                name='businessEmail'
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <InputFieldCommon
                    {...field}
                    labelName='Business Email'
                    placeholder='Enter business email'
                    type='email'
                    error={!!error}
                    helperText={error?.message}
                  />
                )}
              />
            </Grid2>

            <Grid2 size={{ xs: 12 }}>
              <Controller
                name='businessSector'
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <CustomSelect
                    {...field}
                    labelName='Business Sector'
                    initialvalue='Select business sector'
                    errorText={error?.message}
                  >
                    {businessList.map((item, index) => (
                      <MenuItem key={item.value + index} value={item.value}>
                        {item.label}
                      </MenuItem>
                    ))}
                  </CustomSelect>
                )}
              />
            </Grid2>

            <Grid2 size={{ xs: 12 }}>
              <Controller
                name='representativeName'
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <InputFieldCommon
                    {...field}
                    labelName='Representative Name'
                    placeholder='Enter representative name'
                    error={!!error}
                    helperText={error?.message}
                  />
                )}
              />
            </Grid2>

            <Grid2 size={{ xs: 12 }}>
              <Controller
                name='title'
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <InputFieldCommon
                    {...field}
                    labelName='Representative Title'
                    placeholder='Enter representative title (Optional)'
                    error={!!error}
                    helperText={error?.message}
                  />
                )}
              />
            </Grid2>

            <Grid2 size={{ xs: 12 }}>
              <Controller
                name='businessPhone'
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <PhoneInputCommon
                    value={field.value}
                    onChange={field.onChange}
                    labelName='Phone Number'
                    placeholder='Enter your phone number'
                    // defaultCountry='in'
                    error={!!error?.message}
                    helperText={error?.message}
                    fullWidth
                    endAdornment={<PhoneIcon2 />}
                  />
                )}
              />
            </Grid2>

            <Grid2 size={{ xs: 12 }}>
              <Controller
                name='streetAddress'
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <InputFieldCommon
                    {...field}
                    labelName='Street Address'
                    placeholder='Enter address'
                    error={!!error}
                    helperText={error?.message}
                  />
                )}
              />
            </Grid2>

            <Grid2 size={{ xs: 12 }}>
              <Controller
                name='city'
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <InputFieldCommon
                    {...field}
                    labelName='City'
                    placeholder='Enter city'
                    error={!!error}
                    helperText={error?.message}
                  />
                )}
              />
            </Grid2>

            <Grid2 size={{ xs: 12 }}>
              <Controller
                name='state'
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <InputFieldCommon
                    {...field}
                    labelName='State'
                    placeholder='Enter state'
                    error={!!error}
                    helperText={error?.message}
                  />
                )}
              />
            </Grid2>

            <Grid2 size={{ xs: 12 }}>
              <Controller
                name='zipCode'
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <InputFieldCommon
                    {...field}
                    labelName='Zip Code'
                    placeholder='Enter zip code'
                    error={!!error}
                    helperText={error?.message}
                  />
                )}
              />
            </Grid2>

            <Grid2 size={{ xs: 12 }}>
              <Controller
                name='businessWebsite'
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <InputFieldCommon
                    {...field}
                    labelName='Business Website'
                    placeholder='Enter website url (optional)'
                    type='url'
                    error={!!error}
                    helperText={error?.message}
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
                isLoading={businessDetailsMutation.isPending}
                sx={{
                  textTransform: 'capitalize !important',
                  marginTop: { md: '50px !important', sm: '20px !important' },
                }}
              >
                Create Your Account
              </ButtonCommon>
            </Grid2>
          </Grid2>
        </form>
      </AuthContent>
    </AuthWrapper>
  );
}
