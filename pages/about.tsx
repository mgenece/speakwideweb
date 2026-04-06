import Wrapper from '@/layout/wrapper/Wrapper';
import { Box, Container, Divider, Grid, Link as MuiLink, Stack, Typography } from '@mui/material';
import NextLink from 'next/link';

const services = [
  'Medical Interpretation',
  'Legal Interpretation',
  'Corporate & Business Interpretation',
  'On-Demand Audio & Video Sessions',
  'Scheduled On-Site Interpretation',
];

function About() {
  return (
    <Wrapper isFixedHeader>
      <Container maxWidth='md'>
        <Box py={8}>
          <Box textAlign='center' mb={6}>
            <Typography variant='h3' component='h1' gutterBottom>
              Professional Interpretation On Demand
            </Typography>
            <Typography variant='subtitle1' color='text.secondary' maxWidth={720} mx='auto'>
              Speakwide is a professional interpretation marketplace platform connecting clients
              with certified interpreters for real-time virtual and on-site language services across
              medical, legal, and business sectors.
            </Typography>
          </Box>

          <Box mb={6}>
            <Typography variant='h5' component='h2' gutterBottom>
              Services
            </Typography>
            <Grid container spacing={2}>
              {services.map(service => (
                <Grid key={service} item xs={12} sm={6}>
                  <Box
                    p={2}
                    height='100%'
                    borderRadius={2}
                    border={theme => `1px solid ${theme.palette.divider}`}
                  >
                    <Typography variant='subtitle1'>{service}</Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>

          <Box mb={6}>
            <Typography variant='h5' component='h2' gutterBottom>
              About Speakwide
            </Typography>
            <Typography>
              Speakwide, LLC is a U.S.-based technology platform providing secure, confidential
              interpretation services through certified professionals.
            </Typography>
          </Box>

          <Box mb={4}>
            <Typography variant='h5' component='h2' gutterBottom>
              Contact Information
            </Typography>
            <Stack spacing={0.5}>
              <Typography>Speakwide, LLC</Typography>
              <Typography>7657 Tamarac Island, cir</Typography>
              <Typography>Tamarac, FL 33321</Typography>
              <Typography>Phone: 305-330-8071</Typography>
              <Typography>Email: customerservice@speakwide.com</Typography>
            </Stack>
          </Box>

          <Box
            mb={6}
            p={3}
            borderRadius={2}
            bgcolor={theme => theme.palette.grey[100]}
            border={theme => `1px solid ${theme.palette.divider}`}
          >
            <Typography variant='subtitle1' fontWeight={600} gutterBottom>
              SMS Compliance Disclosure
            </Typography>
            <Typography paragraph>
              Speakwide sends transactional SMS messages strictly for account authentication and
              verification purposes.
            </Typography>
            <Typography paragraph>
              By providing your phone number during registration, you consent to receive
              authentication-related SMS messages from Speakwide. Message frequency varies. Message
              &amp; data rates may apply. Reply STOP to opt out.
            </Typography>
          </Box>

          <Divider sx={{ mb: 2 }} />
          <Box display='flex' flexDirection='column' gap={1} pb={3}>
            <Stack direction='row' spacing={3} flexWrap='wrap'>
              <MuiLink component={NextLink} href='/privacy' underline='hover'>
                Privacy Policy
              </MuiLink>
              <MuiLink component={NextLink} href='/terms' underline='hover'>
                Terms of Service
              </MuiLink>
            </Stack>
            <Typography variant='body2' color='text.secondary'>
              © {new Date().getFullYear()} Speakwide, LLC. All rights reserved.
            </Typography>
          </Box>
        </Box>
      </Container>
    </Wrapper>
  );
}

export default About;
