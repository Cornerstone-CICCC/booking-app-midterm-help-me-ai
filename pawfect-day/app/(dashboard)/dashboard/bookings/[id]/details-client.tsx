"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { Booking, BookingStatus, ServiceType } from "@/app/types/booking";
import { User } from "@/app/types/user";
import { SERVICES_MASTER } from "@/app/types/booking";
import StatusModal from "@/app/components/dashboard/status-modal";
import DeleteModal from "@/app/components/dashboard/delete-modal";

import Sidebar from "@/app/components/Sidebar";

type Props = { booking: Booking, user: User | null };

const statusLabels: Record<BookingStatus, string> = {
	pending: "Pending",
	confirmed: "Confirmed",
	completed: "Completed",
	cancelled: "Cancelled",
};

const statusStyles: Record<BookingStatus, string> = {
	pending: "bg-amber-100 text-amber-800 hover:bg-amber-200",
	confirmed: "bg-emerald-100 text-emerald-800 hover:bg-emerald-200",
	completed: "bg-stone-200 text-stone-700 hover:bg-stone-300",
	cancelled: "bg-rose-100 text-rose-800 hover:bg-rose-200",
};

// format date only date, not time, in a human-readable format
function formatDate(value?: string | Date) {
	if (!value) return "Not specified";

	const date = typeof value === "string" ? new Date(value) : value;

	if (isNaN(date.getTime())) return String(value);

	return new Intl.DateTimeFormat("en-US", {
		month: "short",
		day: "numeric",
		year: "numeric",
	}).format(date);
}

function StatusBadge({
	status,
	onClick,
}: {
	status: BookingStatus;
	onClick?: () => void;
}) {
	return (
		<button
			type="button"
			onClick={onClick}
			className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold transition-colors cursor-pointer ${statusStyles[status]}`}
			title="Click to change status"
		>
			<span className="h-1.5 w-1.5 rounded-full bg-current" />
			{statusLabels[status]}
		</button>
	);
}

export default function DetailsClient({ booking, user }: Props) {
	const router = useRouter();
	const [statusDialog, setStatusDialog] = useState(false);
	const [deleteDialog, setDeleteDialog] = useState(false);

	const serviceInfo = SERVICES_MASTER[booking.service as ServiceType];

	return (
		<div className="min-h-screen bg-[#fbf8f2] text-[#3d3028] md:flex">
			{/* Modals connected to Server Actions */}
			{statusDialog && (
				<StatusModal booking={booking} onClose={() => setStatusDialog(false)} />
			)}
			{deleteDialog && (
				<DeleteModal
					booking={booking}
					onClose={() => {
						setDeleteDialog(false);
						router.push("/dashboard");
					}}
				/>
			)}

			{/* Staff Sidebar */}
			<Sidebar user={user} />

			{/* Main Content Area */}
			<main className="w-full px-5 py-8 sm:px-8 lg:px-12 lg:py-11">
				<div className="max-w-4xl mx-auto">
					{/* Header */}
					<div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-8">
						<div>
							<Link
								href="/dashboard"
								className="flex items-center gap-1.5 text-sm text-[#8f8075] hover:text-terra transition-colors mb-3 font-semibold"
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
								Back to Bookings
							</Link>
							<div className="flex items-center gap-3 flex-wrap">
								<h1 className="font-serif text-3xl font-bold text-[#3d3028] sm:text-4xl">
									{booking.petName}’s Appointment
								</h1>
								<StatusBadge
									status={booking.status}
									onClick={() => setStatusDialog(true)}
								/>
							</div>
							<p className="text-[#8f8075] text-sm mt-1 font-mono font-bold">
								{booking.referenceNumber}
							</p>
						</div>

						<div className="flex items-center gap-2 shrink-0">
							<Link
								href={`/dashboard/bookings/${booking.id}/edit`}
								className="px-4 py-2 text-sm font-semibold text-[#3d3028] border border-[#e2d5c7] bg-white rounded-xl hover:bg-stone-50 transition-colors"
							>
								Edit
							</Link>
							<button
								type="button"
								onClick={() => setStatusDialog(true)}
								className="px-4 py-2 text-sm font-semibold text-white bg-terra rounded-xl hover:bg-[#b85d3d] transition-colors cursor-pointer"
							>
								Change Status
							</button>
						</div>
					</div>

					<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
						{/* Main details */}
						<div className="lg:col-span-2 space-y-5">
							{/* Owner Information */}
							<div className="bg-white border border-[#e8ded2] rounded-2xl p-6 shadow-sm">
								<h2 className="font-semibold uppercase tracking-wider text-xs text-[#a29488] mb-4">
									Owner Information
								</h2>
								<dl className="space-y-3">
									{[
										{ label: "Full Name", value: booking.customerName },
										{ label: "Email", value: booking.email },
										{ label: "Phone", value: booking.phone },
									].map(({ label, value }) => (
										<div key={label} className="flex gap-4">
											<dt className="text-xs text-[#8f8075] w-24 shrink-0 pt-0.5">
												{label}
											</dt>
											<dd className="text-sm text-[#3d3028] font-medium">
												{value}
											</dd>
										</div>
									))}
								</dl>
							</div>

							{/* Pet Information */}
							<div className="bg-white border border-[#e8ded2] rounded-2xl p-6 shadow-sm">
								<h2 className="font-semibold uppercase tracking-wider text-xs text-[#a29488] mb-4">
									Pet Information
								</h2>
								<dl className="space-y-3">
									{[
										{ label: "Pet Name", value: booking.petName },
										{
											label: "Type",
											value: `${booking.petType.charAt(0).toUpperCase()}${booking.petType.slice(1)}`,
										},
										{
											label: "Breed",
											value: booking.petBreed || "Not specified",
										},
										{
											label: "Size",
											value: `${booking.petSize.charAt(0).toUpperCase()}${booking.petSize.slice(1)}`,
										},
									].map(({ label, value }) => (
										<div key={label} className="flex gap-4">
											<dt className="text-xs text-[#8f8075] w-24 shrink-0 pt-0.5">
												{label}
											</dt>
											<dd className="text-sm text-[#3d3028] font-medium">
												{value}
											</dd>
										</div>
									))}
								</dl>
								{booking.notes && (
									<div className="mt-4 bg-[#fffdf5] border border-amber-300/60 rounded-xl p-4">
										<p className="text-xs font-semibold text-amber-800 uppercase tracking-wider mb-1 flex items-center gap-1">
											<span>⚠️</span> Care Notes — Staff Please Read
										</p>
										<p className="text-sm text-[#5c4a3d] leading-relaxed whitespace-pre-wrap">
											{booking.notes}
										</p>
									</div>
								)}
							</div>

							{/* Appointment Details */}
							<div className="bg-white border border-[#e8ded2] rounded-2xl p-6 shadow-sm">
								<h2 className="font-semibold uppercase tracking-wider text-xs text-[#a29488] mb-4">
									Appointment Details
								</h2>
								<dl className="space-y-3">
									{[
										{
											label: "Service",
											value: serviceInfo?.name || booking.service,
										},
										{ label: "Date", value: formatDate(booking.bookingDate) },
										{ label: "Time", value: booking.bookingTime },
										...(booking.alternateTime
											? [
													{
														label: "Alternate Time",
														value: booking.alternateTime,
													},
												]
											: []),
									].map(({ label, value }) => (
										<div key={label} className="flex gap-4">
											<dt className="text-xs text-[#8f8075] w-24 shrink-0 pt-0.5">
												{label}
											</dt>
											<dd className="text-sm text-[#3d3028] font-medium">
												{value}
											</dd>
										</div>
									))}
								</dl>
							</div>
						</div>

						{/* Right Sidebar  */}
						<div className="space-y-5">
							{/* Record Info */}
							<div className="bg-white border border-[#e8ded2] rounded-2xl p-6 shadow-sm">
								<h2 className="font-semibold uppercase tracking-wider text-xs text-[#a29488] mb-4">
									Record Info
								</h2>
								<dl className="space-y-3">
									<div>
										<dt className="text-xs text-[#8f8075] mb-0.5">Created</dt>
										<dd className="text-sm text-[#3d3028] font-medium">
											{formatDate(booking.createdAt)}
										</dd>
									</div>
									<div>
										<dt className="text-xs text-[#8f8075] mb-0.5">
											Last Updated
										</dt>
										<dd className="text-sm text-[#3d3028] font-medium">
											{formatDate(booking.updatedAt || booking.createdAt)}
										</dd>
									</div>
									<div>
										<dt className="text-xs text-[#8f8075] mb-1">
											Current Status
										</dt>
										<dd>
											<StatusBadge
												status={booking.status}
												onClick={() => setStatusDialog(true)}
											/>
										</dd>
									</div>
								</dl>
							</div>

							{/* Action Buttons */}
							<div className="bg-white border border-[#e8ded2] rounded-2xl p-6 shadow-sm space-y-3">
								<h2 className="font-semibold uppercase tracking-wider text-xs text-[#a29488] mb-4">
									Actions
								</h2>
								<Link
									href={`/dashboard/bookings/${booking.id}/edit`}
									className="w-full flex items-center justify-center gap-2 py-2.5 text-sm font-semibold text-[#3d3028] border border-[#e2d5c7] rounded-xl hover:bg-stone-50 transition-colors"
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
											d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
										/>
									</svg>
									Edit Booking
								</Link>
								<button
									type="button"
									onClick={() => setStatusDialog(true)}
									className="w-full flex items-center justify-center gap-2 py-2.5 text-sm font-semibold text-white bg-terra rounded-xl hover:bg-[#b85d3d] transition-colors cursor-pointer"
								>
									Change Status
								</button>
								<button
									type="button"
									onClick={() => setDeleteDialog(true)}
									className="w-full flex items-center justify-center gap-2 py-2.5 text-sm font-semibold text-rose-700 border border-rose-200 rounded-xl hover:bg-rose-50 transition-colors cursor-pointer"
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
											d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
										/>
									</svg>
									Delete Booking
								</button>
							</div>
						</div>
					</div>
				</div>
			</main>
		</div>
	);
}
