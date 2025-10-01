import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class StaffService {
  constructor(private readonly prisma: PrismaService) {}

  async availability(tenantId: string, serviceId: string, date: string) {
    // TODO: Implement Google Calendar sync and availability algorithm (V1)
    // MVP: return mock slots
    const base = new Date(date + 'T09:00:00.000Z');
    const slots = Array.from({ length: 5 }).map((_, i) => {
      const start = new Date(base.getTime() + i * 60 * 60 * 1000);
      const end = new Date(start.getTime() + 45 * 60 * 1000);
      return { start: start.toISOString(), end: end.toISOString() };
    });
    return slots;
  }
}

