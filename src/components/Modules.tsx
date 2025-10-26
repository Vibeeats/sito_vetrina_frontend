import { MouseEvent, ReactNode } from 'react';
import { motion, useMotionValue } from 'framer-motion';
import { QrCode, MapPin, LayoutDashboard, Settings } from 'lucide-react';
import Section from './Section';
import Container from './Container';
import MotionInView from './MotionInView';
import Card from './Card';
import Icon from './Icon';
import { fadeInUp, staggerContainer } from '../lib/animations';
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion';
import useIsMobile from '../hooks/useIsMobile';

type ModuleDefinition = {
  title: string;
  subtitle: string;
  bullets: string[];
  icon: ReactNode;
};

const modules: ModuleDefinition[] = [
  {
    title: 'Tavolo Smart',
    subtitle: 'Dal QR al supporto AI immediato. Fatti consigliare, ordina e pagai in autonomia.',
    bullets: [
      'Menù digitale dinamico: categorie, varianti, allergeni e tag',
      'Chatbot in-loco, ordini e modifiche con stato comanda',
      'Conto, split bill, pagamento e feedback finale'
    ],
    icon: (
      <Icon>
        <QrCode className="h-5 w-5" aria-hidden="true" />
      </Icon>
    )
  },
  {
    title: 'Trova & Prenota',
    subtitle: 'Ricerca per gusti, zona e budget; “Thai per 4 alle 20” diventa confermato in pochi tap.',
    bullets: [
      'Ricerca per cucina, area, budget e preferenze alimentari',
      'Filtri avanzati e chatbot di discovery “Thai per 4 giovedì ore 20”',
      'Scheda ristorante con fasce prenotabili e gestione eventi'
    ],
    icon: (
      <Icon>
        <MapPin className="h-5 w-5" aria-hidden="true" />
      </Icon>
    )
  },
  {
    title: 'Governance',
    subtitle: 'Visione completa della sala e azioni veloci su ogni tavolo.',
    bullets: [
      'Menù e cataloghi, tavoli, turni e QR personalizzati',
      'Prenotazioni, comande e controllo sala in tempo reale',
      'Pagamenti, fiscalità, promozioni e reportistica integrata'
    ],
    icon: (
      <Icon>
        <LayoutDashboard className="h-5 w-5" aria-hidden="true" />
      </Icon>
    )
  },
  {
    title: 'Data Hub',
    subtitle: 'Dati unificati, insight quotidiani e suggerimenti data-driven.',
    bullets: [
      'Onboarding ristoranti e tassonomie comuni di cucine e allergeni',
      'Moderazione contenuti e controllo qualità',
      'Reportistica aggregata e insight per decisioni data-driven'
    ],
    icon: (
      <Icon>
        <Settings className="h-5 w-5" aria-hidden="true" />
      </Icon>
    )
  }
];

const Modules = () => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const isMobile = useIsMobile();
  const shouldReduceMotion = prefersReducedMotion || isMobile;
  return (
    <Section id="cosa-proponiamo" className="ai-section relative">
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-ai-grid opacity-40"
        animate={
          shouldReduceMotion
            ? undefined
            : { backgroundPosition: ['0% 100%', '100% 0%', '0% 100%'] }
        }
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        style={{ backgroundSize: '360px 360px, 24px 24px, 24px 24px' }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-6 top-24 h-[70%] rounded-full border border-accent/20"
        initial={{ opacity: 0, scaleY: 0.8 }}
        animate={shouldReduceMotion ? { opacity: 0.35, scaleY: 1 } : { opacity: [0.15, 0.4, 0.25], scaleY: [0.82, 1, 0.9] }}
        transition={{ duration: 16, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
      />
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <MotionInView variants={fadeInUp}>
            <h2 className="heading-2">Perché scegliere noi</h2>
          </MotionInView>
          <MotionInView variants={fadeInUp} delay={0.1} className="subheading">
            Ogni modulo di VibeEats lavora in sinergia per garantire continuità tra esperienza in-loco e discovery digitale, con strumenti di gestione pronti all’uso.
          </MotionInView>
        </div>

        {shouldReduceMotion ? (
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {modules.map((module) => (
              <ModuleCard key={module.title} module={module} shouldReduceMotion={shouldReduceMotion} />
            ))}
          </div>
        ) : (
          <MotionInView variants={staggerContainer} className="mt-12 grid gap-6 md:grid-cols-2">
            {modules.map((module) => (
              <ModuleCard key={module.title} module={module} shouldReduceMotion={shouldReduceMotion} />
            ))}
          </MotionInView>
        )}
      </Container>
    </Section>
  );
};

type ModuleCardProps = {
  module: ModuleDefinition;
  shouldReduceMotion: boolean;
};

const ModuleCard = ({ module, shouldReduceMotion }: ModuleCardProps) => {
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  const resetTilt = () => {
    if (shouldReduceMotion) return;
    rotateX.set(0);
    rotateY.set(0);
  };

  const handleMove = (event: MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - bounds.left;
    const y = event.clientY - bounds.top;
    const xRatio = (x / bounds.width) * 2 - 1;
    const yRatio = (y / bounds.height) * 2 - 1;
    const maxRotate = 6;
    rotateX.set(-yRatio * maxRotate);
    rotateY.set(xRatio * maxRotate);
  };

  return (
    <Card
      variants={shouldReduceMotion ? undefined : fadeInUp}
      whileHover={shouldReduceMotion ? undefined : { scale: 1.04 }}
      transition={shouldReduceMotion ? undefined : { type: 'spring', stiffness: 220, damping: 26 }}
      style={shouldReduceMotion ? undefined : { rotateX, rotateY, transformPerspective: 900 }}
      onMouseMove={shouldReduceMotion ? undefined : handleMove}
      onMouseLeave={shouldReduceMotion ? undefined : resetTilt}
      className="hover:shadow-hover"
    >
      <motion.span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-8 top-6 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent"
        initial={{ opacity: 0, scaleX: 0.5 }}
        animate={shouldReduceMotion ? { opacity: 0.45, scaleX: 1 } : { opacity: [0.2, 0.6, 0.3], scaleX: [0.6, 1, 0.8] }}
        transition={
          shouldReduceMotion ? { duration: 0.6, ease: 'easeOut' } : { duration: 12, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }
        }
      />
      <div className="flex items-start gap-4">
        {module.icon}
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-secondary">{module.title}</h3>
          <p className="mt-3 text-sm text-muted">{module.subtitle}</p>
        </div>
      </div>
      <ul className="mt-5 space-y-2 text-left text-sm leading-relaxed text-muted">
        {module.bullets.map((bullet) => (
          <li key={bullet} className="flex items-start gap-2 transition-transform duration-300 group-hover:translate-x-1">
            <span className="mt-1 h-1.5 w-1.5 rounded-full bg-gradient-to-br from-primary via-primary/70 to-accent shadow-[0_0_8px_rgba(104,22,24,0.45)] transition-transform duration-300 group-hover:scale-125" aria-hidden="true" />
            <span>{bullet}</span>
          </li>
        ))}
      </ul>
    </Card>
  );
};

export default Modules;
