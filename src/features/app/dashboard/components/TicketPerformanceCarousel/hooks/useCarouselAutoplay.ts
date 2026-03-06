import { useRef, useCallback, useEffect } from 'react';

interface UseCarouselAutoplayOptions {
  itemCount: number;
  intervalMs: number;
  onIndexChange: (index: number) => void;
}

const MIN_ITEMS_FOR_AUTOPLAY = 2;

/**
 * Hook para controlar autoplay de carrossel com pause ao toque.
 * Pausa automaticamente quando o usuário inicia scroll e retoma ao finalizar.
 */
export function useCarouselAutoplay({
  itemCount,
  intervalMs,
  onIndexChange,
}: UseCarouselAutoplayOptions) {
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const isUserScrollingRef = useRef(false);
  const currentIndexRef = useRef(0);

  const stop = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const start = useCallback(() => {
    if (itemCount < MIN_ITEMS_FOR_AUTOPLAY) return;

    stop();

    timerRef.current = setInterval(() => {
      const nextIndex =
        currentIndexRef.current >= itemCount - 1 ? 0 : currentIndexRef.current + 1;

      currentIndexRef.current = nextIndex;
      onIndexChange(nextIndex);
    }, intervalMs);
  }, [itemCount, intervalMs, onIndexChange, stop]);

  const onScrollBegin = useCallback(() => {
    isUserScrollingRef.current = true;
    stop();
  }, [stop]);

  const onScrollEnd = useCallback(
    (offsetX: number, itemWidth: number) => {
      const index = Math.round(offsetX / itemWidth);
      const clampedIndex = Math.min(index, itemCount - 1);
      currentIndexRef.current = clampedIndex;
      isUserScrollingRef.current = false;
      onIndexChange(clampedIndex);
      start();
    },
    [itemCount, onIndexChange, start],
  );

  useEffect(() => {
    if (!isUserScrollingRef.current) {
      start();
    }
    return stop;
  }, [itemCount, start, stop]);

  return {
    stop,
    start,
    onScrollBegin,
    onScrollEnd,
  };
}
