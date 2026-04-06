import AuthWrapper from '@/components/AuthWrapper/AuthWrapper';
import SignupAsUserTab from '@/components/AuthWrapper/SignupAsUserTab';
import SignupInterpreterTab from '@/components/AuthWrapper/SignupInterpreterTab';
import CommonTabs from '@/components/CommonTabs/CommonTabs';
import { ITabData } from '@/typescript/interface/commonall.interface';

const tabsData: ITabData[] = [
  {
    label: 'Signup as User',
    content: <SignupAsUserTab />,
  },
  {
    label: 'Signup as Interpreter',
    content: <SignupInterpreterTab />,
  },
];

export default function Signup() {
  return (
    <>
      <AuthWrapper
        headerRight
        authText='Already have an account?'
        buttonText='Login'
        pageLink='/auth/login'
        headingSpan='Set Up'
        mainHeding='Your Profile'
        subText='Create account by entering personal details.'
      >
        <CommonTabs tabs={tabsData} className='auth-tabs' />
      </AuthWrapper>
    </>
  );
}
