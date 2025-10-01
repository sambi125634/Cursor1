import { Injectable } from '@nestjs/common';

@Injectable()
export class NotificationsService {
  async sendTest(to: string) {
    // TODO: integrate providers (Sendgrid/Resend, Twilio, Expo) in V1
    return { ok: true, to };
  }
}

