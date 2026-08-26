"use client";

import { useActionState, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import Button from "@/app/components/ui/Button";
import InputField from "@/app/components/ui/InputField";
import {
  createBooking,
  type BookingFormState,
} from "@/app/(public)/book/action";
import { SERVICES_LIST, type Service } from "@/app/lib/definitions";
import type { PetSize, PetType, ServiceType } from "@/app/types/booking";

import ProgressIndicator from "./progress-indicator";

type Draft = {
  name: string;
  email: string;
  phone: string;
  pet: string;
  type: PetType | "";
  breed: string;
  size: PetSize | "";
  service: ServiceType | "";
  notes: string;
  date: string;
  time: string;
  alternateTime: string;
};

type UpdateDraft = <Key extends keyof Draft>(key: Key, value: Draft[Key]) => void;

const PET_SIZES: Array<{ value: PetSize; label: string; description: string }> = [
  { value: "small", label: "Small", description: "Under 20 lb" },
  { value: "medium", label: "Medium", description: "20–50 lb" },
  { value: "large", label: "Large", description: "Over 50 lb" },
];

const INITIAL_DRAFT: Draft = {
  name: "",
  email: "",
  phone: "",
  pet: "",
  type: "",
  breed: "",
  size: "",
  service: "",
  notes: "",
  date: "",
  time: "",
  alternateTime: "",
};

const APPOINTMENT_TIMES = ["10:30 AM", "12:00 PM", "1:30 PM", "4:30 PM"];

const INITIAL_BOOKING_STATE: BookingFormState = {};

export default function BookingForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const requestedServiceName = searchParams.get("service");
  const requestedService = SERVICES_LIST.find(
    (service) => service.name === requestedServiceName,
  );

  const [step, setStep] = useState(1);
  const [draft, setDraft] = useState<Draft>(() => ({
    ...INITIAL_DRAFT,
    service: requestedService?.id ?? "",
  }));
  const [error, setError] = useState("");
  const [submissionState, submitBookingAction, isSubmitting] = useActionState(
    createBooking,
    INITIAL_BOOKING_STATE,
  );

  const selectedService = SERVICES_LIST.find(
    (service) => service.id === draft.service,
  );

  function updateDraft<Key extends keyof Draft>(key: Key, value: Draft[Key]) {
    setDraft((previous) => ({ ...previous, [key]: value }));
  }

  function isStepComplete() {
    switch (step) {
      case 1:
        return Boolean(draft.name && draft.email && draft.phone);
      case 2:
        return Boolean(draft.pet && draft.type && draft.size && draft.service);
      case 3:
        return Boolean(draft.date && draft.time);
      default:
        return true;
    }
  }

  function continueBooking() {
    if (!isStepComplete()) {
      setError("Please complete the required fields before continuing.");
      return;
    }

    setError("");
    setStep((currentStep) => currentStep + 1);
  }

  function goBack() {
    setError("");
    setStep((currentStep) => currentStep - 1);
  }

  return (
    <div className="mx-auto max-w-[1210px]">
      <ProgressIndicator currentStep={step} />

      <section className="mt-16 rounded-[28px] border border-warm-border bg-white px-7 py-14 sm:px-14 lg:px-[58px]">
        {step === 1 && <DetailsStep draft={draft} updateDraft={updateDraft} />}
        {step === 2 && <PetAndServiceStep draft={draft} updateDraft={updateDraft} />}
        {step === 3 && <DateAndTimeStep draft={draft} updateDraft={updateDraft} />}
        {step === 4 && selectedService && (
          <ReviewStep draft={draft} service={selectedService} editStep={setStep} />
        )}

        {error && (
          <p
            role="alert"
            className="mt-6 rounded-xl bg-terra-faint px-4 py-3 text-terra-dark"
          >
            {error}
          </p>
        )}
        {!submissionState.success && submissionState.message && (
          <p role="alert" className="mt-6 rounded-xl bg-terra-faint px-4 py-3 text-terra-dark">
            {submissionState.message}
          </p>
        )}
      </section>

      {step === 4 && <NextStepsNotice />}

      <div className="mt-7 flex items-center justify-between">
        {step === 1 ? (
          <button
            type="button"
            onClick={() => router.push("/")}
            className="text-lg font-semibold text-brown-mid"
          >
            ←&nbsp; Back to home
          </button>
        ) : (
          <Button variant="secondary" size="small" onClick={goBack}>
            ‹&nbsp;&nbsp; Back
          </Button>
        )}

        {step === 4 ? (
          <form action={submitBookingAction}>
            <BookingPayload draft={draft} />
            <Button className="min-w-60" type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Sending request…" : "Request Appointment"}
            </Button>
          </form>
        ) : (
          <Button className="min-w-48" onClick={continueBooking}>
            Continue&nbsp; ›
          </Button>
        )}
      </div>
    </div>
  );
}

function BookingPayload({ draft }: { draft: Draft }) {
  const fields: Record<string, string> = {
    customerName: draft.name,
    email: draft.email,
    phone: draft.phone,
    petName: draft.pet,
    petType: draft.type,
    petBreed: draft.breed,
    petSize: draft.size,
    service: draft.service,
    bookingDate: draft.date,
    bookingTime: draft.time,
    alternateTime: draft.alternateTime,
    notes: draft.notes,
  };

  return <>{Object.entries(fields).map(([name, value]) => <input key={name} type="hidden" name={name} value={value} />)}</>;
}

function DetailsStep({ draft, updateDraft }: { draft: Draft; updateDraft: UpdateDraft }) {
  return (
    <>
      <h1 className="font-display text-4xl font-semibold sm:text-5xl">
        First, tell us about you.
      </h1>
      <p className="mt-3 text-lg text-brown-mid">
        We&apos;ll use this to confirm your appointment and send updates.
      </p>

      <div className="mt-16 space-y-3">
        <InputField label="Full Name" required placeholder="e.g. Joy Kosol" className="h-20 rounded-[20px] px-7 text-lg" value={draft.name} onChange={(event) => updateDraft("name", event.target.value)} />
        <InputField label="Email Address" required type="email" placeholder="e.g. joy@email.com" className="h-20 rounded-[20px] px-7 text-lg" value={draft.email} onChange={(event) => updateDraft("email", event.target.value)} />
        <InputField label="Phone Number" required type="tel" placeholder="e.g. 555-123-4567" className="h-20 rounded-[20px] px-7 text-lg" value={draft.phone} onChange={(event) => updateDraft("phone", event.target.value)} />
      </div>

      <div className="mt-10 flex gap-4 rounded-[20px] bg-cream-dark px-8 py-6 text-lg text-brown-mid">
        <span aria-hidden="true">🔒</span>
        <p>
          Your contact information is only used to confirm and manage your grooming appointment. We never share your details with third parties.
        </p>
      </div>
    </>
  );
}

function PetAndServiceStep({ draft, updateDraft }: { draft: Draft; updateDraft: UpdateDraft }) {
  return (
    <>
      <h1 className="font-display text-4xl font-semibold">Now, tell us about your pet.</h1>
      <p className="mt-1 text-brown-mid">This helps us prepare the right grooming experience.</p>

      <div className="mt-8">
        <InputField label="Pet Name" required placeholder="e.g. Mochi" value={draft.pet} onChange={(event) => updateDraft("pet", event.target.value)} />

        <FieldLabel>Pet Type *</FieldLabel>
        <div className="grid grid-cols-2 gap-3">
          <ChoiceButton selected={draft.type === "dog"} onClick={() => updateDraft("type", "dog")}>🐶　Dog</ChoiceButton>
          <ChoiceButton selected={draft.type === "cat"} onClick={() => updateDraft("type", "cat")}>🐱　Cat</ChoiceButton>
        </div>

        <div className="mt-6">
          <InputField label="Breed" placeholder="e.g. Golden Retriever" value={draft.breed} onChange={(event) => updateDraft("breed", event.target.value)} />
        </div>

        <FieldLabel>Pet Size *</FieldLabel>
        <div className="grid grid-cols-3 gap-3">
          {PET_SIZES.map((size) => (
            <ChoiceButton key={size.value} stacked selected={draft.size === size.value} onClick={() => updateDraft("size", size.value)}>
              <b>{size.label}</b>
              <small>{size.description}</small>
            </ChoiceButton>
          ))}
        </div>

        <FieldLabel>Grooming Service *</FieldLabel>
        <div className="space-y-3">
          {SERVICES_LIST.map((service, index) => (
            <ServiceOption key={service.id} service={service} icon={["🛁", "✂️", "🐾", "🌿", "🐶"][index]} selected={draft.service === service.id} onClick={() => updateDraft("service", service.id)} />
          ))}
        </div>

        <label htmlFor="notes" className="mb-2 mt-6 block font-semibold">Special Notes</label>
        <textarea id="notes" rows={4} value={draft.notes} onChange={(event) => updateDraft("notes", event.target.value)} placeholder="Allergies, medical conditions, coat concerns, behaviour tips…" className="w-full rounded-xl border border-warm-border px-4 py-3 placeholder:text-warm-border" />
      </div>
    </>
  );
}

function DateAndTimeStep({ draft, updateDraft }: { draft: Draft; updateDraft: UpdateDraft }) {
  const days = Array.from({ length: 31 }, (_, index) => index + 1);

  function chooseDate(date: string) {
    updateDraft("date", date);
    updateDraft("time", "");
    updateDraft("alternateTime", "");
  }

  return (
    <>
      <h1 className="font-display text-4xl font-semibold">When should we welcome your pet?</h1>
      <p className="mt-1 text-brown-mid">Select a date and your preferred grooming time.</p>

      <Calendar days={days} selectedDate={draft.date} onSelectDate={chooseDate} />

      {draft.date && (
        <div className="mt-7">
          <h2 className="text-lg font-semibold text-brown">Available times for <span className="text-terra">{formatBookingDate(draft.date)}</span></h2>
          <TimeGroup label="Morning" times={APPOINTMENT_TIMES.slice(0, 2)} selected={draft.time} onSelect={(time) => updateDraft("time", time)} />
          <TimeGroup label="Afternoon" times={APPOINTMENT_TIMES.slice(2)} selected={draft.time} onSelect={(time) => updateDraft("time", time)} />

          {draft.time && <AlternateTime selectedTime={draft.time} value={draft.alternateTime} onChange={(time) => updateDraft("alternateTime", time)} />}
        </div>
      )}
    </>
  );
}

function Calendar({ days, selectedDate, onSelectDate }: { days: number[]; selectedDate: string; onSelectDate: (date: string) => void }) {
  return <div className="mt-8 overflow-hidden rounded-2xl border border-warm-border">
    <div className="flex justify-between border-b border-warm-border px-8 py-5 font-display text-lg font-semibold"><span>‹</span><span>August 2026</span><span>›</span></div>
    <div className="grid grid-cols-7 gap-y-4 px-8 py-6 text-center text-sm">
      {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => <b key={day} className="text-brown-mid">{day}</b>)}
      {Array.from({ length: 5 }, (_, index) => <span key={index} />)}
      {days.map((day) => {
        const unavailable = day < 25 || day === 28 || day === 30;
        const date = `2026-08-${String(day).padStart(2, "0")}`;
        const selected = selectedDate === date;
        const today = day === 25;
        const classes = selected ? "bg-terra text-white" : today ? "border border-terra text-terra" : unavailable ? "text-warm-border" : "text-brown";
        return <button key={day} type="button" disabled={unavailable} onClick={() => onSelectDate(date)} className={`mx-auto h-9 w-12 rounded-lg font-semibold ${classes}`}>{day}</button>;
      })}
    </div>
    <div className="border-t border-warm-border px-6 py-4 text-xs text-brown-mid">● Unavailable　 <span className="text-terra">○ Today　 ● Selected</span></div>
  </div>;
}

function TimeGroup({ label, times, selected, onSelect }: { label: string; times: string[]; selected: string; onSelect: (time: string) => void }) {
  return <div className="mt-4"><p className="text-sm font-semibold uppercase tracking-wide text-brown-mid">{label}</p><div className="mt-2 flex flex-wrap gap-3">{times.map((time) => <button key={time} type="button" onClick={() => onSelect(time)} className={`rounded-xl border px-4 py-2 font-semibold ${selected === time ? "border-terra bg-terra text-white" : "border-warm-border bg-white text-brown"}`}>{time}</button>)}</div></div>;
}

function AlternateTime({ selectedTime, value, onChange }: { selectedTime: string; value: string; onChange: (time: string) => void }) {
  const availableAlternatives = APPOINTMENT_TIMES.filter((time) => time !== selectedTime);
  return <div className="mt-8 border-t border-warm-border pt-6"><label htmlFor="alternate-time" className="block font-semibold text-brown">Alternate Time <span className="font-normal text-brown-mid">(optional)</span></label><p className="mt-1 text-sm text-brown-mid">In case your preferred time becomes unavailable, we&apos;ll try this slot next.</p><select id="alternate-time" value={value} onChange={(event) => onChange(event.target.value)} className="mt-3 w-full rounded-xl border border-warm-border bg-white px-5 py-3 font-medium text-brown focus-visible:outline-terra"><option value="">No alternate time</option>{availableAlternatives.map((time) => <option key={time} value={time}>{time}</option>)}</select></div>;
}

function ReviewStep({ draft, service, editStep }: { draft: Draft; service: Service; editStep: (step: number) => void }) {
  return <>
    <h1 className="font-display text-4xl font-semibold">Review your pet&apos;s spa day.</h1>
    <p className="mt-1 text-brown-mid">Everything look right? Submit your request and we&apos;ll be in touch.</p>
    <ReviewBlock title="Contact Details" onEdit={() => editStep(1)} values={[["Name", draft.name], ["Email", draft.email], ["Phone", draft.phone]]} />
    <ReviewBlock title="Pet Details" onEdit={() => editStep(2)} values={[["Pet Name", draft.pet], ["Type", draft.type.toLowerCase()], ["Breed", draft.breed || "—"], ["Size", draft.size]]} />
    <ReviewBlock title="Appointment Details" onEdit={() => editStep(3)} values={[["Service", service.name], ["Duration", `~${service.durationMinutes} min`], ["Starting Price", `$${service.price}`], ["Date", formatBookingDate(draft.date)], ["Time", draft.time]]} />
  </>;
}

function NextStepsNotice() {
  return (
    <p className="mt-4 rounded-2xl border border-amber/35 bg-amber-light px-6 py-4 text-sm leading-5 text-brown-mid">
      <b className="text-brown">What happens next?</b> Your booking will be submitted as{" "}
      <b className="text-brown">Pending.</b> Our team will review your request and contact you within 24 hours to confirm the appointment.
    </p>
  );
}

function formatBookingDate(value: string) {
  if (!value) return value;

  return new Date(`${value}T00:00:00`).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return <p className="mb-2 mt-6 font-semibold">{children}</p>;
}

function ChoiceButton({ children, selected, onClick, stacked = false }: { children: React.ReactNode; selected: boolean; onClick: () => void; stacked?: boolean }) {
  const alignmentClass = stacked ? "flex-col" : "justify-start";
  const stateClass = selected ? "border-terra bg-terra-faint" : "border-warm-border";

  return (
    <button type="button" onClick={onClick} className={`flex min-h-17 items-center justify-center rounded-xl border-2 px-4 py-3 font-semibold ${alignmentClass} ${stateClass}`}>
      {children}
    </button>
  );
}

function ServiceOption({ service, icon, selected, onClick }: { service: Service; icon: string; selected: boolean; onClick: () => void }) {
  const stateClass = selected ? "border-terra bg-terra-faint" : "border-warm-border";

  return (
    <button type="button" onClick={onClick} className={`flex w-full items-center gap-4 rounded-xl border-2 px-5 py-4 text-left ${stateClass}`}>
      <span className="text-2xl">{icon}</span>
      <span className="flex-1"><b className="block">{service.name}</b><small className="text-brown-mid">{service.includes?.join(", ")}</small></span>
      <span className="text-sm text-brown-mid">~{service.durationMinutes} min　<b className="text-brown">from ${service.price}</b></span>
    </button>
  );
}

function ReviewBlock({ title, onEdit, values }: { title: string; onEdit: () => void; values: string[][] }) {
  return (
    <section className="mt-7 border-t border-warm-border pt-6">
      <div className="flex justify-between"><h2 className="font-semibold uppercase tracking-wide">{title}</h2><button type="button" onClick={onEdit} className="text-sm font-semibold text-terra">Edit</button></div>
      <dl className="mt-4 space-y-2">{values.map(([key, value]) => <div key={key} className="grid grid-cols-[8rem_1fr] text-sm"><dt className="text-brown-mid">{key}</dt><dd className="font-semibold">{value}</dd></div>)}</dl>
    </section>
  );
}
