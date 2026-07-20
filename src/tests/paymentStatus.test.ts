import { describe, it, expect } from 'vitest';
import { shouldGrantCredits } from '@/lib/paymentStatus';

describe('shouldGrantCredits', () => {
  it('начисляет кредиты при первом succeeded (был pending)', () => {
    expect(shouldGrantCredits('pending', 'succeeded')).toBe(true);
  });

  it('НЕ начисляет повторно, если уже был succeeded (защита от дублей вебхука)', () => {
    expect(shouldGrantCredits('succeeded', 'succeeded')).toBe(false);
  });

  it('не начисляет, если входящий статус не succeeded', () => {
    expect(shouldGrantCredits('pending', 'failed')).toBe(false);
    expect(shouldGrantCredits('pending', 'canceled')).toBe(false);
    expect(shouldGrantCredits('pending', 'pending')).toBe(false);
  });

  it('не начисляет, если платёж уже был failed, а потом снова пришёл failed', () => {
    expect(shouldGrantCredits('failed', 'failed')).toBe(false);
  });
});