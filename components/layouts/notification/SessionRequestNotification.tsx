'use client';

import { Button, Card, CardContent, Stack, Typography, useTheme } from '@mui/material';

interface IProps {
  title?: string;
  body?: string;
  onClick?: () => void;
}

function SessionRequestNotification({ title, body, onClick }: IProps) {
  const theme = useTheme();

  return (
    <Card
      elevation={2}
      sx={{
        width: 280,
        borderRadius: 2,
        p: 0.5,
        backgroundColor: theme.palette.background.default, // match app bg
        borderLeft: `4px solid ${theme.palette.primary.main}`, // visual cue
        boxShadow: theme.shadows[3],
      }}
    >
      <CardContent sx={{ p: 1.5, '&:last-child': { pb: 1.5 } }}>
        <Stack spacing={0.75}>
          <Typography
            variant='subtitle2'
            fontWeight={600}
            color='text.primary'
            sx={{ fontSize: '0.85rem', lineHeight: 1.3 }}
          >
            {title || 'New Session Request'}
          </Typography>

          <Typography
            variant='body2'
            color='text.secondary'
            sx={{
              fontSize: '0.75rem',
              lineHeight: 1.3,
              mb: 0.5,
              display: '-webkit-box',
              overflow: 'hidden',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: 2,
            }}
          >
            {body || 'You have a new session request waiting.'}
          </Typography>

          <Button
            variant='contained'
            color='primary'
            size='small'
            onClick={e => {
              e.stopPropagation();
              onClick?.();
            }}
            sx={{
              alignSelf: 'flex-start',
              textTransform: 'none',
              fontSize: '0.7rem',
              px: 1.2,
              py: 0.3,
              borderRadius: 1,
              minWidth: 'auto',
              boxShadow: 'none',
            }}
          >
            View
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default SessionRequestNotification;
