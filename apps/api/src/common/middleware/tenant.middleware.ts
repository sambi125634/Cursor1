import { Injectable, NestMiddleware, BadRequestException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

declare module 'express-serve-static-core' {
  interface Request {
    tenantSlug?: string;
  }
}

@Injectable()
export class TenantMiddleware implements NestMiddleware {
  use(req: Request, _res: Response, next: NextFunction) {
    const headerSlug = req.header('x-tenant');
    const host = req.hostname || '';
    const urlSlugMatch = req.url.match(/\/tenant\/([a-z0-9-]+)/i);
    const slugFromUrl = urlSlugMatch?.[1];

    const slug = headerSlug || slugFromUrl || this.extractFromHost(host);
    if (!slug) {
      throw new BadRequestException('Missing tenant context');
    }
    req.tenantSlug = slug.toLowerCase();
    next();
  }

  private extractFromHost(host: string): string | undefined {
    // e.g. salon.example.localhost -> salon
    const parts = host.split('.');
    if (parts.length > 2) return parts[0];
    return undefined;
  }
}

