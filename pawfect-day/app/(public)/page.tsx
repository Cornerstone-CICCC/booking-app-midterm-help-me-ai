// Home page
import NavBar from "./../components/NavBar";
import ButtonLink from "./../components/ui/ButtonLink";
import InputField from "../components/ui/InputField";
import Dropdown from "../components/ui/Dropdown";
import Footer from "../components/Footer";
import Button from "../components/ui/Button";
import CardHome from "../components/ui/CardHome";
import Link from "next/link";
import Testimonial from "../components/ui/Testimonial";

type processStep = {
  stepNumber: number;
  title: string;
  description: string;
};

const processSteps: processStep[] = [
  {
    stepNumber: 1,

    title: "Tell us about your pet",
    description: "Share your pet's name, type, size, and any special needs.",
  },
  {
    stepNumber: 2,
    title: "Choose a grooming service",
    description: "Pick from our carefully designed grooming packages.",
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

const whyChooseUsPoints: { icon: string; title: string; description: string }[] = [
  {
    icon: "🤝",
    title: "Gentle & Experienced",
    description:
      "Our groomers have years of experience with all breeds, temperaments, and coat types.",
  },
  {
    icon: "🌿",
    title: "Pet-Safe Products",
    description:
      "We only use professional, hypoallergenic shampoos and conditioners formulated for pets.",
  },
  {
    icon: "✨",
    title: "Clean & Comfortable",
    description:
      "Our salon is sanitized between every appointment for a stress-free, hygienic experience.",
  }
]

export default function Home() {
  return (
    <main>
      <NavBar />
      <section
        id="hero"
        className="flex flex-col items-center justify-center bg-brown lg:h-screen overflow-hidden md:flex-col lg:flex-row "
      >
        {/* Content */}
        <div className="flex flex-col items-start justify-center gap-4 w-full px-12 md:px-8 lg:px-12 py-8">
          <span className="mb-7 inline-flex rounded-full bg-terra/20 px-4 py-2 text-sm font-medium text-terra-light">
            Petland's favorite grooming salon
          </span>

          <h1 className="font-display text-5xl font-semibold leading-tight text-cream md:text-7xl">
            A fresh look for your best friend.
          </h1>
          <span className="mt-6 text-lg leading-relaxed text-cream/70">
            Request a grooming appointment online in a few simple steps. No
            phone calls, no waiting — just a happier, fresher pet.
          </span>
          <div className="mt-9 flex flex-wrap gap-4">
            <ButtonLink
              href="/book"
              variant="primary"
              size="large"
              className="mt-4"
            >
              Book a spa day →
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
        </div>

        {/* Image */}
        <div className="relative overflow-hidden w-full">
          <img
            src="https://images.unsplash.com/photo-1611173622933-91942d394b04?w=800&h=1000&fit=crop&auto=format"
            alt="Pink dog with a bow"
            className="w-full object-cover opacity-85 md:h-[400px] lg:h-screen"
          />
        </div>
      </section>

      <section
        id="process"
        className="flex flex-col gap-6 px-6 py-12 md:px-24 md:py-16"
      >
        <div className="flex flex-col items-center justify-center gap-2 col-span-4">
          <span className="text-center text-sm font-semibold uppercase tracking-widest text-terra">
            simple process
          </span>
          <h2 className="mt-3 text-center font-display text-4xl font-semibold md:text-5xl">
            How it works
          </h2>
        </div>
        <div className="col-span-4 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((step) => (
            <div
              className="flex flex-col gap-2 col-span-1"
              key={step.stepNumber}
            >
              <h2 className="text-6xl font-bold text-warm-muted">
                0{step.stepNumber}
              </h2>
              <h4 className="text-xl font-bold">{step.title}</h4>
              <p className="mt-2 text-sm leading-relaxed text-brown-mid">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </section>
      <section
        id="services"
        className="flex flex-col gap-6 px-6 py-12 md:px-24 md:py-16 bg-cream-dark"
      >
        <div className="flex flex-row items-end justify-between mb-6">
          <span className="flex flex-col gap-2">
            <p className="text-sm font-semibold uppercase tracking-widest text-terra">
              What we offer
            </p>
            <h2 className="mt-3 font-display text-4xl font-semibold md:text-5xl">
              Grooming services
            </h2>
          </span>
          <Link
            href="/services"
            className="text-terra hover:text-terra-dark text-md font-bold"
          >
            See all services →
          </Link>
        </div>
        <div className="grid items-stretch grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          <CardHome serviceId="bath_and_brush" />
          <CardHome serviceId="full_groom" />
          <CardHome serviceId="nail_trim" />
          <CardHome serviceId="deshedding_treatment" />
        </div>
      </section>
    

      <section
        id="why_choose_us"
        className="flex flex-row items-center gap-6 px-6 py-12 md:px-24 md:py-16 bg-cream"
      >
        <div className="flex flex-col gap-2 w-full">
          <p className="text-sm font-semibold uppercase tracking-widest text-terra">
            Why choose us
          </p>
          <h2 className="mt-3 font-display text-4xl font-semibold md:text-5xl text-brown">
            Your pet deserves the best care.
          </h2>
          <div>
            {whyChooseUsPoints.map((point, index) => (
              <div
                key={index}
                className="flex flex-row items-start gap-4 mt-6"
              >
                <span className="text-4xl">{point.icon}</span>
                <div className="flex flex-col gap-1">
                  <h3 className="font-display text-xl font-semibold text-brown">
                    {point.title}
                  </h3>
                  <p className="text-sm text-brown-mid">{point.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

<div className="grid grid-cols-2 gap-4 w-full">
            <img
            src="https://images.unsplash.com/photo-1528846104175-4fd300ee59da?w=600&h=400&fit=crop&auto=format"
            alt="Dog getting a bath"
            className="rounded-2xl object-cover w-full h-64 col-span-1"
          />
           <img
            src="https://images.unsplash.com/photo-1583987303344-1f553edc7f11?w=600&h=400&fit=crop&auto=format"
            alt="Dog getting a bath"
            className="rounded-2xl object-cover w-full h-64 col-span-1 mt-8"
          />
          
        </div>
      </section>



      <section
        id="services"
        className="flex flex-col gap-6 px-6 py-12 md:px-24 md:py-16 bg-brown"
      >
        <div className="flex flex-col gap-2 items-center justify-center col-span-4">
          <p className="text-sm font-semibold uppercase tracking-widest text-cream">
            Happy customers
          </p>
          <h2 className="mt-3 font-display text-4xl font-semibold md:text-5xl text-cream">
            Pets (and owners) love us
          </h2>
        </div>

        <div className="grid items-stretch grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-3">
          <Testimonial testimonialId="testimonial_1" />
          <Testimonial testimonialId="testimonial_2" />
          <Testimonial testimonialId="testimonial_3" />
        </div>
      </section>

            <section className="bg-terra py-20 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-display text-4xl md:text-5xl font-semibold text-cream mb-4">
            Ready to book your pet's spa day?
          </h2>
          <p className="text-cream/80 mb-8 text-lg">
            It takes less than 3 minutes. No account needed.
          </p>
          <Link
            href="/book"
            className="inline-flex items-center gap-2 bg-cream text-terra font-semibold px-10 py-4 rounded-full hover:bg-cream-dark transition-colors text-base"
          >
            Book Now — it's free
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
