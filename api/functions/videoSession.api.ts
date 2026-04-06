import {
  IChatFileRes,
  IChatHistoryRes,
  IVonageTokenRes,
} from '@/typescript/interface/vonage.interface';
import axiosInstance from '../axiosInstance';
import { endpoints } from '../endpoints';

interface ISaveChatPayload {
  sessionId: string;
  senderName: string;
  message: string;
}

export const uploadFileApi = async (body: FormData) => {
  const res = await axiosInstance.post<IChatFileRes>(endpoints.videoSession.chat.fileUpload, body);
  return res.data;
};

export const saveChatApi = async (body: ISaveChatPayload) => {
  const res = await axiosInstance.post(endpoints.videoSession.chat.chatHistorySave, body);
  return res.data;
};

export const getChatHistoryApi = async ({
  sessionId,
  page = 1,
  limit = 999999999,
}: {
  sessionId: string;
  page?: number;
  limit?: number;
}) => {
  const res = await axiosInstance.get<IChatHistoryRes>(
    `${endpoints.videoSession.chat.getChatHistory}?sessionId=${sessionId}&page=${page}&limit=${limit}`
  );
  return res.data;
};

export const getVonageToken = async (sessionId: string) => {
  const res = await axiosInstance.get<IVonageTokenRes>(
    `${endpoints.videoSession.getToken}${sessionId}`
  );
  return res.data;
};
