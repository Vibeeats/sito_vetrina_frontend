export const scrollToId = (hash: string) => {
  if (!hash) return;
  const cleanHash = hash.startsWith('#') ? hash.substring(1) : hash;
  const element = document.getElementById(cleanHash);
  if (!element) return;

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const headerOffset = 96;
  const elementTop = element.getBoundingClientRect().top + window.scrollY;
  const targetPosition = Math.max(elementTop - headerOffset, 0);

  if ('scrollBehavior' in document.documentElement.style && !prefersReduced) {
    window.scrollTo({ top: targetPosition, behavior: 'smooth' });
  } else {
    window.scrollTo({ top: targetPosition });
  }
};
