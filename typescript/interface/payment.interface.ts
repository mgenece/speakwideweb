import { BaseApiResponse } from './common.interface';

export interface ICreateSetupIntentRes extends BaseApiResponse {
  data: {
    clientSecret: string;
  };
}
