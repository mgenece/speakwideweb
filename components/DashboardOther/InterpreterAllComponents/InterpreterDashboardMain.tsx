import { InterpreterDashboardMainWrapper } from '@/styles/StyledComponents/DashboardMainTabStyled';
import { IDynamicTabsProps, ITabPanelProps } from '@/typescript/interface/commonall.interface';
import { Box, Button, Tab, Tabs, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';

export function DynamicTabPanel({ children, value, index, ...other }: ITabPanelProps) {
  return (
    <Box role='tabpanel' hidden={value !== index} id={`dynamic-tabpanel-${index}`} {...other}>
      {value === index && <>{children}</>}
    </Box>
  );
}

const InterpreterDashboardMain: React.FC<IDynamicTabsProps> = ({ tabs, className }) => {
  const router = useRouter();
  const [value, setValue] = React.useState(0);

  const tabsHandler = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <InterpreterDashboardMainWrapper className={className}>
      <Box className='wrapper_topTitleBtn'>
        <Typography variant='h1'>Dashboard</Typography>
        <Button
          type='button'
          variant='contained'
          color='primary'
          onClick={() => router.push('/interpreter/dashboard/update-availabality')}
        >
          Update Availability
        </Button>
      </Box>
      <Box className='main-tabsroot'>
        <Tabs
          value={value}
          onChange={tabsHandler}
          variant='scrollable'
          scrollButtons='auto'
          aria-label='scrollable auto tabs example'
        >
          {tabs.map((tab, index) => (
            <Tab key={index} label={tab.label} disableRipple />
          ))}
        </Tabs>
      </Box>
      {tabs.map((tab, index) => (
        <DynamicTabPanel key={index} value={value} index={index}>
          {tab.content}
        </DynamicTabPanel>
      ))}
    </InterpreterDashboardMainWrapper>
  );
};

export default InterpreterDashboardMain;
