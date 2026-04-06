import { businessListApi } from '@/api/functions/cms.api';
import { queryKeys } from '@/config/constants';
import { useUserData } from '@/hooks/react-query/useVisitor';
import { userProfileEditSchema } from '@/lib/schema/profile.schema';
import { IUser } from '@/typescript/interface/profile.interface';

import { mediaUrl } from '@/api/endpoints';
import { userProfileUpdateApi } from '@/api/functions/profile.api';
import InputFieldCommon from '@/ui/CommonInput/CommonInput';
import CustomSelect from '@/ui/CustomSelect/CustomSelect';
import BusinessIcon from '@/ui/Icons/BusinessIcon';
import MapIcon from '@/ui/Icons/MapIcon';
import PhoneIcon2 from '@/ui/Icons/PhoneIcon2';
import ProfileDetailsIcon from '@/ui/Icons/ProfileDetailsIcon';
import { PhoneInputCommon } from '@/ui/PhoneInput';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box,
  CircularProgress,
  Grid2,
  InputLabel,
  MenuItem,
  Stack,
  Typography,
} from '@mui/material';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import * as yup from 'yup';
import ButtonCommon from '../../common/ButtonCommon';
import FileUploadSingleEdit from '../../common/FileUploadSingleEdit';

// Infer the type from schema to ensure consistency
type IFormData = yup.InferType<typeof userProfileEditSchema>;

// Reusable function to create form data object from user data
const createFormDataFromUser = (userData: IUser | null): IFormData => {
  return {
    full_name: userData?.full_name || '',
    email: userData?.email || '',
    phone: userData?.phone || '',
    business_name: userData?.user_business_info?.business_name || '',
    business_email: userData?.user_business_info?.business_email || '',
    business_phone: userData?.user_business_info?.business_phone || '',
    representative_name: userData?.user_business_info?.representative_name || '',
    representative_title: userData?.user_business_info?.representative_title || '',
    business_website: userData?.user_business_info?.business_website || '',
    business_sector: userData?.user_business_info?.business_sector?._id || '',
    zipcode: userData?.user_business_info?.zipcode || '',
    city: userData?.user_business_info?.city || '',
    state: userData?.user_business_info?.state || '',
    street: userData?.user_business_info?.street || '',
    businessLogo: userData?.user_business_info?.business_logo || '',
  };
};

// Default form values
const defaultFormValues: IFormData = {
  full_name: '',
  email: '',
  phone: '',
  business_name: '',
  business_email: '',
  business_phone: '',
  representative_name: '',
  representative_title: '',
  business_website: '',
  business_sector: '',
  zipcode: '',
  city: '',
  state: '',
  street: '',
  businessLogo: '',
};

function ProfileEditBody() {
  const { userData, isUserLoading, invalidateUserData } = useUserData();

  const router = useRouter();

  const profileUpdateMutation = useMutation({
    mutationFn: userProfileUpdateApi,
    onSuccess: () => {
      invalidateUserData();
      toast.success('Profile data updated successfully.');
      router.push('/user/dashboard/account/');
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

  const { control, handleSubmit, reset, setValue } = useForm<IFormData>({
    resolver: yupResolver(userProfileEditSchema),
    defaultValues: defaultFormValues,
  });

  // Set form values when userData is loaded
  useEffect(() => {
    if (userData) {
      const formData = createFormDataFromUser(userData);
      reset(formData);
    }
  }, [userData, reset]);

  const onSubmit = async (data: IFormData) => {
    const formData = new FormData();

    formData.append('full_name', data.full_name);
    formData.append('business_name', data.business_name);
    formData.append('business_email', data.business_email);
    formData.append('business_phone', data.business_phone);
    formData.append('business_sector', data.business_sector);
    formData.append('business_website', data.business_website);
    formData.append('representative_name', data.representative_name);
    formData.append('representative_title', data.representative_title);
    formData.append('street', data.street);
    formData.append('city', data.city);
    formData.append('state', data.state);
    formData.append('zipcode', data.zipcode);
    typeof data.businessLogo !== 'string' && formData.append('business_logo', data.businessLogo);

    profileUpdateMutation.mutate(formData);

    // console.log(data, '***');
    // console.log('Business Logo type:', typeof data.businessLogo);
    // console.log('Is File:', data.businessLogo instanceof File);
  };

  //   console.log(userData?.user_business_info?.business_sector, '***u');
  const onDiscard = () => {
    const formData = createFormDataFromUser(userData);
    reset(formData);
    router.back();
  };

  if (isUserLoading) {
    return (
      <Box>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box pt={6}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box className='form-box'>
          <Grid2 container spacing={'15px'}>
            <Grid2 size={{ xs: 12 }}>
              <Stack
                direction='row'
                alignItems='center'
                flexWrap={'wrap'}
                spacing={'4px'}
                className='cmn-head-stack'
              >
                <ProfileDetailsIcon />
                <Typography variant='body2'>Personal Information</Typography>
              </Stack>
            </Grid2>

            {/* Business Logo Upload */}
            <Grid2 size={{ xs: 12 }}>
              <Box className='upload-business-box'>
                <Controller
                  name='businessLogo'
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <Box className='eachInputBox'>
                      <InputLabel>Business Logo</InputLabel>
                      <FileUploadSingleEdit
                        existingFile={{
                          url:
                            typeof field.value === 'string' && field.value
                              ? mediaUrl(`user_business_logos/${field.value}`)
                              : '',
                          filename: typeof field.value === 'string' ? field.value : '',
                        }}
                        supportedFileText='PNG, JPEG, PDF files up to 2MB'
                        accept='image/png, image/jpeg, application/pdf'
                        error={error?.message}
                        onChange={data => {
                          if (data.newFile) {
                            // Set new file
                            setValue('businessLogo', data.newFile);
                          } else if (data.keepUrl) {
                            // Keep existing URL (string)
                            setValue('businessLogo', field.value);
                          } else {
                            // Remove file
                            setValue('businessLogo', '');
                          }
                        }}
                        size={2 * 1024 * 1024} // 2MB
                      />
                    </Box>
                  )}
                />
              </Box>
            </Grid2>

            {/* Full Name */}
            <Grid2 size={{ xs: 12 }}>
              <Box className='eachInputBox'>
                <InputLabel>Full Name</InputLabel>
                <Controller
                  name='full_name'
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <InputFieldCommon
                      {...field}
                      placeholder='Enter your full name'
                      className='input-field'
                      error={!!error}
                      helperText={error?.message}
                    />
                  )}
                />
              </Box>
            </Grid2>

            {/* Email */}
            <Grid2 size={{ md: 6, xs: 12 }}>
              <Box className='eachInputBox'>
                <InputLabel>Email</InputLabel>
                <Controller
                  name='email'
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <InputFieldCommon
                      {...field}
                      placeholder='Enter your email address'
                      className='input-field'
                      disabled
                      error={!!error}
                      helperText={error?.message}
                    />
                  )}
                />
              </Box>
            </Grid2>

            {/* Phone */}
            <Grid2 size={{ md: 6, xs: 12 }}>
              <Box className='eachInputBox'>
                <InputLabel>Phone</InputLabel>
                <Controller
                  name='phone'
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <InputFieldCommon
                      {...field}
                      type='text'
                      placeholder='Enter your phone number'
                      className='input-field'
                      disabled
                      error={!!error}
                      helperText={error?.message}
                    />
                  )}
                />
              </Box>
            </Grid2>

            {/* Business Information Section */}
            <Grid2 size={{ xs: 12 }}>
              <Stack
                direction='row'
                alignItems='center'
                flexWrap={'wrap'}
                spacing={'4px'}
                className='cmn-head-stack'
              >
                <BusinessIcon />
                <Typography variant='body2'>Business Information</Typography>
              </Stack>
            </Grid2>

            {/* Business Name */}
            <Grid2 size={{ md: 6, xs: 12 }}>
              <Box className='eachInputBox'>
                <InputLabel>Business Name</InputLabel>
                <Controller
                  name='business_name'
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <InputFieldCommon
                      {...field}
                      value={field.value || ''}
                      placeholder='Enter business name'
                      className='input-field'
                      error={!!error}
                      helperText={error?.message}
                    />
                  )}
                />
              </Box>
            </Grid2>

            {/* Business Phone */}
            <Grid2 size={{ md: 6, xs: 12 }}>
              <Box className='eachInputBox'>
                <Controller
                  name='business_phone'
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <PhoneInputCommon
                      value={field.value}
                      onChange={field.onChange}
                      labelName='Business Phone Number'
                      placeholder='Enter your phone number'
                      // defaultCountry='in'
                      error={!!error?.message}
                      helperText={error?.message}
                      fullWidth
                      endAdornment={<PhoneIcon2 />}
                    />
                  )}
                />
              </Box>
            </Grid2>

            {/* Business Email */}
            <Grid2 size={{ md: 6, xs: 12 }}>
              <Box className='eachInputBox'>
                <InputLabel>Business Email</InputLabel>
                <Controller
                  name='business_email'
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <InputFieldCommon
                      {...field}
                      value={field.value || ''}
                      placeholder='Enter business email'
                      className='input-field'
                      error={!!error}
                      helperText={error?.message}
                    />
                  )}
                />
              </Box>
            </Grid2>

            {/* Representative Name */}
            <Grid2 size={{ md: 6, xs: 12 }}>
              <Box className='eachInputBox'>
                <InputLabel>Representative Name</InputLabel>
                <Controller
                  name='representative_name'
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <InputFieldCommon
                      {...field}
                      value={field.value || ''}
                      placeholder='Enter representative name'
                      className='input-field'
                      error={!!error}
                      helperText={error?.message}
                    />
                  )}
                />
              </Box>
            </Grid2>

            {/* Title */}
            <Grid2 size={{ md: 6, xs: 12 }}>
              <Box className='eachInputBox'>
                <InputLabel>Title</InputLabel>
                <Controller
                  name='representative_title'
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <InputFieldCommon
                      {...field}
                      value={field.value || ''}
                      placeholder='Enter representative title'
                      className='input-field'
                      error={!!error}
                      helperText={error?.message}
                    />
                  )}
                />
              </Box>
            </Grid2>

            {/* Business Website */}
            <Grid2 size={{ md: 6, xs: 12 }}>
              <Box className='eachInputBox'>
                <InputLabel>Business Website</InputLabel>
                <Controller
                  name='business_website'
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <InputFieldCommon
                      {...field}
                      value={field.value || ''}
                      placeholder='Enter website url'
                      className='input-field'
                      error={!!error}
                      helperText={error?.message}
                    />
                  )}
                />
              </Box>
            </Grid2>

            {/* Business Sector */}
            <Grid2 size={{ xs: 12 }}>
              <Box className='eachInputBox'>
                <InputLabel>Business Sector</InputLabel>
                <Controller
                  name='business_sector'
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <CustomSelect
                      {...field}
                      value={field.value}
                      labelName=''
                      initialvalue='Select business sector'
                      errorText={error?.message}
                    >
                      {businessList.map(item => (
                        <MenuItem key={item.value} value={item.value}>
                          {item.label}
                        </MenuItem>
                      ))}
                    </CustomSelect>
                  )}
                />
              </Box>
            </Grid2>

            {/* Location Information Section */}
            <Grid2 size={{ xs: 12 }}>
              <Stack
                direction='row'
                alignItems='center'
                flexWrap={'wrap'}
                spacing={'4px'}
                className='cmn-head-stack'
              >
                <MapIcon />
                <Typography variant='body2'>Location Information</Typography>
              </Stack>
            </Grid2>

            {/* Zip Code */}
            <Grid2 size={{ md: 6, xs: 12 }}>
              <Box className='eachInputBox'>
                <InputLabel>Zip Code</InputLabel>
                <Controller
                  name='zipcode'
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <InputFieldCommon
                      {...field}
                      value={field.value || ''}
                      type='text'
                      placeholder='Enter zip code'
                      className='input-field'
                      error={!!error}
                      helperText={error?.message}
                    />
                  )}
                />
              </Box>
            </Grid2>

            {/* City */}
            <Grid2 size={{ md: 6, xs: 12 }}>
              <Box className='eachInputBox'>
                <InputLabel>City</InputLabel>
                <Controller
                  name='city'
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <InputFieldCommon
                      {...field}
                      value={field.value || ''}
                      placeholder='Enter city'
                      className='input-field'
                      error={!!error}
                      helperText={error?.message}
                    />
                  )}
                />
              </Box>
            </Grid2>

            {/* State */}
            <Grid2 size={{ md: 6, xs: 12 }}>
              <Box className='eachInputBox'>
                <InputLabel>State</InputLabel>
                <Controller
                  name='state'
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <InputFieldCommon
                      {...field}
                      value={field.value || ''}
                      placeholder='Select state'
                      className='input-field'
                      error={!!error}
                      helperText={error?.message}
                    />
                  )}
                />
              </Box>
            </Grid2>

            {/* Street Address */}
            <Grid2 size={{ md: 6, xs: 12 }}>
              <Box className='eachInputBox'>
                <InputLabel>Street Address</InputLabel>
                <Controller
                  name='street'
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <InputFieldCommon
                      {...field}
                      value={field.value || ''}
                      placeholder='Enter street address'
                      className='input-field'
                      error={!!error}
                      helperText={error?.message}
                    />
                  )}
                />
              </Box>
            </Grid2>
          </Grid2>
        </Box>

        <Stack
          direction={'row'}
          alignItems={'center'}
          flexWrap={'wrap'}
          spacing={4}
          pt={4}
          className='btn-stack'
        >
          <ButtonCommon
            disableRipple
            variant='outlined'
            aria-label='Discard'
            className='discard-btn'
            onClick={onDiscard}
            type='button'
            disabled={profileUpdateMutation.isPending}
          >
            Discard
          </ButtonCommon>
          <ButtonCommon
            disableRipple
            variant='contained'
            aria-label='Save'
            className='save-btn'
            type='submit'
            isLoading={profileUpdateMutation.isPending}
          >
            Save
          </ButtonCommon>
        </Stack>
      </form>
    </Box>
  );
}

export default ProfileEditBody;
