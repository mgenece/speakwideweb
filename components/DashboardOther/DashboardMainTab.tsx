import { DashboardMainTabWrapper } from '@/styles/StyledComponents/DashboardMainTabStyled';
import { IDynamicTabsProps, ITabPanelProps } from '@/typescript/interface/commonall.interface';
import { Box, Tab, Tabs } from '@mui/material';
import React from 'react';

export function DynamicTabPanel({ children, value, index, ...other }: ITabPanelProps) {
  return (
    <Box role='tabpanel' hidden={value !== index} id={`dynamic-tabpanel-${index}`} {...other}>
      {value === index && <>{children}</>}
    </Box>
  );
}

const DashboardMainTab: React.FC<IDynamicTabsProps> = ({ tabs, className }) => {
  const [value, setValue] = React.useState(0);

  const tabsHandler = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <DashboardMainTabWrapper className={className}>
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
    </DashboardMainTabWrapper>
  );
};

export default DashboardMainTab;
