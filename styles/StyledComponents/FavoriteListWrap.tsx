import { inter } from '@/mui-theme/_muiTheme';
import { Box, styled } from '@mui/material';

export const FavoriteListWrap = styled(Box)`
  .headStackFavorite {
    h2 {
      font-size: 24px;
      font-weight: 600;
      color: ${({ theme }) => theme.palette.text.primary};
    }
    .MuiInputBase-root {
      width: 414px;
      background: transparent;
      border: 1px solid ${({ theme }) => theme.palette.customColors.colordec9ff};
      border-radius: 10px;
      @media (max-width: 899px) {
        width: 100%;
      }
    }
  }
  .sortingStack {
    margin-top: 35px;
    @media (max-width: 1199px) {
      margin-top: 25px;
    }
    @media (max-width: 899px) {
      margin-top: 15px;
    }
    p {
      flex-shrink: 0;
      margin-right: 10px;
    }
    .MuiInputBase-root {
      min-width: 130px;
      background: ${({ theme }) => theme.palette.common.white};
      border: 1px solid rgb(251, 248, 255);
      box-shadow: 0px 4px 4px rgb(234, 228, 245);
      border-radius: 5px;
      width: fit-content;
      padding: 0;
      min-height: auto;

      .MuiSelect-select {
        padding: 10px 26px;
        font-size: 14px !important;
        font-weight: 500 !important;
        color: ${({ theme }) => theme.palette.text.primary} !important;
      }
      .MuiIconButton-root {
        right: 10px;
      }
      .intValue {
        font-size: 14px !important;
        font-weight: 500 !important;
        color: ${({ theme }) => theme.palette.text.primary} !important;
        font-family: ${inter.style.fontFamily};
      }
    }
  }
  .favoriteTableBox {
    margin-top: 30px;
    padding: 15px;
    border-radius: 20px;
    background: ${({ theme }) => theme.palette.common.white};
    box-shadow:
      0px 282px 113px rgba(219, 214, 240, 0.01),
      0px 159px 95px rgba(219, 214, 240, 0.05),
      0px 71px 71px rgba(219, 214, 240, 0.09),
      0px 18px 39px rgba(219, 214, 240, 0.1);
    @media (max-width: 1199px) {
      margin-top: 20px;
      padding: 10px;
    }
    @media (max-width: 899px) {
      margin-top: 15px;
      border-radius: 12px;
      padding: 6px;
    }
    table {
      min-width: 470px;
      tr {
        th {
          &:first-child {
            border-top-left-radius: 10px;
            border-bottom-left-radius: 10px;
            @media (max-width: 899px) {
              border-top-left-radius: 7px;
              border-bottom-left-radius: 7px;
            }
          }
          &:last-child {
            border-top-right-radius: 10px;
            border-bottom-right-radius: 10px;
            @media (max-width: 899px) {
              border-top-right-radius: 7px;
              border-bottom-right-radius: 7px;
            }
          }
          background: ${({ theme }) => theme.palette.customColors.primary200};
          border: 0;
          font-size: 17px;
          font-weight: 500;
          color: ${({ theme }) => theme.palette.primary.main};
          font-family: ${inter.style.fontFamily};
          padding: 15px 35px;
        }
        td {
          border: none;
          padding: 15px 35px;
          p {
            font-size: 16px;
            font-weight: 500;
            color: rgb(41, 45, 50);
            font-family: ${inter.style.fontFamily};
          }
          button {
            background: ${({ theme }) => theme.palette.common.white};
            border: 1px solid rgba(236, 249, 255, 0.8);
            box-shadow: 2px 5px 20px rgba(183, 200, 219, 0.25);
            border-radius: 50%;
            width: 32px;
            height: 32px;
            padding: 0;
            min-width: auto;
            &:hover {
              opacity: 0.5;
            }
          }
        }
      }
    }
  }
`;
