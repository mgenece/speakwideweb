import {
  IPlanUserRes,
  ISubscriptionInterpreterRes,
  ISubscriptionPlanUser,
} from '@/typescript/interface/subscription.interface';
import axiosInstance from '../axiosInstance';
import { endpoints } from '../endpoints';

export const subscriptionListInterpreterApi = async () => {
  const res = await axiosInstance.get<ISubscriptionInterpreterRes>(
    endpoints.subscription.interpreter.subscriptionList
  );
  return res.data;
};

export const subscriptionListUserApi = async () => {
  const res = await axiosInstance.get<ISubscriptionPlanUser>(
    endpoints.subscription.user.subscriptionList
  );
  return res.data;
};

export const pricingListUserApi = async () => {
  const res = await axiosInstance.get<IPlanUserRes>(endpoints.subscription.user.pricingPlan);
  return res.data;
};
