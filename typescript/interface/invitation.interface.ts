import { BaseApiResponse } from './common.interface';

interface ISubscriptionShare {
  _id: string;
  toUserMailId: string;
  status: 'pending' | 'accepted' | 'rejected' | 'revoked';
  grantedAt: null | string;
  createdAt: string;
}

export interface IInvitationListRes extends BaseApiResponse {
  data: ISubscriptionShare[];
}

export interface ISubscriptionGift {
  _id: string;
  subscriptionId: string;
  toUserMailId: string;
  toUserId: string;
  status: 'pending' | 'accepted' | 'rejected'; // adjust if needed
  grantedAt: string | null;
  createdAt: string;

  plan: {
    title: string;
    price: number;
    type: string;
  };

  senderUserDetails: {
    full_name: string;
    phone: string;
    email: string;
  };
}

export interface IInvitationLisrRes extends BaseApiResponse {
  data: ISubscriptionGift[];
}
