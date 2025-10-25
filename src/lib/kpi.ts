export type KpiItem = {
  label: string;
  target: number;
  prefix?: string;
  suffix?: string;
  description: string;
};

export const kpiMetrics: KpiItem[] = [
  {
    label: 'Uso QR al tavolo',
    target: 82,
    prefix: '≥ ',
    suffix: '%',
    description: 'Clienti che avviano l’esperienza digitale con QR e completano il primo ordine.'
  },
  {
    label: 'Tempo al primo ordine',
    target: 4,
    prefix: '≤ ',
    suffix: ' min',
    description: 'Dall’accomodarsi al tavolo alla conferma dell’ordine grazie a flow guidati.'
  },
  {
    label: 'Pagamenti self-service',
    target: 68,
    prefix: '≥ ',
    suffix: '%',
    description: 'Check-out autonomo con split bill e pagamenti digitali senza aspettare il cameriere.'
  },
  {
    label: 'Conversione ricerca→prenotazione',
    target: 36,
    prefix: '≥ ',
    suffix: '%',
    description: 'Utenti che, dalla discovery, confermano una prenotazione attraverso VibeEats.'
  }
];
