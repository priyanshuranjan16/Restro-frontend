

import Hero from "./components/Hero";
import Navbar from "./components/navbar";

export default function Home() {
  return (
    <section className="w-full bg-white py-16 px-6 text-center">
      {/* Navbar */}
      <Navbar />

      <Hero />

      
    </section>
  );
}
