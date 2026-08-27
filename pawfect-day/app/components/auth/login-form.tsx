"use client";

import { useActionState, useState } from "react";
import { loginAction } from "@/app/lib/actions";
import { Eye, EyeOff, Lock, Mail, Loader2, TriangleAlert } from "lucide-react";

export function StaffLoginForm() {
  const [state, formAction, isPending] = useActionState(loginAction, null);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <form
      action={formAction}
      className="space-y-6 w-full text-left bg-[#FFFFFF] p-8 rounded-2xl shadow-md border border-slate-300"
    >
      {/* State: ERROR */}
      {state?.error && (
        <div
          role="alert"
          className="p-3 text-sm font-medium text-red-600 bg-red-50 border border-red-200 rounded-lg animate-in fade-in-50"
        >
          <TriangleAlert className="inline h-4 w-4 mr-2 -mt-0.5 text-red-600" />
          {state.error}
        </div>
      )}

      {/* Input Email */}
      <div className="space-y-2">
        <label
          htmlFor="email"
          className="block text-base font-semibold text-slate-700"
        >
          Email Address <span className="font-bold text-red-900">*</span>
        </label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
          <input
            id="email"
            name="email"
            type="email"
            // required
            placeholder="staff@pawfectday.com"
            disabled={isPending}
            className="w-full pl-10 pr-4 py-2 text-sm border border-slate-300 text-slate-700 placeholder:text-slate-400 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 focus:outline-none disabled:opacity-50"
          />
        </div>
      </div>

      {/* Input Password & Show/Hide Toggle */}
      <div className="space-y-1">
        <label
          htmlFor="password"
          className="block text-base font-semibold text-slate-700"
        >
          Password <span className="font-bold text-red-900">*</span>
        </label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
          <input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            // required
            placeholder="••••••••"
            disabled={isPending}
            className="w-full pl-10 pr-10 py-2 text-sm border border-slate-300 text-slate-700 placeholder:text-slate-400 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 focus:outline-none disabled:opacity-50"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4 text-slate-500" />
            ) : (
              <Eye className="h-4 w-4 text-slate-500" />
            )}
          </button>
        </div>
      </div>

      {/* Remember Me Checkbox */}
      <div className="flex items-center justify-between">
        <label className="flex items-center space-x-2 text-sm cursor-pointer select-none">
          <input
            type="checkbox"
            name="rememberMe"
            disabled={isPending}
            className="h-5 w-5 cursor-pointer appearance-none rounded border-2 border-[#7C6355]/60 bg-white bg-center bg-no-repeat transition-all duration-200 ease-in-out checked:border-[#7C6355] checked:bg-[#7C6355] checked:bg-[url('data:image/svg+xml;utf8,<svg%20xmlns=%22http://www.w3.org/2000/svg%22%20viewBox=%220%200%2024%2024%22%20fill=%22none%22%20stroke=%22%23fff%22%20stroke-width=%223%22%20stroke-linecap=%22round%22%20stroke-linejoin=%22round%22><polyline%20points=%2220%206%209%2017%204%2012%22/></svg>')] focus:outline-none focus:ring-2 focus:ring-[#7C6355]/60 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
          />
          <span className="text-[#7C6355] text-base">Remember me</span>
        </label>
      </div>

      {/* State: LOADING & DEFAULT Button */}
      <button
        type="submit"
        disabled={isPending}
        className="w-full flex justify-center items-center py-2.5 px-4 rounded-lg cursor-pointer text-lg font-semibold text-white bg-amber-600 hover:bg-amber-700 active:bg-amber-800 transition-colors disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isPending ? (
          <>
            <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4" />
            Authenticating...
          </>
        ) : (
          "Sign In"
        )}
      </button>
    </form>
  );
}
