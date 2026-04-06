import { mediaUrl } from '@/api/endpoints';
import ProfileBodyInt from '@/components/layouts/profile/interpreter/ProfileBody';
import { useInterpreterData } from '@/hooks/react-query/useVisitor';
import assest from '@/json/assest';
import { AccountInformationMainStyled } from '@/styles/StyledComponents/AccountInformationMainStyled';
import CustomButtonPrimary from '@/ui/CustomButtons/CustomButtonPrimary';
import { Box, CircularProgress, Stack, Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function AccountInformationInterpreterMain() {
  const router = useRouter();
  const { interpreterData, isInterpreterLoading } = useInterpreterData();

  if (isInterpreterLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <AccountInformationMainStyled>
      <Box className='bordered-box'>
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
                    interpreterData?.profile_image
                      ? mediaUrl(`interpreter_profile_pic/${interpreterData?.profile_image}`)
                      : assest.dashboardHeaderAvatarImage
                  }
                  width={72}
                  height={72}
                  alt='profile-image'
                />
              </figure>
              <Box className=''>
                <Typography variant='h2' className='user-name'>
                  {interpreterData?.full_name}
                </Typography>
                <Link href={'/interpreter/dashboard/profile/edit'} className='edit-profile-btn'>
                  Edit Profile
                </Link>
              </Box>
            </Stack>
            <CustomButtonPrimary
              disableRipple
              variant='outlined'
              aria-label='Change Password'
              className='edit-button'
              onClick={() => router.push('/interpreter/dashboard/profile/change-password')}
            >
              Change Password
            </CustomButtonPrimary>
          </Stack>
          <Box className='body-box'>
            <ProfileBodyInt />
          </Box>
        </Box>
      </Box>
    </AccountInformationMainStyled>
  );
}
