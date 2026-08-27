<<<<<<< HEAD
import Link from 'next/link';
import { BookingManagementActions } from '@/app/components/dashboard/booking-management-actions';
import { SAMPLE_BOOKING } from '@/app/lib/booking-management';
import { SERVICES_LIST } from '@/app/lib/definitions';

export default async function BookingDetailsPage() {
  const booking = SAMPLE_BOOKING;
  const service = SERVICES_LIST.find((item) => item.id === booking.service);

  return (
    <main className="min-h-screen bg-amber-50/40 p-6 sm:p-10">
      <div className="mx-auto max-w-4xl space-y-8">
        <Link href="/dashboard" className="text-sm font-semibold text-amber-800 hover:text-amber-950">← Back to dashboard</Link>
        <header><p className="text-sm font-semibold uppercase tracking-wide text-amber-700">Booking details</p><h1 className="mt-2 text-3xl font-bold text-amber-950">{booking.petName}&apos;s appointment</h1><p className="mt-2 text-slate-600">Reference {booking.id}</p></header>
        <section className="grid gap-6 rounded-xl border border-amber-100 bg-white p-6 shadow-sm sm:grid-cols-2" aria-label="Booking information">
          <div><h2 className="font-bold text-amber-950">Customer information</h2><p className="mt-3 text-slate-700">{booking.customerName}</p><p className="text-slate-600">{booking.email}</p><p className="text-slate-600">{booking.phone}</p></div>
          <div><h2 className="font-bold text-amber-950">Pet information</h2><p className="mt-3 text-slate-700">{booking.petName} · {booking.petType} · {booking.petSize}</p><p className="mt-2 text-slate-600">{service?.name ?? 'Service unavailable'}</p></div>
          <div><h2 className="font-bold text-amber-950">Appointment</h2><p className="mt-3 text-slate-700">{booking.bookingDate} at {booking.bookingTime}</p><p className="mt-2"><span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold capitalize text-emerald-800">{booking.status}</span></p></div>
          <div><h2 className="font-bold text-amber-950">Notes</h2><p className="mt-3 text-slate-600">{booking.notes || 'No notes added.'}</p></div>
        </section>
        <BookingManagementActions booking={booking} />
      </div>
    </main>
  );
}
=======
import { notFound } from "next/navigation";
import { getBookingById } from "@/app/models/bookings";
import DetailsClient from "./details-client";

interface PageProps {
	params: Promise<{ id: string }>;
}

export default async function BookingDetailsPage({ params }: PageProps) {
	const resolvedParams = await params;
	const booking = await getBookingById(resolvedParams.id);

	if (!booking) {
		notFound();
	}

	return <DetailsClient booking={booking} />;
}
>>>>>>> 607e7fff087df40eb5d3916bfd6c89f23f726b24
