import { IAgentProfile } from '@/typescript/interface/auth.interface';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: IAgentProfile = {
  fullName: '',
  email: '',
  phoneNumber: '',
};

export const signupInterpreterSlice = createSlice({
  name: 'signupInterpreterslice',
  initialState,
  reducers: {
    setInterpreterSignupForm1: (
      state,
      action: PayloadAction<{
        fullName: string;
        email: string;
        phoneNumber: string;
      }>
    ) => {
      return { ...state, ...action.payload };
    },

    resetProfile: () => initialState,
  },
});

export const { setInterpreterSignupForm1, resetProfile } = signupInterpreterSlice.actions;

export default signupInterpreterSlice.reducer;
