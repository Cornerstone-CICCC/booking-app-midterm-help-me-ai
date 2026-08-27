'use client';

import Link from 'next/link';
import { useState } from 'react';
import type { Booking } from '@/app/types/booking';

type Dialog = 'status' | 'delete' | null;

export function BookingManagementActions({ booking }: { booking: Booking }) {
  const [dialog, setDialog] = useState<Dialog>(null);

  return (
    <>
      <div className="flex flex-wrap gap-3">
        <Link href={`/dashboard/bookings/${booking.id}/edit`} className="rounded-lg bg-amber-700 px-4 py-2 text-sm font-semibold text-white hover:bg-amber-800">
          Edit booking
        </Link>
        <button type="button" onClick={() => setDialog('status')} className="rounded-lg border border-amber-200 bg-white px-4 py-2 text-sm font-semibold text-amber-900 hover:bg-amber-50">
          Change status
        </button>
        <button type="button" onClick={() => setDialog('delete')} className="rounded-lg border border-red-200 bg-white px-4 py-2 text-sm font-semibold text-red-700 hover:bg-red-50">
          Delete booking
        </button>
      </div>

      {dialog && (
        <div className="fixed inset-0 z-10 flex items-center justify-center bg-slate-950/40 p-4" role="presentation">
          <div role="dialog" aria-modal="true" aria-labelledby="management-dialog-title" className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
            <h2 id="management-dialog-title" className="text-xl font-bold text-amber-950">
              {dialog === 'status' ? 'Change booking status' : 'Delete booking'}
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              {dialog === 'status'
                ? 'Choose the new status for this appointment.'
                : `Delete ${booking.petName}'s appointment? This action will require confirmation.`}
            </p>
            {dialog === 'status' && (
              <select defaultValue={booking.status} className="mt-4 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm">
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            )}
            <div className="mt-6 flex justify-end gap-3">
              <button type="button" onClick={() => setDialog(null)} className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">Cancel</button>
              <button type="button" onClick={() => setDialog(null)} className={`rounded-lg px-4 py-2 text-sm font-semibold text-white ${dialog === 'delete' ? 'bg-red-700 hover:bg-red-800' : 'bg-amber-700 hover:bg-amber-800'}`}>
                {dialog === 'delete' ? 'Confirm deletion' : 'Save status'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}