import { mediaUrl } from '@/api/endpoints';
import { interpreterProfileUpdateApi } from '@/api/functions/profile.api';
import { maxFileSize } from '@/config/constants';
import { useInterpreterData } from '@/hooks/react-query/useVisitor';
import assest from '@/json/assest';
import CustomButtonPrimary from '@/ui/CustomButtons/CustomButtonPrimary';
import { Stack, Typography } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import Image from 'next/image';
import { useRef, useState } from 'react';
import toast from 'react-hot-toast';

const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];

function ProfileEditHead() {
  const { interpreterData, invalidateInterpreterData } = useInterpreterData();
  const fileRef = useRef<HTMLInputElement | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState('');

  const profileImageUpdateMutation = useMutation({
    mutationFn: interpreterProfileUpdateApi,
    onSuccess: () => {
      invalidateInterpreterData();
      toast.success('Profile image updated successfully');
    },
  });

  const handleUploadImage = () => {
    if (file) {
      const formData = new FormData();
      formData.append('profile_image', file);
      profileImageUpdateMutation.mutate(formData);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (allowedTypes.includes(selectedFile.type)) {
        if (selectedFile.size <= maxFileSize) {
          setError('');
          setFile(selectedFile);
          return;
        } else {
          setError('File size exceeded.');
        }
      } else {
        setError('File type not supported.');
      }
    }
    setFile(null);
    return;
  };

  return (
    <Stack
      direction={{ md: 'row', xs: 'column' }}
      alignItems={{ md: 'center', xs: 'flex-start' }}
      justifyContent={'space-between'}
      flexWrap={'wrap'}
      className='border-top-stack'
      spacing={{ md: 0, xs: 2 }}
    >
      <Stack
        direction={{ sm: 'row', xs: 'column' }}
        alignItems={{ xs: 'center' }}
        justifyContent={'space-between'}
        flexWrap={'wrap'}
        className='left-stack'
        spacing={{ sm: '20px', xs: '10px' }}
      >
        <figure className='profile-fig'>
          <Image
            src={
              file
                ? URL.createObjectURL(file)
                : interpreterData?.profile_image
                  ? mediaUrl(`interpreter_profile_pic/${interpreterData?.profile_image}`)
                  : assest.dashboardHeaderAvatarImage
            }
            width={83}
            height={82}
            alt='profile-image'
            onLoad={() => {
              if (file) URL.revokeObjectURL(URL.createObjectURL(file));
            }}
          />
        </figure>
        <Stack>
          <Typography variant='body2'>Upload Profile Picture.</Typography>
          <Typography variant='body2'>
            Max File Size 2Mb. Only .JPEG .JPG, .PNG file allowed.
          </Typography>
          <Typography variant='body2' color={'error'}>
            {error}
          </Typography>
        </Stack>
      </Stack>
      <Stack
        direction={'row'}
        alignItems={'center'}
        flexWrap={'wrap'}
        spacing={'8px'}
        className='btn-stack'
      >
        <CustomButtonPrimary
          disableRipple
          variant='contained'
          aria-label='Change'
          className='change-btn'
          onClick={() => fileRef.current?.click()}
        >
          Change
        </CustomButtonPrimary>
        <input type='file' hidden ref={fileRef} accept='image/*' onChange={handleFileChange} />
        <CustomButtonPrimary
          disableRipple
          variant='outlined'
          aria-label='Remove'
          className='remove-btn'
          disabled={!file}
          onClick={handleUploadImage}
        >
          Upload
        </CustomButtonPrimary>
      </Stack>
    </Stack>
  );
}

export default ProfileEditHead;
