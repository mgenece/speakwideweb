import {
  IDisputeCategoryRes,
  IDisputeChatHistoryRes,
  IDisputeClientRes,
  IDisputeListRes,
  IDisputeRes,
} from '@/typescript/interface/dispute.interface';
import axiosInstance from '../axiosInstance';
import { endpoints } from '../endpoints';

export const disputeCategoryListApi = async (type: string) => {
  const res = await axiosInstance<IDisputeCategoryRes>(
    `${endpoints.dispute.user.categoryList}/?type_roles=${type}`
  );
  return res.data;
};

export const createDisputeApi = async (body: FormData) => {
  const res = await axiosInstance.post(endpoints.dispute.user.create, body);
  return res.data;
};

export const disputeListUserApi = async (body: {
  list_type: 'Pending' | 'Resolved' | 'Declined' | '';
  page: number;
  limit: number;
  search: string;
  sort_order: 'asc' | 'desc';
}) => {
  const res = await axiosInstance.post<IDisputeListRes>(endpoints.dispute.user.list, {
    ...body,
    sort_field: 'date_initiated',
  });
  return res.data;
};

export const createDisputeIntApi = async (body: FormData) => {
  const res = await axiosInstance.post(endpoints.dispute.interpreter.create, body);
  return res.data;
};

export const disputeListIntApi = async (body: {
  list_type: 'Pending' | 'Resolved' | 'Declined' | '';
  page: number;
  limit: number;
}) => {
  const res = await axiosInstance.post<IDisputeListRes>(endpoints.dispute.interpreter.list, body);
  return res.data;
};

export const disputeDetailIntApi = async (id: string) => {
  const res = await axiosInstance.get<IDisputeRes>(endpoints.dispute.interpreter.detail(id));
  return res.data;
};

export const disputeDetailClientApi = async (id: string) => {
  const res = await axiosInstance.get<IDisputeClientRes>(endpoints.dispute.user.detail(id));
  return res.data;
};

export const disputeChatHistory = async ({
  type,
  disputeId,
}: {
  type: 'client' | 'interpreter';
  disputeId: string;
}) => {
  const payload = {
    page: 1,
    limit: 100000000,
    sender_type: type,
    ...(type === 'client'
      ? { client_dispute_id: disputeId }
      : { interpreter_dispute_id: disputeId }),
  };

  const res = await axiosInstance.post<IDisputeChatHistoryRes>(
    endpoints.dispute.chatHistory,
    payload
  );

  return res.data;
};

export const supportChatHistory = async (type: 'client' | 'interpreter') => {
  const payload = {
    page: 1,
    limit: 100000000,
    sender_type: type,
  };

  const res = await axiosInstance.post<IDisputeChatHistoryRes>(
    endpoints.dispute.chatHistory,
    payload
  );

  return res.data;
};

export const initiateChatApi = async (type: 'client' | 'interpreter') => {
  const res = await axiosInstance.post(endpoints.dispute.chatInitiate, {
    sender_type: type,
  });

  return res.data;
};
