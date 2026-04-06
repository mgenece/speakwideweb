// pages/session.tsx
import { getVonageToken } from '@/api/functions/videoSession.api';
import VonageVideoSession from '@/components/VonageVideoSession/VonageVideoSession';
import { useUserData } from '@/hooks/react-query/useVisitor';
import { Box, CircularProgress, Typography } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

function Session() {
  const { userData } = useUserData();
  const router = useRouter();
  const { id } = router.query;

  const [credentials, setCredentials] = useState({ sessionId: '', token: '', apiKey: '' });
  const [sessionTime, setSessionTime] = useState({ start: '', end: '' });
  const [sessionData, setSesstionData] = useState({
    clientName: '',
    interpreterName: '',
    language_one: '',
    language_two: '',
  });

  const vonageTokenMutation = useMutation({
    mutationFn: getVonageToken, // expects sessionId string
    onSuccess: data => {
      setCredentials({
        sessionId: data?.data?.sessionId || '',
        token: data?.data?.token || '',
        apiKey: data?.data?.apiKey || '',
      });
      setSessionTime({ start: data.data.start_date_time, end: data.data.end_date_time });
      setSesstionData({
        clientName: data.data.clientName,
        interpreterName: data.data.interpreterName,
        language_one: data.data.language_one,
        language_two: data.data.language_two,
      });
    },
  });

  useEffect(() => {
    if (typeof id === 'string') {
      vonageTokenMutation.mutate(id);
    }
  }, [id]);

  if (vonageTokenMutation.isPending) {
    return (
      <Box
        height='100vh'
        width='100vw'
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (vonageTokenMutation.isError) {
    return (
      <Box
        height='100vh'
        width='100vw'
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <Typography>Something went wrong</Typography>
      </Box>
    );
  }

  if (credentials.apiKey && credentials.sessionId && credentials.token && userData?._id) {
    return (
      <VonageVideoSession
        credentials={credentials}
        displayName={userData?.full_name || 'Interpreter'}
        initialPublishAudio={true}
        initialPublishVideo={true}
        sessionTime={sessionTime}
        sessionData={sessionData}
        isAudio={vonageTokenMutation.data?.data.session_format === 'audio'}
      />
    );
  }

  return (
    <Box
      height='100vh'
      width='100vw'
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
    >
      <CircularProgress />
    </Box>
  );
}

export default Session;
