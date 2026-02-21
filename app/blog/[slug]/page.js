import { Suspense } from "react";
import Navbar from "../../components/website/layout/Navbar";
import Footer from "../../components/website/layout/Footer";
import ContentSections from "../../components/website/home/ContentSections";

export default function BlogPostPage() {
  return (
    <>
      <Suspense fallback={null}>
        <Navbar />
      </Suspense>
      <ContentSections />
      <Footer />
    </>
  );
}
