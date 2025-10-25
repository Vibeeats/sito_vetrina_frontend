import { PropsWithChildren } from 'react';
import { ForwardRefComponent, motion, MotionProps } from 'framer-motion';
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion';
import { cn } from '../utils/cn';

type MotionInViewProps = PropsWithChildren<
  MotionProps &
    Record<string, unknown> & {
      className?: string;
      as?: ForwardRefComponent<any, any>;
      viewportAmount?: number;
      delay?: number;
    }
>;

const MotionInView = ({
  as = motion.div,
  className,
  children,
  variants,
  viewportAmount = 0.2,
  delay = 0,
  initial,
  animate,
  whileInView,
  viewport,
  transition,
  ...rest
}: MotionInViewProps) => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const Component = as;

  const resolvedTransition = prefersReducedMotion ? { duration: 0 } : { delay, ...(transition ?? {}) };
  const resolvedAnimate = prefersReducedMotion ? undefined : animate;

  return (
    <Component
      className={cn(className)}
      variants={variants}
      initial={prefersReducedMotion ? false : initial ?? 'hidden'}
      animate={resolvedAnimate}
      whileInView={prefersReducedMotion ? undefined : whileInView ?? 'show'}
      viewport={prefersReducedMotion ? undefined : viewport ?? { once: true, amount: viewportAmount }}
      transition={resolvedTransition}
      {...rest}
    >
      {children}
    </Component>
  );
};

export default MotionInView;
