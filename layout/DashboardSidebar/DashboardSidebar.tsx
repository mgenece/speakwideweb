import { storageKeys } from '@/config/constants';
import { useAppDispatch } from '@/hooks/redux/useAppDispatch';
import { useAppSelector } from '@/hooks/redux/useAppSelector';
import { stopNotifications } from '@/lib/fcm-helpers';
import { getCookie } from '@/lib/functions/storage.lib';
import { inter } from '@/mui-theme/_muiTheme';
import { handleCloseLogoutModal } from '@/redux-toolkit/slices/global.slice';
import { logout } from '@/redux-toolkit/slices/userSlice';
import { RootState } from '@/redux-toolkit/store/store';
import { CancelScheduleSessionStyled } from '@/styles/StyledComponents/CancelScheduleSessionStyled';
import Dashboard1 from '@/ui/Icons/Dashboard1';
import Dashboard2 from '@/ui/Icons/Dashboard2';
import Dashboard3 from '@/ui/Icons/Dashboard3';
import Dashboard4 from '@/ui/Icons/Dashboard4';
import Dashboard5 from '@/ui/Icons/Dashboard5';
import Dashboard6 from '@/ui/Icons/Dashboard6';
import Dashboard7 from '@/ui/Icons/Dashboard7';
import Dashboard8 from '@/ui/Icons/Dashboard8';
import Dashboard9 from '@/ui/Icons/Dashboard9';
import DashboardArrowExpandIcon from '@/ui/Icons/DashboardArrowExpandIcon';
import DashboardMenuIconEarning from '@/ui/Icons/DashboardMenuIconEarning';
import DashboardPaymentSubscriptionIcon from '@/ui/Icons/DashboardPaymentSubscriptionIcon';
import DashboardProfileMenuIcon from '@/ui/Icons/DashboardProfileMenuIcon';
import DashboardSessionHistryIcon from '@/ui/Icons/DashboardSessionHistryIcon';
import LogoutIcon from '@/ui/Icons/LogoutIcon';
import LogoutIcon2 from '@/ui/Icons/LogoutIcon2';
import ModalCrossIcon from '@/ui/Icons/ModalCrossIcon';
import MuiModalWrapper from '@/ui/Modal/MuiModalWrapper';

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  BoxProps,
  Button,
  List,
  ListItem,
  Stack,
  styled,
  Typography,
} from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';

const commonpath = '/user/dashboard';
const commonpathTw = '/interpreter/dashboard';

type TNavItem = {
  name: string;
  route: string;
  icon: React.ReactNode;
  submenu?: { subName: string; subRouteroute: string }[];
};

const navItems: TNavItem[] = [
  {
    name: 'Dashboard',
    route: `${commonpath}`,
    icon: <Dashboard1 />,
  },
  {
    name: 'Request Session',
    route: `${commonpath}/request-session`,
    icon: <Dashboard2 />,
  },
  {
    name: 'Chat History',
    route: `${commonpath}/chat-history`,
    icon: <Dashboard3 />,
  },
  {
    name: 'Favorite List',
    route: `${commonpath}/favorite-list`,
    icon: <Dashboard4 />,
  },
  {
    name: 'Calendar',
    route: `${commonpath}/calendar`,
    icon: <Dashboard5 />,
  },
  {
    name: 'Payment & Subscription',
    route: `${commonpath}/payment-subscription`,
    icon: <Dashboard6 />,
  },
  {
    name: 'Dispute List',
    route: `${commonpath}/dispute`,
    icon: <Dashboard7 />,
  },
  {
    name: 'Help & Support',
    route: `${commonpath}/help-support`,
    icon: <Dashboard8 />,
  },
  {
    name: 'Settings',
    route: `${commonpath}/#`,
    icon: <Dashboard9 />,
    submenu: [
      {
        subName: 'Account Information',
        subRouteroute: `${commonpath}/account`,
      },
      {
        subName: 'Change Password',
        subRouteroute: `${commonpath}/change-password`,
      },
    ],
  },
];
const navItemsTw: TNavItem[] = [
  {
    name: 'Dashboard',
    route: `${commonpathTw}`,
    icon: <Dashboard1 />,
  },
  {
    name: 'Earnings & Payouts',
    route: `${commonpathTw}/earnings-and-payouts`,
    icon: <DashboardMenuIconEarning />,
  },
  {
    name: 'Chat History',
    route: `${commonpathTw}/chat-history`,
    icon: <Dashboard3 />,
  },
  {
    name: 'Session History',
    route: `${commonpathTw}/session-history`,
    icon: <DashboardSessionHistryIcon />,
  },
  {
    name: 'Dispute List',
    route: `${commonpathTw}/dispute`,
    icon: <Dashboard7 />,
  },
  {
    name: 'Payment & Subscription',
    route: `${commonpathTw}/payment-subscription`,
    icon: <DashboardPaymentSubscriptionIcon />,
  },
  {
    name: 'Help & Support',
    route: `${commonpathTw}/help-support`,
    icon: <Dashboard8 />,
  },
  {
    name: 'Profile',
    route: `${commonpathTw}/profile`,
    icon: <DashboardProfileMenuIcon />,
  },
];

interface ISidebarProps extends BoxProps {
  mobileMenu?: boolean;
  closeBtnClick?: () => void;
  interpreterType?: boolean;
}

const DashboardSidebar: React.FC<ISidebarProps> = ({
  mobileMenu,
  closeBtnClick,
  interpreterType,
  ...props
}) => {
  const logoRef = useRef<HTMLDivElement>(null);
  const LogoutRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [getLogoSecHeight, setGetLogoSecHeight] = useState<number>(0);
  const [getLogoutSecheight, setGetLogoutSecheight] = useState<number>(0);

  const isLogoutModalOpen = useAppSelector(
    (state: RootState) => state.globalSlice.isLogoutModalOpen
  );

  const activeItem: TNavItem | null = navItemsTw.reduce<TNavItem | null>((acc, item) => {
    if (router.pathname === item.route || router.pathname.startsWith(`${item.route}/`)) {
      if (!acc || item.route.length > acc.route.length) {
        return item;
      }
    }
    return acc;
  }, null);

  useEffect(() => {
    if (logoRef.current && LogoutRef.current) {
      setGetLogoSecHeight(logoRef.current.clientHeight);
      setGetLogoutSecheight(LogoutRef.current.clientHeight);
    }
  }, []);

  return (
    <DashboardSidebarWrapper
      logoutSecHeight={getLogoutSecheight}
      listHeight={getLogoSecHeight}
      {...props}
      className={mobileMenu ? 'active' : ''}
    >
      <Button className='closeBtnMenu' disableRipple onClick={closeBtnClick}>
        <ModalCrossIcon />
      </Button>

      <List disablePadding className='sidebar_menu'>
        {interpreterType
          ? navItemsTw.map((data, index) =>
              data.submenu ? (
                <Accordion
                  key={index}
                  className={`sidebar_accordion ${
                    data.submenu.some(sub => router.pathname === sub.subRouteroute)
                      ? 'Mui-expanded'
                      : ''
                  }`}
                  defaultExpanded={data.submenu.some(sub => router.pathname === sub.subRouteroute)}
                  disableGutters
                  elevation={0}
                  square
                >
                  <AccordionSummary expandIcon={<DashboardArrowExpandIcon />}>
                    <Button
                      startIcon={data.icon}
                      className={
                        data.submenu.some(sub => router.pathname === sub.subRouteroute)
                          ? 'active'
                          : ''
                      }
                      onClick={e => e.preventDefault()}
                      disableRipple
                    >
                      {data.name}
                    </Button>
                  </AccordionSummary>
                  <AccordionDetails>
                    <List disablePadding className='submenu'>
                      {data.submenu.map((sub, subIndex) => (
                        <ListItem
                          disablePadding
                          key={subIndex}
                          className={router.pathname === sub.subRouteroute ? 'active' : ''}
                        >
                          <Link
                            href={sub.subRouteroute}
                            className='submenu-item'
                            // onClick={() => router.push(sub.subRouteroute)}
                          >
                            {sub.subName}
                          </Link>
                        </ListItem>
                      ))}
                    </List>
                  </AccordionDetails>
                </Accordion>
              ) : (
                <ListItem
                  disablePadding
                  key={index}
                  className={activeItem?.route === data.route ? 'active' : ''}
                >
                  <Button href={data.route} startIcon={data.icon}>
                    {data.name}
                  </Button>
                </ListItem>
              )
            )
          : navItems.map((data, index) =>
              data.submenu ? (
                <Accordion
                  key={index}
                  className={`sidebar_accordion ${
                    data.submenu.some(sub => router.pathname === sub.subRouteroute)
                      ? 'Mui-expanded'
                      : ''
                  }`}
                  defaultExpanded={data.submenu.some(sub => router.pathname === sub.subRouteroute)}
                  disableGutters
                  elevation={0}
                  square
                >
                  <AccordionSummary expandIcon={<DashboardArrowExpandIcon />}>
                    <Button
                      startIcon={data.icon}
                      className={
                        data.submenu.some(sub => router.pathname === sub.subRouteroute)
                          ? 'active'
                          : ''
                      }
                      onClick={e => e.preventDefault()}
                      disableRipple
                    >
                      {data.name}
                    </Button>
                  </AccordionSummary>
                  <AccordionDetails>
                    <List disablePadding className='submenu'>
                      {data.submenu.map((sub, subIndex) => (
                        <ListItem
                          disablePadding
                          key={subIndex}
                          className={router.pathname === sub.subRouteroute ? 'active' : ''}
                        >
                          <Link
                            href={sub.subRouteroute}
                            className='submenu-item'
                            // onClick={() => router.push(sub.subRouteroute)}
                          >
                            {sub.subName}
                          </Link>
                        </ListItem>
                      ))}
                    </List>
                  </AccordionDetails>
                </Accordion>
              ) : (
                <ListItem
                  disablePadding
                  key={index}
                  className={router.pathname === data.route ? 'active' : ''}
                >
                  <Button href={data.route} startIcon={data.icon}>
                    {data.name}
                  </Button>
                </ListItem>
              )
            )}
      </List>

      <Box className='logout_block' ref={LogoutRef}>
        <Button
          onClick={async () => {
            const token = getCookie(storageKeys.cookies.fcmToken);
            if (token) await stopNotifications();
            dispatch(logout());
          }}
          startIcon={<LogoutIcon />}
        >
          Logout
        </Button>
      </Box>

      {/* LOGOUT MODAL START HERE */}
      <MuiModalWrapper
        open={isLogoutModalOpen}
        onClose={() => dispatch(handleCloseLogoutModal())}
        className='subscriptionSessionModal'
      >
        <CancelScheduleSessionStyled className='logout-modal'>
          <Box className='subscription-cancel-sec'>
            <Box className='inner-box'>
              <i className='icon-wrap'>
                <LogoutIcon2 />
              </i>
              <Typography variant='h4' fontWeight={600}>
                Logging out will end your session Proceed?
              </Typography>
            </Box>
          </Box>
          <Stack
            direction='row'
            alignItems='center'
            justifyContent='center'
            flexWrap='wrap'
            className='btn-stack'
          >
            <Button
              variant='contained'
              color='primary'
              className='primaryBtn'
              aria-label='Yes Cancel'
              onClick={() => {
                dispatch(handleCloseLogoutModal());
                router.push('/auth/login');
              }}
            >
              Yes
            </Button>
            <Button
              variant='contained'
              color='primary'
              className='no-btn'
              aria-label='No'
              onClick={() => dispatch(handleCloseLogoutModal())}
            >
              No
            </Button>
          </Stack>
        </CancelScheduleSessionStyled>
      </MuiModalWrapper>
    </DashboardSidebarWrapper>
  );
};

export default DashboardSidebar;

export const DashboardSidebarWrapper = styled(Box, {
  shouldForwardProp: data => data !== 'listHeight',
})<{
  listHeight: number | undefined;
  logoutSecHeight: number | undefined;
}>`
  width: 274px;
  flex-basis: 274px;
  position: fixed;
  left: 0px;
  top: 103px;
  height: calc(100dvh - 103px);
  overflow-y: auto;
  z-index: 5;
  background: ${({ theme }) => theme.palette.text.primary};
  @media (max-width: 1199px) {
    position: fixed;
    top: 0;
    border-radius: 0 16px 16px 0;
    height: 100%;
    transform: translateX(-100%);
    left: -100%;
    z-index: 9999;
    transition: 0.3s ease-in-out;
    &.active {
      left: 0;
      transform: translateX(0);
    }
  }
  .closeBtnMenu {
    display: none;
    min-width: auto;
    align-items: center;
    justify-content: center;
    position: absolute;
    right: 4px;
    top: 4px;
    z-index: 99;
    &:hover {
      opacity: 0.7;
    }
    @media (max-width: 1199px) {
      display: flex;
    }
  }

  .logo_sec {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 25px 20px 45px;
    a {
      display: inline-block;
    }
  }
  .sidebar_menu {
    margin-top: 10px;
    padding: 0 10px 20px 10px;
    height: calc(100dvh - 235px);
    overflow-y: auto;
    @media (max-width: 1199px) {
      margin-top: 50px;
    }
    @media (max-width: 899px) {
      height: calc(100% - 119px);
    }
    li {
      &:not(:last-child) {
        margin-bottom: 5px;
      }
      a {
        text-transform: capitalize;
        font-family: ${inter.style.fontFamily};
        font-weight: 500;
        font-size: 16px;
        line-height: 1.5;
        width: 100%;
        justify-content: flex-start;
        padding: 17px 2px 17px 10px;
        border-radius: 10px;
        color: ${({ theme }) => theme.palette.common.white};
        .MuiButton-startIcon {
          margin-left: 0px;
          margin-right: 12px;
        }
        &:hover {
          background: linear-gradient(90deg, #ffbe79 -7.09%, #8142e9 99.95%);
        }
      }
      &.active {
        a {
          background: linear-gradient(90deg, #ffbe79 -7.09%, #8142e9 99.95%);
        }
      }
    }
  }
  .logout_block {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    padding: 20px 20px 50px 20px;
    z-index: 3;
    background: ${({ theme }) => theme.palette.text.primary};
    padding-left: 50px;
    @media (max-width: 899px) {
      padding: 10px 15px;
    }
    a {
      font-family: ${inter.style.fontFamily};
      font-weight: 500;
      font-size: 16px;
      line-height: 1.5;
      width: 100%;
      justify-content: flex-start;
      padding: 17px 37px;
      text-transform: capitalize;
      background: rgb(0, 135, 155);
      border-radius: 100px;
      color: ${({ theme }) => theme.palette.common.white};
      max-width: 150px;
      .MuiButton-startIcon {
        margin-left: 0px;
        margin-right: 12px;
      }
      &:hover {
        background: linear-gradient(90deg, #ffbe79 -7.09%, #8142e9 99.95%);
      }
    }
    button {
      font-family: ${inter.style.fontFamily};
      font-weight: 500;
      font-size: 16px;
      line-height: 1.5;
      width: 100%;
      justify-content: flex-start;
      padding: 17px 37px;
      text-transform: capitalize;
      background: rgb(0, 135, 155);
      border-radius: 100px;
      color: ${({ theme }) => theme.palette.common.white};
      max-width: 150px;
      .MuiButton-startIcon {
        margin-left: 0px;
        margin-right: 12px;
      }
      &:hover {
        background: linear-gradient(90deg, #ffbe79 -7.09%, #8142e9 99.95%);
      }
    }
  }
  .sidebar_accordion {
    background: ${({ theme }) => theme.palette.text.primary};
    .MuiAccordionSummary-root {
      padding: 14.5px 20px 14.5px 10px;
      min-height: auto;
    }
    .MuiAccordionSummary-content {
      margin: 0;
      button {
        padding: 0;
        gap: 10px;
        font-weight: 500;
        font-size: 16px;
        text-transform: capitalize;
        color: ${({ theme }) => theme.palette.common.white};
      }
    }
    .MuiAccordionDetails-root {
      padding: 8px 0 16px;
      li {
        justify-content: flex-start;
        &:not(:last-child) {
          margin-bottom: 8px;
        }
        a {
          padding: 0;
          font-size: 12px;
          font-weight: 500;
          color: ${({ theme }) => theme.palette.common.white};
          text-transform: capitalize;
          width: 100%;
          justify-content: flex-start;
          padding: 13px 15px 13px 25px;
          border-radius: 10px;
          &.active {
            background: linear-gradient(90deg, #ffbe79 -7.09%, #8142e9 99.95%);
          }
          &:hover {
            background: linear-gradient(90deg, #ffbe79 -7.09%, #8142e9 99.95%);
          }
        }
        &.active {
          a {
            background: linear-gradient(90deg, #ffbe79 -7.09%, #8142e9 99.95%);
          }
        }
      }
    }
  }
`;
