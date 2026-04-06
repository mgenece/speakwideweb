import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { Stack, Typography } from '@mui/material';
import toast from 'react-hot-toast';

export const showWarnToast = (message: string) => {
  toast.custom(t => (
    <Stack
      direction='row'
      alignItems='center'
      spacing={1.2}
      sx={{
        backgroundColor: '#ffffff', // subtle yellow
        color: '#8a6d3b',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1), 0 1px 3px rgba(0,0,0,0.08)',
        px: 2,
        py: 1.2,
        minWidth: 300,
        fontFamily: '"Inter", "Roboto", "Helvetica Neue", Helvetica, Arial, sans-serif',
        border: '1px solid #ffecb3',
        transition: 'all 0.3s ease',
        opacity: t.visible ? 1 : 0,
        transform: t.visible ? 'translateY(0px)' : 'translateY(-10px)',
      }}
    >
      <WarningAmberIcon sx={{ color: '#f59e0b', fontSize: 22 }} />
      <Typography
        variant='body2'
        fontWeight={500}
        sx={{
          lineHeight: 1.5,
          fontSize: 14,
        }}
      >
        {message}
      </Typography>
    </Stack>
  ));
};
