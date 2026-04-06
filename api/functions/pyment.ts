import { storageKeys } from '@/config/constants';
import { ICreateSetupIntentRes } from '@/typescript/interface/payment.interface';
import {
  IAllCardsRes,
  IBankAccountPaymentRes,
  IListBankAccountRes,
  ISubscriptionDataRes,
  ITaxUrl,
  ITransactionRes,
} from '@/typescript/interface/subscription.interface';
import axios from 'axios';
import { parseCookies } from 'nookies';
import axiosInstance from '../axiosInstance';
import { baseUrlApi, endpoints } from '../endpoints';

export const createSetupIntentUserApi = async () => {
  const res = await axiosInstance.post<ICreateSetupIntentRes>(endpoints.payment.user.setupIntent);
  return res.data;
};

export const addCardApi = async (body: { paymentMethodId: string }) => {
  const res = await axiosInstance.post(endpoints.payment.user.addCard, body);
  return res.data;
};

export const listCardApi = async () => {
  const res = await axiosInstance.get<IAllCardsRes>(endpoints.payment.user.listCards);
  return res.data;
};

export const deleteCardApi = async (body: { cardId: string }) => {
  const res = await axiosInstance.post(endpoints.payment.user.deleteCard, body);
  return res.data;
};

export const createPaymentIntentApi = async (body: {
  priceId: string;
  paymentMethodId: string;
}) => {
  const res = await axiosInstance.post<{
    data: {
      client_secret: string;
      subscriptionId: string;
    };
  }>(endpoints.payment.user.createPaymentIntent, body);
  return res.data;
};

export const getSubscriptionDetailsApi = async (id: string) => {
  const cookies = parseCookies();
  const token = cookies[storageKeys.cookies.jwtToken];
  const onboardToken = cookies[storageKeys.cookies.onBoardToken];

  const res = await axios.get<ISubscriptionDataRes>(
    `${baseUrlApi}${endpoints.payment.user.subscriptionDetails}/${id}`,
    {
      headers: {
        'x-access-token': token || onboardToken,
      },
    }
  );

  return res.data;
};

export const addBankAccountApi = async () => {
  const res = await axiosInstance.get<{
    data: {
      link: string;
    };
  }>(endpoints.payment.interpreter.addBankAcnt);
  return res.data;
};

export const listBankAccountApi = async () => {
  const res = await axiosInstance.get<IListBankAccountRes>(
    endpoints.payment.interpreter.listBankAcnt
  );
  return res.data;
};

export const listTransactionHistoryApi = async (body: {
  type: 'subscription' | 'session' | 'refund' | '';
  page: number;
  limit: number;
  from?: string;
  to?: string;
}) => {
  const res = await axiosInstance.post<ITransactionRes>(
    endpoints.payment.user.transactionHistory,
    body
  );
  return res.data;
};

export const addBankAccountStatusApi = async (status: boolean) => {
  const res = await axiosInstance.put(endpoints.payment.interpreter.addBankAccount, {
    isBankAccountAdded: status,
  });
  return res.data;
};

export const getInvoiceApi = async (id: string) => {
  const res = await axiosInstance.get<{ data: { url: string } }>(
    `${endpoints.payment.user.downloadInvoice}/${id}`
  );
  return res.data;
};

export const paymentStatusApi = async (id: string) => {
  const cookies = parseCookies();
  const token = cookies[storageKeys.cookies.jwtToken];
  const onboardToken = cookies[storageKeys.cookies.onBoardToken];
  const res = await axios.post(
    endpoints.payment.confirmPayment,
    { paymentIntentId: id },
    {
      headers: {
        'x-access-token': token || onboardToken,
      },
    }
  );
  return res.data;
};

export const getTaxInfoApi = async () => {
  const res = await axiosInstance.get<ITaxUrl>(endpoints.payment.interpreter.taxInfoUrl);
  return res.data;
};

export const listSavedBankApi = async () => {
  const res = await axiosInstance.get<IBankAccountPaymentRes>(endpoints.payment.listBanks);
  return res.data;
};

export const setDefaultPaymentApi = async (body: { paymentMethodId: string }) => {
  const res = await axiosInstance.post(endpoints.payment.defaultPayment, body);
  return res.data;
};
