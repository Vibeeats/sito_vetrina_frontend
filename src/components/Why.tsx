import { motion } from 'framer-motion';
import Section from './Section';
import Container from './Container';
import MotionInView from './MotionInView';
import { fadeInUp, slideInY, staggerContainer } from '../lib/animations';

import Icon from './Icon';
import { Timer, ShieldCheck, Smile } from 'lucide-react';
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion';
import useIsMobile from '../hooks/useIsMobile';

const evidences = [
  {
    title: 'Meno attriti e tempi d’attesa',
    description:
      'Flow guidati e self-service controllato abbattono code al conto e tempo tra seduta e primo ordine.',
    icon: (
      <Icon>
        <Timer className="h-5 w-5" aria-hidden="true" />
      </Icon>
    )
  },
  {
    title: 'Scelte consapevoli e inclusive',
    description:
      'Allergeni, diete e preferenze sono sempre visibili e filtrabili, con suggerimenti contestuali del chatbot.',
    icon: (
      <Icon>
        <ShieldCheck className="h-5 w-5" aria-hidden="true" />
      </Icon>
    )
  },
  {
    title: 'Servizio migliore e personalizzato',
    description:
      'Team di sala informato in tempo reale, insight su preferenze e feedback immediato chiudono il loop di servizio.',
    icon: (
      <Icon>
        <Smile className="h-5 w-5" aria-hidden="true" />
      </Icon>
    )
  }
];

const Why = () => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const isMobile = useIsMobile();
  const shouldReduceMotion = prefersReducedMotion || isMobile;

  return (
    <div className="relative bg-gradient-to-b from-surface to-accent/30 py-14 sm:py-16">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <motion.div
          aria-hidden="true"
          className="absolute inset-0 bg-ai-grid opacity-40"
          animate={
            shouldReduceMotion
              ? undefined
              : { backgroundPosition: ['0% 0%', '100% 0%', '0% 0%'] }
          }
          transition={{ duration: 26, repeat: Infinity, ease: 'linear' }}
          style={{ backgroundSize: '360px 360px, 24px 24px, 24px 24px' }}
        />
        <div className="absolute left-6 top-16 h-40 w-40 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute right-10 bottom-10 h-48 w-48 rounded-full bg-accent/30 blur-3xl" />
        <motion.div
          aria-hidden="true"
          className="absolute inset-x-0 top-1/3 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent"
          initial={{ opacity: 0 }}
          animate={shouldReduceMotion ? { opacity: 0.45 } : { opacity: [0.2, 0.6, 0.3] }}
          transition={{ duration: shouldReduceMotion ? 0.6 : 12, repeat: shouldReduceMotion ? undefined : Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
        />
      </div>
      <Section id="perche-vibeeats" className="ai-section relative">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <MotionInView variants={fadeInUp}>
              <h2 className="heading-2">Perché VibeEats</h2>
            </MotionInView>
            <MotionInView variants={fadeInUp} delay={0.1} className="subheading">
              Trasformiamo l’esperienza ristorante in un percorso fluido per ospiti e team, con metriche che parlano.
            </MotionInView>
          </div>

          {shouldReduceMotion ? (
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {evidences.map((item) => (
                <div
                  key={item.title}
                  className="ai-card relative overflow-hidden rounded-3xl border border-accent/30 bg-white p-6 text-left shadow-sm"
                >
                  <span className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-transparent" aria-hidden="true" />
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-40"
                  />
                  <div className="relative flex items-start gap-4">
                    <div className="shrink-0">{item.icon}</div>
                    <div>
                      <h3 className="text-lg font-semibold text-secondary">{item.title}</h3>
                      <p className="mt-3 text-sm leading-relaxed text-muted">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <MotionInView variants={staggerContainer} className="mt-12 grid gap-6 md:grid-cols-3">
              {evidences.map((item) => (
                <MotionInView
                  key={item.title}
                  variants={slideInY}
                  className="group ai-card relative overflow-hidden rounded-3xl border border-accent/30 bg-white/95 p-6 text-left shadow-soft transition-transform duration-300 hover:-translate-y-1 hover:shadow-hover"
                >
                  <span className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" aria-hidden="true" />
                  <motion.span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 0.55 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                  />
                  <div className="relative flex items-start gap-4">
                    <div className="shrink-0">{item.icon}</div>
                    <div>
                      <h3 className="text-lg font-semibold text-secondary">{item.title}</h3>
                      <p className="mt-3 text-sm leading-relaxed text-muted">{item.description}</p>
                    </div>
                  </div>
                </MotionInView>
              ))}
            </MotionInView>
          )}
        </Container>
      </Section>
    </div>
  );
};

export default Why;
