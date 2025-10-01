import { Injectable } from '@nestjs/common';

@Injectable()
export class MediaService {
  async presign(filename: string, contentType: string) {
    // TODO: implement real S3 presign
    return {
      url: `https://example-presign.local/${encodeURIComponent(filename)}`,
      fields: { 'Content-Type': contentType },
    };
  }
}

