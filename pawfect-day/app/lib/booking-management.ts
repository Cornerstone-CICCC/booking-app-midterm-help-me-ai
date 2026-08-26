import type { Booking } from './definitions';

export const SAMPLE_BOOKING: Booking = {
  id: 'booking-001',
  ownerName: 'Sofia Martinez',
  ownerEmail: 'sofia@example.com',
  ownerPhone: '+1 555 010 2040',
  petName: 'Luna',
  petType: 'dog',
  petSize: 'medium',
  serviceId: 'srv-2',
  bookingDate: '2026-09-12',
  bookingTime: '10:00',
  status: 'confirmed',
  notes: 'Luna is nervous around loud dryers.',
  createdAt: '2026-08-20T09:30:00.000Z',
};