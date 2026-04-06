import { InterpreterDashboardMainWrapper } from '@/styles/StyledComponents/DashboardMainTabStyled';
import { IDynamicTabsProps, ITabPanelProps } from '@/typescript/interface/commonall.interface';
import CustomPagination from '@/ui/CustomPagination/CustomPagination';
import { Box, Tab, Tabs, Typography } from '@mui/material';
import React from 'react';

export function DynamicTabPanel({ children, value, index, ...other }: ITabPanelProps) {
  return (
    <Box role='tabpanel' hidden={value !== index} id={`dynamic-tabpanel-${index}`} {...other}>
      {value === index && <>{children}</>}
    </Box>
  );
}

const InterpreterSessionHistoryMain: React.FC<IDynamicTabsProps> = ({ tabs, className }) => {
  const [value, setValue] = React.useState(0);

  const tabsHandler = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <InterpreterDashboardMainWrapper className={className}>
      <Box className='wrapper_topTitleBtn'>
        <Typography variant='h1'>Session History</Typography>
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

      <CustomPagination count={10} position='start' />
    </InterpreterDashboardMainWrapper>
  );
};

export default InterpreterSessionHistoryMain;
