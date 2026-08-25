import Link from 'next/link';

export default function BookingSuccessPage() {
  return (
    <main className="p-8 text-center space-y-4 min-h-[60vh] flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold text-emerald-600">Appointment Confirmed! 🐾</h1>
      <p className="text-slate-600 max-w-sm">
        Thank you for trusting Pawfect Day. We have received your booking information.
      </p>
      <Link href="/" className="px-4 py-2 bg-slate-900 text-white rounded-lg">
        Back to Home
      </Link>
    </main>
  );
}