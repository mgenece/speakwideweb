import { manrope } from '@/mui-theme/_muiTheme';
import { Dialog, styled } from '@mui/material';

export const MuiModalWrapperStyled = styled(Dialog)`
  .MuiModal-backdrop {
    background: rgba(0, 3, 38, 0.8);
    backdrop-filter: blur(7.5px);
  }
  &.sessionModalPricing {
    .MuiPaper-root {
      max-width: 700px;
    }
  }
  .MuiPaper-root {
    max-width: 596px;
    width: 100%;
    background: ${({ theme }) => theme.palette.common.white};
    box-shadow:
      0px 546px 218px rgba(223, 225, 251, 0.01),
      0px 307px 184px rgba(223, 225, 251, 0.05),
      0px 136px 136px rgba(223, 225, 251, 0.09),
      0px 34px 75px rgba(223, 225, 251, 0.1);
    border-radius: 10px;
    @media (max-width: 599px) {
      margin: 15px 10px;
    }
    .MuiDialogContent-root {
      @media (max-width: 599px) {
        padding: 15px;
      }
      &.picker-open {
        overflow: hidden;
      }
    }
  }
  .headingContainer {
    padding: 15px 26px;
    background: ${({ theme }) => theme.palette.primary.main};
    @media (max-width: 599px) {
      padding: 10px 15px;
    }
    p {
      font-size: 20px;
      font-weight: 600;
      color: ${({ theme }) => theme.palette.common.white};
      font-family: ${manrope.style.fontFamily};
      @media (max-width: 599px) {
        font-size: 14px;
      }
    }
    button {
      padding: 0;
    }
  }
  &.requestSessionModal {
    .MuiPaper-root {
      /* overflow: hidden; */
      height: calc(100vh - 100px);
    }
  }
  &.cnacelSessionModal {
    .MuiPaper-root {
      padding: 0;
      max-width: 517px;
      .MuiDialogContent-root {
        padding: 0;
        .topBox {
          padding: 20px 25px;
          border-bottom: 1px solid ${({ theme }) => theme.palette.customColors?.colore8e8e8};
          @media (max-width: 599px) {
            padding: 15px;
          }
          i {
            display: inline-flex;
          }
          p {
            font-size: 14px;
            font-weight: 500;
            color: ${({ theme }) => theme.palette.error.dark};
          }
        }
        .bottomBox {
          padding: 20px 25px;
          @media (max-width: 599px) {
            padding: 15px;
          }
          .cancelTextHeading {
            font-size: 18px;
            font-weight: 500;
            @media (max-width: 599px) {
              font-size: 15px;
            }
          }
          .cancelingText {
            margin-top: 10px;
            display: flex;
            align-items: flex-start;
            padding: 12px;
            border-radius: 10px;
            background: rgb(255, 246, 246);
            gap: 5px;
            i {
              display: inline-flex;
              margin-top: 2px;
            }
            p {
              font-size: 13px;
              color: rgb(58, 58, 58);
            }
          }
          .buttonGroup {
            gap: 9px;
            margin-top: 18px;
            @media (max-width: 599px) {
              flex-wrap: wrap;
              gap: 10px;
            }
            button {
              min-width: 170px;
              @media (max-width: 599px) {
                min-width: 100%;
                height: 40px;
              }
              &.coloredPrimaryButtonOutlined {
                border: 1px solid ${({ theme }) => theme.palette.customColors.colorD0B3FF};
              }
              &.coloredPrimaryButton {
                background:
                  radial-gradient(
                    100% 100% at 50% 0%,
                    rgba(255, 255, 255, 0.3) 0%,
                    rgba(255, 255, 255, 0) 100%
                  ),
                  #8142e9;
                &:hover {
                  background: transparent;
                }
              }
            }
          }
        }
      }
    }
  }
  &.sharedFileModal {
    .MuiPaper-root {
      max-height: calc(100vh - 100px);
      max-width: 611px;
      .MuiDialogContent-root {
        padding: 0;
      }
    }
  }
  &.helpSupportModal {
    .MuiPaper-root {
      max-width: 670px;
      box-shadow: none;
      background: transparent;
    }
  }
  &.editAccountModal {
    .MuiPaper-root {
      max-width: 694px;
    }
  }
  &.rating-modal {
    .MuiPaper-root {
      max-width: 445px;
      .MuiDialogContent-root {
        padding: 12px;
      }
    }
  }
  &.file-dispute-modal {
    .MuiPaper-root {
      max-width: 762px;
      .MuiDialogContent-root {
        padding: 23px;
      }
    }
  }
  &.subscriptionSessionModal {
    .MuiPaper-root {
      max-width: 614px;
      border-radius: 20px;
      @media (max-width: 599px) {
        border-radius: 10px;
      }
      .MuiDialogContent-root {
        padding: 0;
      }
    }
  }
  &.bank-account-details {
    .MuiPaper-root {
      .MuiDialogContent-root {
        padding: 0;
      }
    }
  }
`;
