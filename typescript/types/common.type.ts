export type userLoginData = {
  _id: string;
  full_name: string;
  role: string;
  country_code: string;
  phone: string;
  email: string;
  profile_image: string;
  ein: string;
  social_security_number: string;
  dob: string | null;
  username: string;
  isEmailOtpVerified: boolean;
  isPhoneOtpVerified: boolean;
  socialId: string;
  registerType: 'Normal' | 'Apple' | 'Google' | 'Facebook';
  isSignupCompleted: boolean;
  isApprove: 'Pending' | 'Approved' | 'Declined';
  timeZone: string;
  referral_code: string;
  isOnline: boolean;
  last_seen: string;
  deviceToken: string;
  deviceType: string;
  gender: 'Male' | 'Female' | 'Other';
  has_sms_consent?: boolean;
  socket_id: string;
  isSubscribed: boolean;
  stripeCustomerId: string;
  isProfileCompleted: boolean;
  isBusinessAdded: boolean;
  addedByAdmin: boolean;
  isDeleted: boolean;
  isAcceptAllPolicies: boolean;
  status: 'Unblock' | 'Block';
  createdAt: string;
  updatedAt: string;
  token: string;
};

export interface IInterpreterData {
  _id: string;
  full_name: string;
  role: string;
  country_code: string;
  phone: string;
  email: string;
  password: string;
  profile_image: string;
  ein: string;
  social_security_number: string;
  dob: string | null;
  username: string;
  // emailOtp: string;
  // phoneOtp: string;
  // emailOtpExpireTime: string; // ISO date string
  // phoneOtpExpireTime: string; // ISO date string
  isEmailOtpVerified: boolean;
  isPhoneOtpVerified: boolean;
  socialId: string;
  registerType: 'Normal' | 'Apple' | 'Google' | 'Facebook';
  isSignupCompleted: boolean;
  isTermsConditionsAggreed: boolean;
  isAvailabilityAdded: boolean;
  isApprove: 'Pending' | 'Approved' | 'Declined';
  timeZone: string;
  referral_code: string;
  isOnline: boolean;
  last_seen: string;
  deviceToken: string;
  deviceType: string;
  gender: 'Male' | 'Female' | 'Other';
  socket_id: string;
  isSubscribed: boolean;
  stripeCustomerId: string;
  isProfileCompleted: boolean;
  isBusinessAdded: boolean;
  addedByAdmin: boolean;
  isDeleted: boolean;
  isAcceptAllPolicies: boolean;
  status: 'Unblock' | 'Block';
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}

export {};
