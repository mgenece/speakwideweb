import { Box, CircularProgress, IconButton } from '@mui/material';

import { listCardApi, listSavedBankApi } from '@/api/functions/pyment';
import { queryKeys } from '@/config/constants';
import CrossIcon from '@/ui/Icons/CrossIcon';
import MuiModalWrapper from '@/ui/Modal/MuiModalWrapper';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import ButtonCommon from '../layouts/common/ButtonCommon';
import AddCardSection from './AddCardSection';
import ListCardSection from './ListCardSection';

interface IProps {
  getPaymentMethodId: (id: string) => void;
  cardAddSuccess: () => void;
}

function StripeSection({ getPaymentMethodId, cardAddSuccess }: IProps) {
  const listCardsQuery = useQuery({
    queryKey: queryKeys.listCard,
    queryFn: listCardApi,
  });
  const listBankQuery = useQuery({ queryKey: queryKeys.listBank, queryFn: listSavedBankApi });

  // console.log(listBankQuery.data?.data, '***b');
  const [addCardModal, setAddCardModal] = useState(false);

  const paymentList = listCardsQuery.data?.data?.data || [];
  const bankList = listBankQuery.data?.data || [];

  if (listCardsQuery.isLoading || listBankQuery.isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      {/* Saved Cards Section */}
      {paymentList?.length > 0 || bankList?.length > 0 ? (
        <Box>
          <ListCardSection
            paymentList={{ card: paymentList, bank: bankList }}
            getPaymentMethodId={getPaymentMethodId}
          />
          <ButtonCommon
            onClick={() => {
              setAddCardModal(true);
              // console.log('***addCard');
            }}
          >
            Add payment method
          </ButtonCommon>
        </Box>
      ) : (
        <AddCardSection
          SuccessAction={() => {
            cardAddSuccess();
          }}
        />
      )}
      <MuiModalWrapper
        open={addCardModal}
        onClose={() => {
          setAddCardModal(false);
        }}
        className='sessionModalPricing'
      >
        <Box sx={{ position: 'relative' }}>
          <IconButton
            onClick={() => {
              setAddCardModal(false);
            }}
            sx={{ position: 'absolute', right: 0 }}
          >
            <CrossIcon />
          </IconButton>
          <AddCardSection
            SuccessAction={() => {
              setAddCardModal(false);
              cardAddSuccess();
            }}
          />
        </Box>
      </MuiModalWrapper>
    </Box>
  );
}

export default StripeSection;
