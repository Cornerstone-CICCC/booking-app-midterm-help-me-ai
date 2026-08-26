"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

import ButtonLink from "./ui/ButtonLink";

const links = [
  {
    href: "/",
    label: "Home",
  },
  {
    href: "/services",
    label: "Services",
  },
];

export default function NavBar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  function getLinkClasses(href: string) {
    const isActive = pathname === href;

    return `
      rounded-md
      px-3
      py-2
      text-sm
      transition-colors
      ${
        isActive
          ? "font-semibold text-terra"
          : "font-medium text-brown hover:text-terra"
      }
    `;
  }

  function closeMenu() {
    setIsOpen(false);
  }

  return (
    <header
      className="
        sticky
        top-0
        z-50
        border-b
        border-warm-border
        bg-cream
        text-brown
      "
    >
      <nav
        className="
          mx-auto
          flex
          min-h-16
          max-w-7xl
          items-center
          justify-between
          px-6
        "
        aria-label="Main navigation"
      >
        <Link
          href="/"
          onClick={closeMenu}
          className="
            flex
            items-center
            gap-2
            font-display
            text-xl
            font-semibold
            text-terra
          "
        >
          <span aria-hidden="true">🐾</span>
          <span>Pawfect Day</span>
        </Link>

        {/* Desktop navigation */}
        <div className="hidden items-center gap-2 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={getLinkClasses(link.href)}
            >
              {link.label}
            </Link>
          ))}

          <ButtonLink
            href="/book"
            size="small"
            className="ml-3"
          >
            Book Appointment
          </ButtonLink>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          onClick={() => {
            setIsOpen((previous) => !previous);
          }}
          className="
            flex
            min-h-11
            min-w-11
            items-center
            justify-center
            rounded-md
            text-2xl
            text-brown
            transition-colors
            hover:bg-warm-muted
            md:hidden
          "
          aria-label={
            isOpen
              ? "Close navigation menu"
              : "Open navigation menu"
          }
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
        >
          {isOpen ? "✕" : "☰"}
        </button>
      </nav>

      {/* Mobile navigation */}
      {isOpen && (
        <div
          id="mobile-navigation"
          className="
            border-t
            border-warm-border
            bg-cream
            px-6
            pb-6
            pt-3
            md:hidden
          "
        >
          <div className="flex flex-col gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className={getLinkClasses(link.href)}
              >
                {link.label}
              </Link>
            ))}

            <ButtonLink
              href="/book"
              onClick={closeMenu}
              className="mt-3 w-full"
            >
              Book Appointment
            </ButtonLink>
          </div>
        </div>
      )}
    </header>
  );
}