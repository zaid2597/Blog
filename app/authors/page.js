import Navbar from "../components/website/layout/Navbar";
import Footer from "../components/website/layout/Footer";
import AuthorsListClient from "../components/website/authors/AuthorsListClient";

export const metadata = {
  title: "Our Authors | Eldecora",
  description:
    "Meet the Eldecora Studio authors who curate timeless home decor stories."
};

export default function AuthorsPage() {
  return (
    <>
      <Navbar />
      <AuthorsListClient />
      <Footer />
    </>
  );
}
