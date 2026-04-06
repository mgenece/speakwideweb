// DayRow.tsx
import { CommonSwitch } from '@/styles/StyledComponents/AvailabilityWrapper';
import CustomSwitch from '@/ui/CustomSwitch/CustomSwitch';
import { Stack, TableCell, TableRow, useTheme } from '@mui/material';
import TimePickerComp from './TimePickerComp';
import { DayOfWeek, DaySchedule, ScheduleAction } from './types';

interface DayRowProps {
  type?: 'second';
  day: DayOfWeek;
  daySchedule: DaySchedule;
  dispatch: React.Dispatch<ScheduleAction>;
}

export default function DayRow({ type, day, daySchedule, dispatch }: DayRowProps) {
  const theme = useTheme();

  const handleOffDayToggle = () => {
    dispatch({ type: 'TOGGLE_OFF_DAY', day });
  };

  return (
    <TableRow key={day}>
      <TableCell align='left' className='sticky'>
        {day}
      </TableCell>
      <TableCell align='left'>
        <Stack direction='column' alignItems='center' gap={{ lg: 2, xs: 1 }}>
          {daySchedule.timeSlots.map((slot, index) => (
            <TimePickerComp
              key={slot.id}
              type={type}
              timeSlot={slot}
              day={day}
              isDisabled={Boolean(daySchedule.isOffDay)}
              dispatch={dispatch}
              isLast={index === daySchedule.timeSlots.length - 1}
              showRemove={daySchedule.timeSlots.length > 1}
            />
          ))}
        </Stack>
      </TableCell>

      <TableCell align='left'>
        <CommonSwitch
          sx={{
            '.MuiSwitch-switchBase': {
              '&:not(.Mui-checked) + .MuiSwitch-track': {
                backgroundColor:
                  type === 'second' ? `${theme.palette.primary.main} !important` : '',
              },
              '&.Mui-checked': {
                '.MuiSwitch-thumb': {
                  boxShadow: type === 'second' ? `none !important` : '',
                },
              },
            },
          }}
        >
          <CustomSwitch
            checked={daySchedule.isOffDay}
            onChange={handleOffDayToggle}
            label={' Off Day'}
            labelPlacement='start'
            className={type === 'second' ? 'second-type' : ''}
          />
        </CommonSwitch>
      </TableCell>
    </TableRow>
  );
}
