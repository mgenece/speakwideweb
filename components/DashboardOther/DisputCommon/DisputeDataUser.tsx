import { mediaUrl } from '@/api/endpoints';
import { IDisputeData } from '@/typescript/interface/dispute.interface';
import DeclineIcon from '@/ui/Icons/DeclineIcon';
import DocumentBtnIcon from '@/ui/Icons/DocumentBtnIcon';
import PendingIcon from '@/ui/Icons/PendingIcon';
import { ResolverOutlineShadow } from '@/ui/Icons/ResolvedIcon';
import { Box, Button, Chip, List, ListItem, Typography, useTheme } from '@mui/material';
import dayjs from 'dayjs';

interface DisputeDetailsPanelProps {
  disputeType?: 'resolved' | 'declined' | 'pending';
  disputeData?: IDisputeData;
}

export function DisputeDataUser({ disputeType, disputeData }: DisputeDetailsPanelProps) {
  const theme = useTheme();

  const getStatusIcon = () => {
    if (disputeType === 'pending') {
      return <PendingIcon IconHeight='15' IconWidth='15' />;
    }
    if (disputeType === 'resolved') {
      return (
        <ResolverOutlineShadow IconColor={theme.palette.info.main} IconHeight='15' IconWidth='15' />
      );
    }
    return <DeclineIcon IconHeight='15' IconWidth='15' />;
  };

  const getStatusLabel = () => {
    if (disputeType === 'pending') return 'Issue Pending';
    if (disputeType === 'resolved') return 'Issue Resolved';
    return 'Declined';
  };

  //   const formatDate = (dateString: string) => {
  //     return dayjs(dateString).format('MMMM DD, YYYY');
  //   };

  const formatDateTime = (dateString: string) => {
    const date = dayjs(dateString);
    const isToday = date.isSame(dayjs(), 'day');

    if (isToday) {
      return `Today at ${date.format('h:mm A')}`;
    }
    return date.format('MMMM DD, YYYY [at] h:mm A');
  };

  // Safe handling of supporting documents
  const supportingDocs = disputeData?.supporting_documents || [];
  const visibleDocs = supportingDocs.slice(0, 2);
  const remainingDocsCount = Math.max(0, supportingDocs.length - 2);

  // Early return if no data
  if (!disputeData) {
    return null;
  }

  return (
    <Box className='cmnBoxInner'>
      <Typography variant='body1' className='topTitleTxt'>
        Dispute Details
      </Typography>
      <Box className='wrapper_innerListAll'>
        <List disablePadding>
          <ListItem disablePadding>
            <Typography variant='body1' className='lightTxt'>
              Dispute ID
            </Typography>
            <Typography variant='body1' className='boldTxt'>
              {disputeData.dispute_id || 'N/A'}
            </Typography>
          </ListItem>

          <ListItem disablePadding>
            <Typography variant='body1' className='lightTxt'>
              Interpreter Name
            </Typography>
            <Typography variant='body1' className='boldTxt'>
              {disputeData.interpreter_name || 'N/A'}
            </Typography>
          </ListItem>

          <ListItem disablePadding>
            <Typography variant='body1' className='lightTxt'>
              Transaction Amount
            </Typography>
            <Typography variant='body1' className='boldTxt'>
              ${disputeData.amount_paid?.toFixed(2) || '0.00'}
            </Typography>
          </ListItem>

          <ListItem disablePadding>
            <Typography variant='body1' className='lightTxt'>
              Date Initiated
            </Typography>
            <Typography variant='body1' className='boldTxt'>
              {disputeData.date_initiated ? formatDateTime(disputeData.date_initiated) : 'N/A'}
            </Typography>
          </ListItem>

          <ListItem disablePadding>
            <Typography variant='body1' className='lightTxt'>
              Dispute Reason
            </Typography>
            <Typography variant='body1' className='boldTxt'>
              {disputeData.categories && disputeData.categories.length > 0
                ? disputeData.categories.map(cat => cat?.title || cat).join(', ')
                : disputeData.issue_details || 'N/A'}
            </Typography>
          </ListItem>

          <ListItem disablePadding>
            <Typography variant='body1' className='lightTxt'>
              Session Reference
            </Typography>
            <Typography variant='body1' className='boldTxt'>
              {disputeData.session_ref_number || 'N/A'}
            </Typography>
          </ListItem>

          {disputeData.quality && (
            <ListItem disablePadding>
              <Typography variant='body1' className='lightTxt'>
                Quality Rating
              </Typography>
              <Typography variant='body1' className='boldTxt'>
                {disputeData.quality}
              </Typography>
            </ListItem>
          )}

          {disputeData.interpreter_noshow && (
            <ListItem disablePadding>
              <Typography variant='body1' className='lightTxt'>
                Interpreter Status
              </Typography>
              <Typography variant='body1' className='boldTxt' sx={{ color: 'error.main' }}>
                No Show
              </Typography>
            </ListItem>
          )}

          {disputeData.waiting_time && disputeData.waiting_time !== '00:00' && (
            <ListItem disablePadding>
              <Typography variant='body1' className='lightTxt'>
                Waiting Time
              </Typography>
              <Typography variant='body1' className='boldTxt'>
                {disputeData.waiting_time}
              </Typography>
            </ListItem>
          )}

          {!disputeData.interpreter_ontime && disputeData.late_time && (
            <ListItem disablePadding>
              <Typography variant='body1' className='lightTxt'>
                Late By
              </Typography>
              <Typography variant='body1' className='boldTxt'>
                {disputeData.late_time}
              </Typography>
            </ListItem>
          )}

          {!disputeData.is_proper_duration && disputeData.actual_duration && (
            <ListItem disablePadding>
              <Typography variant='body1' className='lightTxt'>
                Actual Duration
              </Typography>
              <Typography variant='body1' className='boldTxt'>
                {disputeData.actual_duration}
              </Typography>
            </ListItem>
          )}

          <ListItem disablePadding>
            <Typography variant='body1' className='lightTxt'>
              Resolution Status
            </Typography>
            <Chip
              label={`Status: ${getStatusLabel()}`}
              sx={{
                textTransform: 'capitalize',
                color: theme.palette.customColors.placeText,
                span: {
                  color: 'inherit !important',
                },
              }}
              icon={getStatusIcon()}
            />
          </ListItem>

          {supportingDocs.length > 0 && (
            <ListItem disablePadding>
              <Typography variant='body1' className='lightTxt'>
                Proof Uploaded
              </Typography>
              <Box className='btnWrap'>
                {visibleDocs.map((doc, index) => (
                  <Button
                    key={index}
                    type='button'
                    disableRipple
                    onClick={() =>
                      window.open(mediaUrl(`dispute_supportive_documents/${doc}`), '_blank')
                    }
                  >
                    <DocumentBtnIcon />
                    {doc?.split('/').pop()?.substring(0, 20) || `document_${index + 1}`}
                  </Button>
                ))}
                {remainingDocsCount > 0 && (
                  <Button type='button' disableRipple className='txtBtn'>
                    {remainingDocsCount}+
                  </Button>
                )}
              </Box>
            </ListItem>
          )}
        </List>
      </Box>
    </Box>
  );
}
