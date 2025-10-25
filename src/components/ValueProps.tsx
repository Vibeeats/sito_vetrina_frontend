import { useState } from 'react';
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
    icon: (hovered: boolean) => (
      <Icon hovered={hovered}>
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden="true">
          <path d="M6 4h12a2 2 0 0 1 2 2v5H4V6a2 2 0 0 1 2-2Zm14 9v5a2 2 0 0 1-2 2h-4.5l-1.2-1.8a1 1 0 0 0-1.6 0L9.5 20H6a2 2 0 0 1-2-2v-5h16Z" />
        </svg>
      </Icon>
    )
  },
  {
    title: 'Meno errori',
    subtitle: 'Allergeni e diete chiare, regole automatiche e chatbot sempre disponibile.',
    icon: (hovered: boolean) => (
      <Icon hovered={hovered}>
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden="true">
          <path d="M12 2a10 10 0 0 1 7.75 16.3l1.62 1.61-1.42 1.42-1.6-1.6A10 10 0 1 1 12 2Zm0 2a8 8 0 0 0-6.32 12.9l2.69-2.68A3 3 0 0 1 8 13V9a4 4 0 0 1 8 0v1.58l-1.61-1.6-1.42 1.41 3.54 3.54 1.4 1.42A8 8 0 0 0 12 4Z" />
        </svg>
      </Icon>
    )
  },
  {
    title: 'Scontrino medio ↑',
    subtitle: 'Suggerimenti intelligenti e abbinamenti food & wine per alzare il valore medio.',
    icon: (hovered: boolean) => (
      <Icon hovered={hovered}>
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden="true">
          <path d="M12 3 4 7l8 4 6-3.06V14h2V7l-8-4Zm-4 9.27L4 15l8 4 4-2-8-4.73ZM20 17h-3v-2h-2v2h-3v2h3v3h2v-3h3v-2Z" />
        </svg>
      </Icon>
    )
  },
  {
    title: 'Prenotazioni semplici',
    subtitle: 'Ricerca, filtri e discovery assistita per trovare e prenotare con zero attriti.',
    icon: (hovered: boolean) => (
      <Icon hovered={hovered}>
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden="true">
          <path d="M12 2a7 7 0 0 1 7 7c0 1.7-.63 3.25-1.68 4.44l4.12 4.12-1.41 1.41-4.12-4.12A6.96 6.96 0 0 1 12 16a7 7 0 1 1 0-14Zm0 2a5 5 0 1 0 0 10 5 5 0 0 0 0-10Z" />
        </svg>
      </Icon>
    )
  }
];

const ValueProps = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

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
          {valueProps.map((item, index) => (
            <Card
              key={item.title}
              variants={fadeInUp}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 220, damping: 24 }}
              className="hover:shadow-hover"
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
            >
              {item.icon(hoveredIndex === index)}
              <h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
              <p className="mt-3 text-sm text-slate-600">{item.subtitle}</p>
            </Card>
          ))}
        </MotionInView>
      </Container>
    </Section>
  );
};

export default ValueProps;
