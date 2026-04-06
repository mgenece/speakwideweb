import CalenderUI from '@/components/CalenderUI/CalenderUI';
import DashboardWrapper from '@/layout/DashboardWrapper/DashboardWrapper';

function calender() {
  return (
    <DashboardWrapper
      sx={{
        '.wrapper_rgt': {
          '.dashboard_body': {
            padding: { lg: '0px 35px 0px 0px' },
          },
        },
      }}
    >
      <CalenderUI />
    </DashboardWrapper>
  );
}

export default calender;
