import { useConfirmPayment } from '@/hooks/useConfirmPayment';
import { Box, Button, CircularProgress, Typography } from '@mui/material';
import { useStripe } from '@stripe/react-stripe-js';
import { useRef, useState } from 'react';
import toast from 'react-hot-toast';

interface IPaymentProcessorProps {
  clientSecret: string;
  paymentMethodId: string;
  amount?: number;
  currency?: string;
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

export default function PaymentProcessor({
  clientSecret,
  paymentMethodId,
  amount,
  currency = 'USD',
  onSuccess,
  onError,
}: IPaymentProcessorProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentCompleted, setPaymentCompleted] = useState(false);

  const confirmPaymentMutation = useConfirmPayment({
    onSuccessServer: () => {
      setPaymentCompleted(true);
      toast.success('Payment successful!');
      setIsProcessing(false);
      onSuccess?.();
    },
    onErrorServer: () => {
      onError?.('Payment cofirmed by geteway. But could not confirm by our server');
    },
  });

  const paymentAttemptedRef = useRef(false);
  const stripe = useStripe();

  const handlePayment = async () => {
    // Guard against multiple calls
    if (!stripe || !clientSecret || !paymentMethodId || isProcessing || paymentCompleted) {
      return;
    }

    // Prevent double execution (React StrictMode, double clicks, etc.)
    if (paymentAttemptedRef.current) {
      toast.error('Payment is already being processed');
      return;
    }

    paymentAttemptedRef.current = true;
    setIsProcessing(true);

    try {
      const { error, paymentIntent } = await stripe.confirmPayment({
        clientSecret,
        confirmParams: {
          payment_method: paymentMethodId,
        },
        redirect: 'if_required', // Only redirect if payment method requires it
      });

      // console.log(paymentIntent, '***PI');

      if (error) {
        const errorMessage = error.message || 'Payment failed';
        toast.error(errorMessage);
        onError?.(errorMessage);
        paymentAttemptedRef.current = false;
      } else if (paymentIntent?.id) {
        confirmPaymentMutation.mutate(paymentIntent.id);

        // setPaymentCompleted(true);
      }
    } catch (error) {
      const errorMessage = 'An error occurred during payment';
      toast.error(errorMessage);
      onError?.(errorMessage);
      console.error('Payment Error:', error);
      paymentAttemptedRef.current = false;
    }
  };

  return (
    <Box sx={{ my: 2 }}>
      {amount && (
        <Box sx={{ mb: 2, p: 2, backgroundColor: '#f5f5f5', borderRadius: 1 }}>
          <Typography variant='body2' color='text.secondary'>
            Payment Amount
          </Typography>
          <Typography variant='h6' fontWeight={600}>
            {currency} ${amount}
          </Typography>
        </Box>
      )}

      <Button
        type='button'
        variant='contained'
        color='primary'
        fullWidth
        onClick={handlePayment}
        disabled={!stripe || !clientSecret || !paymentMethodId || isProcessing || paymentCompleted}
      >
        {paymentCompleted ? (
          'Payment Completed ✓'
        ) : isProcessing ? (
          <>
            <CircularProgress size={20} color='inherit' sx={{ mr: 1 }} />
            Processing Payment...
          </>
        ) : (
          'Pay Now'
        )}
      </Button>

      {!stripe && (
        <Typography variant='caption' color='error' sx={{ mt: 1, display: 'block' }}>
          Loading payment system...
        </Typography>
      )}

      {paymentCompleted && (
        <Typography
          variant='caption'
          color='success.main'
          sx={{ mt: 1, display: 'block', textAlign: 'center' }}
        >
          ✓ Payment has been successfully processed
        </Typography>
      )}
    </Box>
  );
}
