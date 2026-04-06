import { createSlice } from '@reduxjs/toolkit';
import { globalStateInterface } from '../interfaces/interfaces';

const initialState: globalStateInterface = {
  counter: 0,
  isLogoutModalOpen: false,
};

const globalSlice = createSlice({
  name: 'globalSlice',

  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    increment: state => {
      state.counter += 1;
    },
    decrement: state => {
      state.counter -= 1;
    },
    handleOpenLogoutModal: state => {
      state.isLogoutModalOpen = true;
    },
    handleCloseLogoutModal: state => {
      state.isLogoutModalOpen = false;
    },
  },
});

export const { increment, decrement, handleOpenLogoutModal, handleCloseLogoutModal } =
  globalSlice.actions;

export default globalSlice.reducer;
