import { Suspense } from "react";

import BookingForm from "@/app/components/booking/booking-form";
import { getBookedSlots } from "@/app/models/bookings";

function formatDate(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

export default async function BookPage() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const lastBookableDate = new Date(today);
  lastBookableDate.setMonth(lastBookableDate.getMonth() + 3);
  const bookedSlots = await getBookedSlots(
    formatDate(today),
    formatDate(lastBookableDate),
  );

  return (
    <main className="min-h-screen bg-cream px-7 py-14 sm:px-14 lg:py-16">
      <div className="mx-auto max-w-7xl">
        <Suspense fallback={null}>
          <BookingForm bookedSlots={bookedSlots} />
        </Suspense>
      </div>
    </main>
  );
}
