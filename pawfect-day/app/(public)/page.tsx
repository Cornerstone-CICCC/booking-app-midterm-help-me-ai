// Home page
import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 text-center space-y-6">
      <h1 className="text-4xl font-bold text-amber-950">🐾 Welcome to Pawfect Day</h1>
      <p className="text-lg text-slate-600 max-w-md">
        Premium pet grooming and care for your beloved furry friends.
      </p>
      <div className="flex gap-4">
        <Link href="/services" className="px-4 py-2 border rounded-lg hover:bg-slate-50">
          Our Services
        </Link>
        <Link href="/book" className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700">
          Book Appointment
        </Link>
      </div>
    </main>
  );
}