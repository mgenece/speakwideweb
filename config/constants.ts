import { getCookie } from '@/lib/functions/storage.lib';

export const maxFileSize = 2000000;

export const storageKeys = {
  cookies: {
    jwtToken: process.env.NEXT_APP_TOKEN_NAME as string,
    refreshToken: `${process.env.NEXT_APP_TOKEN_NAME}-refresh`,
    userRole: `${process.env.NEXT_APP_PROJECT_NAME}-role`,
    onBoardToken: `${process.env.NEXT_APP_TOKEN_NAME}-onboard`,
    fcmToken: `${process.env.NEXT_APP_TOKEN_NAME}-fcm`,
  },
  localStorage: {},
  sessionStorage: {
    onBoardData: `${process.env.NEXT_APP_PROJECT_NAME}-onboard`,
    otpEmail: `${process.env.NEXT_APP_PROJECT_NAME}-email`,
    otpPhone: `${process.env.NEXT_APP_PROJECT_NAME}-phone`,
    forgotOtp: `${process.env.NEXT_APP_PROJECT_NAME}-forgot`,
    redirectUrl: `${process.env.NEXT_APP_PROJECT_NAME}-redirecturl`,
    hasSmsConsent: `${process.env.NEXT_APP_PROJECT_NAME}-sms-consent`,
  },
};
const token =
  getCookie(storageKeys.cookies.jwtToken) || getCookie(storageKeys.cookies.onBoardToken) || '';
export const queryKeys = {
  langList: ['language-list', token],
  areaOfExpertise: ['Area-of-expertise', token],
  businessList: ['business-list', token],
  interpreterProfileData: ['interpreter-profile-data', token],
  userProfoleData: ['user-profile-data', token],
  interpreterSubscriptionList: ['interpreter-subscription-data'],
  interpreterSessionList: (status: string) => ['interpreter-session-list', status, token],
  clientSessionList: (status: string) => ['user-session-list', status, token],
  interpreterSessionDetail: (id: string) => ['interpreter-session-details', id, token],
  userSessionList: (status: string) => ['user-session-list', status, token],
  userSubscriptionList: ['subscription-user-list', token],
  userPriceList: ['subscription-price-user-list', token],
  listCard: ['userCardsList', token],
  listBank: ['list-bank', token],
  listBankAccount: ['list-bank-account', token],
  addBankLink: ['add-bank-account', token],
  createSetupIntent: ['create-setup-intent', token],
  sessionFormat: ['session-format', token],
  pricingPlanList: (type: string) => ['pricing-plan-list', type, token],
  notificationListAll: ['notifications-list-all', token],
  unreadNotificationCount: ['unread-count', token],
  listFavourite: ['list-all-favourites', token],
  userDisputeList: (status: string) => ['list-dispute-user-all', token, status],
  invitationList: ['list-invited-users', token],
};

// const token = getCookie(storageKeys.cookies.jwtToken);
