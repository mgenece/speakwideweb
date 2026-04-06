import { AddBankAccountModalContentWrap } from '@/styles/StyledComponents/AddBankAccountModalContentWrap';
import InputFieldCommon from '@/ui/CommonInput/CommonInput';
import CustomButtonPrimary from '@/ui/CustomButtons/CustomButtonPrimary';
import CustomSelect from '@/ui/CustomSelect/CustomSelect';
import { Box, Grid2, InputLabel, MenuItem, Stack } from '@mui/material';
import { useState } from 'react';

const AddBankAccountModalContent = ({ onClose }: { onClose?: () => void }) => {
  const [formData, setFormData] = useState({
    bankName: 'USA United Bank', // default to first option
    accountNumber: '1234 1234 2345 5564',
    routingNumber: '123456789',
  });
  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };
  return (
    <AddBankAccountModalContentWrap>
      <Grid2 container spacing={2}>
        <Grid2 size={{ xs: 12 }}>
          <Box className='eachInputBox'>
            <InputLabel className='label-class'>Bank Name</InputLabel>
            <CustomSelect
              value={formData.bankName}
              onChange={e => handleChange('bankName', e.target.value as string)}
            >
              <MenuItem value='USA United Bank'>USA United Bank</MenuItem>
              <MenuItem value='demo 1'>demo 1</MenuItem>
            </CustomSelect>
          </Box>
        </Grid2>
        <Grid2 size={{ xs: 12 }}>
          <Box className='eachInputBox'>
            <InputLabel className='label-class'>Bank Account Number</InputLabel>
            <InputFieldCommon
              placeholder='Enter here'
              value={formData.accountNumber}
              onChange={e => handleChange('accountNumber', e.target.value)}
            />
          </Box>
        </Grid2>
        <Grid2 size={{ xs: 12 }}>
          <Box className='eachInputBox'>
            <InputLabel className='label-class'>Bank Routing Number</InputLabel>
            <InputFieldCommon
              placeholder='Enter here'
              value={formData.routingNumber}
              onChange={e => handleChange('routingNumber', e.target.value)}
            />
          </Box>
        </Grid2>
        <Grid2 size={{ xs: 12 }}>
          <Box className='eachInputBox'>
            <InputLabel className='label-class'>
              Add a note <span>(Optional)</span>
            </InputLabel>
            <InputFieldCommon className='input-field' multiline rows={7} />
          </Box>
        </Grid2>
        <Grid2 size={{ xs: 12 }}>
          <Stack direction={'row'} justifyContent={'center'}>
            <CustomButtonPrimary
              className='primary-gradiant-btn submit-btn'
              aria-label='Submit'
              onClick={onClose}
            >
              Submit
            </CustomButtonPrimary>
          </Stack>
        </Grid2>
      </Grid2>
    </AddBankAccountModalContentWrap>
  );
};

export default AddBankAccountModalContent;
