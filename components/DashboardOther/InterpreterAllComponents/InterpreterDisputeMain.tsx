import AllDisputeInt from '@/components/layouts/disputes/interpreter/AllDisputeInt';
import DeclinedDispute from '@/components/layouts/disputes/interpreter/DeclinedDispute';
import PendingDispute from '@/components/layouts/disputes/interpreter/PendingDispute';
import ResolvedDispute from '@/components/layouts/disputes/interpreter/ResolvedDispute';
import { DisputeMainWrapper } from '@/styles/StyledComponents/DisputeMainWrapper';
import { Box, Stack, Tab, Tabs, Typography } from '@mui/material';
import React from 'react';

interface ITabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: ITabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <Box
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </Box>
  );
}
export function disputTableInterpreter(
  disputId: string,
  clientName: string,
  category: string,
  dateInitiate: string,
  status: string
) {
  return { disputId, clientName, category, dateInitiate, status };
}

export default function InterpreterDisputeMain() {
  const [value, setValue] = React.useState(0);
  const tabsHandler = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <DisputeMainWrapper className='interpreter'>
      <Box className='wrapper_disputeMain'>
        <Stack direction='row' justifyContent='space-between' className='topTitleWrap' gap='16px'>
          <Box className='leftWrapper'>
            <Typography variant='h1'>Dispute List</Typography>
          </Box>
        </Stack>
        <Box className='allTabInfoList'>
          <Box className='topTabInfo'>
            <Tabs
              value={value}
              onChange={tabsHandler}
              variant='scrollable'
              scrollButtons='auto'
              aria-label='scrollable auto tabs example'
            >
              <Tab label={<>All Disputes</>} disableRipple />
              <Tab label={<>Pending</>} disableRipple />
              <Tab label={<>Declined</>} disableRipple />
              <Tab label={<>Resolved</>} disableRipple />
            </Tabs>
          </Box>
          <Box className='bottomTabInfo'>
            <CustomTabPanel value={value} index={0}>
              <AllDisputeInt />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
              <PendingDispute />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
              <DeclinedDispute />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={3}>
              <ResolvedDispute />
            </CustomTabPanel>
          </Box>
        </Box>
      </Box>
    </DisputeMainWrapper>
  );
}
