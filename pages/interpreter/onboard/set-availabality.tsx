import { addAvailabilityInterpreterApi } from '@/api/functions/auth.api';
import AddNewPeriod from '@/components/AddNewPeriod/AddNewPeriod';
import { DayOfWeek, ScheduleState } from '@/components/AddNewPeriod/types';
import ButtonCommon from '@/components/layouts/common/ButtonCommon';
import assest from '@/json/assest';
import Wrapper from '@/layout/wrapper/Wrapper';
import { AuthHeading } from '@/styles/StyledComponents/AuthWrapperStyled';
import { AvailabilityWrapper } from '@/styles/StyledComponents/AvailabilityWrapper';
import {
  SetAvailabalityWrapper,
  SxInherit,
} from '@/styles/StyledComponents/SetAvailabalityWrapper';
import { Box, Container, Grid2, Stack, Typography, useTheme } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';
import toast from 'react-hot-toast';

interface ConvertedSlot {
  from: string; // "HH:mm"
  to: string; // "HH:mm"
}

interface ConvertedDay {
  day: DayOfWeek;
  offDay: boolean;
  slots: ConvertedSlot[];
}

interface ConvertedSchedule {
  schedule: ConvertedDay[];
  // offDates: string[];
}

export function convertSchedule(data: ScheduleState): ConvertedSchedule {
  const result: ConvertedDay[] = [];
  // const offDates = new Set<string>(); // to avoid duplicates

  Object.values(data).forEach(({ day, isOffDay, timeSlots }) => {
    const slots = timeSlots.map(slot => {
      const start = slot.startTime;
      const end = slot.endTime;

      return {
        from: start.format('HH:mm'),
        to: end.format('HH:mm'),
      };
    });

    result.push({
      day,
      offDay: isOffDay,
      slots,
    });
  });

  return {
    schedule: result,
  };
}

function SetAvailabality() {
  const theme = useTheme();
  const router = useRouter();
  const [schedule, setSchedule] = useState<null | ScheduleState>(null);
  const addAvailabilityMutation = useMutation({
    mutationFn: addAvailabilityInterpreterApi,
    onSuccess: () => {
      toast.success('Availability added successfully');
      router.push('/interpreter/payment/pricing/');
    },
  });

  const handleOnClick = () => {
    if (schedule) {
      const dateObj = convertSchedule(schedule);
      addAvailabilityMutation.mutate({ weeklySchedule: dateObj.schedule });
    }
  };

  return (
    <SetAvailabalityWrapper
      width='100%'
      minHeight='100svh'
      position='relative'
      sx={{
        '.headerContainer': {
          paddingBottom: '14px',
          zIndex: 2,
          position: 'relative',
        },
      }}
    >
      <Box
        component='figure'
        position='absolute'
        top={0}
        left={0}
        width='100%'
        height='100%'
        zIndex={1}
      >
        <Image
          width={3600}
          height={2600}
          alt='backgroundImage'
          loading='lazy'
          src={assest.backgroundImg}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      </Box>
      <Wrapper>
        <Container fixed className='containerFluid'>
          <Box overflow='auto' height='100%' position='relative' zIndex={2}>
            <AuthHeading className='authheadingStyled'>
              <Typography variant='h1'>
                <Typography variant='caption' sx={{ ...SxInherit }}>
                  Set
                </Typography>{' '}
                Availability
              </Typography>
              <Typography variant='body1'>
                <Typography className='bold-text' variant='caption'>
                  Please provide your availability for sessions to be booked
                </Typography>
              </Typography>
            </AuthHeading>
            <Box pt={{ lg: '36px', md: 3, xs: 2 }} pb={{ lg: 6, md: 5, sm: 4, xs: 2 }}>
              <AvailabilityWrapper
                className=''
                bgcolor={theme.palette.common.white}
                borderRadius={{ lg: '15px', md: '10px', xs: '8px' }}
                py={{ lg: 4, md: 3, xs: 2 }}
                px={{ lg: 2, md: 1.5, xs: 1 }}
              >
                <Grid2 container spacing={{ md: 1, xs: 2 }}>
                  <Grid2 size={{ lg: 12, xs: 12 }}>
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
                            onChange={data => {
                              setSchedule(data);
                            }}
                          />
                        </Box>
                      </Box>
                    </Box>
                  </Grid2>
                </Grid2>
              </AvailabilityWrapper>
            </Box>
            <Stack direction='row' alignItems='center' justifyContent='center'>
              <ButtonCommon
                variant='contained'
                color='primary'
                className='primary-gradiant-btn'
                sx={{ marginTop: '0 !important' }}
                onClick={handleOnClick}
                isLoading={addAvailabilityMutation.isPending}
              >
                Save & Continue
              </ButtonCommon>
            </Stack>
          </Box>
        </Container>
      </Wrapper>
    </SetAvailabalityWrapper>
  );
}

export default SetAvailabality;
