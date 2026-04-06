import { userLoginData } from '@/typescript/types/common.type';

export interface userSliceData {
  isLoggedIn: boolean;
  userData: userLoginData | null;
}

export interface globalStateInterface {
  counter: number;
  isLogoutModalOpen: boolean;
}
