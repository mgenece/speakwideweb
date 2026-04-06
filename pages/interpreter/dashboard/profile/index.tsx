import AccountInformationInterpreterMain from '@/components/DashboardOther/InterpreterAllComponents/AccountInformationInterpreterMain/AccountInformationInterpreterMain';
import DashboardWrapper from '@/layout/DashboardWrapper/DashboardWrapper';

const Profile = () => {
  return (
    <DashboardWrapper pageTitle='Profile Information' isInterpreterType>
      <AccountInformationInterpreterMain />
    </DashboardWrapper>
  );
};

export default Profile;
