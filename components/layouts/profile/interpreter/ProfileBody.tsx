import { mediaUrl } from '@/api/endpoints';
import { useInterpreterData } from '@/hooks/react-query/useVisitor';
import { downloadFile } from '@/lib/functions/_helpers.lib';
import BusinessIcon from '@/ui/Icons/BusinessIcon';
import DocumentsIcon from '@/ui/Icons/DocumentsIcon';
import DownloadIcon from '@/ui/Icons/DownloadIcon';
import ImageIcon2 from '@/ui/Icons/ImageIcon2';
import InfoIcon from '@/ui/Icons/InfoIcon';
import LicenseIcon from '@/ui/Icons/LicenseIcon';
import MapIcon2 from '@/ui/Icons/MapIcon2';
import PdfIcon2 from '@/ui/Icons/PdfIcon2';
import ProfileDetailsIcon from '@/ui/Icons/ProfileDetailsIcon';
import { Box, Button, CircularProgress, Grid2, Stack, Typography, useTheme } from '@mui/material';

function ProfileBodyInt() {
  const theme = useTheme();
  const { interpreterData, isInterpreterLoading } = useInterpreterData();

  if (isInterpreterLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
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
            <Grid2 size={{ md: 3, xs: 12 }}>
              <Box className='details-box'>
                <Typography className='input-label' variant='body2'>
                  Full Name
                </Typography>
                <Typography className='input-value'>{interpreterData?.full_name}</Typography>
              </Box>
            </Grid2>
            <Grid2 size={{ md: 4, xs: 12 }}>
              <Box className='details-box'>
                <Typography className='input-label' variant='body2'>
                  Email
                </Typography>
                <Typography className='input-value'>{interpreterData?.email}</Typography>
              </Box>
            </Grid2>
            <Grid2 size={{ md: 2, xs: 12 }}>
              <Box className='details-box'>
                <Typography className='input-label' variant='body2'>
                  Gender
                </Typography>
                <Typography className='input-value'>{interpreterData?.gender}</Typography>
              </Box>
            </Grid2>
            <Grid2
              size={{ md: 3, xs: 12 }}
              sx={{ display: 'flex', justifyContent: { md: 'flex-end', xs: 'flex-start' } }}
            >
              <Box className='details-box' sx={{ textAlign: { xs: 'left' } }}>
                <Typography className='input-label' variant='body2'>
                  Phone
                </Typography>
                <Typography className='input-value'>{interpreterData?.phone}</Typography>
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
          <Typography className='title'>About Me</Typography>
          <i className='icon'>
            <InfoIcon IconWidth='24' IconHeight='24' IconColor={theme.palette.primary.main} />
          </i>
        </Stack>
        <Box className='details-box-main'>
          <Grid2 container spacing={{ sm: '20px', xs: '10px' }}>
            <Grid2 size={{ xs: 12 }}>
              <Box className='details-box'>
                <Typography
                  fontSize={'18px'}
                  fontWeight={400}
                  color={theme.palette.customColors.light}
                >
                  {interpreterData?.objectives}
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
          <Typography className='title'>Address</Typography>
          <i className='icon'>
            <MapIcon2 />
          </i>
        </Stack>
        <Box className='details-box-main'>
          <Grid2 container spacing={{ sm: '20px', xs: '10px' }}>
            <Grid2 size={{ xs: 12 }}>
              <Box className='details-box'>
                <Typography
                  fontSize={'18px'}
                  fontWeight={400}
                  color={theme.palette.customColors.light}
                >
                  {interpreterData?.address}
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
          <Typography className='title'>Business Information</Typography>
          <i className='icon'>
            <BusinessIcon />
          </i>
        </Stack>
        <Box className='details-box-main'>
          <Grid2 container spacing={{ sm: '20px', xs: '10px' }}>
            <Grid2 size={{ md: 4.5, xs: 12 }}>
              <Box className='details-box'>
                <Typography className='input-label' variant='body2'>
                  Area Of Expertise
                </Typography>
                <Typography className='input-value'>
                  {interpreterData?.areas_of_expertise
                    ?.map(item => item.expertise_display_name)
                    ?.join(' ,')}
                </Typography>
              </Box>
            </Grid2>
            <Grid2 size={{ md: 3.5, xs: 12 }}>
              <Box className='details-box'>
                <Typography className='input-label' variant='body2'>
                  Supported Languages
                </Typography>
                <Typography className='input-value'>
                  {interpreterData?.languages.map(item => item.language_display_name).join(' ,')}
                </Typography>
              </Box>
            </Grid2>
            <Grid2
              size={{ md: 4, xs: 12 }}
              sx={{ display: 'flex', justifyContent: { md: 'flex-end', xs: 'flex-start' } }}
            >
              <Box className='details-box' sx={{ textAlign: { xs: 'left' } }}>
                <Typography className='input-label' variant='body2'>
                  EIN
                </Typography>
                <Typography className='input-value'>{interpreterData?.ein}</Typography>
              </Box>
            </Grid2>
            <Grid2 size={{ md: 4.5, xs: 12 }}>
              <Box className='details-box'>
                <Typography className='input-label' variant='body2'>
                  Social Security Number
                </Typography>
                <Typography className='input-value'>
                  {interpreterData?.social_security_number}
                </Typography>
              </Box>
            </Grid2>
            <Grid2 size={{ md: 3.5, xs: 12 }}>
              <Box className='details-box'>
                <Typography className='input-label' variant='body2'>
                  Title
                </Typography>
                <Typography className='input-value'>CEO</Typography>
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
          <Typography className='title'>Documents / Certificates</Typography>
          <i className='icon'>
            <DocumentsIcon />
          </i>
        </Stack>
        <Box className='details-box-main'>
          <Stack
            direction={'row'}
            alignItems={'center'}
            flexWrap={'wrap'}
            gap={{ sm: '18px', xs: '10px' }}
            className='document-stack'
          >
            {interpreterData?.certificate_documents?.map(item => (
              <Stack
                key={item._id}
                direction={'row'}
                alignItems={'center'}
                flexWrap={'wrap'}
                spacing={'10px'}
                className=''
              >
                <Stack
                  direction={'row'}
                  alignItems={'center'}
                  flexWrap={'wrap'}
                  spacing={'8px'}
                  className='border-stack'
                >
                  <i className='icon'>
                    {item.document.endsWith('.pdf') ? <PdfIcon2 /> : <ImageIcon2 />}
                  </i>
                  <Typography variant='body2'>{item.document}</Typography>
                </Stack>
                <Button
                  disableRipple
                  aria-label='download'
                  className='download-icon-btn'
                  onClick={() =>
                    downloadFile(
                      mediaUrl(`interpreter_certificate/${item.document}`),
                      item.document
                    )
                  }
                >
                  <DownloadIcon />
                </Button>
              </Stack>
            ))}
          </Stack>
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
          <Typography className='title'>Drivers License / Identification Card</Typography>
          <i className='icon'>
            <LicenseIcon />
          </i>
        </Stack>
        <Box className='details-box-main'>
          <Stack
            direction={'row'}
            alignItems={'center'}
            flexWrap={'wrap'}
            gap={{ sm: '18px', xs: '10px' }}
            className='document-stack'
          >
            {interpreterData?.identity_proofs?.map(item => (
              <Stack
                key={item}
                direction={'row'}
                alignItems={'center'}
                flexWrap={'wrap'}
                spacing={'10px'}
                className=''
              >
                <Stack
                  direction={'row'}
                  alignItems={'center'}
                  flexWrap={'wrap'}
                  spacing={'8px'}
                  className='border-stack'
                >
                  <i className='icon'>{item.endsWith('.pdf') ? <PdfIcon2 /> : <ImageIcon2 />}</i>
                  <Typography variant='body2'>{item}</Typography>
                </Stack>
                <Button
                  disableRipple
                  aria-label='download'
                  className='download-icon-btn'
                  onClick={() =>
                    downloadFile(mediaUrl(`interpreter_identity_proofs/${item}`), item)
                  }
                >
                  <DownloadIcon />
                </Button>
              </Stack>
            ))}
          </Stack>
        </Box>
      </Grid2>
    </Grid2>
  );
}

export default ProfileBodyInt;
