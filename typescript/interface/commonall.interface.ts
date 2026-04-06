import React from 'react';

export interface IAuthProps {
  authText?: string;
  buttonText?: string;
  pageLink?: string;
  children?: React.ReactNode;
  headerRight?: boolean;
  isBack?: boolean;
  headingSpan?: string;
  mainHeding?: string;
  customClass?: string;
  subText?: string;
  subTextSpan?: string;
}

export interface ITabData {
  label: string;
  content: React.ReactNode;
}

export interface IDynamicTabsProps {
  tabs: ITabData[];
  className?: string;
  onTabChange?: (index: number) => void;
}

export interface ITabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

export interface IDashboardTabsChildProps {
  tabType: 'Requests' | 'Scheduled' | 'Completed';
}

export interface ISessionTabsChildProps {
  tabType: 'Active' | 'Declined' | 'Completed';
}

export interface IDashboardTabsTableRow {
  interpreterName?: string;
  day: string;
  callHappen?: boolean;
  time: string;
  address?: string;
  isJoinSession?: boolean;
}

export interface IDashboardTabsTableInter {
  clientName?: string;
  interpreterName?: string;
  description?: string;
  day: string;
  callHappen?: boolean;
  time: string;
  address?: string;
  isJoinSession?: boolean;
}
