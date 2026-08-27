"use client";

import { useState, useTransition } from "react";
import { BookingStatus, Booking } from "@/app/types/booking";
import { changeStatusAction } from "@/app/(dashboard)/dashboard/action";

interface StatusModalProps {
	booking: Booking | null;
	onClose: () => void;
}

const statusOptions: { value: BookingStatus; label: string }[] = [
	{ value: "pending", label: "Pending" },
	{ value: "confirmed", label: "Confirmed" },
	{ value: "completed", label: "Completed" },
	{ value: "cancelled", label: "Cancelled" },
];

export default function StatusModal({ booking, onClose }: StatusModalProps) {
	const [status, setStatus] = useState<BookingStatus>(
		booking?.status || "pending",
	);
	const [error, setError] = useState<string | null>(null);
	const [isPending, startTransition] = useTransition();

	if (!booking) return null;

	const handleUpdate = () => {
		setError(null);
		startTransition(async () => {
			const res = await changeStatusAction(booking.id, status);
			if (res.success) {
				onClose();
			} else {
				setError(res.message || "Failed to update status.");
			}
		});
	};

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
			<div className="w-full max-w-md rounded-2xl border border-[#e8ded2] bg-white p-6 shadow-xl">
				<h3 className="text-xl font-bold font-serif text-[#3d3028]">
					Change Booking Status
				</h3>
				<p className="mt-1 text-sm text-[#8f8075]">
					Update the current status for <strong>{booking.petName}</strong> (
					{booking.referenceNumber}).
				</p>

				{error && (
					<div className="mt-4 rounded-xl bg-rose-50 p-3 text-xs font-semibold text-rose-700">
						{error}
					</div>
				)}

				<div className="mt-5 space-y-4">
					<div>
						<label className="text-xs font-semibold uppercase tracking-wider text-[#a29488]">
							Current Status
						</label>
						<p className="mt-1 text-sm font-semibold capitalize text-[#3d3028]">
							{booking.status}
						</p>
					</div>

					<div>
						<label className="text-xs font-semibold uppercase tracking-wider text-[#a29488]">
							New Status
						</label>
						<select
							value={status}
							onChange={(e) => setStatus(e.target.value as BookingStatus)}
							className="mt-1 w-full rounded-xl border border-[#e8ded2] bg-[#fffdfa] px-4 py-2.5 text-sm outline-none focus:border-[#b85d3d]"
							disabled={isPending}
						>
							{statusOptions.map((opt) => (
								<option key={opt.value} value={opt.value}>
									{opt.label}
								</option>
							))}
						</select>
					</div>
				</div>

				<div className="mt-6 flex justify-end gap-3">
					<button
						type="button"
						onClick={onClose}
						disabled={isPending}
						className="rounded-xl border border-[#e2d5c7] px-4 py-2 text-sm font-semibold text-[#806e62] hover:bg-stone-50"
					>
						Cancel
					</button>
					<button
						type="button"
						onClick={handleUpdate}
						disabled={isPending}
						className="rounded-xl bg-[#c6532c] px-4 py-2 text-sm font-semibold text-white hover:bg-[#b85d3d] disabled:opacity-50"
					>
						{isPending ? "Updating..." : "Update Status"}
					</button>
				</div>
			</div>
		</div>
	);
}
