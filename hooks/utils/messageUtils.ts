import { baseUrlMedia } from '@/api/endpoints';
import { IChatMsg, IFileAttachment } from '@/typescript/types/chat.types';
import dayjs from 'dayjs';

export const formatTimestamp = (timestamp: Date) => {
  return dayjs(timestamp).format('hh:mm A');
};

export const getSenderName = (msg: IChatMsg) => {
  if (msg.sender_data?.full_name) return msg.sender_data.full_name;
  if (msg.sender_type === 'admin') return 'Admin';
  if (msg.sender_type === 'client') return 'Client';
  if (msg.sender_type === 'interpreter') return 'Interpreter';
  return 'Unknown';
};

export const getSenderAvatar = (msg: IChatMsg) => {
  return msg.sender_data?.profile_image;
};

export const formatFileSize = (bytes: number) => {
  if (bytes < 1024) return bytes.toFixed(2) + ' KB';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' MB';
  return (bytes / (1024 * 1024)).toFixed(2) + ' GB';
};

export const getFileNameFromUrl = (url: string) => {
  try {
    const urlPath = new URL(url).pathname;
    const fileName = urlPath.split('/').pop();
    return fileName || 'download';
  } catch {
    return 'download';
  }
};

export const downloadFile = (fileName: string) => {
  const url = `${baseUrlMedia}/uploads/message_files/${fileName}`;
  // console.log(url, '***u');
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const createTempMessage = (
  userId: string,
  senderType: 'client' | 'interpreter',
  messageText: string,
  uploadedFiles: IFileAttachment[],
  userData: any
): IChatMsg => {
  return {
    _id: `temp-${Date.now()}-${Math.random()}`,
    sender_id: userId,
    text: messageText || 'Sent attachments',
    chat_date: new Date(),
    sender_type: senderType,
    chat_type: uploadedFiles.length > 0 ? 'file' : 'text',
    files: uploadedFiles,
    sender_data: {
      _id: userId,
      full_name: userData?.full_name || 'You',
      profile_image: userData?.profile_image || '',
    },
  };
};
