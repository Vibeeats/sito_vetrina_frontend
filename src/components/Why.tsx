import Section from './Section';
import Container from './Container';
import MotionInView from './MotionInView';
import { fadeInUp, slideInY, staggerContainer } from '../lib/animations';

const evidences = [
  {
    title: 'Meno attriti e tempi d’attesa',
    description:
      'Flow guidati e self-service controllato abbattono code al conto e tempo tra seduta e primo ordine.'
  },
  {
    title: 'Scelte consapevoli e inclusive',
    description:
      'Allergeni, diete e preferenze sono sempre visibili e filtrabili, con suggerimenti contestuali del chatbot.'
  },
  {
    title: 'Servizio migliore e personalizzato',
    description:
      'Team di sala informato in tempo reale, insight su preferenze e feedback immediato chiudono il loop di servizio.'
  }
];

const Why = () => {
  return (
    <div className="relative bg-gradient-to-b from-white to-slate-50">
      <div className="absolute inset-x-0 -top-20 overflow-hidden" aria-hidden="true">
        <svg className="h-24 w-full text-slate-50" viewBox="0 0 1440 160" preserveAspectRatio="none">
          <path fill="currentColor" d="M0 160V40c120-32 240-48 360-40s240 40 360 40 240-32 360-40 240 8 360 40v120H0Z" />
        </svg>
      </div>
      <Section id="perche-vibeeats" className="relative">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <MotionInView variants={fadeInUp}>
              <h2 className="heading-2">Perché VibeEats</h2>
            </MotionInView>
            <MotionInView variants={fadeInUp} delay={0.1} className="subheading">
              Trasformiamo l’esperienza ristorante in un percorso fluido per ospiti e team, con metriche che parlano.
            </MotionInView>
          </div>

          <MotionInView variants={staggerContainer} className="mt-12 grid gap-6 md:grid-cols-3">
            {evidences.map((item) => (
              <MotionInView
                key={item.title}
                variants={slideInY}
                className="rounded-3xl border border-primary/15 bg-white/90 p-6 text-left shadow-soft"
              >
                <h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{item.description}</p>
              </MotionInView>
            ))}
          </MotionInView>
        </Container>
      </Section>
      <div className="absolute inset-x-0 -bottom-24 overflow-hidden" aria-hidden="true">
        <svg className="h-24 w-full text-slate-50" viewBox="0 0 1440 160" preserveAspectRatio="none">
          <path fill="currentColor" d="M0 0v120c120 32 240 48 360 40s240-40 360-40 240 32 360 40 240-8 360-40V0H0Z" />
        </svg>
      </div>
    </div>
  );
};

export default Why;
