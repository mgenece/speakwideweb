import { CustomTabsWrapper } from '@/styles/StyledComponents/CustomTabsStyled';
import { IDynamicTabsProps, ITabPanelProps } from '@/typescript/interface/commonall.interface';
import { Box, Tab, Tabs } from '@mui/material';
import React from 'react';

export function CustomTabPanel({ children, value, index, ...other }: ITabPanelProps) {
  return (
    <Box
      className='tabouterWrpper'
      role='tabpanel'
      hidden={value !== index}
      id={`dynamic-tabpanel-${index}`}
      {...other}
    >
      {value === index && <>{children}</>}
    </Box>
  );
}

const CommonTabs: React.FC<IDynamicTabsProps> = ({ tabs, className, onTabChange }) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    onTabChange?.(newValue);
  };
  return (
    <CustomTabsWrapper className={className}>
      <Box className='tab-tabsroot'>
        <Tabs
          value={value}
          onChange={handleChange}
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
        <CustomTabPanel key={index} value={value} index={index}>
          {tab.content}
        </CustomTabPanel>
      ))}
    </CustomTabsWrapper>
  );
};

export default CommonTabs;
