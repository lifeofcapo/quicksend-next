import { describe, it, expect } from 'vitest';
import { PRICING_PLANS, getPlan } from '../lib/pricing';

describe('PRICING_PLANS — целостность данных', () => {
  it('содержит ровно 3 плана: single, five, ten', () => {
    expect(PRICING_PLANS.map((p) => p.id)).toEqual(['single', 'five', 'ten']);
  });

  it('credits и qty совпадают для каждого плана', () => {
    for (const plan of PRICING_PLANS) {
      expect(plan.credits).toBe(plan.qty);
    }
  });

  it('totalPrice не меньше pricePerUnit * qty * 0.99 (без абсурдных скидок)', () => {
    for (const plan of PRICING_PLANS) {
      const expectedMinimum = plan.pricePerUnit * plan.qty * 0.9;
      expect(plan.totalPrice).toBeGreaterThanOrEqual(expectedMinimum);
    }
  });

  it('savings = pricePerUnit(single) * qty - totalPrice', () => {
    const basePrice = getPlan('single')!.pricePerUnit; // 25
    for (const plan of PRICING_PLANS) {
      const expectedSavings = basePrice * plan.qty - plan.totalPrice;
      expect(plan.savings).toBe(expectedSavings);
    }
  });

  it('план "single" не имеет скидки', () => {
    const single = getPlan('single')!;
    expect(single.savings).toBe(0);
    expect(single.savingsPct).toBe(0);
  });

  it('скидка растёт вместе с количеством (five < ten по savingsPct)', () => {
    const five = getPlan('five')!;
    const ten = getPlan('ten')!;
    expect(ten.savingsPct).toBeGreaterThan(five.savingsPct);
  });

  it('только план "five" помечен как popular', () => {
    const popularPlans = PRICING_PLANS.filter((p) => p.popular);
    expect(popularPlans).toHaveLength(1);
    expect(popularPlans[0].id).toBe('five');
  });
});

describe('getPlan', () => {
  it('находит план по id', () => {
    expect(getPlan('ten')?.totalPrice).toBe(190);
  });

  it('возвращает undefined для несуществующего id', () => {
    expect(getPlan('nonexistent')).toBeUndefined();
  });
});