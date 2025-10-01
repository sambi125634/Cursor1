import { Controller, Get, Query, Req } from '@nestjs/common';
import { Request } from 'express';
import { StaffService } from './staff.service';

@Controller('staff')
export class StaffController {
  constructor(private readonly staff: StaffService) {}

  @Get('availability')
  async getAvailability(
    @Req() req: Request,
    @Query('serviceId') serviceId: string,
    @Query('date') date: string,
  ) {
    const slug = req.tenantSlug!;
    const prisma = (this.staff as any).prisma;
    const tenant = await prisma.tenant.findUnique({ where: { slug } });
    return this.staff.availability(tenant!.id, serviceId, date);
  }
}

