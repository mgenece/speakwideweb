import Wrapper from '@/layout/wrapper/Wrapper';
import { Box, Container, Link, List, ListItem, Typography } from '@mui/material';
import NextLink from 'next/link';

export default function SmsConsent() {
  return (
    <Wrapper isFixedHeader>
      <Container maxWidth='md'>
        <Box py={16}>
          <Typography variant='h4' component='h1' gutterBottom fontWeight={600}>
            SMS Consent for Speakwide Notifications
          </Typography>

          <Typography variant='body1' paragraph>
            Speakwide sends SMS messages to users who voluntarily provide their mobile phone numbers
            and opt to receive communications.
          </Typography>

          <Typography variant='body1' gutterBottom>
            Messages may include:
          </Typography>
          <List sx={{ listStyleType: 'disc', pl: 4, mb: 2 }}>
            <ListItem sx={{ display: 'list-item', py: 0 }}>Account notifications</ListItem>
            <ListItem sx={{ display: 'list-item', py: 0 }}>Service updates</ListItem>
            <ListItem sx={{ display: 'list-item', py: 0 }}>
              Security verification codes (OTP)
            </ListItem>
            <ListItem sx={{ display: 'list-item', py: 0 }}>Customer support messages</ListItem>
          </List>

          <Typography variant='body1' paragraph>
            The message frequency varies depending on the account activity. Message and data rates
            may be applied.
          </Typography>

          <Typography variant='body1' paragraph>
            Consent to receive SMS messages is not a condition of using Speakwide services.
          </Typography>

          <Typography variant='body1' paragraph>
            You can opt out at any time by replying <strong>STOP</strong> to any message.
            <br />
            For assistance, reply <strong>HELP</strong> or contact{' '}
            <Link href='mailto:support@speakwide.com' color='primary'>
              support@speakwide.com
            </Link>
            .
          </Typography>

          <Typography variant='h6' component='h2' gutterBottom mt={4}>
            For more information:
          </Typography>
          <List>
            <ListItem sx={{ py: 0.5, px: 0 }}>
              <Typography variant='body1'>
                Privacy Policy:{' '}
                <Link component={NextLink} href='/privacy' color='primary'>
                  https://speakwide.com/privacy
                </Link>
              </Typography>
            </ListItem>
            <ListItem sx={{ py: 0.5, px: 0 }}>
              <Typography variant='body1'>
                Terms of Service:{' '}
                <Link component={NextLink} href='/terms' color='primary'>
                  https://speakwide.com/terms
                </Link>
              </Typography>
            </ListItem>
          </List>
        </Box>
      </Container>
    </Wrapper>
  );
}
