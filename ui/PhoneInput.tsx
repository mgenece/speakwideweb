import 'react-international-phone/style.css';

import {
  BaseTextFieldProps,
  Box,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  styled,
  TextField,
  Typography,
} from '@mui/material';
import React from 'react';
import {
  CountryIso2,
  defaultCountries,
  FlagImage,
  parseCountry,
  usePhoneInput,
} from 'react-international-phone';

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

export interface PhoneInputProps extends BaseTextFieldProps {
  value: string;
  onChange: (phone: string) => void;
  defaultCountry?: CountryIso2;
  labelName?: string;
  endAdornment?: React.ReactNode;
}

export const PhoneInputCommon: React.FC<PhoneInputProps> = ({
  value,
  onChange,
  labelName,
  endAdornment,
  defaultCountry = 'us',
  ...restProps
}) => {
  const { inputValue, handlePhoneValueChange, inputRef, country, setCountry } = usePhoneInput({
    defaultCountry,
    value,
    countries: defaultCountries,
    onChange: data => {
      onChange(data.phone);
    },
  });

  return (
    <InputWrap>
      {labelName && <InputLabel>{labelName}</InputLabel>}

      <TextField
        variant='outlined'
        // label='Phone number'
        color='primary'
        placeholder='Phone number'
        value={inputValue}
        onChange={handlePhoneValueChange}
        type='tel'
        inputRef={inputRef}
        InputProps={{
          startAdornment: (
            <InputAdornment position='start' style={{ marginRight: '2px', marginLeft: '-8px' }}>
              <Select
                MenuProps={{
                  PaperProps: {
                    className: 'country-dropdow',
                  },
                  style: {
                    height: '300px',
                    width: '360px',
                    top: '10px',
                    left: '-34px',
                  },
                  transformOrigin: {
                    vertical: 'top',
                    horizontal: 'left',
                  },
                }}
                sx={{
                  width: 'max-content',
                  fieldset: {
                    display: 'none',
                  },
                  '&.Mui-focused:has(div[aria-expanded="false"])': {
                    fieldset: {
                      display: 'block',
                    },
                  },
                  '&.MuiInputBase-root': {
                    border: 'none',
                    padding: '0px',
                  },
                  '.MuiSelect-select': {
                    padding: '0px',
                    paddingRight: '24px !important',
                  },
                  svg: {
                    right: 0,
                  },
                }}
                value={country.iso2}
                onChange={e => setCountry(e.target.value as CountryIso2)}
                renderValue={value => <FlagImage iso2={value} style={{ display: 'flex' }} />}
              >
                {defaultCountries.map(c => {
                  const country = parseCountry(c);
                  return (
                    <MenuItem key={country.iso2} value={country.iso2}>
                      <FlagImage iso2={country.iso2} style={{ marginRight: '8px' }} />
                      <Typography marginRight='8px'>{country.name}</Typography>
                      <Typography color='gray'>+{country.dialCode}</Typography>
                    </MenuItem>
                  );
                })}
              </Select>
            </InputAdornment>
          ),

          endAdornment: endAdornment && (
            <InputAdornment position='end'>{endAdornment}</InputAdornment>
          ),
        }}
        {...restProps}
      />
    </InputWrap>
  );
};
