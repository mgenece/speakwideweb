import { RequestedAppointmentDrawerStyled } from '@/styles/StyledComponents/ RequestedAppointmentDrawerStyled';
import { useRouter } from 'next/router';
import RequestSessionDetailContent from './RequestSessionModalContent';

function SessionDetails() {
  const router = useRouter();
  const { sessionDetail } = router.query;
  const isDrawerOpen = Boolean(sessionDetail);
  const handleDrawerClose = () => {
    router.replace(router.pathname);
  };
  return (
    <RequestedAppointmentDrawerStyled
      open={isDrawerOpen}
      onClose={() => handleDrawerClose()}
      anchor='right'
    >
      <RequestSessionDetailContent handleToggleDrawer={() => handleDrawerClose()} />
    </RequestedAppointmentDrawerStyled>
  );
}

export default SessionDetails;
