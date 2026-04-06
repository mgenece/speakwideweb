import { mediaUrl } from '@/api/endpoints';
import { useUserData } from '@/hooks/react-query/useVisitor';
import assest from '@/json/assest';
import CustomButtonPrimary from '@/ui/CustomButtons/CustomButtonPrimary';
import BusinessIcon from '@/ui/Icons/BusinessIcon';
import BusinessIcon2 from '@/ui/Icons/BusinessIcon2';
import MapIcon from '@/ui/Icons/MapIcon';
import ProfileDetailsIcon from '@/ui/Icons/ProfileDetailsIcon';
import { Box, CircularProgress, Grid2, Stack, Typography } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/router';

function ProfileBody() {
  const { userData, isUserLoading } = useUserData();
  const router = useRouter();

  if (isUserLoading) {
    return (
      <Box height={100} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box className='inner-main-box'>
      <Stack
        direction={{ sm: 'row', xs: 'column' }}
        alignItems={{ sm: 'center', xs: 'flex-start' }}
        justifyContent={'space-between'}
        flexWrap={'wrap'}
        className='top-stack'
        gap={{ sm: 0, xs: '10px' }}
      >
        <Stack direction={'row'} alignItems={'center'} flexWrap={'wrap'} spacing={'18px'}>
          <figure className='profile-img-fig'>
            <Image
              src={
                userData?.profile_image
                  ? mediaUrl(`user_profile_pic/${userData.profile_image}`)
                  : assest.dashboardHeaderAvatarImage
              }
              width={72}
              height={72}
              alt='profile-image'
            />
          </figure>
          <Typography variant='h2' className='user-name'>
            {userData?.full_name}
          </Typography>
        </Stack>
        <CustomButtonPrimary
          disableRipple
          variant='outlined'
          aria-label='Edit Profile'
          className='edit-button'
          onClick={() => {
            router.push('/user/dashboard/account/edit');
          }}
        >
          Edit Profile
        </CustomButtonPrimary>
      </Stack>
      <Box className='body-box'>
        <Grid2 container spacing={{ sm: '37px', xs: '20px' }}>
          <Grid2 size={{ xs: 12 }}>
            <Stack
              direction={'row'}
              alignItems={'center'}
              justifyContent={'space-between'}
              flexWrap={'wrap'}
              className='common-head-stack'
            >
              <Typography className='title'>Profile Details</Typography>
              <i className='icon'>
                <ProfileDetailsIcon />
              </i>
            </Stack>
            <Box className='details-box-main'>
              <Grid2 container spacing={{ sm: '20px', xs: '10px' }}>
                <Grid2 size={{ md: 4.5, xs: 12 }}>
                  <Box className='details-box'>
                    <Typography className='input-label' variant='body2'>
                      Full Name
                    </Typography>
                    <Typography className='input-value'>{userData?.full_name}</Typography>
                  </Box>
                </Grid2>
                <Grid2 size={{ md: 3.5, xs: 12 }}>
                  <Box className='details-box'>
                    <Typography className='input-label' variant='body2'>
                      Email
                    </Typography>
                    <Typography className='input-value'>{userData?.email}</Typography>
                  </Box>
                </Grid2>
                <Grid2
                  size={{ md: 4, xs: 12 }}
                  sx={{ display: 'flex', justifyContent: { md: 'flex-end', xs: 'flex-start' } }}
                >
                  <Box className='details-box' sx={{ textAlign: { xs: 'left' } }}>
                    <Typography className='input-label' variant='body2'>
                      Phone
                    </Typography>
                    <Typography className='input-value'>{userData?.phone}</Typography>
                  </Box>
                </Grid2>
              </Grid2>
            </Box>
          </Grid2>
          <Grid2 size={{ xs: 12 }}>
            <Stack
              direction={'row'}
              alignItems={'center'}
              justifyContent={'space-between'}
              flexWrap={'wrap'}
              className='common-head-stack'
            >
              <Typography className='title'>Business Details</Typography>
              <i className='icon'>
                <BusinessIcon />
              </i>
            </Stack>
            <Box className='details-box-main'>
              <Grid2 container spacing={{ sm: '20px', xs: '10px' }}>
                <Grid2 size={{ md: 4.5, xs: 12 }}>
                  <Box className='details-box'>
                    <Typography className='input-label' variant='body2'>
                      Business Name
                    </Typography>
                    <Typography className='input-value'>
                      {userData?.user_business_info?.business_name}
                    </Typography>
                  </Box>
                </Grid2>
                <Grid2 size={{ md: 3.5, xs: 12 }}>
                  <Box className='details-box'>
                    <Typography className='input-label' variant='body2'>
                      Business Email
                    </Typography>
                    <Typography className='input-value'>
                      {userData?.user_business_info?.business_email}
                    </Typography>
                  </Box>
                </Grid2>
                <Grid2
                  size={{ md: 4, xs: 12 }}
                  sx={{ display: 'flex', justifyContent: { md: 'flex-end', xs: 'flex-start' } }}
                >
                  <Box className='details-box' sx={{ textAlign: { xs: 'left' } }}>
                    <Typography className='input-label' variant='body2'>
                      Business Phone
                    </Typography>
                    <Typography className='input-value'>
                      {userData?.user_business_info?.business_phone}
                    </Typography>
                  </Box>
                </Grid2>
                <Grid2 size={{ md: 4.5, xs: 12 }}>
                  <Box className='details-box'>
                    <Typography className='input-label' variant='body2'>
                      Representative Name
                    </Typography>
                    <Typography className='input-value'>
                      {userData?.user_business_info?.representative_name}
                    </Typography>
                  </Box>
                </Grid2>
                <Grid2 size={{ md: 3.5, xs: 12 }}>
                  <Box className='details-box'>
                    <Typography className='input-label' variant='body2'>
                      Title
                    </Typography>
                    <Typography className='input-value'>
                      {userData?.user_business_info?.representative_title}
                    </Typography>
                  </Box>
                </Grid2>
                <Grid2
                  size={{ md: 4, xs: 12 }}
                  sx={{ display: 'flex', justifyContent: { md: 'flex-end', xs: 'flex-start' } }}
                >
                  <Box className='details-box' sx={{ textAlign: { xs: 'left' } }}>
                    <Typography className='input-label' variant='body2'>
                      Business Sector
                    </Typography>
                    <Typography className='input-value'>
                      {userData?.user_business_info?.business_sector?.title}
                    </Typography>
                  </Box>
                </Grid2>
              </Grid2>
            </Box>
          </Grid2>
          <Grid2 size={{ xs: 12 }}>
            <Stack
              direction={'row'}
              alignItems={'center'}
              justifyContent={'space-between'}
              flexWrap={'wrap'}
              className='common-head-stack'
            >
              <Typography className='title'>Location Details</Typography>
              <i className='icon'>
                <MapIcon />
              </i>
            </Stack>
            <Box className='details-box-main'>
              <Grid2 container spacing={{ sm: '20px', xs: '10px' }}>
                <Grid2 size={{ md: 7, xs: 12 }}>
                  <Box className='details-box'>
                    <Typography className='input-label' variant='body2'>
                      Street Address
                    </Typography>
                    <Typography className='input-value'>
                      {userData?.user_business_info?.street}
                    </Typography>
                  </Box>
                </Grid2>
                <Grid2 size={{ md: 2.5, xs: 12 }}>
                  <Box className='details-box'>
                    <Typography className='input-label' variant='body2'>
                      City
                    </Typography>
                    <Typography className='input-value'>
                      {userData?.user_business_info?.city}
                    </Typography>
                  </Box>
                </Grid2>
                <Grid2
                  size={{ md: 2.5, xs: 12 }}
                  sx={{ display: 'flex', justifyContent: { md: 'flex-end', xs: 'flex-start' } }}
                >
                  <Box className='details-box' sx={{ textAlign: { xs: 'left' } }}>
                    <Typography className='input-label' variant='body2'>
                      State
                    </Typography>
                    <Typography className='input-value'>
                      {userData?.user_business_info?.state}
                    </Typography>
                  </Box>
                </Grid2>
                <Grid2 size={{ md: 7, xs: 12 }}>
                  <Box className='details-box'>
                    <Typography className='input-label' variant='body2'>
                      Business Website
                    </Typography>
                    <Typography className='input-value'>
                      {userData?.user_business_info?.business_website}
                    </Typography>
                  </Box>
                </Grid2>
                <Grid2 size={{ md: 2.5, xs: 12 }}>
                  <Box className='details-box'>
                    <Typography className='input-label' variant='body2'>
                      Zip Code
                    </Typography>
                    <Typography className='input-value'>
                      {userData?.user_business_info?.zipcode}
                    </Typography>
                  </Box>
                </Grid2>
              </Grid2>
            </Box>
          </Grid2>
          <Grid2 size={{ xs: 12 }}>
            <Stack
              direction={'row'}
              alignItems={'center'}
              justifyContent={'space-between'}
              flexWrap={'wrap'}
              className='common-head-stack'
            >
              <Typography className='title'>Business Logo</Typography>
              <i className='icon'>
                <BusinessIcon2 />
              </i>
            </Stack>
            <Box className='details-box-main'>
              <Grid2 container spacing={{ sm: '20px', xs: '10px' }}>
                <Grid2 size={{ xs: 12 }}>
                  <figure className='logo-figure'>
                    <Image
                      src={
                        userData?.user_business_info?.business_logo
                          ? mediaUrl(
                              `user_business_logos/${userData.user_business_info.business_logo}`
                            )
                          : assest.noImage
                      }
                      width={100}
                      height={40}
                      alt='business-logo'
                    />
                  </figure>
                </Grid2>
              </Grid2>
            </Box>
          </Grid2>
        </Grid2>
      </Box>
    </Box>
  );
}

export default ProfileBody;
