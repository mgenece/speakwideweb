// hooks/useVideoSession.ts
import { ICredentials, IVideoSessionState } from '@/typescript/interface/vonage.interface';
import { useCallback, useState } from 'react';

export const useVideoSession = (OT: any, subscribeToStream: any, handleStreamDestroyed: any) => {
  const [session, setSession] = useState<any>(null);
  const [isLoadingSession, setIsLoadingSession] = useState(false);

  const initializeSession = useCallback(
    (
      credentials: ICredentials,
      updateState: (updates: Partial<IVideoSessionState>) => void // FIXED: Pass as parameter
    ) => {
      if (!OT) {
        updateState({ error: 'Vonage SDK not loaded yet' });
        return;
      }

      if (!credentials.apiKey || !credentials.sessionId || !credentials.token) {
        updateState({ error: 'Please provide API Key, Session ID, and Token' });
        return;
      }

      try {
        setIsLoadingSession(true);
        const newSession = OT.initSession(credentials.apiKey, credentials.sessionId);

        newSession.on('sessionConnected', () => {
          // console.log('=== SESSION CONNECTED ===');
          setIsLoadingSession(false);
          updateState({
            sessionConnected: true,
            connected: true,
            error: '',
          });
        });

        newSession.on('streamCreated', (event: any) => {
          // console.log('=== NEW STREAM CREATED ===');
          // console.log('Stream ID:', event.stream.streamId);
          subscribeToStream(event.stream, newSession);
        });

        newSession.on('streamDestroyed', (event: any) => {
          handleStreamDestroyed(event);
        });

        newSession.on('sessionDisconnected', () => {
          // console.log('Session disconnected:', event);
          updateState({
            connected: false,
            sessionConnected: false,
            publisher: null,
            subscribers: [],
            error: '',
          });
        });

        newSession.connect(credentials.token, (err: any) => {
          if (err) {
            setIsLoadingSession(false);
            console.error('Error connecting to session:', err);
            updateState({ error: `Connection error: ${err?.message || 'Unknown error'}` });
          } else {
            // console.log('Connected to session successfully');
          }
        });

        setSession(newSession);
      } catch (err: any) {
        setIsLoadingSession(false);
        console.error('Error initializing session:', err);
        updateState({ error: `Initialization error: ${err?.message || 'Unknown error'}` });
      }
    },
    [OT, subscribeToStream, handleStreamDestroyed]
  );

  const disconnect = useCallback(() => {
    if (session) {
      try {
        session.disconnect();
        setSession(null);
      } catch {
        // console.log('Session disconnect handled:', error);
      }
    }
  }, [session]);

  return {
    session,
    initializeSession,
    disconnect,
    isLoadingSession,
  };
};
