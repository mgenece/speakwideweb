import { Box, styled } from '@mui/material';

export const DisputDetailsWrapper = styled(Box)`
  .wrapper_disputDtlsMain {
    position: relative;
    .wrapper_topTitleWrap {
      display: flex;
      align-items: center;
      gap: 17px;
      margin-bottom: 24px;
      button {
        width: 28px;
        height: 28px;
        min-width: inherit;
        display: flex;
        align-items: center;
        justify-content: center;
        background: ${({ theme }) => theme.palette.primary.main};
        border-radius: 8px;
        transition: all 0.3s ease-in-out;
        &:hover {
          opacity: 0.7;
        }
      }
      h1 {
        font-size: 24px;
        font-weight: 600;
        color: ${({ theme }) => theme.palette.text.primary};
        margin-bottom: 0;
        @media (max-width: 599px) {
          font-size: 20px;
        }
      }
    }
    .mainDetailsWrapper {
      position: relative;
      background: ${({ theme }) => theme.palette.common.white};
      box-shadow:
        0px 546px 218px rgba(223, 225, 251, 0.01),
        0px 307px 184px rgba(223, 225, 251, 0.05),
        0px 136px 136px rgba(223, 225, 251, 0.09),
        0px 34px 75px rgba(223, 225, 251, 0.1);
      border-radius: 10px;
      padding: 15px 15px 20px;
      &.iterPreterDetailsWrap {
        padding: 0;
        border-radius: 20px;
        .cmnBoxInner {
          border: 0;
          border-radius: 20px;
          .topTitleTxt {
            border-radius: 0;
          }
          ul {
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            justify-content: space-between;
            gap: 10px;
            li {
              width: auto;
              min-width: 18%;
              @media (max-width: 479px) {
                width: 100%;
              }
              &.fullWidth {
                width: 100%;
              }
              .boldTxt {
                color: ${({ theme }) => theme.palette.text.primary} !important;
              }
              .descripTion {
                font-size: 14px;
                font-weight: 400;
                color: ${({ theme }) => theme.palette.customColors?.darkTextColor};
              }
            }
          }
        }
        .statusBox {
          margin: 36px 0;
          .MuiChip-root {
            height: 50px;
            border: 1px solid ${({ theme }) => theme.palette.customColors?.colore8e8e8};
            border-radius: 50px;
            min-height: inherit;
            padding: 6px 16px 6px 6px;
            background: transparent;
            display: flex;
            align-items: center;
            justify-content: flex-start;
            gap: 6px;
            max-width: 703px;
            span {
              padding: 0;
              font-size: 14px;
              font-weight: 400;
              color: ${({ theme }) => theme.palette.customColors?.light};
            }
          }
        }
        .wrapper_btmBtnWrapperAll {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 10px;
          flex-wrap: wrap;
          button {
            min-width: 150px;
            @media (max-width: 479px) {
              min-width: 100%;
            }
          }
        }
      }
      .cmnBoxInner {
        border: 1px solid ${({ theme }) => theme.palette.customColors?.colore8e8e8};
        border-radius: 15px;
        overflow: hidden;
        height: 100%;
        .topTitleTxt {
          border-radius: 10px;
          background: ${({ theme }) => theme.palette.customColors?.primary200};
          padding: 22px 25px;
          font-weight: 500;
          font-size: 18px;
          color: ${({ theme }) => theme.palette.primary.main};
          @media (max-width: 1199px) {
            padding: 16px;
          }
        }
        .wrapper_innerListAll {
          position: relative;
          padding: 20px 24px;
          @media (max-width: 1199px) {
            padding: 16px 14px;
          }
          ul {
            li {
              display: block;
              &:not(:last-child) {
                margin-bottom: 24px;
                @media (max-width: 479px) {
                  margin-bottom: 16px;
                }
              }
              .lightTxt {
                font-weight: 500;
                font-size: 14px;
                color: ${({ theme }) => theme.palette.customColors?.placeText};
                margin-bottom: 10px;
              }
              .boldTxt {
                font-weight: 500;
                font-size: 16px;
                color: ${({ theme }) => theme.palette.customColors?.light};
              }
              .MuiChip-root {
                height: 31px;
                border: 1px solid ${({ theme }) => theme.palette.customColors?.colore8e8e8};
                border-radius: 50px;
                min-height: inherit;
                padding: 6px 16px 6px 6px;
                background: transparent;
                display: inline-flex;
                align-items: center;
                gap: 6px;
                span {
                  padding: 0;
                  font-size: 14px;
                  font-weight: 400;
                  color: ${({ theme }) => theme.palette.customColors?.light};
                }
              }
              .btnWrap {
                display: flex;
                align-items: center;
                gap: 5px;
                flex-wrap: wrap;
                button {
                  height: 35px;
                  border: 1px solid ${({ theme }) => theme.palette.customColors?.colore8e8e8};
                  border-radius: 50px;
                  min-height: inherit;
                  padding: 10px 16px;
                  background: transparent;
                  display: inline-flex;
                  align-items: center;
                  gap: 9px;
                  font-size: 14px;
                  font-weight: 400;
                  color: ${({ theme }) => theme.palette.customColors?.light};
                  min-width: inherit;
                  &:hover {
                    opacity: 0.7;
                  }
                  &.txtBtn {
                    width: 36px;
                    height: 36px;
                    border-radius: 50%;
                    padding: 6px;
                  }
                }
              }
            }
          }
        }
        .allListItem {
          position: relative;
          margin-bottom: 45px;
          .singleListItems {
            display: flex;
            &:not(:last-child) {
              margin-bottom: 20px;
            }
            figure {
              margin: 0;
              width: 40px;
              line-height: 0;
              img {
                width: 40px;
                height: 40px;
                object-fit: cover;
                border-radius: 50%;
              }
            }
            .rightTxtWrap {
              width: calc(100% - 40px);
              padding-left: 19px;
              @media (max-width: 1199px) {
                padding-left: 10px;
              }
              .topTitle {
                font-size: 16px;
                font-weight: 600;
                color: ${({ theme }) => theme.palette.text.primary};
                margin-bottom: 10px;
              }
              .boxInfoWrap {
                border: 1px solid ${({ theme }) => theme.palette.customColors?.colore8e8e8};
                border-radius: 10px;
                padding: 14px 17px;
                @media (max-width: 1199px) {
                  padding: 10px;
                }
                p {
                  font-size: 14px;
                  font-weight: 500;
                  color: ${({ theme }) => theme.palette.customColors.placeText};
                }
                .infoTxt {
                  font-weight: 400;
                  color: ${({ theme }) => theme.palette.customColors.light};
                  margin-top: 12px;
                }
              }
            }
          }
        }
        .statusBox {
          .MuiChip-root {
            height: 50px;
            border: 1px solid ${({ theme }) => theme.palette.customColors?.colore8e8e8};
            border-radius: 50px;
            min-height: inherit;
            padding: 6px 16px 6px 6px;
            background: transparent;
            display: flex;
            align-items: center;
            justify-content: flex-start;
            gap: 6px;
            span {
              padding: 0;
              font-size: 14px;
              font-weight: 400;
              color: ${({ theme }) => theme.palette.customColors?.light};
            }
          }
        }
      }
    }
  }
`;
