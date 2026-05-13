import { inviteListApi } from '@/api/functions/invitation';
import BillingHistory from '@/components/DashboardOther/PurchaseSubscription/BillingHistory';
import PaymentCardList from '@/components/DashboardOther/PurchaseSubscription/PaymentCardList';
import UpgradePlan from '@/components/DashboardOther/PurchaseSubscription/UpgradePlan';
import InvitationForm from '@/components/layouts/Subscription/user/InvitationForm';
import SubscriptionCard from '@/components/layouts/Subscription/user/InvitationList';
import { useUserData } from '@/hooks/react-query/useVisitor';
import DashboardWrapper from '@/layout/DashboardWrapper/DashboardWrapper';
import { isSubscriptionActiveOrTrial } from '@/lib/functions/_helpers.lib';
import {
  CancelPlanContainer,
  PagePaymentSubscription,
} from '@/styles/StyledComponents/PaymentandsubscriptionStyled';
import ShadowCrossIcon from '@/ui/Icons/ShadowCrossIcon';
import WarningIcon from '@/ui/Icons/WarningIcon';
import MuiModalWrapper from '@/ui/Modal/MuiModalWrapper';
import { Box, Button, Grid2, Paper, Stack, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';

export default function Paymentandsubscription() {
  const [openCancelPlan, setOpenCancelPlan] = useState(false);
  const [cancelConfirm, setCancelConfirm] = useState(false);
  const { userData } = useUserData();
  const invitationSectionRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const VALID_SECTIONS = ['invitation', 'billing', 'cards'] as const;

  useEffect(() => {
    const section = router.query.section;
    if (
      typeof section === 'string' &&
      VALID_SECTIONS.includes(section as (typeof VALID_SECTIONS)[number]) &&
      section === 'invitation' &&
      invitationSectionRef.current
    ) {
      setTimeout(() => {
        invitationSectionRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }, 100);
    }
  }, [router.query.section]);

  // const cancelPlanOpenHandler = () => {
  //   setOpenCancelPlan(true);
  // };
  const cancelPlanCloseHandler = () => {
    setOpenCancelPlan(false);
    setTimeout(() => {
      setCancelConfirm(false);
    }, 500);
  };
  const cancelConfirmOpenHandler = () => {
    setCancelConfirm(true);
  };

  const invitationQuery = useQuery({ queryKey: ['invitation-list'], queryFn: inviteListApi });

  // console.log(invitationQuery.data?.data, '***i');

  // const isInviteAvailable = Boolean(invitationQuery.data?.data.length);

  // console.log(isInviteAvailable, '***');
  // const cancelConfirmCloseHandler = () => setCancelConfirm(false);

  return (
    <DashboardWrapper pageTitle='Subscription & Transaction Details'>
      <PagePaymentSubscription>
        <Box className='top-status-heading'>
          <Grid2 container spacing={2} alignItems='center'>
            <Grid2 size={{ sm: 8, xs: 12 }}>
              <Stack direction='row' alignItems='center' flexWrap='wrap' className='plan-status'>
                <Typography variant='body2'>Active Plan</Typography>
                <Typography variant='caption'>
                  {isSubscriptionActiveOrTrial(userData?.subscriptionDetails)
                    ? userData?.subscriptionDetails?.planDetails?.title
                    : 'NA'}
                </Typography>
              </Stack>
            </Grid2>
            <Grid2 size={{ sm: 4, xs: 12 }}>
              <Box className='cancel-plan-btn'>
                {/* <Button color='error' onClick={cancelPlanOpenHandler}>
                  Cancel Plan
                </Button> */}
              </Box>
            </Grid2>
          </Grid2>
        </Box>
        <Grid2 container spacing={1}>
          <Grid2 size={{ xs: 12 }}>
            <UpgradePlan />
          </Grid2>
          <Grid2 size={{ xs: 12 }}>
            <BillingHistory />
          </Grid2>
          <Grid2 size={{ md: 6, xs: 12 }}>
            <PaymentCardList />
          </Grid2>
          <Grid2 size={{ md: 6, xs: 12 }} id='invitation' ref={invitationSectionRef}>
            <Paper elevation={0} className='cmn-paper-box'>
              {invitationQuery.data?.data.length ? (
                <SubscriptionCard data={invitationQuery.data?.data} />
              ) : (
                <InvitationForm
                  slotNumber={userData?.subscriptionDetails?.planDetails.no_of_users || 0}
                />
              )}
            </Paper>
          </Grid2>
        </Grid2>
      </PagePaymentSubscription>

      {/* CANCEL PLAN MODAL START HERE */}
      <MuiModalWrapper
        open={openCancelPlan}
        onClose={cancelPlanCloseHandler}
        className='cnacelSessionModal'
      >
        <CancelPlanContainer>
          {!cancelConfirm ? (
            <>
              <Stack
                direction='row'
                alignItems='center'
                flexWrap='wrap'
                className='plancancel-dialog-head'
              >
                <i className='icon-wrap'>
                  <WarningIcon />
                </i>
                <Typography variant='h6' fontSize='14px' fontWeight={500} textTransform='uppercase'>
                  CANCEL THIS PLAN
                </Typography>
              </Stack>
              <Box className='cancel-content'>
                <Typography variant='body1' fontSize='18px' fontWeight={500} mb='5px'>
                  Are you sure you want to cancel this plan?
                </Typography>
                <Typography variant='body2' fontSize='13px'>
                  We sorry to see you go! please confirm cancellation
                </Typography>
                <Stack
                  direction='row'
                  alignItems='center'
                  justifyContent='center'
                  flexWrap='wrap'
                  className='btn-stack'
                >
                  <Button
                    variant='outlined'
                    color='primary'
                    className='outnineBtn'
                    onClick={cancelPlanCloseHandler}
                  >
                    No
                  </Button>
                  <Button
                    variant='contained'
                    color='primary'
                    className='primaryBtn'
                    onClick={cancelConfirmOpenHandler}
                  >
                    Yes, Cancel
                  </Button>
                </Stack>
              </Box>
            </>
          ) : (
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
          )}
        </CancelPlanContainer>
      </MuiModalWrapper>
    </DashboardWrapper>
  );
}
