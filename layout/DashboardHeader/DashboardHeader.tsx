import { mediaUrl } from '@/api/endpoints';
import NotificationBell from '@/components/layouts/notification/NotificationBell';
import { storageKeys } from '@/config/constants';
import { useInterpreterData, useUserData } from '@/hooks/react-query/useVisitor';
import { useAppDispatch } from '@/hooks/redux/useAppDispatch';
import assest from '@/json/assest';
import { stopNotifications } from '@/lib/fcm-helpers';
import { getCookie } from '@/lib/functions/storage.lib';
import { inter } from '@/mui-theme/_muiTheme';
import { logout } from '@/redux-toolkit/slices/userSlice';
import DashboardIcon from '@/ui/Icons/DashboardIcon';
import {
  Box,
  BoxProps,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  styled,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';

export const DashboardHeaderStyled = styled(Box)`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  background: ${({ theme }) => theme.palette.common.white};
  border-bottom: 1px solid ${({ theme }) => theme.palette.customColors.colorf6f6f6};
  z-index: 9;
  padding: 18px 35px;
  @media (max-width: 899px) {
    padding: 10px 20px;
  }
  .header_leftBox {
    display: flex;
    align-items: center;
    gap: 17px;
    @media (max-width: 599px) {
      gap: 10px;
    }
    a {
      width: 200px;
      line-height: 0;
      display: block;
      @media (max-width: 899px) {
        width: 140px;
      }
      img {
        width: 100%;
        height: 100%;
      }
    }
    .management-box {
      border-left: 1px solid ${({ theme }) => theme.palette.customColors.borderColor4};
      padding-left: 30px;
      @media (max-width: 599px) {
        padding-left: 10px;
      }
      .text {
        color: ${({ theme }) => theme.palette.customColors.light};
        @media (max-width: 599px) {
          font-size: 10px;
        }
      }
    }
  }
  .notification_icon {
    width: 47px;
    height: 42px;
    border-radius: 5px;
    min-width: auto;
    padding: 0;
    margin-right: 12px;
    .is_active {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      &::after {
        content: '';
        width: 8px;
        height: 8px;
        border-radius: 100%;
        position: absolute;
        right: 0;
        top: 1px;
        z-index: 1;
      }
    }
  }
  .avatar_block {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .avatar_btn {
    padding: 6px 7px;
    padding-right: 15px;
    border-radius: 50px;
    border: 1px solid ${({ theme }) => theme.palette.customColors.colore8e8e8};
    gap: 15px;
    @media (max-width: 899px) {
      gap: 0;
    }
    @media (max-width: 599px) {
      padding: 5px;
      gap: 0;
      border-radius: 50%;
      min-width: auto;
    }
    &:hover {
      background-color: ${({ theme }) => theme.palette.text.primary};

      p {
        color: ${({ theme }) => theme.palette.common.white};
      }
    }
    i {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 52px;
      height: 52px;
      border-radius: 100%;
      overflow: hidden;
      margin-right: 10px;
      @media (max-width: 899px) {
        width: 32px;
        height: 32px;
      }
      @media (max-width: 599px) {
        margin-right: 0;
      }
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    p {
      font-family: ${inter.style.fontFamily};
      font-weight: 500;
      font-size: 20px;
      line-height: 1.5;
      text-transform: capitalize;
      color: ${({ theme }) => theme.palette.text.primary};
      @media (max-width: 899px) {
        font-size: 14px;
      }
      @media (max-width: 599px) {
        display: none;
      }
    }
    span {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-left: 12px;
    }
  }
`;

const prfileImage = (
  userImage: string | undefined | null,
  interpreterImage: string | undefined | null
) => {
  if (userImage) {
    return mediaUrl(`user_profile_pic/${userImage}`);
  }
  if (interpreterImage) {
    return mediaUrl(`interpreter_profile_pic/${interpreterImage}`);
  }
  return assest.dashboardHeaderAvatarImage;
};

interface IheaderProps extends BoxProps {
  headerHeightCallBack: (data: number) => void;
  onMenuClick: () => void;
  isInterpreterType?: boolean;
}
const DashboardHeader: React.FC<IheaderProps & BoxProps> = ({
  headerHeightCallBack,
  onMenuClick,
  isInterpreterType,
  ...props
}) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const headerRef = useRef<HTMLDivElement>(null);
  const avatarBlockRef = useRef<HTMLDivElement>(null);
  const [headerHeight, setHeaderHeight] = useState<number | undefined>(0);
  const [avatarMenuWidth, setAvatarMenuWidth] = useState<number | undefined>(0);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const { interpreterData } = useInterpreterData();
  const { userData } = useUserData();

  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    if (avatarBlockRef.current) {
      setAvatarMenuWidth(avatarBlockRef.current?.clientWidth);
      const adjustWidth = () => {
        setAvatarMenuWidth(avatarBlockRef.current?.clientWidth);
      };

      window.addEventListener('resize', adjustWidth);

      return () => {
        window.removeEventListener('resize', adjustWidth);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [avatarBlockRef.current]);

  useEffect(() => {
    if (headerRef.current) {
      setHeaderHeight(headerRef.current?.clientHeight);
      const adjustHeight = () => {
        setHeaderHeight(headerRef.current?.clientHeight);
      };

      window.addEventListener('resize', adjustHeight);

      return () => {
        window.removeEventListener('resize', adjustHeight);
      };
    }
  }, [headerRef.current]);

  useEffect(() => {
    if (headerHeight) {
      headerHeightCallBack(headerHeight);
    }
  }, [headerHeight]);

  const theme = useTheme();
  const isTouchSerren = useMediaQuery(theme.breakpoints.down('lg'));
  const routeCheck = () => {
    isInterpreterType
      ? router.push('/interpreter/dashboard/profile')
      : router.push('/user/dashboard/account/');
  };

  return (
    <DashboardHeaderStyled ref={headerRef} {...props}>
      <Stack direction='row' alignItems='center' justifyContent='space-between'>
        <Box className='header_leftBox'>
          {isTouchSerren && (
            <IconButton disableRipple sx={{ padding: 0 }} onClick={onMenuClick}>
              <DashboardIcon />
            </IconButton>
          )}

          <Link href='/'>
            <Image src={assest?.logo_img} alt='logo' width={200} height={37} />
          </Link>

          {isInterpreterType && (
            <Box className='management-box'>
              <Typography className='text' variant='body2'>
                Management Hub
              </Typography>
            </Box>
          )}
        </Box>
        <Stack
          direction='row'
          alignItems='center'
          justifyContent='flex-end'
          className='header_options'
          ref={avatarBlockRef}
        >
          <Box sx={{ px: 2 }}>
            <NotificationBell />
          </Box>

          <Box className='avatar_block'>
            <Button
              id='basic-button'
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup='true'
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
              className='avatar_btn'
              disableRipple
            >
              <Typography component='i' className='avatar_image'>
                <Image
                  src={prfileImage(userData?.profile_image, interpreterData?.profile_image)}
                  alt='avatar image'
                  width={30}
                  height={30}
                />
              </Typography>
              <Typography>{interpreterData?.full_name || userData?.full_name}</Typography>
            </Button>
            <AvatarMenu
              id='basic-menu'
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              avatarMenuWidth={avatarMenuWidth}
            >
              <MenuItem
                onClick={() => {
                  handleClose();
                  routeCheck();
                }}
                disableRipple
                disableGutters
                disableTouchRipple
              >
                Profile
              </MenuItem>
              <MenuItem
                onClick={async () => {
                  const token = getCookie(storageKeys.cookies.fcmToken);
                  if (token) await stopNotifications();
                  dispatch(logout());
                  handleClose();
                }}
                disableRipple
                disableGutters
                disableTouchRipple
              >
                Logout
              </MenuItem>
            </AvatarMenu>
          </Box>
        </Stack>
      </Stack>
    </DashboardHeaderStyled>
  );
};

export default DashboardHeader;

export const AvatarMenu = styled(Menu, {
  shouldForwardProp: data => data !== 'avatarMenuWidth',
})<{ avatarMenuWidth: number | undefined }>`
  .MuiPaper-root {
    width: ${({ avatarMenuWidth }) => `${avatarMenuWidth}px`};
    box-shadow: 0px 3px 28px -6px rgba(0, 0, 0, 0.08);
    border-radius: 10px;
    @media (max-width: 599px) {
      width: auto;
    }

    ul {
      padding: 17px 17px;
      li {
        font-family: 'Roboto';
        font-weight: 400;
        font-size: 15px;
        line-height: 1.5;
        text-transform: capitalize !important;

        padding: 9px 0;
        &:first-child {
          padding-top: 0px;
        }
        &:last-child {
          padding-bottom: 0px;
        }
        &:hover {
          background-color: transparent;
        }
      }
    }
  }
`;
