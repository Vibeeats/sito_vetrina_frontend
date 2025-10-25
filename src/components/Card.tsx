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
        'group relative flex h-full flex-col rounded-3xl border border-white/70 bg-white/90 p-6 shadow-soft transition-shadow duration-300 will-change-transform backdrop-blur',
        className
      )}
      {...rest}
    >
      {icon && <div className="mb-5 flex items-center" aria-hidden="true">{icon}</div>}
      {title && <h3 className="text-lg font-semibold text-slate-900">{title}</h3>}
      {subtitle && <p className="mt-2 text-sm text-slate-600">{subtitle}</p>}
      {children && <div className="mt-4 text-sm leading-relaxed text-slate-600">{children}</div>}
    </motion.div>
  )
);

export default Card;
