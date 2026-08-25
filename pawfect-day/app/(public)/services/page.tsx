import { SERVICES_LIST } from '@/app/lib/definitions';

export default function ServicesPage() {
  return (
    <main className="p-8 max-w-4xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-amber-950">Grooming Services</h1>
      <div className="grid gap-4 md:grid-cols-2">
        {SERVICES_LIST.map((service) => (
          <div key={service.id} className="p-4 border rounded-xl space-y-2">
            <h2 className="text-xl font-semibold">{service.name}</h2>
            <p className="text-sm text-slate-600">{service.description}</p>
            <p className="font-bold text-amber-700">${service.price}</p>
          </div>
        ))}
      </div>
    </main>
  );
}