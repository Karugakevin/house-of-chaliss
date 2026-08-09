import Hero from "../components/Hero";
import FeaturedBooks from "../components/FeaturedBooks";
import BookSeries from "../components/BookSeries";
import AboutBook from "../components/AboutBook";
import WhyRead from "../components/WhyRead";
import Author from "../components/Author";
import Reviews from "../components/Reviews";
import FAQ from "../components/FAQ";
import CTA from "../components/CTA";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <>
      <Hero />

      <FeaturedBooks />

      <BookSeries />

      <AboutBook />

      <WhyRead />

      <Author />

      <Reviews />

      <FAQ />

      <CTA />

      <Footer />
    </>
  );
}