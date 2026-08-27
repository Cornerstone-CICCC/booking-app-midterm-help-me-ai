// Service Page

import NavBar from "./../../components/NavBar";
import Footer from "./../../components/Footer";
import CardService from "../../components/ui/CardService";

export default function Services() {
  return (
    <main>
      <NavBar />
      <section id="hero-service" className="flex flex-col items-start justify-center mt-8 bg-brown px-24 py-12 gap-4">
        <span className="text-sm font-semibold text-brown-mid uppercase tracking-wide">
          What we offer
        </span>

        <h1 className="text-6xl font-bold text-center text-cream">Grooming Services</h1>
        <span className="text-sm text-center text-brown-mid mt-2">
          Every service is designed with your pet's comfort and wellbeing in
          mind. Our experienced groomers take the time to make each visit
          stress-free.
        </span>
      </section>
      <section id="services" className="flex flex-col gap-6 max-w-4xl mx-auto my-8">
        <CardService serviceId="bath_and_brush" href="" />
        <CardService serviceId="full_groom" href="" />
        <CardService serviceId="nail_trim" href="" />
        <CardService serviceId="deshedding_treatment" href="" />
        <CardService serviceId="puppys_first_groom" href="" />
      </section>
      <Footer />
    </main>
  );
}
