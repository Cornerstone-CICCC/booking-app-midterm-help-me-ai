import Link from 'next/link';
import { EditBookingForm } from '@/app/components/dashboard/edit-booking-form';
import { SAMPLE_BOOKING } from '@/app/lib/booking-management';

export default async function EditBookingPage() {
  return (
    <main className="min-h-screen bg-amber-50/40 p-6 sm:p-10">
      <div className="mx-auto max-w-3xl space-y-8">
        <Link href={`/dashboard/bookings/${SAMPLE_BOOKING.id}`} className="text-sm font-semibold text-amber-800 hover:text-amber-950">← Back to booking details</Link>
        <header><p className="text-sm font-semibold uppercase tracking-wide text-amber-700">Booking management</p><h1 className="mt-2 text-3xl font-bold text-amber-950">Edit booking</h1><p className="mt-2 text-slate-600">Update the customer, pet, or appointment information below.</p></header>
        <section className="rounded-xl border border-amber-100 bg-white p-6 shadow-sm"><EditBookingForm booking={SAMPLE_BOOKING} /></section>
      </div>
    </main>
  );
}