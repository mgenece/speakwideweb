export interface IFileAttachment {
  file: string;
  type: string;
  size: number;
}

export interface IChatMsg {
  _id: string;
  sender_id: string;
  text: string;
  chat_date: Date;
  sender_type: 'client' | 'interpreter' | 'admin';
  chat_type: 'text' | 'file';
  files?: IFileAttachment[];
  seen_by?: string[];
  sender_data?: ISenderData;
}

export interface IMessagePayload {
  client_dispute_id?: string;
  interpreter_dispute_id?: string;
  sender_type: 'client' | 'interpreter';
  text: string;
  chat_type: 'text' | 'file';
  files: IFileAttachment[];
}

// Rest remains same...
export interface ISenderData {
  _id: string;
  full_name: string;
  profile_image: string;
}

export interface IActionHistoryItem {
  imgPath: string;
  name: string;
  date: string;
  infotxt: string;
}

export interface IActionHistoryPanelProps {
  disputeType?: 'resolved' | 'declined' | 'pending';
  actionHistory: IActionHistoryItem[];
  disputeId: string;
  senderType: 'client' | 'interpreter';
}
