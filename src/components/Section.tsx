import { forwardRef } from 'react';
import { cn } from '../utils/cn';

type SectionProps = React.HTMLAttributes<HTMLElement>;

const Section = forwardRef<HTMLElement, SectionProps>(({ className, ...rest }, ref) => (
  <section ref={ref} className={cn('section-padding', className)} {...rest} />
));

Section.displayName = 'Section';

export default Section;
