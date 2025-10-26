import { Smartphone, ShieldCheck, TrendingUp, Search } from 'lucide-react';
import Section from './Section';
import Container from './Container';
import MotionInView from './MotionInView';
import Card from './Card';
import Icon from './Icon';
import { fadeInUp, staggerContainer } from '../lib/animations';

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
  return (
    <Section id="cosa-facciamo">
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
