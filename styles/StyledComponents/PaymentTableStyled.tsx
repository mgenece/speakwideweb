import { styled, Table } from '@mui/material';

export const PaymentTableStyled = styled(Table)`
  thead {
    tr {
      th {
        background-color: ${({ theme }) => theme.palette.customColors.primary400};
        color: ${({ theme }) => theme.palette.common.white};
        font-size: 16px;
        font-weight: 500;
        border: none;
        padding: 12.5px 16px;
        @media (max-width: 599px) {
          font-size: 14px;
        }
        span {
          font-size: 14px;
          @media (max-width: 599px) {
            font-size: 12px;
          }
        }
        &:first-child {
          border-radius: 10px 0 0 0;
          background-color: ${({ theme }) => theme.palette.customColors.colorF8F4FF};
        }
        &:nth-child(2) {
          border-radius: 10px 0 0 0;
        }
        &:last-child {
          border-radius: 0 10px 0 0;
        }
      }
    }
  }
  tbody {
    tr {
      td {
        font-size: 16px;
        font-weight: 400;
        color: ${({ theme }) => theme.palette.text.primary};
        background-color: ${({ theme }) => theme.palette.customColors.primary500};
        border-bottom: 2px solid ${({ theme }) => theme.palette.customColors.colorF8F4FF};
        @media (max-width: 599px) {
          font-size: 14px;
        }
        span {
          font-size: 12px;
        }
        &:first-child {
          background-color: ${({ theme }) => theme.palette.customColors.colorF8F4FF};
          line-height: 1;
          padding: 12.5px 16px;
        }
      }
      &:nth-child(even) {
        td {
          background-color: ${({ theme }) => theme.palette.customColors.primary600};
          &:first-child {
            background-color: ${({ theme }) => theme.palette.customColors.colorF8F4FF};
          }
        }
      }
      &:last-child {
        td {
          &:first-child {
            border-radius: 0 0 0 10px;
          }
          &:nth-child(2) {
            border-radius: 0 0 0 10px;
          }
        }
      }
      &:last-child {
        td {
          &:last-child {
            border-radius: 0 0 10px 0;
          }
        }
      }
    }
  }
`;
