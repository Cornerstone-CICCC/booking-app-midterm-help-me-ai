import { notFound } from 'next/navigation';
import { getBookingById } from '@/app/models/bookings';
import EditClient from './edit-client';

export default async function EditBookingPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const booking = await getBookingById(id);
  if (!booking) notFound();

  return <EditClient booking={booking} />;
}