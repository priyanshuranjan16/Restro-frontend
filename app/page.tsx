

import Hero from "./components/Hero";
import Navbar from "./components/navbar";
import POSInterface from "./components/POSInterface";

export default function Home() {
  return (
    <main className="w-full bg-white">
      {/* Navbar */}
      <Navbar />

      <Hero />

      <POSInterface />
    </main>
  );
}
