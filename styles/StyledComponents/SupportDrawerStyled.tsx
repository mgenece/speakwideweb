import { Drawer, styled } from '@mui/material';

export const SupportDrawerStyled = styled(Drawer)`
  .MuiDrawer-paper {
    max-width: 648px;
    width: 100%;
    border-radius: 20px 0 0 20px;
    @media (max-width: 899px) {
      max-width: 100%;
      border-radius: 0;
    }
    .head-stack {
      background-color: ${({ theme }) => theme.palette.primary.main};
      padding: 22px 23px 23px 27px;
      @media (max-width: 899px) {
        padding: 10px;
      }
      .back-btn {
        color: ${({ theme }) => theme.palette.common.white};
        padding: 0;
        svg {
          width: 20px;
          height: 20px;
        }
      }
      .drawer-title {
        font-size: 18px;
        font-weight: 700;
        color: ${({ theme }) => theme.palette.common.white};
      }
      .filter-btn {
        min-height: auto;
        min-width: auto;
        padding: 0;
        svg {
          path {
            fill: ${({ theme }) => theme.palette.common.white};
          }
        }
      }
    }
    .msg-main-body {
      padding: 31px 37px 10px 38px;
      height: calc(100svh - 164px);
      overflow-y: auto;
      @media (max-width: 1399px) {
        padding: 10px;
      }
      @media (max-width: 899px) {
        height: calc(100svh - 110px);
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
              background: ${({ theme }) => theme.palette.customColors.chatBgLight};
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
                color: ${({ theme }) => theme.palette.text.primary};
              }
              .file-size {
                font-size: 10px;
                font-weight: 400;
                color: ${({ theme }) => theme.palette.text.primary};
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
    .msg-footer {
      padding: 0 37px 40px 38px;
      @media (max-width: 899px) {
        padding: 0 10px 10px;
      }
      .msg-stack {
        width: 100%;
        border: 1px solid ${({ theme }) => theme.palette.customColors.chatBorder};
        border-radius: 10px;
        .text-field {
          width: calc(100% - 100px);
          input {
            font-size: 12px;
            font-weight: 500;
            &::placeholder {
              opacity: 1;
              color: ${({ theme }) => theme.palette.customColors.placholderColor};
            }
          }
          fieldset {
            display: none;
          }
        }
        .attack-button {
          position: relative;
          cursor: pointer;
          input {
            opacity: 0;
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            cursor: pointer;
          }
        }
        .send-button {
          width: 40px;
          height: 40px;
          background: ${({ theme }) => theme.palette.primary.main};
          border-radius: 10px;
          margin-left: 10px;
        }
      }
    }
  }
`;
