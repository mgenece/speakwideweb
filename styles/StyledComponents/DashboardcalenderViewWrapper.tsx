import { inter, manrope } from '@/mui-theme/_muiTheme';
import { Box, Menu, Stack, styled } from '@mui/material';

export const DashboardcalenderViewWrapper = styled(Box, {
  shouldForwardProp: data => data !== 'calenderHeight',
})<{
  calenderHeight?: number | undefined;
}>`
  .calender-header {
    padding: 20px 0 30px;
    @media (max-width: 1199px) {
      padding: 10px 0 15px;
    }
    @media (max-width: 599px) {
      padding: 0px 0 15px;
    }
    .month-navigation-Section {
      .calender-title {
        font-family: ${manrope.style.fontFamily};
        font-weight: 600;
        font-size: 30px;
        line-height: 1.2;
        @media (max-width: 1199px) {
          font-size: 25px;
        }
        @media (max-width: 899px) {
          font-size: 20px;
        }
        @media (max-width: 599px) {
          font-size: 16px;
        }
      }
      .month-navigation-btn {
        button {
          width: 44px;
          height: 44px;
          border-radius: 100%;
          border: 1px solid ${({ theme }) => theme.palette.customColors.lightPrimaryBorder};
          background-color: ${({ theme }) => theme.palette.common.white};
          color: ${({ theme }) => theme.palette.text.primary};
          transition: all 0.3s ease-in-out;
          &:hover {
            background-color: ${({ theme }) => theme.palette.text.primary};
            color: ${({ theme }) => theme.palette.common.white};
          }
          svg {
            @media (max-width: 1199px) {
              height: 15px;
            }
            @media (max-width: 899px) {
              height: 10px;
            }
          }
          @media (max-width: 1199px) {
            width: 35px;
            height: 35px;
          }
          @media (max-width: 899px) {
            width: 30px;
            height: 30px;
          }
        }
      }
    }
  }

  .calenderWrapper {
    padding-bottom: 20px;
    min-height: 759px;
    overflow: auto;
    @media (max-width: 1199px) {
      min-height: 700px;
    }
    @media (max-width: 899px) {
      min-height: auto;
      height: 680px;
    }
    @media (max-width: 599px) {
      height: 570px;
    }

    .customCalender {
      height: 100%;
      min-height: 470px;
      .rbc-month-view {
        border: 1px solid ${({ theme }) => theme.palette.customColors.colore8e8e8};
        .rbc-month-header {
          .rbc-header {
            border-bottom: 1px solid ${({ theme }) => theme.palette.customColors.colore8e8e8};
            border-left: 1px solid ${({ theme }) => theme.palette.customColors.colore8e8e8};
            font-family: ${inter.style.fontFamily};
            font-weight: 500;
            font-size: 15px;
            line-height: 1.2;
            color: ${({ theme }) => theme.palette.text.primary};
            text-transform: uppercase;
            text-align: left;
            padding: 10.5px 12px;
            background-color: ${({ theme }) => theme.palette.customColors.colorDCDBFF};
            @media (max-width: 1199px) {
              font-size: 16px;
              padding: 7px 4px;
            }
            @media (max-width: 899px) {
              font-size: 14px;
            }
          }
        }
        .rbc-month-row {
          .rbc-row-bg {
            .rbc-day-bg {
              background: ${({ theme }) => theme.palette.common.white};
              border-left: 1px solid ${({ theme }) => theme.palette.customColors.colore8e8e8};
              &.rbc-off-range-bg {
                background: ${({ theme }) => theme.palette.common.white};
              }
              &.rbc-today {
                box-shadow: 0px 0px 0px 3px #3348ff inset;

                background-color: ${({ theme }) => theme.palette.customColors.colorF0F7FF};
              }
            }
          }
          .rbc-month-row + .rbc-month-row {
            border-top: 1px solid ${({ theme }) => theme.palette.customColors.colore8e8e8};
          }
          .rbc-row-content {
            display: flex;
            flex-direction: column;
            height: 100%;

            .rbc-row {
              &:first-of-type {
                margin-bottom: auto;
              }
              &:last-of-type {
                margin-bottom: 10px;
              }
              .rbc-date-cell {
                font-family: ${inter.style.fontFamily};
                font-weight: 600;
                font-size: 24px;
                line-height: 1.2;
                color: ${({ theme }) => theme.palette.grey[900]};
                padding: 10.5px 12px;
                text-align: left;
                @media (max-width: 1199px) {
                  font-size: 18px;
                  padding: 4px 4px;
                }
                @media (max-width: 899px) {
                  font-size: 16px;
                }
                @media (max-width: 599px) {
                  font-size: 14px;
                }
              }
              .rbc-show-more {
                color: ${({ theme }) => theme.palette.text.primary};
                transition: all 0.3s ease-in-out;
                &:hover {
                  color: ${({ theme }) => theme.palette.customColors.colorD0B3FF};
                }
              }
              /* .rbc-row-content-scroll-container {
                .rbc-row {
                }
              } */
            }
            .rbc-row-segment {
              padding: 2px 12px;
              @media (max-width: 1199px) {
                padding: 2px 4px;
              }
              .rbc-event {
                padding: 0;
                background-color: transparent;
                overflow: hidden;
              }
            }
          }
        }
      }
    }
  }
`;
export const CalenderSelectorWrapper = styled(Stack)`
  .calenderBtn {
    border-radius: 10px;
    padding: 12px 13px;
    text-transform: none;
    background-color: ${({ theme }) => theme.palette.common.white};
    border: 1px solid ${({ theme }) => theme.palette.customColors.lightPrimaryBorder};
    min-width: 156px;
    justify-content: initial;
    color: ${({ theme }) => theme.palette.text.primary};
    font-weight: 500;
    transition: all 0.3s ease-in-out;
    @media (max-width: 1199px) {
      padding: 8px 15px;
      min-width: auto;
    }
    @media (max-width: 899px) {
      padding: 5px 12px;
      font-size: 12px;
    }
    &:hover {
      color: ${({ theme }) => theme.palette.common.white};
      background-color: ${({ theme }) => theme.palette.text.primary};
      border-color: ${({ theme }) => theme.palette.text.primary};
      .MuiButton-icon {
        &.MuiButton-endIcon {
          color: ${({ theme }) => theme.palette.common.white};
        }
      }
    }
    .MuiButton-icon {
      &.MuiButton-startIcon {
        margin-left: 0;
        margin-right: 8px;
      }
      &.MuiButton-endIcon {
        margin-right: 0;
        color: ${({ theme }) => theme.palette.customColors.darkTextColor};
        margin-left: auto;
        @media (max-width: 1199px) {
          margin-left: 8px;
        }
      }
    }
  }
  .MuiButtonBase-root {
    &.primaryBtn {
      @media (max-width: 1199px) {
        padding: 8px 15px;
        min-height: auto;
        font-size: 14px;
        min-width: auto;
      }
      @media (max-width: 899px) {
        padding: 5px 12px;
        font-size: 12px;
      }
    }
  }
`;

export const CalenderMenue = styled(Menu)`
  * {
    scrollbar-width: thin;
    scrollbar-color: #c2c9e9 transparent;
  }
  /* Firefox */

  /* Chrome, Edge, Safari */
  *::-webkit-scrollbar {
    width: 14px;
    height: 14px;
  }

  *::-webkit-scrollbar-track {
    background: transparent;
  }

  *::-webkit-scrollbar-thumb {
    background: C2C9E9;
    border-radius: 14px;
  }

  *::-webkit-scrollbar-thumb:hover {
    background: C2C9E9;
  }
  .MuiPaper-root {
    min-width: 300px;
    box-shadow: none;
    border-radius: 20px;
    background: ${({ theme }) => theme.palette.primary.light};
    filter: none;
    padding: 1px;

    ul {
      padding: 15px;

      border-radius: 20px;

      li {
        padding: 0;
        gap: 6px;

        &:not(:last-child) {
          margin-bottom: 15px;
        }

        i {
          line-height: 0;
        }
      }
    }
  }
  .selectableCalender {
    color: ${({ theme }) => theme.palette.text.primary};
    height: auto;
    .MuiYearCalendar-root {
    }
  }
  .MuiIconButton-root {
  }
  .MuiIconButton-root {
    color: ${({ theme }) => theme.palette.text.primary};
  }
`;
