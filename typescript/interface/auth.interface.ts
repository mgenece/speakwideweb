import { IInterpreterData } from '../types/common.type';
import { BaseApiResponse } from './common.interface';

export interface IOtpVerifyRes extends BaseApiResponse {
  data: {
    token: string;
    refresh_token: string;
  };
}

export interface ISubscriptionKey {
  _id: string;
  subscriptionId: string;
  isSheared?: boolean;
  status:
    | 'past_due'
    | 'incomplete'
    | 'incomplete_expired'
    | 'trialing'
    | 'active'
    | 'canceled'
    | 'unpaid';
  planDetails: {
    _id: string;
    title: string;
    price: number;
    no_of_users: number;
  };
}

interface IUserRole {
  _id: string;
  role: 'interpreter' | 'user';
  roleDisplayName: string;
}

interface ILoginUser {
  _id: string;
  full_name: string;
  country_code: string;
  phone: string;
  email: string;
  profile_image: string;
  dob: string | null;
  username: string;
  isEmailOtpVerified: boolean;
  isPhoneOtpVerified: boolean;
  isSignupCompleted: boolean;
  gender: string;
  isProfileCompleted: boolean;
  isBusinessAdded: boolean;
  has_sms_consent?: boolean;
  user_role: IUserRole;
  subscriptionDetails?: ISubscriptionKey;
}

export interface ILoginRes extends BaseApiResponse {
  data: ILoginUser;
  token: string;
  refresh_token: string;
}

export interface IVerifyOtpForgot extends BaseApiResponse {
  data: {
    resetToken: string;
  };
}

export interface IAgentProfile {
  fullName: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
  socialSecurityNumber?: string;
  ein?: string;
}

export interface IInterSignupRes extends BaseApiResponse {
  data: {
    user: IInterpreterData;
    token: string;
  };
}

export interface IPersonaVerify extends BaseApiResponse {
  data: {
    user: {
      email: string;
      personaInquiryId: null | string;
      personaVerifyStatus: 'pending' | 'approved' | string;
      _id: string;
    };
  };
}

export interface ILoginnterpreterRes extends BaseApiResponse {
  data: {
    _id: string;
    full_name: string;
    country_code: string;
    phone: string;
    email: string;
    profile_image: string;
    dob: null | string | Date;
    username: string;
    isSignupCompleted: boolean;
    isTermsConditionsAggreed: boolean;
    isAvailabilityAdded: boolean;
    isApprove: 'Pending' | 'Approved' | 'Rejected';
    gender: 'Male' | 'Female' | 'Other';
    isProfileCompleted: boolean;
    user_role: IUserRole;
    personaVerifyStatus: 'approved' | 'pending' | 'rejected' | 'completed';
    subscriptionDetails?: ISubscriptionKey;
    isBankAccountAdded: boolean;
  };
}
