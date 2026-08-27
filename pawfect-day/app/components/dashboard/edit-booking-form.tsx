'use client';

import Link from 'next/link';
import type { Booking } from '@/app/types/booking';

export function EditBookingForm({ booking }: { booking: Booking }) {
  return (
    <form className="space-y-6" action="#">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="space-y-2 text-sm font-semibold text-slate-700">Customer name<input name="customerName" defaultValue={booking.customerName} className="w-full rounded-lg border border-slate-300 px-3 py-2 font-normal" /></label>
        <label className="space-y-2 text-sm font-semibold text-slate-700">Pet name<input name="petName" defaultValue={booking.petName} className="w-full rounded-lg border border-slate-300 px-3 py-2 font-normal" /></label>
        <label className="space-y-2 text-sm font-semibold text-slate-700">Email<input type="email" name="email" defaultValue={booking.email} className="w-full rounded-lg border border-slate-300 px-3 py-2 font-normal" /></label>
        <label className="space-y-2 text-sm font-semibold text-slate-700">Phone<input name="phone" defaultValue={booking.phone} className="w-full rounded-lg border border-slate-300 px-3 py-2 font-normal" /></label>
        <label className="space-y-2 text-sm font-semibold text-slate-700">Date<input type="date" name="bookingDate" defaultValue={booking.bookingDate} className="w-full rounded-lg border border-slate-300 px-3 py-2 font-normal" /></label>
        <label className="space-y-2 text-sm font-semibold text-slate-700">Time<input type="time" name="bookingTime" defaultValue={booking.bookingTime} className="w-full rounded-lg border border-slate-300 px-3 py-2 font-normal" /></label>
      </div>
      <label className="block space-y-2 text-sm font-semibold text-slate-700">Notes<textarea name="notes" defaultValue={booking.notes ?? ''} rows={4} className="w-full rounded-lg border border-slate-300 px-3 py-2 font-normal" /></label>
      <div className="flex flex-wrap gap-3">
        <button type="submit" className="rounded-lg bg-amber-700 px-4 py-2 text-sm font-semibold text-white hover:bg-amber-800">Save changes</button>
        <Link href={`/dashboard/bookings/${booking.id}`} className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">Cancel</Link>
      </div>
    </form>
  );
}