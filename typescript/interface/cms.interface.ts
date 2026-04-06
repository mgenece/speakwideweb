import { BaseApiResponse } from './common.interface';

export interface ILangListres extends BaseApiResponse {
  data: {
    _id: string;
    language_display_name: string;
  }[];
}

export interface IInterestList extends BaseApiResponse {
  data: {
    _id: string;
    expertise_display_name: string;
  }[];
}

export interface IBusinessListRes extends BaseApiResponse {
  data: {
    _id: string;
    title: string;
  }[];
}

export interface IServiceType {
  _id: string;
  title: string;
  status: 'Active' | 'Inactive';
  isDeleted: boolean;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}

export interface ISessionTypeRes extends BaseApiResponse {
  data: IServiceType[];
}

export interface IAreaOfExpertiseDetails {
  _id: string;
  expertise_display_name: string;
}

export interface ISessionFormatDetails {
  _id: string;
  title: string;
}

export interface InterpreterRate {
  _id: string;
  area_of_expertise_id: string;
  session_format_id: string;
  price: number;
  interpreter_type: string;
  status: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  areaofexpertiseDetails: IAreaOfExpertiseDetails;
  sessionformatDetails: ISessionFormatDetails;
}

export interface IPlanPriceRes extends BaseApiResponse {
  data: InterpreterRate[];
}

export interface ICmsRes extends BaseApiResponse {
  data: {
    content: string;
    slug: string;
    title: string;
    _id: string;
  };
}
