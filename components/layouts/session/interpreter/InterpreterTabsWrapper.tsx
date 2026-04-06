import { InterpreterTabsWrapperPaper } from '@/styles/StyledComponents/DashboardMainTabStyled';
import { IDashboardTabsChildProps } from '@/typescript/interface/commonall.interface';

import CompletedTab from './CompletedTab';
import RequestsTab from './RequestsTab';
import ScheduledTab from './ScheduledTab';

const InterpreterTabsWrapper = ({ tabType }: IDashboardTabsChildProps) => {
  const renderTab = () => {
    switch (tabType) {
      case 'Requests':
        return <RequestsTab />;
      case 'Scheduled':
        return <ScheduledTab />;
      case 'Completed':
        return <CompletedTab />;
      default:
        return null;
    }
  };

  return <InterpreterTabsWrapperPaper elevation={0}>{renderTab()}</InterpreterTabsWrapperPaper>;
};

export default InterpreterTabsWrapper;
