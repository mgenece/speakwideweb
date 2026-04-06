import { useBillingHistory } from '@/hooks/useBillingHistory';
import { BillingHistoryPaper } from '@/styles/StyledComponents/PaymentandsubscriptionStyled';
import { Box, CircularProgress, Grid2, Paper, Tab, Tabs, Typography } from '@mui/material';
import { useCallback, useState } from 'react';
import { TransactionList } from './TransactionList';

type TabType = '' | 'session' | 'subscription' | 'refund';

interface SessionDetails {
  _id: string;
  language_one: string;
  language_two: string;
  session_ref_number: string;
  interpreterName?: string;
}

interface SubscriptionDetails {
  planTitle?: string;
}

export interface TransactionData {
  _id: string;
  createdAt: string;
  amount: number;
  card: string;
  invoiceId: string;
  paymentMethodId: string;
  subscriptionDetails?: SubscriptionDetails;
  sessionDetils?: SessionDetails;
}

// Memoized TransactionItem component to prevent unnecessary re-renders

// components/BillingHistory.tsx
export default function BillingHistory() {
  // const theme = useTheme();
  const [activeTab, setActiveTab] = useState<TabType>('');

  const { trnsData, paymentHistoryQuery, isLoading, isError } = useBillingHistory(activeTab);

  const handleTabChange = useCallback((_event: React.SyntheticEvent, newValue: TabType) => {
    setActiveTab(newValue);
  }, []);

  const fetchMoreData = useCallback(() => {
    if (paymentHistoryQuery.hasNextPage && !paymentHistoryQuery.isFetchingNextPage) {
      paymentHistoryQuery.fetchNextPage();
    }
  }, [paymentHistoryQuery]);

  if (isError) {
    return <Box className='cmn-gradiant' height={450}></Box>;
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

        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
          <Tabs value={activeTab} onChange={handleTabChange} aria-label='Billing history tabs'>
            <Tab label='All' value='' />
            <Tab label='Session' value='session' />
            <Tab label='Subscription' value='subscription' />
            <Tab label='Refund' value='refund' />
          </Tabs>
        </Box>

        <Box id='scrollableDiv' sx={{ height: 450, overflow: 'auto' }}>
          {isLoading ? (
            <Box
              height={450}
              sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            >
              <CircularProgress />
            </Box>
          ) : (
            <TransactionList
              transactions={trnsData}
              activeTab={activeTab}
              hasNextPage={paymentHistoryQuery.hasNextPage}
              isFetchingNextPage={paymentHistoryQuery.isFetchingNextPage}
              onFetchMore={fetchMoreData}
            />
          )}
        </Box>
      </Paper>
    </BillingHistoryPaper>
  );
}
