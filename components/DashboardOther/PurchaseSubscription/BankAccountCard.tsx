import { addBankAccountApi, listBankAccountApi } from '@/api/functions/pyment';
import { queryKeys, storageKeys } from '@/config/constants';
import { PaymentCardListPaper } from '@/styles/StyledComponents/PaymentandsubscriptionStyled';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import InfoOutlineIcon from '@mui/icons-material/InfoOutlined';
import { Box, Button, CircularProgress, Paper, Stack, Tooltip, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';

export default function BankAccountCard() {
  const listBankAccntQuery = useQuery({
    queryKey: queryKeys.listBankAccount,
    queryFn: listBankAccountApi,
    refetchOnMount: true,
  });

  const addBankQuery = useQuery({
    queryKey: queryKeys.addBankLink,
    queryFn: addBankAccountApi,
    refetchOnMount: true,
  });

  const handleRedirect = () => {
    const link = addBankQuery.data?.data?.link;
    sessionStorage.setItem(
      storageKeys.sessionStorage.redirectUrl,
      '/interpreter/dashboard/payment-subscription/'
    );
    if (link) {
      window.location.href = link;
    }
  };

  if (listBankAccntQuery.isPending) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  const bankAccounts = listBankAccntQuery.data?.data || [];

  return (
    <PaymentCardListPaper className='cmn-gradiant'>
      <Paper elevation={0} className='cmn-paper-box'>
        <Box sx={{ mb: 3, p: 2, border: '1px solid #e0e0e0', borderRadius: 2 }}>
          <Box
            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <AccountBalanceIcon sx={{ mr: 1, color: 'primary.main' }} />
              <Typography
                variant='body1'
                className='cmnBolTitle'
                sx={{ marginBottom: '0 !important' }}
              >
                Linked Bank Accounts
              </Typography>
            </Box>
            <Tooltip title={'Used only for receiving payouts.'}>
              <InfoOutlineIcon />
            </Tooltip>
          </Box>

          {/* <Typography variant='h6' fontWeight={600} sx={{ mb: 2 }}>
            Linked Bank Accounts
          </Typography> */}

          <Stack spacing={1.5}>
            {bankAccounts.length
              ? bankAccounts.map(account => (
                  <Box
                    key={account.id}
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      py: 1.5,
                      px: 2,
                      '&:hover': {
                        bgcolor: 'action.hover',
                      },
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Typography variant='body1'>•••• •••• •••• {account.last4}</Typography>
                      <Typography variant='body2' color='text.secondary'>
                        - {account.bank_name}
                      </Typography>
                    </Box>
                  </Box>
                ))
              : 'No bank account is linked yet!'}
          </Stack>
        </Box>

        <Button
          variant='text'
          sx={{
            mt: 2,
            textTransform: 'none',
            color: 'primary.main',
          }}
          onClick={handleRedirect}
        >
          MANAGE BANK ACCOUNT
        </Button>
      </Paper>
    </PaymentCardListPaper>
  );
}
