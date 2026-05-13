import { cmsDataApi } from '@/api/functions/cms.api';
import { sanitizeHtml } from '@/lib/sanitize';
import Wrapper from '@/layout/wrapper/Wrapper';
import {
  Alert,
  Box,
  CircularProgress,
  Container,
  Divider,
  Link as MuiLink,
  Stack,
  Typography,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import NextLink from 'next/link';

function Terms() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['terms-conditions'],
    queryFn: () => cmsDataApi({ slug: 'terms-conditions' }),
  });

  if (isLoading) {
    return (
      <Container maxWidth='md'>
        <Box py={6} display='flex' justifyContent='center'>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (isError) {
    return (
      <Container maxWidth='md'>
        <Box py={6}>
          <Alert severity='error'>Failed to load terms: {(error as Error)?.message}</Alert>
        </Box>
      </Container>
    );
  }

  const terms = data?.data;

  return (
    <Wrapper isFixedHeader>
      <Container maxWidth='md'>
        <Box py={16}>
          <Typography variant='h2' pb={4} component='h1' gutterBottom>
            {terms?.title}
          </Typography>

          <Box
            sx={{
              '& p': { mb: 2 },
            }}
            dangerouslySetInnerHTML={{ __html: sanitizeHtml(terms?.content ?? '') }}
          />

          {/* <Box mt={4}>
            <Typography variant='h5' component='h2' gutterBottom sx={{ fontWeight: 600 }}>
              SMS Program Terms and Conditions
            </Typography>
            <Typography paragraph>
              <strong>Program Description:</strong> Speakwide offers an SMS notification program to
              provide you with important updates, reminders, and alerts related to your account and
              our services.
            </Typography>
            <Typography paragraph>
              <strong>Message Frequency:</strong> Message frequency varies based on your interaction
              with our services and the types of notifications you have opted to receive.
            </Typography>
            <Typography paragraph>
              <strong>STOP/HELP Instructions:</strong> You can cancel the SMS service at any time by
              texting &quot;STOP&quot;. After you send the SMS message &quot;STOP&quot; to us, we
              will send you an SMS message to confirm that you have been unsubscribed. After this,
              you will no longer receive SMS messages from us. If you want to join again, just sign
              up as you did the first time, and we will start sending SMS messages to you again. If
              you are experiencing issues with the messaging program you can reply with the keyword
              &quot;HELP&quot; for more assistance, or you can get help directly at
              support@speakwide.com.
            </Typography>
            <Typography paragraph sx={{ fontWeight: 600 }}>
              Carriers are not liable for delayed or undelivered messages.
            </Typography>
          </Box> */}
        </Box>
      </Container>
      <Container maxWidth='md'>
        <Divider sx={{ mb: 2 }} />
        <Box display='flex' flexDirection='column' gap={1} pb={3}>
          <Stack direction='row' spacing={3} flexWrap='wrap'>
            <MuiLink component={NextLink} href='/about' underline='hover'>
              About Us
            </MuiLink>
            <MuiLink component={NextLink} href='/privacy' underline='hover'>
              Privacy Policy
            </MuiLink>
          </Stack>
          <Typography variant='body2' color='text.secondary'>
            © {new Date().getFullYear()} Speakwide, LLC. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Wrapper>
  );
}

export default Terms;
