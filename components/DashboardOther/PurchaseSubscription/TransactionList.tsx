import { getInvoiceApi } from '@/api/functions/pyment';
import DownloadArrowIcon from '@/ui/Icons/DownloadArrowIcon';
import { Box, CircularProgress, IconButton, Link, Typography, useTheme } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { memo } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { TransactionData } from './BillingHistory';

// components/TransactionList.tsx

export type TabType = '' | 'session' | 'subscription' | 'refund';
interface TransactionListProps {
  transactions: TransactionData[];
  activeTab: TabType;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  onFetchMore: () => void;
}

interface TransactionItemProps {
  data: TransactionData;
}

const TransactionItem = memo(({ data }: TransactionItemProps) => {
  const theme = useTheme();

  const downloadInvoiceMutation = useMutation({
    mutationFn: getInvoiceApi,
    onSuccess: data => {
      const url = data?.data.url;
      if (window && url) window.open(url, '_blank');
    },
  });

  const handleDownload = (invoiceId: string) => {
    downloadInvoiceMutation.mutate(invoiceId);
  };

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        gap: 2,
        padding: 1,
        marginBlockEnd: 0.5,
        border: '1px solid',
        borderColor: 'grey.300',
        borderRadius: 1,
      }}
    >
      <Box sx={{ minWidth: '175px' }}>
        <Typography
          variant='caption'
          color={theme.palette.customColors.light}
          fontSize={12}
          mb={1}
          display='block'
        >
          Purchase Date
        </Typography>
        <Typography variant='body2'>
          {dayjs(data.createdAt).format('MMMM D, YYYY h:mm A')}
        </Typography>
      </Box>

      <Box sx={{ minWidth: '175px' }}>
        {data.subscriptionDetails ? (
          <>
            <Typography
              variant='caption'
              color={theme.palette.customColors.light}
              fontSize={12}
              mb={1}
              display='block'
            >
              Subscription Plan
            </Typography>
            <Typography variant='body2'>{data?.subscriptionDetails?.planTitle || 'NA'}</Typography>
          </>
        ) : data.sessionDetils?._id ? (
          <>
            <Typography
              variant='caption'
              color={theme.palette.customColors.light}
              fontSize={12}
              mb={1}
              display='block'
            >
              Session Request
            </Typography>
            <Box>
              <Typography variant='body2'>
                {`${data?.sessionDetils.language_one} -> ${data?.sessionDetils.language_two}`}
              </Typography>
              <Typography variant='body2'>
                Session:{' '}
                <Link href={`/user/dashboard/?sessionDetail=${data.sessionDetils._id}`}>
                  {data?.sessionDetils.session_ref_number}
                </Link>
              </Typography>
              <Typography variant='body2'>
                Interpreter: {data?.sessionDetils.interpreterName || 'NA'}
              </Typography>
            </Box>
          </>
        ) : (
          <Typography variant='body2'>NA</Typography>
        )}
      </Box>

      <Box sx={{ minWidth: '175px' }}>
        <Typography
          variant='caption'
          color={theme.palette.customColors.light}
          fontSize={12}
          mb={1}
          display='block'
        >
          Amount
        </Typography>
        <Typography variant='body2'>${data.amount}</Typography>
      </Box>

      <Box sx={{ minWidth: '175px' }}>
        <Typography
          variant='caption'
          color={theme.palette.customColors.light}
          fontSize={12}
          mb={1}
          display='block'
        >
          Payment Method
        </Typography>
        <Typography variant='body2'>{data.card}</Typography>
      </Box>

      <Box>
        <IconButton
          onClick={() => handleDownload(data.invoiceId)}
          disabled={downloadInvoiceMutation.isPending}
          aria-label='Download invoice'
        >
          {downloadInvoiceMutation.isPending ? (
            <CircularProgress size={18} />
          ) : (
            <DownloadArrowIcon
              IconWidth='24'
              IconHeight='24'
              IconColor={theme.palette.primary.main}
            />
          )}
        </IconButton>
      </Box>
    </Box>
  );
});

export const TransactionList = ({
  transactions,
  activeTab,
  hasNextPage,
  //   isFetchingNextPage,
  onFetchMore,
}: TransactionListProps) => {
  const theme = useTheme();

  if (transactions.length === 0) {
    return (
      <Typography
        variant='body2'
        sx={{ textAlign: 'center', py: 4, color: theme.palette.customColors.light }}
      >
        No transactions found
      </Typography>
    );
  }

  return (
    <InfiniteScroll
      key={activeTab}
      dataLength={transactions.length}
      next={onFetchMore}
      hasMore={!!hasNextPage}
      loader={
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 2 }}>
          <CircularProgress size={24} />
        </Box>
      }
      endMessage={
        <Typography
          variant='body2'
          sx={{ textAlign: 'center', py: 2, color: theme.palette.customColors.light }}
        >
          No more transactions
        </Typography>
      }
      scrollableTarget='scrollableDiv'
    >
      {transactions.map(data => (
        <TransactionItem key={data._id} data={data} />
      ))}
    </InfiniteScroll>
  );
};

TransactionList.displayName = 'TransactionList';
