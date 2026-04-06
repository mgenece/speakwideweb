import { mediaUrl } from '@/api/endpoints';
import { IDisputeItem } from '@/typescript/interface/dispute.interface';
import DeclineIcon from '@/ui/Icons/DeclineIcon';
import DocumentBtnIcon from '@/ui/Icons/DocumentBtnIcon';
import PendingIcon from '@/ui/Icons/PendingIcon';
import { ResolverOutlineShadow } from '@/ui/Icons/ResolvedIcon';
import { Box, Button, Chip, List, ListItem, Typography, useTheme } from '@mui/material';
import dayjs from 'dayjs';

interface DisputeDetailsPanelProps {
  disputeType?: 'resolved' | 'declined' | 'pending';
  disputeData: IDisputeItem;
}

export function DisputeDataInt({ disputeType, disputeData }: DisputeDetailsPanelProps) {
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

  const formatDate = (dateString: string) => {
    return dayjs(dateString).format('MMMM DD, YYYY');
  };

  const formatDateTime = (dateString: string) => {
    const date = dayjs(dateString);
    const isToday = date.isSame(dayjs(), 'day');

    if (isToday) {
      return `Today at ${date.format('h:mm A')}`;
    }
    return date.format('MMMM DD, YYYY [at] h:mm A');
  };

  // Calculate visible and hidden documents
  const visibleDocs = disputeData.supporting_documents.slice(0, 2);
  const remainingDocsCount = disputeData.supporting_documents.length - 2;

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
              {disputeData.dispute_id}
            </Typography>
          </ListItem>

          <ListItem disablePadding>
            <Typography variant='body1' className='lightTxt'>
              Client Name
            </Typography>
            <Typography variant='body1' className='boldTxt'>
              {disputeData.client.full_name || 'N/A'}
            </Typography>
          </ListItem>

          <ListItem disablePadding>
            <Typography variant='body1' className='lightTxt'>
              Transaction Amount
            </Typography>
            <Typography variant='body1' className='boldTxt'>
              ${disputeData.amount_paid.toFixed(2)}
            </Typography>
          </ListItem>

          <ListItem disablePadding>
            <Typography variant='body1' className='lightTxt'>
              Date Initiated
            </Typography>
            <Typography variant='body1' className='boldTxt'>
              {formatDateTime(disputeData.createdAt)}
            </Typography>
          </ListItem>

          <ListItem disablePadding>
            <Typography variant='body1' className='lightTxt'>
              Dispute Reason
            </Typography>
            <Typography variant='body1' className='boldTxt'>
              {disputeData.categories && disputeData.categories.length > 0
                ? disputeData.categories.map(cat => cat.title || cat).join(', ')
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

          {disputeData.updatedAt && (
            <ListItem disablePadding>
              <Typography variant='body1' className='lightTxt'>
                Last Updated
              </Typography>
              <Typography variant='body1' className='boldTxt'>
                {formatDate(disputeData.updatedAt)}
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

          {disputeData.supporting_documents && disputeData.supporting_documents.length > 0 && (
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
                    {doc?.split('/')?.pop()?.substring(0, 20) || `document_${index + 1}`}
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
