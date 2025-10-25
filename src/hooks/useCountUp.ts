import { useCallback, useEffect, useRef, useState } from 'react';
import usePrefersReducedMotion from './usePrefersReducedMotion';

type UseCountUpOptions = {
  to: number;
  duration?: number;
  format?: (value: number) => string;
};

type UseCountUpResult = {
  value: string;
  start: () => void;
  reset: () => void;
  hasAnimated: boolean;
};

const defaultFormat = (value: number) => Math.round(value).toLocaleString('it-IT');

const useCountUp = ({ to, duration = 1200, format = defaultFormat }: UseCountUpOptions): UseCountUpResult => {
  const prefersReduced = usePrefersReducedMotion();
  const [displayValue, setDisplayValue] = useState(() => format(prefersReduced ? to : 0));
  const hasAnimatedRef = useRef(prefersReduced);
  const rafRef = useRef<number>();
  const startTimeRef = useRef<number>();

  const cancel = useCallback(() => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = undefined;
    }
    startTimeRef.current = undefined;
  }, []);

  const reset = useCallback(() => {
    cancel();
    hasAnimatedRef.current = prefersReduced;
    setDisplayValue(format(prefersReduced ? to : 0));
  }, [cancel, format, prefersReduced, to]);

  const step = useCallback(
    (timestamp: number) => {
      if (!startTimeRef.current) {
        startTimeRef.current = timestamp;
      }
      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);
      const nextValue = to * progress;
      setDisplayValue(format(nextValue));

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(step);
      } else {
        cancel();
        hasAnimatedRef.current = true;
        setDisplayValue(format(to));
      }
    },
    [cancel, duration, format, to]
  );

  const start = useCallback(() => {
    if (hasAnimatedRef.current || prefersReduced) {
      setDisplayValue(format(to));
      hasAnimatedRef.current = true;
      return;
    }
    cancel();
    rafRef.current = requestAnimationFrame(step);
  }, [cancel, format, prefersReduced, step, to]);

  useEffect(() => reset, [reset]);

  useEffect(() => {
    if (prefersReduced) {
      cancel();
      hasAnimatedRef.current = true;
      setDisplayValue(format(to));
    }
    return cancel;
  }, [cancel, format, prefersReduced, to]);

  return { value: displayValue, start, reset, hasAnimated: hasAnimatedRef.current };
};

export default useCountUp;
