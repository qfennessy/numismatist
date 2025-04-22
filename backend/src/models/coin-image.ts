export interface CoinImage {
  id: string;
  url: string;
  side: 'Obverse' | 'Reverse' | 'Edge' | 'Full';
  isPrimary: boolean;
}
