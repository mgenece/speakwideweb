import { inter, manrope } from '@/mui-theme/_muiTheme';
import { Box, styled } from '@mui/material';

export const PagePaymentSubscription = styled(Box)`
  .top-status-heading {
    border-top: 1px solid ${({ theme }) => theme.palette.customColors.colore8e8e8};
    border-bottom: 1px solid ${({ theme }) => theme.palette.customColors.colore8e8e8};
    padding: 12px 0;
    margin-bottom: 22px;

    .plan-status {
      gap: 20px;

      .MuiTypography-body2 {
        font-size: 18px;
        font-weight: 500;
        font-family: ${manrope.style.fontFamily};
      }

      .MuiTypography-caption {
        font-size: 18px;
        font-weight: 600;
        font-family: ${manrope.style.fontFamily};
        text-transform: uppercase;
        letter-spacing: 4px;
        position: relative;
        color: ${({ theme }) => theme.palette.primary.main};
        padding-left: 23px;

        &::before {
          content: '';
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: ${({ theme }) => theme.palette.primary.main};
        }
      }
    }

    .cancel-plan-btn {
      text-align: right;

      button {
        font-weight: 500;
        font-size: 14px;
        text-transform: capitalize;
        padding: 0;
      }
    }
  }

  .cmn-gradiant {
    background: linear-gradient(133.06deg, #e7d9ff 4.51%, rgba(243, 243, 243, 0.2) 55.88%);
    box-shadow:
      0px 17px 38px 0px #958eb81a,
      0px 69px 69px 0px #958eb817,
      0px 156px 93px 0px #958eb80d,
      0px 277px 111px 0px #958eb803,
      0px 433px 121px 0px #958eb800;

    border-radius: 10px;
    padding: 1px;
    height: 100%;
  }

  .cmn-paper-box {
    border-radius: 10px;
    padding: 20px 25px;
    height: 100%;
  }

  .paper-head {
    margin-bottom: 10px;

    .heading-h6 {
      font-family: ${inter.style.fontFamily};
    }

    button {
      padding: 0;
      font-size: 15px;
      font-weight: 500;
      text-transform: capitalize;

      &:hover {
        background-color: transparent;
      }
    }
  }
`;

export const UpgradePlanStack = styled(Box)`
  .plan-paper-root {
    .upgrade-plan-stack {
      display: inline-flex;
      text-align: center;

      .plan-link {
        color: ${({ theme }) => theme.palette.primary.main};
        font-weight: 500;
        font-size: 14px;
      }

      .MuiChip-root {
        align-self: center;
        height: 40px;
        border-radius: 100px;
        background-color: ${({ theme }) => theme.palette.customColors.primary800};

        .MuiChip-label {
          font-size: 14px;
          font-weight: 500;
          color: ${({ theme }) => theme.palette.primary.main};
          padding-left: 20px;
          padding-right: 20px;
        }
      }
    }
  }
`;

export const BillingHistoryPaper = styled(Box)`
  .MuiTableContainer-root {
    max-height: 440px;

    .MuiTable-root {
      border-collapse: separate;
      border-spacing: 0 8px;

      .MuiTableBody-root {
        .MuiTableRow-root {
          .MuiTableCell-body {
            border: none;
            background-color: ${({ theme }) => theme.palette.primary.light};

            &:first-child {
              border-top-left-radius: 10px;
              border-bottom-left-radius: 10px;
            }

            &:last-child {
              border-top-right-radius: 10px;
              border-bottom-right-radius: 10px;
            }
          }
        }
      }
    }
  }
`;

export const PaymentCardListPaper = styled(Box)`
  .card-items {
    background-color: ${({ theme }) => theme.palette.primary.light};
    border-radius: 10px;
    padding: 15px;

    .MuiRadioGroup-root {
      .MuiRadio-root {
        color: ${({ theme }) => theme.palette.text.primary};
        padding-left: 0;

        &.Mui-checked {
          color: ${({ theme }) => theme.palette.primary.main};
        }
      }
      .MuiFormControlLabel-root {
        margin: 0;

        &:not(:last-child) {
          margin-bottom: 8px;
        }

        .MuiFormControlLabel-label {
          display: flex;
          align-items: center;
          gap: 15px;
          font-size: 14px;

          i {
            display: inline-block;
            line-height: 0;
          }
        }
      }
    }
  }
`;

export const BankAccountPaper = styled(Box)`
  .account-list {
    background-color: ${({ theme }) => theme.palette.primary.light};
    border-radius: 10px;
    padding: 15px;

    li {
      &:not(:last-child) {
        margin-bottom: 8px;
      }

      .account-items {
        justify-content: space-between;
        padding: 0;
        text-transform: inherit;

        &:hover {
          background-color: transparent;
        }

        .btn-capstack {
          display: flex;
          align-items: center;
          gap: 13px;

          i {
            display: flex;
            align-items: center;
            width: 60px;
            height: 42px;

            img {
              width: 100%;
              height: 100%;
              object-fit: cover;
            }
          }

          .btn-capinr {
            text-align: left;

            .btn-captxt {
              display: block;
              color: ${({ theme }) => theme.palette.text.primary};
            }

            .MuiChip-root {
              height: auto;
              font-size: 10px;
              font-weight: 500;
              color: ${({ theme }) => theme.palette.primary.main};
              background-color: ${({ theme }) => theme.palette.customColors.colorF0E7FF};

              .MuiChip-label {
                padding-left: 13px;
                padding-right: 13px;
              }
            }
          }
        }

        .MuiButton-endIcon {
          margin-right: 0;
        }
      }
    }
  }
`;

export const CancelPlanContainer = styled(Box)`
  .plancancel-dialog-head {
    color: ${({ theme }) => theme.palette.error.main};
    gap: 15px;
    padding: 20px 25px;
    border-bottom: 1px solid ${({ theme }) => theme.palette.customColors.colore8e8e8};

    .icon-wrap {
      line-height: 0;
      display: inline-block;
    }
  }

  .cancel-content {
    padding: 15px 20px 20px;

    .MuiTypography-body2 {
      color: ${({ theme }) => theme.palette.customColors.light};
    }
  }

  .btn-stack {
    gap: 10px;
    max-width: 350px;
    margin: 25px auto 0;

    button {
      width: calc(50% - 5px);

      &.outnineBtn {
        border-color: ${({ theme }) => theme.palette.customColors.colorD0B3FF};
      }
    }
  }

  .subscription-cancel-sec {
    text-align: center;
    padding: 30px 60px;

    .icon-wrap {
      width: 79px;
      height: 79px;
      border-radius: 50%;
      background-color: ${({ theme }) => theme.palette.common.white};
      box-shadow:
        0px 2.85px 7.13px 0px #827ea91a,
        0px 12.83px 12.83px 0px #827ea917,
        0px 29.94px 17.11px 0px #827ea90d;
      padding: 10px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 20px;
    }

    h4 {
      color: ${({ theme }) => theme.palette.customColors.colorFD2420};
      margin-bottom: 10px;
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

  &.interpreter {
    .subscription-cancel-sec {
      padding: 30px 70px;
      @media (max-width: 599px) {
        padding: 30px;
      }
    }
  }
`;
