import { BaseApiResponse } from './common.interface';

// types/vonage.ts
export interface ICredentials {
  apiKey: string;
  sessionId: string;
  token: string;
}

export interface ISubscriber {
  subscriber: any;
  container: HTMLDivElement;
  streamId: string;
}

export interface IVideoSessionState {
  connected: boolean;
  sessionConnected: boolean;
  publisher: any;
  subscribers: ISubscriber[];
  error: string;
}

export interface IChatMessage {
  id: string;
  username: string;
  message?: string; // Make optional
  timestamp: Date;
  connectionId: string;
  type: 'user' | 'system' | 'file'; // Add file type
  fileData?: {
    fileName: string;
    fileSize: number;
    fileType: string;
    downloadUrl: string;
  };
}

export interface IChatState {
  messages: IChatMessage[];
  currentMessage: string;
  username: string;
  showChat: boolean;
  unreadCount: number;
}

export interface IChatFileRes extends BaseApiResponse {
  data: {
    fileName: string;
    fileType: string;
    fileSize: number;
    downloadUrl: string;
  }[];
}

export interface IChatHistory {
  _id: string;
  sessionId: string;
  senderName: string;
  message: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface IChatHistoryRes extends BaseApiResponse {
  data: { docs: IChatHistory[] };
}

export interface IVonageTokenRes extends BaseApiResponse {
  data: {
    apiKey: string;
    sessionId: string;
    token: string;
    start_date_time: string;
    end_date_time: string;
    clientName: string;
    interpreterName: string;
    language_one: string;
    language_two: string;
    role: 'publisher' | 'subscriber' | 'moderator';
    session_format: 'Video' | 'audio';
  };
}
