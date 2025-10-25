import { ReactNode } from 'react';
import { motion, Variants } from 'framer-motion';
import { cn } from '../utils/cn';

const iconVariants: Variants = {
  hidden: { opacity: 0, scale: 0.85 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.45, ease: 'easeOut' } },
  hover: { scale: 1.08, transition: { type: 'spring', stiffness: 320, damping: 18 } }
};

type IconProps = {
  children: ReactNode;
  className?: string;
  hovered?: boolean;
};

const Icon = ({ children, className, hovered = false }: IconProps) => (
  <motion.div
    className={cn(
      'flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary shadow-soft backdrop-blur-sm',
      className
    )}
    variants={iconVariants}
    initial="hidden"
    animate={hovered ? 'hover' : 'show'}
  >
    {children}
  </motion.div>
);

export default Icon;
