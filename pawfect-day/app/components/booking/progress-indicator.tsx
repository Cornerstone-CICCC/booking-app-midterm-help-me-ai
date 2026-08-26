const labels = ["Your Details", "Pet & Service", "Date & Time", "Review"];

export default function ProgressIndicator({ currentStep }: { currentStep: number }) {
  return <ol className="relative grid grid-cols-4" aria-label="Booking progress">
    <div className="absolute left-0 right-0 top-4 h-0.5 bg-warm-border" />
    {labels.map((label, index) => {
      const step = index + 1;
      const complete = step < currentStep;
      return <li key={label} className="relative flex flex-col items-center gap-2 text-center">
        <span className={`z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 text-base font-bold ${complete ? "border-terra bg-terra text-white" : step === currentStep ? "border-terra bg-cream text-terra" : "border-warm-border bg-cream text-brown-mid"}`}>{complete ? "✓" : step}</span>
        <span className={`text-xs font-semibold sm:text-sm ${step === currentStep ? "text-terra" : "text-brown-mid"}`}>{label}</span>
      </li>;
    })}
  </ol>;
}
