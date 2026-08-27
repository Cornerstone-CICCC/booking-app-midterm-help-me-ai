"use client";

import { useEffect, type ReactNode } from "react";
import Button from "./Button";

export default function Modal({ open, title, children, onClose, footer }: { open: boolean; title: string; children: ReactNode; onClose: () => void; footer?: ReactNode }) {
  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => event.key === "Escape" && onClose();
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <button className="absolute inset-0 bg-brown/60" onClick={onClose} aria-label="Close dialog" />
      <section role="dialog" aria-modal="true" aria-labelledby="modal-title" className="relative z-10 w-full max-w-md rounded-2xl border border-warm-border bg-cream p-6 shadow-2xl">
        <div className="mb-4 flex items-start justify-between gap-4">
          <h2 id="modal-title" className="font-display text-2xl font-semibold">{title}</h2>
          <Button variant="primary" onClick={onClose} aria-label="Close dialog">×</Button>
        </div>
        <div className="text-sm text-brown-mid">{children}</div>
        {footer && <div className="mt-6 flex justify-end gap-3">{footer}</div>}
      </section>
    </div>
  );
}