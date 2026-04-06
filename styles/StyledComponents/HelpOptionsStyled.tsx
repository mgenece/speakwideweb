import { styled } from '@mui/material';
import Box from '@mui/material/Box';

export const HelpOptionsStyled = styled(Box)`
  .white-box {
    max-width: 578px;
    background: ${({ theme }) => theme.palette.common.white};
    /* box-shadow:
      0px 546px 218px rgba(223, 225, 251, 0.01),
      0px 307px 184px rgba(223, 225, 251, 0.05),
      0px 136px 136px rgba(223, 225, 251, 0.09),
      0px 34px 75px rgba(223, 225, 251, 0.1); */
    border-radius: 20px;
    padding: 30px 20px;
    @media (max-width: 899px) {
      max-width: 100%;
    }
    .head-title {
      font-size: 20px;
      font-weight: 600;
      color: ${({ theme }) => theme.palette.primary.main};
      padding-bottom: 20px;
      @media (max-width: 599px) {
        font-size: 16px;
      }
    }
    .option-btn {
      justify-content: flex-start;
      padding: 11px 20px 11px 16px;
      text-transform: capitalize;
      font-size: 14px;
      font-weight: 400;
      color: ${({ theme }) => theme.palette.text.primary};
      background-color: ${({ theme }) => theme.palette.customColors.btnBg};
      border-radius: 10px;
      transition: all 0.3s;
      &:hover {
        background-color: ${({ theme }) => theme.palette.primary.light};
      }
      .MuiButton-endIcon {
        margin-left: auto;
      }
    }
    .close-button {
      position: absolute;
      right: 0;
      top: 0;
      min-width: 50px;
      min-height: 50px;
      background-color: ${({ theme }) => theme.palette.common.white};
      transition: all 0.3s;
      @media (max-width: 899px) {
        min-width: 20px;
        min-height: 20px;
        right: 34px;
        top: 34px;
      }
      &:hover {
        opacity: 0.75;
      }
    }
  }
  .inner-btn-stack {
    @media (max-width: 899px) {
      max-height: calc(100svh - 230px);
      overflow: auto;
      margin: 0px -20px;
      padding: 0 20px;
    }
  }
`;
