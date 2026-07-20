import { describe, it, expect } from 'vitest';
import { validateStep } from '../lib/reportValidation';

const t = (key: string, params?: Record<string, string | number>) =>
  params ? `${key}:${JSON.stringify(params)}` : key;

describe('validateStep — шаг 1 (личные данные)', () => {
  it('требует firstName, lastName, email', () => {
    const errors = validateStep(1, {}, t);
    expect(errors.firstName).toBe('tenty.requiredField');
    expect(errors.lastName).toBe('tenty.requiredField');
    expect(errors.email).toBe('tenty.requiredField');
  });

  it('firstName короче 2 символов — ошибка minCharacters с count:2', () => {
    const errors = validateStep(1, { firstName: 'A', lastName: 'Doe', email: 'a@a.com' }, t);
    expect(errors.firstName).toBe('tenty.minCharacters:{"count":2}');
  });

  it('firstName длиннее 100 символов — ошибка maxCharacters', () => {
    const errors = validateStep(1, {
      firstName: 'A'.repeat(101),
      lastName: 'Doe',
      email: 'a@a.com',
    }, t);
    expect(errors.firstName).toBe('tenty.maxCharacters:{"count":100}');
  });

  it('невалидный email — invalidEmail', () => {
    const errors = validateStep(1, { firstName: 'John', lastName: 'Doe', email: 'not-an-email' }, t);
    expect(errors.email).toBe('tenty.invalidEmail');
  });

  it('валидный email не даёт ошибок', () => {
    const errors = validateStep(1, { firstName: 'John', lastName: 'Doe', email: 'john@example.com' }, t);
    expect(errors.email).toBeUndefined();
  });

  it('пустой phoneNumber (falsy) не валидируется вообще', () => {
    const errors = validateStep(1, {
      firstName: 'John', lastName: 'Doe', email: 'john@example.com', phoneNumber: '',
    }, t);
    expect(errors.phoneNumber).toBeUndefined();
  });

  it('невалидный phoneNumber (буквы) — invalidPhone', () => {
    const errors = validateStep(1, {
      firstName: 'John', lastName: 'Doe', email: 'john@example.com', phoneNumber: 'abc',
    }, t);
    expect(errors.phoneNumber).toBe('tenty.invalidPhone');
  });

  it('валидный phoneNumber не даёт ошибок', () => {
    const errors = validateStep(1, {
      firstName: 'John', lastName: 'Doe', email: 'john@example.com', phoneNumber: '+1 234 567 8901',
    }, t);
    expect(errors.phoneNumber).toBeUndefined();
  });

  it('полностью валидный шаг 1 — пустой объект ошибок', () => {
    const errors = validateStep(1, {
      firstName: 'John', lastName: 'Doe', email: 'john@example.com',
    }, t);
    expect(errors).toEqual({});
  });
});

describe('validateStep — шаг 2 (тип жалобы)', () => {
  it('требует reportingPlatform, reportType, contentType', () => {
    const errors = validateStep(2, { reportingReason: 'x'.repeat(50) }, t);
    expect(errors.reportingPlatform).toBe('tenty.requiredField');
    expect(errors.reportType).toBe('tenty.requiredField');
    expect(errors.contentType).toBe('tenty.requiredField');
  });

  it('reportingReason короче 50 символов — minCharacters:{count:50}', () => {
    const errors = validateStep(2, {
      reportingPlatform: 'Spotify',
      reportType: 'Copyright Infringement',
      contentType: 'Beat/Instrumental',
      reportingReason: 'too short',
    }, t);
    expect(errors.reportingReason).toBe('tenty.minCharacters:{"count":50}');
  });

  it('reportingReason длиннее 2000 символов — maxCharacters:{count:2000}', () => {
    const errors = validateStep(2, {
      reportingPlatform: 'Spotify',
      reportType: 'Copyright Infringement',
      contentType: 'Beat/Instrumental',
      reportingReason: 'x'.repeat(2001),
    }, t);
    expect(errors.reportingReason).toBe('tenty.maxCharacters:{"count":2000}');
  });

  it('валидный шаг 2 — пустой объект ошибок', () => {
    const errors = validateStep(2, {
      reportingPlatform: 'Spotify',
      reportType: 'Copyright Infringement',
      contentType: 'Beat/Instrumental',
      reportingReason: 'x'.repeat(50),
    }, t);
    expect(errors).toEqual({});
  });
});

describe('validateStep — шаг 3 (доказательства и владение)', () => {
  it('требует evidenceUrl, ownershipType, ownershipExplanation', () => {
    const errors = validateStep(3, {}, t);
    expect(errors.evidenceUrl).toBe('tenty.requiredField');
    expect(errors.ownershipType).toBe('tenty.requiredField');
    expect(errors.ownershipExplanation).toBe('tenty.requiredField');
  });

  it('невалидный evidenceUrl (не http/https) — invalidUrl', () => {
    const errors = validateStep(3, {
      evidenceUrl: 'ftp://example.com/file',
      ownershipType: 'I own the composition',
      ownershipExplanation: 'x'.repeat(100),
    }, t);
    expect(errors.evidenceUrl).toBe('tenty.invalidUrl');
  });

  it('валидный evidenceUrl не даёт ошибок', () => {
    const errors = validateStep(3, {
      evidenceUrl: 'https://open.spotify.com/track/abc123',
      ownershipType: 'I own the composition',
      ownershipExplanation: 'x'.repeat(100),
    }, t);
    expect(errors.evidenceUrl).toBeUndefined();
  });

  it('ownershipExplanation короче 100 символов — minCharacters:{count:100}', () => {
    const errors = validateStep(3, {
      evidenceUrl: 'https://open.spotify.com/track/abc123',
      ownershipType: 'I own the composition',
      ownershipExplanation: 'too short',
    }, t);
    expect(errors.ownershipExplanation).toBe('tenty.minCharacters:{"count":100}');
  });

  it('ownershipExplanation длиннее 1000 символов — maxCharacters:{count:1000}', () => {
    const errors = validateStep(3, {
      evidenceUrl: 'https://open.spotify.com/track/abc123',
      ownershipType: 'I own the composition',
      ownershipExplanation: 'x'.repeat(1001),
    }, t);
    expect(errors.ownershipExplanation).toBe('tenty.maxCharacters:{"count":1000}');
  });
});

describe('validateStep — шаг 4 (согласия)', () => {
  it('требует все три чекбокса', () => {
    const errors = validateStep(4, {}, t);
    expect(errors.agreeTerms).toBe('tenty.agreeRequired');
    expect(errors.agreeAccuracy).toBe('tenty.agreeRequired');
    expect(errors.agreePenalties).toBe('tenty.agreeRequired');
  });

  it('не даёт ошибок, если все чекбоксы отмечены', () => {
    const errors = validateStep(4, {
      agreeTerms: true, agreeAccuracy: true, agreePenalties: true,
    }, t);
    expect(errors).toEqual({});
  });

  it('частично отмеченные чекбоксы дают частичные ошибки', () => {
    const errors = validateStep(4, {
      agreeTerms: true, agreeAccuracy: false, agreePenalties: true,
    }, t);
    expect(errors.agreeAccuracy).toBeDefined();
    expect(errors.agreeTerms).toBeUndefined();
    expect(errors.agreePenalties).toBeUndefined();
  });
});

describe('validateStep — неизвестный шаг', () => {
  it('возвращает пустой объект ошибок для шага вне 1-4', () => {
    expect(validateStep(99, {}, t)).toEqual({});
  });
});