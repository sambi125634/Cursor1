import { Body, Controller, Post } from '@nestjs/common';
import { NotificationsService } from './notifications.service';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notifications: NotificationsService) {}

  @Post('test')
  async test(@Body() body: { to: string }) {
    return this.notifications.sendTest(body.to);
  }
}

