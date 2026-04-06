/* eslint-disable @next/next/no-img-element */
import useElementSize from '@/hooks/resizeHook/resize';
import assest from '@/json/assest';
import { authSliderData } from '@/json/mock/demo.mock';
import {
  AuthContainer,
  AuthHeading,
  AuthLeft,
  AuthRight,
} from '@/styles/StyledComponents/AuthWrapperStyled';
import { IAuthProps } from '@/typescript/interface/commonall.interface';
import SlideArrowNextIcon from '@/ui/Icons/SlideArrowNextIcon';
import SlideArrowPrevIcon from '@/ui/Icons/SlideArrowPrevIcon';
import {
  Avatar,
  Box,
  Button,
  IconButton,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useRef } from 'react';

const AuthWrapper = ({
  authText,
  buttonText,
  pageLink,
  children,
  headerRight,
  isBack,
  headingSpan,
  mainHeding,
  customClass,
  subText,
  subTextSpan,
}: IAuthProps) => {
  const splideRef = useRef<Splide | null>(null);
  const theme = useTheme();

  const tabScreenView = useMediaQuery(theme.breakpoints.down('lg'));
  const mobileScreenView = useMediaQuery(theme.breakpoints.down('sm'));
  const [loginHeadRef, { height: loginHeadheight }] = useElementSize<HTMLDivElement>();
  const router = useRouter();
  const midScreenView = useMediaQuery('(min-width:599px) and (max-width:899px)');
  const tabOnly = useMediaQuery('(min-width:899px) and (max-width:1199px)');
  const offset = mobileScreenView ? '30px' : tabOnly ? '60px' : midScreenView ? '30px' : '90px';

  return (
    <AuthContainer direction='row' flexWrap='wrap' className={customClass}>
      <AuthLeft>
        <Stack
          direction='row'
          alignItems='center'
          flexWrap='wrap'
          justifyContent='space-between'
          className='auth-head'
          ref={loginHeadRef}
        >
          <Link href='/' className='header-logo'>
            <Image src={assest.logo_img} width={200} height={37} alt='logo' />
          </Link>
          {headerRight && pageLink && !mobileScreenView && (
            <Stack direction='row' alignItems='center' flexWrap='wrap' className='auth-head-right'>
              <Typography variant='body1' className='text'>
                {authText}
              </Typography>
              <Link href={pageLink} className='auth-btn black-gradiant-btn'>
                {buttonText}
              </Link>
            </Stack>
          )}
        </Stack>
        <Box
          height={`calc(100svh - (${loginHeadheight}px + ${offset}))`}
          className={`left-child-content ${isBack ? 'back-height' : ''}`}
        >
          <Box className='child-content-wrap'>
            <AuthHeading className='authheadingStyled'>
              <Typography variant='h1'>
                <span>{headingSpan}</span> {mainHeding}
              </Typography>
              <Typography variant='body1'>
                {subText} {subTextSpan && <span className='bold-text'>{subTextSpan}</span>}
              </Typography>
            </AuthHeading>
            {children}
            {headerRight && pageLink && mobileScreenView && (
              <Stack
                direction='row'
                alignItems='center'
                flexWrap='wrap'
                justifyContent='center'
                className='auth-head-right'
                mt={'15px'}
                gap={'5px'}
              >
                <Typography variant='body1'>{authText}</Typography>
                <Link href={pageLink} className='auth-btn'>
                  {buttonText}
                </Link>
              </Stack>
            )}
          </Box>
        </Box>
        {isBack && !tabScreenView && (
          <Button className='goback-btn' onClick={() => router.back()}>
            Go Back
          </Button>
        )}
      </AuthLeft>
      {!tabScreenView && (
        <AuthRight>
          <figure style={{ margin: 0 }}>
            <img
              src={assest.authBanner}
              width={814}
              height={877}
              alt='authBanner'
              className='float-img'
            />
            <Avatar
              src={assest.authAvt01}
              alt='avatar1'
              sx={{ width: 43, height: 43 }}
              className='auth-avt1'
            />
            <Avatar
              src={assest.authAvt02}
              alt='avatar1'
              sx={{ width: 43, height: 43 }}
              className='auth-avt2'
            />
            <Avatar
              src={assest.authAvt03}
              alt='avatar1'
              sx={{ width: 60, height: 60 }}
              className='auth-avt3'
            />
            <Avatar
              src={assest.authAvt04}
              alt='avatar1'
              sx={{ width: 43, height: 43 }}
              className='auth-avt4'
            />
            <Avatar
              src={assest.authAvt05}
              alt='avatar1'
              sx={{ width: 43, height: 43 }}
              className='auth-avt5'
            />
            <Avatar
              src={assest.authAvt06}
              alt='avatar1'
              sx={{ width: 43, height: 43 }}
              className='auth-avt6'
            />
            <Avatar
              src={assest.authAvt07}
              alt='avatar1'
              sx={{ width: 43, height: 43 }}
              className='auth-avt7'
            />
          </figure>
          <Box className='auth-slider'>
            <Box className='slider-content'>
              <Stack direction='row' alignItems='center' flexWrap='wrap' className='slide-head'>
                <Typography variant='body1'>Professional Interpretation on Demand</Typography>
                <Stack direction='row' alignItems='center' flexWrap='wrap' className='slide-arrows'>
                  <IconButton onClick={() => splideRef.current?.splide?.go('<')}>
                    <SlideArrowPrevIcon />
                  </IconButton>
                  <IconButton onClick={() => splideRef.current?.splide?.go('>')}>
                    <SlideArrowNextIcon />
                  </IconButton>
                </Stack>
              </Stack>
              <Splide
                aria-label='Review slide'
                ref={splideRef}
                options={{
                  perPage: 1,
                  perMove: 1,
                  autoplay: true,
                  interval: 3000,
                  arrows: false,
                  pagination: false,
                  wheel: false,
                  breakpoints: {
                    1199: {
                      // direction: 'ltr',
                    },
                  },
                }}
              >
                {authSliderData.map((items, index) => (
                  <SplideSlide key={index}>
                    <Typography variant='body1' className='description-text'>
                      {items.description}
                    </Typography>
                  </SplideSlide>
                ))}
              </Splide>
            </Box>
          </Box>
        </AuthRight>
      )}
    </AuthContainer>
  );
};

export default AuthWrapper;
