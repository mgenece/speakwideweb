import { disputeListIntApi } from '@/api/functions/dispute.api';
import { queryKeys } from '@/config/constants';
import { useInfiniteQuery } from '@tanstack/react-query';
import DisputeTable from '../user/DisputeTable';

function DeclinedDispute() {
  const disputeQuery = useInfiniteQuery({
    queryKey: queryKeys.userDisputeList('Declined-int'),
    queryFn: ({ pageParam = 1 }) =>
      disputeListIntApi({ list_type: 'Declined', limit: 10, page: pageParam }),
    getNextPageParam: lastPage => {
      // Check if there are more pages
      if (lastPage.data.page < lastPage.data.pages) {
        return lastPage.data.page + 1;
      }
      return undefined; // No more pages
    },
    initialPageParam: 1,
  });

  return <DisputeTable disputeQuery={disputeQuery} />;
}

export default DeclinedDispute;
