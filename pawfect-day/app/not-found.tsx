import Footer from "./components/Footer";
import NavBar from "./components/NavBar";
import ButtonLink from "./components/ui/ButtonLink";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col bg-cream">
      <NavBar />
      <main className="flex flex-1 items-center justify-center px-6 py-16 text-center text-brown md:px-12">
        <section className="mx-auto flex max-w-3xl flex-col items-center">
          <div
            aria-hidden="true"
            className="mb-8 flex h-48 w-48 items-center justify-center rounded-full bg-terra-faint md:h-56 md:w-56"
            style={{ fontSize: "9rem", lineHeight: 1 }}
          >
            😿
          </div>

          <p className="text-sm font-semibold uppercase tracking-widest text-terra">
            404 Page not found
          </p>
          <h1 className="mt-4 font-display text-5xl font-semibold leading-tight text-brown md:text-7xl">
            This page wandered off.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-brown-mid">
            We could not find the page you are looking for. Head back home or
            book a grooming appointment for your pet.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-4">
            <ButtonLink href="/" size="large">
              Return Home
            </ButtonLink>
            <ButtonLink href="/book" variant="secondary" size="large">
              Book Appointment
            </ButtonLink>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
