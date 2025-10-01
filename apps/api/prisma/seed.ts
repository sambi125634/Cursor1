import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const tenant = await prisma.tenant.upsert({
    where: { slug: 'salon-aurora' },
    update: {},
    create: {
      slug: 'salon-aurora',
      name: 'Salon Aurora',
      branding: {
        primaryColor: '#E91E63',
        secondaryColor: '#FFC1E3',
        logoUrl: 'https://placehold.co/200x200?text=Aurora',
      },
    },
  });

  const owner = await prisma.user.upsert({
    where: { email: 'owner@aurora.example' },
    update: {},
    create: { email: 'owner@aurora.example', role: 'OWNER', tenantId: tenant.id, name: 'Owner' },
  });

  const staffUser = await prisma.user.upsert({
    where: { email: 'stylist@aurora.example' },
    update: {},
    create: { email: 'stylist@aurora.example', role: 'STAFF', tenantId: tenant.id, name: 'Anna Stylist' },
  });
  const staff = await prisma.staff.upsert({
    where: { userId: staffUser.id },
    update: {},
    create: {
      userId: staffUser.id,
      tenantId: tenant.id,
      skills: ['manicure', 'pedicure'],
    },
  });

  const cat = await prisma.serviceCategory.create({
    data: { name: 'Paznokcie', tenantId: tenant.id },
  });

  const service = await prisma.service.create({
    data: {
      tenantId: tenant.id,
      categoryId: cat.id,
      name: 'Manicure hybrydowy',
      description: 'Pełna stylizacja hybrydowa',
      durationMin: 60,
      price: 150.0,
      currency: 'PLN',
      media: [
        'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9',
      ],
    },
  });

  console.log({ tenant: tenant.slug, staff: staff.id, service: service.id });
}

main().finally(async () => {
  await prisma.$disconnect();
});

