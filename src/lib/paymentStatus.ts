export type PaymentStatus = 'pending' | 'succeeded' | 'failed' | 'refunded' | 'canceled';
//for idempotency 
export function shouldGrantCredits(
  currentStatus: PaymentStatus,
  incomingStatus: PaymentStatus
): boolean {
  return incomingStatus === 'succeeded' && currentStatus !== 'succeeded';
}