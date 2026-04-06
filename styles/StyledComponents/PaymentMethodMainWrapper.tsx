import { Box, styled } from '@mui/material';

export const PaymentMethodMainWrapper = styled(Box)`
  .wrapper_mainPayemntWrapper {
    position: relative;
    padding: 150px 0 110px;
    min-height: 100vh;
    @media (max-width: 1199px) {
      padding: 150px 0 60px;
    }
    @media (max-width: 599px) {
      padding: 120px 0 40px;
    }
    .bgShapeImg {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      pointer-events: none;
    }
    .wrapper_topBtnWrapper {
      position: relative;
      margin-bottom: 45px;
      z-index: 2;
      @media (max-width: 1199px) {
        margin-bottom: 30px;
      }
      @media (max-width: 599px) {
        margin-bottom: 20px;
      }
      a {
        display: inline-flex;
        align-items: center;
        font-weight: 400;
        font-size: 16px;
        color: ${({ theme }) => theme.palette.text.primary};
        gap: 14px;
        transition: 0.3s ease-in-out;
        &:hover {
          color: ${({ theme }) => theme.palette.primary.main};
        }
      }
    }
    .wrapper_infoPayment {
      position: relative;
      z-index: 2;
      h1 {
        font-weight: 600;
        color: ${({ theme }) => theme.palette.text.primary};
        max-width: 586px;
        margin-bottom: 40px;
        @media (max-width: 1199px) {
          font-size: 40px;
          margin-bottom: 30px;
        }
        @media (max-width: 899px) {
          font-size: 32px;
          margin-bottom: 22px;
        }
        @media (max-width: 599px) {
          font-size: 24px;
        }
        span {
          all: inherit;
          display: inline;
          color: ${({ theme }) => theme.palette.primary.dark};
        }
      }
      .cmnBolTitle {
        position: relative;
        font-weight: 600;
        font-size: 20px;
        color: ${({ theme }) => theme.palette.text.primary};
        margin-bottom: 24px;
        @media (max-width: 1199px) {
          font-size: 18px;
          margin-bottom: 20px;
        }
        @media (max-width: 599px) {
          font-size: 16px;
          margin-bottom: 6px;
        }
      }
      .wrapper_innerPaymenTBox {
        position: relative;
        background: ${({ theme }) => theme.palette.common.white};
        box-shadow:
          0px 250px 100px rgba(148, 156, 194, 0.01),
          0px 141px 84px rgba(148, 156, 194, 0.05),
          0px 62px 62px rgba(148, 156, 194, 0.09),
          0px 16px 34px rgba(148, 156, 194, 0.1);
        border-radius: 10px;
        padding: 26px 34px 36px;
        @media (max-width: 1199px) {
          padding: 20px 16px;
        }
        @media (max-width: 599px) {
          padding: 16px 14px;
        }
        .MuiRadioGroup-root {
          flex-direction: row;
          gap: 12px;
          .MuiFormControlLabel-root {
            width: calc(100% / 2 - 12px);
            margin: 0;
            position: relative;
            padding: 16px 18px;
            .MuiRadio-root {
              position: relative;
              background: ${({ theme }) => theme.palette.customColors?.primary800};
              border: 1px solid ${({ theme }) => theme.palette.customColors?.primary800};
              border-radius: 10px;
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
              height: 100%;
              &.Mui-checked {
                border: 1px solid ${({ theme }) => theme.palette.customColors?.lightPurple};
              }
              svg {
                display: none;
              }
            }
            span {
              position: relative;
              z-index: 2;
              display: flex;
              align-items: flex-start;
              flex-direction: column;
              font-size: 18px;
              gap: 3px;
              font-weight: 600;
              color: ${({ theme }) => theme.palette.customColors?.darkTextColor};
            }
          }
        }
        .formWrapper_allInfo {
          position: relative;
          margin: 28px 0 20px;
          @media (max-width: 1199px) {
            margin: 20px 0;
          }
          @media (max-width: 599px) {
            margin: 16px 0;
          }
          label {
            font-weight: 600;
            font-size: 16px;
            color: ${({ theme }) => theme.palette.text.primary};
            margin-bottom: 8px;
          }
          .cvvInput {
            .MuiInputAdornment-root {
              display: none;
            }
          }
        }
        .checkBox {
          margin: 0;
          .MuiCheckbox-root {
            padding: 0;
            margin-right: 12px;
            @media (max-width: 599px) {
              margin-right: 4px;
              line-height: 0;
              margin-top: 2px;
            }
          }
          span {
            font-weight: 400;
            font-size: 16px;
            color: ${({ theme }) => theme.palette.text.primary};
            @media (max-width: 599px) {
              font-size: 14px;
            }
          }
        }
      }
      .billingMethods {
        position: relative;
        margin-top: 39px;
        @media (max-width: 599px) {
          margin-top: 24px;
        }
        .cmnBolTitle {
          margin-bottom: 8px;
        }
        .smallTxt {
          color: ${({ theme }) => theme.palette.customColors?.light};
        }
        .wrapper_innerPaymenTBox {
          margin-top: 24px;
          @media (max-width: 599px) {
            margin-top: 10px;
          }
        }
        .txtInfo {
          display: flex;
          align-items: center;
          gap: 10px;
          color: ${({ theme }) => theme.palette.customColors?.light};
          font-size: 14px;
          margin-top: 8px;
          @media (max-width: 599px) {
            gap: 4px;
          }
        }
      }
    }
    .planSummeryInfo {
      position: relative;
      background: ${({ theme }) => theme.palette.common.white};
      box-shadow:
        0px 250px 100px rgba(148, 156, 194, 0.01),
        0px 141px 84px rgba(148, 156, 194, 0.05),
        0px 62px 62px rgba(148, 156, 194, 0.09),
        0px 16px 34px rgba(148, 156, 194, 0.1);
      border-radius: 10px;
      padding: 12px 12px 40px;
      @media (max-width: 1199px) {
        padding: 12px 12px 24px;
      }
      h2 {
        padding: 20px 16px;
        background: linear-gradient(
          90deg,
          rgba(156, 199, 255, 0.3) 0%,
          rgba(190, 157, 244, 0.15) 100%
        );
        font-size: 24px;
        font-weight: 500;
        border-radius: 10px;
        margin-bottom: 24px;
        color: ${({ theme }) => theme.palette.text.primary};
        @media (max-width: 1199px) {
          padding: 16px 12px;
          margin-bottom: 16px;
          font-size: 20px;
        }
      }
      .wrapPlanInfo {
        position: relative;
        padding: 0 12px 28px;
        border-bottom: 1px solid ${({ theme }) => theme.palette.grey[200]};
        margin-bottom: 24px;
        @media (max-width: 1199px) {
          padding: 0 0 16px;
          margin-bottom: 16px;
        }
        &.noBorder {
          padding: 0 12px 0;
          margin: 0;
          border: 0;
        }
        ul {
          li {
            display: flex;
            align-items: center;
            &:not(:last-child) {
              margin-bottom: 10px;
            }
            p {
              width: 40%;
              color: ${({ theme }) => theme.palette.text.primary};
              font-weight: 400;
              font-size: 16px;
              @media (max-width: 599px) {
                font-size: 14px;
              }
            }
            span {
              color: ${({ theme }) => theme.palette.text.primary};
              font-weight: 600;
              font-size: 16px;
              text-align: left;
              display: block;
              width: 50%;
              @media (max-width: 599px) {
                font-size: 14px;
              }
            }
          }
        }
      }
      .titleTxtBld {
        font-weight: 500;
        font-size: 18px;
        color: ${({ theme }) => theme.palette.primary?.main};
        margin-bottom: 20px;
        @media (max-width: 599px) {
          font-size: 16px;
          margin-bottom: 8px;
        }
      }
    }
    .btnWrapper {
      position: relative;
      margin-top: 32px;
      @media (max-width: 599px) {
        margin-top: 20px;
      }
      button {
        background:
          radial-gradient(
            100% 100% at 50% 0%,
            rgba(255, 255, 255, 0.3) 0%,
            rgba(255, 255, 255, 0) 100%
          ),
          #8142e9;
        border: 0;
        color: ${({ theme }) => theme.palette.common.white};
        &:hover {
          background:
            radial-gradient(
              100% 60% at 50% 0%,
              rgba(255, 255, 255, 0.3) 0%,
              rgba(255, 255, 255, 0) 100%
            ),
            #8142e9;
        }
      }
    }
    .rightPartWrap {
      position: sticky;
      top: 85px;
    }
  }
`;
