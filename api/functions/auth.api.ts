import { IgetSignUpQuery } from '@/typescript/interface/apiresp.interfaces';
import {
  IInterSignupRes,
  ILoginnterpreterRes,
  ILoginRes,
  IOtpVerifyRes,
  IPersonaVerify,
  IVerifyOtpForgot,
} from '@/typescript/interface/auth.interface';
import axiosInstance from '../axiosInstance';
import { endpoints } from '../endpoints';

type TVerifyPayload =
  | {
      email: string;
      phone?: never;
      otp: string;
      role: 'user' | 'interpreter';
      type: 'email';
    }
  | {
      phone: string;
      email?: never;
      otp: string;
      role: 'user' | 'interpreter';
      type: 'phone';
    };

interface ILoginPayload {
  user_name: string;
  password: string;
  deviceToken?: string;
}

interface IForgotPayload {
  email?: string;
  phone?: string;
  role: string;
  type: string;
}

interface IForgotOtpPayload {
  type: string;
  role: string;
  email: string;
  phone: string;
  otp: string;
}

interface ISetNewPass {
  resetToken: string;
  new_password: string;
  confirm_password: string;
}

export interface ITimeSlot {
  from: string;
  to: string;
}

export interface IWeeklySchedule {
  day: string; // you can restrict to specific days if you want
  offDay: boolean;
  slots: ITimeSlot[];
}

export interface IAddAvailability {
  weeklySchedule?: IWeeklySchedule[];
  offDates?: string[];
}

interface IInterpreterSignUpV2 {
  full_name: string;
  email: string;
  phone: string;
  password: string;
  confirm_password: string;
  timeZone: string;
  deviceToken?: string;
}

export const signUpMutation = async (body: FormData) => {
  const res = await axiosInstance.post<IgetSignUpQuery>(endpoints.auth.user.signUp, body);

  return res;
};

export const verifyOtpApi = async (body: TVerifyPayload) => {
  const res = await axiosInstance.post<IOtpVerifyRes>(endpoints.auth.user.verifyOtp, body);
  return res.data;
};

export const resendEmailOtpApi = async (body: { email: string; role: string; type: string }) => {
  const res = await axiosInstance.post(endpoints.auth.user.resendOtpEmail, body);
  return res.data;
};

export const resendPhoneOtpApi = async (body: { phone: string; role: string; type: string }) => {
  const res = await axiosInstance.post(endpoints.auth.user.resendOtpEmail, body);
  return res.data;
};

export const createBusinessApi = async (formData: FormData) => {
  const res = await axiosInstance.post(endpoints.onBoard.user.businessCreate, formData);
  return res.data;
};

export const loginUserApi = async (body: ILoginPayload) => {
  const res = await axiosInstance.post<ILoginRes>(endpoints.auth.user.login, {
    ...body,
    deviceType: 'Web',
  });
  return res.data;
};

export const forgotpassApi = async (body: IForgotPayload) => {
  const res = await axiosInstance.post(endpoints.auth.forgotPass, body);
  return res.data;
};

export const forgotOtpVerifyApi = async (body: IForgotOtpPayload) => {
  const res = await axiosInstance.post<IVerifyOtpForgot>(endpoints.auth.verifyForgotOtp, body);
  return res.data;
};

export const setNewPassForgotApi = async (body: ISetNewPass) => {
  const res = await axiosInstance.post(endpoints.auth.setNewPassForgot, body, {
    headers: {
      'x-access-token': body.resetToken,
    },
  });
  return res.data;
};

export const signupInterpreterApi = async (body: FormData) => {
  const res = await axiosInstance.post<IInterSignupRes>(endpoints.auth.interpreter.signUp, body);
  return res.data;
};

export const signupInterpreterApiV2 = async (body: IInterpreterSignUpV2) => {
  const res = await axiosInstance.post<IInterSignupRes>(endpoints.auth.interpreter.signUpV2, {
    ...body,
    deviceType: 'Web',
  });
  return res.data;
};

export const verifyPersonaStatusApi = async (id: string) => {
  const res = await axiosInstance.post<IPersonaVerify>(
    endpoints.onBoard.interpreter.verifyPersonaStatus,
    {
      reference_id: id,
    }
  );
  return res.data;
};

export const addAvailabilityInterpreterApi = async (body: IAddAvailability) => {
  const res = await axiosInstance.post(endpoints.onBoard.interpreter.setAvailability, body);
  return res.data;
};

export const loginInterpreterApi = async (body: ILoginPayload) => {
  const res = await axiosInstance.post<ILoginnterpreterRes>(endpoints.auth.interpreter.login, {
    ...body,
    deviceType: 'Web',
  });
  return res.data;
};
