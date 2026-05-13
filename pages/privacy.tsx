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

function Privacy() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['privacy-policy'],
    queryFn: () => cmsDataApi({ slug: 'privacy-policy' }),
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

  const privacy = data?.data;

  return (
    <Wrapper isFixedHeader>
      <Container maxWidth='md'>
        <Box py={16}>
          <Typography variant='h2' pb={4} component='h1' gutterBottom>
            {privacy?.title}
          </Typography>

          <Box
            sx={{
              '& p': { mb: 2 },
            }}
            dangerouslySetInnerHTML={{ __html: sanitizeHtml(privacy?.content ?? '') }}
          />

          <Box mt={4}>
            <Typography variant='h5' component='h2' gutterBottom sx={{ fontWeight: 600 }}>
              SMS Communications
            </Typography>
            <Typography paragraph>
              <strong>Collection of Phone Numbers:</strong> We collect your phone number when you
              voluntarily provide it during the registration or signup process for our services.
            </Typography>
            <Typography paragraph>
              <strong>Purpose of SMS Messages:</strong> We use SMS to send you important updates,
              notifications regarding your account, appointment reminders, and service-related
              alerts.
            </Typography>
            <Typography paragraph>
              <strong>Opt-out Instructions:</strong> You can opt out of receiving SMS messages at
              any time by replying &quot;STOP&quot; to any message you receive from us. Upon
              receiving your opt-out request, we will send one final message confirming your request
              has been processed.
            </Typography>
            <Typography paragraph sx={{ fontWeight: 600 }}>
              Speakwide does not sell, rent, or share phone numbers collected for SMS consent with
              third parties for marketing purposes.
            </Typography>
          </Box>
        </Box>
      </Container>

      <Container maxWidth='md'>
        <Divider sx={{ mb: 2 }} />
        <Box display='flex' flexDirection='column' gap={1} pb={3}>
          <Stack direction='row' spacing={3} flexWrap='wrap'>
            <MuiLink component={NextLink} href='/about' underline='hover'>
              About Us
            </MuiLink>
            <MuiLink component={NextLink} href='/terms' underline='hover'>
              Terms of Service
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

export default Privacy;
