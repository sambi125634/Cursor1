import { Body, Controller, Post } from '@nestjs/common';
import { MediaService } from './media.service';

@Controller('media')
export class MediaController {
  constructor(private readonly media: MediaService) {}

  @Post('presign')
  async presign(@Body() body: { filename: string; contentType: string }) {
    return this.media.presign(body.filename, body.contentType);
  }
}

