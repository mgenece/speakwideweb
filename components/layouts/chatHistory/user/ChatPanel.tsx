// components/DashboardOther/ChatHistoryMain/MiddleChatPanel.tsx
import { getChatHistoryApi } from '@/api/functions/videoSession.api';
import { ChatMessage } from '@/components/VonageVideoSession/Chat/ChatMessage';
import { useInterpreterData, useUserData } from '@/hooks/react-query/useVisitor';
import { safeJsonParse } from '@/lib/functions/_helpers.lib';
import { IChatMessage } from '@/typescript/interface/vonage.interface';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Box, Chip, IconButton, Stack, Typography, useMediaQuery } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

interface ChatPanelUserProps {
  isOpen: boolean;
  onBack: () => void;
  onToggleDetails?: () => void;
  isMobile?: boolean;
  session: { id: string; vonage: string };
}

export function ChatPanelUser({ isOpen, onBack, isMobile, session }: ChatPanelUserProps) {
  const { userData } = useUserData();
  const { interpreterData } = useInterpreterData();
  const [otherName, setOtherName] = useState('');

  const userName = userData?.full_name || interpreterData?.full_name;

  const chatQuery = useQuery({
    queryKey: ['chat-history', session],
    queryFn: () => getChatHistoryApi({ sessionId: session.vonage }),
    enabled: !!session.vonage,
  });

  // const senderImage = sessionDetailQuery.data?.data.client.full_name === userName ? sessionDetailQuery.data?.data.client.profile_image ? mediaUrl(sessionDetailQuery.data?.data.client.profile_image) : ''

  const chatData = chatQuery.data?.data.docs || [];

  const parsed = chatData
    .map((item: any) => {
      const payload = safeJsonParse<any>(item.message);
      if (!payload) return null;

      const isFile = payload?.type === 'file';
      const tsISO = payload?.timestamp || item?.createdAt || new Date().toISOString();

      if (payload?.username !== userName) {
        if (otherName !== payload?.username) {
          setOtherName(payload?.username);
        }
      }

      const msg: IChatMessage = {
        id: `${item?._id || `${payload?.username || 'system'}-${tsISO}`}`,
        username: payload?.username || item?.senderName || 'Unknown',
        message: isFile ? undefined : payload?.message || '',
        timestamp: new Date(tsISO),
        connectionId: 'history',
        type: (payload?.type as IChatMessage['type']) || 'user',
        fileData: isFile
          ? {
              fileName: payload?.fileData?.fileName,
              fileSize: payload?.fileData?.fileSize,
              fileType: payload?.fileData?.fileType,
              downloadUrl: payload?.fileData?.downloadUrl,
            }
          : undefined,
      };
      return msg;
    })
    .filter(Boolean);

  const isTabScreen = useMediaQuery('(max-width:899px)');

  return (
    <Box className={`middle-box ${isTabScreen && isOpen ? 'open' : ''}`}>
      <Box className='middle-inner-box'>
        <Box className='header-box-bordered'>
          <Stack
            className='header-box-inner'
            direction={'row'}
            alignItems={'center'}
            justifyContent={'space-between'}
            flexWrap={'wrap'}
          >
            <Stack direction={'row'} alignItems={'center'} spacing={'10px'} flexWrap={'wrap'}>
              {isMobile && (
                <IconButton
                  disableRipple
                  onClick={onBack}
                  aria-label='back-button'
                  className='back-btn'
                >
                  <ArrowBackIosIcon />
                </IconButton>
              )}
              <Typography className='name-head'>{otherName}</Typography>
            </Stack>
          </Stack>
        </Box>
        <Box className='msg-main-body'>
          <Stack spacing={'12px'}>
            <Box className='day-indicator-box'>
              <Chip label='Today' className='day-indicator-chip' />
            </Box>
            {parsed.map(item => {
              if (!item) return;

              return <ChatMessage key={item?.id} message={item} username={userName as string} />;
            })}
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}
