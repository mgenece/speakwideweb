import useElementSize from '@/hooks/resizeHook/resize';
import { EventCalenderWrapper } from '@/styles/StyledComponents/EventCalenderWrapper';
import LeftArrowIcon from '@/ui/Icons/LeftArrowIcon';
import RightArrowIcon from '@/ui/Icons/RightArrowIcon';
import { Box, IconButton, Stack, Typography, useTheme } from '@mui/material';
import moment from 'moment';
import { useState } from 'react';
import { Calendar, DateHeaderProps, momentLocalizer } from 'react-big-calendar';

import { getWeeksInMonth } from '../CalenderUI/CalenderUI';

export type eventType = {
  id: number;
  start: Date;
  end: Date;
};

export interface IEventCalenderProps {
  events?: Date[];
  handleSelect: (data: Date[]) => void;
}

function EventCalender({ events, handleSelect }: IEventCalenderProps) {
  const [calenderHeaderActionRef, { height: calenderheight }] = useElementSize<HTMLDivElement>();
  const [currentDate, setCurrentDate] = useState(new Date());
  const weeks = getWeeksInMonth(currentDate);
  const localizer = momentLocalizer(moment);
  const theme = useTheme();

  const handleDateClick = (date: Date) => {
    const alreadySelected = events?.some(d => moment(d).isSame(date, 'day'));

    let updatedDates;
    if (alreadySelected) {
      updatedDates = events?.filter(d => !moment(d).isSame(date, 'day')) || [];
    } else if ((events?.length || 0) < 4) {
      updatedDates = [...(events || []), date];
    } else {
      // Replace oldest date when reaching 4 selections
      updatedDates = [...(events?.slice(1) || []), date];
    }

    handleSelect(updatedDates);
  };

  const CustomDateHeader: React.FC<DateHeaderProps> = ({ label, date }) => {
    const hasEvent = events?.some(event => event?.toDateString() === date.toDateString());
    const combinedClassName = `rbc-button-link${hasEvent ? ' has-event-date' : ''}`;

    return (
      <span className={combinedClassName}>
        <span className='labelText'>{label}</span>
      </span>
    );
  };

  return (
    <EventCalenderWrapper
      height='100%'
      bgcolor={theme.palette.customColors.primary800}
      borderRadius={{ lg: 5, md: 4, sm: 3, xs: 2 }}
      padding={{ lg: '10px 0px 15px', md: '10px 0px 10px', xs: '10px 0px' }}
    >
      {/* Header Section */}
      <Stack
        ref={calenderHeaderActionRef}
        direction='row'
        alignItems='center'
        justifyContent='space-between'
        gap={{ lg: 2.5, md: 2, xs: 1.3 }}
        className='month-navigation-Section'
        width='100%'
        pt='20px'
        px={{ md: 5, sm: 3, xs: 2.5 }}
        pb={{ lg: 4.5, md: 3, xs: 2 }}
      >
        <Typography
          variant='body1'
          display='inline-flex'
          alignItems={{ lg: 'center', xs: 'flex-end' }}
          fontSize={{ lg: 24, md: 20, sm: 16, xs: 14 }}
          fontWeight={400}
          lineHeight={1.3}
        >
          {moment(currentDate).format('MMMM ')}{' '}
          <Typography
            fontSize={{ lg: 24, md: 20, sm: 16, xs: 14 }}
            fontWeight={600}
            lineHeight={1.3}
            component='caption'
            ml={1}
          >
            {moment(currentDate).format('YYYY')}
          </Typography>
        </Typography>

        {/* Month navigation buttons */}
        <Stack
          direction='row'
          alignItems='center'
          gap={{ lg: 2, md: 1.5, xs: 1 }}
          className='month-navigation-btn'
          sx={{
            button: {
              color: theme.palette.text.primary,
            },
          }}
        >
          <IconButton
            disableRipple
            onClick={() => setCurrentDate(moment(currentDate).subtract(1, 'month').toDate())}
          >
            <LeftArrowIcon />
          </IconButton>
          <IconButton
            disableRipple
            onClick={() => setCurrentDate(moment(currentDate).add(1, 'month').toDate())}
          >
            <RightArrowIcon />
          </IconButton>
        </Stack>
      </Stack>

      {/* Calendar */}
      <Box height={`calc(100% - ${calenderheight}px)`} minHeight={{ lg: 'auto', xs: '300px' }}>
        <Calendar
          className={`smallCalender ${weeks === 6 ? 'six-weeks' : 'five-weeks'} second-type`}
          localizer={localizer}
          date={currentDate}
          startAccessor='start'
          endAccessor='end'
          defaultView='month'
          views={['month']}
          toolbar={false}
          selectable={true}
          onShowMore={() => {}}
          dayLayoutAlgorithm='no-overlap'
          onSelectSlot={slotInfo => handleDateClick(slotInfo.start)}
          popup={true}
          formats={{
            weekdayFormat: (date, culture, localizer) => localizer!.format(date, 'ddd', culture),
          }}
          components={{
            month: {
              dateHeader: CustomDateHeader,
              header: () => null,
            },
          }}
          dayPropGetter={date => {
            const hasEvent = events?.some(event => moment(event).isSame(date, 'day'));
            return hasEvent ? { className: 'has-event-day' } : {};
          }}
        />
      </Box>
    </EventCalenderWrapper>
  );
}

export default EventCalender;
