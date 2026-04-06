// TimePickerComp.tsx
import { TimePickerContinaerStyle } from '@/styles/StyledComponents/AvailabilityWrapper';
import AddIcon from '@/ui/Icons/AddIcon';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { IconButton, Typography } from '@mui/material';
import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import { DayOfWeek, ScheduleAction, TimeSlot } from './types';

interface TimePickerCompProps {
  type?: 'second';
  timeSlot: TimeSlot;
  day: DayOfWeek;
  dispatch: React.Dispatch<ScheduleAction>;
  showRemove?: boolean;
  isDisabled?: boolean;
  isLast: boolean;
}

export default function TimePickerComp({
  type,
  timeSlot,
  day,
  dispatch,
  isDisabled,
  isLast,
  showRemove = false,
}: TimePickerCompProps) {
  const startTime = dayjs().hour(8).minute(0);

  const handleStartTimeChange = (newValue: Dayjs | null) => {
    if (!newValue) {
      return;
    }
    dispatch({
      type: 'UPDATE_TIME_SLOT',
      day,
      slotId: timeSlot.id,
      field: 'startTime',
      value: newValue,
    });
  };

  const handleEndTimeChange = (newValue: Dayjs | null) => {
    if (!newValue) {
      return;
    }
    dispatch({
      type: 'UPDATE_TIME_SLOT',
      day,
      slotId: timeSlot.id,
      field: 'endTime',
      value: newValue,
    });
  };

  const handleAddSlot = () => {
    dispatch({ type: 'ADD_TIME_SLOT', day });
  };

  const handleRemoveSlot = () => {
    dispatch({ type: 'REMOVE_TIME_SLOT', day, slotId: timeSlot.id });
  };

  return (
    <TimePickerContinaerStyle
      direction='row'
      alignItems='center'
      gap={{ md: 1.5, xs: 1 }}
      sx={{ width: '100%' }}
    >
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        {type === 'second' ? (
          <>
            <TimePicker
              disabled={isDisabled}
              value={isDisabled ? startTime : timeSlot.startTime}
              format='hh:mma'
              onChange={handleStartTimeChange}
            />
            <Typography className='divider'>-</Typography>
            <TimePicker
              disabled={isDisabled}
              value={isDisabled ? startTime : timeSlot.endTime}
              format='hh:mma'
              onChange={handleEndTimeChange}
            />
          </>
        ) : (
          <>
            <TimePicker
              disabled={isDisabled}
              value={isDisabled ? startTime : timeSlot.startTime}
              onChange={handleStartTimeChange}
            />
            <Typography className='divider'>-</Typography>
            <TimePicker
              disabled={isDisabled}
              value={isDisabled ? startTime : timeSlot.endTime}
              onChange={handleEndTimeChange}
            />
          </>
        )}
      </LocalizationProvider>

      {!isDisabled && isLast && (
        <IconButton className='addNewSlotBtn' onClick={handleAddSlot} title='Add new time slot'>
          <AddIcon />
        </IconButton>
      )}

      {showRemove && (
        <IconButton
          className='removeSlotBtn'
          onClick={handleRemoveSlot}
          title='Remove this time slot'
          color='error'
        >
          <RemoveCircleOutlineIcon fontSize='small' />
        </IconButton>
      )}
    </TimePickerContinaerStyle>
  );
}
