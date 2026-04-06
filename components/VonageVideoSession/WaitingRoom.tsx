// components/JoinSessionCard.tsx
import { calculateTimeGap } from '@/lib/functions/_helpers.lib';
import { Box, Button, Card, CardContent, TextField, Typography } from '@mui/material';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import DevicePreview, { DevicePreviewState } from './DevicePreview';

interface IWaitingRoomProps {
  startTime: string;
  endTime: string;
  username: string;
  onUsernameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  mediaState: {
    hasAudio: boolean;
    hasVideo: boolean;
  };
  onDevicePreviewChange: (data: DevicePreviewState) => void;
  canJoin: boolean;
  isLoadingSession: boolean;
  onConnect: () => void;
  isAudio: boolean;
}

interface ITimeGap {
  hours: number;
  minutes: number;
  seconds: number;
  formatted: string;
  isPast: boolean;
}

export const WaitingRoom: React.FC<IWaitingRoomProps> = ({
  username,
  onUsernameChange,
  mediaState,
  onDevicePreviewChange,
  canJoin,
  isLoadingSession,
  onConnect,
  startTime,
  endTime,
  isAudio,
}) => {
  const [timeStart, setTimeStart] = useState<ITimeGap>(() => calculateTimeGap(startTime));
  const [timeEnd, setTimeEnd] = useState<ITimeGap>(() => calculateTimeGap(endTime));

  const endTimeFormatted = dayjs(endTime).format('DD-MMM-YYYY hh:mm A');

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeStart(calculateTimeGap(startTime));
      setTimeEnd(calculateTimeGap(endTime));
    }, 1000);

    return () => clearInterval(interval);
  }, [startTime]);

  return (
    <Card sx={{ mb: 3, maxWidth: 900, mx: 'auto' }}>
      <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
        <Typography variant='h6' component='h2' gutterBottom>
          Join Session
        </Typography>

        <Box sx={{ mb: 2 }}>
          <TextField
            fullWidth
            label='Username'
            value={username}
            onChange={onUsernameChange}
            placeholder='Enter your display name'
            required
            helperText='This will be your name in video and chat'
          />
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography variant='subtitle1' sx={{ mb: 1, fontWeight: 600 }}>
            Device Check
          </Typography>
          <DevicePreview
            initialAudioOn={mediaState.hasAudio}
            initialVideoOn={mediaState.hasVideo}
            onChange={onDevicePreviewChange}
            isAudio={isAudio}
          />
          <Typography variant='caption' color='text.secondary' sx={{ mt: 1, display: 'block' }}>
            Toggle mic/camera here before joining. Preferences apply when the meeting starts.
          </Typography>
        </Box>

        {!timeStart.isPast && (
          <Box sx={{ mb: 2 }}>
            <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
              Session starts in {timeStart.formatted}
            </div>
          </Box>
        )}

        {timeEnd.isPast && (
          <Box sx={{ mb: 2 }}>
            <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
              Session ended on {endTimeFormatted}
            </div>
          </Box>
        )}
        {!timeEnd.isPast && (
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              variant='contained'
              color='success'
              disabled={!canJoin || isLoadingSession || !timeStart.isPast}
              onClick={onConnect}
              sx={{ textTransform: 'none', minWidth: 160 }}
            >
              {isLoadingSession ? 'Connecting...' : 'Start Meeting'}
            </Button>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};
