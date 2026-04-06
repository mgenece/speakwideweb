import { Box, styled } from '@mui/material';

export const ChatHistoryMainStyled = styled(Box)`
  box-shadow: 0px 34px 75px 0px #dfe1fb1a;
  box-shadow: 0px 136px 136px 0px #dfe1fb17;
  box-shadow: 0px 307px 184px 0px #dfe1fb0d;
  box-shadow: 0px 546px 218px 0px #dfe1fb03;
  box-shadow: 0px 853px 239px 0px #dfe1fb00;

  .bordered-box {
    position: relative;
    background: linear-gradient(133.06deg, #efe5ff 4.51%, rgba(243, 243, 243, 0.2) 55.88%);
    padding: 1px;
    border-radius: 10px;
    .inner-main-box {
      background: ${({ theme }) => theme.palette.common.white};
      border-radius: 10px;
      padding: 15px 10px 20px 14px;
      overflow: hidden;
      position: relative;
      @media (max-width: 1399px) {
        padding: 14px;
      }
      @media (max-width: 899px) {
        padding: 10px;
      }
      .chat-main-box {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        .left-box {
          max-width: 300px;
          width: 100%;
          @media (max-width: 1399px) {
            max-width: 220px;
          }
          @media (max-width: 1199px) {
            max-width: 300px;
          }
          @media (max-width: 899px) {
            max-width: 100%;
          }
          .search-field {
            .MuiInputBase-root {
              border: 1px solid ${({ theme }) => theme.palette.customColors.colorE7E7E7};
              background: ${({ theme }) => theme.palette.common.white};
              border-radius: 10px;
              @media (max-width: 899px) {
                min-height: 40px;
                padding: 8px 15px;
              }
              .MuiInputBase-input {
                font-size: 12px;

                &::placeholder {
                  color: ${({ theme }) => theme.palette.customColors?.color515151} !important;
                  opacity: 1;
                  -webkit-text-fill-color: ${({ theme }) =>
                    theme.palette.customColors?.color515151} !important;
                }

                &::-ms-input-placeholder {
                  color: ${({ theme }) => theme.palette.customColors?.color515151} !important;
                  opacity: 1;
                  -webkit-text-fill-color: ${({ theme }) =>
                    theme.palette.customColors?.color515151} !important;
                }
              }
            }
          }
          .main-item-stack {
            padding: 10px 0;
            height: calc(100svh - 306px);
            overflow-y: auto;
            @media (max-width: 899px) {
              height: calc(100svh - 207px);
            }
            @media (max-width: 599px) {
              height: calc(100svh - 215px);
            }
            .message-item-stack {
              padding: 12px 4px 12px 9px;
              border-radius: 5px;
              cursor: pointer;
              /* border: 0; */
              @media (max-width: 1399px) {
                padding: 8px;
              }
              .icon {
                svg {
                  path {
                    fill: ${({ theme }) => theme.palette.customColors?.color1C1B1F};
                  }
                }
                &.seen {
                  svg {
                    path {
                      fill: ${({ theme }) => theme.palette.customColors?.color7879F1};
                    }
                  }
                }
              }
              &.active-chat {
                background-color: ${({ theme }) => theme.palette.customColors?.msgActiveBg};
                .time {
                  color: ${({ theme }) => theme.palette.customColors?.dark};
                  font-weight: 400;
                }
              }
              &:hover {
                background-color: ${({ theme }) => theme.palette.customColors?.msgActiveBg};
              }
              .user-img-fig {
                width: 45px;
                height: 45px;
                border-radius: 50%;
                overflow: hidden;
                @media (max-width: 1399px) {
                  width: 30px;
                  height: 30px;
                }
                img {
                  width: 100%;
                  height: 100%;
                  object-fit: cover;
                }
              }
              .middle-cls {
                width: calc(100% - 75px);
                padding-left: 10px;
                @media (max-width: 1399px) {
                  width: calc(100% - 60px);
                }
              }
              .right-cls {
                max-width: 30px;
                width: 100%;
                text-align: right;
              }
              .user-name {
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
              }
              .user-message {
                font-size: 12px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
              }
              .time {
                font-size: 12px;
                padding-bottom: 2px;
                color: ${({ theme }) => theme.palette.customColors?.darkTextColor};
                font-weight: 500;
              }
              .unread-count {
                right: 14px;
                top: -5px;
              }
            }
          }
        }
        .middle-box {
          width: calc(100% - 300px);
          padding: 0 13px;
          padding-right: 0;
          transition: all 0.3s ease-in-out;
          @media (max-width: 1399px) {
            padding: 0 6px;
            padding-right: 0;
            width: calc(100% - 220px);
          }
          @media (max-width: 1199px) {
            width: calc(100% - 300px);
          }
          @media (max-width: 899px) {
            width: calc(100% - 240px);
            position: absolute;
            transform: translateX(600%);
          }
          &.open {
            transform: translateX(0);
            width: 100%;
            left: 0;
            padding: 0 10px;
            z-index: 1;
            /* @media (max-width: 599px) {
              width: calc(100% - 8px);
              left: 4px;
            } */
          }
          .middle-inner-box {
            background: ${({ theme }) => theme.palette.customColors.colorF8F8F8};
            border-radius: 10px;
            width: 100%;
            padding: 10px;
            .header-box-bordered {
              box-shadow: 0px 34px 75px 0px #dfe1fb1a;
              box-shadow: 0px 136px 136px 0px #dfe1fb17;
              box-shadow: 0px 307px 184px 0px #dfe1fb0d;
              box-shadow: 0px 546px 218px 0px #dfe1fb03;
              box-shadow: 0px 853px 239px 0px #dfe1fb00;
              position: relative;
              background: linear-gradient(
                133.06deg,
                #efe5ff 4.51%,
                rgba(243, 243, 243, 0.2) 55.88%
              );
              padding: 1px;
              border-radius: 10px;
              .header-box-inner {
                padding: 20px 8px 20px 17px;
                border-radius: 10px;
                background: ${({ theme }) => theme.palette.common.white};
                @media (max-width: 899px) {
                  padding: 10px 8px 10px 17px;
                }
                @media (max-width: 599px) {
                  padding: 15px;
                }
                .name-head {
                  font-size: 18px;
                  font-weight: 700;
                  line-height: 28px;
                  color: ${({ theme }) => theme.palette.text.primary};
                  @media (max-width: 1399px) {
                    font-size: 14px;
                  }
                }
                .menu-open-btn {
                  padding: 0;
                  transition: all 0.3s ease-in-out;
                  &:hover {
                    opacity: 0.75;
                  }
                }
                .back-btn {
                  padding: 0;
                  transition: all 0.3s ease-in-out;
                  svg {
                    width: 18px;
                    height: 18px;
                    color: ${({ theme }) => theme.palette.common.black};
                  }
                }
                .details-btn {
                  padding: 0;
                  transition: all 0.3s ease-in-out;
                  display: none;
                  &:hover {
                    opacity: 0.75;
                  }
                  @media (max-width: 1199px) {
                    display: inline-flex;
                    margin-top: 2px;
                  }
                }
              }
            }
            .msg-main-body {
              padding: 15px 17px;
              height: calc(100svh - 348px);
              overflow-y: auto;
              @media (max-width: 1399px) {
                padding: 10px;
              }
              @media (max-width: 899px) {
                height: calc(100svh - 235px);
              }
              @media (max-width: 599px) {
                height: calc(100svh - 254px);
              }
              .day-indicator-box {
                display: flex;
                justify-content: center;
                align-items: center;
                .day-indicator-chip {
                  padding: 4px 7px;
                  height: 27px;
                  background: ${({ theme }) => theme.palette.customColors.chipBg};
                  font-size: 14px;
                  font-weight: 500;
                  color: ${({ theme }) => theme.palette.customColors.color878787};
                }
              }
              .msg-stack {
                max-width: 420px;
                width: 100%;
                &.sender {
                  margin-left: auto;
                  .message-box {
                    .inner-box {
                      background: ${({ theme }) => theme.palette.primary.main};
                      border: none;
                      .msg-text {
                        color: ${({ theme }) => theme.palette.common.white};
                      }
                    }
                  }
                }
                .user-fig {
                  margin-top: 10px;
                  width: 30px;
                  height: 30px;
                  line-height: 0;
                  font-size: 0;
                  overflow: hidden;
                  border-radius: 50%;
                }
                .avatar-class {
                  width: 30px;
                  height: 30px;
                  background: ${({ theme }) => theme.palette.primary.main};
                  font-size: 18px;
                  font-weight: 400;
                  margin-top: 12px;
                }
                .message-box {
                  max-width: calc(100% - 58px);
                  width: 100%;
                  .inner-box {
                    border: 1px solid ${({ theme }) => theme.palette.customColors.chatBorder};
                    border-radius: 10px;
                    padding: 8px 12px;
                    .msg-text {
                      font-size: 12px;
                      color: ${({ theme }) => theme.palette.customColors.light};
                    }
                    .file-stack {
                      .file-name {
                        font-size: 12px;
                        font-weight: 500;
                        color: ${({ theme }) => theme.palette.grey['A700']};
                      }
                      .file-size {
                        font-size: 10px;
                        font-weight: 400;
                        color: ${({ theme }) => theme.palette.customColors.darkTextColor};
                      }
                    }
                  }
                  .time {
                    font-size: 10px;
                    color: ${({ theme }) => theme.palette.customColors.dark};
                  }
                  .read-icon {
                    line-height: 0;
                  }
                }
              }
            }
          }
        }
        .right-box {
          max-width: 294px;
          width: 100%;
          background: ${({ theme }) => theme.palette.customColors.primary800};
          border-radius: 10px;
          padding: 10px;
          height: calc(100svh - 257px);
          overflow-y: auto;
          transition: all 0.3s ease-in-out;
          @media (max-width: 1399px) {
            max-width: 240px;
          }
          @media (max-width: 1199px) {
            position: absolute;
            top: 25px;
            right: 20px;
            transform: translateX(300%);
            height: calc(100% - 40px);
            z-index: 2;
            max-width: 350px;
          }
          @media (max-width: 599px) {
            max-width: 100%;
            width: calc(100% - 20px);
            height: calc(100% - 20px);
            top: 10px;
            right: 10px;
          }
          &.open {
            transform: translateX(0);
          }
          .top-box {
            padding: 17px 0 20px;
            position: relative;
            .cross-info-btn {
              position: absolute;
              right: 0;
              top: -10px;
              top: -5px;
              display: none;
              @media (max-width: 1199px) {
                display: inline-flex;
              }
            }
            .header-box {
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              gap: 30px;
              padding-bottom: 20px;
              @media (max-width: 1399px) {
                gap: 10px;
              }
            }
            .user-fig {
              width: 78px;
              height: 78px;
              border-radius: 50%;
              overflow: hidden;
              line-height: 0;
              font-size: 0;
              img {
                width: 100%;
                height: 100%;
                object-fit: cover;
              }
            }
            .user-name {
              font-size: 18px;
              font-weight: 600;
              color: ${({ theme }) => theme.palette.text.primary};
            }
            .info-box {
              border-radius: 10px;
              background-color: ${({ theme }) => theme.palette.primary.light};
              padding: 12px 0 11px 12px;
              width: 100%;
              .icon {
                width: 26px;
                height: 26px;
                border-radius: 5px;
                display: flex;
                align-items: center;
                justify-content: center;
                background-color: ${({ theme }) => theme.palette.common.white};
              }
              .value {
                max-width: calc(100% - 36px);
              }
              .language {
                color: ${({ theme }) => theme.palette.text.primary};
                span {
                  color: ${({ theme }) => theme.palette.primary.main};
                }
              }
            }
          }
          .shared-box {
            padding: 10px 0;
            .common-box {
              .header-box {
                border-radius: 10px 10px 0 0;
                background-color: ${({ theme }) => theme.palette.customColors.colorEBDFFF};
                padding: 14px 23px;
                .title {
                  font-weight: 500;
                }
                .see-link {
                  font-size: 12px;
                  font-weight: 400;
                  color: ${({ theme }) => theme.palette.primary.main};
                  padding: 0;
                  min-height: auto;
                  min-width: auto;
                  &:hover {
                    text-decoration: underline;
                    background-color: transparent;
                  }
                }
              }
              .body-box {
                background-color: ${({ theme }) => theme.palette.primary.light};
                padding: 21px 11px;
                border-radius: 0 0 10px 10px;
                .file-stack {
                  .icon {
                    width: 37px;
                    height: 37px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background-color: ${({ theme }) => theme.palette.common.white};
                  }
                  .value {
                    width: calc(100% - 47px);
                  }
                }
                &.link-box {
                  .icon {
                    width: 44px;
                    height: 41px;
                    border-radius: 5px;
                  }
                  .right-part {
                    width: calc(100% - 54px);
                    .link {
                      font-size: 10px;
                      color: ${({ theme }) => theme.palette.customColors.dark};
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  .messageTopSc {
    .msgFgOutr {
      padding: 0;
      width: 45px;
      flex-basis: 45px;
      @media (max-width: 1399px) {
        width: 30px;
        flex-basis: 30px;
      }
      .msgFgInnr {
        width: 45px;
        height: 45px;
        border: 0;
        @media (max-width: 1399px) {
          width: 30px;
          height: 30px;
        }
      }
    }
    .msgRghtPrt {
      width: calc(100% - 45px);
      flex-basis: calc(100% - 45px);
      margin: 0;
      padding-left: 10px;
      .msgNms {
        font-size: 14px;
        line-height: 1.2;
        font-weight: 400;
        color: rgb(18, 2, 72);
      }
      .msgTxts {
        font-size: 12px;
      }
    }
  }
  .timingrt {
    margin-left: 5px;
    p {
      color: rgb(51, 51, 51);
      font-weight: 400;
      font-size: 12px;
      line-height: 1.2;
    }
  }
  .ownMessage {
    max-width: 420px;
    width: 100%;
    margin-left: auto;
  }
  .otehrMessage {
    max-width: 420px;
    .timignspn {
      margin-right: auto;
    }
  }
  .timignspn {
    font-size: 10px;
    line-height: 1.2;
    color: rgb(51, 51, 51);
    font-weight: 400;
  }
  .ownerMsgMn {
    color: #fff;
  }
  .systemMsgOhtrr {
    gap: inherit;
    padding: 12px 7px;
    .MuiAvatar-root {
      width: 30px;
      height: 30px;
      background: rgb(129, 66, 233);
      font-size: 18px;
      font-weight: 400;
    }
  }
  .systemMsgRghtr {
    gap: inherit;
  }
`;
