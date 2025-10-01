import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ChatService {
  constructor(private readonly prisma: PrismaService) {}

  async query(tenantSlug: string, prompt: string) {
    const tenant = await this.prisma.tenant.findUnique({ where: { slug: tenantSlug } });
    const context = `Salon: ${tenant?.name}. Pytaj o usługi, godziny i przygotowanie do zabiegu.`;
    // Mock answer
    const answer = `Mock AI: ${prompt} — Na podstawie polityki salonu: ${tenant?.name}.`;
    await this.prisma.message.create({
      data: { tenantId: tenant!.id, role: 'user', source: 'app', content: prompt },
    });
    await this.prisma.message.create({
      data: { tenantId: tenant!.id, role: 'assistant', source: 'app', content: answer },
    });
    return { answer, context };
  }
}

