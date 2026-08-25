// Staff login
// import { StaffLoginForm } from '@/app/components/auth/login-form';

export const metadata = {
  title: 'Staff Login | Pawfect Day',
  description: 'Access panel for groomers and administrative staff.',
};

export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center p-4 bg-amber-50/50">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-sm border border-amber-100 space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold text-amber-950">🐾 Pawfect Day Staff</h1>
          <p className="text-sm text-amber-700/80">Manage appointments, status, and pet details.</p>
        </div>
        {/* <StaffLoginForm /> */}
      </div>
    </main>
  );
}