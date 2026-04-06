// hooks/useVonageSDK.ts
import { useEffect, useState } from 'react';

export const useVonageSDK = () => {
  const [OT, setOT] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const loadVonageSDK = async () => {
      try {
        const OTModule = await import('@vonage/client-sdk-video');
        const OTInstance = OTModule.default || OTModule;

        // console.log('OT Module loaded:', OTInstance);
        setOT(OTInstance);
        setIsLoading(false);
      } catch (err: any) {
        console.error('Failed to load Vonage SDK:', err);
        setError(`Failed to load Vonage SDK: ${err?.message}`);
        setIsLoading(false);
      }
    };

    if (typeof window !== 'undefined') {
      loadVonageSDK();
    }
  }, []);

  return { OT, isLoading, error };
};
