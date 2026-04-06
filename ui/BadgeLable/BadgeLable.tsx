import { Stack, StackProps, Typography, useTheme } from '@mui/material';

export interface IBadgeLableProps extends StackProps {
  lable?: string | number;
}

function BadgeLable({ lable, ...props }: IBadgeLableProps) {
  const theme = useTheme();
  return (
    <Stack
      {...props}
      direction='column'
      alignItems='center'
      justifyContent='center'
      borderRadius={2}
      bgcolor={theme.palette.common.white}
      minWidth={{ lg: '30px', md: '25px', xs: '22px' }}
      minHeight={{ lg: '30px', md: '25px', xs: '22px' }}
      color={theme.palette.text.primary}
      fontWeight={400}
      lineHeight={1.1}
      fontSize={{ md: '16px', xs: '14px' }}
      p={0.6}
      maxWidth='max-content'
    >
      <Typography
        sx={{
          color: 'inherit',
          fontFamily: 'inherit',
          lineHeight: 'inherit',
          fontSize: 'inherit',
          fontWeight: 'inherit',
        }}
      >
        {lable}
      </Typography>
    </Stack>
  );
}

export default BadgeLable;
