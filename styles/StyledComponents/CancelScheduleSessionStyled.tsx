import { inter } from '@/mui-theme/_muiTheme';
import { Box, styled } from '@mui/material';

export const CancelScheduleSessionStyled = styled(Box)`
  .cancel-content {
    padding: 15px 20px 20px;

    .MuiTypography-body2 {
      color: ${({ theme }) => theme.palette.customColors.light};
    }
  }

  .btn-stack {
    gap: 10px;
    max-width: 394px;
    margin: 52px auto 70px;
    padding: 0 10px;

    @media (max-width: 599px) {
      margin: 30px auto 40px;
    }

    button {
      width: calc(50% - 5px);

      &.no-btn {
        background: transparent;
        border: 1px solid ${({ theme }) => theme.palette.customColors.colore8e8e8};
        color: ${({ theme }) => theme.palette.text.primary};
        font-size: 14px;
        font-weight: 400;
        transition: all 0.3s;
        min-height: 50px;
        &:hover {
          color: ${({ theme }) => theme.palette.common.white};
          background: ${({ theme }) => theme.palette.primary.main};
        }
      }
    }
  }

  .subscription-cancel-sec {
    text-align: center;
    border-bottom: 1px solid ${({ theme }) => theme.palette.customColors.borderColor3};
    .inner-box {
      padding: 50px 40px 40px 40px;
      @media (max-width: 599px) {
        padding: 20px;
      }
    }
    .icon-wrap {
      width: 90px;
      height: 90px;
      border-radius: 50%;
      background-color: transparent;
      box-shadow:
        0px 2.85px 7.13px 0px #827ea91a,
        0px 12.83px 12.83px 0px #827ea917,
        0px 29.94px 17.11px 0px #827ea90d;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 20px;
      @media (max-width: 599px) {
        width: 60px;
        height: 60px;
      }
    }

    h4 {
      color: ${({ theme }) => theme.palette.text.primary};
      margin-bottom: 10px;
      font-size: 24px;
      max-width: 355px;
      margin: 0 auto 15px;
      @media (max-width: 599px) {
        font-size: 18px;
        margin: 0 auto 10px;
      }
    }

    .content {
      max-width: 296px;
      margin: 0 auto;
      @media (max-width: 599px) {
        font-size: 12px;
      }
    }

    .MuiTypography-body2 {
      color: ${({ theme }) => theme.palette.customColors.light};
    }

    &.delete-bank-sec {
      padding: 24px 30px;
      h4 {
        color: ${({ theme }) => theme.palette.text.primary};
        font-weight: 500;
        margin-top: 10px;
        font-family: ${inter.style.fontFamily};
      }
      .desc-text {
        max-width: 287px;
        margin: 0 auto;
        text-align: center;
        color: ${({ theme }) => theme.palette.customColors.light};
      }
      .btn-stack {
        max-width: 100%;
      }
    }
  }

  &.cancel-plan {
    .subscription-cancel-sec {
      .inner-box {
        padding: 60px 40px 14px 40px;
        @media (max-width: 599px) {
          padding: 20px;
        }
      }
    }
    .btn-stack {
      margin: 40px auto;
      button {
        &.no-btn {
          border: 1px solid ${({ theme }) => theme.palette.customColors.color5F57E7};
          color: ${({ theme }) => theme.palette.primary.main};
          &:hover {
            color: ${({ theme }) => theme.palette.common.white};
          }
        }
      }
    }
  }

  &.logout-modal {
    .subscription-cancel-sec {
      .icon-wrap {
        box-shadow: none;
      }

      .inner-box {
        padding: 60px 40px 30px 40px;
        @media (max-width: 599px) {
          padding: 20px;
        }
      }
    }
    .btn-stack {
      margin: 40px auto;
      button {
        &.no-btn {
          border: 1px solid ${({ theme }) => theme.palette.customColors.color5F57E7};
          color: ${({ theme }) => theme.palette.primary.main};
          &:hover {
            color: ${({ theme }) => theme.palette.common.white};
          }
        }
      }
    }
  }
`;
