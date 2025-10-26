import { Transition, Variants } from 'framer-motion';

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: 'easeOut' }
  }
};

export const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1
    }
  }
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.35, ease: 'easeOut' }
  }
};

export const slideInY: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' }
  }
};

export const staggeredWords: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: (index: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: 'easeOut',
      delay: index * 0.05
    }
  })
};

export const hoverSpring: Transition = {
  type: 'spring',
  stiffness: 260,
  damping: 20
};

export const blobTransition: Transition = {
  duration: 14,
  repeat: Infinity,
  repeatType: 'reverse',
  ease: 'easeInOut'
};

export const perspectiveFade: Variants = {
  hidden: { opacity: 0, rotateX: 12, y: 28 },
  show: {
    opacity: 1,
    rotateX: 0,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
  }
};

export const glowIn: Variants = {
  hidden: { opacity: 0, scale: 0.96, filter: 'blur(8px)' },
  show: {
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    transition: { duration: 0.55, ease: 'easeOut' }
  }
};
