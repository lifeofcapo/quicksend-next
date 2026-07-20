import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { getPaypalAccessToken } from '@/lib//paypal';

describe('getPaypalAccessToken', () => {
  const originalFetch = global.fetch;

  beforeEach(() => {
    process.env.PAYPAL_CLIENT_ID = 'test-client-id';
    process.env.PAYPAL_CLIENT_SECRET = 'test-client-secret';
  });

  afterEach(() => {
    global.fetch = originalFetch;
    vi.restoreAllMocks();
  });

  it('возвращает access_token из ответа PayPal', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      json: async () => ({ access_token: 'fake-token-123' }),
    }) as unknown as typeof fetch;

    const token = await getPaypalAccessToken();
    expect(token).toBe('fake-token-123');
  });

  it('отправляет Basic auth с client_id:client_secret в base64', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      json: async () => ({ access_token: 'x' }),
    });
    global.fetch = fetchMock as unknown as typeof fetch;

    await getPaypalAccessToken();

    const expectedAuth = 'Basic ' + Buffer.from('test-client-id:test-client-secret').toString('base64');
    expect(fetchMock).toHaveBeenCalledWith(
      expect.stringContaining('/v1/oauth2/token'),
      expect.objectContaining({
        headers: expect.objectContaining({ Authorization: expectedAuth }),
      })
    );
  });

  it('отправляет grant_type=client_credentials в теле запроса', async () => {
    const fetchMock = vi.fn().mockResolvedValue({ json: async () => ({ access_token: 'x' }) });
    global.fetch = fetchMock as unknown as typeof fetch;

    await getPaypalAccessToken();

    expect(fetchMock).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({ body: 'grant_type=client_credentials' })
    );
  });
});