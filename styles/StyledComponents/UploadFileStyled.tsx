import { Box, styled } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers';

export const UploadFileStyled = styled(Box)`
  .MuiButtonBase-root {
    background: transparent;
    padding: 0;
    border: 0;
    margin: 0;
    min-width: inherit;
    background: #fcfbff;
    border: 1px dashed #e9dbff;
    border-radius: 10px;
    padding: 25px;
    text-align: center;
    flex-direction: column;
    font-size: 11px;
    line-height: 1.3;
    color: ${({ theme }) => theme.palette.customColors?.placeText};
    width: 100%;
  }
  .MuiButton-icon {
    margin: 0;
    width: 42px;
    height: 42px;
    background: #f3ebff;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    margin-bottom: 12px;
  }
  .uplaodFileTxt {
    font-weight: 500;
    font-size: 13px;
    line-height: 1.3;
    color: #8142e9;
    text-decoration: underline;
    margin-bottom: 8px;
  }
  .supportFileTxt {
    font-weight: 400;
    font-size: 11px;
  }
`;

export const CommonDatePicker = styled(DateTimePicker)`
  .MuiInputLabel-root {
    color: ${({ theme }) => theme.palette.customColors?.placeText};
    line-height: 1.2;
  }
  .MuiInputBase-root {
    background-color: ${({ theme }) => theme.palette.grey[50]};
    border-radius: 10px;
    min-height: 50px;
    position: relative;
    padding-right: 0;
    &::before {
      content: '';
      position: absolute;
      top: 50%;
      right: 12px;
      transform: translateY(-50%);
      width: 20px;
      height: 20px;
      background-image: url('/assets/icons/calenderIcon.svg');
      pointer-events: none;
    }

    &.Mui-focused {
      fieldset {
        border-width: 1px;
      }
    }

    .MuiInputBase-input {
      padding: 12px 20px;
    }
    .MuiInputAdornment-root {
      margin: 0;
      padding: 0 12px;
      .MuiIconButton-root {
        padding: 12px;
        svg {
          opacity: 0;
        }
      }
    }
    .fieldset {
      border-color: ${({ theme }) => theme.palette.customColors?.inputBorder};
    }
  }
`;
