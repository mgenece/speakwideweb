import { IFavouriteLostRes } from '@/typescript/interface/dispute.interface';
import axiosInstance from '../axiosInstance';
import { endpoints } from '../endpoints';

export const subscribeFCMApi = async (body: { token: string }) => {
  const res = await axiosInstance.post(endpoints.other.fcmSubscribe, body);
  return res.data;
};

export const addRemoveFavouriteApi = async (id: string) => {
  const res = await axiosInstance.post(endpoints.favourite.user.addInterpreter, {
    interpreter_id: id,
  });

  return res.data;
};

export const listFavouriteApi = async () => {
  const res = await axiosInstance<IFavouriteLostRes>(endpoints.favourite.user.getAll);
  return res.data;
};
