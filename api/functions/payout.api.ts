import { IEarningRes, IPayoutRes } from '@/typescript/interface/payout.interface';
import axiosInstance from '../axiosInstance';
import { endpoints } from '../endpoints';

export const getEarning = async (body: {
  list_type: 'request';
  page: number;
  limit: number;
  sortField?: string;
  sortOrder?: 'asc' | 'desc';
  from?: string;
  to?: string;
}) => {
  const res = await axiosInstance.post<IEarningRes>(endpoints.payout.earning, body);
  return res.data;
};

export const getPayoutApi = async (body: {
  page: number;
  limit: number;
  sortField: 'createdAt';
  sortOrder: 'asc' | 'desc';
}) => {
  const res = await axiosInstance.post<IPayoutRes>(endpoints.payout.payout, body);
  return res.data;
};
