import { disputeListUserApi } from '@/api/functions/dispute.api';
import { queryKeys } from '@/config/constants';
import { useDebounce } from '@/hooks/utils/useDebounce';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useState } from 'react';
import DisputeTable from './DisputeTable';

export default function DeclinedDisputesTab() {
  const [searchSort, setSearchSort] = useState({ search: '', sort: 'asc' });
  const searchDeb = useDebounce(searchSort.search, 500);
  const disputeQuery = useInfiniteQuery({
    queryKey: queryKeys.userDisputeList(`Declined-${searchDeb}-${searchSort.sort}`),
    queryFn: ({ pageParam = 1 }) =>
      disputeListUserApi({
        list_type: 'Declined',
        limit: 10,
        page: pageParam,
        search: searchDeb,
        sort_order: searchSort.sort as 'asc' | 'desc',
      }),
    getNextPageParam: lastPage => {
      // Check if there are more pages
      if (lastPage.data.page < lastPage.data.pages) {
        return lastPage.data.page + 1;
      }
      return undefined; // No more pages
    },
    initialPageParam: 1,
  });
  return (
    <DisputeTable
      searchSort={searchSort}
      setSearchSort={setSearchSort}
      disputeQuery={disputeQuery}
    />
  );
}
