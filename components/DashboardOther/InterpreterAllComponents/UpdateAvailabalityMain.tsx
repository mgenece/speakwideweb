import { addAvailabilityInterpreterApi, IWeeklySchedule } from '@/api/functions/auth.api';
import AddNewPeriod from '@/components/AddNewPeriod/AddNewPeriod';
import { DayOfWeek, ScheduleState } from '@/components/AddNewPeriod/types';
import EventCalender from '@/components/EventCalender/EventCalender';
import ButtonCommon from '@/components/layouts/common/ButtonCommon';
import { useInterpreterData } from '@/hooks/react-query/useVisitor';
import { convertSchedule } from '@/pages/interpreter/onboard/set-availabality';
import { AvailabilityWrapper } from '@/styles/StyledComponents/AvailabilityWrapper';
import { InterpreterDashboardMainWrapper } from '@/styles/StyledComponents/DashboardMainTabStyled';
import LeftArrowIcon from '@/ui/Icons/LeftArrowIcon';
import { Box, Button, Grid2, Stack, Typography, useTheme } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

function transformToScheduleState(data: IWeeklySchedule[]): ScheduleState {
  return data.reduce((acc, curr, index) => {
    const day = curr.day as DayOfWeek;

    acc[day] = {
      day,
      isOffDay: curr.offDay,
      timeSlots: curr.slots.map((slot, i) => ({
        id: `${day}-${index}-${i}`, // generate a stable unique ID
        startTime: dayjs(slot.from, 'HH:mm'),
        endTime: dayjs(slot.to, 'HH:mm'),
      })),
    };

    return acc;
  }, {} as ScheduleState);
}

export default function UpdateAvailabalityMain() {
  const { interpreterData, invalidateInterpreterData } = useInterpreterData();
  const theme = useTheme();
  const router = useRouter();

  const [schedule, setSchedule] = useState<null | ScheduleState>(null);
  const [offDates, setOffDates] = useState<Date[]>([]);

  const addAvailabilityMutation = useMutation({
    mutationFn: addAvailabilityInterpreterApi,
    onSuccess: () => {
      invalidateInterpreterData();
      toast.success('Availability updated successfully');
    },
  });

  const handleOnClick = () => {
    const dateStr = offDates.map(item => dayjs(item).format('YYYY-MM-DD'));
    if (schedule) {
      const dateObj = convertSchedule(schedule);
      addAvailabilityMutation.mutate({ weeklySchedule: dateObj.schedule, offDates: dateStr });
    }
  };
  const offDatesInit = interpreterData?.availability?.offDates?.map(item => item.date);
  const offDatesInitStr = offDatesInit?.join('-');
  useEffect(() => {
    const dates = offDatesInit?.map(item => new Date(item)) || [];
    setOffDates(dates);
  }, [offDatesInitStr]);

  const scheduleTemp = interpreterData?.availability
    ? transformToScheduleState(interpreterData?.availability.weeklySchedule)
    : null;

  return (
    <InterpreterDashboardMainWrapper className={''}>
      <Box className='wrapper_topTitleBtn'>
        <Stack
          direction={{ sm: 'row', xs: 'column' }}
          alignItems={{ sm: 'center', xs: 'flex-start' }}
          flexWrap={'wrap'}
          spacing={{ sm: '25px', xs: '0px' }}
        >
          <Button
            variant='text'
            startIcon={<LeftArrowIcon IconColor={theme.palette.primary.main} />}
            disableRipple
            sx={{
              color: theme.palette.customColors.light,
              background: 'transparent !important',
              textTransform: 'capitalize',
              fontSize: '16px',
              fontWeight: 500,
              '.MuiButton-icon ': {
                svg: {
                  height: '12px',
                },
              },
              '&:hover': {
                color: theme.palette.primary.main,
                backgroundColor: 'transparent',
              },
            }}
            onClick={() => router.push('/interpreter/dashboard/')}
          >
            Go Back
          </Button>
          <Typography variant='h1'>Update Availability</Typography>
        </Stack>
        <ButtonCommon
          type='button'
          variant='contained'
          color='primary'
          aria-label='Update'
          sx={{ minWidth: '150px' }}
          isLoading={addAvailabilityMutation.isPending}
          onClick={() => handleOnClick()}
        >
          Update
        </ButtonCommon>
      </Box>

      <Box pb={{ lg: 6, md: 5, sm: 4, xs: 2 }}>
        <AvailabilityWrapper
          className=''
          bgcolor={theme.palette.common.white}
          borderRadius={{ lg: '15px', md: '10px', xs: '8px' }}
          py={{ lg: 4, md: 3, xs: 2 }}
          px={{ lg: 2, md: 1.5, xs: 1 }}
        >
          <Grid2 container spacing={{ md: 1, xs: 2 }}>
            <Grid2 size={{ lg: 8, xs: 12 }}>
              <Box
                className='cmn_chatContainer'
                height='100%'
                display='flex'
                flexDirection='column'
              >
                <Box
                  className='chatParticipantListHeading'
                  px={{ lg: 4, md: 3, xs: 2 }}
                  py={{ lg: 2.1, md: 1.5, xs: 0.8 }}
                  bgcolor={theme.palette.primary.main}
                  borderRadius={'10px 10px 0 0'}
                >
                  <Typography
                    variant='body1'
                    className=''
                    color={theme.palette.common.white}
                    fontSize={{ lg: 20, md: 16, xs: 14 }}
                    fontWeight={600}
                    sx={{ wordBreak: 'break-word' }}
                  >
                    Add New Period
                  </Typography>
                </Box>
                <Box
                  className='chatcontentSectionBody'
                  height='100%'
                  bgcolor={theme.palette.common.white}
                  border='1px solid #E5E5E5'
                  borderTop={0}
                  borderRadius={'0 0 10px 10px '}
                  overflow='auto'
                >
                  <Box
                    className='innerBox'
                    height='100%'
                    py={{ lg: 2, xs: 1.5 }}
                    px={{ lg: 1.7, xs: 1.5 }}
                  >
                    <AddNewPeriod
                      initialSchedule={scheduleTemp}
                      onChange={data => {
                        setSchedule(data);
                      }}
                    />
                  </Box>
                </Box>
              </Box>
            </Grid2>
            <Grid2 size={{ lg: 4, xs: 12 }}>
              <Box
                className='cmn_chatContainer'
                height='100%'
                display='flex'
                flexDirection='column'
              >
                <Box
                  className='chatParticipantListHeading'
                  px={{ lg: 4, md: 3, xs: 2 }}
                  py={{ lg: 2.1, md: 1.5, xs: 0.8 }}
                  bgcolor={theme.palette.primary.main}
                  borderRadius={'10px 10px 0 0'}
                >
                  <Typography
                    variant='body1'
                    className=''
                    color={theme.palette.common.white}
                    fontSize={{ lg: 16, xs: 14 }}
                    fontWeight={600}
                    sx={{ wordBreak: 'break-word' }}
                  >
                    Set Off Date on Calender
                  </Typography>
                </Box>
                <Box
                  className='chatcontentSectionBody'
                  height='100%'
                  bgcolor={theme.palette.common.white}
                  border='1px solid #E5E5E5'
                  borderTop={0}
                  borderRadius={'0 0 10px 10px '}
                  overflow='auto'
                >
                  <Box
                    className='innerBox'
                    height='100%'
                    py={{ lg: 2, xs: 1.5 }}
                    px={{ lg: 1.7, xs: 1.5 }}
                  >
                    <EventCalender
                      events={offDates}
                      handleSelect={data => {
                        setOffDates(data);
                      }}
                    />
                  </Box>
                </Box>
              </Box>
            </Grid2>
          </Grid2>
        </AvailabilityWrapper>
      </Box>
    </InterpreterDashboardMainWrapper>
  );
}
