// Home page
import NavBar from './../components/NavBar';
import ButtonLink from './../components/ui/ButtonLink';
import InputField from '../components/ui/InputField';
import Dropdown from '../components/ui/Dropdown';
import Footer from '../components/Footer';



export default function Home() {
  return (
    <main>
        <NavBar />
        <ButtonLink href="/services" variant="primary" size="large">
          View Services
        </ButtonLink>
        <ButtonLink href="/services" variant="secondary" size="large">
          View Services
        </ButtonLink>
        <form className="max-w-md mx-auto mt-8">
          <InputField label="Name" placeholder="Enter your name" error="Name is required" required />
          <InputField label="Email" type="email" required placeholder="Enter your email" />
          <InputField label="Password" type="password" placeholder="Enter your password" />
          <ButtonLink href="/services" variant="primary" size="medium">
            Submit
          </ButtonLink>
        </form>

<Dropdown label="Select a service" placeholder="Select a service" options={["Grooming", "Walking", "Training"]} />
    
    
    <Footer />
  </main>
  );
}