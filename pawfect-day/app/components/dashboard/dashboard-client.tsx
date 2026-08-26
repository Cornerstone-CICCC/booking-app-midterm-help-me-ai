'use client';

import { useMemo, useState } from 'react';
import type { Booking, BookingStatus } from '@/app/lib/definitions';

type Props = { bookings: Booking[] };

const services: Record<string, string> = {
  'srv-1': 'Bath & Brush',
  'srv-2': 'Full Groom',
  'srv-3': 'Nail Trim',
  'srv-4': 'De-shedding Treatment',
  'srv-5': "Puppy's First Groom",
};

const statusLabels: Record<BookingStatus, string> = {
  pending: 'Pending',
  confirmed: 'Confirmed',
  completed: 'Completed',
  cancelled: 'Cancelled',
};

const statusStyles: Record<BookingStatus, string> = {
  pending: 'bg-amber-100 text-amber-800',
  confirmed: 'bg-emerald-100 text-emerald-800',
  completed: 'bg-stone-200 text-stone-700',
  cancelled: 'bg-rose-100 text-rose-800',
};

function dateLabel(value: string) {
  return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(`${value}T12:00:00`));
}

function timeLabel(value: string) {
  return new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: '2-digit' }).format(new Date(`2026-01-01T${value}`));
}

function StatusBadge({ status }: { status: BookingStatus }) {
  return <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[status]}`}>{statusLabels[status]}</span>;
}

function Actions({ id }: { id: string }) {
  return <div className="flex gap-3 text-xs font-semibold text-[#b85d3d]"><a href={`/bookings/${id}`}>View</a><a href={`/bookings/${id}/edit`}>Edit</a><button type="button">Status</button><button type="button">Delete</button></div>;
}

export default function DashboardClient({ bookings }: Props) {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [service, setService] = useState('');
  const [date, setDate] = useState('');

  const filtered = useMemo(() => bookings.filter((booking) => {
    const query = search.toLowerCase();
    return (!query || booking.ownerName.toLowerCase().includes(query) || booking.petName.toLowerCase().includes(query))
      && (!status || booking.status === status)
      && (!service || booking.serviceId === service)
      && (!date || booking.bookingDate === date);
  }), [bookings, date, search, service, status]);

  const clearFilters = () => {
    setSearch('');
    setStatus('');
    setService('');
    setDate('');
  };

  const cards = [
    ["Today's Bookings", bookings.filter((booking) => booking.bookingDate === '2026-08-25').length],
    ['Pending Requests', bookings.filter((booking) => booking.status === 'pending').length],
    ['Confirmed', bookings.filter((booking) => booking.status === 'confirmed').length],
    ['Completed This Week', bookings.filter((booking) => booking.status === 'completed').length],
  ];

  return (
    <div className="min-h-screen bg-[#fbf8f2] text-[#3d3028] md:flex">
      <aside className="flex w-full flex-col border-b border-[#e8ded2] bg-[#f7f1e8] px-6 py-5 md:min-h-screen md:w-60 md:border-b-0 md:border-r">
        <div className="text-xl font-bold text-[#b85d3d]">Pawfect Day</div>
        <div className="mt-10 text-xs font-semibold uppercase tracking-widest text-[#a29488]">Staff Dashboard</div>
        <a className="mt-4 rounded-xl bg-[#b85d3d] px-4 py-3 text-sm font-semibold text-white" href="/dashboard">Bookings</a>
        <div className="mt-auto hidden border-t border-[#e8ded2] pt-5 md:block"><div className="text-sm font-semibold">Sarah Groomer</div><div className="text-xs text-[#97887c]">Staff</div><button type="button" className="mt-5 text-sm text-[#8b7567]">Log Out</button></div>
      </aside>
      <main className="w-full px-5 py-8 sm:px-8 lg:px-12 lg:py-12">
        <header><h1 className="text-3xl font-bold sm:text-4xl">Bookings</h1><p className="mt-2 text-[#8f8075]">Manage all grooming appointments from here.</p></header>
        <section className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{cards.map(([label, value]) => <div className="rounded-2xl border border-[#e8ded2] bg-white px-5 py-5" key={label}><p className="text-sm text-[#8f8075]">{label}</p><p className="mt-3 text-3xl font-bold">{value}</p></div>)}</section>
        <section className="mt-8 rounded-2xl border border-[#e8ded2] bg-white p-4 sm:p-5"><div className="grid gap-3 md:grid-cols-4"><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search owner or pet" className="rounded-xl border border-[#e8ded2] bg-[#fffdfa] px-4 py-3 text-sm outline-none focus:border-[#b85d3d]" /><select value={status} onChange={(event) => setStatus(event.target.value)} className="rounded-xl border border-[#e8ded2] bg-[#fffdfa] px-4 py-3 text-sm outline-none focus:border-[#b85d3d]"><option value="">All Statuses</option>{Object.entries(statusLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select><select value={service} onChange={(event) => setService(event.target.value)} className="rounded-xl border border-[#e8ded2] bg-[#fffdfa] px-4 py-3 text-sm outline-none focus:border-[#b85d3d]"><option value="">All Services</option>{Object.entries(services).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select><input type="date" value={date} onChange={(event) => setDate(event.target.value)} className="rounded-xl border border-[#e8ded2] bg-[#fffdfa] px-4 py-3 text-sm outline-none focus:border-[#b85d3d]" /></div><button type="button" onClick={clearFilters} className="mt-4 text-sm font-semibold text-[#b85d3d]">Clear Filters</button></section>
        <section className="mt-6 overflow-hidden rounded-2xl border border-[#e8ded2] bg-white"><div className="hidden overflow-x-auto md:block"><table className="w-full min-w-[820px] text-left text-sm"><thead className="border-b border-[#eee7df] bg-[#fffdfa] text-xs uppercase tracking-wider text-[#a29488]"><tr>{['Date & Time', 'Pet', 'Owner', 'Service', 'Status', 'Actions'].map((heading) => <th className="px-5 py-4 font-semibold" key={heading}>{heading}</th>)}</tr></thead><tbody>{filtered.map((booking) => <tr className="border-b border-[#f0eae3] last:border-0" key={booking.id}><td className="px-5 py-4"><div className="font-semibold">{dateLabel(booking.bookingDate)}</div><div className="text-[#97887c]">{timeLabel(booking.bookingTime)}</div></td><td className="px-5 py-4"><div className="font-semibold">{booking.petName}</div><div className="text-[#97887c]">{booking.petType}</div></td><td className="px-5 py-4">{booking.ownerName}</td><td className="px-5 py-4">{services[booking.serviceId]}</td><td className="px-5 py-4"><StatusBadge status={booking.status} /></td><td className="px-5 py-4"><Actions id={booking.id} /></td></tr>)}</tbody></table></div><div className="divide-y divide-[#f0eae3] md:hidden">{filtered.map((booking) => <article className="p-5" key={booking.id}><div className="flex items-start justify-between gap-4"><div><h2 className="font-bold">{booking.petName}</h2><p className="text-sm text-[#97887c]">{booking.ownerName} · {booking.petType}</p></div><StatusBadge status={booking.status} /></div><p className="mt-4 text-sm">{services[booking.serviceId]}</p><p className="mt-1 text-sm text-[#97887c]">{dateLabel(booking.bookingDate)} · {timeLabel(booking.bookingTime)}</p><div className="mt-4"><Actions id={booking.id} /></div></article>)}</div>{filtered.length === 0 && <p className="px-5 py-12 text-center text-sm text-[#97887c]">No bookings match your filters.</p>}</section>
      </main>
    </div>
  );
}
