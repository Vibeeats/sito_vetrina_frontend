import Section from './Section';
import Container from './Container';
import Button from './Button';
import MotionInView from './MotionInView';
import { scaleIn, fadeInUp } from '../lib/animations';

const Cta = () => {
  return (
    <Section aria-labelledby="cta-title">
      <Container>
        <MotionInView
          variants={scaleIn}
          className="relative overflow-hidden rounded-[2.75rem] bg-gradient-to-r from-primary via-primary/80 to-primary/60 px-6 py-16 text-center text-white shadow-soft sm:px-12"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.4),transparent_55%)] opacity-60" aria-hidden="true" />
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
              <Button href="mailto:hello@vibeeats.com" variant="secondary" aria-label="Scrivici via email">
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
