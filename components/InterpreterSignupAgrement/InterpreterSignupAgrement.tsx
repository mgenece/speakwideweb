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

export interface IinterpreterAgrementProps {
  handleClose: () => void;
  handleContinue: () => void;
  content?: string;
}

// const potterIpsum = `
//   <p>Potter ipsum wand elf parchment wingardium. Trelawney 12 fire-whisky horn tonight elf phials. Red train dittany trace got. Parchment kidney knew mischief patronum. Lady trace holly swiveling cadogan bat hearing filch krum points. No plums professor bag of.</p>

//   <p>Potter ipsum wand elf parchment wingardium. Brass banquet lily last horseless dress elf. Troll totalus ludo nearly-headless the. Half-blood fire-whisky pie you’ve beaters releases granger peruvian-night-powder die banana. Cupboard hungarian prefect’s dervish robes potion shrieking cabinet diddykins. That chance letters yaxley fell. Spew armchairs wand trace palominos minister stan silver parchment owl. Mischief willow silver gringotts kidney turns. Captivity scabbers basilisk half-moon-glasses unwilling. Thestral plums dragon-scale quidditch lavender cars knickerbocker.</p>

//   <p>Erised azkaban locket carriages now train expecto deluminator leprechaun spider. Fire telescope diddykins owl every avada beuxbatons letters. Horn knickerbocker sorcerer's bat diddykins duel. Magic black seeker my holly boy willow crookshanks teacup floo. Gillyweed crush fire floo would emporium phials head together. Devil’s armchairs cabinet which them nick not. Out errol parchment broken emporium bean ollivanders seven. Lemon through pumpkin dog holyhead black glasses knew. Bedroom creature tears gargoyles gnomes locomotor slytherin’s bonnet hair. Trelawney petrified expecto above treats leg holly. 50 elemental mudbloods animagus wand holyhead diadem ridgeback heir banges. Half-giant snare beuxbatons so cauldron.</p>
// `;

function InterpreterSignupAgrement({
  handleClose,
  handleContinue,
  content,
}: IinterpreterAgrementProps) {
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
          // className='primaryBtn'
          onClick={() => handleContinue()}
        >
          Continue
        </Button>
      </Stack>
    </InterpreterSignupAgrementWrapper>
  );
}

export default InterpreterSignupAgrement;
