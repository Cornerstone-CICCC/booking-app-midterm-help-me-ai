// Staff login
import { StaffLoginForm } from "@/app/components/auth/login-form";
import { LockKeyhole } from "lucide-react";

export const metadata = {
  title: "Staff Login | Pawfect Day",
  description: "Access panel for groomers and administrative staff.",
};

export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center p-4 bg-[#FAF6EF]">
      <div className="w-full flex flex-col items-center max-w-lg p-8 space-y-6">
        <div className="bg-[#ffeae3] p-4 rounded-2xl shadow-sm">
          <LockKeyhole className="h-10 w-10 text-amber-700" />
        </div>
        <div className="text-center">
          <h1 className="text-4xl font-bold text-[#2D1A0F]">
            Staff Access Only
          </h1>
          <p className="text-lg text-[#7C6355]">
            Sign in to manage grooming appointments.
          </p>
        </div>
        <StaffLoginForm />
      </div>
    </main>
  );
}
