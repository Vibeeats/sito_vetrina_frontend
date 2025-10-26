import { ReactNode, forwardRef } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '../utils/cn';

export type CardProps = HTMLMotionProps<'div'> & {
    title?: string;
    subtitle?: string;
    icon?: ReactNode;
    children?: ReactNode;
    className?: string;
  };

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ title, subtitle, icon, children, className, ...rest }, ref) => (
    <motion.div
      ref={ref}
      className={cn(
        'group relative flex h-full flex-col rounded-3xl border border-accent/30 bg-white p-6 shadow-soft transition-shadow duration-300 will-change-transform',
        className
      )}
      {...rest}
    >
      {icon && <div className="mb-5 flex items-center" aria-hidden="true">{icon}</div>}
      {title && <h3 className="text-lg font-semibold text-secondary">{title}</h3>}
      {subtitle && <p className="mt-2 text-sm text-muted">{subtitle}</p>}
      {children && <div className="mt-4 text-sm leading-relaxed text-muted">{children}</div>}
    </motion.div>
  )
);

export default Card;
