import { Suspense } from "react";
import Navbar from "../components/website/layout/Navbar";
import Footer from "../components/website/layout/Footer";

export const metadata = {
  title: "Terms & Conditions | Eldecora",
  description:
    "Review the terms and conditions for using Eldecora services and website."
};

export default function TermsPage() {
  return (
    <>
      <Suspense fallback={null}>
        <Navbar />
      </Suspense>
      <main className="min-h-screen bg-[#f8f4ee] text-black">
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <p className="text-xs uppercase tracking-[0.35em] text-black/60">
            Terms & Conditions
          </p>
          <h1 className="mt-4 text-4xl md:text-5xl font-black tracking-tight">
            Please read these terms carefully.
          </h1>
          <p className="mt-6 text-lg text-black/70 max-w-3xl">
            By using our website or submitting a request, you agree to these
            terms. If you do not agree, please do not use the site.
          </p>

          <div className="mt-10 space-y-8">
            <div className="rounded-3xl border border-black/10 bg-white p-6">
              <h2 className="text-xl font-semibold">Use of Site</h2>
              <p className="mt-3 text-sm text-black/70">
                Content is provided for general information only. You agree not
                to misuse, disrupt, or attempt to access restricted areas.
              </p>
            </div>

            <div className="rounded-3xl border border-black/10 bg-white p-6">
              <h2 className="text-xl font-semibold">Services & Requests</h2>
              <p className="mt-3 text-sm text-black/70">
                Submitting a request does not guarantee availability. We will
                respond based on project fit and scheduling.
              </p>
            </div>

            <div className="rounded-3xl border border-black/10 bg-white p-6">
              <h2 className="text-xl font-semibold">Intellectual Property</h2>
              <p className="mt-3 text-sm text-black/70">
                All site content, including text and visuals, is owned by
                Eldecora and may not be reused without permission.
              </p>
            </div>

            <div className="rounded-3xl border border-black/10 bg-white p-6">
              <h2 className="text-xl font-semibold">Changes</h2>
              <p className="mt-3 text-sm text-black/70">
                We may update these terms at any time. Continued use indicates
                acceptance of updates.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
