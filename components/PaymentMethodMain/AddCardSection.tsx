import { addCardApi } from '@/api/functions/pyment';
import { queryKeys } from '@/config/constants';
import { Box, Button, Typography } from '@mui/material';

import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import toast from 'react-hot-toast';

interface IProps {
  SuccessAction?: () => void;
}

function AddCardSection({ SuccessAction }: IProps) {
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();
  const addCardMutation = useMutation({
    mutationFn: addCardApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.listCard });
      queryClient.invalidateQueries({ queryKey: queryKeys.listBank });
    },
  });

  const stripe = useStripe();
  const elements = useElements();

  const handlePayment = async () => {
    if (!stripe || !elements) return;

    setLoading(true);
    const result = await stripe.confirmSetup({
      elements,
      redirect: 'if_required',
    });
    setLoading(false);

    if (result.error) {
      toast.error(result.error.message || 'Payment error');
    } else if (result.setupIntent) {
      addCardMutation.mutate(
        { paymentMethodId: result.setupIntent.payment_method as string },
        {
          onSuccess: () => {
            SuccessAction && SuccessAction();
            toast.success('Card saved successfully!');
          },
          onError: () => {
            toast.error('Failed to save card');
          },
        }
      );
    }
  };
  return (
    <>
      <Typography variant='h3' className='cmnBolTitle' sx={{ mb: 2 }}>
        Add New Payment Method
      </Typography>
      <form>
        {/* Stripe Payment Element */}
        <Box sx={{ mb: 3 }}>
          <PaymentElement />
        </Box>

        <Button
          type='button'
          variant='contained'
          color='primary'
          fullWidth
          disabled={loading || addCardMutation.isPending}
          onClick={handlePayment}
          sx={{ mt: 3 }}
        >
          {loading || addCardMutation.isPending ? 'Processing...' : 'Add'}
        </Button>
      </form>
    </>
  );
}

export default AddCardSection;
