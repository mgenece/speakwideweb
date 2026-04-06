import { BaseApiResponse } from './common.interface';

interface ISessionInfo {
  _id: string;
  session_ref_number: string;
  start_date_time: string;
  end_date_time: string;
  price: number;
  isPaid: boolean;
}

interface IClientInfo {
  _id: string;
  full_name: string;
  profile_image: string;
}

export interface IEarning {
  _id: string;
  amount: number;
  currency: string;
  receiptUrl: string;
  createdAt: string;
  session: ISessionInfo;
  client: IClientInfo;
}

export interface IEarningRes extends BaseApiResponse {
  data: {
    docs: {
      earnings: IEarning[];
      totalEarning: number;
    };
    limit: number;
    page: number;
    pages: number;
    total: number;
  };
}

export interface IPayoutDoc {
  _id: string;
  interpreter_id: string;
  next_payout_date: string;
  last_payout_amount: number;
  lastPayoutDate: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface IPayoutList {
  docs: IPayoutDoc[];
  total: number;
  limit: number;
  page: number;
  pages: number;
}

export interface IPayoutRes extends BaseApiResponse {
  data: IPayoutList;
}
