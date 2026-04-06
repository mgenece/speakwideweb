import BankAccountCard from '@/components/DashboardOther/PurchaseSubscription/BankAccountCard';
import PaymentCardList from '@/components/DashboardOther/PurchaseSubscription/PaymentCardList';
import UpgradePlan from '@/components/DashboardOther/PurchaseSubscription/UpgradePlan';
import BillingHistoryInt from '@/components/layouts/Subscription/interpreter/BillingHistory';
import { useInterpreterData } from '@/hooks/react-query/useVisitor';
import DashboardWrapper from '@/layout/DashboardWrapper/DashboardWrapper';
import { isSubscriptionActiveOrTrial } from '@/lib/functions/_helpers.lib';
import { CancelScheduleSessionStyled } from '@/styles/StyledComponents/CancelScheduleSessionStyled';
import {
  CancelPlanContainer,
  PagePaymentSubscription,
} from '@/styles/StyledComponents/PaymentandsubscriptionStyled';
import CancelSessionIcon from '@/ui/Icons/CancelSessionIcon';
import ShadowCrossIcon from '@/ui/Icons/ShadowCrossIcon';
import MuiModalWrapper from '@/ui/Modal/MuiModalWrapper';
import { Box, Button, Grid2, Stack, Typography } from '@mui/material';
import { useState } from 'react';

export default function Paymentandsubscription() {
  const [openCancelPlan, setOpenCancelPlan] = useState(false);
  const { interpreterData } = useInterpreterData();

  const cancelPlanCloseHandler = () => {
    setOpenCancelPlan(false);
  };

  // const cancelConfirmCloseHandler = () => setCancelConfirm(false);

  const [isCancelPlanModalOpen, setIsCancelPlanModalOpen] = useState(false);
  const handleToggleCancelPlanModal = () => {
    setIsCancelPlanModalOpen(!isCancelPlanModalOpen);
  };

  return (
    <DashboardWrapper pageTitle='Subscription & Transaction Details' isInterpreterType>
      <PagePaymentSubscription>
        <Box className='top-status-heading'>
          <Grid2 container spacing={2} alignItems='center'>
            <Grid2 size={{ sm: 8, xs: 12 }}>
              <Stack direction='row' alignItems='center' flexWrap='wrap' className='plan-status'>
                <Typography variant='body2'>Active Plan</Typography>
                <Typography variant='caption'>
                  {isSubscriptionActiveOrTrial(interpreterData?.subscriptionDetails)
                    ? interpreterData?.subscriptionDetails?.planDetails?.title?.toUpperCase()
                    : 'NA'}
                </Typography>
              </Stack>
            </Grid2>
          </Grid2>
        </Box>
        <Grid2 container spacing={1}>
          <Grid2 size={{ xs: 12 }}>
            <UpgradePlan />
          </Grid2>
          <Grid2 size={{ xs: 12 }}>
            <BillingHistoryInt />
          </Grid2>
          <Grid2 size={{ md: 6, xs: 12 }}>
            <PaymentCardList />
          </Grid2>
          <Grid2 size={{ md: 6, xs: 12 }}>
            <BankAccountCard />
          </Grid2>
        </Grid2>
      </PagePaymentSubscription>

      {/* CANCEL PLAN MODAL START HERE */}
      <MuiModalWrapper
        open={isCancelPlanModalOpen}
        onClose={handleToggleCancelPlanModal}
        className='subscriptionSessionModal'
      >
        <CancelScheduleSessionStyled className='cancel-plan'>
          <Box className='subscription-cancel-sec'>
            <Box className='inner-box'>
              <i className='icon-wrap'>
                <CancelSessionIcon />
              </i>
              <Typography variant='h4' fontWeight={600}>
                Sorry to See You Go,
                <br /> Please Confirm Cancellation
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
            <Button
              variant='contained'
              color='primary'
              className='primaryBtn'
              aria-label='Yes Cancel'
              onClick={() => {
                handleToggleCancelPlanModal();
                setOpenCancelPlan(true);
              }}
            >
              Yes Cancel
            </Button>
            <Button
              variant='contained'
              color='primary'
              className='no-btn'
              aria-label='No'
              onClick={handleToggleCancelPlanModal}
            >
              No
            </Button>
          </Stack>
        </CancelScheduleSessionStyled>
      </MuiModalWrapper>

      {/* CANCEL PLAN MODAL START HERE */}
      <MuiModalWrapper
        open={openCancelPlan}
        // open={openCancelPlan}
        onClose={cancelPlanCloseHandler}
        className='cnacelSessionModal'
      >
        <CancelPlanContainer className='interpreter'>
          <Box className='subscription-cancel-sec'>
            <i className='icon-wrap'>
              <ShadowCrossIcon />
            </i>
            <Typography variant='h4' fontWeight={600}>
              Subscription Cancelled
            </Typography>
            <Typography variant='body2' fontSize='15px'>
              You will have access to subscription features until the end of your billing period
            </Typography>
            <Stack
              direction='row'
              alignItems='center'
              justifyContent='center'
              flexWrap='wrap'
              className='btn-stack'
            >
              <Button
                variant='contained'
                color='primary'
                className='primaryBtn'
                onClick={cancelPlanCloseHandler}
              >
                Got It
              </Button>
            </Stack>
          </Box>
        </CancelPlanContainer>
      </MuiModalWrapper>
    </DashboardWrapper>
  );
}
