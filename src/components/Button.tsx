import { forwardRef, Ref, ReactNode } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '../utils/cn';
import { hoverSpring } from '../lib/animations';

type ButtonVariant = 'primary' | 'secondary';

type ButtonProps = {
  variant?: ButtonVariant;
  className?: string;
  href?: string;
  children?: ReactNode;
} & (
  | ({ href?: undefined } & HTMLMotionProps<'button'>)
  | ({ href: string } & HTMLMotionProps<'a'>)
);

const baseClasses =
  'group relative inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 transition-colors';

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-primary text-white shadow-soft hover:bg-primary/90 focus-visible:ring-primary',
  secondary:
    'bg-accent text-secondary border border-accent/40 shadow-soft backdrop-blur hover:bg-accent/90 focus-visible:ring-primary'
};

const MotionButton = motion.button;
const MotionAnchor = motion.a;

const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  ({ variant = 'primary', className, href, children, ...rest }, ref) => {
    if (href) {
      const motionAnchorProps = rest as HTMLMotionProps<'a'>;

      return (
        <MotionAnchor
          ref={ref as Ref<HTMLAnchorElement>}
          href={href}
          className={cn(baseClasses, variantClasses[variant], className)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={hoverSpring}
          {...motionAnchorProps}
        >
          <span className="relative z-10 flex items-center gap-2">{children}</span>
          <span
            className="pointer-events-none absolute inset-0 rounded-full bg-white/20 opacity-0 transition-opacity duration-300 group-hover:opacity-40"
            aria-hidden="true"
          />
        </MotionAnchor>
      );
    }

    const motionButtonProps = rest as HTMLMotionProps<'button'>;

    return (
      <MotionButton
        ref={ref as Ref<HTMLButtonElement>}
        className={cn(baseClasses, variantClasses[variant], className)}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={hoverSpring}
        {...motionButtonProps}
      >
        <span className="relative z-10 flex items-center gap-2">{children}</span>
        <span
          className="pointer-events-none absolute inset-0 rounded-full bg-white/20 opacity-0 transition-opacity duration-300 group-hover:opacity-40"
          aria-hidden="true"
        />
      </MotionButton>
    );
  }
);

Button.displayName = 'Button';

export default Button;
