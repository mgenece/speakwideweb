// components/DevicePreview.tsx
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import VideocamIcon from '@mui/icons-material/Videocam';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';
import { Box, Button, Stack, Typography } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';

export interface DevicePreviewState {
  audioOn: boolean;
  videoOn: boolean;
}

interface DevicePreviewProps {
  initialAudioOn?: boolean;
  initialVideoOn?: boolean;
  onChange?: (state: DevicePreviewState) => void;
  videoHeight?: number | string;
  isAudio: boolean;
}

const DevicePreview: React.FC<DevicePreviewProps> = ({
  initialAudioOn = true,
  initialVideoOn = true,
  onChange,
  videoHeight = 'auto',
  isAudio,
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const [audioOn, setAudioOn] = useState(initialAudioOn);
  const [videoOn, setVideoOn] = useState(initialVideoOn);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    let mounted = true;
    const start = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true, // always request, then toggle track.enabled
          video: true,
        });
        if (!mounted) return;
        streamRef.current = stream;

        // apply current toggles
        stream.getAudioTracks().forEach(t => (t.enabled = audioOn));
        stream.getVideoTracks().forEach(t => (t.enabled = videoOn));

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play().catch(() => {});
        }
      } catch (err: any) {
        if (!mounted) return;
        setError(err?.message || 'Failed to access camera/microphone');
      }
    };
    start();

    return () => {
      mounted = false;
      streamRef.current?.getTracks().forEach(t => t.stop());
      streamRef.current = null;
    };
  }, []); // one-time init

  useEffect(() => {
    onChange?.({ audioOn, videoOn });
    const s = streamRef.current;
    if (s) {
      s.getAudioTracks().forEach(t => (t.enabled = audioOn));
      s.getVideoTracks().forEach(t => (t.enabled = videoOn));
    }
  }, [audioOn, videoOn, onChange]);

  return (
    <Box sx={{ width: '100%' }}>
      <Box
        sx={{
          width: '100%',
          aspectRatio: '16/9',
          backgroundColor: 'grey.900',
          borderRadius: 2,
          overflow: 'hidden',
          mb: 1.5,
        }}
      >
        <video
          ref={videoRef}
          muted
          playsInline
          style={{ width: '100%', height: videoHeight, objectFit: 'cover' }}
        />
      </Box>

      {error ? (
        <Typography variant='body2' color='error'>
          {error}
        </Typography>
      ) : (
        <Stack direction='row' spacing={1}>
          <Button
            variant='contained'
            color={audioOn ? 'success' : 'error'}
            startIcon={audioOn ? <MicIcon /> : <MicOffIcon />}
            onClick={() => setAudioOn(a => !a)}
            sx={{ textTransform: 'none' }}
          >
            {audioOn ? 'Mic On' : 'Mic Off'}
          </Button>
          <Button
            variant='contained'
            color={videoOn ? 'success' : 'error'}
            disabled={isAudio}
            startIcon={videoOn ? <VideocamIcon /> : <VideocamOffIcon />}
            onClick={() => setVideoOn(v => !v)}
            sx={{ textTransform: 'none' }}
          >
            {videoOn ? 'Camera On' : 'Camera Off'}
          </Button>
        </Stack>
      )}
    </Box>
  );
};

export default DevicePreview;
