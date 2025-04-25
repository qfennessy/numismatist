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
  images: { id: string; url: string; side: string; isPrimary: boolean }[];
  tags: string[];
  notes: any[];
  provenance: any[];
  mint?: any;
  isPublic: boolean;
}
