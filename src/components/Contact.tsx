import { FormEvent, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Section from './Section';
import Container from './Container';
import Button from './Button';
import MotionInView from './MotionInView';
import { fadeInUp, scaleIn } from '../lib/animations';
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion';

const Contact = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    form.reset();
    setIsSubmitted(true);
    window.setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <Section id="contatti">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <MotionInView variants={fadeInUp}>
            <h2 className="heading-2">Contattaci</h2>
          </MotionInView>
          <MotionInView variants={fadeInUp} delay={0.1} className="subheading">
            Raccontaci il tuo contesto e ricevi una demo guidata su come VibeEats può aiutare il tuo ristorante.
          </MotionInView>
        </div>

        <div className="relative mt-12 flex justify-center">
          <AnimatePresence>
            {isSubmitted && (
              <motion.div
                initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.92 }}
                animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, scale: 1 }}
                exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                role="status"
                aria-live="polite"
                className="absolute -top-12 z-20 inline-flex items-center gap-3 rounded-full border border-primary/30 bg-white/90 px-5 py-2 text-sm font-semibold text-primary shadow-soft"
              >
                <span className="inline-flex h-2 w-2 rounded-full bg-primary" aria-hidden="true" />
                Messaggio inviato! Ti ricontatteremo presto.
              </motion.div>
            )}
          </AnimatePresence>

          <MotionInView
            as={motion.form}
            variants={scaleIn}
            onSubmit={handleSubmit}
            className="w-full max-w-2xl rounded-3xl border border-white/70 bg-white/95 p-8 shadow-soft backdrop-blur"
          >
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="flex flex-col text-left">
                <label htmlFor="nome" className="text-sm font-semibold text-slate-700">
                  Nome e cognome
                </label>
                <input
                  id="nome"
                  name="nome"
                  type="text"
                  required
                  placeholder="Es. Martina Rossi"
                  className="mt-2 rounded-2xl border border-slate-200/70 bg-white px-4 py-3 text-sm text-slate-900 shadow-inner focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/60"
                />
              </div>
              <div className="flex flex-col text-left">
                <label htmlFor="email" className="text-sm font-semibold text-slate-700">
                  Email di contatto
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="Es. ciao@ristorante.it"
                  className="mt-2 rounded-2xl border border-slate-200/70 bg-white px-4 py-3 text-sm text-slate-900 shadow-inner focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/60"
                />
              </div>
            </div>
            <div className="mt-6 flex flex-col text-left">
              <label htmlFor="messaggio" className="text-sm font-semibold text-slate-700">
                Messaggio
              </label>
              <textarea
                id="messaggio"
                name="messaggio"
                rows={5}
                required
                placeholder="Es. Descrivi il tuo ristorante e cosa vuoi migliorare."
                className="mt-2 rounded-2xl border border-slate-200/70 bg-white px-4 py-3 text-sm text-slate-900 shadow-inner focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/60"
              />
            </div>
            <div className="mt-8 flex flex-wrap items-center justify-between gap-4 text-sm text-slate-600">
              <span>Preferisci scriverci direttamente? hello@vibeeats.com</span>
              <Button type="submit" aria-label="Invia il messaggio di contatto">
                Invia messaggio
              </Button>
            </div>
          </MotionInView>
        </div>
      </Container>
    </Section>
  );
};

export default Contact;
