import { Box, CircularProgress } from '@mui/material';

function LoaderCommon() {
  return (
    <Box
      height={'100vh'}
      width={'100vw'}
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
    >
      <CircularProgress />
    </Box>
  );
}

export default LoaderCommon;
