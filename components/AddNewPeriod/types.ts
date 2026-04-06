// types.ts
import { Dayjs } from 'dayjs';

export type DayOfWeek =
  | 'Monday'
  | 'Tuesday'
  | 'Wednesday'
  | 'Thursday'
  | 'Friday'
  | 'Saturday'
  | 'Sunday';

export interface TimeSlot {
  id: string;
  startTime: Dayjs;
  endTime: Dayjs;
}

export interface DaySchedule {
  day: DayOfWeek;
  isOffDay: boolean;
  timeSlots: TimeSlot[];
}

// This is the key fix - use Record with DayOfWeek union type
export type ScheduleState = Record<DayOfWeek, DaySchedule>;

export type ScheduleAction =
  | { type: 'TOGGLE_OFF_DAY'; day: DayOfWeek }
  | { type: 'ADD_TIME_SLOT'; day: DayOfWeek }
  | {
      type: 'UPDATE_TIME_SLOT';
      day: DayOfWeek;
      slotId: string;
      field: keyof TimeSlot;
      value: Dayjs;
    }
  | { type: 'REMOVE_TIME_SLOT'; day: DayOfWeek; slotId: string }
  | { type: 'RESET_SCHEDULE'; schedule: ScheduleState };
