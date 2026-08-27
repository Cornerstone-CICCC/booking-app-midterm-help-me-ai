// Service Page

import NavBar from "./../../components/NavBar";
import Footer from "./../../components/Footer";
import CardService from "../../components/ui/CardService";

export default function Services() {
  return (
    <main>
      <NavBar />
      <header className="bg-brown px-6 py-20 text-cream">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-semibold uppercase  text-terra-light">
            What we offer
          </p>
          <h1 className="mt-3 font-display text-5xl font-semibold md:text-6xl">
            Grooming Services
          </h1>
          <p className="mt-4 max-w-2xl text-lg  text-cream/70">
            Every service is designed with your pet’s comfort and wellbeing in
            mind. Our groomers take the time to make every visit stress-free.
          </p>
        </div>
      </header>

      <section
        id="services"
        className="flex flex-col gap-6 px-6 py-12 md:px-24 md:py-16"
      >
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
