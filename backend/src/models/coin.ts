import { CoinImage } from './coin-image';
import { CoinNote } from './note';
import { Provenance } from './provenance';
import { Mint } from './mint';

export interface Coin {
  id: string;
  name: string;
  origin: 'Roman' | 'Greek' | 'Other';
  period: string;
  year: number | null;
  metal: 'Gold' | 'Silver' | 'Bronze' | 'Copper' | 'Other';
  denomination: string;
  emperor?: string;
  description: string;
  condition: 'Mint' | 'Fine' | 'Very Fine' | 'Extremely Fine' | 'Good' | 'Fair' | 'Poor';
  diameter: number;
  weight: number;
  obverseDescription: string;
  reverseDescription: string;
  acquisitionDate: string;
  acquisitionPrice: number;
  estimatedValue: number;
  images: CoinImage[];
  tags: string[];
  notes: CoinNote[];
  provenance: Provenance[];
  mint: Mint;
  isPublic: boolean;
}
