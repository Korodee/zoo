"use client";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Intro from "@/components/Intro";
import Highlights from "@/components/Highlights";
import PrizeStructure from "@/components/PrizeStructure/PrizeStructure";
import About from "@/components/About";
import Gallery from "@/components/Gallery";
import Testimonials from "@/components/Testimonials";
// import CTA from "@/components/CTA";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <Intro />
      <Highlights />
      <PrizeStructure />
      <Gallery />
      <Testimonials />
      {/* <CTA /> */}
      <FAQ />
      <Contact />
      <Footer />
    </main>
  );
}
