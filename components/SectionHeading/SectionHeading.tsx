import { SectionHeadingStyled } from '@/styles/StyledComponents/SectionHeadingStyled';
import { Box } from '@mui/material';
import React from 'react';

interface SectionHeadingInterface {
  children: React.ReactNode;
}
function SectionHeading({ children }: SectionHeadingInterface) {
  return (
    <SectionHeadingStyled>
      <Box className='headingWrapperSec'>{children}</Box>
    </SectionHeadingStyled>
  );
}

export default SectionHeading;
