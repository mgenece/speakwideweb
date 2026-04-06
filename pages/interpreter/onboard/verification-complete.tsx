import AuthWrapper from '@/components/AuthWrapper/AuthWrapper';
import verification from '@/json/lottie/Verified.json';
import { Button, Stack, Typography } from '@mui/material';
import dynamic from 'next/dynamic';

export default function VrificationComplete() {
  // const router = useRouter();
  // const data = router.query;
  //   console.log(data['inquiry-id'], '***d');
  const Lottie = dynamic(() => import('lottie-react'), { ssr: false });
  return (
    <AuthWrapper headerRight>
      <Stack
        direction='column'
        spacing={{ lg: 4, xs: 2 }}
        alignItems='center'
        height='100%'
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
        <Stack alignItems='center' justifyContent='center' pt={{ xs: 2 }}>
          <Button variant='contained' color='primary'>
            Back to Home
          </Button>
        </Stack>
      </Stack>
    </AuthWrapper>
  );
}
