import ProfileEditBody from '@/components/layouts/profile/user/ProfileEditBody';
import ProfileEditHead from '@/components/layouts/profile/user/ProfileEditHead';
import DashboardWrapper from '@/layout/DashboardWrapper/DashboardWrapper';
import { RequestSessionModalContentWrap } from '@/styles/StyledComponents/RequestSessionModalContentWrap';
import { Box, Stack, Typography } from '@mui/material';

function Edit() {
  return (
    <DashboardWrapper pageTitle='Profile Information'>
      <RequestSessionModalContentWrap className='editAccountContent'>
        <Box p={4}>
          <Stack
            direction={{ sm: 'row', xs: 'column' }}
            alignItems={{ sm: 'center', xs: 'flex-start' }}
            justifyContent={'space-between'}
            flexWrap={'wrap'}
            className='top-stack'
            spacing={{ sm: 0, xs: 2 }}
          >
            <Box>
              <Typography className='head-title'>Your Profile</Typography>
            </Box>
          </Stack>
          {/* <Box className='profile-pic-box'>
            <Stack
              direction={'row'}
              alignItems={'center'}
              flexWrap={'wrap'}
              spacing={'10px'}
              sx={{ pb: { sm: '25px', xs: '10px' } }}
            >
              <i className='icon'>
                <ImageIcon />
              </i>
              <Typography className='label'>Profile Picture</Typography>
            </Stack>
            <Stack
              direction={{ sm: 'row', xs: 'column' }}
              alignItems={'center'}
              flexWrap={'wrap'}
              spacing={'18px'}
            >
              <figure className='profile-image-fig'>
                <Image src={assest.placeImage} width={100} height={100} alt='profile-image' />
              </figure>
              <Stack
                direction={'row'}
                alignItems={'center'}
                flexWrap={'wrap'}
                spacing={'8px'}
                className='btn-stack'
              >
                <Box className='upload-wrapper'>
                  <CustomButtonPrimary
                    disableRipple
                    variant='contained'
                    aria-label='Change Picture'
                    className='change-btn'
                  >
                    Change Picture
                  </CustomButtonPrimary>
                  <input type='file' className='upload-input' />
                </Box>
                <CustomButtonPrimary
                  disableRipple
                  variant='outlined'
                  aria-label='Delete Picture'
                  className='delete-pic-btn'
                >
                  Delete Picture
                </CustomButtonPrimary>
              </Stack>
            </Stack>
          </Box> */}
          <ProfileEditHead />
          <ProfileEditBody />
        </Box>
      </RequestSessionModalContentWrap>
    </DashboardWrapper>
  );
}

export default Edit;
