import AuthWrapper from '@/components/AuthWrapper/AuthWrapper';
import CommonTabs from '@/components/CommonTabs/CommonTabs';
import LoginInterpreter from '@/components/layouts/authentication/interpreter/loginInterpreter';
import LoginUser from '@/components/layouts/authentication/user/loginUser';
import { ITabData } from '@/typescript/interface/commonall.interface';
import { useState } from 'react';

const tabsData: ITabData[] = [
  {
    label: 'Login as Client',
    content: <LoginUser />,
  },
  {
    label: 'Login as Interpreter',
    content: <LoginInterpreter />,
  },
];

export default function Login() {
  const [activeTab, setActiveTab] = useState(0);
  const subTextValues = [
    'Login to your account to find an interpreter', // Tab 0
    'Login to your account to enjoy.', // Tab 1
  ];
  return (
    <AuthWrapper
      headerRight
      authText="Don't have an account?"
      buttonText='Sign Up'
      pageLink='/auth/sign-up'
      headingSpan='Hello,'
      mainHeding='Welcome Back!'
      subText={subTextValues[activeTab]}
    >
      <CommonTabs tabs={tabsData} className='auth-tabs' onTabChange={setActiveTab} />
    </AuthWrapper>
  );
}
