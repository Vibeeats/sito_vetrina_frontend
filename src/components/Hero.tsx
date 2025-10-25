import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import Section from './Section';
import Container from './Container';
import Button from './Button';
import MotionInView from './MotionInView';
import { fadeInUp, staggerContainer, staggeredWords, blobTransition } from '../lib/animations';
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion';

const headline = 'La piattaforma unificata per l’esperienza ristorante';

const Hero = () => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const words = useMemo(() => headline.split(' '), []);
  const [parallaxOffset, setParallaxOffset] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const handleScroll = () => {
      const offset = window.scrollY;
      setParallaxOffset(Math.min(offset * 0.12, 32));
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prefersReducedMotion]);

  return (
    <Section id="home" className="relative overflow-hidden bg-hero-gradient pt-28">
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-70">
        <motion.div
          className="absolute -left-32 top-24 h-64 w-64 rounded-full bg-primary/25 blur-3xl"
          animate={prefersReducedMotion ? undefined : { y: ['0%', '-8%', '0%'] }}
          transition={blobTransition}
        />
        <motion.div
          className="absolute bottom-12 right-16 h-72 w-72 rounded-full bg-primary/15 blur-3xl"
          animate={prefersReducedMotion ? undefined : { y: ['0%', '8%', '0%'], x: ['0%', '-4%', '0%'] }}
          transition={{ ...blobTransition, duration: 18 }}
        />
      </div>

      <Container className="relative">
        <MotionInView variants={staggerContainer} className="flex flex-col items-center text-center">
          <MotionInView variants={fadeInUp} className="rounded-full border border-primary/30 bg-primary/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            VibeEats
          </MotionInView>

          <motion.h1
            className="mt-8 flex max-w-4xl flex-wrap justify-center gap-x-3 gap-y-2 text-center text-4xl font-semibold leading-tight text-slate-900 sm:text-5xl md:text-[3.2rem]"
            initial={prefersReducedMotion ? undefined : 'hidden'}
            animate="show"
            variants={staggerContainer}
          >
            {words.map((word, index) => (
              <motion.span
                key={`${word}-${index}`}
                className="inline-block"
                custom={index}
                variants={staggeredWords}
              >
                {word}
              </motion.span>
            ))}
          </motion.h1>

          <MotionInView variants={fadeInUp} className="mt-6 max-w-3xl text-base text-slate-600 sm:text-lg">
            QR al tavolo, menù digitale con chatbot, ordini e split bill; discovery e prenotazioni fuori-loco; pannello
            ristorante e strumenti di piattaforma.
          </MotionInView>

          <MotionInView variants={fadeInUp} delay={0.12} className="mt-10 flex flex-wrap justify-center gap-4">
            <Button href="#contatti" aria-label="Parla con noi">
              Parla con noi
            </Button>
            <Button href="#cosa-facciamo" variant="secondary" aria-label="Scopri cosa facciamo">
              Scopri cosa facciamo
            </Button>
          </MotionInView>
        </MotionInView>
      </Container>

      <motion.div
        className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center"
        style={{ translateY: prefersReducedMotion ? 0 : parallaxOffset * -0.5 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
      >
        <div className="h-40 w-[90%] max-w-4xl rounded-full bg-gradient-to-r from-white/40 via-primary/20 to-white/10 blur-3xl" />
      </motion.div>
    </Section>
  );
};

export default Hero;
