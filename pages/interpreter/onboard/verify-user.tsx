import { verifyPersonaStatusApi } from '@/api/functions/auth.api';
import {
  PersonaLoading,
  PersonaSuccess,
} from '@/components/layouts/authentication/interpreter/PersonaStatus';
import ButtonCommon from '@/components/layouts/common/ButtonCommon';
import Header from '@/layout/Header/Header';
import { Box, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function Verify() {
  const [status, setStatus] = useState('pending');
  const router = useRouter();
  const { ['reference-id']: referenceId, ['inquiry-id']: inquiryId, id } = router.query;

  // Using useQuery with polling
  const { data } = useQuery({
    queryKey: ['verify-persona-status', referenceId],
    queryFn: () => verifyPersonaStatusApi(referenceId as string),
    enabled: !!referenceId, // Only run when referenceId is available
    refetchInterval: 15000, // Poll every 15 seconds
    refetchIntervalInBackground: false, // Stop polling when tab is not active
    retry: 3, // Retry failed requests 3 times
  });

  useEffect(() => {
    const personaData = data?.data?.user;
    if (data?.data?.user?._id) {
      if (personaData?.personaInquiryId === inquiryId) {
        setStatus(personaData?.personaVerifyStatus as string);
      }
    }
  }, [data?.data]);

  // Stop polling and redirect when approved
  useEffect(() => {
    if (status === 'approved' || status === 'completed') {
      setTimeout(() => {
        router.push('/interpreter/onboard/set-availabality/');
      }, 5000);
    }
  }, [status]);

  if (id) {
    return (
      <Box
        width={'100vw'}
        height={'100vh'}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <Typography variant={'h3'}>
          You are not a verified user. Please verify yourself with persona.
        </Typography>

        <Box width={120}>
          <ButtonCommon
            variant='contained'
            color='primary'
            className='primary-gradiant-btn'
            onClick={() => {
              const personaHostedFlowUrl = process.env.NEXT_APP_PERSONA_URL || '';
              const redirectUrl = `${personaHostedFlowUrl}&reference-id=${id}&redirect-uri=${window.location.origin}/interpreter/onboard/verify-user/`;
              console.warn(redirectUrl, '***r');
              window.location.href = redirectUrl;
              // Or: window.location.assign(redirectUrl);
            }}
          >
            Continue
          </ButtonCommon>
        </Box>
      </Box>
    );
  }

  if (status === 'approved') {
    return (
      <>
        <Header />
        <PersonaSuccess />
      </>
    );
  }

  return (
    <>
      <Header />
      <PersonaLoading />
    </>
  );
}
