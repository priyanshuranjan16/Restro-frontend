

import Hero from "./components/Hero";
import Navbar from "./components/navbar";
import POSInterface from "./components/POSInterface";
import BusinessNetwork from "./components/BusinessNetwork";
import WhyChooseRestrosphere from "./components/WhyChooseRestrosphere";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="w-full bg-white">
      
      <Navbar />

      <Hero />

      <POSInterface />

      

      <BusinessNetwork />

      <WhyChooseRestrosphere />

      <Footer />
    </main>
  );
}
