import assest from '@/json/assest';
import { BankAccountDetailsModalContentWrap } from '@/styles/StyledComponents/BankAccountDetailsModalContentWrap';
import ArrowrightIcon2 from '@/ui/Icons/ArrowrightIcon2';
import BinIcon2 from '@/ui/Icons/BinIcon2';
import RadioCheckedIcon from '@/ui/Icons/RadioCheckedIcon';
import RadioUncheckIcon from '@/ui/Icons/RadioUncheckIcon';
import { Box, Button, Chip, FormControlLabel, Radio, Stack, Typography } from '@mui/material';
import Image from 'next/image';

const BankAccountDetailsModalContent = () => {
  return (
    <BankAccountDetailsModalContentWrap>
      <Box className='top-box'>
        <Stack
          direction={{ sm: 'row', xs: 'column' }}
          alignItems={{ sm: 'center', xs: 'flex-start' }}
          gap={{ sm: 0, xs: '10px' }}
          flexWrap={'wrap'}
          justifyContent={'space-between'}
        >
          <Box>
            <figure className='logo-fig'>
              <Image src={assest.CIBCLogo} width={65} height={15} alt='bank-logo' />
            </figure>
            <Typography variant='body2' className='bank-name'>
              Canadian Impe... -6545
            </Typography>
          </Box>
          <Chip label='Canadian Imperial Bank of Commerce' className='chip-cls' />
        </Stack>
        <Box sx={{ mt: { sm: '30px', xs: '15px' } }}>
          <Typography variant='body2'>
            Bank Routing Number:{' '}
            <Typography component={'span'} variant='body2' sx={{ pl: '30px' }}>
              0123456789
            </Typography>
          </Typography>
        </Box>
      </Box>
      <Box className='bottom-box'>
        <FormControlLabel
          value={'1'}
          control={<Radio icon={<RadioUncheckIcon />} checkedIcon={<RadioCheckedIcon />} />}
          label={'Set as primary'}
          className='radio-class'
        />

        <Button
          disableRipple
          aria-label='remove-button'
          startIcon={<BinIcon2 />}
          endIcon={<ArrowrightIcon2 />}
          className='remove-button'
        >
          Remove Bank Account
        </Button>
        <Button disableRipple aria-label='edit-button' className='edit-button'>
          Edit Bank Info
        </Button>
      </Box>
    </BankAccountDetailsModalContentWrap>
  );
};

export default BankAccountDetailsModalContent;
