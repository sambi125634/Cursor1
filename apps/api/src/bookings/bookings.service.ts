import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BookingsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(tenantSlug: string, customerEmail: string, dto: {
    serviceId: string; staffId: string; start: string; end: string; couponCode?: string;
  }) {
    const tenant = await this.prisma.tenant.findUnique({ where: { slug: tenantSlug } });
    if (!tenant) throw new BadRequestException('Invalid tenant');

    const service = await this.prisma.service.findFirst({ where: { id: dto.serviceId, tenantId: tenant.id } });
    if (!service) throw new BadRequestException('Invalid service');

    const staff = await this.prisma.staff.findFirst({ where: { id: dto.staffId, tenantId: tenant.id } });
    if (!staff) throw new BadRequestException('Invalid staff');

    const start = new Date(dto.start);
    const end = new Date(dto.end);
    if (!(start instanceof Date) || !(end instanceof Date) || start >= end) {
      throw new BadRequestException('Invalid time range');
    }

    // Very basic conflict check (MVP)
    const conflict = await this.prisma.booking.findFirst({
      where: {
        tenantId: tenant.id,
        staffId: staff.id,
        deletedAt: null,
        OR: [
          { start: { lt: end }, end: { gt: start } },
        ],
      },
    });
    if (conflict) throw new BadRequestException('Slot not available');

    // Ensure customer exists
    const customer = await this.prisma.user.upsert({
      where: { email: customerEmail },
      update: {},
      create: { email: customerEmail, role: 'CUSTOMER', tenantId: tenant.id },
    });

    // Mock payment: mark NOT_REQUIRED for MVP
    const booking = await this.prisma.booking.create({
      data: {
        tenantId: tenant.id,
        customerId: customer.id,
        staffId: staff.id,
        serviceId: service.id,
        start,
        end,
        status: 'CONFIRMED',
        paymentStatus: 'NOT_REQUIRED',
      },
    });
    return booking;
  }
}

