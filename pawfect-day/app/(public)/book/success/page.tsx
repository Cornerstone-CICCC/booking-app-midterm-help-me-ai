import Image from "next/image";
import Link from "next/link";

import { buttonStyles } from "@/app/components/ui/Button";
import { getBookingByReferenceNumber } from "@/app/models/bookings";
import { SERVICES_MASTER } from "@/app/types/booking";

type BookingDetail = [label: string, value: string];

type BookingSuccessPageProps = {
  searchParams: Promise<{ ref?: string }>;
};

export default async function BookingSuccessPage({
  searchParams,
}: BookingSuccessPageProps) {
  const { ref } = await searchParams;
  const booking = ref ? await getBookingByReferenceNumber(ref) : null;
  const details = booking ? getBookingDetails(booking) : null;

  return (
    <main className="min-h-screen bg-cream px-6 py-12">
      <div className="mx-auto max-w-[576px] text-center">
        <ConfirmationAvatar />

        <h1 className="mt-8 font-display text-4xl font-semibold text-brown">
          Your request is on its way!
        </h1>
        <p className="mt-3 text-lg leading-7 text-brown-mid">
          Thanks, {details?.petName ?? "there"}! We received your grooming request. Our team will
          contact you when the appointment is confirmed.
        </p>

        <BookingSummary
          details={details?.details ?? []}
          referenceNumber={booking?.referenceNumber ?? "Booking not found"}
        />
        <WhatToExpect email={booking?.email ?? "your email"} />
        <PageActions />
      </div>
    </main>
  );
}

function getBookingDetails(booking: Awaited<ReturnType<typeof getBookingByReferenceNumber>>) {
  if (!booking) return null;

  const date = new Date(`${booking.bookingDate}T00:00:00`).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const details: BookingDetail[] = [
    ["Pet Name", booking.petName],
    ["Service", SERVICES_MASTER[booking.service].name],
    ["Date", date],
    ["Time", booking.bookingTime],
    ["Contact Email", booking.email],
    ["Contact Phone", booking.phone],
  ];

  return { petName: booking.petName, details };
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

function BookingSummary({
  details,
  referenceNumber,
}: {
  details: BookingDetail[];
  referenceNumber: string;
}) {
  return (
    <section className="mt-8 overflow-hidden rounded-2xl border border-warm-border bg-white text-left">
      <header className="flex items-center justify-between bg-terra px-7 py-5 text-cream">
        <div>
          <p className="text-xs font-bold uppercase">Booking reference</p>
          <h2 className="font-display text-xl font-semibold">
            {referenceNumber}
          </h2>
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
