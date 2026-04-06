import { Box, styled, TextField } from '@mui/material';
import { DesktopTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Dayjs } from 'dayjs';
import TimePickerTimeIcon from '../Icons/TimePickerTimeIcon';

interface datePickerProps {
  placeholder?: string;
  className?: string;
  onOpen?: () => void;
  onClose?: () => void;
  onChange: (data: Dayjs | undefined) => void;
}

const CustomTimePicker = ({
  placeholder,
  className,
  onOpen,
  onClose,
  onChange,
}: datePickerProps) => {
  return (
    <CustomDatePickerStyle className={className}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DesktopTimePicker
          slots={{
            openPickerIcon: TimePickerTimeIcon,
            textField: TextField,
          }}
          slotProps={{
            textField: {
              placeholder: placeholder,
            },
          }}
          onChange={data => {
            if (data) {
              onChange(data);
            } else {
              onChange(undefined);
            }
          }}
          onOpen={onOpen}
          onClose={onClose}
        />
      </LocalizationProvider>
    </CustomDatePickerStyle>
  );
};

export default CustomTimePicker;

export const CustomDatePickerStyle = styled(Box)`
  .MuiFormControl-root {
    background-color: ${({ theme }) => theme.palette.grey[50]};
    border-radius: 10px;
    min-height: 50px;
    padding: 12px 20px;
    border: 1px solid ${({ theme }) => theme.palette.customColors?.inputBorder};
    width: 100%;
    .MuiInputBase-root {
      color: rgba(29, 24, 21, 1);
      padding-right: 0;
      font-size: 14px;
      @media (max-width: 1199px) {
        font-size: 16px;
      }
      .MuiInputAdornment-root {
        button {
          margin: 0;
          padding: 0;
        }
      }
      input {
        padding: 0;
      }
      fieldset {
        border: none;
      }
    }
  }
`;
