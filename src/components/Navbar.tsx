import { MouseEvent, useEffect, useState } from 'react';
import { AnimatePresence, motion, Variants } from 'framer-motion';
import logo from '../assets/logo.svg';
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
      if (window.innerWidth >= 768) {
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
        'fixed inset-x-0 top-0 z-50 border-b border-white/40 bg-white/70 backdrop-blur-xl transition-shadow duration-300',
        isScrolled ? 'shadow-lg shadow-primary/15' : ''
      )}
    >
      <div className="mx-auto flex w-full max-w-content items-center justify-between px-4 py-5 sm:px-6">
        <a href="#home" className="flex items-center gap-3" onClick={handleNavigate('home')} aria-label="Home VibeEats">
          <img src={logo} alt="Logo VibeEats" className="h-10 w-auto" />
          <span className="text-xl font-semibold text-slate-900">VibeEats</span>
        </a>
        <nav className="hidden items-center gap-3 md:flex">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <motion.a
                key={item.id}
                href={`#${item.id}`}
                onClick={handleNavigate(item.id)}
                className={cn(
                  'relative overflow-hidden rounded-full px-5 py-2.5 text-sm font-medium text-slate-600 transition-colors',
                  isActive ? 'text-primary' : 'hover:text-primary'
                )}
                whileHover={{ scale: prefersReducedMotion ? 1 : 1.02 }}
                transition={hoverSpring}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-indicator"
                    className="absolute inset-0 rounded-full bg-primary/10"
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
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/40 bg-white/80 text-slate-700 shadow-soft transition md:hidden"
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
            className="md:hidden"
          >
            <ul className="mx-4 mb-4 flex flex-col gap-2 rounded-3xl border border-white/60 bg-white/85 p-4 shadow-soft backdrop-blur">
              {navItems.map((item) => (
                <motion.li key={item.id} variants={prefersReducedMotion ? undefined : linkVariants}>
                  <a
                    href={`#${item.id}`}
                    onClick={handleNavigate(item.id)}
                    className="block rounded-2xl px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-primary/10 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
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
