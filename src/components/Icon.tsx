import { ReactNode } from 'react';
import { cn } from '../utils/cn';

type IconProps = {
  children: ReactNode;
  className?: string;
};

const Icon = ({ children, className }: IconProps) => (
  <div
    className={cn(
      'ai-icon relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl bg-primary/10 text-primary shadow-soft backdrop-blur-sm transition-transform duration-300 animate-pulse-glow group-hover:scale-105 group-hover:shadow-hover/40',
      className
    )}
  >
    {children}
  </div>
);

export default Icon;
