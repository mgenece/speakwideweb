import {
  IEditSessionRes,
  InterpreterSessionResponse,
  IRequestSessionRes,
  ISessionClientRes,
  ISessionDetailInterpreterRes,
  ISessionFeedback,
} from '@/typescript/interface/session.interface';
import axiosInstance from '../axiosInstance';
import { endpoints } from '../endpoints';

interface IClientListBody {
  list_type: 'request' | 'schedule' | 'completed';
  search?: string;
  sortField?: string;
  sortOrder?: 'desc' | 'asc';
  page: number;
  length: number;
}

export const getClientSessions = async (body: IClientListBody) => {
  const res = await axiosInstance.post<ISessionClientRes>(endpoints.session.user.list, body);
  return res.data;
};

export const getInterpreterSessions = async (body: IClientListBody) => {
  const res = await axiosInstance.post<InterpreterSessionResponse>(
    endpoints.session.interpreter.list,
    body
  );
  return res.data;
};

export const requestSessionApi = async (body: FormData) => {
  const res = await axiosInstance.post<IRequestSessionRes>(
    endpoints.session.user.requestSession,
    body
  );
  return res.data;
};

export const sessionDetailInterpreterApi = async (id: string) => {
  const res = await axiosInstance.get<ISessionDetailInterpreterRes>(
    `${endpoints.session.interpreter.detail}/${id}`
  );
  return res.data;
};

export const approveSessionApi = async (id: string) => {
  const res = await axiosInstance.get(`${endpoints.session.interpreter.approve}/${id}`);
  return res.data;
};

export const rejectSessionApi = async (id: string) => {
  const res = await axiosInstance.get(`${endpoints.session.interpreter.reject}/${id}`);
  return res.data;
};

export const cancelSessionApi = async (id: string) => {
  const res = await axiosInstance(`${endpoints.session.user.cancel}/${id}`);
  return res.data;
};

export const submitReview = async (body: ISessionFeedback) => {
  const res = await axiosInstance.post(endpoints.session.user.dispute, body);
  return res.data;
};

export const editSessionApi = async (body: FormData) => {
  const res = await axiosInstance.post<IEditSessionRes>(endpoints.session.user.edit, body);
  return res.data;
};

export const updatedSessionAproveRejectApi = async (body: {
  status: 'approve' | 'reject';
  id: string;
}) => {
  const { status, id } = body;
  const res = await axiosInstance.get(
    `${endpoints.session.interpreter.updatedApproveReject}/${status}/${id}`
  );

  return res.data;
};

export const clientCalenderApi = async (body: { start_date: string; end_date: string }) => {
  const res = await axiosInstance.post<ISessionClientRes>(endpoints.session.user.list, {
    ...body,
    length: 9000000,
  });
  return res.data;
};
