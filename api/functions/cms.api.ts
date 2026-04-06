import {
  IBusinessListRes,
  ICmsRes,
  IInterestList,
  ILangListres,
  IPlanPriceRes,
  ISessionTypeRes,
} from '@/typescript/interface/cms.interface';
import axiosInstance from '../axiosInstance';
import { endpoints } from '../endpoints';

export const langListApi = async () => {
  const res = await axiosInstance.get<ILangListres>(endpoints.cms.languageList);
  return res.data;
};

export const areaOfInterestApi = async () => {
  const res = await axiosInstance.get<IInterestList>(endpoints.cms.areaOfExpertise);
  return res.data;
};
export const businessListApi = async () => {
  const res = await axiosInstance.get<IBusinessListRes>(endpoints.cms.businessList);
  return res.data;
};

export const sessionFormatApi = async () => {
  const res = await axiosInstance.get<ISessionTypeRes>(endpoints.cms.sessionFormat);
  return res.data;
};

export const sessionPricingApi = async ({
  interpreterType,
  sessionType,
}: {
  interpreterType: 'Certified' | 'Qualified';
  sessionType: string;
}) => {
  const res = await axiosInstance.get<IPlanPriceRes>(
    `${endpoints.cms.pricingPlan}?interpreter_type=${interpreterType}&session_type=${sessionType}`
  );
  return res.data;
};

export const cmsDataApi = async (body: {
  slug:
    | 'privacy-policy'
    | 'terms-conditions'
    | 'interpreter-agreement'
    | 'client-agreement'
    | 'subscription-terms-condition';
}) => {
  const res = await axiosInstance.post<ICmsRes>(endpoints.cms.cmsData, body);
  return res.data;
};
