import { Body, Controller, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { ChatService } from './chat.service';

@Controller('chat')
export class ChatController {
  constructor(private readonly chat: ChatService) {}

  @Post('query')
  async query(@Req() req: Request, @Body() body: { prompt: string }) {
    const slug = req.tenantSlug!;
    return this.chat.query(slug, body.prompt);
  }
}

