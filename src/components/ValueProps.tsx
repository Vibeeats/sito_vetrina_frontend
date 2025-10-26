import { Smartphone, ShieldCheck, TrendingUp, Search } from 'lucide-react';
import { motion } from 'framer-motion';
import Section from './Section';
import Container from './Container';
import MotionInView from './MotionInView';
import Card from './Card';
import Icon from './Icon';
import { fadeInUp, perspectiveFade, staggerContainer } from '../lib/animations';
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion';

const valueProps = [
  {
    title: 'Ordini e pagamenti dal tavolo',
    subtitle: 'Menu via QR, esperienza intuitiva. I clienti ordinano e pagano quando vogliono: lo staff si dedica all’ospitalità.',
    icon: (
      <Icon>
        <Smartphone className="h-5 w-5" aria-hidden="true" />
      </Icon>
    )
  },
  {
    title: 'Trasparenza, diete e allergeni',
    subtitle: 'Ingredienti, diete e allergeni sempre visibili. Regole automatiche evitano combinazioni sbagliate',
    icon: (
      <Icon>
        <ShieldCheck className="h-5 w-5" aria-hidden="true" />
      </Icon>
    )
  },
  {
    title: 'Scontrino medio in crescita',
    subtitle: 'Suggerimenti intelligenti e abbinamenti food & wine portano gli extra al momento giusto. Aumento medio: +18%.',
    icon: (
      <Icon>
        <TrendingUp className="h-5 w-5" aria-hidden="true" />
      </Icon>
    )
  },
  {
    title: 'Prenotazioni in 2 tap',
    subtitle: 'Ricerca, filtri e conferme automatiche. Dalla scoperta alla prenotazione senza telefonate né attese.',
    icon: (
      <Icon>
        <Search className="h-5 w-5" aria-hidden="true" />
      </Icon>
    )
  }
];

const ValueProps = () => {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <Section id="cosa-facciamo" className="ai-section relative">
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-ai-grid opacity-40"
        animate={
          prefersReducedMotion
            ? undefined
            : { backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'] }
        }
        transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
        style={{ backgroundSize: '320px 320px, 22px 22px, 22px 22px' }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-28 hidden h-[65%] w-px -translate-x-1/2 bg-gradient-to-b from-primary/0 via-primary/40 to-primary/0 sm:block"
        initial={{ opacity: 0 }}
        animate={prefersReducedMotion ? { opacity: 0.35 } : { opacity: [0.1, 0.45, 0.25] }}
        transition={{ duration: 18, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
      />

      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <MotionInView variants={fadeInUp}>
            <h2 className="heading-2">Il ristorante, potenziato.</h2>
          </MotionInView>
          <MotionInView variants={fadeInUp} delay={0.1} className="subheading">
            Dal QR al conto: un’unica app che automatizza ordini, allergeni, pagamenti e prenotazioni. Meno errori, margini che crescono.
          </MotionInView>
        </div>

        <MotionInView variants={staggerContainer} className="mt-12 grid gap-6 sm:grid-cols-2">
          {valueProps.map((item) => (
            <Card
              key={item.title}
              variants={perspectiveFade}
              whileHover={{ y: -8, scale: prefersReducedMotion ? 1 : 1.02 }}
              transition={{ type: 'spring', stiffness: 220, damping: 24 }}
              className="hover:shadow-hover"
            >
              <div className="flex items-start gap-4">
                {item.icon}
                <div>
                  <h3 className="text-lg font-semibold text-secondary">{item.title}</h3>
                  <p className="mt-3 text-sm text-muted">{item.subtitle}</p>
                </div>
              </div>
            </Card>
          ))}
        </MotionInView>
      </Container>
    </Section>
  );
};

export default ValueProps;
