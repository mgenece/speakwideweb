import { BaseApiResponse } from './common.interface';

export interface INotification {
  _id: string;
  user_id: string;
  data: {
    session_id: any;
    type:
      | 'session_requested'
      | 'earning_credited'
      | 'subscription_expired_int'
      | 'session_scheduled_int'
      | 'session_accepted'
      | 'subscription_expired_user'
      | 'session_scheduled_user'
      | 'session_updated'
      | 'scheduled_session_updated'
      | 'subscription_sharing';
    title: string;
    body: string;
  };
  uid: string;
  is_read: boolean;
  read_at: string | null;
  sent_at: string;
  isDeleted: boolean;
  __v: number;
  createdAt: string;
  updatedAt: string;
}

export interface INotificationRes extends BaseApiResponse {
  data: {
    docs: INotification[];
    limit: number;
    page: number;
    totalPages: number;
  };
}
