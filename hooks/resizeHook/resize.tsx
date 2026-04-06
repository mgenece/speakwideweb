import { useCallback, useEffect, useRef, useState } from 'react';

type TSize = {
  width: number;
  height: number;
};

const useElementSize = <T extends HTMLElement>() => {
  const ref = useRef<T | null>(null);
  const [size, setSize] = useState<TSize>({ width: 0, height: 0 });

  const updateSize = useCallback(() => {
    const element = ref.current;
    if (!element) {
      setSize({ width: 0, height: 0 });
      return;
    }

    const { width, height } = element.getBoundingClientRect();
    setSize({ width, height });
  }, []);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    updateSize();

    const observer = new ResizeObserver(() => {
      updateSize();
    });

    observer.observe(element);

    return () => observer.disconnect();
  }, [updateSize]);

  return [ref, size] as const;
};

export default useElementSize;
