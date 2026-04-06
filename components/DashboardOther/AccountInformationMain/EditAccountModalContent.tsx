import assest from '@/json/assest';
import { RequestSessionModalContentWrap } from '@/styles/StyledComponents/RequestSessionModalContentWrap';
import InputFieldCommon from '@/ui/CommonInput/CommonInput';
import CustomButtonPrimary from '@/ui/CustomButtons/CustomButtonPrimary';
import CustomSelect from '@/ui/CustomSelect/CustomSelect';
import BackupIcon2 from '@/ui/Icons/BackupIcon2';
import BusinessIcon from '@/ui/Icons/BusinessIcon';
import ImageIcon from '@/ui/Icons/ImageIcon';
import MapIcon from '@/ui/Icons/MapIcon';
import ProfileDetailsIcon from '@/ui/Icons/ProfileDetailsIcon';
import { Box, Grid2, InputLabel, MenuItem, Stack, Typography } from '@mui/material';
import Image from 'next/image';

interface IEditAccountModalContentProps {
  handleClose: () => void;
}

const EditAccountModalContent = ({ handleClose }: IEditAccountModalContentProps) => {
  return (
    <RequestSessionModalContentWrap className='editAccountContent'>
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
          <Typography variant='body2' className='title'>
            Last edit on 12 February 2025
          </Typography>
        </Box>
        <Stack
          direction={'row'}
          alignItems={'center'}
          flexWrap={'wrap'}
          spacing={'8px'}
          className='btn-stack'
        >
          <CustomButtonPrimary
            disableRipple
            variant='outlined'
            aria-label='Discard'
            className='discard-btn'
            onClick={handleClose}
          >
            Discard
          </CustomButtonPrimary>
          <CustomButtonPrimary
            disableRipple
            variant='contained'
            aria-label='Save'
            className='save-btn'
            onClick={handleClose}
          >
            Save
          </CustomButtonPrimary>
        </Stack>
      </Stack>
      <Box className='profile-pic-box'>
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
      </Box>
      <Box className='upload-business-box'>
        <Typography variant='body2' sx={{ pb: { sm: '10px', xs: '5px' } }}>
          Upload Business Logo
        </Typography>
        <Box className='upload-box'>
          <i>
            <BackupIcon2 />
          </i>
          <Typography className='uploadText' variant='body2'>
            Choose & Upload your image
          </Typography>
          <Typography className='uploadSubText'>
            JPEG, PNG, and JPG formats (Max file size 50MB)
          </Typography>
          <input type='file' />
        </Box>
      </Box>
      <Box className='form-box'>
        <Grid2 container spacing={'15px'}>
          <Grid2 size={{ xs: 12 }}>
            <Stack
              direction='row'
              alignItems='center'
              flexWrap={'wrap'}
              spacing={'4px'}
              className='cmn-head-stack'
            >
              <ProfileDetailsIcon />
              <Typography variant='body2'>Personal Information</Typography>
            </Stack>
          </Grid2>
          <Grid2 size={{ xs: 12 }}>
            <Box className='eachInputBox'>
              <InputLabel>Full Name</InputLabel>
              <InputFieldCommon placeholder='Enter your full name' className='input-field' />
            </Box>
          </Grid2>
          <Grid2 size={{ md: 6, xs: 12 }}>
            <Box className='eachInputBox'>
              <InputLabel>Email</InputLabel>
              <InputFieldCommon placeholder='Enter your email address' className='input-field' />
            </Box>
          </Grid2>
          <Grid2 size={{ md: 6, xs: 12 }}>
            <Box className='eachInputBox'>
              <InputLabel>Phone</InputLabel>
              <InputFieldCommon
                type='number'
                placeholder='Enter your phone number'
                className='input-field'
              />
            </Box>
          </Grid2>
          <Grid2 size={{ xs: 12 }}>
            <Stack
              direction='row'
              alignItems='center'
              flexWrap={'wrap'}
              spacing={'4px'}
              className='cmn-head-stack'
            >
              <BusinessIcon />
              <Typography variant='body2'>Business Information</Typography>
            </Stack>
          </Grid2>
          <Grid2 size={{ md: 6, xs: 12 }}>
            <Box className='eachInputBox'>
              <InputLabel>Business Name</InputLabel>
              <InputFieldCommon placeholder='Enter business name' className='input-field' />
            </Box>
          </Grid2>
          <Grid2 size={{ md: 6, xs: 12 }}>
            <Box className='eachInputBox'>
              <InputLabel>Business Phone</InputLabel>
              <InputFieldCommon
                type='number'
                placeholder='Enter business phone'
                className='input-field'
              />
            </Box>
          </Grid2>
          <Grid2 size={{ md: 6, xs: 12 }}>
            <Box className='eachInputBox'>
              <InputLabel>Business Email</InputLabel>
              <InputFieldCommon placeholder='Enter busines email' className='input-field' />
            </Box>
          </Grid2>
          <Grid2 size={{ md: 6, xs: 12 }}>
            <Box className='eachInputBox'>
              <InputLabel>Representative Name</InputLabel>
              <InputFieldCommon placeholder='Enter representative name' className='input-field' />
            </Box>
          </Grid2>
          <Grid2 size={{ md: 6, xs: 12 }}>
            <Box className='eachInputBox'>
              <InputLabel>Title</InputLabel>
              <InputFieldCommon placeholder='Enter representative title' className='input-field' />
            </Box>
          </Grid2>
          <Grid2 size={{ md: 6, xs: 12 }}>
            <Box className='eachInputBox'>
              <InputLabel>Business Website</InputLabel>
              <InputFieldCommon placeholder='Enter website url' className='input-field' />
            </Box>
          </Grid2>
          <Grid2 size={{ xs: 12 }}>
            <Box className='eachInputBox'>
              <InputLabel>Business Sector</InputLabel>
              <CustomSelect initialvalue='Choose business sector' className='select-box'>
                <MenuItem value='demo 1'>demo 1</MenuItem>
                <MenuItem value='demo 2'>demo 1</MenuItem>
              </CustomSelect>
            </Box>
          </Grid2>
          <Grid2 size={{ xs: 12 }}>
            <Stack
              direction='row'
              alignItems='center'
              flexWrap={'wrap'}
              spacing={'4px'}
              className='cmn-head-stack'
            >
              <MapIcon />
              <Typography variant='body2'>Location Information</Typography>
            </Stack>
          </Grid2>
          <Grid2 size={{ md: 6, xs: 12 }}>
            <Box className='eachInputBox'>
              <InputLabel>Zip Code</InputLabel>
              <InputFieldCommon
                type='number'
                placeholder='Enter zip code'
                className='input-field'
              />
            </Box>
          </Grid2>
          <Grid2 size={{ md: 6, xs: 12 }}>
            <Box className='eachInputBox'>
              <InputLabel>City</InputLabel>
              <InputFieldCommon placeholder='Enter city' className='input-field' />
            </Box>
          </Grid2>
          <Grid2 size={{ md: 6, xs: 12 }}>
            <Box className='eachInputBox'>
              <InputLabel>State</InputLabel>
              <InputFieldCommon placeholder='Select state' className='input-field' />
            </Box>
          </Grid2>
          <Grid2 size={{ md: 6, xs: 12 }}>
            <Box className='eachInputBox'>
              <InputLabel>Street Address</InputLabel>
              <InputFieldCommon placeholder='Enter street address' className='input-field' />
            </Box>
          </Grid2>
        </Grid2>
      </Box>
    </RequestSessionModalContentWrap>
  );
};

export default EditAccountModalContent;
