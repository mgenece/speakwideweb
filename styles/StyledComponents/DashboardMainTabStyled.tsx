import { Box, Paper, styled } from '@mui/material';

export const DashboardMainTabWrapper = styled(Box)`
  .main-tabsroot {
    margin-bottom: 20px;

    .MuiTabs-root {
      min-height: auto;

      .MuiTabs-list {
        gap: 8px;
        @media (max-width: 599px) {
          gap: 3px;
        }

        .MuiTab-root {
          min-height: auto;
          border: 1px solid ${({ theme }) => theme.palette.customColors.tabrootBorder};
          border-radius: 100px;
          font-size: 16px;
          font-weight: 400;
          text-transform: capitalize;
          color: ${({ theme }) => theme.palette.customColors.light};
          padding: 9px 25px;
          min-width: 133px;
          z-index: 1;
          @media (max-width: 599px) {
            font-size: 14px;
            padding: 8px 10px;
            min-width: 100px;
          }

          &.Mui-selected {
            border: 1px solid ${({ theme }) => theme.palette.primary.main};
            color: ${({ theme }) => theme.palette.common.white};
            background-color: ${({ theme }) => theme.palette.primary.main};
          }
        }
      }

      .MuiTabs-indicator {
        display: none;
      }
    }
  }
`;

export const TabsWrapperPaper = styled(Paper)`
  border: 1px solid ${({ theme }) => theme.palette.customColors.tabTableBorder};
  border-radius: 10px;
  padding: 15px;
  box-shadow:
    0px 34px 75px 0px #dfe1fb1a,
    0px 136px 136px 0px #dfe1fb17,
    0px 307px 184px 0px #dfe1fb0d,
    0px 546px 218px 0px #dfe1fb03,
    0px 853px 239px 0px #dfe1fb00;

  .MuiTableContainer-root {
    .MuiTable-root {
      @media (max-width: 1299px) {
        white-space: nowrap;
      }
      .MuiTableHead-root {
        .MuiTableRow-root {
          .MuiTableCell-head {
            background-color: ${({ theme }) => theme.palette.customColors.primary200};
            font-weight: 500;
            font-size: 18px;
            color: ${({ theme }) => theme.palette.primary.main};
            border: none;
            padding: 18px 20px;
            position: relative;
            @media (max-width: 899px) {
              font-size: 14px;
              padding: 10px 20px;
            }

            &::after {
              content: '';
              position: absolute;
              width: 100%;
              height: 12px;
              background-color: ${({ theme }) => theme.palette.common.white};
              bottom: -12px;
              left: 0;
            }

            &:first-child {
              border-top-left-radius: 10px;
              border-bottom-left-radius: 10px;
            }

            &:last-child {
              border-top-right-radius: 10px;
              border-bottom-right-radius: 10px;
            }
          }
        }
      }

      .MuiTableBody-root {
        .MuiTableRow-root {
          .MuiTableCell-body {
            background-color: ${({ theme }) => theme.palette.customColors.primary800};
            padding: 18px 20px;
            border: none;
            @media (max-width: 899px) {
              font-size: 14px;
              padding: 10px 20px;
            }
          }

          &:not(:last-child) {
            .MuiTableCell-body {
              border-bottom: 1px solid ${({ theme }) => theme.palette.customColors.colore8e8e8};
            }
          }

          &:hover {
            .MuiTableCell-body {
              background-color: ${({ theme }) => theme.palette.customColors.primary700};
            }
          }

          .duration-list {
            padding-top: 5px;

            li {
              gap: 7px;

              i {
                line-height: 0;
              }

              &:not(:last-child) {
                margin-bottom: 8px;
              }
            }
          }

          .action-btn-group {
            gap: 5px;
          }
        }
      }
    }
  }
  .sessRefTd {
    min-width: 190px;
    @media (max-width: 899px) {
      min-width: 150px;
    }
  }
  .clntNmTd {
    min-width: 155px;
  }
  .clntTimeTd {
    min-width: 250px;
    @media (max-width: 899px) {
      min-width: 200px;
    }
  }
  .langSecTd {
    min-width: 170px;
  }
  .locationscTd {
    min-width: 130px;
  }
  .viewdtlsTd {
    min-width: 160px;
  }
`;

export const CustomMenuPaper = styled(Box)`
  ul {
    padding: 8px;

    li {
      gap: 10px;
      padding: 8px 10px 8px 0;

      &:hover {
        background-color: transparent;
      }

      i {
        width: 27px;
        height: 26px;
        border-radius: 5px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        background-color: ${({ theme }) => theme.palette.customColors.primary1000};

        &.i-schedule {
          background-color: ${({ theme }) => theme.palette.customColors.colorFFF4F4};
        }
      }

      span {
        font-size: 14px;
        font-weight: 500;
      }
    }
  }
`;

export const InterpreterDashboardMainWrapper = styled(Box)`
  .main-tabsroot {
    margin-bottom: 20px;
    background: ${({ theme }) => theme.palette.common.white};
    box-shadow:
      0px 552px 221px rgba(167, 151, 191, 0.01),
      0px 311px 186px rgba(167, 151, 191, 0.05),
      0px 138px 138px rgba(167, 151, 191, 0.09),
      0px 35px 76px rgba(167, 151, 191, 0.1);
    border-radius: 10px;
    padding: 10px 14px;
    margin-bottom: 11px;
    .MuiTabs-root {
      min-height: auto;

      .MuiTabs-list {
        gap: 8px;
        @media (max-width: 599px) {
          gap: 3px;
        }

        .MuiTab-root {
          min-height: auto;
          border: 1px solid ${({ theme }) => theme.palette.customColors.tabrootBorder};
          border-radius: 100px;
          font-size: 16px;
          font-weight: 400;
          text-transform: capitalize;
          color: ${({ theme }) => theme.palette.customColors.light};
          padding: 12px 25px;
          min-width: 133px;
          z-index: 1;
          @media (max-width: 599px) {
            font-size: 14px;
            padding: 8px 10px;
            min-width: 100px;
          }

          &.Mui-selected {
            border: 1px solid ${({ theme }) => theme.palette.primary.main};
            color: ${({ theme }) => theme.palette.common.white};
            background-color: ${({ theme }) => theme.palette.primary.main};
          }
        }
      }

      .MuiTabs-indicator {
        display: none;
      }
    }
  }
  .wrapper_topTitleBtn {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 16px;
    margin-bottom: 20px;

    h1 {
      font-size: 24px;
      font-weight: 600;
      color: ${({ theme }) => theme.palette.text.primary};
      @media (max-width: 599px) {
        font-size: 16px;
      }
    }
    button {
      background:
        radial-gradient(
          100% 100% at 50% 0%,
          rgba(255, 255, 255, 0.3) 0%,
          rgba(255, 255, 255, 0) 100%
        ),
        #8142e9;
      border-radius: 10px;
      &:hover {
        background: ${({ theme }) => theme.palette.common.white};
      }
      @media (max-width: 599px) {
        font-size: 14px;
      }
    }
  }
  .MuiPagination-ul {
    justify-content: flex-start;
    .MuiPaginationItem-root {
      background: ${({ theme }) => theme.palette.common.white};
      width: 32px;
      height: 32px;
      border-radius: 8px;
      font-size: 13px;
      font-weight: 600;
      border: 0;
      &.MuiPaginationItem-previousNext {
        width: 38px;
        color: ${({ theme }) => theme.palette.primary.main};
        font-weight: 600;
        &.Mui-disabled {
          color: ${({ theme }) => theme.palette.text.primary};
          opacity: 1;
        }
      }
    }
  }
`;

export const InterpreterTabsWrapperPaper = styled(Paper)`
  border: 1px solid ${({ theme }) => theme.palette.customColors.tabTableBorder};
  border-radius: 10px;
  padding: 15px;
  box-shadow:
    0px 34px 75px 0px #dfe1fb1a,
    0px 136px 136px 0px #dfe1fb17,
    0px 307px 184px 0px #dfe1fb0d,
    0px 546px 218px 0px #dfe1fb03,
    0px 853px 239px 0px #dfe1fb00;

  .MuiTableContainer-root {
    .MuiTable-root {
      @media (max-width: 1299px) {
        white-space: nowrap;
      }
      .MuiTableHead-root {
        .MuiTableRow-root {
          .MuiTableCell-head {
            background-color: ${({ theme }) => theme.palette.customColors.primary200};
            font-weight: 500;
            font-size: 17px;
            color: ${({ theme }) => theme.palette.primary.main};
            border: none;
            padding: 18px 30px;
            position: relative;
            @media (max-width: 899px) {
              font-size: 14px;
              padding: 10px 16px;
            }

            &::after {
              content: '';
              position: absolute;
              width: 100%;
              height: 12px;
              background-color: ${({ theme }) => theme.palette.common.white};
              bottom: -12px;
              left: 0;
            }

            &:first-child {
              border-top-left-radius: 10px;
              border-bottom-left-radius: 10px;
            }

            &:last-child {
              border-top-right-radius: 10px;
              border-bottom-right-radius: 10px;
            }
          }
        }
      }

      .MuiTableBody-root {
        .MuiTableRow-root {
          .MuiTableCell-body {
            padding: 18px 30px;
            border: none;
            font-size: 16px;
            font-weight: 400;
            color: ${({ theme }) => theme.palette.customColors.light};
            @media (max-width: 899px) {
              font-size: 14px;
              padding: 10px 16px;
            }
          }

          .duration-list {
            padding-top: 5px;

            li {
              gap: 7px;

              i {
                line-height: 0;
              }

              &:not(:last-child) {
                margin-bottom: 8px;
              }
            }
          }
          a {
            color: ${({ theme }) => theme.palette.primary.main};
            font-size: 16px;
            font-weight: 500;
          }

          .action-btn-group {
            gap: 5px;
          }
        }
      }
    }
  }
  .textBtn {
    text-transform: capitalize;
    padding: 0;
    background: transparent;
    font-size: 17px;
    @media (max-width: 599px) {
      font-size: 14px;
    }
    &:hover {
      opacity: 0.7;
    }
  }
  .join-session-btn {
    color: ${({ theme }) => theme.palette.common.white};
    min-height: 50px;
    min-width: 150px;
    border-radius: 10px;
    text-transform: capitalize;
    transition: all 0.3s;
    font-size: 16px;
    font-weight: 600;
    &:hover {
      background: transparent;
      color: ${({ theme }) => theme.palette.primary.main};
      border: 1px solid ${({ theme }) => theme.palette.primary.main};
    }
  }
  &.session-tabs {
    .MuiTableBody-root {
      .MuiTableRow-root {
        .MuiTableCell-body {
          p {
            color: ${({ theme }) => theme.palette.customColors.light};
          }
        }
      }
    }
  }
`;
