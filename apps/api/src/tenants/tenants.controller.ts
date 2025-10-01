import { Controller, Get, Param, Req } from '@nestjs/common';
import { Request } from 'express';
import { TenantsService } from './tenants.service';

@Controller('tenant')
export class TenantsController {
  constructor(private readonly tenants: TenantsService) {}

  @Get(':slug/config')
  async getConfig(@Param('slug') slug: string) {
    const tenant = await this.tenants.getBySlug(slug);
    return {
      slug: tenant.slug,
      name: tenant.name,
      branding: tenant.branding,
    };
  }

  @Get('me/config')
  async getConfigFromHeader(@Req() req: Request) {
    const slug = req.tenantSlug!;
    const tenant = await this.tenants.getBySlug(slug);
    return {
      slug: tenant.slug,
      name: tenant.name,
      branding: tenant.branding,
    };
  }
}

