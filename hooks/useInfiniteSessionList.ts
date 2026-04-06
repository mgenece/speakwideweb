import { getInterpreterSessions } from '@/api/functions/session.api';
import { queryKeys } from '@/config/constants';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

interface UseInfiniteSessionListProps {
  listType: 'request' | 'schedule' | 'completed';
  itemsPerPage?: number;
  search?: string;
  sortField?: string;
  sortOrder?: 'desc' | 'asc';
}

interface SessionMeta {
  totalDocs: number;
  skip: number;
  page: number;
  totalPages: number;
  limit: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: number | null;
  nextPage: number | null;
}

export const useInfiniteSessionList = ({
  listType,
  itemsPerPage = 10,
  search,
  sortField,
  sortOrder,
}: UseInfiniteSessionListProps) => {
  const query = useInfiniteQuery({
    queryKey: queryKeys.interpreterSessionList(`${listType}-${search}-${sortField}-${sortOrder}`),
    queryFn: ({ pageParam = 1 }) =>
      getInterpreterSessions({
        list_type: listType,
        page: pageParam,
        length: itemsPerPage,
        ...(search && { search }),
        ...(sortField && { sortField }),
        ...(sortOrder && { sortOrder }),
      }),
    initialPageParam: 1,
    getNextPageParam: lastPage => {
      const meta = lastPage?.data?.meta as SessionMeta | undefined;
      if (!meta) return undefined;
      return meta.hasNextPage && meta.nextPage ? meta.nextPage : undefined;
    },
    refetchOnMount: true,
  });

  // Flatten all pages into a single array
  const sessions = useMemo(
    () => query.data?.pages.flatMap(page => page.data?.docs || []) || [],
    [query.data]
  );

  // Get total count from the first page meta
  const totalCount = query.data?.pages[0]?.data?.meta?.totalDocs || 0;

  // Fetch more handler
  const fetchMoreData = () => {
    if (query.hasNextPage && !query.isFetchingNextPage) {
      query.fetchNextPage();
    }
  };

  return {
    sessions,
    totalCount,
    fetchMoreData,
    isLoading: query.isLoading,
    isError: query.isError,
    isFetchingNextPage: query.isFetchingNextPage,
    hasNextPage: query.hasNextPage,
    error: query.error,
    refetch: query.refetch,
  };
};
