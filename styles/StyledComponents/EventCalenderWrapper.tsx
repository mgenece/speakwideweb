import { inter } from '@/mui-theme/_muiTheme';
import { Box, styled } from '@mui/material';

export const EventCalenderWrapper = styled(Box)`
  .smallCalender {
    min-height: 315px;
    * {
      border: 0 !important;
    }
    .rbc-month-view {
      .rbc-month-row {
        .rbc-row-bg {
          .rbc-day-bg {
            background-color: transparent;
          }
        }
        .rbc-row-content {
          .rbc-row {
            .rbc-date-cell {
              text-align: center;
              font-family: ${inter.style.fontFamily};
              font-weight: 500;
              font-size: 26px;
              padding: 10px;
              color: ${({ theme }) => theme.palette.text.primary};
              &.rbc-off-range {
                color: ${({ theme }) => theme.palette.text.disabled};
              }
              @media (max-width: 1440px) {
                font-size: 20px;
              }
              @media (max-width: 1199px) {
                font-size: 18px;
              }
              @media (max-width: 899px) {
                font-size: 16px;
                padding: 6px;
              }
              @media (max-width: 599px) {
                font-size: 14px;
              }
              button {
                width: 100%;
                height: 100%;
                font-family: inherit;
                font-style: inherit;
                line-height: inherit;
                color: inherit;
                font-size: inherit;
              }
              .rbc-button-link {
                width: 100%;
                height: 100%;
                font-family: inherit;
                font-style: inherit;
                line-height: inherit;
                color: inherit;
                font-size: inherit;
                display: inline-block;
                .labelText {
                  height: 40px;
                  width: 40px;
                  flex-shrink: 0;
                  display: inline-flex;
                  align-items: center;
                  justify-content: center;
                  border-radius: 50%;
                  @media (max-width: 899px) {
                    height: 32px;
                    width: 32px;
                  }
                }
                &.has-event-date {
                  .labelText {
                    background-color: ${({ theme }) => theme.palette.primary.main};
                    color: ${({ theme }) => theme.palette.common.white};
                  }
                }
              }
            }
            .rbc-row-segment {
              display: none !important;
            }
          }
        }
      }
      /* .rbc-month-header {
        display: none !important;
      } */
    }

    &.second-type {
      .rbc-month-row {
        .rbc-row-content {
          .rbc-row {
            .rbc-date-cell {
              .rbc-button-link {
                font-size: 16px !important;
                font-weight: 500 !important;
              }
            }
          }
        }
      }
    }
  }
`;
