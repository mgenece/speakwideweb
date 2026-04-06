import { IFileAttachment } from '../types/chat.types';
import { BaseApiResponse } from './common.interface';

export interface IDisputeCategoryRes extends BaseApiResponse {
  data: {
    _id: string;
    title: string;
  }[];
}

export interface IFavouriteLostRes extends BaseApiResponse {
  data: {
    _id: string;
    interpreter_id: string;
    interpreter_name: string;
    interpreter_email: string;
    interpreter_phone: string;
    interpreter_pic: string;
  }[];
}

export interface IDisputeCategory {
  _id: string;
  title: string;
}

export interface IDispute {
  _id: string;
  dispute_id: string;
  amount_paid: number;
  dispute_status: 'Pending' | 'Resolved' | 'Declined' | 'In Progress' | string; // extend as needed
  categories: IDisputeCategory[];
  date_initiated: string; // ISO date string
  interpreter_name: string;
}

export interface IDisputeListRes extends BaseApiResponse {
  data: { docs: IDispute[]; limit: number; page: number; pages: number; total: number };
}

export interface IDisputeCategory {
  _id: string;
  title: string;
}

interface IDisputeClient {
  _id: string;
  full_name: string;
}

interface IDisputeSession {
  _id: string;
  createdAt: string;
}

export interface IDisputeItem {
  _id: string;
  client_id: string;
  interpreter_id: string;
  session_id: string;
  category: string[];
  dispute_id: string;
  session_ref_number: string;
  issue_details: string;
  client_noshow: boolean;
  waiting_time: string;
  client_ontime: boolean;
  late_time: string;
  is_proper_duration: boolean;
  actual_duration: string;
  has_legal_violation: boolean;
  legal_violation_type: string;
  has_safety_concern: boolean;
  safety_concern_type: string;
  supporting_documents: string[];
  amount_paid: number;
  dispute_status: string;
  isDeleted: boolean;
  status: string;
  createdAt: string;
  updatedAt: string;
  client: IDisputeClient;
  sessions: IDisputeSession;
  categories: IDisputeCategory[];
}

export interface IDisputeRes extends BaseApiResponse {
  data: IDisputeItem;
}

export interface IDisputeData {
  _id: string;
  client_id: string;
  interpreter_id: string | null;
  session_id: string;
  dispute_id: string;
  session_ref_number: string;
  issue_details: string;
  interpreter_noshow: boolean;
  waiting_time: string; // e.g. "02:20"
  quality: string; // e.g. "Fair"
  interpreter_ontime: boolean;
  late_time: string; // e.g. "03:30"
  is_proper_duration: boolean;
  actual_duration: string; // e.g. "03:30"
  has_legal_violation: boolean;
  legal_violation_type: string;
  has_safety_concern: boolean;
  safety_concern_type: string;
  supporting_documents: string[];
  amount_paid: number;
  dispute_status: string; // e.g. "Pending"
  categories: IDisputeCategory[];
  date_initiated: string; // ISO date string
  interpreter_name: string;
}

export interface IDisputeClientRes extends BaseApiResponse {
  data: IDisputeData;
}

export interface IChatUser {
  _id: string;
  full_name: string;
  profile_image: string;
}

export interface IDisputeChatMessage {
  _id: string;
  // client_dispute_id: string;
  sender_type: 'client' | 'interpreter' | 'admin';
  // room_id: string;
  text: string;
  chat_date: string; // ISO string
  chat_type: 'text' | 'file';
  files: IFileAttachment[];
  sender_data: IChatUser;
  reciever_data: IChatUser;
}

export interface IChatRoomData {
  room_id: string;
  client_dispute_id: string | null;
  interpreter_dispute_id: string | null;
  client_id: string | null;
  interpreter_id: string | null;
  sender_type: 'client' | 'interpreter';
}

export interface IDisputeChatHistoryRes extends BaseApiResponse {
  data: {
    docs: IDisputeChatMessage[];
    room_data: IChatRoomData;
    total: number;
    limit: number;
    page: number;
    pages: number;
  };
}
