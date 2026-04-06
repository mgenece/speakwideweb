'use client';

import { useInfiniteEarningList } from '@/hooks/useInfiniteEarningList';
import {
  Box,
  Button,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

const EarningsTab = () => {
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);

  // Format to YYYY-MM-DD string or undefined for hook params
  const fromDate = startDate ? startDate.format('YYYY-MM-DD') : undefined;
  const toDate = endDate ? endDate.format('YYYY-MM-DD') : undefined;

  const { earnings, fetchMoreData, hasNextPage, isLoading, isError, refetch } =
    useInfiniteEarningList({
      listType: 'request',
      itemsPerPage: 10,
      from: fromDate,
      to: toDate,
      sortField: 'createdAt',
      sortOrder: 'asc',
    });

  // Refetch data whenever date range changes
  useEffect(() => {
    refetch();
  }, [fromDate, toDate, refetch]);

  if (isLoading) {
    return (
      <Box display='flex' justifyContent='center' alignItems='center' minHeight='400px'>
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return (
      <Box display='flex' justifyContent='center' alignItems='center' minHeight='400px'>
        <Typography color='error'>Error loading earnings. Please try again.</Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Box py={2}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Box display='flex' gap={2} mb={2} alignItems='center' className='datepickerWrapperBox'>
            <DatePicker
              label='Start Date'
              value={startDate}
              maxDate={endDate ?? dayjs()}
              onChange={newValue => setStartDate(newValue)}
              className='datepickerItemSc'
              desktopModeMediaQuery='(min-width: 0px)'
            />
            <DatePicker
              label='End Date'
              value={endDate}
              onChange={newValue => setEndDate(newValue)}
              minDate={startDate ?? undefined}
              maxDate={dayjs()}
              className='datepickerItemSc'
              desktopModeMediaQuery='(min-width: 0px)'
            />
            <Button
              variant='outlined'
              onClick={() => {
                setStartDate(null);
                setEndDate(null);
              }}
              className='clearBtnSc'
            >
              Clear
            </Button>
          </Box>
        </LocalizationProvider>
      </Box>
      <TableContainer
        id='scrollableDiv'
        sx={{
          maxHeight: 'calc(100vh - 380px)',
          overflow: 'auto',
          position: 'relative',
        }}
      >
        <InfiniteScroll
          dataLength={earnings.length}
          next={fetchMoreData}
          hasMore={hasNextPage || false}
          loader={
            <Box display='flex' justifyContent='center' padding={2}>
              <CircularProgress size={30} />
            </Box>
          }
          endMessage={
            earnings.length > 0 ? (
              <Box textAlign='center' padding={2}>
                <Typography variant='body2' color='textSecondary'>
                  No more earnings to load
                </Typography>
              </Box>
            ) : null
          }
          scrollableTarget='scrollableDiv'
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Client</TableCell>
                <TableCell>Session Reference</TableCell>
                <TableCell>Session Date</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {earnings.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} align='center'>
                    <Typography variant='body2' color='textSecondary' py={3}>
                      No earnings found
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                earnings.map(item => {
                  const sessionDate = new Date(item.session.start_date_time).toLocaleDateString();

                  return (
                    <TableRow key={item._id}>
                      <TableCell>{item.client.full_name}</TableCell>
                      <TableCell>{item.session.session_ref_number}</TableCell>
                      <TableCell>{sessionDate}</TableCell>
                      <TableCell>${item.amount}</TableCell>
                      <TableCell>{item.session.isPaid ? 'PAID' : 'DUE'}</TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </InfiniteScroll>
      </TableContainer>
    </Box>
  );
};

export default EarningsTab;
