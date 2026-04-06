import { clientCalenderApi } from '@/api/functions/session.api';
import useElementSize from '@/hooks/resizeHook/resize';
import { DashboardcalenderViewWrapper } from '@/styles/StyledComponents/DashboardcalenderViewWrapper';
import LeftArrowIcon from '@/ui/Icons/LeftArrowIcon';
import RightArrowIcon from '@/ui/Icons/RightArrowIcon';
import { Box, CircularProgress, IconButton, Stack, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import moment from 'moment';
import { useCallback, useState } from 'react';
import { Calendar, DateHeaderProps, momentLocalizer, Event as RBCEvent } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import CalenderSelector from './CalenderSelector';

const localizer = momentLocalizer(moment);

interface CalendarEvent extends RBCEvent {
  title: string;
  start: Date;
  end: Date;
  eventType: string;
}

export const getWeeksInMonth = (date: Date) => {
  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
  const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  const used = firstDay.getDay() + lastDay.getDate();
  return Math.ceil(used / 7);
};

const CalenderUI = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [calenderHeaderActionRef, { height: calenderheight }] = useElementSize<HTMLDivElement>();

  // Calculate start and end dates for the API call
  const getMonthRange = (date: Date) => {
    const start = moment(date).startOf('month').format('YYYY-MM-DD');
    const end = moment(date).endOf('month').format('YYYY-MM-DD');
    return { start_date: start, end_date: end };
  };

  const clientCalenderQuery = useQuery({
    queryKey: ['calender-data', currentDate.getFullYear(), currentDate.getMonth()],
    queryFn: () => clientCalenderApi(getMonthRange(currentDate)),
  });

  const transformedEvents: CalendarEvent[] =
    clientCalenderQuery.data?.data?.docs?.map(session => {
      const getEventType = (): string => {
        const now = new Date();
        const endTime = new Date(session.end_date_time);

        if (endTime < now) return 'expired';

        return 'active';
      };

      const startDate = new Date(session.start_date_time);
      const endDate = new Date(session.end_date_time);
      const duration = moment(endDate).diff(moment(startDate), 'hours', true);

      return {
        title: `${moment(startDate).format('HH:mm')} (${duration.toFixed(1)} hours)`,
        start: startDate,
        end: endDate,
        eventType: getEventType(),
      };
    }) || [];

  // console.log(transformedEvents, '***');

  const CustomDateHeader: React.FC<DateHeaderProps> = ({ label, date }) => {
    const hasEvent = transformedEvents?.some(
      event => event.start.toDateString() === date.toDateString()
    );

    const combinedClassName = `rbc-button-link ${hasEvent ? 'has-event-date' : ''}`.trim();

    return (
      <span className={combinedClassName}>
        <span className='lableText'>{label}</span>
      </span>
    );
  };

  const dynamicBackground = (eventType: string) => {
    switch (eventType) {
      case 'active':
        return '#B487FF';
      case 'expired':
        return '#FF59AD';
      case 'decline':
        return '#B6C1CA';
      default:
        return '#B6C1CA';
    }
  };

  const CustomLimitedEvent = (props: { event: CalendarEvent }) => (
    <Box
      className='event-content'
      p={{ lg: '4px 6px', xs: '4px' }}
      bgcolor={dynamicBackground(props.event.eventType)}
    >
      <Typography
        sx={{
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}
        fontSize={{ lg: '14px', xs: '12px' }}
        textAlign='left'
        lineHeight={1.1}
        className='eventText'
      >
        {props.event.title}
      </Typography>
    </Box>
  );

  const handleNavigate = useCallback((newDate: Date) => {
    setCurrentDate(newDate);
  }, []);

  const handleDateChange = useCallback((date: any) => {
    setCurrentDate(date.toDate());
  }, []);

  const weeks = getWeeksInMonth(currentDate);

  if (clientCalenderQuery.isLoading) {
    return (
      <DashboardcalenderViewWrapper
        calenderHeight={calenderheight}
        className='CalenderViewWrapper'
        height='100%'
      >
        <Box
          display='flex'
          justifyContent='center'
          alignItems='center'
          height='100%'
          minHeight='400px'
        >
          <CircularProgress />
        </Box>
      </DashboardcalenderViewWrapper>
    );
  }

  if (clientCalenderQuery.isError) {
    return (
      <DashboardcalenderViewWrapper
        calenderHeight={calenderheight}
        className='CalenderViewWrapper'
        height='100%'
      >
        <Box
          display='flex'
          justifyContent='center'
          alignItems='center'
          height='100%'
          minHeight='400px'
        >
          <Typography color='error'>Error loading calendar data. Please try again.</Typography>
        </Box>
      </DashboardcalenderViewWrapper>
    );
  }

  return (
    <DashboardcalenderViewWrapper
      calenderHeight={calenderheight}
      className='CalenderViewWrapper'
      height='100%'
    >
      <Stack
        direction='row'
        alignItems='center'
        justifyContent={{ sm: 'space-between', xs: 'center' }}
        className='calender-header'
        ref={calenderHeaderActionRef}
        flexWrap='wrap'
        gap={{ sm: 1.5, xs: 1 }}
      >
        <Stack
          direction='row'
          alignItems='center'
          justifyContent={{ sm: 'initial', xs: 'center' }}
          gap={{ lg: 2.5, md: 2, xs: 1.3 }}
          className='month-navigation-Section'
          width={{ sm: 'auto', xs: '100%' }}
        >
          <Typography variant='body1' className='calender-title'>
            {moment(currentDate).format('MMMM YYYY')}
          </Typography>
          <Stack
            direction='row'
            alignItems='center'
            gap={{ lg: 0.7, xs: 0.5 }}
            className='month-navigation-btn'
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
        <CalenderSelector onDateChange={handleDateChange} />
      </Stack>

      <Box
        className='calenderWrapper'
        height='100%'
        maxHeight={{ sm: `calc(100% - ${calenderheight}px)` }}
      >
        <Calendar
          className={`customCalender ${weeks === 6 ? 'six-weeks' : 'five-weeks'}`}
          localizer={localizer}
          events={transformedEvents}
          date={currentDate}
          startAccessor='start'
          endAccessor='end'
          defaultView='month'
          views={['month']}
          toolbar={false}
          onNavigate={handleNavigate}
          components={{
            event: props => <CustomLimitedEvent {...props} />,
            month: {
              dateHeader: CustomDateHeader,
            },
          }}
          onShowMore={() => {}}
          dayLayoutAlgorithm='no-overlap'
          popup={true}
          formats={{
            weekdayFormat: (date, culture, localizer) => localizer!.format(date, 'ddd', culture),
          }}
        />
      </Box>
    </DashboardcalenderViewWrapper>
  );
};

export default CalenderUI;
