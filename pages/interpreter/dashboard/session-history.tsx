import InterpreterSessionHistoryMain from '@/components/DashboardOther/InterpreterAllComponents/InterpreterSessionHistoryMain';
import InterpreterSessionTabsWrapper from '@/components/DashboardOther/InterpreterAllComponents/InterpreterSessionTabsWrapper1';
import DashboardWrapper from '@/layout/DashboardWrapper/DashboardWrapper';

const SessionHistory = () => {
  const tabsItem = [
    {
      label: 'Active Sessions',
      content: <InterpreterSessionTabsWrapper tabType='Active' />,
    },
    {
      label: 'Declined Sessions',
      content: <InterpreterSessionTabsWrapper tabType='Declined' />,
    },
    {
      label: 'Completed Sessions',
      content: <InterpreterSessionTabsWrapper tabType='Completed' />,
    },
  ];
  return (
    <DashboardWrapper isInterpreterType>
      <InterpreterSessionHistoryMain tabs={tabsItem} />
    </DashboardWrapper>
  );
};

export default SessionHistory;
