import { inter } from '@/mui-theme/_muiTheme';
import { Box, Stack, styled } from '@mui/material';

export const VideoCallWrapper = styled(Box)`
  padding: 12px;
  @media (max-width: 1199px) {
    padding: 8px;
  }
`;

export const VideoCallDurationWrapper = styled(Stack)`
  background-color: ${({ theme }) => theme.palette.primary.main};
  padding: 28px;
  border-radius: 10px;
  @media (max-width: 1199px) {
    padding: 10px 16px;
  }
  .recordBtn {
    padding: 6px 8px;
    border-radius: 60px;
    min-width: 141px;
    justify-content: space-between;
    font-family: ${inter.style.fontFamily};
    color: ${({ theme }) => theme.palette.text.primary};
    @media (max-width: 1199px) {
      padding: 4px 8px;
      min-width: auto;
    }
    .MuiButton-startIcon {
      color: ${({ theme }) => theme.palette.error.dark};
      margin: 0 10px 0 0;
      @media (max-width: 1199px) {
        margin-right: 5px;
        svg {
          height: 20px;
          width: 20px;
        }
      }
    }
  }
`;

export const VideoCallVideoChat = styled(Stack)`
  position: relative;
  @media (max-width: 899px) {
    overflow: hidden;
  }
`;

export const VideoCallScreen = styled(Box)`
  .videoCallWrapper {
    height: 100%;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    position: relative;
    transition: all 0.3s linear;

    &.fullScreen {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      z-index: 99;
      padding: 10px;
      @media (max-width: 1199px) {
        padding: 8px;
      }
      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: #00000026;
      }
      .mainScreenWrapper {
        max-height: 100% !important;
      }
      .videoCallActionBtn {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        padding: 30px 10px;
        z-index: 5;
        @media (max-width: 899px) {
          padding: 20px 10px;
        }
      }
    }
    .mainScreenWrapper {
      position: relative;
      height: 100%;
      width: 100%;
      background-color: ${({ theme }) => theme.palette.common.white};

      img,
      video {
        width: 100%;
        height: 100%;
      }
    }
    .smallVideoconversationBox {
      z-index: 99;
      position: absolute;
      padding: 15px;
      top: 0;
      right: 0;
      width: 26%;
      @media (max-width: 1199px) {
        padding: 10px;
        width: 30%;
      }
      @media (max-width: 899px) {
        width: 35%;
      }
      @media (max-width: 599px) {
        width: 42%;
      }
      .smallScreenVideo {
        border: 2px solid ${({ theme }) => theme.palette.customColors.colorDCDCDC};
        border-radius: 10px;
        overflow: hidden;
        background-color: ${({ theme }) => theme.palette.customColors.colorDCDCDC};
        line-height: 0;
        width: 100%;
        height: 100%;
        cursor: grab;
        img,
        video {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }
      }
    }
    .fullScreenBtn {
      top: 16px;
      right: 16px;
      border-radius: 50%;
      background-color: ${({ theme }) => theme.palette.common.white};
      box-shadow: 0px 4px 20px 0px #00000040;
      position: absolute;
      height: 54px;
      width: 54px;
      flex-shrink: 0;
      padding: 5px;
      min-width: auto;
      min-height: auto;
      z-index: 5;
      color: ${({ theme }) => theme.palette.text.primary};
      @media (max-width: 1199px) {
        height: 40px;
        width: 40px;
        top: 10px;
        right: 10px;
      }
      @media (max-width: 899px) {
        height: 30px;
        width: 30px;
        padding: 9px;
      }
    }
  }
  .videoCallActionBtn {
    padding: 55px 0 25px;
    @media (max-width: 1199px) {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      padding: 10px;
    }
    .actionBtnMenue {
      .MuiIconButton-root {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        overflow: hidden;
        color: ${({ theme }) => theme.palette.text.primary};
        background-color: ${({ theme }) => theme.palette.customColors.primary200};
        transition: all 0.3s ease-in-out;
        &:hover,
        &:active {
          background-color: ${({ theme }) => theme.palette.primary.main};
          color: ${({ theme }) => theme.palette.common.white};
        }
        @media (max-width: 1199px) {
          width: 30px;
          height: 30px;
        }
      }
    }
    .endBtn {
      text-transform: none;
      border-radius: 10px;
      font-family: ${inter.style.fontFamily};
      font-weight: 500;
      font-size: 16px;
      line-height: 1.3;
      @media (max-width: 1199px) {
        min-width: auto;
        width: 30px;
        height: 30px;
        flex-shrink: 0;
        min-height: auto;
        border-radius: 50%;
      }
      span {
        color: inherit;
        font-size: inherit;
        font-weight: inherit;
        line-height: inherit;
        &.endCallIcon {
          line-height: 0;
        }
      }
    }
  }
`;

export const ChatSection = styled(Stack)`
  padding: 12px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.palette.customColors.primary800};

  @media (max-width: 899px) {
    position: absolute;
    right: 0;
    top: 0;
    z-index: 99;
    transform: translateX(100%);
    transition: transform 0.3s linear;
    &.active {
      transform: translateX(0%);
    }
  }

  .cmn_chatContainer {
    .chatcontentSectionBody {
      background-color: ${({ theme }) => theme.palette.primary.light};
      border-radius: 0 0 10px 10px;
      overflow: auto;
      .innerBox {
        padding: 20px 22px;
        @media (max-width: 1199px) {
          padding: 10px 15px;
        }
      }

      .soundIconBtn {
        border-radius: 50%;
        background-color: ${({ theme }) => theme.palette.common.white};
        color: ${({ theme }) => theme.palette.primary.main};
        height: 31px;
        width: 31px;
        min-width: auto;
        flex-shrink: 0;
        min-height: auto;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }
  .chatsectionWrapper {
    padding-top: 10px;
  }
`;
