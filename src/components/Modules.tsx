import { MouseEvent, ReactNode } from 'react';
import { useMotionValue } from 'framer-motion';
import { QrCode, MapPin, LayoutDashboard, Settings } from 'lucide-react';
import Section from './Section';
import Container from './Container';
import MotionInView from './MotionInView';
import Card from './Card';
import Icon from './Icon';
import { fadeInUp, staggerContainer } from '../lib/animations';
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion';

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
  return (
    <Section id="cosa-proponiamo">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <MotionInView variants={fadeInUp}>
            <h2 className="heading-2">Perché scegliere noi</h2>
          </MotionInView>
          <MotionInView variants={fadeInUp} delay={0.1} className="subheading">
            Ogni modulo di VibeEats lavora in sinergia per garantire continuità tra esperienza in-loco e discovery digitale, con strumenti di gestione pronti all’uso.
          </MotionInView>
        </div>

        <MotionInView variants={staggerContainer} className="mt-12 grid gap-6 md:grid-cols-2">
          {modules.map((module) => (
            <ModuleCard key={module.title} module={module} prefersReducedMotion={prefersReducedMotion} />
          ))}
        </MotionInView>
      </Container>
    </Section>
  );
};

type ModuleCardProps = {
  module: ModuleDefinition;
  prefersReducedMotion: boolean;
};

const ModuleCard = ({ module, prefersReducedMotion }: ModuleCardProps) => {
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  const resetTilt = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  const handleMove = (event: MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion) return;
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
      variants={fadeInUp}
      whileHover={{ scale: prefersReducedMotion ? 1 : 1.01 }}
      transition={{ type: 'spring', stiffness: 200, damping: 24 }}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      onMouseMove={handleMove}
      onMouseLeave={resetTilt}
      className="hover:shadow-hover"
    >
      <div className="flex items-start gap-4">
        {module.icon}
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-secondary">{module.title}</h3>
          <p className="mt-3 text-sm text-muted">{module.subtitle}</p>
        </div>
      </div>
      <ul className="mt-5 space-y-2 text-left text-sm leading-relaxed text-muted">
        {module.bullets.map((bullet) => (
          <li key={bullet} className="flex items-start gap-2">
            <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" aria-hidden="true" />
            <span>{bullet}</span>
          </li>
        ))}
      </ul>
    </Card>
  );
};

export default Modules;
