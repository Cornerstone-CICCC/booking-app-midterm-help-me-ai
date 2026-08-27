"use client";

import { useState, useTransition } from "react";
import { Booking } from "@/app/types/booking";
import { deleteBookingAction } from "@/app/(dashboard)/dashboard/action";

interface DeleteModalProps {
	booking: Booking | null;
	onClose: () => void;
}

export default function DeleteModal({ booking, onClose }: DeleteModalProps) {
	const [error, setError] = useState<string | null>(null);
	const [isPending, startTransition] = useTransition();

	if (!booking) return null;

	const handleDelete = () => {
		setError(null);
		startTransition(async () => {
			const res = await deleteBookingAction(booking.id);
			if (res.success) {
				onClose();
			} else {
				setError(res.message || "Failed to delete booking.");
			}
		});
	};

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
			<div className="w-full max-w-md rounded-2xl border border-[#e8ded2] bg-white p-6 shadow-xl">
				<h3 className="text-xl font-bold font-serif text-rose-800">
					Delete this booking?
				</h3>
				<p className="mt-2 text-sm text-[#8f8075]">
					This will permanently remove <strong>{booking.petName}</strong>’s
					booking ({booking.referenceNumber}). This action cannot be undone.
				</p>

				{error && (
					<div className="mt-4 rounded-xl bg-rose-50 p-3 text-xs font-semibold text-rose-700">
						{error}
					</div>
				)}

				<div className="mt-6 flex justify-end gap-3">
					<button
						type="button"
						onClick={onClose}
						disabled={isPending}
						className="rounded-xl border border-[#e2d5c7] px-4 py-2 text-sm font-semibold text-[#806e62] hover:bg-stone-50"
					>
						Keep Booking
					</button>
					<button
						type="button"
						onClick={handleDelete}
						disabled={isPending}
						className="rounded-xl bg-rose-600 px-4 py-2 text-sm font-semibold text-white hover:bg-rose-700 disabled:opacity-50"
					>
						{isPending ? "Deleting..." : "Delete Booking"}
					</button>
				</div>
			</div>
		</div>
	);
}
