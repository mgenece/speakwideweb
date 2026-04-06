import loading from '@/json/lottie/loading.json';
import verification from '@/json/lottie/Verified.json';
import { Box, Stack, Typography } from '@mui/material';
import dynamic from 'next/dynamic';

const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

export function PersonaLoading() {
  return (
    <Box
      sx={{
        height: 'calc(100vh - 103px)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 2,
      }}
    >
      <Box width={280} height={280}>
        <Lottie
          loop
          autoPlay
          animationData={loading}
          rendererSettings={{
            preserveAspectRatio: 'xMidYMid slice',
          }}
          height={280}
          width={280}
        />
      </Box>
      <Typography
        variant='body1'
        color='#000'
        alignItems='flex-end'
        fontSize={{ lg: '25px', md: '22px', xs: '20px' }}
      >
        Verifying user. Please wait
        <Typography component='i' ml={1}>
          <Typography variant='caption' display='inline-block' className='typingloader' />
        </Typography>
      </Typography>
    </Box>
  );
}

export function PersonaSuccess() {
  return (
    <Stack
      direction='column'
      spacing={{ lg: 4, xs: 2 }}
      alignItems='center'
      justifyContent={'center'}
      height='calc(100vh - 103px)'
      width='100%'
    >
      <Stack
        direction='column'
        alignItems='center'
        width={200}
        height={200}
        justifyContent='center'
      >
        <Lottie
          loop
          autoPlay
          animationData={verification}
          rendererSettings={{
            preserveAspectRatio: 'xMidYMid slice',
          }}
          height={200}
          width={200}
        />
      </Stack>
      <Typography
        fontSize={{ lg: '35px', md: '30px', xs: '25px' }}
        textAlign='center'
        fontWeight={500}
      >
        Verified Successfully
      </Typography>
    </Stack>
  );
}
