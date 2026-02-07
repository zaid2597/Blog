import Navbar from "./components/website/layout/Navbar";
import Footer from "./components/website/layout/Footer";
import HeroSection from "./components/website/home/HeroSection";
import ContentSections from "./components/website/home/ContentSections";

export default function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <ContentSections /> 
      <Footer />
    </>
  );
}
