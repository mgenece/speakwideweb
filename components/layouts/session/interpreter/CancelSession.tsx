import { rejectSessionApi } from '@/api/functions/session.api';
import { queryKeys } from '@/config/constants';
import { queryClient } from '@/pages/_app';
import { CancelScheduleSessionStyled } from '@/styles/StyledComponents/CancelScheduleSessionStyled';
import CancelSessionIcon from '@/ui/Icons/CancelSessionIcon';
import MuiModalWrapper from '@/ui/Modal/MuiModalWrapper';
import { Box, Button, Stack, Typography, useTheme } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import ButtonCommon from '../../common/ButtonCommon';

interface IProps {
  isOpen: boolean;
  handleClose: () => void;
  sessionId: string;
}

function CancelSession({ isOpen, handleClose, sessionId }: IProps) {
  const rejectSessionMutation = useMutation({
    mutationFn: rejectSessionApi,
    onSuccess: () => {
      handleClose();
      queryClient.invalidateQueries({
        queryKey: ['interpreter-session-list'],
      });

      queryClient.invalidateQueries({
        queryKey: queryKeys.interpreterSessionDetail(sessionId as string),
      });
      toast.success('Session request rejected successfully');
    },
  });
  const theme = useTheme();
  return (
    <MuiModalWrapper open={isOpen} onClose={handleClose} className='subscriptionSessionModal'>
      <CancelScheduleSessionStyled>
        <Box className='subscription-cancel-sec'>
          <Box className='inner-box'>
            <i className='icon-wrap'>
              <CancelSessionIcon />
            </i>
            <Typography variant='h4' fontWeight={600}>
              Are you sure you want to cancel the scheduled session?
            </Typography>
            <Typography
              fontSize='14px'
              className='content'
              color={theme.palette.customColors.darkTextColor}
            >
              Cancelling this session may result in penalty fees according to our cancellation
              policy
            </Typography>
          </Box>
        </Box>
        <Stack
          direction='row'
          alignItems='center'
          justifyContent='center'
          flexWrap='wrap'
          className='btn-stack'
        >
          <ButtonCommon
            variant='contained'
            color='primary'
            className='primaryBtn'
            isLoading={rejectSessionMutation.isPending}
            onClick={() => {
              rejectSessionMutation.mutate(sessionId);
            }}
          >
            Yes
          </ButtonCommon>
          <Button
            variant='contained'
            color='primary'
            className='no-btn'
            disabled={rejectSessionMutation.isPending}
            onClick={handleClose}
          >
            No
          </Button>
        </Stack>
      </CancelScheduleSessionStyled>
    </MuiModalWrapper>
  );
}

export default CancelSession;
