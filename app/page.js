import { Suspense } from "react";
import Navbar from "./components/website/layout/Navbar";
import Footer from "./components/website/layout/Footer";
import HeroSection from "./components/website/home/HeroSection";
import ContentSections from "./components/website/home/ContentSections";

export default function Home() {
  return (
    <>
      <Suspense fallback={null}>
        <Navbar />
      </Suspense>
      <Suspense fallback={null}>
        <HeroSection />
      </Suspense>
      {/* <ContentSections />  */}
      <Footer />
    </>
  );
}
