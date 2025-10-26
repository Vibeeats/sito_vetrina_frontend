import Section from './Section';
import Container from './Container';
import Button from './Button';
import MotionInView from './MotionInView';
import { fadeInUp, scaleIn } from '../lib/animations';

const Contact = () => {
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

        <MotionInView
          variants={scaleIn}
          className="mx-auto mt-12 max-w-2xl rounded-3xl border border-accent/30 bg-white p-8 text-center shadow-soft"
        >
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
