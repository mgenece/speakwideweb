// import InterpreterDisputDetails from '@/components/DashboardOther/InterpreterAllComponents/InterpreterDisputDetails';
// import DashboardWrapper from '@/layout/DashboardWrapper/DashboardWrapper';
// import { useRouter } from 'next/router';

// export default function Details() {
//   const router = useRouter();
//   const { status } = router.query;

//   const disputeType =
//     typeof status === 'string'
//       ? (status.toLowerCase() as 'resolved' | 'declined' | 'pending')
//       : undefined;
//   return (
//     <DashboardWrapper isInterpreterType>
//       <InterpreterDisputDetails disputeType={disputeType} />
//     </DashboardWrapper>
//   );
// }

import { disputeDetailIntApi } from '@/api/functions/dispute.api';
import DisputDetails from '@/components/DashboardOther/DisputCommon/DisputDetails';
import DashboardWrapper from '@/layout/DashboardWrapper/DashboardWrapper';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';

export default function Details() {
  const router = useRouter();
  const { id } = router.query;

  const disputeDetailQuery = useQuery({
    queryKey: ['dispute-detail', id],
    queryFn: () => disputeDetailIntApi(id as string),
    enabled: typeof id === 'string',
  });

  const data = disputeDetailQuery.data?.data;

  return (
    <DashboardWrapper>
      <DisputDetails disputeData={data} />
    </DashboardWrapper>
  );
}
