// components/VonageVideoSession.tsx
import { useChat } from '@/hooks/vonage/useChat';
import { usePublisher } from '@/hooks/vonage/usePublisher';
import { useSubscribers } from '@/hooks/vonage/useSubscribers';
import { useVideoSession } from '@/hooks/vonage/useVideoSession';
import { useVonageSDK } from '@/hooks/vonage/useVonageSDK';
import { Alert, Box, CircularProgress, Container, Grid, Typography } from '@mui/material';
import dynamic from 'next/dynamic';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ChatPanel } from './Chat/ChatPanel';
import { DevicePreviewState } from './DevicePreview';

import {
  ICredentials,
  ISubscriber,
  IVideoSessionState,
} from '@/typescript/interface/vonage.interface';
import { VideoControls } from './VideoControls';
import { VideoLayout } from './VideoLayout';
import { WaitingRoom } from './WaitingRoom';

interface IVonageVideoSessionProps {
  credentials: ICredentials;
  displayName: string;
  initialPublishAudio: boolean;
  initialPublishVideo: boolean;
  sessionTime: {
    start: string;
    end: string;
  };
  sessionData: {
    clientName: string;
    interpreterName: string;
    language_one: string;
    language_two: string;
  };
  isAudio: boolean;
}

const VonageVideoSessionComponent: React.FC<IVonageVideoSessionProps> = ({
  credentials: credentialsFromParent,
  displayName,
  initialPublishAudio,
  initialPublishVideo,
  sessionTime,
  sessionData,
  isAudio,
}) => {
  // Memoize credentials to prevent re-creation
  const credentials = useMemo<ICredentials>(
    () => ({
      apiKey: credentialsFromParent.apiKey,
      sessionId: credentialsFromParent.sessionId,
      token: credentialsFromParent.token,
    }),
    [credentialsFromParent.apiKey, credentialsFromParent.sessionId, credentialsFromParent.token]
  );

  const [username, setUsername] = useState<string>(displayName || '');

  const [mediaState, setMediaState] = useState({
    hasAudio: true,
    hasVideo: !isAudio,
  });

  const [preflight, setPreflight] = useState<DevicePreviewState>({
    audioOn: initialPublishAudio,
    videoOn: initialPublishVideo,
  });

  const [videoState, setVideoState] = useState<IVideoSessionState>({
    connected: false,
    sessionConnected: false,
    publisher: null,
    subscribers: [],
    error: '',
  });

  const publisherRef = useRef<HTMLDivElement | null>(null);
  const subscribersRef = useRef<HTMLDivElement | null>(null);
  const publisherContainerId = useRef(`publisher-${Date.now()}`);

  const hasInitializedUsername = useRef(false);
  const hasJoinedSession = useRef(false);

  const { OT, isLoading, error: sdkError } = useVonageSDK();

  // Memoize update helpers to prevent re-creation
  const updateSubscribers = useCallback((updateFn: (prev: ISubscriber[]) => ISubscriber[]) => {
    setVideoState(prev => ({ ...prev, subscribers: updateFn(prev.subscribers) }));
  }, []);

  const updateVideoState = useCallback((updates: Partial<IVideoSessionState>) => {
    setVideoState(prev => ({ ...prev, ...updates }));
  }, []);

  const { subscribeToStream, handleStreamDestroyed, clearPendingStreams } = useSubscribers(
    videoState.connected,
    subscribersRef,
    videoState.subscribers,
    updateSubscribers,
    error => updateVideoState({ error })
  );

  const { session, initializeSession, disconnect, isLoadingSession } = useVideoSession(
    OT,
    subscribeToStream,
    handleStreamDestroyed
  );

  const { toggleAudio, toggleVideo } = usePublisher(
    OT,
    session,
    videoState.sessionConnected,
    publisherRef,
    publisher => updateVideoState({ publisher }),
    error => updateVideoState({ error }),
    preflight.audioOn,
    preflight.videoOn
  );

  // Chat hook - the main culprit
  const {
    chatState,
    chatMessagesRef,
    sendMessage,
    updateCurrentMessage,
    updateUsername,
    toggleChat,
    sendSystemMessage,
    sendFileMessage,
    isUploadingFile,
  } = useChat(session, session?.connection?.connectionId);

  // Memoize chat messages to prevent re-renders
  const memoizedMessages = useMemo(() => chatState.messages, [chatState.messages]);
  const memoizedShowChat = useMemo(() => chatState.showChat, [chatState.showChat]);
  const memoizedUnreadCount = useMemo(() => chatState.unreadCount, [chatState.unreadCount]);

  // CRITICAL FIX: Only sync username once on mount
  useEffect(() => {
    if (username && !hasInitializedUsername.current) {
      updateUsername(username);
      hasInitializedUsername.current = true;
    }
    // Deliberately minimal dependencies
  }, [username]);

  // System message on join - only once
  useEffect(() => {
    if (videoState.connected && username && !hasJoinedSession.current) {
      sendSystemMessage(`${username} joined the session`);
      hasJoinedSession.current = true;
    }
    // Deliberately minimal dependencies
  }, [videoState.connected, username]);

  // Reset join flag when disconnected
  useEffect(() => {
    if (!videoState.connected) {
      hasJoinedSession.current = false;
    }
  }, [videoState.connected]);

  // Stream property changes
  useEffect(() => {
    if (!session) return;
    const onSPC = (event: any) => {
      const isOwn =
        event?.stream?.connection?.id === session?.connection?.id ||
        event?.stream?.streamId === videoState?.publisher?.stream?.streamId;
      if (!isOwn) return;
      if (event.changedProperty === 'hasAudio')
        setMediaState(s => ({ ...s, hasAudio: event.newValue }));
      if (event.changedProperty === 'hasVideo')
        if (!isAudio) {
          setMediaState(s => ({ ...s, hasVideo: event.newValue }));
        }
    };
    session.on('streamPropertyChanged', onSPC);
    return () => session.off?.('streamPropertyChanged', onSPC);
  }, [session, videoState?.publisher?.stream?.streamId]);

  // Memoize handlers to prevent re-creation
  const handleConnect = useCallback(() => {
    if (!username.trim()) {
      updateVideoState({ error: 'Please enter a username' });
      return;
    }
    if (!credentials.apiKey || !credentials.sessionId || !credentials.token) {
      updateVideoState({ error: 'Missing credentials' });
      return;
    }
    clearPendingStreams();
    initializeSession(credentials, updateVideoState);
  }, [username, credentials, clearPendingStreams, initializeSession, updateVideoState]);

  const handleToggleAudio = useCallback(() => {
    toggleAudio(videoState.publisher);
  }, [toggleAudio, videoState.publisher]);

  const handleToggleVideo = useCallback(() => {
    toggleVideo(videoState.publisher);
  }, [toggleVideo, videoState.publisher]);

  const handleDisconnect = useCallback(() => {
    if (username && videoState.connected) {
      sendSystemMessage(`${username} left the session`);
      setTimeout(() => disconnect(), 100);
    } else {
      disconnect();
    }
  }, [username, videoState.connected, sendSystemMessage, disconnect]);

  // Memoize onChange handler for username TextField
  const handleUsernameChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  }, []);

  // Memoize device preview onChange
  const handleDevicePreviewChange = useCallback(
    (data: DevicePreviewState) => {
      setPreflight(data);
      setMediaState({ hasAudio: data.audioOn, hasVideo: isAudio ? false : data.videoOn });
    },
    [isAudio]
  );

  if (isLoading) {
    return (
      <Container maxWidth='lg' sx={{ py: 4 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '60vh',
            textAlign: 'center',
          }}
        >
          <CircularProgress size={60} sx={{ mb: 3 }} />
          <Typography variant='h4' component='h1' gutterBottom>
            Loading Vonage Video SDK...
          </Typography>
          <Typography variant='body1' color='text.secondary'>
            Please wait while we initialize the video components.
          </Typography>
        </Box>
      </Container>
    );
  }

  if (!OT && !isLoading) {
    return (
      <Container maxWidth='lg' sx={{ py: 4 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '60vh',
            textAlign: 'center',
          }}
        >
          <Typography variant='h4' component='h1' color='error' gutterBottom>
            Failed to Load Video SDK
          </Typography>
          <Typography variant='body1' color='text.secondary' sx={{ mb: 2 }}>
            {sdkError}
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            Please refresh the page and try again.
          </Typography>
        </Box>
      </Container>
    );
  }

  const canJoin = !!username.trim();

  return (
    <Container maxWidth='xl' sx={{ py: { xs: 2, sm: 3 } }}>
      {!videoState.connected && (
        <WaitingRoom
          username={username}
          onUsernameChange={handleUsernameChange}
          mediaState={mediaState}
          onDevicePreviewChange={handleDevicePreviewChange}
          canJoin={canJoin}
          isLoadingSession={isLoadingSession}
          onConnect={handleConnect}
          startTime={sessionTime.start}
          endTime={sessionTime.end}
          isAudio={isAudio}
        />
      )}

      {videoState.error && (
        <Alert severity='error' sx={{ mb: 3, maxWidth: 900, mx: 'auto' }}>
          {videoState.error}
        </Alert>
      )}

      {videoState.connected && (
        <Box>
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3, px: { xs: 1, sm: 0 } }}>
            <VideoControls
              onToggleAudio={handleToggleAudio}
              onToggleVideo={handleToggleVideo}
              onDisconnect={handleDisconnect}
              toggleChat={toggleChat}
              unreadChatCount={memoizedUnreadCount}
              hasAudio={mediaState.hasAudio}
              hasVideo={mediaState.hasVideo}
              isAudio={isAudio}
            />
          </Box>

          <Grid container spacing={{ xs: 2, md: 3 }}>
            <Grid
              item
              xs={12}
              md={memoizedShowChat ? 8 : 12}
              sx={{ order: { xs: 1, md: 1 } }}
              className='videoLayout'
            >
              <VideoLayout
                publisher={videoState.publisher}
                subscribers={videoState.subscribers}
                publisherRef={publisherRef}
                subscribersRef={subscribersRef}
                publisherContainerId={publisherContainerId.current}
                endTime={sessionTime.end}
                sessionData={sessionData}
              />
            </Grid>

            {memoizedShowChat && (
              <Grid item xs={12} md={4} sx={{ order: { xs: 2, md: 2 } }} className='messageChat'>
                <Box
                  sx={{
                    position: { md: 'sticky' },
                    top: { md: '80px' },
                    height: { xs: '600px', sm: '650px', md: 'calc(100vh - 130px)' },
                    marginBottom: { xs: '80px', md: 0 },
                  }}
                  className='messageChatBox'
                >
                  <ChatPanel
                    messages={memoizedMessages}
                    currentMessage={chatState.currentMessage}
                    username={chatState.username}
                    onMessageChange={updateCurrentMessage}
                    onSendMessage={sendMessage}
                    chatMessagesRef={chatMessagesRef}
                    currentConnectionId={session?.connection?.connectionId}
                    onFileShare={sendFileMessage}
                    isUploadingFile={isUploadingFile}
                    onClose={toggleChat}
                  />
                </Box>
              </Grid>
            )}
          </Grid>
        </Box>
      )}
    </Container>
  );
};

const VonageVideoSession = dynamic(() => Promise.resolve(VonageVideoSessionComponent), {
  ssr: false,
  loading: () => (
    <Container maxWidth='lg' sx={{ py: 4 }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '50vh',
          textAlign: 'center',
        }}
      >
        <CircularProgress size={40} sx={{ mb: 2 }} />
        <Typography variant='h6' gutterBottom>
          Loading Video Component...
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          Initializing video chat with messaging...
        </Typography>
      </Box>
    </Container>
  ),
});

export default VonageVideoSession;
