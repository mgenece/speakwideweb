import { Box, styled } from '@mui/material';

export const AddBankAccountModalContentWrap = styled(Box)`
  .eachInputBox {
    .label-class {
      margin-bottom: 10px;
      font-size: 14px;
      font-weight: 600;
      color: ${({ theme }) => theme.palette.text.primary};
      span {
        font-weight: 400;
      }
    }
    .MuiSelect-select {
      font-size: 14px;
      color: ${({ theme }) => theme.palette.customColors.light};
    }
    .MuiInputBase-input {
      font-size: 14px;
      color: ${({ theme }) => theme.palette.customColors.light};
    }
    .checkbox-group {
      .MuiFormControlLabel-root {
        margin: 0;
        .MuiCheckbox-root {
          padding: 0;
        }
        .MuiFormControlLabel-label {
          padding-left: 10px;
          font-size: 14px;
          font-weight: 400;
          color: ${({ theme }) => theme.palette.customColors.light};
        }
      }
    }
  }
  .submit-btn {
    color: ${({ theme }) => theme.palette.common.white};
    border: 1px solid ${({ theme }) => theme.palette.primary.main};
    padding: 15px;
    min-height: 50px;
    min-width: 192px;
    border-radius: 10px;
    transition: all 0.3s;
    margin-bottom: 20px;
    &:hover {
      background-color: transparent;
      color: ${({ theme }) => theme.palette.primary.main};
    }
    @media (max-width: 599px) {
      margin-bottom: 0;
    }
  }
`;
