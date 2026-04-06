import { areaOfInterestApi, langListApi } from '@/api/functions/cms.api';
import { interpreterProfileUpdateApi } from '@/api/functions/profile.api';
import { maxFileSize, queryKeys, storageKeys } from '@/config/constants';
import { onlyNumberInput, safeJsonParse } from '@/lib/functions/_helpers.lib';
import { InterPreterSignup2 } from '@/lib/schema/auth.schema';
import { AddProfileDetailsFormWrapper } from '@/styles/StyledComponents/AddProfileDetailsFormWrapper';
import { InfoBox } from '@/styles/StyledComponents/RequestSessionModalContentWrap';
import InputFieldCommon from '@/ui/CommonInput/CommonInput';
import CustomSelect from '@/ui/CustomSelect/CustomSelect';
import InfoIcon from '@/ui/Icons/InfoIcon';
import SelectArrowBtnIcon from '@/ui/Icons/SelectArrowBtnIcon';
import MuiModalWrapper from '@/ui/Modal/MuiModalWrapper';
import MultiSelect from '@/ui/MultiSelect/MultiSelect';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Divider, Grid2, MenuItem, Stack, TextField, Typography } from '@mui/material';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import * as yup from 'yup';
import ButtonCommon from '../../common/ButtonCommon';
import FileExpiryDate from '../../common/FileExpiryDate';
import FileUploadMultiple from '../../common/FileUploadMultiple';

// Define the interface first
interface IFormData {
  areaOfExpertise: string[];
  supportedLanguages: string[];
  address: string;
  gender: string;
  aboutMe: string;
  certificatesFiles: File[];
  idFiles: File[];
  w9Form: File;
  socialSecurityNumber?: string;
  ein?: string;
}

// Updated Validation Schema with proper file typing
const validationSchema: yup.ObjectSchema<IFormData> = InterPreterSignup2;

function AddProfileDetailsForm() {
  const [cetrificateExpiry, setCetrificateExpiry] = useState<string[]>([]);
  const [verifyModal, setVerifyModal] = useState({ status: false, id: '' });

  const langListQuery = useQuery({ queryKey: queryKeys.langList, queryFn: langListApi });
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

  const interpreterSignupMutation = useMutation({
    mutationFn: interpreterProfileUpdateApi,
    onSuccess: () => {
      toast.success('Interpreter registered successfully');
      const loginDataStr = sessionStorage.getItem(storageKeys.sessionStorage.onBoardData);
      const loginData = safeJsonParse<any>(loginDataStr);
      setVerifyModal({ status: true, id: loginData?.data?.user?._id as string });

      // router.push('/interpreter/set-availabality/');
    },
  });

  // console.log(verifyModal, '***v');

  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
    watch,
  } = useForm<IFormData>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      areaOfExpertise: [],
      supportedLanguages: [],
      address: '',
      gender: '',
      aboutMe: '',
      certificatesFiles: [],
      socialSecurityNumber: '',
      ein: '',
    },
  });

  const socialSecurityNumber = watch('socialSecurityNumber');
  const ein = watch('ein');

  // Custom validation function for SSN/EIN
  const validateSsnOrEin = () => {
    const ssnEmpty = !socialSecurityNumber || socialSecurityNumber.trim() === '';
    const einEmpty = !ein || ein.trim() === '';

    if (ssnEmpty && einEmpty) {
      setError('socialSecurityNumber', {
        type: 'manual',
        message: 'Either Social Security Number or EIN is required',
      });
      setError('ein', {
        type: 'manual',
        message: 'Either Social Security Number or EIN is required',
      });
      return false;
    } else {
      clearErrors(['socialSecurityNumber', 'ein']);
      return true;
    }
  };

  // Fixed handleFieldChange function - accepts both input and textarea events
  const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = e.target.value;

    // If user starts typing and both fields have the same error, clear both
    if (value.trim() !== '') {
      if (
        errors.socialSecurityNumber?.message === 'Either Social Security Number or EIN is required'
      ) {
        clearErrors(['socialSecurityNumber', 'ein']);
      }
    }
  };

  const onSubmit: SubmitHandler<IFormData> = async data => {
    // Validate SSN/EIN before submitting
    if (!validateSsnOrEin()) {
      return;
    }

    const formData = new FormData();
    // formData.append('full_name', signupData.fullName);
    // formData.append('email', signupData.email);
    // formData.append('phone', signupData.phoneNumber);
    // formData.append('password', signupData.password);
    // formData.append('confirm_password', signupData.confirmPassword);
    formData.append('social_security_number', data.socialSecurityNumber || '');
    formData.append('ein', data.ein || '');
    formData.append('address', data.address);
    formData.append('gender', data.gender);
    formData.append('objectives', data.aboutMe);
    formData.append('isCertified', `${Boolean(data.certificatesFiles.length)}`);

    data.certificatesFiles.map(item => formData.append('certificate_documents', item));
    cetrificateExpiry.map(item => formData.append('certificate_expiration_date', item));
    data.idFiles.map(item => formData.append('identity_proofs', item));
    data.areaOfExpertise.map(item => formData.append('area_of_expertise_id', item));
    data.supportedLanguages.map(item => formData.append('language_id', item));
    formData.append('w9Form', data.w9Form);

    // console.log(data, '***d');

    interpreterSignupMutation.mutate(formData);
    // formData.append("profile_image", signupData)
  };

  return (
    <AddProfileDetailsFormWrapper pt={{ lg: 5, md: 2.5, xs: 2 }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid2 container spacing={{ lg: 2, xs: 1 }}>
          <Grid2 size={{ xs: 12 }}>
            <Controller
              name='socialSecurityNumber'
              control={control}
              render={({ field }) => (
                <InputFieldCommon
                  {...field}
                  onKeyDown={onlyNumberInput}
                  onChange={e => {
                    field.onChange(e);
                    handleFieldChange(e);
                  }}
                  disabled={Boolean(ein)}
                  labelName='Social Security Number'
                  placeholder='Enter your social security number'
                  error={!!errors.socialSecurityNumber}
                  helperText={errors.socialSecurityNumber?.message}
                />
              )}
            />
          </Grid2>

          <Grid2 size={{ xs: 12 }}>
            <Divider>OR</Divider>
          </Grid2>

          <Grid2 size={{ xs: 12 }}>
            <Controller
              name='ein'
              control={control}
              render={({ field }) => (
                <InputFieldCommon
                  {...field}
                  onKeyDown={onlyNumberInput}
                  onChange={e => {
                    field.onChange(e);
                    handleFieldChange(e);
                  }}
                  disabled={Boolean(socialSecurityNumber)}
                  labelName='EIN'
                  placeholder='Enter your EIN'
                  error={!!errors.ein}
                  helperText={errors.ein?.message}
                />
              )}
            />
          </Grid2>

          {/* Area Of Expertise */}
          <Grid2 size={12}>
            <Box className='eachInputBox'>
              <Typography variant='h4' className='inputLabel'>
                Area Of Expertise
              </Typography>
              <Controller
                name='areaOfExpertise'
                control={control}
                render={({ field }) => (
                  <MultiSelect
                    options={interestList}
                    defaultValue={field.value}
                    onChange={(_event, newValue, _reason, _details) => {
                      const values = newValue
                        .map(item => {
                          if (typeof item === 'string') {
                            return item;
                          }
                          return item?.value;
                        })
                        .filter((value): value is string => value !== undefined);

                      field.onChange(values);
                    }}
                    popupIcon={<SelectArrowBtnIcon />}
                    renderInput={params => (
                      <TextField
                        {...params}
                        multiline
                        rows={2}
                        variant='filled'
                        placeholder='Select your skills'
                        error={!!errors.areaOfExpertise}
                        helperText={errors.areaOfExpertise?.message}
                      />
                    )}
                  />
                )}
              />
            </Box>
          </Grid2>

          {/* Supported Languages */}
          <Grid2 size={12}>
            <Box className='eachInputBox'>
              <Typography variant='h4' className='inputLabel'>
                Select Your Supported Languages
              </Typography>
              <Controller
                name='supportedLanguages'
                control={control}
                render={({ field }) => (
                  <MultiSelect
                    options={langList}
                    defaultValue={field.value}
                    onChange={(_event, newValue, _reason, _details) => {
                      const values = newValue
                        .map(item => {
                          if (typeof item === 'string') {
                            return item;
                          }
                          return item?.value;
                        })
                        .filter((value): value is string => value !== undefined);

                      field.onChange(values);
                    }}
                    popupIcon={<SelectArrowBtnIcon />}
                    renderInput={params => (
                      <TextField
                        {...params}
                        multiline
                        rows={2}
                        variant='filled'
                        placeholder='Select your languages'
                        error={!!errors.supportedLanguages}
                        helperText={errors.supportedLanguages?.message}
                      />
                    )}
                  />
                )}
              />
            </Box>
          </Grid2>

          {/* Address */}
          <Grid2 size={12}>
            <Box className='eachInputBox'>
              <Controller
                name='address'
                control={control}
                render={({ field }) => (
                  <InputFieldCommon
                    labelName='Address'
                    placeholder='Enter your address'
                    value={field.value}
                    onChange={field.onChange}
                    error={!!errors.address}
                    helperText={errors.address?.message}
                  />
                )}
              />
            </Box>
          </Grid2>

          {/* Gender */}
          <Grid2 size={12}>
            <Box className='eachInputBox'>
              <Typography variant='h4' className='inputLabel'>
                Gender
              </Typography>
              <Controller
                name='gender'
                control={control}
                render={({ field }) => (
                  <CustomSelect
                    initialvalue='Select Gender'
                    value={field.value}
                    onChange={field.onChange}
                    error={!!errors.gender}
                    errorText={errors.gender?.message}
                  >
                    <MenuItem value='Male'>Male</MenuItem>
                    <MenuItem value='Female'>Female</MenuItem>
                    <MenuItem value='Choose not to disclose'>Choose not to disclose</MenuItem>
                  </CustomSelect>
                )}
              />
            </Box>
            <InfoBox
              direction='row'
              alignItems='flex-start'
              gap='5px'
              mt={{ lg: '10px !important' }}
              className='informationBox'
            >
              <i>
                <InfoIcon />
              </i>
              <Typography className='infoText'>
                Providing your gender allows Speakwide to match you with appropriate sessions,
                particularly in medical consultation settings where a client may be more comfortable
                with an interpreter of a particular gender.
              </Typography>
            </InfoBox>
          </Grid2>

          {/* About Me */}
          <Grid2 size={12}>
            <Box className='eachInputBox'>
              <Typography variant='h4' className='inputLabel'>
                About Me
              </Typography>
              <Controller
                name='aboutMe'
                control={control}
                render={({ field }) => (
                  <InputFieldCommon
                    multiline
                    rows={4}
                    placeholder='Write a brief description about yourself...'
                    value={field.value}
                    onChange={field.onChange}
                    error={!!errors.aboutMe}
                    helperText={errors.aboutMe?.message}
                  />
                )}
              />
            </Box>
          </Grid2>

          {/* Certificates Upload */}
          <Grid2 size={12}>
            <Box className='eachInputBox'>
              <Typography variant='h4' className='inputLabel'>
                Upload & Attach Certificates / Documents (Maximum 5)
              </Typography>
              <Controller
                name='certificatesFiles'
                control={control}
                render={({ field }) => (
                  <FileExpiryDate
                    onChange={files => {
                      const filesOnly = files.map(item => item.file);
                      const expiryOnly = files.map(item => item.expiryDate?.toISOString() || '');
                      setCetrificateExpiry(expiryOnly);
                      // console.log(files, expiryOnly, '***1');
                      field.onChange(filesOnly);
                    }}
                    maxFiles={5}
                    supportedFileText='PNG, JPEG, PDF files only 2MB'
                    errorText={errors.certificatesFiles?.message || ''}
                  />
                )}
              />
            </Box>
          </Grid2>

          {/* ID Upload */}
          <Grid2 size={12}>
            <Box className='eachInputBox'>
              <Typography variant='h4' className='inputLabel'>
                Upload Drivers License / Identification Card
              </Typography>
              <Controller
                name='idFiles'
                control={control}
                render={({ field }) => (
                  <FileUploadMultiple
                    supportedFileText='PNG, JPEG, PDF files only 2MB each'
                    maxFiles={5}
                    accept='image/png, image/jpeg, image/jpg, application/pdf'
                    onChange={files => field.onChange(files)}
                    size={maxFileSize}
                    error={errors.idFiles?.message}
                  />
                )}
              />
            </Box>
          </Grid2>

          <Grid2 size={12}>
            <Box className='eachInputBox'>
              <Typography variant='h4' className='inputLabel'>
                Upload W9 Form
              </Typography>
              <Controller
                name='w9Form'
                control={control}
                render={({ field }) => (
                  <FileUploadMultiple
                    supportedFileText='2MB PDF files allowed only'
                    maxFiles={1}
                    accept='application/pdf'
                    onChange={files => field.onChange(files[0])}
                    size={maxFileSize}
                    error={errors.w9Form?.message}
                  />
                )}
              />
            </Box>
          </Grid2>
        </Grid2>

        <Box sx={{ mt: 3 }}>
          <ButtonCommon
            type='submit'
            variant='contained'
            color='primary'
            className='primary-gradiant-btn'
            fullWidth
            isLoading={interpreterSignupMutation.isPending}
          >
            Continue
          </ButtonCommon>
        </Box>
      </form>
      <MuiModalWrapper
        open={verifyModal.status}
        onClose={() => setVerifyModal(prev => ({ ...prev, status: false }))}
        className='editAccountModal'
      >
        <Stack gap={2} alignItems={'center'}>
          Verify yourself with persona. You will need to show your ID proof and take your selfie in
          this step.
          <Box width={120}>
            <ButtonCommon
              variant='contained'
              color='primary'
              className='primary-gradiant-btn'
              onClick={() => {
                const personaHostedFlowUrl = process.env.NEXT_APP_PERSONA_URL || '';
                const redirectUrl = `${personaHostedFlowUrl}&reference-id=${verifyModal.id}&redirect-uri=${window.location.origin}/interpreter/onboard/verify-user/`;
                console.warn(redirectUrl, '***r');
                window.location.href = redirectUrl;
              }}
            >
              Continue
            </ButtonCommon>
          </Box>
        </Stack>
      </MuiModalWrapper>
    </AddProfileDetailsFormWrapper>
  );
}

export default AddProfileDetailsForm;
