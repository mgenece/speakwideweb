import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: '',
};

export const forgotPassTokenSlice = createSlice({
  name: 'forgotPassTokenSlice',
  initialState,
  reducers: {
    setForgotPassToken: (state, { payload }: { payload: string }) => {
      state.token = payload;
    },
  },
});

export const { setForgotPassToken } = forgotPassTokenSlice.actions;

export default forgotPassTokenSlice.reducer;
