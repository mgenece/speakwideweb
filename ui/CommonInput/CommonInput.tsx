import { Box, InputLabel, styled } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import TextField, { StandardTextFieldProps } from '@mui/material/TextField';
import React, { forwardRef, useCallback, useState } from 'react';
import PasswordNonVisibilityIcon from '../Icons/PasswordNonVisibilityIcon';
import PasswordVisibilityIcon from '../Icons/PasswordVisibilityIcon';

const InputWrap = styled(Box)`
  .MuiFormLabel-root {
    font-size: 16px;
    font-weight: 500;
    color: ${({ theme }) => theme.palette.text.primary};
    margin-bottom: 6px;
  }

  .MuiInputBase-root {
    background-color: ${({ theme }) => theme.palette.grey[50]};
    border-radius: 10px;
    min-height: 50px;
    padding: 12px 20px;
    border: 1px solid ${({ theme }) => theme.palette.customColors?.inputBorder};

    .MuiInputBase-input {
      font-size: 16px;
      color: ${({ theme }) => theme.palette.customColors?.dark};
      padding: 0;

      &::placeholder {
        color: ${({ theme }) => theme.palette.customColors?.placeText} !important;
        opacity: 1;
        -webkit-text-fill-color: ${({ theme }) => theme.palette.customColors?.placeText} !important;
      }

      &::-ms-input-placeholder {
        color: ${({ theme }) => theme.palette.customColors?.placeText} !important;
        opacity: 1;
        -webkit-text-fill-color: ${({ theme }) => theme.palette.customColors?.placeText} !important;
      }
    }

    .MuiInputAdornment-positionEnd {
      margin-left: 8px;
      .MuiIconButton-root {
        padding: 0;
      }
    }

    .MuiInputAdornment-positionStart {
      margin-right: 8px;
    }
  }

  fieldset {
    display: none;
  }
`;

type TInputFieldCommonProps = StandardTextFieldProps & {
  isPassword?: boolean;
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
  labelName?: string;
};

const InputFieldCommon = forwardRef<HTMLInputElement, TInputFieldCommonProps>(
  ({ isPassword = false, startAdornment, endAdornment, labelName, ...others }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = useCallback(() => {
      setShowPassword(prev => !prev);
    }, []);

    const handleMouseDownPassword = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
    }, []);

    return (
      <InputWrap>
        {labelName && <InputLabel>{labelName}</InputLabel>}
        <TextField
          fullWidth
          variant={others.variant ?? 'outlined'}
          type={isPassword ? (showPassword ? 'text' : 'password') : others?.type}
          slotProps={{
            input: {
              inputRef: ref,
              startAdornment: startAdornment && (
                <InputAdornment position='start'>{startAdornment}</InputAdornment>
              ),
              endAdornment: isPassword ? (
                <InputAdornment position='end' className='password-icon'>
                  <IconButton
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    disableRipple
                  >
                    {showPassword ? <PasswordVisibilityIcon /> : <PasswordNonVisibilityIcon />}
                  </IconButton>
                </InputAdornment>
              ) : (
                endAdornment && <InputAdornment position='end'>{endAdornment}</InputAdornment>
              ),
            },
          }}
          {...others}
        />
      </InputWrap>
    );
  }
);

export default InputFieldCommon;
