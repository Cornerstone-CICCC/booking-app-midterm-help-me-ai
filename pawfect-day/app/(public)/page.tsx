// Home page
import NavBar from "./../components/NavBar";
import ButtonLink from "./../components/ui/ButtonLink";
import InputField from "../components/ui/InputField";
import Dropdown from "../components/ui/Dropdown";
import Footer from "../components/Footer";
import Button from "../components/ui/Button";


type processStep = {
  stepNumber: number;
  title: string;
  description: string;
};

const processSteps: processStep[] = [
  {
    stepNumber: 1,
    
    title: "Tell us about your pet",
    description:
      "Share your pet's name, type, size, and any special needs.",
  },
  {
    stepNumber: 2,
    title: "Choose a grooming service",
    description:
      "Pick from our carefully designed grooming packages.",
  },
  {
    stepNumber: 3,
    title: "Select an available time",
    description:
      "Browse real-time availability and book a slot that works for you.",
  },
  {
    stepNumber: 4,
    title: "Receive confirmation",
    description:
      "Our team reviews and confirms your appointment by phone or email.",
  },
];

export default function Home() {
  return (
    <main>
      <NavBar />
      <section
        id="hero"
        className="flex flex-row items-center justify-center mt-8 bg-brown px-24 py-12 gap-4"
      >
        {/* Content */}
        <div className="flex flex-col items-start justify-center gap-4">
          <span className="text-sm font-semibold text-brown-mid uppercase tracking-wide">
            Petland's favorite grooming salon
          </span>

          <h1 className="text-6xl font-bold text-center text-cream">
            A fresh look for your best friend.
          </h1>
          <span>
            Request a grooming appointment online in a few simple steps. No
            phone calls, no waiting — just a happier, fresher pet.
          </span>

          <ButtonLink
            href="/book"
            variant="primary"
            size="large"
            className="mt-4"
          >
            Book an Appointment
          </ButtonLink>
          <ButtonLink
            href="/services"
            variant="secondary"
            size="large"
            className="mt-4 ml-4"
          >
            View Services
          </ButtonLink>
        </div>

        {/* Image */}
        <div className="flex flex-col w-full">
          <img
            src="https://images.unsplash.com/photo-1611173622933-91942d394b04?w=800&h=1000&fit=crop&auto=format"
            alt="Pink dog with a bow"
            className="h-full object-cover rounded-lg"
          />
        </div>
      </section>

      <section id="process" className="grid grid-cols-4 gap-4 max-w-4xl mx-auto my-8">
        <div className="flex flex-col gap-2 col-span-4">
          <span className="text-sm font-semibold text-brown-mid uppercase tracking-wide">
            simple process
          </span>
          <h2 className="text-5xl font-bold text-brown mt-2">
            How it works
          </h2>
        </div>

        {processSteps.map((step) => (
          <div className="flex flex-col gap-2 col-span-1" key={step.stepNumber}>
            <h2 className="text-6xl font-bold text-brown mt-2">{step.stepNumber}</h2>
            <h4>{step.title}</h4>
            <p>{step.description}</p>
          </div>
        ))}

      </section>


      <Footer />
    </main>
  );
}
