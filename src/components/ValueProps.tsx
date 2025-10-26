import { Smartphone, ShieldCheck, TrendingUp, Search } from 'lucide-react';
import Section from './Section';
import Container from './Container';
import MotionInView from './MotionInView';
import Card from './Card';
import Icon from './Icon';
import { fadeInUp, staggerContainer } from '../lib/animations';

const valueProps = [
  {
    title: 'Autonomia al tavolo',
    subtitle: 'Self-service guidato via QR, con esperienza intuitiva per ogni tavolo.',
    icon: (
      <Icon>
        <Smartphone className="h-5 w-5" aria-hidden="true" />
      </Icon>
    )
  },
  {
    title: 'Meno errori',
    subtitle: 'Allergeni e diete chiare, regole automatiche e chatbot sempre disponibile.',
    icon: (
      <Icon>
        <ShieldCheck className="h-5 w-5" aria-hidden="true" />
      </Icon>
    )
  },
  {
    title: 'Scontrino medio ↑',
    subtitle: 'Suggerimenti intelligenti e abbinamenti food & wine per alzare il valore medio.',
    icon: (
      <Icon>
        <TrendingUp className="h-5 w-5" aria-hidden="true" />
      </Icon>
    )
  },
  {
    title: 'Prenotazioni semplici',
    subtitle: 'Ricerca, filtri e discovery assistita per trovare e prenotare con zero attriti.',
    icon: (
      <Icon>
        <Search className="h-5 w-5" aria-hidden="true" />
      </Icon>
    )
  }
];

const ValueProps = () => {
  return (
    <Section id="cosa-facciamo">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <MotionInView variants={fadeInUp}>
            <h2 className="heading-2">Cosa facciamo</h2>
          </MotionInView>
          <MotionInView variants={fadeInUp} delay={0.1} className="subheading">
            Un’unica app per l’esperienza ristorante — dal QR al tavolo alla discovery e prenotazione — riducendo
            attriti, migliorando il servizio e abilitando scelte consapevoli.
          </MotionInView>
        </div>

        <MotionInView variants={staggerContainer} className="mt-12 grid gap-6 sm:grid-cols-2">
          {valueProps.map((item) => (
            <Card
              key={item.title}
              variants={fadeInUp}
              whileHover={{ y: -8, scale: 1.02 }}
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
