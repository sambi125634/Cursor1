import { Body, Controller, Get, Post, Query, Req } from '@nestjs/common';
import { Request } from 'express';
import { ServicesService } from './services.service';

@Controller('services')
export class ServicesController {
  constructor(private readonly services: ServicesService) {}

  @Get()
  async list(@Req() req: Request, @Query('categoryId') categoryId?: string) {
    // Resolve tenant -> id by slug; for MVP use slug lookups per query to avoid caching layer complexity
    const slug = req.tenantSlug!;
    // Lazy fetch tenantId via prisma
    const tenant = await (this.services as any).prisma.tenant.findUnique({ where: { slug } });
    return this.services.list(tenant!.id, categoryId);
  }

  @Post()
  async create(
    @Req() req: Request,
    @Body() body: { name: string; description?: string; durationMin: number; price: number; currency?: string; categoryId?: string },
  ) {
    const slug = req.tenantSlug!;
    const tenant = await (this.services as any).prisma.tenant.findUnique({ where: { slug } });
    return this.services.create(tenant!.id, body);
  }
}

