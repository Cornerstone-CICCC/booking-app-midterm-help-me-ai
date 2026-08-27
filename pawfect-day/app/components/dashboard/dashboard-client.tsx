"use client";

import { useMemo, useState } from "react";
import type { Booking, BookingStatus, ServiceType } from "@/app/types/booking";
import { SERVICES_MASTER } from "@/app/types/booking";

type Props = { bookings: Booking[] };

const statusLabels: Record<BookingStatus, string> = {
	pending: "Pending",
	confirmed: "Confirmed",
	completed: "Completed",
	cancelled: "Cancelled",
};

const statusStyles: Record<BookingStatus, string> = {
	pending: "bg-amber-100 text-amber-800",
	confirmed: "bg-emerald-100 text-emerald-800",
	completed: "bg-stone-200 text-stone-700",
	cancelled: "bg-rose-100 text-rose-800",
};

function dateLabel(value: string) {
	if (!value) return "";
	const [year, month, day] = value.split("-").map(Number);
	if (!year || !month || !day) return value;
	return new Intl.DateTimeFormat("en-US", {
		month: "short",
		day: "numeric",
		year: "numeric",
	}).format(new Date(year, month - 1, day));
}

function timeLabel(value: string) {
	if (!value) return "";
	if (value.includes("AM") || value.includes("PM")) return value;

	const [hours, minutes] = value.split(":").map(Number);
	if (isNaN(hours) || isNaN(minutes)) return value;

	const date = new Date();
	date.setHours(hours, minutes, 0, 0);

	return new Intl.DateTimeFormat("en-US", {
		hour: "numeric",
		minute: "2-digit",
		hour12: true,
	}).format(date);
}

function StatusBadge({ status }: { status: BookingStatus }) {
	return (
		<span
			className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[status]}`}
		>
			<span className="h-1.5 w-1.5 rounded-full bg-current" />
			{statusLabels[status]}
		</span>
	);
}

function Actions({ id }: { id: string }) {
	return (
		<div className="flex gap-3 text-xs font-semibold text-[#b85d3d]">
			<a href={`/dashboard/bookings/${id}`}>View</a>
			<a href={`/dashboard/bookings/${id}/edit`}>Edit</a>
			<button type="button">Status</button>
			<button type="button">Delete</button>
		</div>
	);
}

export default function DashboardClient({ bookings }: Props) {
	const [search, setSearch] = useState("");
	const [status, setStatus] = useState("");
	const [service, setService] = useState("");
	const [date, setDate] = useState("");

	const filtered = useMemo(() => {
		return bookings.filter((booking) => {
			const query = search.toLowerCase();
			const matchesSearch =
				!query ||
				booking.customerName.toLowerCase().includes(query) ||
				booking.petName.toLowerCase().includes(query) ||
				booking.referenceNumber.toLowerCase().includes(query);

			const matchesStatus = !status || booking.status === status;
			const matchesService = !service || booking.service === service;
			const matchesDate = !date || booking.bookingDate === date;

			return matchesSearch && matchesStatus && matchesService && matchesDate;
		});
	}, [bookings, date, search, service, status]);

	const clearFilters = () => {
		setSearch("");
		setStatus("");
		setService("");
		setDate("");
	};

	const cards = [
		[
			"Today's Bookings",
			bookings.filter((b) => b.bookingDate === "2026-08-25").length,
		],
		["Pending Requests", bookings.filter((b) => b.status === "pending").length],
		["Confirmed", bookings.filter((b) => b.status === "confirmed").length],
		["Completed", bookings.filter((b) => b.status === "completed").length],
	];

	return (
		<div className="min-h-screen bg-[#fbf8f2] text-[#3d3028] md:flex">
			<aside className="flex w-full flex-col border-b border-[#e2d5c7] bg-[#f8f4ed] px-7 py-7 md:min-h-screen md:w-[298px] md:border-b-0 md:border-r md:px-8 md:py-8">
				<div className="flex items-center gap-2 text-[22px] font-bold text-[#c6532c]">
					<span className="text-xl">🐾</span>Pawfect Day
				</div>
				<div className="mt-10 text-xs font-semibold uppercase tracking-widest text-[#a29488]">
					Staff Dashboard
				</div>
				<a
					className="mt-8 rounded-xl bg-[#fff0eb] px-4 py-4 text-sm font-bold text-[#c6532c]"
					href="/dashboard"
				>
					<span className="mr-3">▣</span>Bookings
				</a>
			</aside>

			<main className="w-full px-5 py-8 sm:px-8 lg:px-12 lg:py-11">
				<header>
					<h1 className="font-serif text-4xl font-bold tracking-tight sm:text-5xl">
						Bookings
					</h1>
					<p className="mt-2 text-base text-[#8f8075]">
						Manage all grooming appointments from here.
					</p>
				</header>

				<section className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
					{cards.map(([label, value], index) => (
						<div
							className={`rounded-2xl border border-[#e2d5c7] px-6 py-6 ${
								["bg-white", "bg-[#fff2d9]", "bg-[#e1eee6]", "bg-[#fff0eb]"][
									index
								]
							}`}
							key={label}
						>
							<div className="text-xl">{["🗓️", "⌛", "✅", "🎉"][index]}</div>
							<p className="mt-4 text-4xl font-bold font-serif">{value}</p>
							<p className="mt-2 text-sm font-semibold text-[#806e62]">
								{label}
							</p>
						</div>
					))}
				</section>

				<section className="mt-8 rounded-2xl border border-[#e8ded2] bg-white p-4 sm:p-5">
					<div className="grid gap-3 md:grid-cols-4">
						<input
							value={search}
							onChange={(e) => setSearch(e.target.value)}
							placeholder="Search owner, pet or ref #"
							className="rounded-xl border border-[#e8ded2] bg-[#fffdfa] px-4 py-3 text-sm outline-none focus:border-[#b85d3d]"
						/>
						<select
							value={status}
							onChange={(e) => setStatus(e.target.value)}
							className="rounded-xl border border-[#e8ded2] bg-[#fffdfa] px-4 py-3 text-sm outline-none focus:border-[#b85d3d]"
						>
							<option value="">All Statuses</option>
							{Object.entries(statusLabels).map(([val, lbl]) => (
								<option key={val} value={val}>
									{lbl}
								</option>
							))}
						</select>
						<select
							value={service}
							onChange={(e) => setService(e.target.value)}
							className="rounded-xl border border-[#e8ded2] bg-[#fffdfa] px-4 py-3 text-sm outline-none focus:border-[#b85d3d]"
						>
							<option value="">All Services</option>
							{Object.entries(SERVICES_MASTER).map(([key, info]) => (
								<option key={key} value={key}>
									{info.name}
								</option>
							))}
						</select>
						<input
							type="date"
							value={date}
							onChange={(e) => setDate(e.target.value)}
							className="rounded-xl border border-[#e8ded2] bg-[#fffdfa] px-4 py-3 text-sm outline-none focus:border-[#b85d3d]"
						/>
					</div>
					<button
						type="button"
						onClick={clearFilters}
						className="mt-4 text-sm font-semibold text-[#b85d3d]"
					>
						Clear Filters
					</button>
				</section>

				<section className="mt-6 overflow-hidden rounded-2xl border border-[#e8ded2] bg-white">
					<div className="hidden overflow-x-auto md:block">
						<table className="w-full min-w-[820px] text-left text-sm">
							<thead className="border-b border-[#eee7df] bg-[#fffdfa] text-xs uppercase tracking-wider text-[#a29488]">
								<tr>
									{[
										"Ref #",
										"Date & Time",
										"Pet",
										"Owner",
										"Service",
										"Status",
										"Actions",
									].map((h) => (
										<th className="px-5 py-4 font-semibold" key={h}>
											{h}
										</th>
									))}
								</tr>
							</thead>
							<tbody>
								{filtered.map((booking) => (
									<tr
										className="border-b border-[#f0eae3] last:border-0"
										key={booking.id}
									>
										<td className="px-5 py-4 font-mono text-xs font-bold text-[#b85d3d]">
											{booking.referenceNumber}
										</td>
										<td className="px-5 py-4">
											<div className="font-semibold">
												{dateLabel(booking.bookingDate)}
											</div>
											<div className="text-[#97887c]">
												{timeLabel(booking.bookingTime)}
											</div>
										</td>
										<td className="px-5 py-4">
											<div className="font-semibold">{booking.petName}</div>
											<div className="text-[#97887c]">
												{booking.petType} ({booking.petSize})
											</div>
										</td>
										<td className="px-5 py-4">{booking.customerName}</td>
										<td className="px-5 py-4">
											{SERVICES_MASTER[booking.service as ServiceType]?.name ||
												booking.service}
										</td>
										<td className="px-5 py-4">
											<StatusBadge status={booking.status} />
										</td>
										<td className="px-5 py-4">
											<Actions id={booking.id} />
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>

					<div className="divide-y divide-[#f0eae3] md:hidden">
						{filtered.map((booking) => (
							<article className="p-5" key={booking.id}>
								<div className="flex items-start justify-between gap-4">
									<div>
										<span className="font-mono text-xs font-bold text-[#b85d3d]">
											{booking.referenceNumber}
										</span>
										<h2 className="font-bold">{booking.petName}</h2>
										<p className="text-sm text-[#97887c]">
											{booking.customerName} · {booking.petType}
										</p>
									</div>
									<StatusBadge status={booking.status} />
								</div>
								<p className="mt-4 text-sm font-semibold">
									{SERVICES_MASTER[booking.service as ServiceType]?.name ||
										booking.service}
								</p>
								<p className="mt-1 text-sm text-[#97887c]">
									{dateLabel(booking.bookingDate)} ·{" "}
									{timeLabel(booking.bookingTime)}
								</p>
								<div className="mt-4">
									<Actions id={booking.id} />
								</div>
							</article>
						))}
					</div>

					{filtered.length === 0 && (
						<p className="px-5 py-12 text-center text-sm text-[#97887c]">
							No bookings match your filters.
						</p>
					)}
				</section>
			</main>
		</div>
	);
}
