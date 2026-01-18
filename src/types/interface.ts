import { Rocket } from 'lucide-react';

export interface PlanFeature {
  textRu: string;
  textEn: string;
  included: boolean;
}

export interface Plan {
  id: string;
  nameRu: string;
  nameEn: string;
  icon: typeof Rocket;
  monthlyPriceRu: number;
  monthlyPriceEn: number;
  annualPriceRu: number;
  annualPriceEn: number;
  isPopular?: boolean;
  features: PlanFeature[];
}

export interface PricingContentProps {
  lang: string;
}