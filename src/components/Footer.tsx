import { MouseEvent } from 'react';
import Container from './Container';
import { scrollToId } from '../utils/scrollTo';

const links = [
  { id: 'home', label: 'Home' },
  { id: 'cosa-facciamo', label: 'Cosa facciamo' },
  { id: 'cosa-proponiamo', label: 'Cosa proponiamo' },
  { id: 'perche-vibeeats', label: 'Perché VibeEats' },
  { id: 'kpi', label: 'KPI' },
  { id: 'contatti', label: 'Contatti' }
];

const Footer = () => {
  const year = new Date().getFullYear();

  const handleClick = (id: string) => (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    scrollToId(id);
  };

  return (
    <footer className="relative bg-gradient-to-r from-secondary via-secondary/95 to-secondary text-surface">
      <Container className="section-padding flex flex-col gap-10 md:flex-row md:items-center md:justify-between">
        <div className="space-y-3">
          <p className="text-lg font-semibold text-surface">VibeEats</p>
          <p className="max-w-md text-sm text-surface/80">
            Strumenti digitali per ristoranti connessi e ospiti soddisfatti, dalla sala alla piattaforma.
          </p>
          <p className="text-xs text-surface/60">© {year} VibeEats. Tutti i diritti riservati.</p>
        </div>
        <nav className="flex flex-wrap gap-4 text-sm font-medium text-surface/80">
          {links.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={handleClick(link.id)}
              className="group relative overflow-hidden px-1 py-1 transition-colors hover:text-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-secondary"
            >
              <span>{link.label}</span>
              <span className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-surface transition-transform duration-300 ease-out group-hover:scale-x-100" aria-hidden="true" />
            </a>
          ))}
        </nav>
      </Container>
    </footer>
  );
};

export default Footer;
