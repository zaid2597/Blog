import Navbar from "../../components/website/layout/Navbar";
import Footer from "../../components/website/layout/Footer";
import AuthorProfileClient from "../../components/website/authors/AuthorProfileClient";

export function generateMetadata({ params }) {
  return {
    title: "Author Profile | Eldecora",
    description:
      "Meet the Eldecora Studio authors behind our home decor stories."
  };
}

export default function AuthorProfilePage({ params }) {
  return (
    <>
      <Navbar />
      <AuthorProfileClient key={params.slug} slug={params.slug} />
      <Footer />
    </>
  );
}
