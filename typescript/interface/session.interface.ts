import { BaseApiResponse } from './common.interface';

export interface IInterpreterSession {
  _id: string;
  vonage_session_id: string;
  location: string;
  start_date_time: string;
  end_date_time: string;
  link_to_join: string;
  client: string;
  language_one: string;
  language_two: string;
  type: string;
  format: string;
  session_ref_number?: string;
  client_profile_image: string;
}

export interface ISessionMeta {
  totalDocs: number;
  skip: number;
  page: number;
  totalPages: number;
  limit: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: number | null;
  nextPage: number | null;
}

export interface InterpreterSessionResponse extends BaseApiResponse {
  data: {
    meta: ISessionMeta;
    docs: IInterpreterSession[];
  };
}

export interface ISessionDetailInterpreter {
  _id: string;
  language_one: {
    _id: string;
    language_display_name: string;
  };
  language_two: {
    _id: string;
    language_display_name: string;
  };
  type: {
    _id: string;
    expertise_display_name: string;
  };
  format: {
    _id: string;
    title: string;
  };
  location: string | null;
  start_date_time: string; // ISO date string
  end_date_time: string; // ISO date string
  link_to_join: string;
  session_ref_number: string;
  details: string;
  document: File[]; // You can replace `any` with a proper file/document type if known
  approvedBy: null | {
    _id: string;
    full_name: string;
    email: string;
    profile_image: string;
  };
  preferred_gender: string;
  client: {
    _id: string;
    full_name: string;
    phone: string;
    email: string;
    profile_image: string;
  };
  sessionDetailInterpreterApi?: number;
  is_update_requested?: boolean;
  update_request_count?: number;
}

export interface ISessionDetailInterpreterRes extends BaseApiResponse {
  data: ISessionDetailInterpreter;
}

export interface IRequestSessionRes extends BaseApiResponse {
  data: {
    clientSecret: string;
    paymentIntentId: string;
    amount: number;
    platform_fee_amount: string;
  };
}

export interface IEditSessionRes extends BaseApiResponse {
  data: {
    clientSecret?: string;
    paymentIntentId?: string;
    platform_fee_amount: string;
    duration_comparision?: {
      existingStart: string; // ISO string
      existingEnd: string; // ISO string
      requestedStart: string; // ISO string
      requestedEnd: string; // ISO string
      finalStart: string; // ISO string
      finalEnd: string; // ISO string
      existingDurationInMinutes: number;
      newDurationInMinutes: number;
      extraAmount: number;
    };
  };
}

export interface IClientSession {
  _id: string;
  vonage_session_id?: string;
  location?: string;
  start_date_time: string;
  end_date_time: string;
  link_to_join?: string;
  language_one: string;
  language_two: string;
  type: string;
  format: string;
  isFavorite?: boolean;
  session_ref_number: string;
  interpreter_details?: {
    _id: string;
    full_name: string;
    email: string;
    profile_image: string;
  };
  transaction_details?: {
    invoiceId: string;
  }[];
}

export interface ISessionClientRes extends BaseApiResponse {
  data: {
    meta: {
      totalDocs: number;
      skip: number;
      page: number;
      totalPages: number;
      limit: number;
      hasPrevPage: boolean;
      hasNextPage: boolean;
      prevPage: number | null;
      nextPage: number | null;
    };
    docs: IClientSession[];
  };
}

export interface ISessionFeedback {
  session_id: string;
  rating: number;
  details: string;
  ease_of_use: number;
  voice_clarity: number;
  // audio_clarity: number;
  interpreter_performance: number;
  video_clarity: number;
}
