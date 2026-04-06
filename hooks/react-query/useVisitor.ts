import { interpreterProfileApi, userProfileApi } from '@/api/functions/profile.api';
import { queryKeys, storageKeys } from '@/config/constants';
import { isSubscriptionActiveOrTrial } from '@/lib/functions/_helpers.lib';
import { getCookie } from '@/lib/functions/storage.lib';
import { queryClient } from '@/pages/_app';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';

export const useInterpreterData = () => {
  const router = useRouter();
  const token =
    getCookie(storageKeys.cookies.jwtToken) || getCookie(storageKeys.cookies.onBoardToken);
  const isInterpreter = getCookie(storageKeys.cookies.userRole) === 'interpreter';

  const interpreterQuery = useQuery({
    queryKey: queryKeys.interpreterProfileData,
    queryFn: interpreterProfileApi,
    enabled: Boolean(token) && Boolean(isInterpreter),
  });

  const invalidateInterpreterData = () =>
    queryClient.invalidateQueries({
      queryKey: queryKeys.interpreterProfileData,
    });

  const isPaymentPage =
    router.asPath.includes('/payment/') || router.asPath.includes('/payment-subscription/');

  if (!isPaymentPage && Boolean(interpreterQuery.data?.data)) {
    const isSubscriptionActive = isSubscriptionActiveOrTrial(
      interpreterQuery.data?.data?.subscriptionDetails
    );

    if (!isSubscriptionActive) {
      router.push('/interpreter/dashboard/payment-subscription/');
    }
  }

  // console.log(interpreterQuery.data?.data, token, '***');

  return {
    isInterpreterLoading: interpreterQuery.isPending,
    interpreterData: interpreterQuery.data?.data || null,
    invalidateInterpreterData,
  };
};

export const useUserData = () => {
  const router = useRouter();
  const token =
    getCookie(storageKeys.cookies.jwtToken) || getCookie(storageKeys.cookies.onBoardToken);
  const isUser = getCookie(storageKeys.cookies.userRole) === 'user';
  const userQuery = useQuery({
    queryKey: queryKeys.userProfoleData,
    queryFn: userProfileApi,
    enabled: Boolean(token) && Boolean(isUser),
  });
  const invalidateUserData = () => {
    queryClient.invalidateQueries({ queryKey: queryKeys.userProfoleData });
  };

  const isPaymentPage =
    router.asPath.includes('/payment/') || router.asPath.includes('/payment-subscription/');

  if (!isPaymentPage && Boolean(userQuery.data?.data)) {
    const isSubscriptionActive = isSubscriptionActiveOrTrial(
      userQuery.data?.data?.subscriptionDetails
    );

    if (!isSubscriptionActive && router.asPath.includes('/dashboard')) {
      router.push('/user/dashboard/payment-subscription/');
    }
  }

  return {
    isUserLoading: userQuery.isPending,
    userData: userQuery.data?.data || null,
    invalidateUserData,
  };
};
