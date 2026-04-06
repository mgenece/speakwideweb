import {
  Autocomplete,
  AutocompleteRenderOptionState,
  Box,
  InputAdornment,
  Paper,
  TextField,
  styled,
} from '@mui/material';
import React, { ElementRef, HTMLAttributes, useEffect, useRef, useState } from 'react';
import AutoDropIcon from '../Icons/AutoDropIcon';
import SearchIconSmall from '../Icons/SearchIconSmall';

interface IOptionType {
  value: string;
  label: string;
}

interface ICommonAutocompleteProps {
  label: string;
  options: IOptionType[];
  onSelect?: (data: IOptionType | null) => void;
  value?: IOptionType | null;
}

const CommonAutocompleteWrap = styled(Box)`
  .MuiInputBase-root {
    background-color: ${({ theme }) => theme.palette.grey[50]};
    border-radius: 10px;
    min-height: 50px;
    padding: 12px 20px !important;
    border: 1px solid ${({ theme }) => theme.palette.customColors?.inputBorder};

    fieldset {
      display: none;
    }

    input {
      padding: 0 !important;
    }
  }

  .MuiAutocomplete-endAdornment {
    right: 15px !important;
  }

  .MuiAutocomplete-paper {
    border-radius: 12px;
    max-height: 280px;
    overflow: hidden;
  }

  .MuiAutocomplete-listbox {
    max-height: 200px;
    overflow-y: auto;
    padding: 0;
  }
`;

const SearchPaper = styled(Paper)`
  background: ${({ theme }) => theme.palette.common.white};
  box-shadow:
    0px 0px 4px rgb(229, 221, 247),
    0px 88px 35px rgba(121, 123, 160, 0.01),
    0px 50px 30px rgba(121, 123, 160, 0.05),
    0px 22px 22px rgba(121, 123, 160, 0.09),
    0px 6px 12px rgba(121, 123, 160, 0.1);
  border-radius: 10px !important;
  margin-top: 10px;

  .search-container {
    padding: 10px 15px 10px;
    background: white;
    position: sticky;
    top: 0;
    z-index: 1;
  }

  .search-input {
    .MuiInputBase-root {
      background: rgb(251, 251, 251);
      border-radius: 10.3548px;
      border: none;
      fieldset {
        display: none;
      }

      input {
        padding: 0 !important;
        font-size: 14px;
      }
    }
  }
  li {
    padding: 8px 18px !important;
    font-size: 13px;
  }
`;

const CustomPaper = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof Paper> & {
    searchText: string;
    onSearchChange: (value: string) => void;
  }
>((props, ref) => {
  const { searchText, onSearchChange, children, ...paperProps } = props;

  return (
    <SearchPaper ref={ref} {...paperProps}>
      <Box className='search-container'>
        <TextField
          className='search-input'
          fullWidth
          placeholder='Search'
          value={searchText}
          onChange={e => onSearchChange(e.target.value)}
          size='small'
          variant='outlined'
          autoFocus
          onMouseDown={e => e.stopPropagation()}
          onClick={e => e.stopPropagation()}
          onKeyDown={e => e.stopPropagation()}
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <SearchIconSmall />
              </InputAdornment>
            ),
          }}
        />
      </Box>
      {children}
    </SearchPaper>
  );
});

const CommonAutocomplete = ({ label, options, onSelect, value }: ICommonAutocompleteProps) => {
  const [searchText, setSearchText] = useState('');
  const [selectedValue, setSelectedValue] = useState<IOptionType | null>(null);
  const [open, setOpen] = useState(false);
  const customPaperRef = useRef<ElementRef<typeof Paper>>(null);

  // outside click
  const handleClickOutside = (event: MouseEvent) => {
    if (customPaperRef.current && !customPaperRef.current.contains(event.target as Node)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [customPaperRef.current]);

  useEffect(() => {
    if (value) {
      setSelectedValue(value);
    } else {
      setSelectedValue(null);
    }
  }, [value]);

  const filteredOptions = options.filter(item =>
    item.label.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <CommonAutocompleteWrap className='commonAutocomplete'>
      <Autocomplete<IOptionType>
        open={open}
        onOpen={() => setOpen(true)}
        onClose={(_, reason) => {
          if (reason === 'blur') {
            // ignore blur from clicking inside the custom search
            return;
          }
          setOpen(false);
        }}
        value={selectedValue}
        disablePortal
        onChange={(_, newValue) => {
          setSelectedValue(newValue);
          setOpen(false);
          onSelect?.(newValue);
        }}
        popupIcon={<AutoDropIcon />}
        options={filteredOptions}
        getOptionLabel={option => option.label}
        filterOptions={x => x} // we filter manually
        PaperComponent={paperProps => (
          <CustomPaper
            {...paperProps}
            searchText={searchText}
            ref={customPaperRef}
            onSearchChange={setSearchText}
          />
        )}
        renderInput={params => (
          <TextField
            {...params}
            placeholder={label}
            variant='standard'
            InputProps={{
              ...params.InputProps,
              disableUnderline: true,
            }}
          />
        )}
        renderOption={(
          props: HTMLAttributes<HTMLLIElement>,
          option: IOptionType,
          _state: AutocompleteRenderOptionState
        ) => (
          <li {...props} style={{ padding: '8px 15px', fontSize: '14px' }}>
            {option.label}
          </li>
        )}
        ListboxProps={{
          style: {
            paddingTop: 0,
          },
        }}
      />
    </CommonAutocompleteWrap>
  );
};

export default CommonAutocomplete;
