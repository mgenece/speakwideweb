import AllDisputesTab from '@/components/layouts/disputes/user/AllDisputesTab';
import DeclinedDisputesTab from '@/components/layouts/disputes/user/DeclinedDisputesTab';
import PendingDisputesTab from '@/components/layouts/disputes/user/PendingDisputesTab';
import ResolvedDisputesTab from '@/components/layouts/disputes/user/ResolvedDisputesTab';
import { DisputeMainWrapper } from '@/styles/StyledComponents/DisputeMainWrapper';
import { Box, Tab, Tabs, Typography } from '@mui/material';
import React from 'react';

interface ITabPanelProps {
  children?: React.ReactNode;
  isActive: boolean;
}

function CustomTabPanel({ children, isActive }: ITabPanelProps) {
  return isActive ? <Box>{children}</Box> : null;
}

export function disputTableData(
  sl: string,
  disputId: string,
  interpreterName: string,
  category: string,
  amountPaid: string,
  dateInitiate: string,
  status: string
) {
  return { sl, disputId, interpreterName, category, amountPaid, dateInitiate, status };
}

export default function DisputeMain() {
  const [selectedTab, setSelectedTab] = React.useState<string>('All Disputes');

  const tabsHandler = (event: React.SyntheticEvent, newValue: string) => {
    setSelectedTab(newValue);
  };

  return (
    <DisputeMainWrapper>
      <Box className='wrapper_disputeMain'>
        <Box className='leftWrapper'>
          <Typography variant='h1'>Disputes</Typography>
          <Typography variant='body1'>Keep track all of your disputes.</Typography>
        </Box>

        <Box className='allTabInfoList'>
          <Box className='topTabInfo'>
            <Tabs
              value={selectedTab}
              onChange={tabsHandler}
              variant='scrollable'
              scrollButtons='auto'
              aria-label='dispute tabs'
            >
              <Tab label={<>All Disputes</>} value='All Disputes' disableRipple />
              <Tab label={<>Pending</>} value='Pending' disableRipple />
              <Tab label={<>Declined</>} value='Declined' disableRipple />
              <Tab label={<>Resolved</>} value='Resolved' disableRipple />
            </Tabs>
          </Box>

          <Box className='bottomTabInfo'>
            <CustomTabPanel isActive={selectedTab === 'All Disputes'}>
              <AllDisputesTab />
            </CustomTabPanel>
            <CustomTabPanel isActive={selectedTab === 'Pending'}>
              <PendingDisputesTab />
            </CustomTabPanel>
            <CustomTabPanel isActive={selectedTab === 'Declined'}>
              <DeclinedDisputesTab />
            </CustomTabPanel>
            <CustomTabPanel isActive={selectedTab === 'Resolved'}>
              <ResolvedDisputesTab />
            </CustomTabPanel>
          </Box>
        </Box>
      </Box>
    </DisputeMainWrapper>
  );
}
