import { MouseEvent, useState } from 'react';
import { useMotionValue } from 'framer-motion';
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
  icon: (hovered: boolean) => JSX.Element;
};

const modules: ModuleDefinition[] = [
  {
    title: 'In-loco via QR',
    subtitle: 'Esperienza al tavolo con menù dinamico e flussi di pagamento integrati.',
    bullets: [
      'Menù digitale dinamico: categorie, varianti, allergeni e tag',
      'Chatbot in-loco, ordini e modifiche con stato comanda',
      'Conto, split bill, pagamento e feedback finale'
    ],
    icon: (hovered: boolean) => (
      <Icon hovered={hovered}>
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden="true">
          <path d="M6 2h8l6 6v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Zm7 7V3.5L17.5 9H13Z" />
        </svg>
      </Icon>
    )
  },
  {
    title: 'Fuori-loco (Discovery & Prenotazioni)',
    subtitle: 'Ricerca smart e prenotazioni rapide, anche per gruppi ed eventi.',
    bullets: [
      'Ricerca per cucina, area, budget e preferenze alimentari',
      'Filtri avanzati e chatbot di discovery “Thai per 4 giovedì ore 20”',
      'Scheda ristorante con fasce prenotabili e gestione eventi'
    ],
    icon: (hovered: boolean) => (
      <Icon hovered={hovered}>
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden="true">
          <path d="M11 2v5l2 1 2-1V2h2v6.5L13 11l-4-2.5V2h2Zm10 9v11h-2v-2h-4v2H5V11h16Zm-6 2h-4v2h4v-2Zm4 0h-2v2h2v-2Zm-12 0v7h4v-7H7Z" />
        </svg>
      </Icon>
    )
  },
  {
    title: 'Pannello Ristorante',
    subtitle: 'Gli strumenti per orchestrare sala, menù e relazioni con i clienti.',
    bullets: [
      'Menù e cataloghi, tavoli, turni e QR personalizzati',
      'Prenotazioni, comande e controllo sala in tempo reale',
      'Pagamenti, fiscalità, promozioni e reportistica integrata'
    ],
    icon: (hovered: boolean) => (
      <Icon hovered={hovered}>
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden="true">
          <path d="M4 3h16a2 2 0 0 1 2 2v4H2V5a2 2 0 0 1 2-2Zm-2 8h20v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-8Zm6 2v4h4v-4H8Zm6 0v2h4v-2h-4Zm0 3v1h4v-1h-4Z" />
        </svg>
      </Icon>
    )
  },
  {
    title: 'Pannello Piattaforma',
    subtitle: 'Governance e crescita dell’ecosistema VibeEats.',
    bullets: [
      'Onboarding ristoranti e tassonomie comuni di cucine e allergeni',
      'Moderazione contenuti e controllo qualità',
      'Reportistica aggregata e insight per decisioni data-driven'
    ],
    icon: (hovered: boolean) => (
      <Icon hovered={hovered}>
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden="true">
          <path d="M12 2 2 7l10 5 8-4v8h2V7L12 2Zm-6 9v6h4v-4l-4-2Zm10 1-4 2v5h4v-7Z" />
        </svg>
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
            <h2 className="heading-2">Cosa proponiamo</h2>
          </MotionInView>
          <MotionInView variants={fadeInUp} delay={0.1} className="subheading">
            Ogni modulo di VibeEats lavora in sinergia per garantire continuità tra esperienza in-loco e discovery
            digitale, con strumenti di gestione pronti all’uso.
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
  const [hovered, setHovered] = useState(false);

  const resetTilt = () => {
    rotateX.set(0);
    rotateY.set(0);
    setHovered(false);
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
      onHoverStart={() => setHovered(true)}
      onHoverEnd={resetTilt}
      className="hover:shadow-hover"
    >
      {module.icon(hovered)}
      <h3 className="text-lg font-semibold text-slate-900">{module.title}</h3>
      <p className="mt-3 text-sm text-slate-600">{module.subtitle}</p>
      <ul className="mt-4 space-y-2 text-left text-sm leading-relaxed text-slate-600">
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
