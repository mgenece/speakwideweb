import {
  IInvitationLisrRes,
  IInvitationListRes,
} from '@/typescript/interface/invitation.interface';
import axiosInstance from '../axiosInstance';
import { endpoints } from '../endpoints';

// export const createInvitationApi = async () => {
//   const res = await axiosInstance.post(endpoints.invitation.user.createInvitation);
//   return res.data;
// };

export const inviteUsersApi = async ({
  email,
  subscriptionId,
}: {
  email: string;
  subscriptionId: string;
}) => {
  const res = await axiosInstance.post(endpoints.invitation.user.inviteUser, {
    toUserMailId: email,
    subscriptionId,
  });
  return res.data;
};

// export const inviteJoinApi = async () => {
//   const res = await axiosInstance.post(endpoints.invitation.user.join);
//   return res.data;
// };

export const inviteActionApi = async (data: {
  status: 'accepted' | 'declined' | 'revoked';
  shearingId: string;
}) => {
  const res = await axiosInstance.post(endpoints.invitation.user.action, data);
  return res.data;
};

export const inviteShareListApi = async () => {
  const res = await axiosInstance<IInvitationListRes>(endpoints.invitation.user.sharingList);
  return res.data;
};

export const inviteRemoveApi = async (id: string) => {
  const res = await axiosInstance.post(endpoints.invitation.user.remove, { userId: id });
  return res.data;
};

export const inviteListApi = async () => {
  const res = await axiosInstance.get<IInvitationLisrRes>(endpoints.invitation.user.inviteList);
  return res.data;
};
