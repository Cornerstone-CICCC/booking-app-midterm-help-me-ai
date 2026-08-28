"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { updateBookingAction } from "@/app/(dashboard)/dashboard/action";
import type { Booking, BookingStatus } from "@/app/types/booking";
import { SERVICES_MASTER } from "@/app/types/booking";

type Props = { booking: Booking };

const statusOptions: { value: BookingStatus; label: string }[] = [
	{ value: "pending", label: "Pending" },
	{ value: "confirmed", label: "Confirmed" },
	{ value: "completed", label: "Completed" },
	{ value: "cancelled", label: "Cancelled" },
];

const timeOptions = ["10:30 AM", "12:00 PM", "1:30 PM", "4:30 PM"];

type FieldErrors = Record<string, string>;

function FieldError({ message }: { message?: string }) {
	if (!message) return null;

	return <p className="mt-1 text-xs font-semibold text-rose-700">{message}</p>;
}

export default function EditBookingClient({ booking }: Props) {
	const router = useRouter();
	const [isPending, startTransition] = useTransition();
	const [message, setMessage] = useState<string | null>(null);
	const [errors, setErrors] = useState<FieldErrors>({});

	function handleSubmit(formData: FormData) {
		setMessage(null);
		setErrors({});

		startTransition(async () => {
			const result = await updateBookingAction(booking.id, formData);

			if (result.success) {
				router.push(`/dashboard/bookings/${booking.id}`);
				router.refresh();
				return;
			}

			setMessage(result.message || "Could not update this booking.");
			setErrors(result.errors || {});
		});
	}

	return (
		<div className="min-h-screen bg-[#fbf8f2] text-[#3d3028] md:flex">
			<aside className="flex w-full flex-col border-b border-[#e2d5c7] bg-[#f8f4ed] px-7 py-7 md:min-h-screen md:w-[298px] md:border-b-0 md:border-r md:px-8 md:py-8">
				<div className="flex items-center gap-2 text-[22px] font-bold text-[#c6532c]">
					<span className="text-xl">🐾</span>Pawfect Day
				</div>
				<div className="mt-10 text-xs font-semibold uppercase tracking-widest text-[#a29488]">
					Staff Dashboard
				</div>
				<Link
					className="mt-8 rounded-xl bg-[#fff0eb] px-4 py-4 text-sm font-bold text-[#c6532c]"
					href="/dashboard"
				>
					<span className="mr-3">▣</span>Bookings
				</Link>
			</aside>

			<main className="w-full px-5 py-8 sm:px-8 lg:px-12 lg:py-11">
				<div className="mx-auto max-w-4xl">
					<Link
						href={`/dashboard/bookings/${booking.id}`}
						className="text-sm font-semibold text-[#8f8075] transition-colors hover:text-[#c6532c]"
					>
						Back to booking
					</Link>

					<header className="mt-4">
						<p className="font-mono text-sm font-bold text-[#b85d3d]">
							{booking.referenceNumber}
						</p>
						<h1 className="mt-2 font-serif text-4xl font-bold tracking-tight sm:text-5xl">
							Edit Booking
						</h1>
						<p className="mt-2 text-base text-[#8f8075]">
							Update the appointment details for {booking.petName}.
						</p>
					</header>

					<form
						action={handleSubmit}
						className="mt-8 rounded-2xl border border-[#e8ded2] bg-white p-5 shadow-sm sm:p-6"
					>
						{message && (
							<div className="mb-6 rounded-xl bg-rose-50 p-3 text-sm font-semibold text-rose-700">
								{message}
							</div>
						)}

						<div className="grid gap-5 md:grid-cols-2">
							<div>
								<label
									htmlFor="customerName"
									className="text-xs font-semibold uppercase tracking-wider text-[#a29488]"
								>
									Owner Name
								</label>
								<input
									id="customerName"
									name="customerName"
									defaultValue={booking.customerName}
									className="mt-1 w-full rounded-xl border border-[#e8ded2] bg-[#fffdfa] px-4 py-3 text-sm outline-none focus:border-[#b85d3d]"
								/>
								<FieldError message={errors.customerName} />
							</div>

							<div>
								<label
									htmlFor="petName"
									className="text-xs font-semibold uppercase tracking-wider text-[#a29488]"
								>
									Pet Name
								</label>
								<input
									id="petName"
									name="petName"
									defaultValue={booking.petName}
									className="mt-1 w-full rounded-xl border border-[#e8ded2] bg-[#fffdfa] px-4 py-3 text-sm outline-none focus:border-[#b85d3d]"
								/>
								<FieldError message={errors.petName} />
							</div>

							<div>
								<label
									htmlFor="email"
									className="text-xs font-semibold uppercase tracking-wider text-[#a29488]"
								>
									Email
								</label>
								<input
									id="email"
									name="email"
									type="email"
									defaultValue={booking.email}
									className="mt-1 w-full rounded-xl border border-[#e8ded2] bg-[#fffdfa] px-4 py-3 text-sm outline-none focus:border-[#b85d3d]"
								/>
								<FieldError message={errors.email} />
							</div>

							<div>
								<label
									htmlFor="phone"
									className="text-xs font-semibold uppercase tracking-wider text-[#a29488]"
								>
									Phone
								</label>
								<input
									id="phone"
									name="phone"
									defaultValue={booking.phone}
									className="mt-1 w-full rounded-xl border border-[#e8ded2] bg-[#fffdfa] px-4 py-3 text-sm outline-none focus:border-[#b85d3d]"
								/>
								<FieldError message={errors.phone} />
							</div>

							<div>
								<label
									htmlFor="service"
									className="text-xs font-semibold uppercase tracking-wider text-[#a29488]"
								>
									Service
								</label>
								<select
									id="service"
									name="service"
									defaultValue={booking.service}
									className="mt-1 w-full rounded-xl border border-[#e8ded2] bg-[#fffdfa] px-4 py-3 text-sm outline-none focus:border-[#b85d3d]"
								>
									{Object.entries(SERVICES_MASTER).map(([key, service]) => (
										<option key={key} value={key}>
											{service.name}
										</option>
									))}
								</select>
								<FieldError message={errors.service} />
							</div>

							<div>
								<label
									htmlFor="status"
									className="text-xs font-semibold uppercase tracking-wider text-[#a29488]"
								>
									Status
								</label>
								<select
									id="status"
									name="status"
									defaultValue={booking.status}
									className="mt-1 w-full rounded-xl border border-[#e8ded2] bg-[#fffdfa] px-4 py-3 text-sm outline-none focus:border-[#b85d3d]"
								>
									{statusOptions.map((status) => (
										<option key={status.value} value={status.value}>
											{status.label}
										</option>
									))}
								</select>
								<FieldError message={errors.status} />
							</div>

							<div>
								<label
									htmlFor="bookingDate"
									className="text-xs font-semibold uppercase tracking-wider text-[#a29488]"
								>
									Date
								</label>
								<input
									id="bookingDate"
									name="bookingDate"
									type="date"
									defaultValue={booking.bookingDate}
									className="mt-1 w-full rounded-xl border border-[#e8ded2] bg-[#fffdfa] px-4 py-3 text-sm outline-none focus:border-[#b85d3d]"
								/>
								<FieldError message={errors.bookingDate} />
							</div>

							<div>
								<label
									htmlFor="bookingTime"
									className="text-xs font-semibold uppercase tracking-wider text-[#a29488]"
								>
									Time
								</label>
								<select
									id="bookingTime"
									name="bookingTime"
									defaultValue={booking.bookingTime}
									className="mt-1 w-full rounded-xl border border-[#e8ded2] bg-[#fffdfa] px-4 py-3 text-sm outline-none focus:border-[#b85d3d]"
								>
									{timeOptions.map((time) => (
										<option key={time} value={time}>
											{time}
										</option>
									))}
								</select>
								<FieldError message={errors.bookingTime} />
							</div>
						</div>

						<div className="mt-5">
							<label
								htmlFor="notes"
								className="text-xs font-semibold uppercase tracking-wider text-[#a29488]"
							>
								Notes
							</label>
							<textarea
								id="notes"
								name="notes"
								defaultValue={booking.notes || ""}
								rows={5}
								className="mt-1 w-full rounded-xl border border-[#e8ded2] bg-[#fffdfa] px-4 py-3 text-sm outline-none focus:border-[#b85d3d]"
							/>
						</div>

						<div className="mt-7 flex flex-wrap justify-end gap-3">
							<Link
								href={`/dashboard/bookings/${booking.id}`}
								className="rounded-xl border border-[#e2d5c7] px-5 py-3 text-sm font-semibold text-[#806e62] transition-colors hover:bg-stone-50"
							>
								Cancel
							</Link>
							<button
								type="submit"
								disabled={isPending}
								className="rounded-xl bg-[#c6532c] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#b85d3d] disabled:opacity-50"
							>
								{isPending ? "Saving..." : "Save Changes"}
							</button>
						</div>
					</form>
				</div>
			</main>
		</div>
	);
}
