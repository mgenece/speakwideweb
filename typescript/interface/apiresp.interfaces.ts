import { userLoginData } from '../types/common.type';
import { BaseApiResponse } from './common.interface';

export interface IgetSignUpQuery extends BaseApiResponse {
  data: {
    user: userLoginData;
    token: string;
  };
}
