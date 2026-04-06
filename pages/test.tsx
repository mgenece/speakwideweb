import { Box, Button } from '@mui/material';

function Index() {
  const handleRedirect = () => {
    window.location.href = 'https://speakwide-fe.dedicateddevelopers.us/app/login';
  };

  return (
    <Box>
      {/* <LocationPicker
        // inputLabel='Pick a location'
        height={200}
        onLocationChange={data => {
          console.log(data, '***');
        }}
      /> */}
      <Button variant='contained' onClick={handleRedirect}>
        test app
      </Button>
    </Box>
  );
}

export default Index;
