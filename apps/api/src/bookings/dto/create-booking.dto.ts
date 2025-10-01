import { IsISO8601, IsOptional, IsString } from 'class-validator';

export class CreateBookingDto {
  @IsString()
  serviceId!: string;

  @IsString()
  staffId!: string;

  @IsISO8601()
  start!: string;

  @IsISO8601()
  end!: string;

  @IsOptional()
  @IsString()
  couponCode?: string;
}

