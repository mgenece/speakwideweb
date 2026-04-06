import { MuiModalWrapperStyled } from '@/styles/StyledComponents/MuiModalWrapperStyled';
import { DialogProps, IconButton, Stack, Typography } from '@mui/material';
import DialogContent from '@mui/material/DialogContent';
import ModalCrossIcon from '../Icons/ModalCrossIcon';

interface IMuiModalWrapperProps extends DialogProps {
  open: boolean;
  onClose?: () => void;
  scroll?: 'paper' | 'body';
  children?: React.JSX.Element | React.JSX.Element[];
  className?: string;
  noCloseBtn?: boolean;
  isWhiteBg?: boolean;
  hasRoundedCross?: boolean;
  heading?: string;
  isHeadingContainerWithTitle?: boolean;
  containerHeading?: string;
}

export default function MuiModalWrapper({
  open,
  onClose,
  scroll,
  children,
  className,
  isWhiteBg,
  heading,
  isHeadingContainerWithTitle,
  containerHeading,
  ...props
}: IMuiModalWrapperProps) {
  return (
    <MuiModalWrapperStyled
      {...props}
      className={`common-modal ${className} ${isWhiteBg ? 'white-bg-cls' : ''}`}
      open={open}
      onClose={onClose}
      scroll={scroll}
      aria-labelledby='responsive-dialog-title'
    >
      {isHeadingContainerWithTitle && (
        <Stack
          direction='row'
          alignItems='center'
          justifyContent='space-between'
          className='headingContainer'
        >
          <Typography className='containerHHeading'>{containerHeading}</Typography>
          <IconButton onClick={onClose}>
            <ModalCrossIcon />
          </IconButton>
        </Stack>
      )}
      {heading && <Typography className='heading'>{heading}</Typography>}
      <DialogContent>{children}</DialogContent>
    </MuiModalWrapperStyled>
  );
}
