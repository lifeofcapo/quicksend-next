import {
  ShieldCheck, Image as Zap, Star, Crown
} from 'lucide-react';

export interface PricingPlan {
  id: 'single' | 'five' | 'ten';
  qty: number;
  pricePerUnit: number;
  totalPrice: number; // USD
  savings: number;
  savingsPct: number;
  icon: typeof ShieldCheck;
  descKey: string;
  popular?: boolean;
  credits: number; 
  label: string;
}

export const PRICING_PLANS: PricingPlan[] = [
  { id: 'single', qty: 1,  pricePerUnit: 25, totalPrice: 25,  savings: 0,  savingsPct: 0,  icon: Zap,   descKey: 'pricing.bundleDescSingle', credits: 1, label: '1 Takedown' },
  { id: 'five',  qty: 5,  pricePerUnit: 22, totalPrice: 110, savings: 15, savingsPct: 12, icon: Star,  descKey: 'pricing.bundleDescPack5', popular: true, credits: 5, label: '5 Takedowns' },
  { id: 'ten', qty: 10, pricePerUnit: 19, totalPrice: 190, savings: 60, savingsPct: 24, icon: Crown, descKey: 'pricing.bundleDescPack10', credits: 10, label: '10 Takedowns' },
];

export function getPlan(id: string) {
  return PRICING_PLANS.find((p) => p.id === id);
}

export interface RubPricingPlan {
  id: 'ru-1' | 'ru-5' | 'ru-10' | 'ru-20';
  qty: number;
  totalPrice: number; // RUB
  label: string;
}

export const RUB_PRICING_PLANS: RubPricingPlan[] = [
  { id: 'ru-1',  qty: 1,  totalPrice: 150, label: '1 Takedown' },
  { id: 'ru-5',  qty: 5,  totalPrice: 400, label: '5 Takedowns' },
  { id: 'ru-10', qty: 10, totalPrice: 600, label: '10 Takedowns' },
  { id: 'ru-20', qty: 20, totalPrice: 800, label: '20 Takedowns' },
];

export function getRubPlan(id: string) {
  return RUB_PRICING_PLANS.find((p) => p.id === id);
}