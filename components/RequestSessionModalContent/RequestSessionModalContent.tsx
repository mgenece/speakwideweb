import { areaOfInterestApi, langListApi, sessionPricingApi } from '@/api/functions/cms.api';
import { requestSessionApi } from '@/api/functions/session.api';
import { queryKeys } from '@/config/constants';
import { RequestSessionModalContentWrap } from '@/styles/StyledComponents/RequestSessionModalContentWrap';
import CommonAutocomplete from '@/ui/CommonAutoComplete/CommonAutoComplete';
import InputFieldCommon from '@/ui/CommonInput/CommonInput';
import CustomSelect from '@/ui/CustomSelect/CustomSelect';
import CheckBoxEmptyIcon from '@/ui/Icons/CheckBoxEmptyIcon';
import CheckedIconCheckBox from '@/ui/Icons/CheckedIconCheckBox';
import DirectionIcon from '@/ui/Icons/DirectionIcon';
import InfoIcon from '@/ui/Icons/InfoIcon';
import { showWarnToast } from '@/ui/Toast/ToastUtils';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  Grid2,
  InputLabel,
  MenuItem,
  Stack,
  Typography,
} from '@mui/material';
import { DatePicker, LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useMutation, useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { Controller, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import * as yup from 'yup';
import { InferType } from 'yup';
import ButtonCommon from '../layouts/common/ButtonCommon';
import LocationPicker from '../Map/LocationPicker';

interface IRequestSessionModalContentProps {
  handleClose: () => void;
  BottomButtonText?: string;
  selectedLang?: {
    lang1: { value: string; label: string };
    lang2: { value: string; label: string };
  };
  paymentMethodId?: string;
  getPaymentData?: ({
    clientSecret,
    paymentIntentId,
    amount,
    platform_fee_amount,
  }: {
    clientSecret: string;
    paymentIntentId: string;
    amount: number;
    platform_fee_amount: string;
  }) => void;
}

let pricingPlanList: { value: string; label: string; pricing: number }[] = [];

// Define validation schema first
const validationSchema = yup.object({
  lang1: yup
    .object({
      value: yup.string().required(),
      label: yup.string().required(),
    })
    .required('Please select the first language'),
  lang2: yup
    .object({
      value: yup.string().required(),
      label: yup.string().required(),
    })
    .required('Please select the second language'),
  interpreterType: yup.string().required('Please select interpreter type'),
  sessionType: yup.string().required('Please select session type'),
  sessionFormat: yup.string().required('Please select session format'),
  sessionLocation: yup.string().when('sessionFormat', {
    is: (val: string) => {
      const selectedSession = pricingPlanList.find(item => item.value === val);
      const isOnsite = selectedSession?.label?.toLowerCase()?.includes('site');
      return isOnsite;
    },
    then: schema => schema.required('Please enter session location'),
    otherwise: schema => schema.notRequired(),
  }),
  sessionDate: yup
    .date()
    .nullable()
    .required('Please select session date')
    .typeError('Please select a valid date'),
  startTime: yup
    .date()
    .nullable()
    .required('Please select start time')
    .typeError('Please select a valid start time'),
  endTime: yup
    .date()
    .nullable()
    .required('Please select end time')
    .typeError('Please select a valid end time')
    .test('is-after-start', 'End time must be after start time', function (value) {
      const { startTime } = this.parent;
      if (!value || !startTime) return true;
      return dayjs(value).isAfter(dayjs(startTime));
    }),
  preferredGender: yup.string().optional(),
  sessionDetails: yup.string().required('Please provide session details'),
  documentTranslation: yup.boolean().optional(),
  uploadedFiles: yup
    .array()
    .of(yup.mixed<File>())
    .optional()
    .when('documentTranslation', {
      is: true,
      then: schema => schema.min(1, 'Please upload at least one document'),
    }),
  acceptTerms: yup
    .boolean()
    .oneOf([true], 'You must accept the cancellation policy and terms of use')
    .required('You must accept the terms'),
});

type TFormValues = InferType<typeof validationSchema>;

const RequestSessionModalContent = ({
  // handleClose,

  selectedLang,
  paymentMethodId,
  getPaymentData,
}: IRequestSessionModalContentProps) => {
  const requestSessionMutation = useMutation({
    mutationFn: requestSessionApi,
    onSuccess: data => {
      getPaymentData?.({
        paymentIntentId: data.data.paymentIntentId,
        amount: data.data.amount,
        clientSecret: data.data.clientSecret,
        platform_fee_amount: data.data.platform_fee_amount,
      });
      toast.success('Sesstion request submitted successfully');
      // handleClose();
    },
  });

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<TFormValues>({
    defaultValues: {
      lang1: selectedLang?.lang1,
      lang2: selectedLang?.lang2,
      interpreterType: '',
      sessionType: '',
      sessionFormat: '',
      sessionLocation: '',
      sessionDate: undefined,
      startTime: undefined,
      endTime: undefined,
      preferredGender: '',
      sessionDetails: '',
      documentTranslation: false,
      uploadedFiles: [],
      acceptTerms: false,
    },
    resolver: yupResolver(validationSchema),
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  // const isDocumentTranslation = watch('documentTranslation');

  const languageQuery = useQuery({
    queryKey: queryKeys.langList,
    queryFn: langListApi,
  });

  const areaInterestQuery = useQuery({
    queryKey: queryKeys.areaOfExpertise,
    queryFn: areaOfInterestApi,
  });

  const interpreterType = watch('interpreterType');
  const sessionTypeValue = watch('sessionType');
  const isPricingAllowed = Boolean(interpreterType && sessionTypeValue);

  const pricingPlanQuery = useQuery({
    queryKey: queryKeys.pricingPlanList(`${interpreterType}-${sessionTypeValue}`),
    queryFn: () =>
      sessionPricingApi({
        interpreterType: interpreterType as 'Certified' | 'Qualified',
        sessionType: sessionTypeValue,
      }),
    enabled: isPricingAllowed,
  });

  const languages =
    languageQuery.data?.data?.map(item => ({
      value: item._id,
      label: item.language_display_name,
    })) || [];

  const interestList =
    areaInterestQuery?.data?.data?.map(item => ({
      label: item.expertise_display_name,
      value: item._id,
    })) || [];

  pricingPlanList =
    pricingPlanQuery.data?.data?.map(item => ({
      value: item.sessionformatDetails._id,
      label: item.sessionformatDetails.title,
      pricing: item.price,
    })) || [];

  const selectedSession = pricingPlanList.find(item => item.value === watch('sessionFormat'));
  const isOnsite = selectedSession?.label?.toLowerCase()?.includes('site');

  const onSubmit = async (data: TFormValues) => {
    const startDateTime = dayjs(data.sessionDate)
      .hour(dayjs(data.startTime).hour())
      .minute(dayjs(data.startTime).minute())
      .second(0);

    // Combine date with end time
    const endDateTime = dayjs(data.sessionDate)
      .hour(dayjs(data.endTime).hour())
      .minute(dayjs(data.endTime).minute())
      .second(0);

    const formData = new FormData();
    formData.append('language_one', data.lang1.value);
    formData.append('language_two', data.lang2.value);
    formData.append('interpreter_type', data.interpreterType);
    formData.append('type', data.sessionType);
    formData.append('format', data.sessionFormat);

    // Conditionally required
    if (data.sessionLocation) {
      const location = JSON.parse(data.sessionLocation);

      // console.log(location, '***f2');

      formData.append('location', location?.address);
      formData.append('lat', location?.lat);
      formData.append('lng', location?.lng);
      formData.append('isOnSite', 'true');
    }

    // Use combined datetime values
    formData.append('start_date_time', startDateTime.toISOString());
    formData.append('end_date_time', endDateTime.toISOString());
    formData.append('paymentMethodId', paymentMethodId || '');

    // Optional fields
    if (data.preferredGender) formData.append('preferred_gender', data.preferredGender);
    if (data.sessionDetails) formData.append('details', data.sessionDetails);

    // const dataObj = Object.fromEntries(formData.entries());
    // console.log(data, '***f1');
    // console.log(dataObj, '***f');

    requestSessionMutation.mutate(formData);
  };

  // console.log(errors, '***e');

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <RequestSessionModalContentWrap>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid2 container spacing={2}>
            {/* LANGUAGES */}
            <Grid2 size={{ xs: 12 }}>
              <Box className='eachInputBox'>
                <InputLabel>Select languages for interpretation</InputLabel>
                <Stack
                  direction='row'
                  alignItems='center'
                  justifyContent='space-between'
                  className='interpretationLanguagesBox'
                  gap='5px'
                >
                  <Controller
                    name='lang1'
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                      <Stack width={'50%'}>
                        <CommonAutocomplete
                          {...field}
                          label='English'
                          options={languages}
                          onSelect={value => field.onChange(value)}
                        />
                        {error && (
                          <Typography color='error' variant='caption'>
                            {error.message}
                          </Typography>
                        )}
                      </Stack>
                    )}
                  />
                  <DirectionIcon />
                  <Controller
                    name='lang2'
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                      <Stack width={'50%'}>
                        <CommonAutocomplete
                          {...field}
                          label='Spanish'
                          options={languages}
                          onSelect={value => field.onChange(value)}
                        />
                        {error && (
                          <Typography color='error' variant='caption'>
                            {error.message}
                          </Typography>
                        )}
                      </Stack>
                    )}
                  />
                </Stack>
              </Box>
            </Grid2>

            {/* INTERPRETER TYPE */}
            <Grid2 size={{ xs: 12 }}>
              <Box className='eachInputBox'>
                <InputLabel>Interpreter Type</InputLabel>
                <Controller
                  name='interpreterType'
                  control={control}
                  render={({ field }) => (
                    <CustomSelect
                      {...field}
                      initialvalue='Certified'
                      error={!!errors.interpreterType}
                    >
                      <MenuItem value='Certified'>Certified</MenuItem>
                      <MenuItem value='Qualified'>Qualified</MenuItem>
                    </CustomSelect>
                  )}
                />
                {errors.interpreterType && (
                  <Typography color='error' variant='caption'>
                    {errors.interpreterType.message}
                  </Typography>
                )}
              </Box>
            </Grid2>

            {/* SESSION TYPE */}
            <Grid2 size={{ xs: 12 }}>
              <Box className='eachInputBox'>
                <InputLabel>Session Type</InputLabel>
                <Controller
                  name='sessionType'
                  control={control}
                  render={({ field }) => (
                    <CustomSelect {...field} initialvalue='Medical' error={!!errors.sessionType}>
                      {interestList.map(item => (
                        <MenuItem value={item.value} key={item.value}>
                          {item.label}
                        </MenuItem>
                      ))}
                    </CustomSelect>
                  )}
                />
                {errors.sessionType && (
                  <Typography color='error' variant='caption'>
                    {errors.sessionType.message}
                  </Typography>
                )}
              </Box>
            </Grid2>

            {/* SESSION FORMAT */}

            {isPricingAllowed && (
              <Grid2 size={{ xs: 12 }}>
                <Box className='eachInputBox'>
                  <InputLabel>Session Format</InputLabel>
                  {pricingPlanQuery.isLoading ? (
                    <Box
                      width={'100%'}
                      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                    >
                      <CircularProgress size={15} />
                    </Box>
                  ) : (
                    <Controller
                      name='sessionFormat'
                      control={control}
                      render={({ field }) => (
                        <CustomSelect
                          {...field}
                          initialvalue='On-site'
                          error={!!errors.sessionFormat}
                          disabled={!isPricingAllowed}
                          onClick={() => {
                            if (!isPricingAllowed) {
                              showWarnToast('Please select Interpreter Type and Session Type.');
                            }
                          }}
                        >
                          {pricingPlanList.map(item => (
                            <MenuItem value={item.value} key={item.value}>
                              <Stack
                                direction='row'
                                alignItems='center'
                                justifyContent='space-between'
                                className='menuStack'
                              >
                                <Typography>{item.label}</Typography>
                                <Typography>${item.pricing}/hr</Typography>
                              </Stack>
                            </MenuItem>
                          ))}
                        </CustomSelect>
                      )}
                    />
                  )}

                  {errors.sessionFormat && (
                    <Typography color='error' variant='caption'>
                      {errors.sessionFormat.message}
                    </Typography>
                  )}
                </Box>
              </Grid2>
            )}

            {/* SESSION LOCATION */}

            {Boolean(isOnsite) && (
              <Grid2 size={{ xs: 12 }}>
                {/* <Box className='eachInputBox'> */}
                <Box className='eachInputBox' height={450} pr={1}>
                  <InputLabel>Pick a location</InputLabel>
                  <Controller
                    name='sessionLocation'
                    control={control}
                    render={({ field }) => (
                      <LocationPicker
                        // inputLabel='Pick a location'
                        height={400}
                        onLocationChange={data => {
                          const str = JSON.stringify(data);
                          field.onChange(str);
                          // console.log(data, '***');
                        }}
                      />
                    )}
                  />
                  {errors.sessionLocation && (
                    <Typography color='error' variant='caption' display='block' mt={1}>
                      {errors.sessionLocation.message}
                    </Typography>
                  )}
                </Box>
              </Grid2>
            )}

            {/* DATE TIME PICKERS */}
            {/* SESSION DATE */}
            <Grid2 size={{ xs: 12 }}>
              <Box className='eachInputBox datepickerdsgn'>
                <InputLabel>Session Date</InputLabel>
                <Controller
                  name='sessionDate'
                  control={control}
                  render={({ field }) => (
                    <DatePicker
                      {...field}
                      minDate={dayjs()}
                      views={['year', 'month', 'day']}
                      slotProps={{
                        textField: {
                          error: !!errors.sessionDate,
                          helperText: errors.sessionDate?.message,
                          fullWidth: true,
                        },
                      }}
                    />
                  )}
                />
              </Box>
            </Grid2>

            {/* START TIME */}
            <Grid2 size={{ md: 6, xs: 12 }}>
              <Box className='eachInputBox datepickerdsgn'>
                <InputLabel>Start Time</InputLabel>
                <Controller
                  name='startTime'
                  control={control}
                  render={({ field }) => (
                    <TimePicker
                      {...field}
                      views={['hours', 'minutes']}
                      slotProps={{
                        textField: {
                          error: !!errors.startTime,
                          helperText: errors.startTime?.message,
                          fullWidth: true,
                        },
                      }}
                    />
                  )}
                />
              </Box>
            </Grid2>

            {/* END TIME */}
            <Grid2 size={{ md: 6, xs: 12 }}>
              <Box className='eachInputBox datepickerdsgn'>
                <InputLabel>End Time</InputLabel>
                <Controller
                  name='endTime'
                  control={control}
                  render={({ field }) => (
                    <TimePicker
                      {...field}
                      views={['hours', 'minutes']}
                      minTime={
                        watch('startTime')
                          ? dayjs(watch('startTime')).add(isOnsite ? 2 : 0, 'hour')
                          : undefined
                      }
                      slotProps={{
                        textField: {
                          error: !!errors.endTime,
                          helperText: errors.endTime?.message,
                          fullWidth: true,
                        },
                      }}
                    />
                  )}
                />
              </Box>
            </Grid2>

            {/* GENDER */}
            <Grid2 size={{ xs: 12 }}>
              <Box className='eachInputBox'>
                <InputLabel>
                  Preferred Gender <span>(Optional)</span>
                </InputLabel>
                <Controller
                  name='preferredGender'
                  control={control}
                  render={({ field }) => (
                    <CustomSelect {...field} initialvalue='Select Gender'>
                      <MenuItem value='Male'>Male</MenuItem>
                      <MenuItem value='Female'>Female</MenuItem>
                      <MenuItem value='Choose not to disclose'>Choose not to disclose</MenuItem>
                    </CustomSelect>
                  )}
                />
              </Box>
              <Stack direction='row' alignItems='flex-start' gap='5px' className='informationBox'>
                <i>
                  <InfoIcon />
                </i>
                <Typography className='infoText'>
                  While we offer the option to indicate a preferred gender. Please note that we
                  cannot guarantee that your preference will always be met; however we will make
                  every reasonable effort to accommodate your selection whenever possible.
                </Typography>
              </Stack>
            </Grid2>

            {/* SESSION DETAILS */}
            <Grid2 size={{ xs: 12 }}>
              <Box className='eachInputBox'>
                <InputLabel>Session Details</InputLabel>
                <Controller
                  name='sessionDetails'
                  control={control}
                  render={({ field }) => (
                    <InputFieldCommon
                      {...field}
                      multiline
                      rows={4}
                      error={!!errors.sessionDetails}
                      helperText={errors.sessionDetails?.message}
                    />
                  )}
                />
              </Box>
              <Stack direction='row' alignItems='flex-start' gap='5px' className='informationBox'>
                <i>
                  <InfoIcon />
                </i>
                <Typography className='infoText'>
                  Please do not provide meeting links in this box. Our system will not recognize
                  them.
                </Typography>
              </Stack>
            </Grid2>

            {/* DOCUMENT TRANSLATION */}
            {/* <Grid2 size={{ xs: 12 }}>
            <Controller
              name='documentTranslation'
              control={control}
              render={({ field }) => (
                <Button
                  className={`requestSessionTranslatebtn ${field.value ? 'active' : ''}`}
                  onClick={() => field.onChange(!field.value)}
                  disableRipple
                  type='button'
                >
                  <Typography>Document Translation</Typography>
                  <RecordingIcon IconColor='currentColor' />
                </Button>
              )}
            />
          </Grid2> */}

            {/*
          isDocumentTranslation && (
            <Grid2 size={{ xs: 12 }}>
              <Controller
                name='uploadedFiles'
                control={control}
                render={({ field }) => (
                  <FileUploadMultiple
                    supportedFileText='PNG, JPEG, PDF files only 2MB each'
                    maxFiles={5}
                    accept='image/png, image/jpeg, image/jpg, application/pdf'
                    onChange={files => field.onChange(files)}
                    size={maxFileSize}
                    error={errors.uploadedFiles?.message}
                  />
                )}
              />
            </Grid2>
          )
            */}
          </Grid2>

          {/* TERMS */}
          <Controller
            name='acceptTerms'
            control={control}
            render={({ field }) => (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <FormControlLabel
                  className='checkbox'
                  control={
                    <Checkbox
                      {...field}
                      checked={field.value}
                      icon={<CheckBoxEmptyIcon />}
                      checkedIcon={<CheckedIconCheckBox />}
                    />
                  }
                  label=''
                />
                <Typography
                  sx={{ cursor: 'pointer', pt: 3 }}
                  onClick={() => window.open('/terms/', '_blank', 'noopener,noreferrer')}
                >
                  Accept Cancellation Policy & Terms of Use
                </Typography>
              </Box>
            )}
          />
          {errors.acceptTerms && (
            <Typography color='error' variant='caption' display='block'>
              {errors.acceptTerms.message}
            </Typography>
          )}

          {/* SUBMIT BUTTON */}
          <Stack
            direction='row'
            alignItems='center'
            justifyContent='flex-end'
            className='requestSessionbtn'
          >
            <ButtonCommon
              variant='contained'
              color='primary'
              type='submit'
              isLoading={requestSessionMutation.isPending}
            >
              Request An Interpreter
            </ButtonCommon>
          </Stack>
        </form>
      </RequestSessionModalContentWrap>
    </LocalizationProvider>
  );
};

export default RequestSessionModalContent;
