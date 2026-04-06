// DisputeCategory.tsx
import { disputeCategoryListApi } from '@/api/functions/dispute.api';
import CheckBoxEmptyIcon from '@/ui/Icons/CheckBoxEmptyIcon';
import CheckedIconCheckBox from '@/ui/Icons/CheckedIconCheckBox';
import { Checkbox, FormControlLabel, Stack } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import React from 'react';

interface DisputeCategoryProps {
  value: string[]; // selected _id array
  onChange: (ids: string[]) => void;
  className?: string;
  type: 'client' | 'interpreter';
}

const DisputeCategory: React.FC<DisputeCategoryProps> = ({
  value = [],
  onChange,
  className,
  type,
}) => {
  const { data } = useQuery({
    queryKey: ['dispute-category-list', type],
    queryFn: () => disputeCategoryListApi(type),
    enabled: !!type,
  });

  const categoryList = data?.data || [];

  const handleToggle = (id: string) => {
    if (value.includes(id)) {
      onChange(value.filter(x => x !== id));
    } else {
      onChange([...value, id]);
    }
  };

  return (
    <Stack
      direction='row'
      alignItems='center'
      className={className ?? 'checkbox-group'}
      rowGap={{ xs: '19px' }}
      columnGap={{ xs: '29px' }}
      flexWrap='wrap'
    >
      {categoryList.map((item: any) => (
        <FormControlLabel
          key={item._id}
          className='checkbox-cls'
          control={
            <Checkbox
              checked={value.includes(item._id)}
              onChange={() => handleToggle(item._id)}
              icon={<CheckBoxEmptyIcon IconWidth='17' IconHeight='17' />}
              checkedIcon={<CheckedIconCheckBox IconWidth='17' IconHeight='17' />}
            />
          }
          label={item.title}
        />
      ))}
    </Stack>
  );
};

export default DisputeCategory;
