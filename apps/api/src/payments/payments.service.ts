import { Injectable } from '@nestjs/common';

export type PaymentIntent = {
  id: string;
  clientSecret: string;
  amount: number;
  currency: string;
  provider: 'stripe';
  status: 'requires_payment_method' | 'succeeded' | 'canceled';
};

@Injectable()
export class PaymentsService {
  async createMockIntent(amount: number, currency = 'PLN'): Promise<PaymentIntent> {
    // TODO: real Stripe integration in V1
    return {
      id: 'pi_mock_' + Math.random().toString(36).slice(2),
      clientSecret: 'cs_mock_' + Math.random().toString(36).slice(2),
      amount,
      currency,
      provider: 'stripe',
      status: 'requires_payment_method',
    };
  }
}

