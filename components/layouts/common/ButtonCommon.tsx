// src/ui/CommonButton/ButtonCommon.tsx

import { Button, ButtonProps, CircularProgress } from '@mui/material';
import React from 'react';

interface ButtonCommonProps extends ButtonProps {
  isLoading?: boolean;
}

const ButtonCommon: React.FC<ButtonCommonProps> = ({
  isLoading = false,
  children,
  disabled,
  ...rest
}) => {
  return (
    <Button {...rest} disabled={isLoading || disabled}>
      {isLoading ? (
        <>
          <CircularProgress size={20} color='inherit' sx={{ mr: 1 }} />
        </>
      ) : (
        children
      )}
    </Button>
  );
};

export default ButtonCommon;
