import DashboardClient from '@/app/components/dashboard/dashboard-client';
import type { Booking } from '@/app/lib/definitions';

const mockBookings: Booking[] = [
  { id: 'booking-1', ownerName: 'Joy Kosol', ownerEmail: 'joy@example.com', ownerPhone: '555-0101', petName: 'Mochi', petType: 'dog', petSize: 'small', serviceId: 'srv-2', bookingDate: '2026-08-25', bookingTime: '10:30', status: 'pending', createdAt: '2026-08-20' },
  { id: 'booking-2', ownerName: 'Alex Chen', ownerEmail: 'alex@example.com', ownerPhone: '555-0102', petName: 'Luna', petType: 'dog', petSize: 'large', serviceId: 'srv-1', bookingDate: '2026-08-25', bookingTime: '12:00', status: 'confirmed', createdAt: '2026-08-20' },
  { id: 'booking-3', ownerName: 'Sam Wilson', ownerEmail: 'sam@example.com', ownerPhone: '555-0103', petName: 'Teddy', petType: 'dog', petSize: 'medium', serviceId: 'srv-3', bookingDate: '2026-08-25', bookingTime: '13:30', status: 'confirmed', createdAt: '2026-08-20' },
  { id: 'booking-4', ownerName: 'Mia Lee', ownerEmail: 'mia@example.com', ownerPhone: '555-0104', petName: 'Nori', petType: 'cat', petSize: 'large', serviceId: 'srv-4', bookingDate: '2026-08-26', bookingTime: '09:00', status: 'completed', createdAt: '2026-08-20' },
  { id: 'booking-5', ownerName: 'Taylor Brown', ownerEmail: 'taylor@example.com', ownerPhone: '555-0105', petName: 'Charlie', petType: 'dog', petSize: 'large', serviceId: 'srv-5', bookingDate: '2026-08-26', bookingTime: '15:00', status: 'cancelled', createdAt: '2026-08-20' },
];

export default function DashboardPage() {
  return <DashboardClient bookings={mockBookings} />;
}