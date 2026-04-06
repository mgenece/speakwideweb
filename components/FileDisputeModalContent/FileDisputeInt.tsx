// FileDisputeInt.tsx
import { FileDisputeModalContentWrap } from '@/styles/StyledComponents/FileDisputeModalContentWrap';
import CustomSelect from '@/ui/CustomSelect/CustomSelect';
import NewRadioFillIedcon from '@/ui/Icons/NewRadioFillIedcon';
import NewRadioUnFillIcon from '@/ui/Icons/NewRadioUnFillIcon';
import SelecrDoubleArrowIcon from '@/ui/Icons/SelecrDoubleArrowIcon';
import {
  Box,
  FormControlLabel,
  Grid2,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import React from 'react';

// import { createDisputeIntApi } from '@/api/functions/dispute.api'; // Assume new API function
import { createDisputeIntApi } from '@/api/functions/dispute.api';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import * as yup from 'yup';
import ButtonCommon from '../layouts/common/ButtonCommon';
import FileUploadMultiple from '../layouts/common/FileUploadMultiple';
import DisputeCategory from './DisputeCategory';

const hrs = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, '0'));
const mins = ['10', '20', '30', '40', '50', '60'];

// Validation schema adjusted for interpreter dispute per Swagger keys
const createDisputeIntSchema = yup
  .object({
    session_ref_number: yup.string().required('Session reference number is required'),

    category: yup.array().of(yup.string()).min(1, 'Select at least one category').required(),

    issue_details: yup.string().required('Issue details are required'),

    client_noshow: yup.boolean().required('Please specify if client was a no-show'),

    waiting_hr: yup
      .string()
      .nullable()
      .when('client_noshow', {
        is: true,
        then: schema => schema.required('Please select hours waited'),
        otherwise: schema => schema.notRequired(),
      }),

    waiting_min: yup
      .string()
      .nullable()
      .when('client_noshow', {
        is: true,
        then: schema => schema.required('Please select minutes waited'),
        otherwise: schema => schema.notRequired(),
      }),

    client_ontime: yup.boolean().required('Please specify if client was on time'),

    late_hr: yup
      .string()
      .nullable()
      .when('client_ontime', {
        is: false,
        then: schema => schema.required('Please select hours late'),
        otherwise: schema => schema.notRequired(),
      }),

    late_min: yup
      .string()
      .nullable()
      .when('client_ontime', {
        is: false,
        then: schema => schema.required('Please select minutes late'),
        otherwise: schema => schema.notRequired(),
      }),

    is_proper_duration: yup.boolean().required('Please specify if duration was proper'),

    actual_hr: yup
      .string()
      .nullable()
      .when('is_proper_duration', {
        is: false,
        then: schema => schema.required('Please select actual hours'),
        otherwise: schema => schema.notRequired(),
      }),

    actual_min: yup
      .string()
      .nullable()
      .when('is_proper_duration', {
        is: false,
        then: schema => schema.required('Please select actual minutes'),
        otherwise: schema => schema.notRequired(),
      }),

    has_legal_violation: yup.boolean().required('Please specify legal violation presence'),

    legal_violation_type: yup
      .string()
      .nullable()
      .when('has_legal_violation', {
        is: true,
        then: schema => schema.required('Please specify legal violation type'),
        otherwise: schema => schema.notRequired(),
      }),

    has_safety_concern: yup.boolean().required('Please specify safety concern presence'),

    safety_concern_type: yup
      .string()
      .nullable()
      .when('has_safety_concern', {
        is: true,
        then: schema => schema.required('Please specify safety concern type'),
        otherwise: schema => schema.notRequired(),
      }),

    amount_paid: yup
      .number()
      .typeError('Amount paid must be a number')
      .min(0, 'Amount paid must be >= 0')
      .required('Amount paid is required'),

    supporting_documents: yup.array().of(yup.mixed<File>()).notRequired(),
  })
  .required();

type FormInternal = yup.InferType<typeof createDisputeIntSchema>;

interface FileDisputeIntProps {
  handleClose?: () => void;
  sessionId: string;
}

const FileDisputeInt: React.FC<FileDisputeIntProps> = ({ handleClose, sessionId }) => {
  const createDisputeMutation = useMutation({
    mutationFn: createDisputeIntApi,
    onSuccess: () => {
      toast.success('Dispute raised successfully');
      handleClose?.();
    },
  });

  const {
    control,
    handleSubmit,
    // watch,
    formState: { errors },
  } = useForm<FormInternal>({
    resolver: yupResolver(createDisputeIntSchema),
    defaultValues: {
      session_ref_number: sessionId,
      category: [] as string[],
      issue_details: '',
      client_noshow: undefined,
      waiting_hr: undefined,
      waiting_min: undefined,
      client_ontime: undefined,
      late_hr: undefined,
      late_min: undefined,
      is_proper_duration: undefined,
      actual_hr: undefined,
      actual_min: undefined,
      has_legal_violation: undefined,
      legal_violation_type: '',
      has_safety_concern: undefined,
      safety_concern_type: '',
      amount_paid: 0,
      supporting_documents: [] as File[],
    },
  });

  const onSubmit: SubmitHandler<FormInternal> = values => {
    const waitingTime =
      values.waiting_hr && values.waiting_min
        ? `${values.waiting_hr}:${values.waiting_min}`
        : undefined;
    const lateTime =
      values.late_hr && values.late_min ? `${values.late_hr}:${values.late_min}` : undefined;
    const actualDuration =
      values.actual_hr && values.actual_min
        ? `${values.actual_hr}:${values.actual_min}`
        : undefined;

    const formData = new FormData();

    formData.append('session_ref_number', values.session_ref_number);

    values.category.forEach(catId => {
      formData.append('category', String(catId));
    });

    formData.append('issue_details', values.issue_details);

    formData.append('client_noshow', String(values.client_noshow));

    if (waitingTime) formData.append('waiting_time', waitingTime);

    formData.append('client_ontime', String(values.client_ontime));
    if (lateTime) formData.append('late_time', lateTime);

    formData.append('is_proper_duration', String(values.is_proper_duration));

    if (actualDuration) formData.append('actual_duration', actualDuration);

    formData.append('has_legal_violation', String(values.has_legal_violation));
    if (values.legal_violation_type) {
      formData.append('legal_violation_type', values.legal_violation_type);
    }

    formData.append('has_safety_concern', String(values.has_safety_concern));
    if (values.safety_concern_type) {
      formData.append('safety_concern_type', values.safety_concern_type);
    }

    formData.append('amount_paid', String(Number(values.amount_paid ?? 0)));

    if (values.supporting_documents && values.supporting_documents.length > 0) {
      values.supporting_documents.forEach(file => {
        formData.append('supporting_documents', file as File);
      });
    }

    createDisputeMutation.mutate(formData);
  };

  return (
    <FileDisputeModalContentWrap>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Grid2 container spacing={2}>
          <Grid2 size={{ xs: 12 }}>
            <Box>
              <Box className='eachInputBox topBoxWrapper'>
                <InputLabel className='label-class'>Select dispute category</InputLabel>
                <Controller
                  name='category'
                  control={control}
                  defaultValue={[]}
                  render={({ field, fieldState }) => {
                    const raw = field.value;
                    const value: string[] = Array.isArray(raw)
                      ? raw.filter((v): v is string => typeof v === 'string' && v !== '')
                      : [];
                    const handleChange = (ids: string[]) => field.onChange(ids);
                    return (
                      <>
                        <DisputeCategory value={value} onChange={handleChange} type='interpreter' />
                        {fieldState.error?.message && (
                          <Typography color='error' variant='caption' sx={{ mt: 0.5 }}>
                            {fieldState.error.message as any}
                          </Typography>
                        )}
                      </>
                    );
                  }}
                />
              </Box>
            </Box>
          </Grid2>

          <Grid2 size={{ xs: 12 }}>
            <Box className='eachInputBox'>
              <InputLabel className='normalLabelTxt'>
                Please describe the issue in detail
              </InputLabel>
              <Controller
                name='issue_details'
                control={control}
                render={({ field, fieldState }) => (
                  <>
                    <TextField {...field} rows={5} multiline fullWidth />
                    <Typography color='error' variant='caption' sx={{ mt: 0.5 }}>
                      {fieldState.error?.message}
                    </Typography>
                  </>
                )}
              />
            </Box>
          </Grid2>

          <Grid2 size={{ xs: 12 }}>
            <Box className='eachInputBox'>
              <Controller
                name='client_noshow'
                control={control}
                render={({ field, fieldState }) => (
                  <Box>
                    <Box className='wrapper_cmnRatioWrapper'>
                      <InputLabel className='bldLabelTxt'>Was the client a no-show?</InputLabel>
                      <RadioGroup
                        {...field}
                        value={field.value === undefined ? '' : field.value ? 'yes' : 'no'}
                        onChange={e => field.onChange(e.target.value === 'yes')}
                        row
                      >
                        <FormControlLabel
                          value='yes'
                          control={
                            <Radio
                              icon={<NewRadioUnFillIcon />}
                              checkedIcon={<NewRadioFillIedcon />}
                            />
                          }
                          label='Yes'
                        />
                        <FormControlLabel
                          value='no'
                          control={
                            <Radio
                              icon={<NewRadioUnFillIcon />}
                              checkedIcon={<NewRadioFillIedcon />}
                            />
                          }
                          label='No'
                        />
                      </RadioGroup>
                    </Box>
                    {fieldState.error?.message && (
                      <Typography color='error' variant='caption' sx={{ mt: 0.5 }}>
                        {fieldState.error.message as any}
                      </Typography>
                    )}
                  </Box>
                )}
              />
            </Box>
          </Grid2>

          <Grid2 size={{ xs: 12 }}>
            <Box className='wrapper_cmnRatioWrapper'>
              <Box>
                <Stack direction={'row'} gap={2} justifyContent={'center'} alignItems={'center'}>
                  <InputLabel className='normalLabelTxt'>If yes, how long did you wait?</InputLabel>
                  <Controller
                    name='waiting_hr'
                    control={control}
                    render={({ field }) => (
                      <Box>
                        <CustomSelect
                          initialvalue='hr'
                          iconButton={<SelecrDoubleArrowIcon />}
                          {...field}
                        >
                          {hrs.map(h => (
                            <MenuItem key={h} value={h}>
                              {h}
                            </MenuItem>
                          ))}
                        </CustomSelect>
                      </Box>
                    )}
                  />
                  <Controller
                    name='waiting_min'
                    control={control}
                    render={({ field }) => (
                      <Box>
                        <CustomSelect
                          initialvalue='mins'
                          iconButton={<SelecrDoubleArrowIcon />}
                          {...field}
                        >
                          {mins.map(m => (
                            <MenuItem key={m} value={m}>
                              {m}
                            </MenuItem>
                          ))}
                        </CustomSelect>
                      </Box>
                    )}
                  />
                </Stack>
                <Stack>
                  <Typography color='error' variant='caption' sx={{ mt: 0.5 }}>
                    {errors.waiting_hr?.message}
                  </Typography>
                  <Typography color='error' variant='caption' sx={{ mt: 0.5 }}>
                    {errors.waiting_min?.message}
                  </Typography>
                </Stack>
              </Box>
            </Box>
          </Grid2>

          <Grid2 size={{ xs: 12 }}>
            <Box className='wrapper_cmnRatioWrapper'>
              <Controller
                name='client_ontime'
                control={control}
                render={({ field, fieldState }) => (
                  <Box>
                    <InputLabel className='bldLabelTxt'>Did the client arrive on time?</InputLabel>
                    <Box>
                      <RadioGroup
                        {...field}
                        value={field.value === undefined ? '' : field.value ? 'yes' : 'no'}
                        onChange={e => field.onChange(e.target.value === 'yes')}
                        row
                      >
                        <FormControlLabel
                          value='yes'
                          control={
                            <Radio
                              icon={<NewRadioUnFillIcon />}
                              checkedIcon={<NewRadioFillIedcon />}
                            />
                          }
                          label='Yes'
                        />
                        <FormControlLabel
                          value='no'
                          control={
                            <Radio
                              icon={<NewRadioUnFillIcon />}
                              checkedIcon={<NewRadioFillIedcon />}
                            />
                          }
                          label='No'
                        />
                      </RadioGroup>
                    </Box>
                    {fieldState.error?.message && (
                      <Typography color='error' variant='caption' sx={{ mt: 0.5 }}>
                        {fieldState.error.message as any}
                      </Typography>
                    )}
                  </Box>
                )}
              />
            </Box>
          </Grid2>

          <Grid2 size={{ xs: 12 }}>
            <Box className='wrapper_cmnRatioWrapper'>
              <InputLabel className='normalLabelTxt'>If no, how long was client late?</InputLabel>
              <Box className='selectBoxWrap'>
                <Controller
                  name='late_hr'
                  control={control}
                  render={({ field }) => (
                    <CustomSelect
                      initialvalue='hr'
                      iconButton={<SelecrDoubleArrowIcon />}
                      {...field}
                    >
                      {hrs.map(h => (
                        <MenuItem key={h} value={h}>
                          {h}
                        </MenuItem>
                      ))}
                    </CustomSelect>
                  )}
                />
                <Controller
                  name='late_min'
                  control={control}
                  render={({ field }) => (
                    <CustomSelect
                      initialvalue='mins'
                      iconButton={<SelecrDoubleArrowIcon />}
                      {...field}
                    >
                      {mins.map(m => (
                        <MenuItem key={m} value={m}>
                          {m}
                        </MenuItem>
                      ))}
                    </CustomSelect>
                  )}
                />
              </Box>
            </Box>
            <Stack>
              <Typography color='error' variant='caption' sx={{ mt: 0.5 }}>
                {errors.late_hr?.message}
              </Typography>
              <Typography color='error' variant='caption' sx={{ mt: 0.5 }}>
                {errors.late_min?.message}
              </Typography>
            </Stack>
          </Grid2>

          <Grid2 size={{ xs: 12 }}>
            <Box className='wrapper_cmnRatioWrapper'>
              <Controller
                name='is_proper_duration'
                control={control}
                render={({ field, fieldState }) => (
                  <Box>
                    <InputLabel className='bldLabelTxt'>
                      Was the session duration as agreed?
                    </InputLabel>
                    <Box>
                      <RadioGroup
                        {...field}
                        value={field.value === undefined ? '' : field.value ? 'yes' : 'no'}
                        onChange={e => field.onChange(e.target.value === 'yes')}
                        row
                      >
                        <FormControlLabel
                          value='yes'
                          control={
                            <Radio
                              icon={<NewRadioUnFillIcon />}
                              checkedIcon={<NewRadioFillIedcon />}
                            />
                          }
                          label='Yes'
                        />
                        <FormControlLabel
                          value='no'
                          control={
                            <Radio
                              icon={<NewRadioUnFillIcon />}
                              checkedIcon={<NewRadioFillIedcon />}
                            />
                          }
                          label='No'
                        />
                      </RadioGroup>
                    </Box>
                    {fieldState.error?.message && (
                      <Typography color='error' variant='caption' sx={{ mt: 0.5 }}>
                        {fieldState.error.message as any}
                      </Typography>
                    )}
                  </Box>
                )}
              />
            </Box>
          </Grid2>

          <Grid2 size={{ xs: 12 }}>
            <Box className='wrapper_cmnRatioWrapper'>
              <InputLabel className='normalLabelTxt'>If no, actual duration: </InputLabel>
              <Box className='selectBoxWrap' sx={{ display: 'flex', gap: 1 }}>
                <Controller
                  name='actual_hr'
                  control={control}
                  render={({ field }) => (
                    <CustomSelect
                      initialvalue='hr'
                      iconButton={<SelecrDoubleArrowIcon />}
                      {...field}
                    >
                      {hrs.map(h => (
                        <MenuItem key={h} value={h}>
                          {h}
                        </MenuItem>
                      ))}
                    </CustomSelect>
                  )}
                />
                <Controller
                  name='actual_min'
                  control={control}
                  render={({ field }) => (
                    <CustomSelect
                      initialvalue='mins'
                      iconButton={<SelecrDoubleArrowIcon />}
                      {...field}
                    >
                      {mins.map(m => (
                        <MenuItem key={m} value={m}>
                          {m}
                        </MenuItem>
                      ))}
                    </CustomSelect>
                  )}
                />
              </Box>
            </Box>
            <Stack>
              <Typography color='error' variant='caption' sx={{ mt: 0.5 }}>
                {errors.actual_hr?.message}
              </Typography>
              <Typography color='error' variant='caption' sx={{ mt: 0.5 }}>
                {errors.actual_min?.message}
              </Typography>
            </Stack>
          </Grid2>

          <Grid2 size={{ xs: 12 }}>
            <Box className='wrapper_cmnRatioWrapper'>
              <Controller
                name='has_legal_violation'
                control={control}
                render={({ field, fieldState }) => (
                  <Box>
                    <InputLabel className='bldLabelTxt'>
                      Does this dispute involve potential legal violations?
                    </InputLabel>
                    <Box>
                      <RadioGroup
                        {...field}
                        value={field.value === undefined ? '' : field.value ? 'yes' : 'no'}
                        onChange={e => field.onChange(e.target.value === 'yes')}
                        row
                      >
                        <FormControlLabel
                          value='yes'
                          control={
                            <Radio
                              icon={<NewRadioUnFillIcon />}
                              checkedIcon={<NewRadioFillIedcon />}
                            />
                          }
                          label='Yes'
                        />
                        <FormControlLabel
                          value='no'
                          control={
                            <Radio
                              icon={<NewRadioUnFillIcon />}
                              checkedIcon={<NewRadioFillIedcon />}
                            />
                          }
                          label='No'
                        />
                      </RadioGroup>
                    </Box>
                    {fieldState.error?.message && (
                      <Typography color='error' variant='caption' sx={{ mt: 0.5 }}>
                        {fieldState.error.message as any}
                      </Typography>
                    )}
                  </Box>
                )}
              />
            </Box>
          </Grid2>

          <Grid2 size={{ xs: 12 }}>
            <Box className='eachInputBox'>
              <Typography
                variant='body1'
                className='smallCaptionTxt'
                sx={{ mb: 0.5, color: '#383838 !important' }}
              >
                If yes, please specify type:
              </Typography>
              <Controller
                name='legal_violation_type'
                control={control}
                render={({ field, fieldState }) => (
                  <>
                    <TextField
                      {...field}
                      rows={5}
                      multiline
                      fullWidth
                      error={!!fieldState.error}
                      helperText={fieldState.error?.message}
                    />
                  </>
                )}
              />
            </Box>
          </Grid2>

          <Grid2 size={{ xs: 12 }}>
            <Box className='wrapper_cmnRatioWrapper'>
              <Controller
                name='has_safety_concern'
                control={control}
                render={({ field, fieldState }) => (
                  <Box>
                    <InputLabel className='bldLabelTxt'>Are there any safety concerns?</InputLabel>
                    <Box>
                      <RadioGroup
                        {...field}
                        value={field.value === undefined ? '' : field.value ? 'yes' : 'no'}
                        onChange={e => field.onChange(e.target.value === 'yes')}
                        row
                      >
                        <FormControlLabel
                          value='yes'
                          control={
                            <Radio
                              icon={<NewRadioUnFillIcon />}
                              checkedIcon={<NewRadioFillIedcon />}
                            />
                          }
                          label='Yes'
                        />
                        <FormControlLabel
                          value='no'
                          control={
                            <Radio
                              icon={<NewRadioUnFillIcon />}
                              checkedIcon={<NewRadioFillIedcon />}
                            />
                          }
                          label='No'
                        />
                      </RadioGroup>
                    </Box>
                    {fieldState.error?.message && (
                      <Typography color='error' variant='caption' sx={{ mt: 0.5 }}>
                        {fieldState.error.message as any}
                      </Typography>
                    )}
                  </Box>
                )}
              />
            </Box>
          </Grid2>

          <Grid2 size={{ xs: 12 }}>
            <Box className='eachInputBox'>
              <Typography
                variant='body1'
                className='smallCaptionTxt'
                sx={{ mb: 0.5, color: '#383838 !important' }}
              >
                If yes, please specify type:
              </Typography>
              <Controller
                name='safety_concern_type'
                control={control}
                render={({ field, fieldState }) => (
                  <>
                    <TextField
                      {...field}
                      rows={5}
                      multiline
                      fullWidth
                      error={!!fieldState.error}
                      helperText={fieldState.error?.message}
                    />
                  </>
                )}
              />
            </Box>
          </Grid2>

          <Grid2 size={{ xs: 12 }}>
            <Box className='eachInputBox'>
              <InputLabel className='bldLabelTxt' sx={{ mb: 0.75 }}>
                Please upload supporting documentation
              </InputLabel>
              <Controller
                name='supporting_documents'
                control={control}
                render={({ field, fieldState }) => (
                  <>
                    <FileUploadMultiple
                      supportedFileText='PNG, JPG, PDF (max 5 files)'
                      accept='image/png, image/jpeg, application/pdf'
                      maxFiles={5}
                      onChange={(files: File[]) => field.onChange(files)}
                    />
                    {fieldState.error?.message && (
                      <Typography color='error' variant='caption' sx={{ mt: 0.5 }}>
                        {fieldState.error.message as any}
                      </Typography>
                    )}
                  </>
                )}
              />
            </Box>
          </Grid2>

          <Grid2 size={{ xs: 12 }}>
            <Box className='eachInputBox'>
              <InputLabel className='normalLabelTxt'>Amount paid for the session</InputLabel>
              <Controller
                name='amount_paid'
                control={control}
                render={({ field, fieldState }) => {
                  const displayValue = field.value === 0 ? '' : String(field.value);
                  return (
                    <>
                      <TextField
                        value={displayValue}
                        onChange={e => {
                          const v = e.target.value;
                          const parsed = v === '' ? 0 : Number(v);
                          field.onChange(parsed);
                        }}
                        type='number'
                        fullWidth
                        variant='outlined'
                      />
                      <Typography color='error' variant='caption' sx={{ mt: 0.5 }}>
                        {fieldState.error?.message}
                      </Typography>
                    </>
                  );
                }}
              />
            </Box>
          </Grid2>
        </Grid2>

        <Stack
          direction='row'
          alignItems='center'
          justifyContent='flex-end'
          className='requestSessionbtn'
          sx={{ mt: 2 }}
        >
          <ButtonCommon
            variant='contained'
            color='primary'
            disableRipple
            className='submitBtn'
            type='submit'
            // isLoading={createDisputeMutation.isPending}
          >
            Submit
          </ButtonCommon>
        </Stack>
      </form>
    </FileDisputeModalContentWrap>
  );
};

export default FileDisputeInt;
