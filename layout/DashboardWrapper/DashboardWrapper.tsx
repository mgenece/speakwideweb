import styled from '@emotion/styled';
import Box from '@mui/material/Box';

import assest from '@/json/assest';
import { Typography } from '@mui/material';
import Stack, { StackProps } from '@mui/material/Stack';
import Image from 'next/image';
import React, { useCallback, useState } from 'react';
import DashboardHeader from '../DashboardHeader/DashboardHeader';
import DashboardSidebar from '../DashboardSidebar/DashboardSidebar';

interface IdashBoardProps extends StackProps {
  pageTitle?: string;
  isReqSession?: boolean;
  smallPadding?: boolean;
  isInterpreterType?: boolean;
}

const DashboardWrapper: React.FC<IdashBoardProps & StackProps> = ({
  pageTitle,
  isReqSession,
  smallPadding,
  isInterpreterType,
  ...props
}) => {
  const [getHeaderHeight, setGetHeaderHeight] = useState<number>(0);

  const headerHeightCallBack = useCallback((data: number) => {
    setGetHeaderHeight(data);
  }, []);
  const [mobileMenuClick, setMobileMenuClick] = useState(false);
  const handelMenuToggle = () => {
    setMobileMenuClick(!mobileMenuClick);
  };

  return (
    <DashboardOuterWrapper className={mobileMenuClick ? 'noScroll' : ''}>
      <DashboardWrapperStyled
        sx={props.sx}
        headerHeight={getHeaderHeight}
        direction='row'
        flexWrap='wrap'
        {...props}
      >
        {isReqSession && (
          <Image
            width={1600}
            height={900}
            alt=''
            src={assest.REquestSessionBg}
            className='rEquestSessionBg'
          />
        )}

        <DashboardSidebar
          mobileMenu={mobileMenuClick}
          closeBtnClick={handelMenuToggle}
          interpreterType={isInterpreterType}
        />
        <Box className={`wrapper_rgt ${smallPadding ? 'small_padding' : ''}`}>
          <DashboardHeader
            headerHeightCallBack={headerHeightCallBack}
            onMenuClick={handelMenuToggle}
            isInterpreterType={isInterpreterType}
          />
          <Box className={mobileMenuClick ? 'noScroll dashboard_body' : 'dashboard_body'}>
            {pageTitle && (
              <Typography
                variant='h1'
                fontSize={24}
                fontWeight={600}
                pb={{ lg: 3.75, md: 2.5, xs: 2 }}
              >
                {pageTitle}
              </Typography>
            )}
            {props?.children}
          </Box>
        </Box>
        <Box
          className={mobileMenuClick ? 'active overlayMain' : 'overlayMain'}
          onClick={handelMenuToggle}
        />
      </DashboardWrapperStyled>
    </DashboardOuterWrapper>
  );
};

export default DashboardWrapper;

export const DashboardWrapperStyled = styled(Stack, {
  shouldForwardProp: data => data !== 'headerHeight',
})<{ headerHeight: number }>`
  height: 100svh;
  background: url(${assest.dashboardBg}) no-repeat;
  background-size: cover;
  position: relative;
  .rEquestSessionBg {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    pointer-events: none;
  }

  .wrapper_rgt {
    width: calc(100% - 274px);
    flex-basis: calc(100% - 274px);
    padding-left: 30px;
    padding-top: ${({ headerHeight }) => `${headerHeight}px`};
    margin-left: auto;
    @media (max-width: 1199px) {
      width: 100%;
      flex-basis: 100%;
      padding-left: 0;
    }
    &.small_padding {
      padding-left: 0;
    }
  }
  .dashboard_body {
    padding: 30px 20px;
    border-radius: 20px;
    height: calc(100dvh - 103px);
    overflow-y: auto;
    position: relative;
    z-index: 2;
    /* @media (max-width: 1399px) {
      padding: 20px 15px 20px 0;
    } */
    @media (max-width: 899px) {
      padding: 20px 15px;
      height: calc(100dvh - 67px);
    }
    @media (max-width: 599px) {
      height: calc(100dvh - 65px);
    }
    &.noScroll {
      height: 100dvh;
      overflow: hidden;
    }
    h1 {
      @media (max-width: 899px) {
        font-size: 20px;
      }
      @media (max-width: 599px) {
        font-size: 18px;
      }
    }
  }
  .common_box {
    padding: 16px 20px;
    border-radius: 10px;
  }
  .primaryBtn {
    background: url(${assest.btnbg}) no-repeat;
    background-size: cover;
    padding: 0;
    min-width: 142px;
    min-height: 50px;

    &:hover {
      background: #fff;
    }
  }
  .overlayMain {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100vh;
    position: fixed;
    background: rgba(0, 0, 0, 0.2);
    backdrop-filter: blur(10px);
    display: none;
    z-index: 9;
    &.active {
      @media (max-width: 1199px) {
        display: block;
      }
    }
  }
`;

export const DashboardOuterWrapper = styled(Box)`
  &.noScroll {
    overflow: hidden;
    height: 100vh;
  }
`;
