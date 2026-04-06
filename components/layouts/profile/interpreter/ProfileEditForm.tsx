import { mediaUrl } from '@/api/endpoints';
import { areaOfInterestApi, langListApi } from '@/api/functions/cms.api';
import { FileExpiryDateEdit } from '@/components/layouts/common/FileExpiryDateEdit';
import { FileUploadMultipleEdit } from '@/components/layouts/common/FileUploadMultipleEdit';
import { maxFileSize, queryKeys } from '@/config/constants';
import { useInterpreterData } from '@/hooks/react-query/useVisitor';
import { interpreterProfieUpdateSchema } from '@/lib/schema/profile.schema';
import InputFieldCommon from '@/ui/CommonInput/CommonInput';
import CustomSelect from '@/ui/CustomSelect/CustomSelect';
import MultiSelect from '@/ui/MultiSelect/MultiSelect';
import { Box, Grid2, InputLabel, MenuItem, TextField } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { Control, Controller, UseFormHandleSubmit } from 'react-hook-form';
import * as yup from 'yup';

type IFormData = yup.InferType<typeof interpreterProfieUpdateSchema>;

interface IProps {
  control: Control<
    {
      ssn?: string | undefined;
      ein?: string | undefined;
      fullName: string;
      email: string;
      phone: string;
      address: string;
      gender: string;
      aboutMe: string;
      language: unknown[];
      areaOfExpertise: unknown[];
      certificates: unknown[];
      idProof: unknown[];
    },
    unknown,
    {
      ssn?: string | undefined;
      ein?: string | undefined;
      fullName: string;
      email: string;
      phone: string;
      address: string;
      gender: string;
      aboutMe: string;
      language: unknown[];
      areaOfExpertise: unknown[];
      certificates: unknown[];
      idProof: unknown[];
    }
  >;
  handleSubmit: UseFormHandleSubmit<
    {
      ssn?: string | undefined;
      ein?: string | undefined;
      fullName: string;
      email: string;
      phone: string;
      address: string;
      gender: string;
      aboutMe: string;
      language: unknown[];
      areaOfExpertise: unknown[];
      certificates: unknown[];
      idProof: unknown[];
    },
    {
      ssn?: string | undefined;
      ein?: string | undefined;
      fullName: string;
      email: string;
      phone: string;
      address: string;
      gender: string;
      aboutMe: string;
      language: unknown[];
      areaOfExpertise: unknown[];
      certificates: unknown[];
      idProof: unknown[];
    }
  >;
  onSubmit: (data: IFormData) => void;
}

const existingIdCardHelper = (initialData: string[] | undefined, currentData: string[]) => {
  if (initialData && currentData) {
    const data1 = initialData?.map(item => ({
      url: mediaUrl(`interpreter_identity_proofs/${item}`),
      filename: item,
    }));

    const data2 = data1.filter(item => currentData.includes(item.url));
    return data2;
  } else {
    return [];
  }
};

const existingCertificateHelper = (
  initialData:
    | {
        document: string;
        expiration_date: string;
        _id: string;
      }[]
    | undefined,
  currentData: string[]
) => {
  if (initialData && currentData) {
    const data = initialData
      .map(item => ({
        url: mediaUrl(`interpreter_certificate/${item.document}`),
        filename: item.document,
        expiryDate: item.expiration_date,
      }))
      .filter(item => currentData.includes(item.url));
    return data;
  } else {
    return [];
  }
};

function ProfileEditForm({ control, handleSubmit, onSubmit }: IProps) {
  const { interpreterData } = useInterpreterData();

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

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid2 container spacing={'15px'}>
        {/* Full Name */}
        <Grid2 size={{ md: 6, xs: 12 }}>
          <Box className='eachInputBox'>
            <InputLabel>Full Name</InputLabel>
            <Controller
              name='fullName'
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
                  placeholder='Enter your phone number'
                  disabled
                  className='input-field'
                  error={!!error}
                  helperText={error?.message}
                />
              )}
            />
          </Box>
        </Grid2>

        {/* Gender */}
        <Grid2 size={{ md: 6, xs: 12 }}>
          <Box className='eachInputBox'>
            <InputLabel>Gender</InputLabel>
            <Controller
              name='gender'
              control={control}
              render={({ field, fieldState: { error } }) => (
                <>
                  <CustomSelect
                    {...field}
                    initialvalue='Choose gender'
                    className='select-box'
                    error={!!error}
                    errorText={error?.message}
                  >
                    <MenuItem value='Male'>Male</MenuItem>
                    <MenuItem value='Female'>Female</MenuItem>
                  </CustomSelect>
                </>
              )}
            />
          </Box>
        </Grid2>

        {/* Address */}
        <Grid2 size={{ md: 6, xs: 12 }}>
          <Box className='eachInputBox'>
            <InputLabel>Address</InputLabel>
            <Controller
              name='address'
              control={control}
              render={({ field, fieldState: { error } }) => (
                <InputFieldCommon
                  {...field}
                  placeholder='Write a brief description of expertise & self...'
                  className='input-field'
                  multiline
                  rows={7}
                  error={!!error}
                  helperText={error?.message}
                />
              )}
            />
          </Box>
        </Grid2>

        {/* About Me */}
        <Grid2 size={{ md: 6, xs: 12 }}>
          <Box className='eachInputBox'>
            <InputLabel>About Me</InputLabel>
            <Controller
              name='aboutMe'
              control={control}
              render={({ field, fieldState: { error } }) => (
                <InputFieldCommon
                  {...field}
                  placeholder='Write a brief description of expertise & self...'
                  className='input-field'
                  multiline
                  rows={7}
                  error={!!error}
                  helperText={error?.message}
                />
              )}
            />
          </Box>
        </Grid2>

        {/* Social Security Number */}
        <Grid2 size={{ md: 6, xs: 12 }}>
          <Box className='eachInputBox'>
            <InputLabel>Social Security Number</InputLabel>
            <Controller
              name='ssn'
              control={control}
              render={({ field, fieldState: { error } }) => (
                <InputFieldCommon
                  {...field}
                  placeholder='Enter social security number (XXX-XX-XXXX)'
                  className='input-field'
                  error={!!error}
                  helperText={error?.message}
                />
              )}
            />
          </Box>
        </Grid2>

        {/* EIN */}
        <Grid2 size={{ md: 6, xs: 12 }}>
          <Box className='eachInputBox'>
            <InputLabel>EIN</InputLabel>
            <Controller
              name='ein'
              control={control}
              render={({ field, fieldState: { error } }) => (
                <InputFieldCommon
                  {...field}
                  placeholder='Enter EIN (XX-XXXXXXX)'
                  className='input-field'
                  error={!!error}
                  helperText={error?.message}
                />
              )}
            />
          </Box>
        </Grid2>

        {/* Supported Languages */}
        <Grid2 size={{ md: 6, xs: 12 }}>
          <Box className='eachInputBox'>
            <InputLabel>Supported Languages</InputLabel>
            <Controller
              name='language'
              control={control}
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <MultiSelect
                  options={langList}
                  value={
                    value as (
                      | string
                      | {
                          label: string;
                          value: string;
                        }
                    )[]
                  }
                  onChange={(_event, newValue, _reason, _details) => {
                    onChange(newValue);
                  }}
                  renderInput={params => (
                    <TextField
                      {...params}
                      multiline
                      rows={2}
                      variant='filled'
                      placeholder='Type your languages here....'
                      error={!!error}
                      helperText={error?.message}
                    />
                  )}
                />
              )}
            />
          </Box>
        </Grid2>

        {/* Area Of Expertise */}
        <Grid2 size={{ xl: 4, md: 6, xs: 12 }}>
          <Box className='eachInputBox'>
            <InputLabel>Area Of Expertise</InputLabel>
            <Controller
              name='areaOfExpertise'
              control={control}
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <MultiSelect
                  options={interestList}
                  value={
                    value as (
                      | string
                      | {
                          label: string;
                          value: string;
                        }
                    )[]
                  }
                  onChange={(_event, newValue, _reason, _details) => {
                    onChange(newValue);
                  }}
                  renderInput={params => (
                    <TextField
                      {...params}
                      multiline
                      rows={2}
                      variant='filled'
                      placeholder='Type your skills here....'
                      error={!!error}
                      helperText={error?.message}
                    />
                  )}
                />
              )}
            />
          </Box>
        </Grid2>

        {/* File Sections */}

        {/* Certificates with Expiry Date */}
        <Grid2 size={{ md: 6, xs: 12 }}>
          <Controller
            name='certificates'
            control={control}
            render={({ field, fieldState: { error } }) => (
              <FileExpiryDateEdit
                existingFiles={existingCertificateHelper(
                  interpreterData?.certificate_documents,
                  field.value as string[]
                )}
                maxFiles={5}
                onChange={({ keepUrls, newFiles }) => {
                  // Update form field with combined data
                  const combinedFiles = [
                    ...keepUrls, // existing files as URLs
                    ...newFiles, // new files as objects with expiry
                  ];

                  field.onChange(combinedFiles);
                  // console.log('Certificates data:', { keepUrls, newFiles, allExpiryDates });
                }}
                errorText={error?.message || ''}
              />
            )}
          />
        </Grid2>

        {/* ID Proof Documents */}
        <Grid2 size={{ md: 6, xs: 12 }}>
          <Controller
            name='idProof'
            control={control}
            render={({ field, fieldState: { error } }) => (
              <FileUploadMultipleEdit
                existingFiles={existingIdCardHelper(
                  interpreterData?.identity_proofs,
                  field.value as string[]
                )}
                supportedFileText='PNG, JPEG, PDF files only 2MB each'
                maxFiles={5}
                accept='image/png, image/jpeg, image/jpg, application/pdf'
                onChange={({ keepUrls, newFiles }) => {
                  const combinedFiles = [...keepUrls, ...newFiles];

                  field.onChange(combinedFiles);
                }}
                size={maxFileSize}
                error={error?.message || ''}
              />
            )}
          />
        </Grid2>
      </Grid2>
    </form>
  );
}

export default ProfileEditForm;
