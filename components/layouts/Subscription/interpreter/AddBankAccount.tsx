import {
  addBankAccountApi,
  addBankAccountStatusApi,
  listBankAccountApi,
} from '@/api/functions/pyment';
import { queryKeys, storageKeys } from '@/config/constants';
import { onboardingTokenConvert } from '@/lib/functions/_helpers.lib';
import { Box, Chip, CircularProgress, Divider, Paper, Stack, Typography } from '@mui/material';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import ButtonCommon from '../../common/ButtonCommon';

function AddBankAccountSection() {
  const router = useRouter();
  const { success } = router.query;

  const addBankQuery = useQuery({
    queryKey: queryKeys.addBankLink,
    queryFn: addBankAccountApi,
    refetchOnMount: true,
  });

  const bankStatusMutation = useMutation({ mutationFn: addBankAccountStatusApi });

  const listBankAccntQuery = useQuery({
    queryKey: queryKeys.listBankAccount,
    queryFn: listBankAccountApi,
    refetchOnMount: true,
  });

  const bankAccounts = listBankAccntQuery.data?.data || [];

  useEffect(() => {
    if (bankAccounts) {
      if (bankAccounts.length) {
        bankStatusMutation.mutate(true);
        onboardingTokenConvert();
      } else {
        bankStatusMutation.mutate(false);
      }
    }
  }, [bankAccounts.length]);

  const handleRedirect = () => {
    const link = addBankQuery.data?.data?.link;
    sessionStorage.setItem(storageKeys.sessionStorage.redirectUrl, '/interpreter/dashboard');
    if (link) {
      window.location.href = link;
    }
  };

  // ✅ Loading state
  if (addBankQuery.isPending || listBankAccntQuery.isPending) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '40vh',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  // ✅ If bank accounts already added
  if (success === 'true') {
    return (
      <Box
        px={6}
        py={6}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
          maxWidth: 600,
          mx: 'auto', // centers the box horizontally
        }}
      >
        <Typography variant='h5' fontWeight={600}>
          Your Bank Accounts
        </Typography>

        {bankAccounts.length === 0 ? (
          <Typography variant='body1' color='text.secondary'>
            No bank accounts found.
          </Typography>
        ) : (
          <Stack spacing={2}>
            {bankAccounts.map(account => (
              <Paper
                key={account.id}
                elevation={1}
                sx={{
                  p: 3,
                  borderRadius: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 1,
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 1,
                  }}
                >
                  <Typography variant='h6' fontWeight={600}>
                    {account.bank_name}
                  </Typography>
                  <Chip
                    label={account.status.toUpperCase()}
                    color={account.status === 'verified' ? 'success' : 'warning'}
                    size='small'
                  />
                </Box>
                <Divider />
                <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', mt: 2, gap: 1 }}>
                  <InfoRow label='Country' value={account.country} />
                  <InfoRow label='Currency' value={account.currency.toUpperCase()} />
                  <InfoRow label='Last 4 Digits' value={account.last4} />
                  <InfoRow label='Routing Number' value={account.routing_number} />
                </Box>
              </Paper>
            ))}
          </Stack>
        )}

        <ButtonCommon
          variant='contained'
          size='large'
          onClick={() => {
            const redirectUrl = sessionStorage.getItem(storageKeys.sessionStorage.redirectUrl);
            if (typeof redirectUrl == 'string') {
              router.push(redirectUrl);
            } else {
              router.push('/interpreter/dashboard');
            }
          }}
        >
          Done
        </ButtonCommon>
      </Box>
    );
  }

  // ✅ Retry UI when bank account linking fails
  if (success === 'false') {
    return (
      <Box
        px={6}
        py={6}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 3,
          maxWidth: 600,
          mx: 'auto',
          textAlign: 'center',
        }}
      >
        <Typography variant='h6' fontWeight={600} color='error'>
          Bank Account Linking Failed
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          Something went wrong while adding your bank account. Please try again.
        </Typography>
        <ButtonCommon variant='contained' size='large' onClick={handleRedirect}>
          Retry
        </ButtonCommon>
      </Box>
    );
  }

  // ✅ Default state: Add bank account
  return (
    <Box
      px={6}
      py={6}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 3,
        maxWidth: 600,
        mx: 'auto',
        textAlign: 'center',
      }}
    >
      <Typography variant='h6' fontWeight={500}>
        To receive payments, please share your bank account details with us.
      </Typography>
      <Typography variant='body2' color='text.secondary'>
        The amount will be securely credited to your registered bank account.
      </Typography>
      <ButtonCommon variant='contained' size='large' onClick={handleRedirect}>
        Add Bank Account
      </ButtonCommon>
    </Box>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <Box>
      <Typography variant='body2' color='text.secondary'>
        {label}
      </Typography>
      <Typography variant='body1' fontWeight={500}>
        {value}
      </Typography>
    </Box>
  );
}

export default AddBankAccountSection;
