import AccountInformationMain from '@/components/DashboardOther/AccountInformationMain/AccountInformationMain';
import DashboardWrapper from '@/layout/DashboardWrapper/DashboardWrapper';

const AccountInformation = () => {
  return (
    <DashboardWrapper pageTitle='Profile Information'>
      <AccountInformationMain />
    </DashboardWrapper>
  );
};

export default AccountInformation;
