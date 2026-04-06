import { storageKeys } from '@/config/constants';
import events from '@/json/events/events';
import { ISubscriptionKey } from '@/typescript/interface/auth.interface';
import { BaseApiResponse } from '@/typescript/interface/common.interface';
import { AxiosError, AxiosResponse } from 'axios';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { destroyCookie, parseCookies } from 'nookies';
import toast from 'react-hot-toast';
import eventEmitter from 'services/event.emitter';
import { setCookieClient } from './storage.lib';
dayjs.extend(duration);
/**
 * Check if the window object exists.
 * @returns A function that checks if the window is undefined.
 */
export function checkWindow() {
  return typeof window !== 'undefined';
}

export function isInServer() {
  return typeof document === 'undefined';
}

export function isApple() {
  if (typeof navigator === 'undefined') {
    return false;
  }
  const platformExpression = /Mac|iPhone|iPod|iPad/i;
  const agent = navigator.userAgent;

  return platformExpression.test(agent);
}

export function isAppleSafari() {
  if (typeof navigator === 'undefined') {
    return false;
  }
  const rejectedExpression = /Chrome|Android|CriOS|FxiOS|EdgiOS/i;
  const expectedExpression = /Safari/i;

  const agent = navigator.userAgent;
  if (rejectedExpression.test(agent)) {
    return false;
  }

  return isApple() && expectedExpression.test(agent);
}

export const globalCatchSucess = (response: AxiosResponse<BaseApiResponse>) => {
  let message = 'Something went wrong';
  if (response?.data?.message) {
    message = response?.data.message;
  }
  eventEmitter.emit(events.showNotification, {
    message,
    options: { variant: 'success' },
  });
};

export const globalCatchWarning = (response: AxiosResponse<BaseApiResponse>) => {
  let message = 'Something went wrong';
  if (response?.data?.message) {
    message = response?.data.message;
  }

  eventEmitter.emit(events.showNotification, {
    message,
    options: { variant: 'warning' },
  });
};

export const globalCatchError = (error: AxiosError<BaseApiResponse>) => {
  let message = 'Something went wrong';

  if (error.response?.data?.message === 'ILOGINOTHER') {
    window.location.href = '/logout';
    return;
  }

  if (error.response?.data?.message) {
    message = error.response?.data.message;
  }
  toast.error(message);
  eventEmitter.emit(events.showNotification, {
    message,
    options: { variant: 'error' },
  });
};

export const onlyNumberInput = (event: React.KeyboardEvent<HTMLInputElement>) => {
  if (
    !/[0-9]/.test(event.key) &&
    event.key !== 'Backspace' &&
    event.key !== 'Delete' &&
    event.key !== 'ArrowLeft' &&
    event.key !== 'ArrowRight' &&
    event.key !== 'Tab'
  ) {
    event.preventDefault();
  }
};

export const onlyNumberFractionInput = (event: React.KeyboardEvent<HTMLInputElement>) => {
  if (
    !/[0-9]/.test(event.key) &&
    event.key !== '.' &&
    event.key !== 'Backspace' &&
    event.key !== 'Delete' &&
    event.key !== 'ArrowLeft' &&
    event.key !== 'ArrowRight' &&
    event.key !== 'Tab'
  ) {
    event.preventDefault();
  }
};

export async function downloadFile(url: string, filename?: string) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch file');
    if (!response.url.includes('/uploads')) {
      toast.error('Cannot download file.');
      return;
    }

    const blob = await response.blob();
    const blobUrl = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = blobUrl;
    a.download = filename || url.split('/').pop() || 'download';

    document.body.appendChild(a);
    a.click();
    a.remove();

    // Clean up
    window.URL.revokeObjectURL(blobUrl);
  } catch (error) {
    console.error('Download failed:', error);
  }
}

export function safeJsonParse<T>(value: string | null | undefined): T | null {
  try {
    if (!value) {
      console.error('safeJsonParse error: Value undefined or null');
      return null;
    }
    return JSON.parse(value) as T;
  } catch (error) {
    console.error('safeJsonParse error:', error);
    return null;
  }
}

export const isSubscriptionActiveOrTrial = (data: ISubscriptionKey | undefined | null): boolean => {
  if (!data) return false;
  return data.status === 'active' || data.status === 'trialing';
};

export const onboardingTokenConvert = () => {
  const cookies = parseCookies();
  const onboardToken = cookies[storageKeys.cookies.onBoardToken];
  if (onboardToken) {
    setCookieClient(storageKeys.cookies.jwtToken, onboardToken);
    destroyCookie(null, storageKeys.cookies.onBoardToken, { path: '/' });
  }
};

export function generateCombinations(
  languages: string[],
  certifications: string[],
  sessionTypes: string[]
) {
  const result: string[] = [];

  for (let i = 0; i < languages.length; i++) {
    for (let j = 0; j < languages.length; j++) {
      if (i === j) {
        continue;
      }
      for (const cert of certifications) {
        for (const session of sessionTypes) {
          result.push(`${languages[i]}-${languages[j]}-${cert}-${session}`);
        }
      }
    }
  }

  return result;
}

export const formatDateTime = (dateString: string) => {
  const date = new Date(dateString);
  const day = date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
  const time = date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
  return { day, time };
};

// Helper function to calculate duration
export const calculateDuration = (start: string, end: string) => {
  const startTime = new Date(start);
  const endTime = new Date(end);
  const durationMs = endTime.getTime() - startTime.getTime();
  const hours = Math.floor(durationMs / (1000 * 60 * 60));
  const minutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60));

  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }
  return `${minutes}m`;
};

export function calculateTimeGap(isoTimestamp: string) {
  const now = dayjs();
  const target = dayjs(isoTimestamp);

  // diff in milliseconds (positive => target is after now, negative => target is before now)
  const diffMs = target.valueOf() - now.valueOf();
  const isPast = diffMs < 0;
  let absMs = Math.abs(diffMs);

  const hours = Math.floor(absMs / (1000 * 60 * 60));
  absMs -= hours * 1000 * 60 * 60;

  const minutes = Math.floor(absMs / (1000 * 60));
  absMs -= minutes * 1000 * 60;

  const seconds = Math.floor(absMs / 1000);

  const formatted = `${hours}h ${minutes}m ${seconds}s`;

  return { hours, minutes, seconds, formatted, isPast };
}

interface ISessionTime {
  startDateTime: string;
  endDateTime: string;
}

interface IJoinStatus {
  canJoin: boolean;
  joinAvailableAt: string; // formatted time string
}

export function getJoinStatus({ startDateTime, endDateTime }: ISessionTime): IJoinStatus {
  const now = Date.now();
  const startTime = new Date(startDateTime).getTime();
  const endTime = new Date(endDateTime).getTime();

  // User can join 15 minutes before the session start
  const joinAvailableAt = startTime - 15 * 60 * 1000;

  const diffMinutesBeforeStart = (startTime - now) / (1000 * 60);
  const canJoin =
    (diffMinutesBeforeStart <= 15 && diffMinutesBeforeStart >= 0) ||
    (now >= startTime && now <= endTime);

  // Format: dd-mm-yyyy HH:MM:SS AM
  const formattedJoinTime = dayjs(joinAvailableAt).format('DD-MM-YYYY hh:mm:ss A');

  return {
    canJoin,
    joinAvailableAt: formattedJoinTime,
  };
}
