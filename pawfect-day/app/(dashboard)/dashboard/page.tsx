export default function DashboardPage() {
  return (
    <main className="p-8 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Staff Dashboard</h1>
          <p className="text-slate-500">Manage pet grooming appointments.</p>
        </div>
      </div>
      {/* Table & Filters components will be mounted here */}
    </main>
  );
}