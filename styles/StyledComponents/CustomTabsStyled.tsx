import { Box, styled } from '@mui/material';

export const CustomTabsWrapper = styled(Box)`
  .tab-tabsroot {
    text-align: center;
  }
  .MuiTabs-root {
    min-height: auto;
    justify-content: center;
    display: inline-flex;
    padding: 3px;
    border-radius: 10px;
    background: ${({ theme }) => theme.palette.primary.light};

    .MuiTabs-scroller {
      text-align: center;
      overflow: visible;
    }

    .MuiTabs-list {
      .MuiTab-root {
        min-height: auto;
        color: ${({ theme }) => theme.palette.customColors?.dark};
        font-size: 14px;
        font-weight: 400;
        text-transform: inherit;
        padding: 13px 25px;
        z-index: 11;
        min-width: 190px;

        @media (max-width: 599px) {
          padding: 10px 22px;
          min-width: auto;
          flex: auto;
        }

        &.Mui-selected {
          color: ${({ theme }) => theme.palette.text.primary};
          font-weight: 500;
        }
      }
    }

    .MuiTabs-indicator {
      height: 100%;
      border-radius: 10px;
      box-shadow: 0px 1px 6px 0px #c9a8ff;
      background-color: ${({ theme }) => theme.palette.common.white};
    }
  }
`;
