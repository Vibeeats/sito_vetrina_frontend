import { forwardRef } from 'react';
import { cn } from '../utils/cn';

type ContainerProps = React.HTMLAttributes<HTMLDivElement>;

const Container = forwardRef<HTMLDivElement, ContainerProps>(({ className, ...rest }, ref) => (
  <div ref={ref} className={cn('mx-auto w-full max-w-content px-4 sm:px-6', className)} {...rest} />
));

Container.displayName = 'Container';

export default Container;
