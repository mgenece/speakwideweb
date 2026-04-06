import { Box, styled, TextField } from '@mui/material';
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Dayjs } from 'dayjs';
import DatePickerCalenderIcon from '../Icons/DatePickerCalenderIcon';

interface IdatePickerProps {
  placeholder?: string;
  className?: string;
  position?: 'fromLeft';
  onOpen?: () => void;
  onClose?: () => void;
  onChange: (data: Dayjs | undefined) => void;
}

const CustomDatePicker = ({
  placeholder,
  className,
  position,
  onOpen,
  onClose,
  onChange,
}: IdatePickerProps) => {
  return (
    <CustomDatePickerStyle className={className}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DesktopDatePicker
          onOpen={onOpen}
          onClose={onClose}
          slots={{
            openPickerIcon: DatePickerCalenderIcon,
            textField: TextField,
          }}
          slotProps={{
            textField: {
              placeholder: placeholder,
            },
            popper: {
              modifiers: [
                {
                  name: 'offset',
                  options: {
                    offset: position === 'fromLeft' ? [-0, 10] : '',
                  },
                },
              ],
              placement: position === 'fromLeft' ? 'bottom-end' : 'bottom-start',
            },
          }}
          onChange={data => {
            if (data) {
              onChange(data);
            } else {
              onChange(undefined);
            }
          }}
        />
      </LocalizationProvider>
    </CustomDatePickerStyle>
  );
};

export default CustomDatePicker;

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
