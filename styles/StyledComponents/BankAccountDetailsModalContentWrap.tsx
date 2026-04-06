import { manrope } from '@/mui-theme/_muiTheme';
import { Box, styled } from '@mui/material';

export const BankAccountDetailsModalContentWrap = styled(Box)`
  .top-box {
    padding: 35px 24px 29px;
    border-bottom: 1px solid ${({ theme }) => theme.palette.customColors.colore8e8e8};
    @media (max-width: 599px) {
      padding: 15px;
    }
    .logo-fig {
      font-size: 0;
      line-height: 0;
      height: 20px;
      img {
        object-fit: contain;
      }
    }
    .bank-name {
      color: ${({ theme }) => theme.palette.customColors.light};
    }
    .chip-cls {
      background-color: ${({ theme }) => theme.palette.customColors.colorDCFDF3};
      .MuiChip-label {
        color: ${({ theme }) => theme.palette.customColors.color2A9F7C};
        font-size: 14px;
        font-family: ${manrope.style.fontFamily};
      }
    }
  }
  .bottom-box {
    padding: 23px 24px 29px;
    @media (max-width: 599px) {
      padding: 15px;
    }
    .radio-class {
      width: 100%;
      margin: 0;
      position: relative;
      .MuiRadio-root {
        position: absolute;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
      }
      .MuiFormControlLabel-label {
        font-size: 14px;
        font-weight: 400;
        color: ${({ theme }) => theme.palette.customColors.placeText};
      }
    }
    .remove-button {
      font-size: 13px;
      font-weight: 500;
      color: ${({ theme }) => theme.palette.text.primary};
      text-transform: capitalize;
      width: 100%;
      border: 1px solid ${({ theme }) => theme.palette.customColors.colore8e8e8};
      border-radius: 10px;
      padding: 16px 17px 16px 14px;
      justify-content: flex-start;
      margin: 25px 0;
      @media (max-width: 599px) {
        margin: 15px 0;
        padding: 10px;
      }
      .MuiButton-endIcon {
        margin-left: auto;
      }
    }
  }
  .edit-button {
    background: transparent;
    border: none;
    text-transform: capitalize;
    transition: all 0.3s;
    &:hover {
      opacity: 0.75;
    }
  }
`;
