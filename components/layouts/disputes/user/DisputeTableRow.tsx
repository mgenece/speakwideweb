import { Button, Chip, TableCell, TableRow } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';
import { IDisputeRow } from './DisputeTable';

interface IDisputeTableRowProps {
  row: IDisputeRow;
}

const DisputeTableRow = React.memo(({ row }: IDisputeTableRowProps) => {
  const router = useRouter();

  const handleViewDetails = (event: React.MouseEvent) => {
    event.stopPropagation();
    const pathName = router.pathname;
    router.push(`${pathName}/${row._id}`);
  };

  // Cell style configuration with max-width
  const cellStyles = {
    sl: {
      width: 60,
      maxWidth: 60,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    },
    disputId: {
      width: 120,
      maxWidth: 120,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    },
    interpreterName: {
      width: 180,
      maxWidth: 180,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    },
    category: {
      width: 150,
      maxWidth: 150,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    },
    amountPaid: {
      width: 120,
      maxWidth: 120,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    },
    dateInitiate: {
      width: 130,
      maxWidth: 130,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    },
    status: {
      width: 140,
      maxWidth: 140,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    },
    actions: {
      width: 150,
      maxWidth: 150,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    },
  };

  return (
    <TableRow>
      <TableCell sx={cellStyles.sl}>{row.sl}</TableCell>
      <TableCell sx={cellStyles.disputId}>{row.disputId}</TableCell>
      <TableCell sx={cellStyles.interpreterName}>{row.interpreterName}</TableCell>
      <TableCell sx={cellStyles.category}>{row.category}</TableCell>
      <TableCell sx={cellStyles.amountPaid}>{row.amountPaid}</TableCell>
      <TableCell sx={cellStyles.dateInitiate}>{row.dateInitiate}</TableCell>
      <TableCell sx={cellStyles.status}>
        <Chip label={row.status} className={row.status.toLowerCase()} />
      </TableCell>
      <TableCell sx={cellStyles.actions}>
        <Button variant='outlined' size='small' onClick={handleViewDetails} disableRipple>
          View Details
        </Button>
      </TableCell>
    </TableRow>
  );
});

DisputeTableRow.displayName = 'DisputeTableRow';

export default DisputeTableRow;
