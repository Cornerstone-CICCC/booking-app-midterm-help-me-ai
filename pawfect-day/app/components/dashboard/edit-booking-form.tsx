'use client';

import Link from 'next/link';
import { useActionState } from 'react';
import { updateBookingAction } from '@/app/(dashboard)/dashboard/action';
import type { Booking } from '@/app/types/booking';

type EditBookingState = {
  success: boolean;
  message: string;
  errors?: Record<string, string>;
} | null;

export function EditBookingForm({ booking }: { booking: Booking }) {
  const [state, formAction, isPending] = useActionState<EditBookingState, FormData>(
    (_previousState: EditBookingState, formData: FormData) => updateBookingAction(booking.id, formData),
    null,
  );

  return (
    <form className="space-y-6" action={formAction}>
      {state?.message && (
        <p role="alert" className="rounded-lg bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          {state.message}
        </p>
      )}
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="space-y-2 text-sm font-semibold text-slate-700">Customer name<input required name="customerName" defaultValue={booking.customerName} className="w-full rounded-lg border border-slate-300 px-3 py-2 font-normal" />{state?.errors?.customerName && <span className="block text-xs font-normal text-red-600">{state.errors.customerName}</span>}</label>
        <label className="space-y-2 text-sm font-semibold text-slate-700">Pet name<input required name="petName" defaultValue={booking.petName} className="w-full rounded-lg border border-slate-300 px-3 py-2 font-normal" />{state?.errors?.petName && <span className="block text-xs font-normal text-red-600">{state.errors.petName}</span>}</label>
        <label className="space-y-2 text-sm font-semibold text-slate-700">Email<input required type="email" name="email" defaultValue={booking.email} className="w-full rounded-lg border border-slate-300 px-3 py-2 font-normal" />{state?.errors?.email && <span className="block text-xs font-normal text-red-600">{state.errors.email}</span>}</label>
        <label className="space-y-2 text-sm font-semibold text-slate-700">Phone<input required name="phone" defaultValue={booking.phone} className="w-full rounded-lg border border-slate-300 px-3 py-2 font-normal" />{state?.errors?.phone && <span className="block text-xs font-normal text-red-600">{state.errors.phone}</span>}</label>
        <label className="space-y-2 text-sm font-semibold text-slate-700">Service<select required name="service" defaultValue={booking.service} className="w-full rounded-lg border border-slate-300 px-3 py-2 font-normal"><option value="bath_and_brush">Bath &amp; Brush</option><option value="full_groom">Full Groom</option><option value="nail_trim">Nail Trim</option><option value="deshedding_treatment">De-shedding Treatment</option><option value="puppys_first_groom">Puppy&apos;s First Groom</option></select></label>
        <label className="space-y-2 text-sm font-semibold text-slate-700">Status<select required name="status" defaultValue={booking.status} className="w-full rounded-lg border border-slate-300 px-3 py-2 font-normal"><option value="pending">Pending</option><option value="confirmed">Confirmed</option><option value="completed">Completed</option><option value="cancelled">Cancelled</option></select></label>
        <label className="space-y-2 text-sm font-semibold text-slate-700">Date<input required type="date" name="bookingDate" defaultValue={booking.bookingDate} className="w-full rounded-lg border border-slate-300 px-3 py-2 font-normal" />{state?.errors?.bookingDate && <span className="block text-xs font-normal text-red-600">{state.errors.bookingDate}</span>}</label>
        <label className="space-y-2 text-sm font-semibold text-slate-700">Time<input required type="time" name="bookingTime" defaultValue={booking.bookingTime} className="w-full rounded-lg border border-slate-300 px-3 py-2 font-normal" />{state?.errors?.bookingTime && <span className="block text-xs font-normal text-red-600">{state.errors.bookingTime}</span>}</label>
      </div>
      <label className="block space-y-2 text-sm font-semibold text-slate-700">Notes<textarea name="notes" defaultValue={booking.notes ?? ''} rows={4} className="w-full rounded-lg border border-slate-300 px-3 py-2 font-normal" /></label>
      <div className="flex flex-wrap gap-3">
        <button disabled={isPending} type="submit" className="rounded-lg bg-amber-700 px-4 py-2 text-sm font-semibold text-white hover:bg-amber-800 disabled:cursor-not-allowed disabled:opacity-60">{isPending ? 'Saving...' : 'Save changes'}</button>
        <Link href={`/dashboard/bookings/${booking.id}`} className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">Cancel</Link>
      </div>
    </form>
  );
}