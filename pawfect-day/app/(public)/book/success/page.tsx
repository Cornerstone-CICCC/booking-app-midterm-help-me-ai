"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { buttonStyles } from "@/app/components/ui/Button";

type BookingDetail = [label: string, value: string];

export default function BookingSuccessPage() {
  const searchParams = useSearchParams();
  const booking = getBookingDetails(searchParams);

  return (
    <main className="min-h-screen bg-cream px-6 py-12">
      <div className="mx-auto max-w-[576px] text-center">
        <ConfirmationAvatar />

        <h1 className="mt-8 font-display text-4xl font-semibold text-brown">
          Your request is on its way!
        </h1>
        <p className="mt-3 text-lg leading-7 text-brown-mid">
          Thanks, {booking.pet}! We received your grooming request. Our team will
          contact you when the appointment is confirmed.
        </p>

        <BookingSummary details={booking.details} />
        <WhatToExpect email={booking.email} />
        <PageActions />
      </div>
    </main>
  );
}

function getBookingDetails(searchParams: ReturnType<typeof useSearchParams>) {
  const pet = searchParams.get("pet") || "your pet";
  const service = searchParams.get("service") || "Full Groom";
  const date = searchParams.get("date") || "Wednesday, August 26, 2026";
  const time = searchParams.get("time") || "12:00 PM";
  const email = searchParams.get("email") || "your email";
  const phone = searchParams.get("phone") || "your phone";

  const details: BookingDetail[] = [
    ["Pet Name", pet],
    ["Service", service],
    ["Date", date],
    ["Time", time],
    ["Contact Email", email],
    ["Contact Phone", phone],
  ];

  return { pet, email, details };
}

function ConfirmationAvatar() {
  return (
    <div className="relative mx-auto h-36 w-36">
      <Image
        src="/booking-confirmation-dog.png"
        alt="Happy groomed dog"
        fill
        sizes="144px"
        className="rounded-full border-4 border-white object-cover shadow-lg"
      />
      <span
        aria-hidden="true"
        className="absolute -bottom-1 -right-2 flex h-10 w-10 items-center justify-center rounded-full bg-sage text-xl text-white shadow"
      >
        ✓
      </span>
    </div>
  );
}

function BookingSummary({ details }: { details: BookingDetail[] }) {
  return (
    <section className="mt-8 overflow-hidden rounded-2xl border border-warm-border bg-white text-left">
      <header className="flex items-center justify-between bg-terra px-7 py-5 text-cream">
        <div>
          <p className="text-xs font-bold uppercase">Booking reference</p>
          <h2 className="font-display text-xl font-semibold">PAW-2608-0006</h2>
        </div>
        <span className="rounded-full bg-white px-3 py-1 text-sm font-bold text-amber">
          ● Pending
        </span>
      </header>

      <dl className="space-y-4 px-6 py-7 text-sm">
        {details.map(([label, value]) => (
          <div key={label} className="grid grid-cols-[8rem_1fr]">
            <dt className="text-brown-mid">{label}</dt>
            <dd className="font-semibold text-brown">{value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

function WhatToExpect({ email }: { email: string }) {
  return (
    <section className="mt-6 rounded-2xl border border-sage/25 bg-sage-light p-5 text-left text-sm leading-6 text-sage">
      <b>What to expect</b>
      <p className="mt-1">
        Our team will review your request and call or email you within 24 hours to
        confirm. Keep an eye on your inbox at <b>{email}</b>.
      </p>
    </section>
  );
}

function PageActions() {
  return (
    <div className="mt-8 grid grid-cols-2 gap-3">
      <Link
        href="/"
        className={buttonStyles({
          variant: "secondary",
          className:
            "w-full !border-warm-border !text-brown hover:!bg-warm-muted",
        })}
      >
        Return Home
      </Link>
      <Link href="/book" className={buttonStyles({ className: "w-full" })}>
        Make Another Booking
      </Link>
    </div>
  );
}
