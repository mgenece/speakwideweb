import { IProfileInterpreterRes, IUserRes } from '@/typescript/interface/profile.interface';
import axiosInstance from '../axiosInstance';
import { endpoints } from '../endpoints';

export const userProfileApi = async () => {
  const res = await axiosInstance.get<IUserRes>(endpoints.profile.user.profileData);
  return res.data;
};

export const interpreterProfileApi = async () => {
  const res = await axiosInstance.get<IProfileInterpreterRes>(
    endpoints.profile.interpreter.profileData
  );
  return res.data;
};

export const interpreterProfileUpdateApi = async (body: FormData) => {
  const res = await axiosInstance.post(endpoints.profile.interpreter.updateProfile, body);
  return res.data;
};

export const userProfileUpdateApi = async (body: FormData) => {
  const res = await axiosInstance.post(endpoints.profile.user.updateProfile, body);
  return res.data;
};

export const intPasswordChangeApi = async (body: {
  old_password: string;
  new_password: string;
  confirm_password: string;
}) => {
  const res = await axiosInstance.post(endpoints.profile.interpreter.changePassword, body);
  return res.data;
};
