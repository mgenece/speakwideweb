// hooks/useInfinitePayoutList.ts
import { getPayoutApi } from '@/api/functions/payout.api';
import { IPayoutDoc } from '@/typescript/interface/payout.interface';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

interface IUseInfinitePayoutListProps {
  itemsPerPage?: number;
  sortField: 'createdAt';
  sortOrder: 'asc' | 'desc';
}

export const useInfinitePayoutList = ({
  itemsPerPage = 10,
  sortField,
  sortOrder,
}: IUseInfinitePayoutListProps) => {
  const query = useInfiniteQuery({
    queryKey: ['payoutList', itemsPerPage, sortField, sortOrder],
    queryFn: ({ pageParam = 1 }) =>
      getPayoutApi({
        page: pageParam,
        limit: itemsPerPage,
        sortField,
        sortOrder,
      }),
    initialPageParam: 1,
    getNextPageParam: lastPage => {
      if (!lastPage?.data) return undefined;
      const { pages, page } = lastPage.data;
      return pages && page < pages ? page + 1 : undefined;
    },
    refetchOnMount: true,
  });

  const payouts: IPayoutDoc[] = useMemo(
    () => query.data?.pages.flatMap(page => page.data.docs || []) || [],
    [query.data]
  );

  const fetchMoreData = () => {
    if (query.hasNextPage && !query.isFetchingNextPage) {
      query.fetchNextPage();
    }
  };

  return {
    payouts,
    fetchMoreData,
    isLoading: query.isLoading,
    isError: query.isError,
    isFetchingNextPage: query.isFetchingNextPage,
    hasNextPage: query.hasNextPage,
    error: query.error,
    refetch: query.refetch,
  };
};
