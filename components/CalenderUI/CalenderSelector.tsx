import {
  CalenderMenue,
  CalenderSelectorWrapper,
} from '@/styles/StyledComponents/DashboardcalenderViewWrapper';

import CalenderIcon from '@/ui/Icons/CalenderIcon';
import DropdownIcon from '@/ui/Icons/DropdownIcon';
import { Button } from '@mui/material';
import { DateCalendar, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Dayjs } from 'dayjs';
import { useState } from 'react';

type TCalenderSelectorProps = {
  onDateChange?: (date: Dayjs) => void;
};

function CalenderSelector({ onDateChange }: TCalenderSelectorProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [currentView, setCurrentView] = useState<'year' | 'month' | 'day'>('month');
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setCurrentView('month');
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDateChange = (newDate: Dayjs | null) => {
    if (newDate) {
      if (onDateChange) {
        onDateChange(newDate);
      }
      if (currentView === 'year') {
        handleClose();
      }
    }
  };

  const handleViewChange = (newView: 'year' | 'month' | 'day') => {
    setCurrentView(newView);
  };

  return (
    <CalenderSelectorWrapper
      alignItems='center'
      direction='row'
      gap={{ lg: 1.9, md: 1.5, xs: 1.2 }}
    >
      <>
        <Button
          endIcon={<DropdownIcon />}
          id='demo-positioned-button'
          aria-controls={open ? 'demo-positioned-menu' : undefined}
          aria-haspopup='true'
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
          className='calenderBtn'
          startIcon={<CalenderIcon />}
        >
          Month
        </Button>
        <CalenderMenue
          className=''
          id='demo-positioned-menu'
          aria-labelledby='demo-positioned-button'
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar
              className='selectableCalender'
              views={['month', 'year']}
              onChange={handleDateChange}
              onViewChange={handleViewChange}
            />
          </LocalizationProvider>
        </CalenderMenue>
      </>
    </CalenderSelectorWrapper>
  );
}

export default CalenderSelector;
