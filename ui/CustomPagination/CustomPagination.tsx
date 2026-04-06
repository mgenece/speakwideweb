import { CustomPaginationBox } from '@/styles/StyledComponents/CustomPaginationStyled';
import PaginationItem from '@mui/material/PaginationItem';
import React, { useState } from 'react';

interface ICustomPaginationProps {
  count: number;
  position?: 'start';
}

export default function CustomPagination({ count, position }: ICustomPaginationProps) {
  const [page, setPage] = useState(1);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <CustomPaginationBox
      count={count}
      page={page}
      onChange={handleChange}
      siblingCount={0}
      boundaryCount={1}
      className={position === 'start' ? 'start-paging' : ''}
      renderItem={item => (
        <PaginationItem
          {...item}
          slots={{
            previous: () => <span>Prev</span>,
            next: () => <span>Next</span>,
          }}
        />
      )}
    />
  );
}
