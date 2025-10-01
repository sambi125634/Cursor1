import { Body, Controller, Post } from '@nestjs/common';
import { PaymentsService } from './payments.service';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly payments: PaymentsService) {}

  @Post('stripe/webhook')
  async stripeWebhook(@Body() _body: any) {
    // TODO: verify signature and process events (V1)
    return { received: true };
  }
}

