import { MouseEvent, useEffect, useState } from 'react';
import { AnimatePresence, motion, Variants } from 'framer-motion';
import logo from '../assets/logo-v3.png';
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion';
import { scrollToId } from '../utils/scrollTo';
import { cn } from '../utils/cn';
import { fadeInUp, hoverSpring } from '../lib/animations';

const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'cosa-facciamo', label: 'Cosa facciamo' },
  { id: 'cosa-proponiamo', label: 'Cosa proponiamo' },
  { id: 'perche-vibeeats', label: 'Perché VibeEats' },
  { id: 'kpi', label: 'KPI' },
  { id: 'contatti', label: 'Contatti' }
];

const menuVariants: Variants = {
  hidden: { opacity: 0, y: -16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: 'easeOut', staggerChildren: 0.05 }
  }
};

const linkVariants: Variants = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } }
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const sections = navItems
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.4, rootMargin: '-40% 0px -45% 0px' }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const onResize = () => {
      if (window.innerWidth >= 1024) {
        setIsOpen(false);
      }
    };

    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [isOpen]);

  const handleNavigate = (id: string) => (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    setActiveSection(id);
    scrollToId(id);
    setIsOpen(false);
  };

  return (
    <motion.header
      initial="hidden"
      animate="show"
      variants={fadeInUp}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className={cn(
        'fixed inset-x-0 top-0 z-50 border-b border-accent/40 bg-surface/90 backdrop-blur-xl transition-shadow duration-300',
        isScrolled ? 'shadow-lg shadow-primary/20' : ''
      )}
    >
      <div className="mx-auto flex w-full max-w-content items-center justify-between px-4 py-6 sm:px-8">
        <a href="#home" className="flex items-center gap-4" onClick={handleNavigate('home')} aria-label="Home VibeEats">
          <img src={logo} alt="Logo VibeEats" className="h-12 w-auto sm:h-14" />
          <span className="text-2xl font-semibold text-secondary">VibeEats</span>
        </a>
        <nav className="hidden items-center gap-3 text-muted text-sm xl:gap-4 xl:text-base lg:flex">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <motion.a
                key={item.id}
                href={`#${item.id}`}
                onClick={handleNavigate(item.id)}
                className={cn(
                  'relative overflow-hidden rounded-full px-4 py-2 text-sm font-medium transition-colors xl:px-6 xl:py-3',
                  isActive ? 'text-primary' : 'text-muted hover:text-secondary'
                )}
                whileHover={{ scale: prefersReducedMotion ? 1 : 1.02 }}
                transition={hoverSpring}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-indicator"
                    className="absolute inset-0 rounded-full bg-accent/60"
                    transition={{ type: 'spring', stiffness: 320, damping: 28 }}
                    aria-hidden="true"
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </motion.a>
            );
          })}
        </nav>
        <motion.button
          type="button"
          className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-accent/40 bg-surface/90 text-secondary shadow-soft transition lg:hidden"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label={isOpen ? 'Chiudi menu di navigazione' : 'Apri menu di navigazione'}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        >
          <span className="sr-only">Menu</span>
          <svg className="h-5 w-5" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" fill="none">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 6 18 18M18 6 6 18" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M4 12h16M4 17h12" />
            )}
          </svg>
        </motion.button>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            initial={prefersReducedMotion ? false : 'hidden'}
            animate="show"
            exit="hidden"
            variants={prefersReducedMotion ? undefined : menuVariants}
            className="lg:hidden"
          >
            <ul className="mx-4 mb-4 flex flex-col gap-3 rounded-3xl border border-accent/50 bg-surface/95 p-5 shadow-soft backdrop-blur text-base">
              {navItems.map((item) => (
                <motion.li key={item.id} variants={prefersReducedMotion ? undefined : linkVariants}>
                  <a
                    href={`#${item.id}`}
                    onClick={handleNavigate(item.id)}
                    className="block rounded-2xl px-4 py-3 text-sm font-semibold text-muted transition hover:bg-accent/40 hover:text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  >
                    {item.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;
