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
import InputField from "@/app/components/ui/InputField";
import Dropdown from "@/app/components/ui/Dropdown";
import Button from "@/app/components/ui/Button";

type Props = { booking: Booking };

interface Toast {
	id: string;
	message: string;
	type: "success" | "error";
}

const STATUSES: { value: BookingStatus; label: string; activeClass: string }[] =
	[
		{
			value: "pending",
			label: "Pending",
			activeClass: "bg-amber-light text-amber border-amber",
		},
		{
			value: "confirmed",
			label: "Confirmed",
			activeClass: "bg-sage-light text-sage border-sage",
		},
		{
			value: "completed",
			label: "Completed",
			activeClass: "bg-warm-muted text-brown-mid border-warm-border",
		},
		{
			value: "cancelled",
			label: "Cancelled",
			activeClass: "bg-terra-faint text-terra-dark border-terra",
		},
	];

const PET_TYPE_OPTIONS = ["Dog", "Cat"];
const PET_SIZE_OPTIONS = ["Small", "Medium", "Large"];
const TIME_OPTIONS = [
	"9:00 AM",
	"10:30 AM",
	"12:00 PM",
	"1:30 PM",
	"3:00 PM",
	"4:30 PM",
];
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

			{/* Main Content Area */}
			<main className="w-full px-5 py-8 sm:px-8 lg:px-12 lg:py-11">
				<div className="max-w-3xl mx-auto">
					{/* Header */}
					<div className="mb-8">
						<Link
							href={`/dashboard/bookings/${booking.id}`}
							className="flex items-center gap-1.5 text-sm text-brown-mid hover:text-terra transition-colors mb-3 font-semibold"
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
							Back to {booking.petName}’s Booking
						</Link>
						<h1 className="font-serif text-3xl font-bold text-brown">
							Edit Booking
						</h1>
						<p className="text-xs text-brown-mid mt-1 font-mono font-bold">
							{booking.referenceNumber}
						</p>
					</div>

					<div className="space-y-6">
						{/* Owner Section */}
						<div className="bg-white border border-warm-border rounded-2xl p-6 shadow-sm">
							<h2 className="font-semibold text-brown-mid text-xs uppercase tracking-wider mb-4">
								Owner Information
							</h2>
							<InputField
								id="customerName"
								label="Full Name"
								value={customerName}
								onChange={(e) => setCustomerName(e.target.value)}
								error={errors.customerName}
								required
							/>
							<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
								<InputField
									id="email"
									label="Email Address"
									type="email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									error={errors.email}
									required
								/>
								<InputField
									id="phone"
									label="Phone Number"
									type="tel"
									value={phone}
									onChange={(e) => setPhone(e.target.value)}
									error={errors.phone}
									required
								/>
							</div>
						</div>

						{/* Pet Section */}
						<div className="bg-white border border-warm-border rounded-2xl p-6 shadow-sm">
							<h2 className="font-semibold text-brown-mid text-xs uppercase tracking-wider mb-4">
								Pet Information
							</h2>
							<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
								<InputField
									id="petName"
									label="Pet Name"
									value={petName}
									onChange={(e) => setPetName(e.target.value)}
									error={errors.petName}
									required
								/>
								<InputField
									id="petBreed"
									label="Breed"
									value={petBreed}
									onChange={(e) => setPetBreed(e.target.value)}
									placeholder="e.g. Shiba Inu"
								/>
							</div>

							<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
								<Dropdown
									id="petType"
									label="Pet Type"
									options={PET_TYPE_OPTIONS}
									value={petType}
									onChange={(e) => setPetType(e.target.value as PetType)}
									required
								/>
								<Dropdown
									id="petSize"
									label="Pet Size"
									options={PET_SIZE_OPTIONS}
									value={petSize}
									onChange={(e) => setPetSize(e.target.value as PetSize)}
									required
								/>
							</div>

							<div className="mt-2">
								<label
									htmlFor="notes"
									className="block text-md font-semibold text-brown mb-1"
								>
									Special Care Notes
								</label>
								<textarea
									id="notes"
									value={notes}
									onChange={(e) => setNotes(e.target.value)}
									rows={3}
									placeholder="Allergies, sensitivities, coat conditions..."
									className="w-full rounded-md border border-warm-border bg-white px-3 py-2 text-md text-brown hover:border-brown focus-visible:outline-terra focus-visible:ring-2 focus-visible:ring-terra-light focus-visible:ring-offset-0"
								/>
							</div>
						</div>

						{/* Service & Status Section */}
						<div className="bg-white border border-warm-border rounded-2xl p-6 shadow-sm">
							<h2 className="font-semibold text-brown-mid text-xs uppercase tracking-wider mb-4">
								Service & Status
							</h2>

							<div className="mb-4">
								<label
									htmlFor="service"
									className="block text-md font-semibold text-brown mb-1"
								>
									Grooming Service <span className="text-red-500">*</span>
								</label>
								<select
									id="service"
									value={service}
									onChange={(e) => setService(e.target.value as ServiceType)}
									className="w-full rounded-md border border-warm-border bg-white px-3 py-2 text-md text-brown hover:border-brown focus-visible:outline-terra focus-visible:ring-2 focus-visible:ring-terra-light focus-visible:ring-offset-0"
								>
									{Object.entries(SERVICES_MASTER).map(([val, info]) => (
										<option key={val} value={val}>
											{info.name} (Est. {info.durationMinutes} min · Starting at
											${info.startingPrice})
										</option>
									))}
								</select>
								{errors.service && (
									<p className="mt-1 text-xs text-red-500">{errors.service}</p>
								)}
							</div>

							<div>
								<p className="block text-md font-semibold text-brown mb-2">
									Booking Status
								</p>
								<div className="flex flex-wrap gap-2">
									{STATUSES.map((s) => (
										<button
											key={s.value}
											type="button"
											onClick={() => setStatus(s.value)}
											className={`px-4 py-2 rounded-xl border text-sm font-semibold transition-all cursor-pointer ${
												status === s.value
													? `${s.activeClass} ring-2 ring-terra/20`
													: "border-warm-border bg-white text-brown-mid hover:border-terra/50"
											}`}
										>
											{s.label}
										</button>
									))}
								</div>
							</div>
						</div>

						{/* Date & Time Section */}
						<div className="bg-white border border-warm-border rounded-2xl p-6 shadow-sm">
							<h2 className="font-semibold text-brown-mid text-xs uppercase tracking-wider mb-4">
								Date & Time
							</h2>

							<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
								<InputField
									id="bookingDate"
									label="Appointment Date"
									type="date"
									value={bookingDate}
									onChange={(e) => setBookingDate(e.target.value)}
									error={errors.bookingDate}
									required
								/>
								<Dropdown
									id="bookingTime"
									label="Appointment Time"
									options={TIME_OPTIONS}
									value={bookingTime}
									onChange={(e) => setBookingTime(e.target.value)}
									error={errors.bookingTime}
									required
								/>
							</div>

							<Dropdown
								id="alternateTime"
								label="Alternate Time (Optional)"
								options={[
									"None",
									...TIME_OPTIONS.filter((t) => t !== bookingTime),
								]}
								value={alternateTime || "None"}
								onChange={(e) =>
									setAlternateTime(
										e.target.value === "None" ? "" : e.target.value,
									)
								}
							/>
						</div>

						{/* Action Buttons */}
						<div className="flex gap-3 justify-end pt-2">
							<Link href={`/dashboard/bookings/${booking.id}`}>
								<Button variant="secondary">Cancel</Button>
							</Link>
							<Button
								variant="primary"
								onClick={handleSave}
								disabled={isPending}
							>
								{isPending ? "Saving..." : "Save Changes"}
							</Button>
						</div>
					</div>
				</div>
			</main>
		</div>
	);
}
