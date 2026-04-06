import { storageKeys } from '@/config/constants';
import { useAppDispatch } from '@/hooks/redux/useAppDispatch';
import { getCookie } from '@/lib/functions/storage.lib';
import { logout } from '@/redux-toolkit/slices/userSlice';
import { Box, CircularProgress } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Home() {
  const isLoggedIn = Boolean(getCookie(storageKeys.cookies.jwtToken));
  const isOnBoard = Boolean(getCookie(storageKeys.cookies.onBoardToken));
  const isUser = getCookie(storageKeys.cookies.userRole) === 'user';
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    if (isOnBoard) {
      dispatch(logout());
    } else if (isLoggedIn) {
      if (isUser) {
        router.push('/user/dashboard');
      } else {
        router.push('/interpreter/dashboard');
      }
    } else {
      router.push('/auth/login');
    }
  }, [isLoggedIn, isOnBoard, isUser]);

  return (
    <Box
      width={'100vw'}
      height={'100vh'}
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
    >
      <CircularProgress />
    </Box>
  );
}
