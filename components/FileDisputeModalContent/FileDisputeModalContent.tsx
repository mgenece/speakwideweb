// FileDisputeModalContent.tsx
import { FileDisputeModalContentWrap } from '@/styles/StyledComponents/FileDisputeModalContentWrap';
import CustomSelect from '@/ui/CustomSelect/CustomSelect';
import NewRadioFillIedcon from '@/ui/Icons/NewRadioFillIedcon';
import NewRadioUnFillIcon from '@/ui/Icons/NewRadioUnFillIcon';
import SelecrDoubleArrowIcon from '@/ui/Icons/SelecrDoubleArrowIcon';
import {
  Box,
  Checkbox,
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
import DisputeCategory from './DisputeCategory';

import { createDisputeApi } from '@/api/functions/dispute.api';
import { createDisputeSchema } from '@/lib/schema/other.schema';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import * as yup from 'yup';
import ButtonCommon from '../layouts/common/ButtonCommon';
import FileUploadMultiple from '../layouts/common/FileUploadMultiple';

type FormInternal = yup.InferType<typeof createDisputeSchema>;

interface clickProps {
  handleClose?: () => void;
  sessionId: string;
}

const hrs = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, '0'));
const mins = ['10', '20', '30', '40', '50', '60'];

const FileDisputeModalContent: React.FC<clickProps> = ({ handleClose, sessionId }) => {
  const createDisputeMutation = useMutation({
    mutationFn: createDisputeApi,
    onSuccess: () => {
      toast.success('Dispute raised successfully');
      handleClose?.();
    },
  });

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormInternal>({
    resolver: yupResolver(createDisputeSchema),
    defaultValues: {
      session_ref_number: sessionId,
      category: [] as string[],
      issue_details: '',
      interpreter_noshow: undefined,
      waiting_hr: undefined,
      waiting_min: undefined,
      quality: undefined as any,
      interpreter_ontime: undefined,
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
      certify: false,
      false_claims_ack: false,
      cooperate_ack: false,
    },
  });

  const onSubmit: SubmitHandler<FormInternal> = values => {
    // --- Build helper values ---
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

    // Map quality to expected capitalization
    const qualityMapped =
      values.quality === 'poor'
        ? 'Poor'
        : values.quality === 'fair'
          ? 'Fair'
          : values.quality === 'good'
            ? 'Good'
            : 'Excellent';

    // Defensive checks (optional — schema should normally prevent these)
    if (!values.session_ref_number) {
      console.error('session_ref_number missing');
      return;
    }
    if (!values.category || values.category.length === 0) {
      console.error('category missing');
      return;
    }
    if (!values.issue_details) {
      console.error('issue_details missing');
      return;
    }

    // --- Build FormData ---
    const formData = new FormData();

    formData.append('session_ref_number', values.session_ref_number);

    // Append categories (repeat key). If your API expects category[] use 'category[]' instead.
    values.category.forEach(catId => {
      formData.append('category', String(catId));
    });

    formData.append('issue_details', values.issue_details);

    // booleans: append "true"/"false"
    formData.append('interpreter_noshow', String(values.interpreter_noshow === 'yes'));
    if (waitingTime) formData.append('waiting_time', waitingTime);

    formData.append('quality', qualityMapped);

    formData.append('interpreter_ontime', String(values.interpreter_ontime === 'yes'));
    if (lateTime) formData.append('late_time', lateTime);

    formData.append('is_proper_duration', String(values.is_proper_duration === 'yes'));
    if (actualDuration) formData.append('actual_duration', actualDuration);

    formData.append('has_legal_violation', String(values.has_legal_violation === 'yes'));
    if (values.legal_violation_type) {
      formData.append('legal_violation_type', values.legal_violation_type);
    }

    formData.append('has_safety_concern', String(values.has_safety_concern === 'yes'));
    if (values.safety_concern_type) {
      formData.append('safety_concern_type', values.safety_concern_type);
    }

    // amount_paid must be a number in form-data (send as string)
    formData.append('amount_paid', String(Number(values.amount_paid ?? 0)));

    // supporting_documents: append each file. Use 'supporting_documents' so server sees array of files.
    if (values.supporting_documents && values.supporting_documents.length > 0) {
      values.supporting_documents.forEach(file => {
        formData.append('supporting_documents', file as File);
      });
    }

    // --- Submit via react-query mutation ---
    createDisputeMutation.mutate(formData);
  };

  return (
    <FileDisputeModalContentWrap>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Grid2 container spacing={2}>
          {/* Category */}
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
                        <DisputeCategory value={value} onChange={handleChange} type='client' />
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

          {/* Issue details */}
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

          {/* Interpreter no-show */}
          <Grid2 size={{ xs: 12 }}>
            <Box className='eachInputBox'>
              <Controller
                name='interpreter_noshow'
                control={control}
                render={({ field, fieldState }) => (
                  <Box>
                    <Box className='wrapper_cmnRatioWrapper'>
                      <InputLabel className='bldLabelTxt'>
                        Was the interpreter a no-show?
                      </InputLabel>
                      <RadioGroup
                        {...field}
                        value={field.value ?? ''}
                        onChange={e => field.onChange(e.target.value)}
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

          {/* Waiting time */}
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

          {/* Quality */}
          <Grid2 size={{ xs: 12 }}>
            <Box className='wrapper_cmnRatioWrapper'>
              <Controller
                name='quality'
                control={control}
                render={({ field, fieldState }) => (
                  <Box>
                    <InputLabel className='bldLabelTxt'>Rate the interpretation quality</InputLabel>
                    <Box>
                      <RadioGroup
                        {...field}
                        value={field.value ?? ''}
                        onChange={e => field.onChange(e.target.value)}
                        row
                      >
                        <FormControlLabel
                          value='poor'
                          control={
                            <Radio
                              icon={<NewRadioUnFillIcon />}
                              checkedIcon={<NewRadioFillIedcon />}
                            />
                          }
                          label='Poor'
                        />
                        <FormControlLabel
                          value='fair'
                          control={
                            <Radio
                              icon={<NewRadioUnFillIcon />}
                              checkedIcon={<NewRadioFillIedcon />}
                            />
                          }
                          label='Fair'
                        />
                        <FormControlLabel
                          value='good'
                          control={
                            <Radio
                              icon={<NewRadioUnFillIcon />}
                              checkedIcon={<NewRadioFillIedcon />}
                            />
                          }
                          label='Good'
                        />
                        <FormControlLabel
                          value='excellent'
                          control={
                            <Radio
                              icon={<NewRadioUnFillIcon />}
                              checkedIcon={<NewRadioFillIedcon />}
                            />
                          }
                          label='Excellent'
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

          {/* Interpreter on time */}
          <Grid2 size={{ xs: 12 }}>
            <Box className='wrapper_cmnRatioWrapper'>
              <Controller
                name='interpreter_ontime'
                control={control}
                render={({ field, fieldState }) => (
                  <Box>
                    <InputLabel className='bldLabelTxt'>
                      Did the interpreter arrive on time?
                    </InputLabel>
                    <Box>
                      <RadioGroup
                        {...field}
                        value={field.value ?? ''}
                        onChange={e => field.onChange(e.target.value)}
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

          {/* Late time */}
          <Grid2 size={{ xs: 12 }}>
            <Box className='wrapper_cmnRatioWrapper'>
              <InputLabel className='normalLabelTxt'>If no, how long did you wait?</InputLabel>
              <Box className='selectBoxWrap'>
                <Controller
                  name='late_hr'
                  control={control}
                  render={({ field }) => (
                    <>
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
                    </>
                  )}
                />
                <Controller
                  name='late_min'
                  control={control}
                  render={({ field }) => (
                    <>
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
                    </>
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

          {/* Duration proper */}
          <Grid2 size={{ xs: 12 }}>
            <Box className='wrapper_cmnRatioWrapper'>
              <Controller
                name='is_proper_duration'
                control={control}
                render={({ field, fieldState }) => (
                  <Box>
                    <InputLabel className='bldLabelTxt'>
                      Was the service duration as agreed?
                    </InputLabel>
                    <Box>
                      <RadioGroup
                        {...field}
                        value={field.value ?? ''}
                        onChange={e => field.onChange(e.target.value)}
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

          {/* Actual duration */}
          <Grid2 size={{ xs: 12 }}>
            <Box className='wrapper_cmnRatioWrapper'>
              <InputLabel className='normalLabelTxt'>If no, actual duration: </InputLabel>
              <Box className='selectBoxWrap' sx={{ display: 'flex', gap: 1 }}>
                <Controller
                  name='actual_hr'
                  control={control}
                  render={({ field }) => (
                    <>
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
                    </>
                  )}
                />
                <Controller
                  name='actual_min'
                  control={control}
                  render={({ field }) => (
                    <>
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
                    </>
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

          {/* Legal violation */}
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
                        value={field.value ?? ''}
                        onChange={e => field.onChange(e.target.value)}
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

          {/* Safety concerns */}
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
                        value={field.value ?? ''}
                        onChange={e => field.onChange(e.target.value)}
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

          {/* Supporting docs */}
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

          {/* Amount paid */}
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

          {/* Consents */}
          <Grid2 size={{ xs: 12 }}>
            <Box>
              <Box className='eachInputBox topBoxWrapper'>
                <Stack
                  direction='row'
                  alignItems='center'
                  className='checkbox-group'
                  rowGap={{ xs: '19px' }}
                  columnGap={{ xs: '29px' }}
                  flexWrap={'wrap'}
                >
                  <Controller
                    name='certify'
                    control={control}
                    defaultValue={false}
                    render={({ field, fieldState }) => (
                      <>
                        <FormControlLabel
                          className='checkbox-cls'
                          control={<Checkbox {...field} checked={field.value} />}
                          label='I certify that the information provided is accurate and complete'
                        />
                        {fieldState.error?.message && (
                          <Typography color='error' variant='caption' sx={{ mt: 0.5 }}>
                            {fieldState.error.message as any}
                          </Typography>
                        )}
                      </>
                    )}
                  />
                  <Controller
                    name='false_claims_ack'
                    control={control}
                    defaultValue={false}
                    render={({ field, fieldState }) => (
                      <>
                        <FormControlLabel
                          className='checkbox-cls'
                          control={<Checkbox {...field} checked={field.value} />}
                          label='I understand that false claims may result in account suspension'
                        />
                        {fieldState.error?.message && (
                          <Typography color='error' variant='caption' sx={{ mt: 0.5 }}>
                            {fieldState.error.message as any}
                          </Typography>
                        )}
                      </>
                    )}
                  />
                  <Controller
                    name='cooperate_ack'
                    control={control}
                    defaultValue={false}
                    render={({ field, fieldState }) => (
                      <>
                        <FormControlLabel
                          className='checkbox-cls'
                          control={<Checkbox {...field} checked={field.value} />}
                          label='I agree to cooperate with the investigation process'
                        />
                        {fieldState.error?.message && (
                          <Typography color='error' variant='caption' sx={{ mt: 0.5 }}>
                            {fieldState.error.message as any}
                          </Typography>
                        )}
                      </>
                    )}
                  />
                </Stack>
              </Box>
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
            disabled={!watch('certify') || !watch('false_claims_ack') || !watch('cooperate_ack')}
            isLoading={createDisputeMutation.isPending}
          >
            Submit
          </ButtonCommon>
        </Stack>
      </form>
    </FileDisputeModalContentWrap>
  );
};

export default FileDisputeModalContent;
