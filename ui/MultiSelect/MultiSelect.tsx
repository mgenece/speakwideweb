import { MultiSelectWrapper } from '@/styles/StyledComponents/MultiSelectWrapper';
import { Autocomplete, AutocompleteProps, Chip } from '@mui/material';

type OptionType = {
  label: string;
  value: string;
};

type MultiSelectProps = Omit<AutocompleteProps<OptionType, true, true, true>, 'options'> & {
  options: OptionType[];
};

function MultiSelect({ options, defaultValue, renderInput, onChange, ...rest }: MultiSelectProps) {
  return (
    <MultiSelectWrapper>
      <Autocomplete
        className={`cmnautoComplete ${rest.className}`}
        multiple
        freeSolo
        options={options}
        defaultValue={defaultValue}
        getOptionLabel={option => {
          // Handle both string and object types for freeSolo functionality
          if (typeof option === 'string') return option;
          return option.label;
        }}
        isOptionEqualToValue={(option, value) => {
          // Handle comparison for both string and object types
          if (typeof option === 'string' && typeof value === 'string') {
            return option === value;
          }
          if (typeof option === 'object' && typeof value === 'object') {
            return option.value === value.value;
          }
          return false;
        }}
        renderTags={(value: readonly (string | OptionType)[], getTagProps) => {
          return value.map((option: string | OptionType, index: number) => {
            const label = typeof option === 'string' ? option : option.label;
            return (
              <Chip variant='outlined' label={label} {...getTagProps({ index })} key={index} />
            );
          });
        }}
        onChange={(event, newValue, reason, details) => {
          if (onChange) {
            onChange(event, newValue, reason, details);
          }
        }}
        renderInput={renderInput}
        {...rest}
      />
    </MultiSelectWrapper>
  );
}

export default MultiSelect;
