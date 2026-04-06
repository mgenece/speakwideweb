import { Box, Stack, styled } from '@mui/material';

export const AvailabilityWrapper = styled(Box)``;

export const AddNewPeriodWrapper = styled(Box)`
  .MuiTableContainer-root {
    .MuiTable-root {
      .MuiTableBody-root {
        tr {
          td {
            padding: 12px 9px;
            border-bottom: 0;
            font-size: 16px;
            font-weight: 600;
            @media (max-width: 1440px) {
              padding: 8px 5px;
              font-size: 14px;
            }
            &.sticky {
              position: sticky;
              left: 0;
              background-color: ${({ theme }) => theme.palette.common.white};
              z-index: 2;
              padding-right: 15px;
            }
            .divider {
              font-weight: 600;
              color: ${({ theme }) => theme.palette.customColors.darkTextColor};
            }
            .addNewSlotBtn {
              color: ${({ theme }) => theme.palette.text.primary};
              &:hover {
                color: ${({ theme }) => theme.palette.primary.main};
              }
            }
          }
        }
      }
    }
  }
  &.second-type {
    .MuiTable-root {
      .MuiTableBody-root {
        tr {
          td {
            font-weight: 400;
          }
        }
      }
    }
  }
`;

export const CommonSwitch = styled(Box)`
  .MuiFormControlLabel-root {
    margin: -8px;
    white-space: nowrap;
    .MuiSwitch-root {
      margin: 8px;
      height: 20px;
      width: 44px;
      .MuiSwitch-switchBase {
        &.Mui-checked {
          transform: translateX(24px);
          .MuiSwitch-thumb {
            box-shadow: -1px 1px 8px 0px #c56600;
          }
        }
        &.Mui-checked + .MuiSwitch-track {
          background-color: #ffbe79;
        }
        &:not(.Mui-checked) + .MuiSwitch-track {
          background-color: #dadada;
        }

        .MuiSwitch-thumb {
          width: 14px;
          height: 14px;
          box-shadow: 1px 1px 4px 0px #40404040;
        }
      }
    }
    .MuiFormControlLabel-label {
      padding: 8px;
    }
  }
`;

export const TimePickerContinaerStyle = styled(Stack)`
  .MuiInputBase-root {
    padding-right: 0;
    position: relative;
    color: ${({ theme }) => theme.palette.primary.main};
    border-radius: 10px;
    background-color: ${({ theme }) => theme.palette.primary.light};
    &:hover {
      fieldset {
        border-color: ${({ theme }) => theme.palette.primary.main};
      }
    }
    .MuiInputAdornment-root {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 0;
      max-height: initial;
      min-width: initial;
      margin: 0;
      button {
        width: 100%;
        height: 100%;
      }
    }
    .MuiInputBase-input {
      padding: 8px 15px;
      min-width: 100px;
      @media (max-width: 1440px) {
        min-width: 80px;
      }
    }
    fieldset {
      border-color: ${({ theme }) => theme.palette.customColors.tabTableBorder};
    }
  }
`;
