// hooks/useDownload.ts
import { useCallback, useState } from 'react';
import toast from 'react-hot-toast';

interface UseDownloadReturn {
  downloadFile: (url: string, filename?: string) => Promise<void>;
  isDownloading: boolean;
  error: string | null;
}

export const useDownload = (): UseDownloadReturn => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const downloadFile = useCallback(async (url: string, filename?: string) => {
    setIsDownloading(true);
    setError(null);

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      if (!response.url.includes('/uploads')) {
        throw new Error('Cannot download file from this source');
      }

      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = blobUrl;
      a.download = filename || url.split('/').pop() || 'download';

      document.body.appendChild(a);
      a.click();
      a.remove();

      // Clean up
      window.URL.revokeObjectURL(blobUrl);

      // Show success toast
      toast.success('File Downloaded');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Download failed';
      console.error('Download failed:', error);
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsDownloading(false);
    }
  }, []);

  return {
    downloadFile,
    isDownloading,
    error,
  };
};
