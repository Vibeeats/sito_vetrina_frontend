import { motion } from 'framer-motion';
import Section from './Section';
import Container from './Container';
import Button from './Button';
import MotionInView from './MotionInView';
import { scaleIn, fadeInUp } from '../lib/animations';
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion';

const Cta = () => {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <Section aria-labelledby="cta-title">
      <Container>
        <MotionInView
          variants={scaleIn}
          className="ai-section relative overflow-hidden rounded-[2.75rem] bg-gradient-to-r from-primary via-secondary to-muted px-6 py-16 text-center text-white shadow-soft sm:px-12"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(249,245,235,0.35),transparent_55%)] opacity-60" aria-hidden="true" />
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-ai-grid opacity-20"
            animate={
              prefersReducedMotion
                ? undefined
                : { backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'] }
            }
            transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
            style={{ backgroundSize: '420px 420px, 28px 28px, 28px 28px' }}
          />
          <motion.div
            aria-hidden="true"
            className="absolute inset-x-12 top-6 rounded-full border border-white/20"
            initial={{ opacity: 0, scaleY: 0.8 }}
            animate={prefersReducedMotion ? { opacity: 0.5, scaleY: 1 } : { opacity: [0.2, 0.6, 0.35], scaleY: [0.85, 1, 0.92] }}
            transition={{ duration: 16, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
          />
          <div className="relative flex flex-col items-center gap-6">
            <h2 id="cta-title" className="text-3xl font-semibold sm:text-4xl">
              Porta il tuo ristorante al livello successivo
            </h2>
            <MotionInView variants={fadeInUp} className="max-w-2xl text-base text-white/80 sm:text-lg">
              Dalla prima scoperta al pagamento, VibeEats orchestra ogni momento dell’esperienza ospite e supporta il
              tuo team con strumenti operativi pronti all’uso.
            </MotionInView>
            <div className="mt-4 flex flex-wrap justify-center gap-4 text-sm">
              <Button href="#contatti" aria-label="Richiedi una demo di VibeEats">
                Richiedi una demo
              </Button>
              <Button href="mailto:info@vibeeats.ai" variant="secondary" aria-label="Scrivici via email">
                Scrivici
              </Button>
            </div>
          </div>
        </MotionInView>
      </Container>
    </Section>
  );
};

export default Cta;
