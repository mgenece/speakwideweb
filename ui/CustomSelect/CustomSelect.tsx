import { FormControl, IconButton, MenuItem, styled, Typography } from '@mui/material';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select, { SelectChangeEvent, SelectProps } from '@mui/material/Select';
import { useState } from 'react';
import SellectDownIcon from '../Icons/SellectDownIcon';

const CustomSelectWrapper = styled(Select, {
  shouldForwardProp: data => data !== 'labalName',
})<{ labelName?: boolean }>`
  background-color: ${({ theme }) => theme.palette.grey[50]};
  border: 1px solid ${({ theme }) => theme.palette.customColors?.inputBorder};
  border-radius: 10px;
  min-height: 50px;
  padding: 12px 20px;
  @media (max-width: 599px) {
    padding: 8px 16px;
    min-height: 45px;
  }

  &.MuiInputBase-root {
    .MuiOutlinedInput-notchedOutline {
      display: none;
    }
    svg {
      margin-right: 10px;
      flex-shrink: 0;
    }
    .MuiSelect-select {
      font-size: 16px;
      color: ${({ theme }) => theme.palette.customColors?.dark};
      padding: 0;
      min-height: auto;
      @media (max-width: 1199px) {
        font-size: 16px;
      }
      /* @media (max-width: 599px) {
        padding: 12px 16px;
      } */
      .intValue {
        color: ${({ theme }) => theme.palette.customColors?.placeText};
        font-size: 16px;
        font-weight: 400;
      }
    }
    .MuiIconButton-root {
      padding: 0;
      right: 16px;
      top: 50%;
      transform: translateY(-50%);
    }
  }
  .intValue {
    color: ${({ theme }) => theme.palette.customColors?.dark};
    font-size: 14px;
    font-weight: 400;
  }
  .MuiIconButton-root {
    svg {
      margin: 0 !important;
    }
  }
  &.language-select {
    position: relative;
    .intValue {
      color: ${({ theme }) => theme.palette.common.black};
    }
    .language-icon {
      position: absolute;
      left: 2px;
      width: 54px;
      height: 54px;
      border-radius: 50%;
      background-color: ${({ theme }) => theme.palette.grey[50]};
      display: flex;
      align-items: center;
      justify-content: center;
      @media (max-width: 599px) {
        width: 40px;
        height: 40px;
      }
      svg {
        margin: 0;
        @media (max-width: 599px) {
          width: 28px;
          height: 28px;
        }
      }
    }
    .MuiSelect-select {
      padding-left: 50px !important;
      @media (max-width: 599px) {
        padding-left: 40px !important;
      }
      .intValue {
        color: ${({ theme }) => theme.palette.common.black};
      }
    }
  }
`;

interface ICustomSelectProps {
  initialvalue?: React.ReactNode | string;
  labelName?: string;
  className?: string;
  iconButton?: React.ReactNode;
  isFill?: boolean;
  noFullWidth?: boolean;
  errorText?: string;
}

const CustomSelect: React.FC<ICustomSelectProps & SelectProps> = ({
  className,
  iconButton,
  initialvalue,
  labelName,
  noFullWidth,
  errorText,
  ...props
}) => {
  const MenuProps = {
    PaperProps: {
      className: `customPaperSelect ${className}`,
      style: {
        maxHeight: 200,
        overflowY: 'auto' as const,
        // filter: 'none',
        // boxShadow: '0px 4px 23px 0px #0000000a',
      },
    },
  };

  const [value, setValue] = useState('');

  const handleChange = (event: SelectChangeEvent<unknown>) => {
    setValue(event.target.value as string);
  };

  return (
    <FormControl fullWidth={!noFullWidth}>
      {labelName && (
        <Typography className='label-txt' sx={{ fontSize: '16px', fontWeight: '500', pb: '6px' }}>
          {labelName}
        </Typography>
      )}
      <CustomSelectWrapper
        labelId='select-label'
        id='select-custom'
        displayEmpty
        labelName={!!labelName}
        input={<OutlinedInput />}
        value={value}
        onChange={handleChange}
        IconComponent={props => {
          return <IconButton {...props}>{iconButton || <SellectDownIcon />}</IconButton>;
        }}
        MenuProps={MenuProps}
        inputProps={{ 'aria-label': 'Without label' }}
        className={className}
        {...props}
      >
        <MenuItem value='' sx={{ display: 'none' }}>
          <Typography variant='caption' className='intValue'>
            {initialvalue}
          </Typography>
        </MenuItem>
        {props.children}
      </CustomSelectWrapper>
      {Boolean(errorText) && (
        <p style={{ color: 'red', fontSize: '14px', marginInlineStart: '14px' }}>{errorText}</p>
      )}
    </FormControl>
  );
};

export default CustomSelect;
