import { motion } from 'framer-motion';
import Section from './Section';
import Container from './Container';
import Button from './Button';
import MotionInView from './MotionInView';
import { fadeInUp, scaleIn } from '../lib/animations';
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion';

const Contact = () => {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <Section id="contatti" className="ai-section relative">
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-ai-grid opacity-40"
        animate={
          prefersReducedMotion
            ? undefined
            : { backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }
        }
        transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
        style={{ backgroundSize: '340px 340px, 22px 22px, 22px 22px' }}
      />
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <MotionInView variants={fadeInUp}>
            <h2 className="heading-2">Contattaci</h2>
          </MotionInView>
          <MotionInView variants={fadeInUp} delay={0.1} className="subheading">
            Raccontaci il tuo contesto e ricevi una demo guidata su come VibeEats può aiutare il tuo ristorante.
          </MotionInView>
        </div>

        <MotionInView
          variants={scaleIn}
          className="ai-card mx-auto mt-12 max-w-2xl overflow-hidden rounded-3xl border border-accent/30 bg-white/95 p-8 text-center shadow-soft backdrop-blur-sm"
        >
          <motion.span
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-10 top-8 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.45 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          />
          <p className="text-sm leading-relaxed text-muted">
            Preferiamo ascoltarti direttamente per costruire una demo su misura: inviaci un’email e raccontaci cosa vuoi
            migliorare nella tua esperienza ristorante.
          </p>
          <div className="mt-8 flex flex-col items-center gap-3 text-sm text-muted">
            <span className="font-semibold text-secondary">Email diretta</span>
            <a href="mailto:info@vibeeats.ai" className="text-primary hover:underline">
              info@vibeeats.ai
            </a>
          </div>
          <div className="mt-8">
            <Button href="mailto:info@vibeeats.ai" aria-label="Apri il client di posta per contattare VibeEats">
              Scrivici ora
            </Button>
          </div>
        </MotionInView>
      </Container>
    </Section>
  );
};

export default Contact;
