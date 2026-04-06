import { DisputeTableWraper } from '@/styles/StyledComponents/DisputeMainWrapper';
import { IDispute } from '@/typescript/interface/dispute.interface';
import InputFieldCommon from '@/ui/CommonInput/CommonInput';
import SmallSearchIcon from '@/ui/Icons/SmallSearchIcon';
import SortingIconBtn from '@/ui/Icons/SortingIconBtn';
import {
  Box,
  CircularProgress,
  IconButton,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  Typography,
} from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { UseInfiniteQueryResult } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import React, { Dispatch, SetStateAction } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import DisputeTableRow from './DisputeTableRow';

export interface IDisputeRow {
  sl: string;
  disputId: string;
  interpreterName: string;
  category: string;
  amountPaid: string;
  dateInitiate: string;
  status: string;
  _id: string;
}

interface IDisputeTableProps {
  disputeQuery: UseInfiniteQueryResult<any, Error>;
  searchSort?: {
    search: string;
    sort: string;
  };
  setSearchSort?: Dispatch<
    SetStateAction<{
      search: string;
      sort: string;
    }>
  >;
}

export default function DisputeTable({
  disputeQuery,
  searchSort,
  setSearchSort,
}: IDisputeTableProps) {
  const router = useRouter();

  const isInterpreter = router.pathname.includes('/interpreter/');

  const handleSortChange = (event: SelectChangeEvent<string>) => {
    setSearchSort?.(prev => ({
      ...prev,
      sort: event.target.value,
    }));
  };

  // Transform API data to table format
  const transformData = (disputes: IDispute[]): IDisputeRow[] => {
    return disputes.map((dispute, index) => ({
      sl: (index + 1).toString(),
      disputId: dispute.dispute_id,
      interpreterName: dispute.interpreter_name,
      category: dispute.categories.map(cat => cat.title).join(', '),
      amountPaid: `$${dispute.amount_paid.toFixed(2)}`,
      dateInitiate: new Date(dispute.date_initiated).toLocaleDateString(),
      status: dispute.dispute_status,
      _id: dispute._id,
    }));
  };

  // Flatten all pages data
  const allDisputes = React.useMemo(() => {
    if (!disputeQuery.data?.pages) return [];
    return disputeQuery.data.pages.flatMap((page: { data: { docs: IDispute } }) => page.data.docs);
  }, [disputeQuery.data]);

  const tableData = transformData(allDisputes);

  // Calculate total items across all pages
  const totalItems = disputeQuery.data?.pages[0]?.data.total || 0;

  if (disputeQuery.isLoading) {
    return (
      <Box display='flex' justifyContent='center' alignItems='center' minHeight='400px'>
        <CircularProgress />
      </Box>
    );
  }

  if (disputeQuery.isError) {
    return (
      <Box display='flex' justifyContent='center' alignItems='center' minHeight='400px'>
        <Typography variant='body1' color='error'>
          Error loading disputes: {disputeQuery.error?.message}
        </Typography>
      </Box>
    );
  }

  return (
    <DisputeTableWraper className='disputeTableWrap'>
      <Stack
        direction='row'
        alignItems='center'
        justifyContent='space-between'
        className='wrapper_topTitleTab'
      >
        <Typography variant='body1' className='titleTxt'>
          Dispute List ({totalItems} total)
        </Typography>
        {!isInterpreter && (
          <Box className='wrapper_SeacrhWrapSelect'>
            <Box className='searchBar'>
              <InputFieldCommon
                placeholder='Search...'
                endAdornment={<SmallSearchIcon />}
                value={searchSort?.search || ''}
                onChange={e =>
                  setSearchSort?.(prev => ({
                    ...prev,
                    search: e.target.value,
                  }))
                }
              />
            </Box>
            <Box className='sortingWrap'>
              <Select
                value={searchSort?.sort || 'default'}
                onChange={handleSortChange}
                displayEmpty
                startAdornment={<SortingIconBtn />}
                sx={{
                  minWidth: 150,
                  '& .MuiSelect-select': {
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                  },
                }}
                renderValue={value => {
                  if (value === 'NEW_OLD') return 'Sort By: New - Old';
                  if (value === 'OLD_NEW') return 'Sort By: Old - New';
                  return 'Sort By: Date Added';
                }}
              >
                <MenuItem value='default' disabled>
                  Sort By: Date Added
                </MenuItem>
                <MenuItem value='asc'>New - Old</MenuItem>
                <MenuItem value='desc'>Old - New</MenuItem>
              </Select>
            </Box>
          </Box>
        )}
      </Stack>

      <TableContainer id='scrollableDiv' style={{ maxHeight: '600px', overflow: 'auto' }}>
        <InfiniteScroll
          dataLength={tableData.length}
          next={() => disputeQuery.fetchNextPage()}
          hasMore={disputeQuery.hasNextPage ?? false}
          loader={
            <Box display='flex' justifyContent='center' padding='20px'>
              <CircularProgress size={30} />
            </Box>
          }
          endMessage={
            <Box display='flex' justifyContent='center' padding='20px'>
              <Typography variant='body2' color='textSecondary'>
                No more disputes to load
              </Typography>
            </Box>
          }
          scrollableTarget='scrollableDiv'
        >
          <Table sx={{ minWidth: 1480 }} aria-label='dispute table'>
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{
                    width: 60,
                    maxWidth: 60,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  SL
                </TableCell>
                <TableCell
                  sx={{
                    width: 120,
                    maxWidth: 120,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  <IconButton disableRipple>
                    <SortingIconBtn IconColor='#8142E9' />
                  </IconButton>
                  Dispute ID
                </TableCell>
                <TableCell
                  sx={{
                    width: 180,
                    maxWidth: 180,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {isInterpreter ? 'Client' : 'Interpreter'} Name
                </TableCell>
                <TableCell
                  sx={{
                    width: 150,
                    maxWidth: 150,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  Category
                </TableCell>
                <TableCell
                  sx={{
                    width: 120,
                    maxWidth: 120,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  Amount Paid
                </TableCell>
                <TableCell
                  sx={{
                    width: 130,
                    maxWidth: 130,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  <IconButton disableRipple>
                    <SortingIconBtn IconColor='#8142E9' />
                  </IconButton>
                  Date Initiated
                </TableCell>
                <TableCell
                  sx={{
                    width: 140,
                    maxWidth: 140,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  <IconButton disableRipple>
                    <SortingIconBtn IconColor='#8142E9' />
                  </IconButton>
                  Dispute Status
                </TableCell>
                <TableCell
                  sx={{
                    width: 150,
                    maxWidth: 150,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tableData.map((row, index) => (
                <DisputeTableRow key={`${row.disputId}-${index}`} row={row} />
              ))}
            </TableBody>
          </Table>
        </InfiniteScroll>
      </TableContainer>
    </DisputeTableWraper>
  );
}
