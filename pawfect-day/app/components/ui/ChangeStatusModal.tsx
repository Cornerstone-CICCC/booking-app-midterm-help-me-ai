"use client";

import { useEffect, useState } from "react";
import Modal from "./ChangeStatusModal";
import Button from "./Button";

type BookingStatus =
  | "pending"
  | "confirmed"
  | "completed"
  | "cancelled";

interface ChangeStatusModalProps {
  open: boolean;
  petName: string;
  currentStatus: BookingStatus;
  onClose: () => void;
  onSave: (status: BookingStatus) => void;
}

const statuses: BookingStatus[] = [
  "pending",
  "confirmed",
  "completed",
  "cancelled",
];

const statusStyles: Record<BookingStatus, string> = {
  pending: "bg-amber-light text-amber",
  confirmed: "bg-sage-light text-sage",
  completed: "bg-warm-muted text-brown-mid",
  cancelled: "bg-terra-faint text-terra-dark",
};

export default function ChangeStatusModal({
  open,
  petName,
  currentStatus,
  onClose,
  onSave,
}: ChangeStatusModalProps) {
  const [selectedStatus, setSelectedStatus] =
    useState<BookingStatus>(currentStatus);

  // Reset the selected option whenever the modal opens.
  useEffect(() => {
    if (open) {
      setSelectedStatus(currentStatus);
    }
  }, [open, currentStatus]);

  function handleSave() {
    onSave(selectedStatus);
    onClose();
  }

  return (
    <Modal
      open={open}
      title="Change Booking Status"
      onClose={onClose}
      footer={
        <>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>

          {selectedStatus !== currentStatus && (
            <Button variant="primary" onClick={handleSave}>
              Save Status
            </Button>
          )}
        </>
      }
    >
      <p className="mb-8 text-base text-brown-mid">
        Updating status for{" "}
        <span className="font-semibold text-brown">
          {petName}&apos;s appointment.
        </span>
      </p>

      <div className="mb-6">
        <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-brown-mid">
          Current status
        </p>

        <StatusBadge status={currentStatus} />
      </div>

      <fieldset>
        <legend className="mb-3 text-sm font-semibold uppercase tracking-wide text-brown-mid">
          Select new status
        </legend>

        <div className="flex flex-col gap-3">
          {statuses.map((status) => {
            const isSelected = selectedStatus === status;
            const isCurrent = currentStatus === status;

            return (
              <label
                key={status}
                className={`
                  flex
                  cursor-pointer
                  items-center
                  justify-between
                  rounded-xl
                  border
                  px-4
                  py-4
                  transition
                  ${
                    isSelected
                      ? "border-terra bg-terra-faint"
                      : "border-warm-border bg-white hover:border-terra/50"
                  }
                `}
              >
                <input
                  type="radio"
                  name="booking-status"
                  value={status}
                  checked={isSelected}
                  onChange={() => setSelectedStatus(status)}
                  className="sr-only"
                />

                <StatusBadge status={status} />

                {isCurrent && (
                  <span className="text-sm font-semibold text-terra">
                    Current
                  </span>
                )}
              </label>
            );
          })}
        </div>
      </fieldset>
    </Modal>
  );
}

function StatusBadge({ status }: { status: BookingStatus }) {
  return (
    <span
      className={`
        inline-flex
        w-fit
        items-center
        gap-2
        rounded-full
        px-3
        py-1
        text-sm
        font-semibold
        capitalize
        ${statusStyles[status]}
      `}
    >
      <span className="h-2 w-2 rounded-full bg-current" />
      {status}
    </span>
  );
}