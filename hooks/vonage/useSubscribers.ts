// hooks/useSubscribers.ts
import { ISubscriber } from '@/typescript/interface/vonage.interface';
import { useCallback, useEffect, useRef } from 'react';

export const useSubscribers = (
  connected: boolean,
  subscribersRef: React.RefObject<HTMLDivElement | null>, // FIXED: Allow null
  subscribers: ISubscriber[],
  onSubscribersChange: (updateFn: (prev: ISubscriber[]) => ISubscriber[]) => void,
  onError: (error: string) => void
) => {
  const pendingStreamsRef = useRef<any[]>([]);

  const subscribeToStreamNow = useCallback(
    (stream: any, session: any, currentSubscribers: ISubscriber[]) => {
      // console.log('=== SUBSCRIBING TO STREAM NOW ===');
      // console.log('Stream ID:', stream.streamId);

      if (!subscribersRef.current) {
        // console.log('subscribersRef still not ready');
        return;
      }

      const existingSubscriber = currentSubscribers.find(
        (sub: ISubscriber) => sub.streamId === stream.streamId
      );
      if (existingSubscriber) {
        // console.log('Already subscribed to stream:', stream.streamId);
        return;
      }

      const subscriberContainer = document.createElement('div');
      const subscriberId = `subscriber-${stream.streamId}`;
      subscriberContainer.id = subscriberId;
      subscriberContainer.style.cssText = `
        width: 600px;
        height: 450px;
        background-color: #000;
        border: 1px solid #ccc;
        border-radius: 4px;
        margin-bottom: 10px;
        overflow: hidden;
        position: relative;
        display: block;
      `;

      subscribersRef.current.appendChild(subscriberContainer);
      // console.log('Appended container to subscribers ref');

      const subscriber = session.subscribe(
        stream,
        subscriberContainer,
        {
          insertMode: 'append',
          width: '100%',
          height: '100%',
          fitMode: 'contain',
        },
        (err: any) => {
          if (err) {
            console.error('Subscription error:', err);
            onError(`Subscription error: ${err?.message || 'Unknown error'}`);
            if (subscriberContainer.parentNode) {
              subscriberContainer.parentNode.removeChild(subscriberContainer);
            }
          } else {
            // console.log('Successfully subscribed to stream:', stream.streamId);

            onSubscribersChange((prev: ISubscriber[]) => {
              const alreadyExists = prev.some(
                (sub: ISubscriber) => sub.streamId === stream.streamId
              );
              if (alreadyExists) {
                // console.log('Duplicate subscriber prevented:', stream.streamId);
                if (subscriberContainer.parentNode) {
                  subscriberContainer.parentNode.removeChild(subscriberContainer);
                }
                return prev;
              }

              return [
                ...prev,
                {
                  subscriber,
                  container: subscriberContainer,
                  streamId: stream.streamId,
                },
              ];
            });
          }
        }
      );
    },
    [subscribersRef, onSubscribersChange, onError]
  );

  const subscribeToStream = useCallback(
    (stream: any, session: any) => {
      // console.log('=== SUBSCRIBING TO STREAM ===');
      // console.log('Stream ID:', stream.streamId);

      if (!subscribersRef.current) {
        // console.log('subscribersRef not ready, adding to pending streams');
        pendingStreamsRef.current.push({ stream, session });
        return;
      }

      subscribeToStreamNow(stream, session, subscribers);
    },
    [subscribersRef, subscribeToStreamNow, subscribers]
  );

  // Process pending streams when DOM is ready
  useEffect(() => {
    if (connected && subscribersRef.current && pendingStreamsRef.current.length > 0) {
      // console.log('Processing pending streams:', pendingStreamsRef.current.length);

      const pendingStreams = [...pendingStreamsRef.current];
      pendingStreamsRef.current = [];

      pendingStreams.forEach(({ stream, session }) => {
        // console.log('Processing pending stream:', stream.streamId);
        subscribeToStreamNow(stream, session, subscribers);
      });
    }
  }, [connected, subscribeToStreamNow, subscribers]);

  const handleStreamDestroyed = useCallback(
    (event: any) => {
      // console.log('=== STREAM DESTROYED ===');
      // console.log('Stream destroyed:', event.stream.streamId);

      onSubscribersChange((prevSubscribers: ISubscriber[]) => {
        return prevSubscribers.filter((sub: ISubscriber) => {
          if (sub.streamId === event.stream.streamId) {
            setTimeout(() => {
              try {
                if (
                  sub.container &&
                  sub.container.parentNode &&
                  sub.container.parentNode.contains(sub.container)
                ) {
                  sub.container.parentNode.removeChild(sub.container);
                  // console.log('Removed container for destroyed stream:', event.stream.streamId);
                }
              } catch {
                return;
              }
            }, 0);
            return false;
          }
          return true;
        });
      });
    },
    [onSubscribersChange]
  );

  const clearPendingStreams = useCallback(() => {
    pendingStreamsRef.current = [];
  }, []);

  return {
    subscribeToStream,
    handleStreamDestroyed,
    clearPendingStreams,
    pendingStreamsRef,
  };
};
