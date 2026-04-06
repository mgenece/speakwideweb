import ChangePasswordMain from '@/components/DashboardOther/ChangePasswordMain/ChangePasswordMain';
import DashboardWrapper from '@/layout/DashboardWrapper/DashboardWrapper';

const ChangePassword = () => {
  return (
    <DashboardWrapper pageTitle='Change Password' isReqSession isInterpreterType>
      <ChangePasswordMain />
    </DashboardWrapper>
  );
};

export default ChangePassword;
