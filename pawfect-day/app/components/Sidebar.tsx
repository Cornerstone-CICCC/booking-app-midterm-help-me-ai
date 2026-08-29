"use client";

import {User} from "@/app/types/user";
import { logoutAction } from "@/app/lib/actions";
import { LogOut } from "lucide-react";

type Props = { user: User | null };


export default function Sidebar({ user }: Props) {
  return (
    <aside className="flex w-full flex-col border-b border-warm-muted bg-cream px-7 py-7 md:h-screen lg:h-screen md:w-74.5 md:border-b-0 md:border-r md:px-8 md:py-8 sticky top-0">
        <div className="flex items-center gap-2 text-[22px] font-bold text-terra">
          <h1 className="text-xl">🐾 Pawfect Day</h1>
        </div>
        <div className="mt-10 text-xs font-semibold uppercase tracking-widest text-brown-mid">
          Staff Dashboard
        </div>
        <a
          className="mt-8 rounded-xl bg-terra-faint px-4 py-4 text-sm font-bold text-terra"
          href="/dashboard"
        >
          📖  Bookings
        </a>

        <div className="mt-auto -mx-7 border-t border-[#e2d5c7] px-7 pt-7 md:-mx-8 md:px-8">
          <div className="flex items-center gap-4">
            <div
              aria-hidden="true"
              className="staff-avatar flex shrink-0 items-center justify-center rounded-full text-lg font-bold"
              style={{
                aspectRatio: "1 / 1",
                backgroundColor: "#f5ddd4",
                borderRadius: "50%",
                color: "#c6532c",
                flexBasis: "48px",
                height: "48px",
                minHeight: "48px",
                minWidth: "48px",
                width: "48px",
              }}
            >
              S
            </div>
            <div className="min-w-0">
              <p className="whitespace-nowrap text-lg font-bold text-[#2f2119]">
                {user?.name || "Staff Member"}
              </p>
              <p className="text-sm font-semibold text-[#806e62]">{user?.role }</p>
            </div>
          </div>

          <form action={logoutAction} className="mt-7">
            <button
              type="submit"
              className="flex w-full items-center justify-center rounded-xl bg-[#c6532c] px-2 py-3 text-lg font-bold cursor-pointer text-[#fff0eb] hover:bg-[#8f3919] transition-colors"
            >
              <LogOut color="#ffffff" className="mr-3" />Logout
            </button>
          </form>
        </div>
      </aside>
  )
}
