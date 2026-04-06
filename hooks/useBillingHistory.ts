import { listCardApi, listSavedBankApi, listTransactionHistoryApi } from '@/api/functions/pyment';
import { TabType } from '@/components/DashboardOther/PurchaseSubscription/TransactionList';
import { queryKeys } from '@/config/constants';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

// hooks/useBillingHistory.ts
export function useBillingHistory(activeTab: TabType) {
  const listCardsQuery = useQuery({
    queryKey: queryKeys.listCard,
    queryFn: listCardApi,
    staleTime: 5 * 60 * 1000,
  });

  const listBankQuery = useQuery({
    queryKey: queryKeys.listBank,
    queryFn: listSavedBankApi,
    staleTime: 5 * 60 * 1000,
  });

  const paymentHistoryQuery = useInfiniteQuery({
    queryKey: ['billing-history', activeTab],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await listTransactionHistoryApi({
        type: activeTab,
        page: pageParam,
        limit: 10,
      });
      return {
        docs: response.data.docs,
        page: pageParam,
        totalPages: response.data.pages,
        total: response.data.total,
      };
    },
    getNextPageParam: lastPage => {
      if (lastPage.page < lastPage.totalPages) {
        return lastPage.page + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
    staleTime: 3 * 60 * 1000,
  });

  const cardList = useMemo(
    () => listCardsQuery.data?.data?.data || [],
    [listCardsQuery.data?.data?.data]
  );

  const bankList = useMemo(() => listBankQuery.data?.data || [], [listBankQuery.data?.data]);

  const paymentMethodMap = useMemo(() => {
    const map = new Map<string, string>();

    cardList.forEach(card => {
      if (card.id && card.card?.last4) {
        map.set(card.id, `**** **** **** ${card.card.last4}`);
      }
    });

    bankList.forEach(bank => {
      if (bank.id && bank.last4) {
        map.set(bank.id, `${bank.bankName} ****${bank.last4}`);
      }
    });

    return map;
  }, [cardList, bankList]);

  const transactionList = useMemo(
    () => paymentHistoryQuery.data?.pages.flatMap(page => page.docs) || [],
    [paymentHistoryQuery.data?.pages]
  );

  const trnsData = useMemo(() => {
    return transactionList.map(item => {
      const paymentMethod = paymentMethodMap.get(item.paymentMethodId) || 'Payment Method Removed';
      return { ...item, card: paymentMethod };
    });
  }, [transactionList, paymentMethodMap]);

  return {
    trnsData,
    paymentHistoryQuery,
    isLoading: paymentHistoryQuery.isLoading && !paymentHistoryQuery.data,
    isError: paymentHistoryQuery.isError,
  };
}
