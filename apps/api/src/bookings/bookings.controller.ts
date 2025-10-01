import { Body, Controller, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto/create-booking.dto';

@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookings: BookingsService) {}

  @Post()
  async create(@Req() req: Request, @Body() body: CreateBookingDto) {
    const slug = req.tenantSlug!;
    // For MVP, accept customer email via header
    const customerEmail = req.header('x-customer-email') || 'customer@example.com';
    return this.bookings.create(slug, customerEmail, body);
  }
}

