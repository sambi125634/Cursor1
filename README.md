# BeautyFunnels Monorepo (MVP)

Monorepo with API (NestJS + Prisma), Web Panel (Next.js), and Mobile App (Expo). Dev infra uses PostgreSQL and Redis (Docker recommended).

## Prereqs
- Node 20+ (tested on v22)
- pnpm 9
- PostgreSQL 16 and Redis (local or Docker)

## Setup
1. Copy envs:
```bash
cp .env.example .env
cp apps/api/.env.example apps/api/.env  # if you create one later
```
2. Install deps:
```bash
pnpm install
```
3. Start Postgres + Redis (if using Docker):
```bash
# Requires Docker installed; or run your own services locally
docker compose up -d db redis
```
4. Generate Prisma client, migrate, and seed:
```bash
cd apps/api
pnpm prisma generate
pnpm prisma migrate dev --name init
pnpm ts-node prisma/seed.ts
```

## Develop
In one terminal:
```bash
pnpm dev
```
- API: http://localhost:4000
- Web Panel: http://localhost:3000
- Expo: follow CLI QR output

Or run individually:
```bash
# API
cd apps/api && pnpm dev
# Web Panel
cd apps/web && pnpm dev
# Mobile
cd apps/mobile && pnpm dev
```

## Test calls (after seed)
```bash
# Get tenant config
curl -H 'x-tenant: salon-aurora' http://localhost:4000/tenant/me/config

# List services
curl -H 'x-tenant: salon-aurora' http://localhost:4000/services

# Create booking (replace IDs as needed)
curl -X POST -H 'Content-Type: application/json' \
  -H 'x-tenant: salon-aurora' -H 'x-customer-email: test@example.com' \
  -d '{"serviceId":"<serviceId>","staffId":"<staffId>","start":"2025-10-02T09:00:00.000Z","end":"2025-10-02T10:00:00.000Z"}' \
  http://localhost:4000/bookings

# Chat
curl -X POST -H 'Content-Type: application/json' -H 'x-tenant: salon-aurora' \
  -d '{"prompt":"Jak się przygotować do zabiegu?"}' http://localhost:4000/chat/query
```

## Notes
- Payments are mocked (Stripe placeholder). Replace with real integration in V1.
- Availability uses mock slots until Google Calendar sync is implemented.
- Notifications endpoints are stubbed.

## FAQ
- DB connection refused: make sure Postgres is running and `DATABASE_URL` matches.
- Expo cannot reach API: ensure phone and machine are on same network, or use tunnel.
