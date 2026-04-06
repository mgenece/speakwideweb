import { BaseApiResponse } from './common.interface';

// Exact mapping of the JSON you provided
export interface IPayFrequencyInter {
  interval: string; // e.g. 'Monthly' | 'Weekly'
  frequency: number;
}

export interface IPlanFeaturesInter {
  pay_frequency: IPayFrequencyInter;
  no_of_sessions?: number;
  isUnlimitedSession?: boolean;
  priority_response: boolean;
  allday_support: boolean;
}

export interface ISubscriptionPlanInter {
  free_trial_in_days: any;
  _id: string;
  title: string;
  price: number;
  stripeProductId: string; // corrected key name to match new data
  stripePriceId: string;
  plans: IPlanFeaturesInter;
  status: string; // 'Active' | 'Inactive'
}

export interface ISubscriptionInterpreterRes extends BaseApiResponse {
  data: ISubscriptionPlanInter[];
}

// subscription.types.ts

export type TSubscriptionStatus = 'Active' | 'Inactive' | 'Archived' | string;

export interface IPlanFeatures {
  no_of_users: number;
  certified_interpreter_access: boolean;
  audio: boolean;
  video: boolean;
  asl: boolean;
  simultaneous: boolean;
  translation: boolean;
  isUnlimitedTranslation: boolean;
  no_of_pages: number | null; // nullable in source
  priority_response: boolean;
  allday_support: boolean;
  trial_days: string;
}

export interface ISubscriptionPlan {
  _id: string;
  title: string;
  price: number;
  stripePriceId: string;
  stripeProductId: string;
  plans: IPlanFeatures;
  status: TSubscriptionStatus;
  free_trial_in_days: number;
  type: 'monthly' | 'yearly';
}

export interface ISubscriptionPlanUser extends BaseApiResponse {
  data: ISubscriptionPlan[];
}

export interface IPlanSession {
  _id: string;
  area_of_expertise_id: string;
  session_format_id: string;
  price: number;
  interpreter_type: 'Certified' | 'Qualified';
  status: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  areaofexpertiseDetails: {
    _id: string;
    expertise_display_name: string;
  };
  sessionformatDetails: {
    _id: string;
    title: 'Audio' | 'Video' | 'On-site (2 hour minimum)';
  };
}

export interface IPlanUserRes extends BaseApiResponse {
  data: IPlanSession[];
}

export interface IPaymentMethod {
  id: string;
  object: string;
  allow_redisplay: string;
  billing_details: {
    address: {
      city: string | null;
      country: string | null;
      line1: string | null;
      line2: string | null;
      postal_code: string | null;
      state: string | null;
    };
    email: string | null;
    name: string | null;
    phone: string | null;
    tax_id: string | null;
  };
  card: {
    brand: string;
    checks: {
      address_line1_check: string | null;
      address_postal_code_check: string | null;
      cvc_check: string | null;
    };
    country: string;
    display_brand: string;
    exp_month: number;
    exp_year: number;
    fingerprint: string;
    funding: string;
    generated_from: string | null;
    last4: string;
    networks: {
      available: string[];
      preferred: string | null;
    };
    regulated_status: string;
    three_d_secure_usage: {
      supported: boolean;
    };
    wallet: string | null;
  };
  created: number;
  customer: string;
  livemode: boolean;
  metadata: Record<string, string>;
  isDefault: boolean;
  type: string;
}

export interface IAllCardsRes extends BaseApiResponse {
  data: {
    data: IPaymentMethod[];
  };
}

export interface IPlanDetails {
  no_of_users: number;
  certified_interpreter_access: boolean;
  audio: boolean;
  video: boolean;
  asl: boolean;
  simultaneous: boolean;
  translation: boolean;
  no_of_pages: number;
  priority_response: boolean;
  allday_support: boolean;
}

export interface ISubscripPlan {
  _id: string;
  role: string;
  title: string;
  price: number;
  stripeProductId: string;
  stripePriceId: string;
  plans: IPlanDetails;
  status: 'Active' | 'Inactive';
  isDeleted: boolean;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  type: 'monthly' | 'yearly' | string; // in case other types exist later
}

export interface ISubscriptionData {
  planName: string;
  invoiceNumber: string;
  invoiceUrl: string;
  transactionId: string;
  transactionDateTime: string; // ISO date string
  card: string;
  transactionAmount: number;
  invoiceId: string;
  currentPeriodEnd: string;
  plan: ISubscripPlan;
}

export interface ISubscriptionDataRes extends BaseApiResponse {
  data: ISubscriptionData;
}

export interface IBankAccount {
  id: string;
  object: string;
  account: string;
  account_holder_name: string | null;
  account_holder_type: string | null;
  account_type: string | null;
  available_payout_methods: string[];
  bank_name: string;
  country: string;
  currency: string;
  default_for_currency: boolean;
  fingerprint: string;
  future_requirements: IRequirements;
  last4: string;
  metadata: Record<string, string>;
  requirements: IRequirements;
  routing_number: string;
  status: string;
}

export interface IRequirements {
  currently_due: string[];
  errors: string[];
  past_due: string[];
  pending_verification: string[];
}

export interface IListBankAccountRes extends BaseApiResponse {
  data: IBankAccount[];
}

export interface ITransaction {
  _id: string;
  paymentMethodId: string;
  amount: number;
  currency: string;
  invoiceId: string;
  status: string;
  receiptUrl: string;
  createdAt: string;
  subscriptionDetails?: {
    subscriptionId: string;
    planTitle: string;
    planPrice: number;
  };
  sessionDetils?: {
    _id: string;
    session_ref_number: string;
    language_one: string;
    language_two: string;
    interpreterName: string;
  };
}

export interface ITransactionRes extends BaseApiResponse {
  data: {
    docs: ITransaction[];
    limit: number;
    pages: number;
    total: number;
  };
}

export interface ITaxUrl extends BaseApiResponse {
  data: {
    link: string;
  };
}

export interface IBankAccountPayment {
  id: string;
  bankName: string;
  last4: string;
  routingNumber: string;
  accountType: 'individual' | 'company';
  accountCategory: 'checking' | 'savings';
  status: 'ach';
  isDefault: boolean;
  fingerprint: string;
  created: number; // Unix timestamp (seconds)
}

export interface IBankAccountPaymentRes extends BaseApiResponse {
  data: IBankAccountPayment[];
}
