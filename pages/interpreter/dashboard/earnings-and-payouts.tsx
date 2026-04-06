import EarningsAndPayoutsMain from '@/components/DashboardOther/InterpreterAllComponents/EarningsAndPayoutsMain';
import DashboardWrapper from '@/layout/DashboardWrapper/DashboardWrapper';

export default function EarningsAndPayouts() {
  return (
    <DashboardWrapper isInterpreterType>
      <EarningsAndPayoutsMain />
    </DashboardWrapper>
  );
}
