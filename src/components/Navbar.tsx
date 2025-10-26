import { MouseEvent, useEffect, useState } from 'react';
import { AnimatePresence, motion, Variants } from 'framer-motion';
import logo from '../assets/logo-v3.png';
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion';
import useIsMobile from '../hooks/useIsMobile';
import { scrollToId } from '../utils/scrollTo';
import { cn } from '../utils/cn';
import { fadeInUp, hoverSpring } from '../lib/animations';
import type { LucideIcon } from 'lucide-react';
import { Menu, X, Home, ChefHat, Sparkles, HeartHandshake, BarChart3, Mail } from 'lucide-react';

const navItems: { id: string; label: string; icon: LucideIcon }[] = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'cosa-facciamo', label: 'Cosa facciamo', icon: ChefHat },
  { id: 'cosa-proponiamo', label: 'Cosa proponiamo', icon: Sparkles },
  { id: 'perche-vibeeats', label: 'Perché VibeEats', icon: HeartHandshake },
  { id: 'kpi', label: 'KPI', icon: BarChart3 },
  { id: 'contatti', label: 'Contatti', icon: Mail }
];

const linkVariants: Variants = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } }
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const isMobile = useIsMobile();
  const prefersReducedMotion = usePrefersReducedMotion();
  const shouldReduceMotion = prefersReducedMotion || isMobile;

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
    if (!isMobile && isOpen) {
      setIsOpen(false);
    }
  }, [isMobile, isOpen]);

  const handleNavigate = (id: string) => (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    setActiveSection(id);
    scrollToId(id);
    setIsOpen(false);
  };

  return (
    <motion.header
      initial={shouldReduceMotion ? undefined : 'hidden'}
      animate={shouldReduceMotion ? undefined : 'show'}
      variants={shouldReduceMotion ? undefined : fadeInUp}
      transition={shouldReduceMotion ? undefined : { duration: 0.4, ease: 'easeOut' }}
      className={cn(
        'fixed inset-x-0 top-0 z-50 border-b border-accent/30 transition-shadow duration-300',
        isMobile ? 'bg-surface/90' : 'bg-surface/70 backdrop-blur-2xl',
        isScrolled ? 'shadow-lg shadow-primary/20' : ''
      )}
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-surface via-white to-surface/85" />
        {!isMobile && (
          <>
            <motion.div
              className="pointer-events-none absolute inset-0 opacity-85 mix-blend-screen"
              style={{
                backgroundImage:
                  'radial-gradient(85% 115% at 12% 22%, rgba(104,22,24,0.35), transparent 65%), radial-gradient(90% 110% at 88% 45%, rgba(184,197,165,0.55), transparent 70%)',
                backgroundSize: '160% 160%'
              }}
              animate={
                prefersReducedMotion
                  ? undefined
                  : { backgroundPosition: ['0% 0%', '100% 60%', '0% 0%'] }
              }
              transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
              className="pointer-events-none absolute inset-0 opacity-45 mix-blend-screen"
              style={{
                backgroundImage:
                  'repeating-linear-gradient(115deg, rgba(255,255,255,0.0) 0px, rgba(255,255,255,0.0) 36px, rgba(104,22,24,0.18) 36px, rgba(104,22,24,0.18) 42px)'
              }}
              animate={
                prefersReducedMotion
                  ? undefined
                  : { backgroundPosition: ['0px 0px', '240px 180px', '0px 0px'] }
              }
              transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
            />
            <motion.div
              className="pointer-events-none absolute inset-y-[-38%] left-[-35%] w-[70%] bg-gradient-to-r from-transparent via-primary/55 to-transparent opacity-75 blur-2xl"
              animate={prefersReducedMotion ? undefined : { x: ['-25%', '120%', '-25%'] }}
              transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
              className="pointer-events-none absolute inset-y-[-45%] left-1/2 h-[230%] w-[26%] -translate-x-1/2 rounded-full bg-gradient-to-b from-white/10 via-white/75 to-white/10 opacity-75 blur-[90px]"
              animate={prefersReducedMotion ? undefined : { rotate: [-15, 15, -15] }}
              transition={{ duration: 24, repeat: Infinity, ease: 'easeInOut' }}
            />
          </>
        )}
      </div>
      <motion.div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent"
        initial={{ scaleX: 0 }}
        animate={shouldReduceMotion ? { scaleX: 1 } : { scaleX: [0, 1] }}
        transition={{ duration: shouldReduceMotion ? 0.6 : 1.2, ease: 'easeOut' }}
      />
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
                  'relative overflow-hidden rounded-full px-4 py-2 text-sm font-medium backdrop-blur-sm transition-colors xl:px-6 xl:py-3',
                  isActive ? 'text-primary' : 'text-muted hover:text-secondary'
                )}
                whileHover={{ scale: shouldReduceMotion ? 1 : 1.02 }}
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
          className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-accent/40 bg-gradient-to-br from-primary/85 via-secondary/80 to-primary/70 text-white shadow-soft transition lg:hidden"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label={isOpen ? 'Chiudi menu di navigazione' : 'Apri menu di navigazione'}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          whileHover={{ scale: shouldReduceMotion ? 1 : 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="sr-only">Menu</span>
          {isOpen ? (
            <X className="h-5 w-5" strokeWidth={1.6} aria-hidden="true" />
          ) : (
            <Menu className="h-5 w-5" strokeWidth={1.6} aria-hidden="true" />
          )}
        </motion.button>
      </div>
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              key="nav-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className={cn(
                'fixed inset-0 z-40 lg:hidden',
                isMobile ? 'bg-secondary/50' : 'bg-secondary/40 backdrop-blur-sm'
              )}
              onClick={() => setIsOpen(false)}
            />
            <motion.nav
              key="nav-panel"
              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -16 }}
              animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -16 }}
              transition={{ duration: shouldReduceMotion ? 0.2 : 0.25, ease: 'easeOut' }}
              className="fixed inset-x-4 top-[88px] z-50 lg:hidden"
            >
              <div
                className={cn(
                  'ai-section rounded-3xl border border-accent/40 p-5',
                  isMobile
                    ? 'bg-white shadow-md'
                    : 'bg-gradient-to-br from-surface via-white to-surface/90 shadow-hover'
                )}
              >
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-[0.3em] text-muted">Menu</span>
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-accent/30 text-primary transition hover:bg-accent/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    aria-label="Chiudi menu mobile"
                  >
                    <X className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
                <ul className="flex flex-col gap-3">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <motion.li
                        key={item.id}
                        initial={shouldReduceMotion ? false : 'hidden'}
                        animate={shouldReduceMotion ? undefined : 'show'}
                        exit={shouldReduceMotion ? undefined : 'hidden'}
                        variants={shouldReduceMotion ? undefined : linkVariants}
                        whileHover={shouldReduceMotion ? undefined : { x: 4 }}
                        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                      >
                        <a
                          href={`#${item.id}`}
                          onClick={handleNavigate(item.id)}
                          className={cn(
                            'flex items-center gap-4 rounded-2xl px-4 py-3 text-sm font-semibold text-secondary transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
                            isMobile ? 'bg-white shadow-sm' : 'bg-white/85 shadow-soft'
                          )}
                        >
                          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent/20 text-primary">
                            <Icon className="h-4 w-4" aria-hidden="true" />
                          </span>
                          <span>{item.label}</span>
                        </a>
                      </motion.li>
                    );
                  })}
                </ul>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;
