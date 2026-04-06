import { storageKeys } from '@/config/constants';
import { useAppDispatch } from '@/hooks/redux/useAppDispatch';
import assest from '@/json/assest';
import { stopNotifications } from '@/lib/fcm-helpers';
import { getCookie } from '@/lib/functions/storage.lib';
import { logout } from '@/redux-toolkit/slices/userSlice';
import { HeaderWrap } from '@/styles/StyledComponents/HeaderWrapper';
import { Button, Container } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface headerProps {
  fixedHeader?: boolean;
}

export default function Header({ fixedHeader }: headerProps) {
  const [scrolled, setScrolled] = useState(false);
  const dispatch = useAppDispatch();
  const isLoggedIn = Boolean(
    getCookie(storageKeys.cookies.onBoardToken) || getCookie(storageKeys.cookies.jwtToken)
  );
  // console.log(isLoggedIn, '***');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return (
    <HeaderWrap className={`${fixedHeader ? 'fixedHeader' : ''} ${scrolled ? 'scrolled' : ''}`}>
      <AppBar component='nav' position='static' elevation={0} className='headerContainer'>
        <Container
          fixed
          sx={{ display: 'flex', justifyContent: 'space-between' }}
          className='containerFluid'
        >
          <Link href='/'>
            <Image src={assest?.logo_img} width={200} height={37} alt='no image' />
          </Link>

          {isLoggedIn && (
            <Button
              onClick={async () => {
                const token = getCookie(storageKeys.cookies.fcmToken);
                if (token) await stopNotifications();
                dispatch(logout());
              }}
            >
              Logout
            </Button>
          )}
        </Container>
      </AppBar>
    </HeaderWrap>
  );
}
