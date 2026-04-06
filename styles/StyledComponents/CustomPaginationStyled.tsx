import { Pagination, styled } from '@mui/material';

export const CustomPaginationBox = styled(Pagination)`
  padding: 25px 0 35px;

  &.start-paging {
    .MuiPagination-ul {
      justify-content: flex-start;
    }
  }

  .MuiPagination-ul {
    justify-content: flex-end;

    .MuiPaginationItem-page {
      font-size: 13px;
      font-weight: 600;
      color: ${({ theme }) => theme.palette.customColors.dark};
      border: 1px solid ${({ theme }) => theme.palette.grey.A100};
      border-radius: 8px;

      &.Mui-selected {
        background-color: ${({ theme }) => theme.palette.primary.main};
        color: ${({ theme }) => theme.palette.common.white};
      }
    }

    .MuiPaginationItem-previousNext {
      font-size: 13px;
      font-weight: 600;
      color: ${({ theme }) => theme.palette.customColors.dark};
    }
  }
`;
