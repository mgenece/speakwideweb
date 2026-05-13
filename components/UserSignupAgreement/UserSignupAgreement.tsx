import { sanitizeHtml } from '@/lib/sanitize';
import { InterpreterSignupAgrementWrapper } from '@/styles/StyledComponents/InterpreterSignupAgrementWrapper';
import CheckBoxEmptyIcon from '@/ui/Icons/CheckBoxEmptyIcon';
import CheckedIconCheckBox from '@/ui/Icons/CheckedIconCheckBox';
import CrossIcon2 from '@/ui/Icons/CrossIcon2';
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  IconButton,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import Link from 'next/link';
import { useState } from 'react';

export interface IUserAgreementProps {
  handleClose: () => void;
  handleContinue: () => void;
  content?: string;
}

function UserSignupAgreement({ handleClose, handleContinue, content }: IUserAgreementProps) {
  const theme = useTheme();
  const [isChecked, setIsChecked] = useState(false);

  return (
    <InterpreterSignupAgrementWrapper direction='column'>
      <Stack
        direction='row'
        gap={1}
        justifyContent='space-between'
        alignItems='center'
        px={{ lg: '26px', sm: '15px', xs: '10px' }}
        py={{ lg: '22px', sm: '15px', xs: '10px' }}
        borderBottom={`1px solid ${theme.palette.customColors.colore8e8e8}`}
      >
        <Typography variant='body1' fontWeight={600} fontSize={{ md: '20px', xs: '16px' }}>
          User Agreement
        </Typography>
        <IconButton
          onClick={handleClose}
          sx={{
            color: theme.palette.text.primary,
            border: `1px solid ${theme.palette.text.primary}`,
            borderRadius: '50%',
            padding: '7px',
          }}
        >
          <CrossIcon2 IconColor='currentColor' />
        </IconButton>
      </Stack>
      <Box
        className='termsTextWrapper'
        px={{ lg: '26px', sm: '15px', xs: '10px' }}
        pt={{ lg: '17px', sm: '12px', xs: '8px' }}
        maxHeight={'calc(100svh - 200px)'}
        overflow='auto'
      >
        {content ? (
          <Typography
            className='termsText'
            component={'div'}
            dangerouslySetInnerHTML={{ __html: sanitizeHtml(content) }}
          ></Typography>
        ) : (
          <></>
        )}
      </Box>
      <Stack
        direction='row'
        alignItems='center'
        justifyContent='space-between'
        px={{ lg: '26px', sm: '15px', xs: '10px' }}
        py={{ lg: '19px', sm: '12px', xs: '8px' }}
      >
        <FormControlLabel
          className='checkbox'
          control={
            <Checkbox
              value={isChecked}
              onChange={() => {
                setIsChecked(prev => !prev);
              }}
              icon={<CheckBoxEmptyIcon IconHeight='16' IconWidth='16' />}
              checkedIcon={<CheckedIconCheckBox />}
            />
          }
          label={
            <Typography
              variant='caption'
              sx={{
                a: {
                  color: 'inherit',
                  fontWeight: '700',
                  textDecoration: 'underline',
                  transition: 'all .3s ease',
                  '&:hover': {
                    textDecoration: 'underline',
                    color: theme.palette.customColors.lightPurple,
                  },
                },
              }}
            >
              I agree the{' '}
              <Link href='/terms' target='_blank'>
                Terms of Services
              </Link>{' '}
              &nbsp; & &nbsp;
              <Link href='/privacy' target='_blank'>
                Privacy Policy
              </Link>{' '}
              of the website
            </Typography>
          }
        />
        <Button
          sx={{
            textTransform: 'none',
            minWidth: { lg: '192px !important', md: '142px !important', xs: 'auto !important' },
            borderRadius: '10px',
            minHeight: { md: '50px !important', xs: 'auto !important' },
            padding: '8px 15px !important',
          }}
          variant='contained'
          // disabled={!isChecked}
          onClick={() => handleContinue()}
        >
          Continue
        </Button>
      </Stack>
    </InterpreterSignupAgrementWrapper>
  );
}

export default UserSignupAgreement;
