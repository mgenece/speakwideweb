import { INotificationRes } from '@/typescript/interface/notification.interface';
import axiosInstance from '../axiosInstance';
import { endpoints } from '../endpoints';

export const getAllNotificationApi = async (body: { page: number; limit: number }) => {
  const { page, limit } = body;
  const res = await axiosInstance<INotificationRes>(
    `${endpoints.notifications.all}?page=${page}&limit=${limit}`
  );
  return res.data;
};

export const getNotificationUnreadCount = async () => {
  const res = await axiosInstance(endpoints.notifications.unreadCount);
  return res.data;
};

export const markReadApi = async (id: string) => {
  const res = await axiosInstance.put(endpoints.notifications.read(id));
  return res.data;
};

export const markReadAllApi = async () => {
  const res = await axiosInstance.put(endpoints.notifications.readAll);
  return res.data;
};
