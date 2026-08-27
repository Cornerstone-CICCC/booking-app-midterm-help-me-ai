"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type {
	Booking,
	BookingStatus,
	PetSize,
	PetType,
	ServiceType,
} from "@/app/types/booking";
import { SERVICES_MASTER } from "@/app/types/booking";
import { updateBookingAction } from "@/app/(dashboard)/dashboard/action";

type Props = { booking: Booking };

interface Toast {
	id: string;
	message: string;
	type: "success" | "error";
}

const STATUSES: { value: BookingStatus; label: string; badgeCls: string }[] = [
	{
		value: "pending",
		label: "Pending",
		badgeCls: "bg-amber-100 text-amber-800",
	},
	{
		value: "confirmed",
		label: "Confirmed",
		badgeCls: "bg-emerald-100 text-emerald-800",
	},
	{
		value: "completed",
		label: "Completed",
		badgeCls: "bg-stone-200 text-stone-700",
	},
	{
		value: "cancelled",
		label: "Cancelled",
		badgeCls: "bg-rose-100 text-rose-800",
	},
];

const PET_SIZES: PetSize[] = ["small", "medium", "large"];

const AVAILABLE_TIMES = [
	"9:00 AM",
	"10:30 AM",
	"12:00 PM",
	"1:30 PM",
	"3:00 PM",
	"4:30 PM",
];

const Field = ({
	id,
	label,
	error,
	required,
	children,
}: {
	id: string;
	label: string;
	error?: string;
	required?: boolean;
	children: React.ReactNode;
}) => (
	<div>
		<label
			htmlFor={id}
			className="block text-sm font-semibold text-[#3d3028] mb-1.5"
		>
			{label}
			{required && <span className="text-[#c6532c] ml-1">*</span>}
		</label>
		{children}
		{error && (
			<p className="mt-1.5 text-xs font-semibold text-rose-600">⚠ {error}</p>
		)}
	</div>
);

const inputCls = (err?: string) =>
	`w-full px-4 py-3 rounded-xl border bg-[#fffdfa] text-sm text-[#3d3028] transition-colors outline-none
     focus:ring-2 focus:ring-[#c6532c]/20 focus:border-[#c6532c]
     ${err ? "border-rose-500 bg-rose-50/40" : "border-[#e8ded2] hover:border-[#b85d3d]"}`;

export default function EditClient({ booking }: Props) {
	const router = useRouter();
	const [isPending, startTransition] = useTransition();

	// Form State initialized with DB data
	const [customerName, setCustomerName] = useState(booking.customerName);
	const [email, setEmail] = useState(booking.email);
	const [phone, setPhone] = useState(booking.phone);
	const [petName, setPetName] = useState(booking.petName);
	const [petType, setPetType] = useState<PetType>(booking.petType);
	const [petBreed, setPetBreed] = useState(booking.petBreed || "");
	const [petSize, setPetSize] = useState<PetSize>(booking.petSize);
	const [service, setService] = useState<ServiceType>(booking.service);
	const [bookingDate, setBookingDate] = useState(booking.bookingDate);
	const [bookingTime, setBookingTime] = useState(booking.bookingTime);
	const [alternateTime, setAlternateTime] = useState(
		booking.alternateTime || "",
	);
	const [notes, setNotes] = useState(booking.notes || "");
	const [status, setStatus] = useState<BookingStatus>(booking.status);

	const [errors, setErrors] = useState<Record<string, string>>({});
	const [toasts, setToasts] = useState<Toast[]>([]);

	const showToast = (
		message: string,
		type: "success" | "error" = "success",
	) => {
		const id = Date.now().toString();
		setToasts((prev) => [...prev, { id, message, type }]);
		setTimeout(() => {
			setToasts((prev) => prev.filter((t) => t.id !== id));
		}, 4000);
	};

	const handleSave = () => {
		setErrors({});
		const formData = new FormData();
		formData.append("customerName", customerName);
		formData.append("email", email);
		formData.append("phone", phone);
		formData.append("petName", petName);
		formData.append("petType", petType);
		formData.append("petBreed", petBreed);
		formData.append("petSize", petSize);
		formData.append("service", service);
		formData.append("bookingDate", bookingDate);
		formData.append("bookingTime", bookingTime);
		formData.append("alternateTime", alternateTime);
		formData.append("notes", notes);
		formData.append("status", status);

		startTransition(async () => {
			const res = await updateBookingAction(booking.id, formData);
      
			if (res.success) {
				showToast("Booking updated successfully.", "success");
				setTimeout(() => {
					router.push(`/dashboard/bookings/${booking.id}`);
				}, 1000);
			} else {
				if (res.errors) {
					setErrors(res.errors);
				}
				showToast(res.message || "Failed to update booking.", "error");
			}
		});
	};

	return (
		<div className="min-h-screen bg-[#fbf8f2] text-[#3d3028] md:flex">
			{/* Toast Notification Container */}
			<div className="fixed top-5 right-5 z-50 space-y-2">
				{toasts.map((toast) => (
					<div
						key={toast.id}
						className={`rounded-xl px-4 py-3 text-sm font-semibold shadow-lg text-white ${
							toast.type === "success" ? "bg-emerald-600" : "bg-rose-600"
						}`}
					>
						{toast.message}
					</div>
				))}
			</div>

			{/* Sidebar */}
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

			{/* Main Content */}
			<main className="w-full px-5 py-8 sm:px-8 lg:px-12 lg:py-11">
				<div className="max-w-3xl mx-auto">
					{/* Header */}
					<div className="mb-8">
						<Link
							href={`/dashboard/bookings/${booking.id}`}
							className="flex items-center gap-1.5 text-sm text-[#8f8075] hover:text-[#c6532c] transition-colors mb-3 font-semibold"
						>
							<svg
								className="w-4 h-4"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M15 19l-7-7 7-7"
								/>
							</svg>
							Back to {booking.petName}'s Booking
						</Link>
						<h1 className="font-serif text-3xl font-bold text-[#3d3028]">
							Edit Booking
						</h1>
						<p className="text-xs text-[#8f8075] mt-1 font-mono font-bold">
							{booking.referenceNumber}
						</p>
					</div>

					<div className="space-y-6">
						{/* Owner Section */}
						<div className="bg-white border border-[#e8ded2] rounded-2xl p-6 space-y-5 shadow-sm">
							<h2 className="font-semibold text-[#a29488] text-xs uppercase tracking-wider">
								Owner Information
							</h2>
							<Field
								id="customerName"
								label="Full Name"
								error={errors.customerName}
								required
							>
								<input
									id="customerName"
									type="text"
									value={customerName}
									onChange={(e) => setCustomerName(e.target.value)}
									className={inputCls(errors.customerName)}
								/>
							</Field>
							<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
								<Field
									id="email"
									label="Email Address"
									error={errors.email}
									required
								>
									<input
										id="email"
										type="email"
										value={email}
										onChange={(e) => setEmail(e.target.value)}
										className={inputCls(errors.email)}
									/>
								</Field>
								<Field
									id="phone"
									label="Phone Number"
									error={errors.phone}
									required
								>
									<input
										id="phone"
										type="tel"
										value={phone}
										onChange={(e) => setPhone(e.target.value)}
										className={inputCls(errors.phone)}
									/>
								</Field>
							</div>
						</div>

						{/* Pet Section */}
						<div className="bg-white border border-[#e8ded2] rounded-2xl p-6 space-y-5 shadow-sm">
							<h2 className="font-semibold text-[#a29488] text-xs uppercase tracking-wider">
								Pet Information
							</h2>
							<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
								<Field
									id="petName"
									label="Pet Name"
									error={errors.petName}
									required
								>
									<input
										id="petName"
										type="text"
										value={petName}
										onChange={(e) => setPetName(e.target.value)}
										className={inputCls(errors.petName)}
									/>
								</Field>
								<Field id="petBreed" label="Breed">
									<input
										id="petBreed"
										type="text"
										value={petBreed}
										onChange={(e) => setPetBreed(e.target.value)}
										className={inputCls()}
									/>
								</Field>
							</div>

							<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
								<Field id="petType" label="Pet Type" required>
									<select
										id="petType"
										value={petType}
										onChange={(e) => setPetType(e.target.value as PetType)}
										className={inputCls()}
									>
										<option value="dog">Dog</option>
										<option value="cat">Cat</option>
									</select>
								</Field>
								<Field id="petSize" label="Pet Size" required>
									<select
										id="petSize"
										value={petSize}
										onChange={(e) => setPetSize(e.target.value as PetSize)}
										className={inputCls()}
									>
										{PET_SIZES.map((s) => (
											<option key={s} value={s}>
												{s.charAt(0).toUpperCase() + s.slice(1)}
											</option>
										))}
									</select>
								</Field>
							</div>

							<Field id="notes" label="Special Care Notes">
								<textarea
									id="notes"
									value={notes}
									onChange={(e) => setNotes(e.target.value)}
									rows={3}
									className={inputCls()}
									placeholder="Allergies, sensitivities, coat conditions..."
								/>
							</Field>
						</div>

						{/* Service & Status Section */}
						<div className="bg-white border border-[#e8ded2] rounded-2xl p-6 space-y-5 shadow-sm">
							<h2 className="font-semibold text-[#a29488] text-xs uppercase tracking-wider">
								Service & Status
							</h2>
							<Field
								id="service"
								label="Grooming Service"
								error={errors.service}
								required
							>
								<select
									id="service"
									value={service}
									onChange={(e) => setService(e.target.value as ServiceType)}
									className={inputCls(errors.service)}
								>
									{Object.entries(SERVICES_MASTER).map(([val, info]) => (
										<option key={val} value={val}>
											{info.name} (Est. {info.durationMinutes} min · Starting at
											${info.startingPrice})
										</option>
									))}
								</select>
							</Field>

							<div>
								<p className="text-sm font-semibold text-[#3d3028] mb-2">
									Booking Status
								</p>
								<div className="flex flex-wrap gap-2">
									{STATUSES.map((s) => (
										<button
											key={s.value}
											type="button"
											onClick={() => setStatus(s.value)}
											className={`px-4 py-2 rounded-xl border transition-all cursor-pointer font-semibold text-xs ${
												status === s.value
													? `${s.badgeCls} border-current ring-2 ring-current/20`
													: "border-[#e2d5c7] bg-[#f8f4ed] text-[#806e62] hover:border-[#b85d3d]"
											}`}
										>
											{s.label}
										</button>
									))}
								</div>
							</div>
						</div>

						{/* Date & Time Section */}
						<div className="bg-white border border-[#e8ded2] rounded-2xl p-6 space-y-5 shadow-sm">
							<h2 className="font-semibold text-[#a29488] text-xs uppercase tracking-wider">
								Date & Time
							</h2>

							<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
								<Field
									id="bookingDate"
									label="Appointment Date"
									error={errors.bookingDate}
									required
								>
									<input
										id="bookingDate"
										type="date"
										value={bookingDate}
										onChange={(e) => setBookingDate(e.target.value)}
										className={inputCls(errors.bookingDate)}
									/>
								</Field>

								<Field
									id="bookingTime"
									label="Appointment Time Slot"
									error={errors.bookingTime}
									required
								>
									<select
										id="bookingTime"
										value={bookingTime}
										onChange={(e) => setBookingTime(e.target.value)}
										className={inputCls(errors.bookingTime)}
									>
										{AVAILABLE_TIMES.map((time) => (
											<option key={time} value={time}>
												{time}
											</option>
										))}
									</select>
								</Field>
							</div>

							<Field id="alternateTime" label="Alternate Time (Optional)">
								<select
									id="alternateTime"
									value={alternateTime}
									onChange={(e) => setAlternateTime(e.target.value)}
									className={inputCls()}
								>
									<option value="">None</option>
									{AVAILABLE_TIMES.filter((t) => t !== bookingTime).map((t) => (
										<option key={t} value={t}>
											{t}
										</option>
									))}
								</select>
							</Field>
						</div>

						{/* Actions */}
						<div className="flex gap-3 justify-end pt-2">
							<Link
								href={`/dashboard/bookings/${booking.id}`}
								className="px-6 py-3 text-sm font-semibold text-[#806e62] border border-[#e2d5c7] rounded-xl hover:bg-stone-50 transition-colors"
							>
								Cancel
							</Link>
							<button
								type="button"
								onClick={handleSave}
								disabled={isPending}
								className="px-8 py-3 text-sm font-semibold text-white bg-[#c6532c] rounded-xl hover:bg-[#b85d3d] transition-colors disabled:opacity-60 flex items-center gap-2 cursor-pointer shadow-sm"
							>
								{isPending ? (
									<>
										<svg
											className="animate-spin size-4"
											viewBox="0 0 24 24"
											fill="none"
										>
											<circle
												className="opacity-25"
												cx="12"
												cy="12"
												r="10"
												stroke="currentColor"
												strokeWidth="4"
											/>
											<path
												className="opacity-75"
												fill="currentColor"
												d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
											/>
										</svg>
										Saving...
									</>
								) : (
									"Save Changes"
								)}
							</button>
						</div>
					</div>
				</div>
			</main>
		</div>
	);
}
