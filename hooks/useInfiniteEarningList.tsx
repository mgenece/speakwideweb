import { getEarning } from '@/api/functions/payout.api';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

interface UseInfiniteEarningListProps {
  listType: 'request';
  itemsPerPage?: number;
  sortField?: string;
  sortOrder?: 'asc' | 'desc';
  from?: string; // e.g. '2025-11-01'
  to?: string; // e.g. '2025-11-20'
}

export const useInfiniteEarningList = ({
  listType,
  itemsPerPage = 10,
  sortField,
  sortOrder,
  from,
  to,
}: UseInfiniteEarningListProps) => {
  const query = useInfiniteQuery({
    queryKey: ['earningList', listType, itemsPerPage, sortField, sortOrder, from, to],
    queryFn: ({ pageParam = 1 }) =>
      getEarning({
        list_type: listType,
        page: pageParam,
        limit: itemsPerPage,
        sortField,
        sortOrder,
        from,
        to,
      }),
    initialPageParam: 1,
    getNextPageParam: lastPage => {
      if (!lastPage) return undefined;
      const { pages, page } = lastPage.data || {};
      return pages && page < pages ? page + 1 : undefined;
    },
    refetchOnMount: true,
  });

  const earnings = useMemo(
    () => query.data?.pages.flatMap(page => page.data.docs.earnings || []) || [],
    [query.data]
  );

  const totalEarning = query.data?.pages[0]?.data.docs.totalEarning || 0;

  const fetchMoreData = () => {
    if (query.hasNextPage && !query.isFetchingNextPage) {
      query.fetchNextPage();
    }
  };

  return {
    earnings,
    totalEarning,
    fetchMoreData,
    isLoading: query.isLoading,
    isError: query.isError,
    isFetchingNextPage: query.isFetchingNextPage,
    hasNextPage: query.hasNextPage,
    error: query.error,
    refetch: query.refetch,
  };
};
