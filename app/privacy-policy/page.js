import { Suspense } from "react";
import Navbar from "../components/website/layout/Navbar";
import Footer from "../components/website/layout/Footer";

export const metadata = {
  title: "Privacy Policy | Eldecora",
  description:
    "Learn how Eldecora collects, uses, and protects your personal information."
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <Suspense fallback={null}>
        <Navbar />
      </Suspense>
      <main className="min-h-screen bg-[#f8f4ee] text-black">
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <p className="text-xs uppercase tracking-[0.35em] text-black/60">
            Privacy Policy
          </p>
          <h1 className="mt-4 text-4xl md:text-5xl font-black tracking-tight">
            Your privacy matters to us.
          </h1>
          <p className="mt-6 text-lg text-black/70 max-w-3xl">
            This policy explains what information we collect, why we collect it,
            and how we protect it. If you have questions, contact us at
            eldecorastudio@gmail.com.
          </p>

          <div className="mt-10 space-y-8">
            <div className="rounded-3xl border border-black/10 bg-white p-6">
              <h2 className="text-xl font-semibold">Information We Collect</h2>
              <p className="mt-3 text-sm text-black/70">
                We collect information you provide when you submit a contact
                form (such as name, email, phone, and message). We may also
                collect basic usage data to improve site performance.
              </p>
            </div>

            <div className="rounded-3xl border border-black/10 bg-white p-6">
              <h2 className="text-xl font-semibold">How We Use Information</h2>
              <p className="mt-3 text-sm text-black/70">
                We use your details to respond to inquiries, provide requested
                services, and improve our offerings. We do not sell your data.
              </p>
            </div>

            <div className="rounded-3xl border border-black/10 bg-white p-6">
              <h2 className="text-xl font-semibold">Data Security</h2>
              <p className="mt-3 text-sm text-black/70">
                We take reasonable steps to protect your information and limit
                access to authorized team members only.
              </p>
            </div>

            <div className="rounded-3xl border border-black/10 bg-white p-6">
              <h2 className="text-xl font-semibold">Updates</h2>
              <p className="mt-3 text-sm text-black/70">
                We may update this policy from time to time. Changes will appear
                on this page.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
