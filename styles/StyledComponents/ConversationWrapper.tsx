import { inter } from '@/mui-theme/_muiTheme';
import { Stack, styled } from '@mui/material';

export const ConversationWrapper = styled(Stack)`
  .contentWrapper {
    border-radius: 10px;
    padding: 8px 10px;
    p {
      font-family: ${inter.style.fontFamily};
      font-weight: 400;
      font-size: 12px;
      line-height: 1.4;
    }
    &.receiver {
      color: ${({ theme }) => theme.palette.text.primary};
      background-color: ${({ theme }) => theme.palette.common.white};
      border: 1px solid #e5e5ff;
    }
    &.sender {
      background-color: #b588ff;
      color: ${({ theme }) => theme.palette.common.white};
    }
  }
`;

export const MessageInputWrapper = styled(Stack)`
  position: relative;
  .inputArea {
    border-radius: 10px;
    background-color: ${({ theme }) => theme.palette.common.white};
    border: 1px solid #ede1ff;
    resize: none;
    padding: 14px 50px 3px 40px;
    max-height: 200px;
    min-height: 50px;
    overflow: auto;
    font-family: ${inter.style.fontFamily};
    font-weight: 400;
    font-size: 12px;
    line-height: 1.4;

    @media (max-width: 899px) {
      font-size: 16px;
      min-height: 15px;
      padding: 8px 30px 2px 30px;
    }
  }
  textarea::placeholder {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 200px;
  }
  .attachmentBtn {
    position: absolute;
    bottom: 10px;
    left: 5px;
    padding: 5px;
    width: 30px;
    height: 30px;
    min-width: auto;
    z-index: 2;
    color: ${({ theme }) => theme.palette.primary.main};
    &:hover {
      color: ${({ theme }) => theme.palette.text.primary};
      background-color: transparent;
    }
    @media (max-width: 899px) {
      width: 25px;
      height: 25px;
      bottom: 8px;
    }
    .fileinput {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      cursor: pointer;
      opacity: 0;
      line-height: 0;
      font-size: 0;
    }
  }
  .sendBtn {
    color: ${({ theme }) => theme.palette.common.white};
    background-color: ${({ theme }) => theme.palette.primary.main};
    border-radius: 8px;
    padding: 5px;
    width: 30px;
    height: 30px;
    min-width: auto;
    position: absolute;
    bottom: 10px;
    right: 10px;
    z-index: 2;
    @media (max-width: 899px) {
      width: 25px;
      height: 25px;
      bottom: 8px;
    }
    &:hover {
      color: ${({ theme }) => theme.palette.common.white};
      background-color: ${({ theme }) => theme.palette.text.primary};
    }
  }
`;
