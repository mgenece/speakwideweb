import { Box, styled } from '@mui/material';

export const CommonUploadWrap = styled(Box)`
  width: 100%;
  background: ${({ theme }) => theme.palette.customColors.colorfcfbff};
  border: 1px dashed ${({ theme }) => theme.palette.customColors.colore9dbff};
  border-radius: 10px;
  padding: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: relative;
  input {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: pointer;
    appearance: none;
    -webkit-appearance: none;
    z-index: 2;
  }
  i {
    width: 42px;
    height: 42px;
    border-radius: 50%;
    background: ${({ theme }) => theme.palette.customColors.colore9dbff};
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 10px;
  }
  .uploadText {
    font-size: 13px;
    font-weight: 500;
    color: ${({ theme }) => theme.palette.primary.main};
    text-decoration: underline;
  }
  .uploadSubText {
    margin-top: 5px;
    font-size: 11px;
    font-weight: 400;
    color: ${({ theme }) => theme.palette.customColors.placeText};
  }
`;
