import { IWeeklySchedule } from '@/api/functions/auth.api';
import { ISubscriptionKey } from './auth.interface';
import { BaseApiResponse } from './common.interface';

export interface IProfileInterpreter {
  _id: string;
  full_name: string;
  country_code: string;
  phone: string;
  email: string;
  profile_image: string;
  dob: string | null;
  username: string;
  isSignupCompleted: boolean;
  isTermsConditionsAggreed: boolean;
  isAvailabilityAdded: boolean;
  isApprove: 'Pending' | 'Approved' | 'Rejected' | string; // extend as needed
  gender: 'Male' | 'Female' | 'Other' | string;
  isProfileCompleted: boolean;
  user_role: {
    _id: string;
    role: string;
    roleDisplayName: string;
  };
  languages: {
    _id: string;
    language_display_name: string;
  }[];
  areas_of_expertise: {
    _id: string;
    expertise_display_name: string;
  }[];
  availability: {
    _id: string;
    weeklySchedule: IWeeklySchedule[];
    offDates: { date: string }[];
  };
  address: string;
  objectives: string;
  isCertified: boolean;
  certificate_documents: {
    document: string;
    expiration_date: string; // ISO date string
    _id: string;
  }[];
  identity_proofs: string[];
  personaInquiryId: string;
  personaVerifyStatus: 'approved' | 'pending' | 'rejected' | string;
  average_rating: number;
  total_reviews: number;
  social_security_number: string;
  ein: string;
  isBankAccountAdded: boolean;
  subscriptionDetails?: ISubscriptionKey;
}

export interface IProfileInterpreterRes extends BaseApiResponse {
  data: IProfileInterpreter;
}

export interface IUserRole {
  _id: string;
  role: string;
  roleDisplayName: string;
}

export interface IUserBusinessSector {
  _id: string;
  title: string;
}

export interface IUserBusinessInfo {
  _id: string;
  business_logo?: string | null;
  business_name?: string | null;
  business_email?: string | null;
  business_phone?: string | null;
  business_sector?: IUserBusinessSector | null;
  business_website?: string | null;
  representative_name?: string | null;
  representative_title?: string | null;
  street?: string | null;
  city?: string | null;
  state?: string | null;
  zipcode?: string | null;
  isDeleted?: boolean;
}

export interface ISharedData {
  // sharedWith: {
  //   userId: string;
  //   acceptedAt: string | null;
  //   status: 'pending' | 'accepted' | 'rejected';
  //   permissions: {
  //     canInviteOthers: boolean;
  //     canManageSubscription: boolean;
  //   };
  //   _id: string;
  //   invitedAt: string; // ISO date string
  // };
  ownerDetails: {
    _id: string;
    full_name: string;
    email: string;
  };
  parentSubscriptionDetails: {
    status: 'active' | 'inactive' | 'canceled';
    currentPeriodStart: string; // ISO date string
    currentPeriodEnd: string; // ISO date string
  };
}

export interface IUser {
  _id: string;
  full_name?: string;
  country_code?: string;
  sharedSubscription?: ISharedData;
  phone?: string;
  email?: string;
  profile_image?: string | null;
  dob?: string | null; // or Date depending on your parsing strategy
  username?: string;
  gender?: string;
  user_role?: IUserRole;
  user_business_info?: IUserBusinessInfo | null;
  subscriptionDetails?: ISubscriptionKey;
}

export interface IUserRes extends BaseApiResponse {
  data: IUser;
}
