import { ConversationWrapper } from '@/styles/StyledComponents/ConversationWrapper';
import { Box, Stack, Typography } from '@mui/material';
import Image from 'next/image';

export interface IconversationProps {
  userImage?: string;
  messageText?: string;
  type?: 'sender' | 'receiver';
  timeText?: string;
}

function ConversationComp({ userImage, type, messageText, timeText }: IconversationProps) {
  return (
    <ConversationWrapper
      direction='row'
      alignItems='flex-start'
      width='100%'
      flexDirection={type == 'receiver' ? 'initial' : 'row-reverse'}
      gap={{ lg: '15px', md: '10px', xs: '8px' }}
    >
      <Typography
        component='figure'
        height={{ lg: '30px', md: 28, xs: 25 }}
        width={{ lg: '30px', md: 28, xs: 25 }}
        borderRadius={'50%'}
        overflow={'hidden'}
        lineHeight={0}
        flexShrink={0}
        mt={{ lg: 1, md: 0.8, xs: 0.5 }}
      >
        <Image
          height={80}
          width={80}
          alt='user-image'
          src={userImage as string}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </Typography>
      <Stack direction='column' spacing={{ lg: '10px', md: '8px', xs: '5px' }}>
        <Box className={`contentWrapper ${type == 'receiver' ? 'receiver' : 'sender'}`}>
          <Typography>{messageText}</Typography>
        </Box>
        <Typography
          variant='body1'
          className='timeText'
          textAlign={type == 'receiver' ? 'initial' : 'right'}
          fontSize={{ xs: '10px' }}
        >
          {timeText}
        </Typography>
      </Stack>
    </ConversationWrapper>
  );
}

export default ConversationComp;
