// AddNewPeriod.tsx
import { AddNewPeriodWrapper } from '@/styles/StyledComponents/AvailabilityWrapper';
import { Table, TableBody, TableContainer } from '@mui/material';
import dayjs from 'dayjs';
import { useEffect, useReducer } from 'react';
import DayRow from './DayRow';
import { DayOfWeek, ScheduleAction, ScheduleState } from './types';

// Type the weekdays array with the union type
const weekdays: DayOfWeek[] = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

// Generate initial state with proper typing
const initialState: ScheduleState = weekdays.reduce<ScheduleState>((acc, day) => {
  acc[day] = {
    day,
    isOffDay: false,
    timeSlots: [
      {
        id: `${day}-slot-1`,
        startTime: dayjs().hour(8).minute(0),
        endTime: dayjs().hour(17).minute(0),
      },
    ],
  };
  return acc;
}, {} as ScheduleState);

// Reducer function with proper error handling
function scheduleReducer(state: ScheduleState, action: ScheduleAction): ScheduleState {
  switch (action.type) {
    case 'TOGGLE_OFF_DAY':
      return {
        ...state,
        [action.day]: {
          ...state[action.day],
          timeSlots: [
            {
              id: `${action.day}-slot-1`,
              startTime: dayjs().hour(8).minute(0),
              endTime: dayjs().hour(17).minute(0),
            },
          ],
          isOffDay: !state[action.day].isOffDay,
        },
      };

    case 'ADD_TIME_SLOT': {
      const newSlot = {
        id: `${action.day}-slot-${Date.now()}`,
        startTime: dayjs().hour(8).minute(0),
        endTime: dayjs().hour(17).minute(0),
      };
      return {
        ...state,
        [action.day]: {
          ...state[action.day],
          timeSlots: [...state[action.day].timeSlots, newSlot],
        },
      };
    }

    case 'UPDATE_TIME_SLOT':
      return {
        ...state,
        [action.day]: {
          ...state[action.day],
          timeSlots: state[action.day].timeSlots.map(slot =>
            slot.id === action.slotId ? { ...slot, [action.field]: action.value } : slot
          ),
        },
      };

    case 'REMOVE_TIME_SLOT':
      return {
        ...state,
        [action.day]: {
          ...state[action.day],
          timeSlots: state[action.day].timeSlots.filter(slot => slot.id !== action.slotId),
        },
      };

    case 'RESET_SCHEDULE':
      return action.schedule || state;

    default:
      return state;
  }
}

interface AddNewPeriodProps {
  type?: 'second';
  onChange: (data: ScheduleState) => void;
  initialSchedule?: ScheduleState | null;
}

function AddNewPeriod({ type, onChange, initialSchedule }: AddNewPeriodProps) {
  const [schedule, dispatch] = useReducer(scheduleReducer, initialState);

  useEffect(() => {
    onChange(schedule);
  }, [schedule]);

  const str = JSON.stringify(initialSchedule);

  useEffect(() => {
    if (initialSchedule) {
      dispatch({ type: 'RESET_SCHEDULE', schedule: initialSchedule });
    }
  }, [str]);

  return (
    <AddNewPeriodWrapper className={type === 'second' ? 'second-type' : ''}>
      <TableContainer>
        <Table sx={{ minWidth: 630 }} aria-label='simple table'>
          <TableBody>
            {weekdays.map(day => {
              return (
                <DayRow
                  key={day}
                  day={day}
                  type={type}
                  daySchedule={schedule[day]}
                  dispatch={dispatch}
                />
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </AddNewPeriodWrapper>
  );
}

export default AddNewPeriod;
