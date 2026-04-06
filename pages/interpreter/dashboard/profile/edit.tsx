import AccountEditInformationInterpreterMain from '@/components/DashboardOther/InterpreterAllComponents/AccountInformationInterpreterMain/AccountEditInformationInterpreterMain';
import DashboardWrapper from '@/layout/DashboardWrapper/DashboardWrapper';

export default function ProfileEdit() {
  return (
    <DashboardWrapper pageTitle='Edit Profile' isInterpreterType>
      <AccountEditInformationInterpreterMain />
    </DashboardWrapper>
  );
}
