import { datalistDisputList } from '@/json/mock/demo.mock';
import { DisputDetailsWrapper } from '@/styles/StyledComponents/DisputDetailsWrapper';
import { IDisputeData, IDisputeItem } from '@/typescript/interface/dispute.interface';
import ArrowBackBtnIcon from '@/ui/Icons/ArrowBackBtnIcon';
import { Box, Button, CircularProgress, Grid2, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { ActionHistoryPanel } from './ActionHistory';
import { DisputeDataInt } from './DisputeDataInt';
import { DisputeDataUser } from './DisputeDataUser';

export interface IdisputDetailsprops {
  disputeData?: IDisputeItem;
  disputeDataClient?: IDisputeData;
}

export default function DisputDetails({ disputeData, disputeDataClient }: IdisputDetailsprops) {
  const router = useRouter();

  const disputeType1 =
    typeof disputeData?.dispute_status === 'string'
      ? (disputeData?.dispute_status.toLowerCase() as 'resolved' | 'declined' | 'pending')
      : undefined;

  const disputeType2 =
    typeof disputeDataClient?.dispute_status === 'string'
      ? (disputeDataClient?.dispute_status.toLowerCase() as 'resolved' | 'declined' | 'pending')
      : undefined;

  const disputeType = disputeType1 || disputeType2;

  // console.log(disputeData, '***1');
  // console.log(disputeDataClient, '***1');

  const userType = router.pathname?.includes('/user/') ? 'client' : 'interpreter';

  // console.log(router.pathname, '***');

  return (
    <DisputDetailsWrapper>
      <Box className='wrapper_disputDtlsMain'>
        <Box className='wrapper_topTitleWrap'>
          <Button type='button' disableRipple onClick={() => router.back()}>
            <ArrowBackBtnIcon />
          </Button>
          <Typography variant='h1'>Dispute Details</Typography>
        </Box>
        <Box className='mainDetailsWrapper'>
          <Grid2 container spacing={1.25}>
            <Grid2 size={{ xl: 4.75, md: 5, xs: 12 }}>
              {disputeData?._id || disputeDataClient?._id ? (
                <>
                  {disputeData?._id && (
                    <DisputeDataInt disputeType={disputeType} disputeData={disputeData} />
                  )}

                  {disputeDataClient?._id && (
                    <DisputeDataUser disputeType={disputeType} disputeData={disputeDataClient} />
                  )}
                </>
              ) : (
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100%',
                  }}
                >
                  <CircularProgress />
                </Box>
              )}
            </Grid2>

            <Grid2 size={{ xl: 7.25, md: 7, xs: 12 }}>
              <ActionHistoryPanel
                disputeType={disputeType}
                actionHistory={datalistDisputList}
                senderType={userType}
                disputeId={disputeData?._id || disputeDataClient?._id || ''}
              />
            </Grid2>
          </Grid2>
        </Box>
      </Box>
    </DisputDetailsWrapper>
  );
}
