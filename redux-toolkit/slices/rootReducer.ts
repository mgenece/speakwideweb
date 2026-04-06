import forgotPassTokenSlice from './forgotPass.slice';
import globalSlice from './global.slice';
import signupInterpreterSlice from './signupInterpreter.slice';
import userSlice from './userSlice';

const rootReducer = {
  userSlice,
  globalSlice,
  forgotPassTokenSlice,
  signupInterpreterSlice,
};

export default rootReducer;
