import { storageKeys } from '@/config/constants';
import { userLoginData } from '@/typescript/types/common.type';
import { createSlice } from '@reduxjs/toolkit';
import { destroyCookie } from 'nookies';
import { userSliceData } from '../interfaces/interfaces';

const initialState: userSliceData = {
  isLoggedIn: false,
  userData: null,
};

export const userSlice = createSlice({
  name: 'userSlice',

  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setLoginData: (state, { payload }: { payload: userLoginData }) => {
      // state.email
      state.userData = payload;
      state.isLoggedIn = true;
    },
    checkLoggedInServer: (
      state,
      { payload }: { payload: { hasToken: boolean; user: userLoginData } }
    ) => {
      state.isLoggedIn = payload?.hasToken;
      state.userData = payload?.user;
    },
    logout: state => {
      state.isLoggedIn = false;
      state.userData = null;
      sessionStorage.clear();
      destroyCookie(null, storageKeys.cookies.userRole, { path: '/' });
      destroyCookie(null, storageKeys.cookies.jwtToken, { path: '/' });
      destroyCookie(null, storageKeys.cookies.onBoardToken, { path: '/' });
      destroyCookie(null, storageKeys.cookies.refreshToken, { path: '/' });

      window.location.href = '/auth/login';
    },
  },
});

export const { setLoginData, checkLoggedInServer, logout } = userSlice.actions;

export default userSlice.reducer;
