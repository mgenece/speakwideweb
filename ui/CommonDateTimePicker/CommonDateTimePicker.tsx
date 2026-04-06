import { TextField } from '@mui/material';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Dayjs } from 'dayjs';
import { CustomDatePickerStyle } from '../CommonDatePicker/CommonDatePicker';

interface IdatePickerProps {
  placeholder?: string;
  className?: string;
  onOpen?: () => void;
  onClose?: () => void;
  minDate?: Dayjs;
  maxDate?: Dayjs;
}

function CommonDateTimePicker({
  placeholder,
  className,
  onOpen,
  onClose,
  minDate,
  maxDate,
  ...props
}: IdatePickerProps) {
  return (
    <CustomDatePickerStyle className={className}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateTimePicker
          onOpen={onOpen}
          onAccept={onClose}
          {...props}
          slots={{
            textField: TextField,
          }}
          slotProps={{
            textField: {
              placeholder: placeholder,
            },
          }}
          minDateTime={minDate}
          maxDateTime={maxDate}
        />
      </LocalizationProvider>
    </CustomDatePickerStyle>
  );
}

export default CommonDateTimePicker;
