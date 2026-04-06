import { manrope } from '@/mui-theme/_muiTheme';
import { Box, styled } from '@mui/material';

export const RequestSessionWrapper = styled(Box)`
  margin-top: 56px;
  @media (max-width: 599px) {
    margin-top: 25px;
  }
  .requestSessionTopBox {
    max-width: 265px;
    margin: 0 auto;
    text-align: center;
    .requestSessionTitle {
      font-size: 42px;
      font-weight: 700;
      font-family: ${manrope.style.fontFamily};
      @media (max-width: 899px) {
        font-size: 28px;
      }
      span {
        color: ${({ theme }) => theme.palette.primary.dark};
      }
    }
    p {
      margin-top: 5px;
      font-size: 16px;
    }
  }
  .languageListItem {
    background: ${({ theme }) => theme.palette.common.white};
    box-shadow:
      61px 355px 144px rgba(95, 78, 126, 0.01),
      34px 200px 122px rgba(95, 78, 126, 0.05),
      15px 89px 90px rgba(95, 78, 126, 0.09),
      4px 22px 50px rgba(95, 78, 126, 0.1);
    border-radius: 10px;
    max-width: 1141px;
    width: 100%;
    margin: 0 auto;
    margin-top: 52px;
    padding: 33px 23px;
    @media (max-width: 899px) {
      margin-top: 30px;
      padding: 25px;
    }
    @media (max-width: 599px) {
      margin-top: 20px;
      padding: 15px;
    }
    .languageListTitle {
      font-size: 16px;
      font-weight: 600;
      @media (max-width: 599px) {
        font-size: 14px;
      }
    }
  }
  .mainActocomepetBox {
    margin-top: 10px;
  }
  .btnStackWrap {
    margin-top: 60px;
    @media (max-width: 599px) {
      margin-top: 40px;
    }
    .requestSessionBtn {
      width: 471px;
      background:
        radial-gradient(
          100% 100% at 50% 0%,
          rgba(255, 255, 255, 0.3) 0%,
          rgba(255, 255, 255, 0) 100%
        ),
        #8142e9;
      box-shadow:
        0px 31px 12px rgba(103, 104, 152, 0.01),
        0px 17px 10px rgba(103, 104, 152, 0.05),
        0px 8px 8px rgba(103, 104, 152, 0.09),
        0px 2px 4px rgba(103, 104, 152, 0.1);
      border-radius: 10px;
      border: none;
      border: 1px solid rgba(130, 66, 233, 0.522);
      height: 50px;
      @media (max-width: 599px) {
        height: 40px;
      }
      &:hover {
        background: transparent;
      }
    }
  }
`;
