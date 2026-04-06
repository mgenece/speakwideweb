import { cmsDataApi } from '@/api/functions/cms.api';
import Wrapper from '@/layout/wrapper/Wrapper';
import { Alert, Box, CircularProgress, Container, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';

function Terms() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['terms-conditions'],
    queryFn: () => cmsDataApi({ slug: 'subscription-terms-condition' }),
  });

  if (isLoading) {
    return (
      <Container maxWidth='md'>
        <Box py={6} display='flex' justifyContent='center'>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (isError) {
    return (
      <Container maxWidth='md'>
        <Box py={6}>
          <Alert severity='error'>Failed to load terms: {(error as Error)?.message}</Alert>
        </Box>
      </Container>
    );
  }

  const terms = data?.data;

  return (
    <Wrapper isFixedHeader>
      <Container maxWidth='md'>
        <Box py={16}>
          <Box sx={{ display: 'flex', justifyContent: 'center', pb: 6 }}>
            <Typography variant='h3' component='h1' gutterBottom>
              {terms?.title}
            </Typography>
          </Box>

          <Box
            sx={{
              '& p': { mb: 2 },
            }}
            dangerouslySetInnerHTML={{ __html: terms?.content ?? '' }}
          />
        </Box>
      </Container>
    </Wrapper>
  );
}

export default Terms;
