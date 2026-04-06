import { paymentStatusApi } from '@/api/functions/pyment';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

interface IUseConfirmPaymentOptions {
  onSuccessServer: () => void;
  onErrorServer: () => void;
}

export function useConfirmPayment({ onSuccessServer, onErrorServer }: IUseConfirmPaymentOptions) {
  return useMutation({
    mutationFn: paymentStatusApi,
    retry: 10,
    retryDelay: () => {
      return 3000;
    },
    onSuccess: () => {
      onSuccessServer();
    },
    onError: (error: Error) => {
      const errorMessage = 'Failed to confirm payment on server';
      toast.error(errorMessage);
      onErrorServer?.();
      console.error('Server confirmation error:', error);
    },
  });
}
