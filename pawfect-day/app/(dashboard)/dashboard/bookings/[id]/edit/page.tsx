import Link from 'next/link';
import { notFound } from 'next/navigation';
import { EditBookingForm } from '@/app/components/dashboard/edit-booking-form';
import { getBookingById } from '@/app/models/bookings';

export default async function EditBookingPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const booking = await getBookingById(id);
  if (!booking) notFound();

  return (
    <main className="min-h-screen bg-amber-50/40 p-6 sm:p-10">
      <div className="mx-auto max-w-3xl space-y-8">
        <Link href={`/dashboard/bookings/${booking.id}`} className="text-sm font-semibold text-amber-800 hover:text-amber-950">← Back to booking details</Link>
        <header><p className="text-sm font-semibold uppercase tracking-wide text-amber-700">Booking management</p><h1 className="mt-2 text-3xl font-bold text-amber-950">Edit booking</h1><p className="mt-2 text-slate-600">Update the customer, pet, or appointment information below.</p></header>
        <section className="rounded-xl border border-amber-100 bg-white p-6 shadow-sm"><EditBookingForm booking={booking} /></section>
      </div>
    </main>
  );
}