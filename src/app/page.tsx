import About from "@/components/About";
import BeforeAfter from "@/components/BeforeAfter";
import ContactForm from "@/components/ContactForm";
import Gallery from "@/components/Gallery";
import Hero from "@/components/Hero";
import LocationMap from "@/components/LocationMap";
import Reviews from "@/components/Reviews";
import Services from "@/components/Services";
import VehicleShowcase from "@/components/VehicleShowcase";

export default function Home() {
  return (
    <>
      <Hero />
      <VehicleShowcase />
      <Services />
      <About />
      <BeforeAfter />
      <Gallery />
      <Reviews />
      <LocationMap />
      <ContactForm />
    </>
  );
}
