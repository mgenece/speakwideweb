import { mediaUrl } from '@/api/endpoints';
import { areaOfInterestApi, langListApi } from '@/api/functions/cms.api';
import { interpreterProfileUpdateApi } from '@/api/functions/profile.api';
import ButtonCommon from '@/components/layouts/common/ButtonCommon';
import ProfileEditForm from '@/components/layouts/profile/interpreter/ProfileEditForm';
import ProfileEditHead from '@/components/layouts/profile/interpreter/ProfileEditHead';
import { queryKeys } from '@/config/constants';
import { useInterpreterData } from '@/hooks/react-query/useVisitor';
import { interpreterProfieUpdateSchema } from '@/lib/schema/profile.schema';
import { AccountEditInformationInterpreterMainWrap } from '@/styles/StyledComponents/AccountEditInformationInterpreterMainWrap';
import CustomButtonPrimary from '@/ui/CustomButtons/CustomButtonPrimary';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, CircularProgress, Stack, Typography, useTheme } from '@mui/material';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import * as yup from 'yup';

type IFormData = yup.InferType<typeof interpreterProfieUpdateSchema>;

const AccountEditInformationInterpreterMain = () => {
  const { interpreterData, invalidateInterpreterData } = useInterpreterData();
  const theme = useTheme();
  const router = useRouter();

  const profileUpdateMutation = useMutation({
    mutationFn: interpreterProfileUpdateApi,
    onSuccess: () => {
      invalidateInterpreterData();

      toast.success('Profile data updated successfully');
      router.push('/interpreter/dashboard/profile/');
    },
  });

  // if (!interpreterData?._id) {
  //   return (
  //     <Box>
  //       <CircularProgress />
  //     </Box>
  //   );
  // }

  const langListQuery = useQuery({
    queryKey: queryKeys.langList,
    queryFn: langListApi,
  });

  const areaInterestQuery = useQuery({
    queryKey: queryKeys.areaOfExpertise,
    queryFn: areaOfInterestApi,
  });

  const langList =
    langListQuery?.data?.data?.map(item => ({
      label: item.language_display_name,
      value: item._id,
    })) || [];

  const interestList =
    areaInterestQuery?.data?.data?.map(item => ({
      label: item.expertise_display_name,
      value: item._id,
    })) || [];

  // Default values
  const defaultValues: IFormData = {
    fullName: interpreterData?.full_name || '',
    email: interpreterData?.email || '',
    phone: interpreterData?.phone || '',
    address: interpreterData?.address || '',
    gender: interpreterData?.gender || '',
    aboutMe: interpreterData?.objectives || '',
    ssn: interpreterData?.social_security_number || '',
    ein: interpreterData?.ein || '',
    language:
      interpreterData?.languages?.map(item => ({
        label: item.language_display_name,
        value: item._id,
      })) || [],
    areaOfExpertise:
      interpreterData?.areas_of_expertise?.map(item => ({
        label: item.expertise_display_name,
        value: item._id,
      })) || [],
    // Initialize with existing files as URLs (strings)
    certificates:
      interpreterData?.certificate_documents?.map(item =>
        mediaUrl(`interpreter_certificate/${item.document}`)
      ) || [],
    idProof:
      interpreterData?.identity_proofs?.map(item =>
        mediaUrl(`interpreter_identity_proofs/${item}`)
      ) || [],
  };

  const { control, handleSubmit, reset } = useForm<IFormData>({
    resolver: yupResolver(interpreterProfieUpdateSchema),
    defaultValues,
    mode: 'onChange',
  });

  const onSubmit = (data: IFormData) => {
    // console.log('***d', data);
    const formData = new FormData();
    formData.append('full_name', data.fullName);
    formData.append('gender', data.gender);
    formData.append('address', data.address);
    formData.append('objectives', data.aboutMe);
    data.ein && formData.append('ein', data.ein);
    data.ssn && formData.append('social_security_number', data.ssn);

    formData.append('isCertified', `${Boolean(data.certificates.length)}`);

    data.areaOfExpertise.forEach(item => formData.append('area_of_expertise_id', item.value));
    data.language.forEach(item => formData.append('language_id', item.value));
    data.idProof.forEach(item => {
      if (typeof item === 'string') {
        const tempArr = item.split('/interpreter_identity_proofs/');
        const fileName = tempArr[tempArr.length - 1];
        formData.append('identity_proofs', fileName || '');
      } else {
        formData.append('identity_proofs', item);
      }
    });
    data.certificates.length &&
      data.certificates.forEach(item => {
        if (typeof item === 'string') {
          const tempArr = item.split('/interpreter_certificate/');
          const fileName = tempArr[tempArr.length - 1];
          formData.append('certificate_documents', fileName || '');
          formData.append('certificate_expiration_date', '');
        } else {
          formData.append('certificate_documents', item.file);
          formData.append('certificate_expiration_date', item?.expiryDate || '');
        }
      });

    profileUpdateMutation.mutate(formData);
  };

  useEffect(() => {
    if (defaultValues.fullName && langList.length && interestList.length) {
      reset(defaultValues);
    }
  }, [defaultValues.fullName, langList.length, interestList.length]);

  const handleCancel = () => {
    reset();
    router.push('/interpreter/dashboard/profile/');
  };

  return (
    <AccountEditInformationInterpreterMainWrap>
      <Box className='bordered-box'>
        <Box className='inner-main-box'>
          <Typography variant='body1' fontWeight={600} mb={'10px'}>
            Profile Picture
          </Typography>
          {interpreterData?._id ? <ProfileEditHead /> : <></>}

          <Box className='form-box'>
            {interpreterData?._id ? (
              <ProfileEditForm control={control} handleSubmit={handleSubmit} onSubmit={onSubmit} />
            ) : (
              <Box>
                <CircularProgress />
              </Box>
            )}
          </Box>
        </Box>
      </Box>

      <Stack
        direction={'row'}
        alignItems={'center'}
        justifyContent={'flex-end'}
        flexWrap={'wrap'}
        spacing={'8px'}
        className='btn-stack'
        sx={{ mt: '30px' }}
      >
        <CustomButtonPrimary
          disableRipple
          variant='outlined'
          aria-label='Cancel'
          className='remove-btn'
          onClick={handleCancel}
          sx={{
            color: `${theme.palette.primary.main} !important`,
            '&:hover': {
              color: `${theme.palette.common.white} !important`,
            },
          }}
        >
          Cancel
        </CustomButtonPrimary>
        <ButtonCommon
          disableRipple
          variant='contained'
          aria-label='Save'
          className='change-btn'
          isLoading={profileUpdateMutation.isPending}
          onClick={handleSubmit(onSubmit)}
        >
          Save
        </ButtonCommon>
      </Stack>
    </AccountEditInformationInterpreterMainWrap>
  );
};

export default AccountEditInformationInterpreterMain;
