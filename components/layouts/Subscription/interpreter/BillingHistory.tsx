import {
  getInvoiceApi,
  listCardApi,
  listSavedBankApi,
  listTransactionHistoryApi,
} from '@/api/functions/pyment';
import { queryKeys } from '@/config/constants';
import { BillingHistoryPaper } from '@/styles/StyledComponents/PaymentandsubscriptionStyled';
import DownloadArrowIcon from '@/ui/Icons/DownloadArrowIcon';
import {
  Box,
  CircularProgress,
  Grid2,
  IconButton,
  Paper,
  Typography,
  useTheme,
} from '@mui/material';
import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { memo, useCallback, useMemo } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

interface TransactionData {
  _id: string;
  createdAt: string;
  amount: number;
  paymentMethodId: string;
  invoiceId: string;
  subscriptionDetails?: {
    planTitle?: string;
  };
}

interface TransactionItemProps {
  data: TransactionData & { card: string };
  onDownload: (invoiceId: string) => void;
  isDownloading: boolean;
}

const TransactionItem = memo(({ data, onDownload, isDownloading }: TransactionItemProps) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        py: 2,
        px: 2,
        borderBottom: `1px solid ${theme.palette.divider}`,
        '&:hover': {
          backgroundColor: theme.palette.action.hover,
        },
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

      <Box sx={{ ml: 'auto' }}>
        <IconButton
          onClick={() => onDownload(data.invoiceId)}
          disabled={isDownloading}
          aria-label='Download invoice'
        >
          {isDownloading ? (
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

TransactionItem.displayName = 'TransactionItem';

export default function BillingHistoryInt() {
  const theme = useTheme();

  const listCardsQuery = useQuery({
    queryKey: queryKeys.listCard,
    queryFn: listCardApi,
  });

  const listBankQuery = useQuery({
    queryKey: queryKeys.listBank,
    queryFn: listSavedBankApi,
  });

  const downloadInvoiceMutation = useMutation({
    mutationFn: getInvoiceApi,
    onSuccess: data => {
      const url = data?.data.url;
      if (window && url) window.open(url, '_blank');
    },
  });

  const paymentHistoryQuery = useInfiniteQuery({
    queryKey: ['billing-history-subscription'],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await listTransactionHistoryApi({
        type: 'subscription',
        page: pageParam,
        limit: 10,
      });
      return {
        docs: response.data.docs,
        page: pageParam,
        totalPages: response.data.pages,
        total: response.data.total,
      };
    },
    getNextPageParam: lastPage => {
      if (lastPage.page < lastPage.totalPages) {
        return lastPage.page + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
  });

  // Memoize card and bank lists
  const cardList = useMemo(
    () => listCardsQuery.data?.data?.data || [],
    [listCardsQuery.data?.data?.data]
  );

  const bankList = useMemo(() => listBankQuery.data?.data || [], [listBankQuery.data?.data]);

  // Create optimized lookup map for O(1) access
  const paymentMethodMap = useMemo(() => {
    const map = new Map<string, string>();

    // Add cards to map
    cardList.forEach(card => {
      if (card.id && card.card?.last4) {
        map.set(card.id, `**** **** **** ${card.card.last4}`);
      }
    });

    // Add banks to map
    bankList.forEach(bank => {
      if (bank.id && bank.last4) {
        map.set(bank.id, `${bank.bankName} ****${bank.last4}`);
      }
    });

    return map;
  }, [cardList, bankList]);

  // Flatten all pages into a single array
  const transactionList = useMemo(
    () => paymentHistoryQuery.data?.pages.flatMap(page => page.docs) || [],
    [paymentHistoryQuery.data?.pages]
  );

  // Memoize transaction data with payment method mapping
  const trnsData = useMemo(() => {
    return transactionList.map(item => {
      const paymentMethod = paymentMethodMap.get(item.paymentMethodId) || 'Payment Method Removed';
      return { ...item, card: paymentMethod };
    });
  }, [transactionList, paymentMethodMap]);

  const fetchMoreData = useCallback(() => {
    if (paymentHistoryQuery.hasNextPage && !paymentHistoryQuery.isFetchingNextPage) {
      paymentHistoryQuery.fetchNextPage();
    }
  }, [paymentHistoryQuery]);

  const handleDownload = useCallback(
    (invoiceId: string) => {
      downloadInvoiceMutation.mutate(invoiceId);
    },
    [downloadInvoiceMutation]
  );

  // Show loading state on initial load
  if (paymentHistoryQuery.isLoading && !paymentHistoryQuery.data) {
    return (
      <BillingHistoryPaper className='cmn-gradiant'>
        <Paper elevation={0} className='cmn-paper-box'>
          <Box className='paper-head'>
            <Grid2 container spacing={1}>
              <Grid2 size={{ xs: 12 }}>
                <Typography variant='h6' className='heading-h6'>
                  Billing History
                </Typography>
              </Grid2>
            </Grid2>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
            <CircularProgress />
          </Box>
        </Paper>
      </BillingHistoryPaper>
    );
  }

  // Show error state
  if (paymentHistoryQuery.isError) {
    return (
      <BillingHistoryPaper className='cmn-gradiant'>
        <Paper elevation={0} className='cmn-paper-box'>
          <Box className='paper-head'>
            <Grid2 container spacing={1}>
              <Grid2 size={{ xs: 12 }}>
                <Typography variant='h6' className='heading-h6'>
                  Billing History
                </Typography>
              </Grid2>
            </Grid2>
          </Box>
          <Typography variant='body2' color='error' sx={{ p: 2 }}>
            Failed to load billing history. Please try again.
          </Typography>
        </Paper>
      </BillingHistoryPaper>
    );
  }

  return (
    <BillingHistoryPaper className='cmn-gradiant'>
      <Paper elevation={0} className='cmn-paper-box'>
        <Box className='paper-head'>
          <Grid2 container spacing={1}>
            <Grid2 size={{ xs: 12 }}>
              <Typography variant='h6' className='heading-h6'>
                Billing History
              </Typography>
            </Grid2>
          </Grid2>
        </Box>

        {trnsData.length === 0 && !paymentHistoryQuery.isLoading ? (
          <Typography
            variant='body2'
            sx={{ textAlign: 'center', py: 4, color: theme.palette.customColors.light }}
          >
            No subscription transactions found
          </Typography>
        ) : (
          <InfiniteScroll
            dataLength={trnsData.length}
            next={fetchMoreData}
            hasMore={!!paymentHistoryQuery.hasNextPage}
            loader={
              <Box sx={{ display: 'flex', justifyContent: 'center', py: 2 }}>
                <CircularProgress size={24} />
              </Box>
            }
            endMessage={
              trnsData.length > 0 ? (
                <Typography
                  variant='body2'
                  sx={{ textAlign: 'center', py: 2, color: theme.palette.customColors.light }}
                >
                  No more transactions
                </Typography>
              ) : null
            }
            height={360}
          >
            {trnsData.map(data => (
              <TransactionItem
                key={data._id}
                data={data}
                onDownload={handleDownload}
                isDownloading={downloadInvoiceMutation.isPending}
              />
            ))}
          </InfiniteScroll>
        )}
      </Paper>
    </BillingHistoryPaper>
  );
}
