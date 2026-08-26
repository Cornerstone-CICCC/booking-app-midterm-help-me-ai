// Services page
import NavBar from "./../../components/NavBar";
import Footer from "./../../components/Footer";
import CardService from "./../../components/ui/CardService";

export default function Services() {
  return (
    <main>
      <NavBar />
      <section id="hero-section">

        
      </section>
      <section id="service-section">
        <CardService title="Grooming" description="Professional grooming services for your pets." />
        <CardService title="Walking" description="Leisurely walks for your dogs." />
        <CardService title="Training" description="Behavioral training for your pets." />
      </section>

      <h1>Services Page</h1>

      <Footer />
    </main>
  );
}
