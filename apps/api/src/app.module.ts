import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { HealthModule } from './health/health.module';
import { TenantsModule } from './tenants/tenants.module';
import { ServicesModule } from './services/services.module';
import { StaffModule } from './staff/staff.module';
import { BookingsModule } from './bookings/bookings.module';
import { PaymentsModule } from './payments/payments.module';
import { ChatModule } from './chat/chat.module';
import { NotificationsModule } from './notifications/notifications.module';
import { MediaModule } from './media/media.module';
import { IntegrationsModule } from './integrations/integrations.module';
import { TenantMiddleware } from './common/middleware/tenant.middleware';

@Module({
  imports: [
    HealthModule,
    TenantsModule,
    ServicesModule,
    StaffModule,
    BookingsModule,
    PaymentsModule,
    ChatModule,
    NotificationsModule,
    MediaModule,
    IntegrationsModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TenantMiddleware).forRoutes('*');
  }
}

