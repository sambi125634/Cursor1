export type TenantBranding = {
  primaryColor: string;
  secondaryColor?: string;
  logoUrl?: string;
  domain?: string;
  deepLinkScheme?: string;
};

export type TenantConfig = {
  id: string;
  slug: string;
  name: string;
  branding: TenantBranding;
};

export type ServiceVariant = {
  durationMin: number;
  price: number;
  currency: string;
  name?: string;
};

export type Service = {
  id: string;
  tenantId: string;
  categoryId?: string;
  name: string;
  description?: string;
  variants: ServiceVariant[];
  mediaUrls?: string[];
};

export type Staff = {
  id: string;
  tenantId: string;
  userId: string;
  displayName: string;
  skills: string[];
};

export type AvailabilitySlot = {
  start: string; // ISO
  end: string;   // ISO
};

export type Booking = {
  id: string;
  tenantId: string;
  customerId: string;
  staffId: string;
  serviceId: string;
  start: string;
  end: string;
  status: 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'NO_SHOW';
  paymentStatus?: 'REQUIRED' | 'PAID' | 'NOT_REQUIRED' | 'REFUNDED';
};

