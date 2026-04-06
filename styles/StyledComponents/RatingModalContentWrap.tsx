import { inter } from '@/mui-theme/_muiTheme';
import { Box, styled } from '@mui/material';

export const RatingModalContentWrap = styled(Box)`
  .top-stack {
    padding: 6px 0 0 9px;
    margin-bottom: 20px;
    .icon {
      width: 39px;
      height: 39px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: ${({ theme }) => theme.palette.primary.main};
    }
    .heading {
      font-weight: 600;
    }
    .close-button {
      transition: all 0.3s;
      padding: 0;
      &:hover {
        opacity: 0.75;
      }
    }
  }
  .rating-main-box {
    background-color: ${({ theme }) => theme.palette.customColors.ratingBgColor};
    padding: 21px 15px;
    border-radius: 10px;
    margin-bottom: 8px;
    .cmn-rating-head {
      font-weight: 500;
      margin-bottom: 18px;
    }
    .row-stack {
      .rating-radio-group {
        display: flex;
        width: 100%;
        justify-content: space-between;
        .MuiRadio-root {
          position: absolute;
          opacity: 0;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
        }
        .MuiFormControlLabel-root {
          margin: 0;
          position: relative;

          &:has(.Mui-checked) {
            .rating-col {
              .rating-btn {
                background-color: ${({ theme }) => theme.palette.primary.main};
                color: ${({ theme }) => theme.palette.common.white};
              }
            }
          }
        }
        .rating-col {
          .rating-btn {
            width: 42px;
            height: 42px;
            background-color: ${({ theme }) => theme.palette.grey['A100']};
            font-size: 16px;
            font-weight: 500;
            color: ${({ theme }) => theme.palette.text.primary};
            font-family: ${inter.style.fontFamily};
          }
          .rating-number {
            font-size: 11px;
            color: ${({ theme }) => theme.palette.customColors.light};
          }
        }
      }
    }
  }
  .textarea-class {
    .MuiInputBase-root {
      background: ${({ theme }) => theme.palette.customColors.primary800};
      .MuiInputBase-input {
        font-size: 14px;
        font-weight: 400;
        font-family: ${inter.style.fontFamily};
      }
    }
  }
  .submit-btn {
    margin-top: 25px;
    button {
      padding: 12px 20px;
      min-height: 50px;
      min-width: 170px;
      @media (max-width: 599px) {
        height: 40px;
        width: 100%;
      }
      background:
        radial-gradient(
          100% 100% at 50% 0%,
          rgba(255, 255, 255, 0.3) 0%,
          rgba(255, 255, 255, 0) 100%
        ),
        rgb(129, 66, 233);
      border-radius: 10px;
      &:hover {
        background: transparent;
      }
    }
  }
`;
