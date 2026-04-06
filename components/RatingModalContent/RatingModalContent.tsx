import { submitReview } from '@/api/functions/session.api';
import { RatingModalContentWrap } from '@/styles/StyledComponents/RatingModalContentWrap';
import { ISessionFeedback } from '@/typescript/interface/session.interface';

import InputFieldCommon from '@/ui/CommonInput/CommonInput';
import CrossIcon from '@/ui/Icons/CrossIcon';
import StarIcon from '@/ui/Icons/StarIcon';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box,
  FormControlLabel,
  IconButton,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import ButtonCommon from '../layouts/common/ButtonCommon';

interface IRatingModalContentProps {
  handleClose: () => void;
  sessionId?: string; // optional if you later want to send it
}

const easeOfRating = [
  { value: 1, label: 'Bad' },
  { value: 2, label: 'Fair' },
  { value: 3, label: 'Good' },
  { value: 4, label: 'Great' },
  { value: 5, label: 'Excellent' },
];

// Yup + form type for fields present in the UI
const schema = yup.object({
  ease_of_use: yup.number().required('Required').min(1, 'Select rating'),
  voice_clarity: yup.number().required('Required').min(1, 'Select rating'),
  audio_clarity: yup.number().required('Required').min(1, 'Select rating'),
  interpreter_performance: yup.number().required('Required').min(1, 'Select rating'),
  details: yup.string().optional(),
});

type RatingFormValues = yup.InferType<typeof schema>;

const RatingModalContent = ({ handleClose, sessionId }: IRatingModalContentProps) => {
  const reviewMutation = useMutation({
    mutationFn: submitReview,
    onSuccess: () => {
      handleClose();
    },
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RatingFormValues>({
    resolver: yupResolver(schema),
    // preserve original visual behaviour by using 0 defaults (designer used radio layout with numbers)
    defaultValues: {
      ease_of_use: 0 as any, // keep 0 so layout doesn't shift — validation will require user selection
      voice_clarity: 0 as any,
      audio_clarity: 0 as any,
      interpreter_performance: 0 as any,
      details: '',
    },
  });

  const onSubmit: SubmitHandler<RatingFormValues> = data => {
    // compute average and map to backend interface
    const avgRating =
      (Number(data.ease_of_use) +
        Number(data.voice_clarity) +
        Number(data.audio_clarity) +
        Number(data.interpreter_performance)) /
      4;

    const payload: ISessionFeedback = {
      session_id: sessionId ?? '',
      rating: avgRating,
      details: data.details ?? '',
      ease_of_use: Number(data.ease_of_use),
      voice_clarity: Number(data.voice_clarity),
      video_clarity: Number(data.audio_clarity),
      interpreter_performance: Number(data.interpreter_performance),
    };

    reviewMutation.mutate(payload);
  };

  return (
    <RatingModalContentWrap>
      <Stack
        direction={'row'}
        alignItems={'center'}
        justifyContent={'space-between'}
        flexWrap={'wrap'}
        className='top-stack'
      >
        <Stack direction={'row'} alignItems={'center'} flexWrap={'wrap'} spacing={{ xs: '16px' }}>
          <i className='icon'>
            <StarIcon />
          </i>
          <Typography variant='h5' className='heading'>
            Rate Your Session
          </Typography>
        </Stack>
        <IconButton
          disableRipple
          aria-label='close button'
          className='close-button'
          onClick={handleClose}
        >
          <CrossIcon />
        </IconButton>
      </Stack>

      <Stack spacing={'25px'} className='rating-main-box'>
        {/* Ease of Use */}
        <Box>
          <Typography variant='body1' className='cmn-rating-head'>
            Ease of Use
          </Typography>
          <Stack
            direction={'row'}
            alignItems={'center'}
            justifyContent={'space-between'}
            flexWrap={'wrap'}
            className='row-stack'
          >
            <Controller
              name='ease_of_use'
              control={control}
              render={({ field }) => (
                <RadioGroup
                  row
                  aria-labelledby='ease-of-use-label'
                  value={field.value}
                  onChange={e => field.onChange(Number(e.target.value))}
                  className='rating-radio-group'
                >
                  {easeOfRating.map(option => (
                    <FormControlLabel
                      key={option.value}
                      value={option.value}
                      control={<Radio />}
                      label={
                        <Stack
                          alignItems='center'
                          justifyContent='center'
                          className='rating-col'
                          spacing='10px'
                        >
                          <IconButton disableRipple aria-label='rating' className='rating-btn'>
                            {option.value}
                          </IconButton>
                          <Typography className='rating-number'>{option.label}</Typography>
                        </Stack>
                      }
                    />
                  ))}
                </RadioGroup>
              )}
            />
          </Stack>
          {errors.ease_of_use && (
            <Typography color='error' variant='caption'>
              {errors.ease_of_use.message}
            </Typography>
          )}
        </Box>

        {/* Voice Clarity */}
        <Box>
          <Typography variant='body1' className='cmn-rating-head'>
            Voice Clarity
          </Typography>
          <Stack
            direction={'row'}
            alignItems={'center'}
            justifyContent={'space-between'}
            flexWrap={'wrap'}
            className='row-stack'
          >
            <Controller
              name='voice_clarity'
              control={control}
              render={({ field }) => (
                <RadioGroup
                  row
                  aria-labelledby='voice-clarity-label'
                  value={field.value}
                  onChange={e => field.onChange(Number(e.target.value))}
                  className='rating-radio-group'
                >
                  {easeOfRating.map(option => (
                    <FormControlLabel
                      key={option.value}
                      value={option.value}
                      control={<Radio />}
                      label={
                        <Stack
                          alignItems='center'
                          justifyContent='center'
                          className='rating-col'
                          spacing='10px'
                        >
                          <IconButton disableRipple aria-label='rating' className='rating-btn'>
                            {option.value}
                          </IconButton>
                          <Typography className='rating-number'>{option.label}</Typography>
                        </Stack>
                      }
                    />
                  ))}
                </RadioGroup>
              )}
            />
          </Stack>
          {errors.voice_clarity && (
            <Typography color='error' variant='caption'>
              {errors.voice_clarity.message}
            </Typography>
          )}
        </Box>

        {/* Video Clarity */}
        <Box>
          <Typography variant='body1' className='cmn-rating-head'>
            Video Clarity
          </Typography>
          <Stack
            direction={'row'}
            alignItems={'center'}
            justifyContent={'space-between'}
            flexWrap={'wrap'}
            className='row-stack'
          >
            <Controller
              name='audio_clarity'
              control={control}
              render={({ field }) => (
                <RadioGroup
                  row
                  aria-labelledby='video-clarity-label'
                  value={field.value}
                  onChange={e => field.onChange(Number(e.target.value))}
                  className='rating-radio-group'
                >
                  {easeOfRating.map(option => (
                    <FormControlLabel
                      key={option.value}
                      value={option.value}
                      control={<Radio />}
                      label={
                        <Stack
                          alignItems='center'
                          justifyContent='center'
                          className='rating-col'
                          spacing='10px'
                        >
                          <IconButton disableRipple aria-label='rating' className='rating-btn'>
                            {option.value}
                          </IconButton>
                          <Typography className='rating-number'>{option.label}</Typography>
                        </Stack>
                      }
                    />
                  ))}
                </RadioGroup>
              )}
            />
          </Stack>
          {errors.audio_clarity && (
            <Typography color='error' variant='caption'>
              {errors.audio_clarity.message}
            </Typography>
          )}
        </Box>

        {/* Interpreter Performance */}
        <Box>
          <Typography variant='body1' className='cmn-rating-head'>
            Interpreter Performance
          </Typography>
          <Stack
            direction={'row'}
            alignItems={'center'}
            justifyContent={'space-between'}
            flexWrap={'wrap'}
            className='row-stack'
          >
            <Controller
              name='interpreter_performance'
              control={control}
              render={({ field }) => (
                <RadioGroup
                  row
                  aria-labelledby='interpreter-performance-label'
                  value={field.value}
                  onChange={e => field.onChange(Number(e.target.value))}
                  className='rating-radio-group'
                >
                  {easeOfRating.map(option => (
                    <FormControlLabel
                      key={option.value}
                      value={option.value}
                      control={<Radio />}
                      label={
                        <Stack
                          alignItems='center'
                          justifyContent='center'
                          className='rating-col'
                          spacing='10px'
                        >
                          <IconButton disableRipple aria-label='rating' className='rating-btn'>
                            {option.value}
                          </IconButton>
                          <Typography className='rating-number'>{option.label}</Typography>
                        </Stack>
                      }
                    />
                  ))}
                </RadioGroup>
              )}
            />
          </Stack>
          {errors.interpreter_performance && (
            <Typography color='error' variant='caption'>
              {errors.interpreter_performance.message}
            </Typography>
          )}
        </Box>
      </Stack>

      {/* Textarea (keeps same className & component) */}
      <Box>
        <Controller
          name='details'
          control={control}
          render={({ field }) => (
            <InputFieldCommon
              {...field}
              placeholder='Can you tell us more..'
              multiline
              rows={5}
              className='textarea-class'
            />
          )}
        />
      </Box>

      {/* Submit button calls handleSubmit without changing layout */}
      <Stack direction='row' alignItems='center' justifyContent='flex-end' className='submit-btn'>
        <ButtonCommon
          variant='contained'
          color='primary'
          aria-label='Submit'
          onClick={() => handleSubmit(onSubmit)()}
          disabled={reviewMutation.isPending}
        >
          Submit
        </ButtonCommon>
      </Stack>
    </RatingModalContentWrap>
  );
};

export default RatingModalContent;
