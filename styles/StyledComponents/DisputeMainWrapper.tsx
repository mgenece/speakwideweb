import { Box, styled } from '@mui/material';

export const DisputeMainWrapper = styled(Box)`
  .wrapper_disputeMain {
    position: relative;
    .topTitleWrap {
      position: relative;
      @media (max-width: 599px) {
        gap: 10px;
        flex-wrap: wrap;
      }
      h1 {
        font-weight: 600;
        font-size: 30px;
        color: ${({ theme }) => theme.palette.text.primary};
        margin-bottom: 6px;
      }
      p {
        color: ${({ theme }) => theme.palette.customColors.light};
      }
      button {
        padding: 10px 16px;
        height: 50px;
        width: 240px;
        background:
          radial-gradient(
            100% 100% at 50% 0%,
            rgba(255, 255, 255, 0.3) 0%,
            rgba(255, 255, 255, 0) 100%
          ),
          #8142e9;
        border-radius: 10px;
        color: ${({ theme }) => theme.palette.common.white};

        @media (max-width: 599px) {
          width: 100%;
        }
        &:hover {
          background:
            radial-gradient(
              100% 0% at 50% 0%,
              rgba(255, 255, 255, 0.3) 0%,
              rgba(255, 255, 255, 0) 100%
            ),
            #8142e9;
        }
      }
    }
    .allTabInfoList {
      position: relative;
      margin-top: 23px;
      .topTabInfo {
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
            gap: 10px;
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
              flex-direction: row;
              align-items: center;
              gap: 8px;
              @media (max-width: 899px) {
                font-size: 14px;
                padding: 8px 10px;
                min-width: 100px;
              }
              @media (max-width: 599px) {
                font-size: 12px;
                padding: 6px 10px;
                min-width: 100px;
              }

              &.Mui-selected {
                border: 1px solid ${({ theme }) => theme.palette.primary.main};
                color: ${({ theme }) => theme.palette.common.white};
                background-color: ${({ theme }) => theme.palette.primary.main};
                .noTxt {
                  background: ${({ theme }) => theme.palette.customColors.colorEBDFFF};
                  color: ${({ theme }) => theme.palette.text.primary};
                }
              }
              .noTxt {
                background: ${({ theme }) => theme.palette.primary.main};
                border: 1px solid ${({ theme }) => theme.palette.common.white};
                border-radius: 10px;
                font-size: 12px;
                font-weight: 500;
                color: ${({ theme }) => theme.palette.common.white};
                display: flex;
                align-items: center;
                padding: 4px 10px 3px;
                line-height: 1;
              }
            }
          }

          .MuiTabs-indicator {
            display: none;
          }
        }
      }
      .bottomTabInfo {
        background: ${({ theme }) => theme.palette.common.white};
        box-shadow:
          0px 552px 221px rgba(167, 151, 191, 0.01),
          0px 311px 186px rgba(167, 151, 191, 0.05),
          0px 138px 138px rgba(167, 151, 191, 0.09),
          0px 35px 76px rgba(167, 151, 191, 0.1);
        border-radius: 10px;
        padding: 12px 28px 24px;
        @media (max-width: 1399px) {
          padding: 12px 16px 20px;
        }
      }
    }
    .wrapper_topTitleTab {
      position: relative;
      margin-bottom: 16px;
      @media (max-width: 599px) {
        flex-wrap: wrap;
        gap: 10px;
      }
      .titleTxt {
        font-weight: 500;
      }
      .wrapper_SeacrhWrapSelect {
        display: flex;
        align-items: center;
        @media (max-width: 599px) {
          flex-wrap: wrap;
          gap: 10px;
          width: 100%;
        }
        .searchBar {
          margin-right: 7px;
          @media (max-width: 599px) {
            width: 100%;
            margin: 0;
          }
          .MuiInputBase-root {
            background: ${({ theme }) => theme.palette.common.white};
            border: 1px solid ${({ theme }) => theme.palette.customColors?.colore8e8e8};
            padding: 12px 15px;
            height: 38px;
            min-height: inherit;
            max-width: 245px;
            width: 100%;
            border-radius: 10px;
            @media (max-width: 599px) {
              max-width: 100%;
            }
            input {
              font-size: 12px;
            }
          }
        }
        .sortingWrap {
          position: relative;
          @media (max-width: 599px) {
            max-width: 100%;
            width: 100%;
          }
          .MuiInputBase-root {
            background: ${({ theme }) => theme.palette.common.white};
            border-radius: 10px;
            border: 1px solid ${({ theme }) => theme.palette.customColors?.colore8e8e8};
            text-transform: capitalize;
            gap: 6px;
            font-size: 12px;
            font-weight: 400;
            padding: 12px 13px;
            color: ${({ theme }) => theme.palette.customColors?.light};
            height: 38px;
            @media (max-width: 599px) {
              max-width: 100%;
              width: 100%;
            }
            fieldset {
              display: none;
            }
          }
          button {
            background: ${({ theme }) => theme.palette.common.white};
            border-radius: 10px;
            border: 1px solid ${({ theme }) => theme.palette.customColors?.colore8e8e8};
            text-transform: capitalize;
            gap: 6px;
            font-size: 12px;
            font-weight: 400;
            padding: 12px 13px;
            color: ${({ theme }) => theme.palette.customColors?.light};
            height: 38px;
            span {
              font-weight: 600;
              color: ${({ theme }) => theme.palette.text.primary};
            }
          }
        }
      }
    }
  }
  &.interpreter {
    .MuiTable-root {
      thead {
        tr {
          th {
            font-size: 17px;
            font-weight: 500;
          }
        }
      }
      tbody {
        tr {
          td {
            border: none;
            font-size: 16px;
            font-weight: 400;
            &:first-child {
              border: none;
            }
            &:last-child {
              border: none;
            }
          }
        }
      }
      .textActionBtn {
        font-size: 16px;
        font-weight: 400;
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
  }
`;

export const DisputeTableWraper = styled(Box)`
  .MuiTable-root {
    border: 0;
    border-spacing: 0 8px;
    border-collapse: separate;

    @media (max-width: 899px) {
      width: 900px;
    }
    thead {
      tr {
        th {
          background: ${({ theme }) => theme.palette.customColors?.colorEBDFFF};
          border: 0;
          font-size: 14px;
          font-weight: 500;
          color: ${({ theme }) => theme.palette.primary.main};
          padding: 16px 21px;
          position: relative;
          @media (max-width: 1399px) {
            padding: 16px;
          }
          button {
            padding: 0;
            min-width: inherit;
            position: absolute;
            left: 0;
            top: 50%;
            transform: translateY(-50%);
            transition: all 0.3s ease-in-out;
            &:hover {
              opacity: 0.5;
            }
          }
          &:first-child {
            border-radius: 10px 0 0 10px;
          }
          &:last-child {
            border-radius: 0 10px 10px 0;
          }
        }
      }
    }
    tbody {
      tr {
        &:hover {
          td {
            border-color: ${({ theme }) => theme.palette.customColors?.primary700} !important;
            background: ${({ theme }) => theme.palette.customColors?.primary700};
          }
        }
        td {
          background: ${({ theme }) => theme.palette.common.white};
          border: 0;
          border-top: 1px solid ${({ theme }) => theme.palette.customColors?.colore8e8e8};
          border-bottom: 1px solid ${({ theme }) => theme.palette.customColors?.colore8e8e8};
          font-size: 14px;
          font-weight: 500;
          color: ${({ theme }) => theme.palette.text.primary};
          padding: 16px 21px;
          cursor: pointer;
          @media (max-width: 1399px) {
            padding: 16px;
          }
          &:first-child {
            border-radius: 10px 0 0 10px;
            border-left: 1px solid ${({ theme }) => theme.palette.customColors?.colore8e8e8};
          }
          &:last-child {
            border-radius: 0 10px 10px 0;
            border-right: 1px solid ${({ theme }) => theme.palette.customColors?.colore8e8e8};
          }
        }
      }
    }
    .textActionBtn {
      text-transform: capitalize;
      background: transparent;
      padding: 0;
    }
    .MuiChip-root {
      padding: 9px 12px;
      border-radius: 50px;
      min-height: inherit;
      height: auto;
      &.pending {
        background: ${({ theme }) => theme.palette.warning.main};
        span {
          color: ${({ theme }) => theme.palette.common.white};
        }
      }
      &.resolved {
        background: ${({ theme }) => theme.palette.customColors.colorDFFBFF};
        span {
          color: ${({ theme }) => theme.palette.info.main};
        }
      }
      &.declined {
        background: ${({ theme }) => theme.palette.customColors.colorFFF0EF};
        span {
          color: ${({ theme }) => theme.palette.customColors.colorFF4C35};
        }
      }
      span {
        padding: 0;
        line-height: 1;
        font-size: 14px;
        font-weight: 400;
      }
    }
  }
  .tablePaginatoionWrap {
    position: relative;
    margin-top: 32px;
    @media (max-width: 599px) {
      margin-top: 20px;
      flex-wrap: wrap;
      justify-content: center;
      gap: 16px;
    }
    .sortBy {
      position: relative;
      display: flex;
      align-items: center;

      p {
        font-weight: 400;
        font-size: 16px;
        color: ${({ theme }) => theme.palette.customColors?.light};
        padding-right: 4px;
        flex-shrink: 0;
      }
      .MuiInputBase-root {
        height: 39px;
        border: 1px solid ${({ theme }) => theme.palette.customColors?.colore8e8e8};
        border-radius: 10px;
        padding: 10px 4px 10px 10px;
        min-height: inherit;
        background: ${({ theme }) => theme.palette.common.white};
        min-width: 63px;
        .MuiSelect-select {
          padding-right: 0;
        }
        .MuiSelect-icon {
          right: 10px;
        }
      }
    }
    .MuiPagination-root {
      li {
        margin: 0 2px;
        &:last-child {
          .MuiButtonBase-root {
            border: 1px solid ${({ theme }) => theme.palette.customColors?.colorE8DAFF};
            width: 62px;
            height: 39px;
          }
        }
      }
      .MuiButtonBase-root {
        width: 39px;
        height: 39px;
        background: transparent;
        border: 1px solid transparent;
        border-radius: 10px;
        color: ${({ theme }) => theme.palette.primary.main};
        font-size: 16px;
        font-weight: 600;
        margin: 0;

        @media (max-width: 599px) {
          width: 30px;
          height: 30px;
          font-size: 14px;
          border-radius: 8px;
        }
        &.Mui-selected,
        &:hover {
          background: ${({ theme }) => theme.palette.customColors?.colorF7F2FF};
          border: 1px solid ${({ theme }) => theme.palette.customColors?.colorE8DAFF};
        }
        &.Mui-disabled {
          display: none;
        }
      }
    }
  }
`;
