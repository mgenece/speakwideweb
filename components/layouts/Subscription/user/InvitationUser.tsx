import { useUserData } from '@/hooks/react-query/useVisitor';
import { CancelOutlined, CheckCircleOutline, GroupAdd } from '@mui/icons-material';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Typography,
} from '@mui/material';

function InvitationUser() {
  const { userData } = useUserData();
  //   const router = useRouter();
  //   const isInvited = userData?.sharedSubscription?.sharedWith.status === 'pending';
  const invitationDetail = userData?.sharedSubscription;
  //   console.log(invitationDetail, '***');
  return (
    <Card
      sx={{
        maxWidth: 500,
        margin: 'auto',
        boxShadow: 3,
        borderRadius: 2,
      }}
    >
      <CardContent>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            mb: 2,
          }}
        >
          <Avatar sx={{ width: 56, height: 56, bgcolor: 'primary.main' }}>
            <GroupAdd />
          </Avatar>
          <Box sx={{ flex: 1 }}>
            <Typography variant='h6' component='h2' gutterBottom>
              Premium Subscription Invitation
            </Typography>
            {/* <Typography variant='body2' color='text.secondary'>
              {dayjs(invitationDetail?.sharedWith.invitedAt).format('MMMM D, YYYY')}
            </Typography> */}
          </Box>
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography variant='body1' sx={{ mb: 1 }}>
            <strong>{invitationDetail?.ownerDetails.full_name}</strong> has invited you to join
            their premium subscription group.
          </Typography>
          <Chip label='Premium Plus' color='primary' size='small' sx={{ mt: 1 }} />
        </Box>
      </CardContent>

      <CardActions
        sx={{
          justifyContent: 'flex-end',
          gap: 1,
          px: 2,
          pb: 2,
        }}
      >
        <Button variant='outlined' color='error' startIcon={<CancelOutlined />}>
          Reject
        </Button>
        <Button variant='contained' color='primary' startIcon={<CheckCircleOutline />}>
          Accept
        </Button>
      </CardActions>
    </Card>
  );
}

export default InvitationUser;
