import { useEffect, useState } from 'react';

const mediaQuery = '(prefers-reduced-motion: reduce)';

const usePrefersReducedMotion = () => {
  const [prefersReduced, setPrefersReduced] = useState<boolean>(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia === 'undefined') {
      return false;
    }
    return window.matchMedia(mediaQuery).matches;
  });

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia === 'undefined') {
      return;
    }

    const mediaList = window.matchMedia(mediaQuery);
    const updatePreference = () => setPrefersReduced(mediaList.matches);

    updatePreference();

    if (typeof mediaList.addEventListener === 'function') {
      mediaList.addEventListener('change', updatePreference);
      return () => mediaList.removeEventListener('change', updatePreference);
    }

    mediaList.addListener(updatePreference);
    return () => mediaList.removeListener(updatePreference);
  }, []);

  return prefersReduced;
};

export default usePrefersReducedMotion;
