import InterpreterDisputeMain from '@/components/DashboardOther/InterpreterAllComponents/InterpreterDisputeMain';
import DashboardWrapper from '@/layout/DashboardWrapper/DashboardWrapper';

export default function Index() {
  return (
    <DashboardWrapper isInterpreterType>
      <InterpreterDisputeMain />
    </DashboardWrapper>
  );
}
