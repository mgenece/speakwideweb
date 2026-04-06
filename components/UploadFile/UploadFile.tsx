import { UploadFileStyled } from '@/styles/StyledComponents/UploadFileStyled';
import UploadIcon from '@/ui/Icons/UploadIcon';
import { BoxProps, Button, styled, Typography } from '@mui/material';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export interface IUploadFile extends BoxProps {
  supportedFileText?: string;
  fileIcon?: React.ReactNode;
  buttonText?: string;
  multiple?: boolean;
  accept?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function UploadFile({
  supportedFileText = 'PNG, JPG, JPEG file supported (max file size 50MB)',
  fileIcon = <UploadIcon />,
  buttonText = 'Upload files',
  multiple = true,
  accept,
  onChange,
  sx,
  ...rest
}: IUploadFile) {
  return (
    <UploadFileStyled sx={sx} {...rest}>
      <Button
        component='label'
        variant='contained'
        className='fileiconBtn'
        tabIndex={-1}
        startIcon={fileIcon}
        disableRipple
      >
        <Typography variant='caption' className='uplaodFileTxt'>
          {buttonText}
        </Typography>
        <Typography variant='caption' className='supportFileTxt'>
          {supportedFileText}
        </Typography>
        <VisuallyHiddenInput type='file' multiple={multiple} accept={accept} onChange={onChange} />
      </Button>
    </UploadFileStyled>
  );
}

export default UploadFile;
