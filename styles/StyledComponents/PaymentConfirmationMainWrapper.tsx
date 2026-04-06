import { Box, styled } from '@mui/material';

export const PaymentConfirmationMainWrapper = styled(Box)`
  .paymentConfirmation_mainWrapper {
    position: relative;
    padding: 160px 0 110px;
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
    .wrapper_leftInfoBox {
      position: relative;
      background: ${({ theme }) => theme.palette.common.white};
      box-shadow:
        0px 250px 100px rgba(148, 156, 194, 0.01),
        0px 141px 84px rgba(148, 156, 194, 0.05),
        0px 62px 62px rgba(148, 156, 194, 0.09),
        0px 16px 34px rgba(148, 156, 194, 0.1);
      border-radius: 10px;
      padding: 22px 22px 36px;
      height: 100%;
      @media (max-width: 1199px) {
        padding: 16px;
      }
      @media (max-width: 599px) {
        padding: 14px;
      }
      h1 {
        padding: 20px;
        background: linear-gradient(
          90deg,
          rgba(244, 227, 255, 0.3) 0%,
          rgba(190, 157, 244, 0.15) 100%
        );
        font-size: 24px;
        font-weight: 600;
        border-radius: 10px;
        margin-bottom: 30px;
        color: ${({ theme }) => theme.palette.primary.main};
        @media (max-width: 1199px) {
          padding: 16px 12px;
          margin-bottom: 16px;
          font-size: 20px;
        }
      }
      .wrapper_innerAllinfo {
        position: relative;
        padding: 0 20px;
        @media (max-width: 1199px) {
          padding: 0 12px;
        }
        @media (max-width: 599px) {
          padding: 0;
        }
        p {
          font-size: 16px;
          color: ${({ theme }) => theme.palette.text.primary};
          line-height: 1.4;
          span {
            font-size: 16px;
            font-weight: 600;
            color: ${({ theme }) => theme.palette.text.primary};
          }
        }
        .boldTxtTitle {
          font-size: 20px;
          font-weight: 500;
          color: ${({ theme }) => theme.palette.text.primary};
          margin: 30px 0;
          @media (max-width: 1199px) {
            margin: 20px 0;
            font-size: 18px;
          }
        }
        .invoiceBtn {
          margin: 0 0 40px;
          a {
            display: inline-flex;
            align-items: center;
            gap: 18px;
            transition: all 0.3s ease-in-out;
            &:hover {
              opacity: 0.7;
              span {
                text-decoration: none;
              }
            }
            svg {
              line-height: 0;
            }
            span {
              font-size: 16px;
              text-decoration: underline;
              color: ${({ theme }) => theme.palette.primary.main};
              text-underline-offset: 2px;
              transition: all 0.3s ease-in-out;
            }
          }
        }
        .goDashboardBtn {
          background:
            radial-gradient(
              100% 100% at 50% 0%,
              rgba(255, 255, 255, 0.3) 0%,
              rgba(255, 255, 255, 0) 100%
            ),
            #8142e9;
          color: ${({ theme }) => theme.palette.common.white};
          border: 0;
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
      padding: 16px 16px 40px;
      height: 100%;
      @media (max-width: 1199px) {
        padding: 12px 12px 24px;
      }
      h2 {
        padding: 20px;
        background: linear-gradient(
          90deg,
          rgba(244, 227, 255, 0.3) 0%,
          rgba(190, 157, 244, 0.15) 100%
        );
        font-size: 20px;
        font-weight: 500;
        border-radius: 10px;
        margin-bottom: 24px;
        color: ${({ theme }) => theme.palette.primary.main};
        @media (max-width: 1199px) {
          padding: 16px 12px;
          margin-bottom: 16px;
          font-size: 18px;
        }
      }
      .wrapPlanInfo {
        position: relative;
        padding: 0 16px;
        @media (max-width: 1199px) {
          padding: 0 12px;
        }
        @media (max-width: 599px) {
          padding: 0;
        }
        ul {
          li {
            display: flex;
            align-items: center;
            &:not(:last-child) {
              margin-bottom: 20px;
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
              font-weight: 500;
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
  }
`;
