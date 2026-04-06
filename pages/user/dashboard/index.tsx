import DashboardMainTab from '@/components/DashboardOther/DashboardMainTab';

import AppointmentDetailsUser from '@/components/layouts/session/user/AppointmentDetails';
import CompletedTab from '@/components/layouts/session/user/CompletedTab';
import RequestsTab from '@/components/layouts/session/user/RequestsTab';
import ScheduledTab from '@/components/layouts/session/user/ScheduledTab';
import DashboardWrapper from '@/layout/DashboardWrapper/DashboardWrapper';

const Index = () => {
  const tabsItem = [
    {
      label: 'Requests',
      content: <RequestsTab />,
    },
    {
      label: 'Scheduled',
      content: <ScheduledTab />,
    },
    {
      label: 'Completed',
      content: <CompletedTab />,
    },
  ];
  return (
    <DashboardWrapper pageTitle='Dashboard'>
      <DashboardMainTab tabs={tabsItem} />
      <AppointmentDetailsUser />
    </DashboardWrapper>
  );
};

export default Index;
