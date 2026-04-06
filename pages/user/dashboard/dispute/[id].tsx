import { disputeDetailClientApi } from '@/api/functions/dispute.api';
import DisputDetails from '@/components/DashboardOther/DisputCommon/DisputDetails';
import DashboardWrapper from '@/layout/DashboardWrapper/DashboardWrapper';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';

export default function Details() {
  const router = useRouter();
  const { id } = router.query;

  const disputeDetailQuery = useQuery({
    queryKey: ['dispute-detail'],
    queryFn: () => disputeDetailClientApi(id as string),
    enabled: typeof id === 'string',
  });

  const data = disputeDetailQuery.data?.data;

  return (
    <DashboardWrapper>
      <DisputDetails disputeDataClient={data} />
    </DashboardWrapper>
  );
}
