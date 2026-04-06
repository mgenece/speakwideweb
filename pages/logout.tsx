import { storageKeys } from '@/config/constants';
import { useAppDispatch } from '@/hooks/redux/useAppDispatch';
import { stopNotifications } from '@/lib/fcm-helpers';
import { getCookie } from '@/lib/functions/storage.lib';
import { logout } from '@/redux-toolkit/slices/userSlice';
import { Box, CircularProgress } from '@mui/material';
import { useEffect } from 'react';
import toast from 'react-hot-toast';

function Logout() {
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    try {
      const token = getCookie(storageKeys.cookies.fcmToken);
      if (token) await stopNotifications();
      dispatch(logout());
      toast.success('Logged out successfully!');
    } catch (err) {
      console.error('Logout error:', err);
      toast.error('Error during logout. Please try again.');
    }
  };

  useEffect(() => {
    handleLogout();
  }, []);
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

export default Logout;
