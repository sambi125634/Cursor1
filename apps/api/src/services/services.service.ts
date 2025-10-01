import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ServicesService {
  constructor(private readonly prisma: PrismaService) {}

  list(tenantId: string, categoryId?: string) {
    return this.prisma.service.findMany({
      where: { tenantId, categoryId, deletedAt: null },
      orderBy: { name: 'asc' },
    });
  }

  create(tenantId: string, input: { name: string; description?: string; durationMin: number; price: number; currency?: string; categoryId?: string }) {
    return this.prisma.service.create({
      data: {
        tenantId,
        name: input.name,
        description: input.description,
        durationMin: input.durationMin,
        price: input.price,
        currency: input.currency ?? 'PLN',
        categoryId: input.categoryId,
      },
    });
  }
}

