import { motion } from 'framer-motion';
import Section from './Section';
import Container from './Container';
import MotionInView from './MotionInView';
import { fadeInUp, scaleIn, staggerContainer } from '../lib/animations';
import { kpiMetrics } from '../lib/kpi';
import useCountUp from '../hooks/useCountUp';
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion';

const Kpi = () => {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <Section id="kpi" className="ai-section relative">
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-ai-grid opacity-40"
        animate={
          prefersReducedMotion
            ? undefined
            : { backgroundPosition: ['0% 50%', '100% 60%', '0% 50%'] }
        }
        transition={{ duration: 32, repeat: Infinity, ease: 'linear' }}
        style={{ backgroundSize: '360px 360px, 24px 24px, 24px 24px' }}
      />
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <MotionInView variants={fadeInUp}>
            <h2 className="heading-2">KPI indicativi</h2>
          </MotionInView>
          <MotionInView variants={fadeInUp} delay={0.1} className="subheading">
            Misuriamo l’impatto su tempi, conversioni e soddisfazione per crescere con dati concreti.
          </MotionInView>
        </div>

        <MotionInView variants={staggerContainer} className="mt-12 grid gap-6 sm:grid-cols-2">
          {kpiMetrics.map((metric) => (
            <KpiCard key={metric.label} metric={metric} />
          ))}
        </MotionInView>

        <MotionInView variants={fadeInUp} delay={0.15} className="mt-10 text-center text-sm font-medium text-primary">
          KPI personalizzabili in base al modello e alle priorità del tuo ristorante.
        </MotionInView>
      </Container>
    </Section>
  );
};

type KpiCardProps = {
  metric: (typeof kpiMetrics)[number];
};

const KpiCard = ({ metric }: KpiCardProps) => {
  const { value, start } = useCountUp({ to: metric.target });

  return (
    <MotionInView
      variants={scaleIn}
      className="ai-card flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-accent/25 bg-white/95 p-8 text-left shadow-soft backdrop-blur-sm hover:shadow-hover"
      onViewportEnter={start}
    >
      <motion.span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-6 top-8 h-px bg-gradient-to-r from-transparent via-primary/45 to-transparent"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.5 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      />
      <div>
        <span className="text-xs font-semibold uppercase tracking-wide text-primary/80">{metric.label}</span>
        <p className="mt-5 text-4xl font-semibold text-secondary">
          {metric.prefix}
          {value}
          {metric.suffix}
        </p>
        <p className="mt-3 text-sm leading-relaxed text-muted">{metric.description}</p>
      </div>
    </MotionInView>
  );
};

export default Kpi;
