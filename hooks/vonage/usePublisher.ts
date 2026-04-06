// hooks/usePublisher.ts
import { useCallback, useEffect, useRef } from 'react';

export const usePublisher = (
  OT: any,
  session: any,
  sessionConnected: boolean,
  publisherRef: React.RefObject<HTMLDivElement | null>, // FIXED: Allow null
  onPublisherChange: (publisher: any) => void,
  onError: (error: string) => void,
  initAudio: boolean,
  initVideo: boolean
) => {
  const initializationRef = useRef(false);

  const initializePublisher = useCallback(() => {
    if (
      !sessionConnected ||
      !publisherRef.current ||
      !session ||
      !OT ||
      initializationRef.current
    ) {
      return;
    }

    initializationRef.current = true;
    // console.log('Initializing publisher with container:', publisherRef.current);

    try {
      const publisherOptions = {
        insertMode: 'append',
        width: '100%',
        height: '100%',
        name: 'Publisher',
        publishAudio: initAudio,
        publishVideo: initVideo,
        fitMode: 'contain',
        style: {
          nameDisplayMode: 'off',
        },
      };

      if (publisherRef.current) {
        publisherRef.current.innerHTML = '';
      }

      const pub = OT.initPublisher(publisherRef.current, publisherOptions);

      pub.on('videoElementCreated', (event: any) => {
        if (event.element) {
          event.element.style.width = '100%';
          event.element.style.height = '100%';
          event.element.style.objectFit = 'contain';
        }
      });

      // pub.on('streamCreated', (event: any) => {
      //   console.log('Publisher stream created');
      // });

      pub.on('destroyed', () => {
        onPublisherChange(null);
        initializationRef.current = false;
      });

      session.publish(pub, (err: any) => {
        if (err) {
          console.error('Error publishing:', err);
          onError(`Publishing error: ${err?.message || 'Unknown error'}`);
          initializationRef.current = false;
        } else {
          onPublisherChange(pub);
        }
      });
    } catch (err: any) {
      console.error('Error initializing publisher:', err);
      onError(`Publisher initialization error: ${err?.message || 'Unknown error'}`);
      initializationRef.current = false;
    }
  }, [sessionConnected, session, OT, publisherRef, onPublisherChange, onError]);

  useEffect(() => {
    if (sessionConnected && publisherRef.current && session && OT) {
      const timer = setTimeout(() => {
        initializePublisher();
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [sessionConnected, initializePublisher]);

  const toggleAudio = useCallback((publisher: any) => {
    if (publisher?.stream) {
      publisher.publishAudio(!publisher.stream.hasAudio);
    }
  }, []);

  const toggleVideo = useCallback((publisher: any) => {
    if (publisher?.stream) {
      publisher.publishVideo(!publisher.stream.hasVideo);
    }
  }, []);

  return { toggleAudio, toggleVideo };
};
