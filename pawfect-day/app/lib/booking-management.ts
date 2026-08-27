import type { Booking } from '@/app/types/booking';

export const SAMPLE_BOOKING: Booking = {
  id: 'booking-001',
    referenceNumber: 'PD-0001',
    customerName: 'Sofia Martinez',
    email: 'sofia@example.com',
    phone: '+1 555 010 2040',
  petName: 'Luna',
  petType: 'dog',
    petBreed: 'Golden Retriever',
  petSize: 'medium',
    service: 'full_groom',
    durationMinutes: 90,
    startingPrice: 75,
  bookingDate: '2026-09-12',
  bookingTime: '10:00',
    alternateTime: null,
  status: 'confirmed',
  notes: 'Luna is nervous around loud dryers.',
  createdAt: '2026-08-20T09:30:00.000Z',
};