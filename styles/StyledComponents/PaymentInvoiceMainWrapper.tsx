import { Box, styled } from '@mui/material';

export const PaymentInvoiceMainWrapper = styled(Box)`
  .wrapper_mainInfoInvoice {
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
      margin-bottom: 24px;
      z-index: 2;

      @media (max-width: 1199px) {
        margin-bottom: 20px;
      }
      @media (max-width: 599px) {
        margin-bottom: 16px;
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
    .detailsInfoice {
      position: relative;
      margin-bottom: 15px;
      p {
        background: linear-gradient(
          90deg,
          rgba(191, 149, 255, 0.58) 0%,
          rgba(94, 31, 200, 0.58) 100%
        );
        display: inline-flex;
        align-items: center;
        border-radius: 10px;
        padding: 13px 34px;
        font-size: 20px;
        font-weight: 500;
        line-height: 1;
        color: ${({ theme }) => theme.palette.common.white};
        @media (max-width: 899px) {
          font-size: 16px;
        }
      }
    }
    .invoice_wrapperTopTitle {
      position: relative;
      z-index: 2;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid ${({ theme }) => theme.palette.customColors?.lightBorderColor};
      padding-bottom: 24px;
      margin-bottom: 30px;
      @media (max-width: 899px) {
        flex-wrap: wrap;
        margin-bottom: 20px;
        padding-bottom: 16px;
      }
      .wrapper_leftInfo {
        h1 {
          font-size: 42px;
          font-weight: 600;
          color: ${({ theme }) => theme.palette.text.primary};

          @media (max-width: 1199px) {
            font-size: 36px;
          }
          @media (max-width: 899px) {
            font-size: 30px;
          }
          @media (max-width: 599px) {
            font-size: 24px;
          }
        }
        .MuiChip-root {
          background: ${({ theme }) => theme.palette.warning.main};
          padding: 12px 24px;
          height: 37px;
          border-radius: 50px;
          span {
            padding: 0;
            font-size: 18px;
            font-weight: 500;
            color: ${({ theme }) => theme.palette.customColors?.darkTextColor};

            @media (max-width: 599px) {
              font-size: 14px;
            }
          }
        }
        .priceTxt {
          color: ${({ theme }) => theme.palette.text.primary};
          font-size: 16px;
          font-weight: 400;
          display: flex;
          align-items: center;
          margin-top: 6px;
          span {
            color: ${({ theme }) => theme.palette.primary.main};
            font-size: 20px;
            font-weight: 600;
          }
        }
      }
      .downLoadBtn {
        min-width: 238px;
        height: 50px;
        background:
          radial-gradient(
            100% 100% at 50% 0%,
            rgba(255, 255, 255, 0.3) 0%,
            rgba(255, 255, 255, 0) 100%
          ),
          #8142e9;
        color: ${({ theme }) => theme.palette.common.white};
        border: 0;
        @media (max-width: 899px) {
          width: 100%;
          margin-top: 16px;
        }
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
    .wrapper_leftBoxInvoice {
      position: relative;
      background: ${({ theme }) => theme.palette.common.white};
      box-shadow:
        0px 250px 100px rgba(148, 156, 194, 0.01),
        0px 141px 84px rgba(148, 156, 194, 0.05),
        0px 62px 62px rgba(148, 156, 194, 0.09),
        0px 16px 34px rgba(148, 156, 194, 0.1);
      border-radius: 10px;
      padding: 26px 30px;
      height: 100%;
      @media (max-width: 1199px) {
        padding: 20px 24px;
      }
      @media (max-width: 599px) {
        padding: 16px;
      }
      h2 {
        font-size: 18px;
        font-weight: 500;
        color: ${({ theme }) => theme.palette.text.primary};
        border-bottom: 1px solid ${({ theme }) => theme.palette.grey[200]};
        padding: 0 7px 16px;
        margin-bottom: 24px;
      }
      .innerMiddleInfo {
        position: relative;
        padding: 0 7px;
        display: flex;
        justify-content: space-between;

        @media (max-width: 1199px) {
          flex-wrap: wrap;
        }
        ul {
          min-width: 45%;
          @media (max-width: 1199px) {
            width: 100%;
            &:not(:last-child) {
              margin-bottom: 12px;
            }
          }
          li {
            display: flex;
            align-items: center;
            &:not(:last-child) {
              margin-bottom: 10px;
            }
            p {
              width: 50%;
              color: ${({ theme }) => theme.palette.text.primary};
              font-weight: 400;
              font-size: 18px;
              @media (max-width: 599px) {
                font-size: 14px;
              }
            }
            span {
              color: ${({ theme }) => theme.palette.text.primary};
              font-weight: 500;
              font-size: 18px;
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
      .termsConditionTxt {
        border-top: 1px solid ${({ theme }) => theme.palette.grey[200]};
        padding: 16px 7px 0;
        margin-top: 20px;
        p {
          font-size: 16px;
          color: ${({ theme }) => theme.palette.customColors?.light};
        }
        .titleTxt {
          font-size: 18px;
          font-weight: 500;
          color: ${({ theme }) => theme.palette.text.primary};
          margin-bottom: 6px;
        }
      }
    }
    .wrapper_rightLog {
      position: relative;
      background: ${({ theme }) => theme.palette.common.white};
      box-shadow:
        0px 250px 100px rgba(148, 156, 194, 0.01),
        0px 141px 84px rgba(148, 156, 194, 0.05),
        0px 62px 62px rgba(148, 156, 194, 0.09),
        0px 16px 34px rgba(148, 156, 194, 0.1);
      border-radius: 10px;
      padding: 24px 14px;
      height: 100%;
      @media (max-width: 1199px) {
        padding: 20px 14px;
      }
      @media (max-width: 599px) {
        padding: 16px;
      }
      .titleTxtTop {
        font-size: 18px;
        font-weight: 500;
        color: ${({ theme }) => theme.palette.text.primary};
        border-bottom: 1px solid ${({ theme }) => theme.palette.grey[200]};
        padding: 0 7px 16px;
        margin-bottom: 24px;
      }
      .innerWrapper_progress {
        position: relative;
        padding: 0 7px;
        ul {
          position: relative;
          &::before {
            position: absolute;
            content: '';
            left: 30px;
            top: 0;
            background: ${({ theme }) => theme.palette.customColors?.colore8e8e8};
            height: calc(100% - 10px);
            width: 1px;
          }
          li {
            display: flex;
            align-items: center;
            padding: 8px;
            border-radius: 50px;
            background: ${({ theme }) => theme.palette.common.white};
            position: relative;
            z-index: 2;
            &.active {
              background: linear-gradient(90deg, #78b5a8 0%, #82a38a 100%);
              &::before {
                position: absolute;
                content: '';
                left: 30px;
                bottom: -8px;
                background: ${({ theme }) => theme.palette.common.white};
                height: 8px;
                width: 1px;
              }
              .wrapper_txtWrap {
                p {
                  color: ${({ theme }) => theme.palette.common.white};
                }
              }
              i {
                background: ${({ theme }) => theme.palette.customColors?.colorFFF9F3};
              }
            }
            &:not(:last-child) {
              margin-bottom: 36px;
              @media (max-width: 599px) {
                margin-bottom: 24px;
              }
            }
            i {
              display: flex;
              align-items: center;
              justify-content: center;
              line-height: 0;
              font-size: 0;
              width: 43px;
              height: 43px;
              border-radius: 50%;
              background: ${({ theme }) => theme.palette.customColors?.colorF7F7F7};
            }
            .wrapper_txtWrap {
              width: calc(100% - 43px);
              padding-left: 21px;
              @media (max-width: 599px) {
                padding-left: 12px;
              }
              p {
                font-size: 14px;
                color: ${({ theme }) => theme.palette.text.primary};
                line-height: 1.1;
                font-weight: 400;
                @media (max-width: 599px) {
                  font-size: 13px;
                }
              }
              .btdTxt {
                font-size: 16px;
                font-weight: 400;
                color: ${({ theme }) => theme.palette.text.primary};
                margin-bottom: 6px;
                @media (max-width: 599px) {
                  font-size: 14px;
                }
              }
            }
          }
        }
      }
    }
  }
`;
