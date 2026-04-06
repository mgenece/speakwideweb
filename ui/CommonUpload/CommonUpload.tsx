import { CommonUploadWrap } from '@/styles/StyledComponents/CommonUploadWrap';
import { Typography } from '@mui/material';
import BackupIcon from '../Icons/BackupIcon';

const CommonUpload = () => {
  return (
    <CommonUploadWrap>
      <i>
        <BackupIcon />
      </i>
      <Typography className='uploadText'>Upload your file</Typography>
      <Typography className='uploadSubText'>
        PNG, JPG, JPEG file supported (max file size 50MB)
      </Typography>
      <input type='file' />
    </CommonUploadWrap>
  );
};

export default CommonUpload;
