import InterpreterDashboardMain from '@/components/DashboardOther/InterpreterAllComponents/InterpreterDashboardMain';
import CompletedTab from '@/components/layouts/session/interpreter/CompletedTab';
import RequestsTab from '@/components/layouts/session/interpreter/RequestsTab';
import ScheduledTab from '@/components/layouts/session/interpreter/ScheduledTab';
import SessionDetails from '@/components/layouts/session/interpreter/SessionDetails';
import DashboardWrapper from '@/layout/DashboardWrapper/DashboardWrapper';

const Index = () => {
  const tabsItem = [
    {
      label: 'Requested Sessions',
      content: <RequestsTab />,
    },
    {
      label: 'Scheduled Sessions',
      content: <ScheduledTab />,
    },
    {
      label: 'Completed Sessions',
      content: <CompletedTab />,
    },
  ];
  return (
    <DashboardWrapper isInterpreterType>
      <InterpreterDashboardMain tabs={tabsItem} />
      <SessionDetails />
    </DashboardWrapper>
  );
};

export default Index;
