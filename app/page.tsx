import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import AboutBook from "../components/AboutBook";
import WhyRead from "../components/WhyRead";
import Author from "../components/Author";
import Reviews from "../components/Reviews";
import FAQ from "../components/FAQ";
import CTA from "../components/CTA";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F7F2EB] text-[#1F2D3D]">
      <Navbar />
      <Hero />
      <AboutBook />
      <WhyRead />
      <Author />
      <Reviews />
      <FAQ />
      <CTA />
      <Footer />
    </main>
  );
}