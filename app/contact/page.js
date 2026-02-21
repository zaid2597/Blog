import { Suspense } from "react";
import Navbar from "../components/website/layout/Navbar";
import Footer from "../components/website/layout/Footer";
import ContactForm from "../components/website/contact/ContactForm";

export const metadata = {
  title: "Contact Us | Eldecora",
  description:
    "Get in touch with Eldecora for home decor styling, product inquiries, and custom orders."
};

export default function ContactPage() {
  return (
    <>
      <Suspense fallback={null}>
        <Navbar />
      </Suspense>
      <main className="min-h-screen bg-[#f8f4ee] text-black">
        <section className="relative overflow-hidden border-b border-black/10">
          <div className="pointer-events-none absolute -top-28 -right-16 h-72 w-72 rounded-full bg-[#d7bfa8]/60 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-32 -left-24 h-80 w-80 rounded-full bg-[#b8c8b9]/60 blur-3xl" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-6">
              <p className="text-xs uppercase tracking-[0.45em] text-black/60">
                Contact Eldecora
              </p>
              <h1 className="text-4xl md:text-5xl font-black tracking-tight">
                Let’s shape a home that feels calm, warm, and intentional.
              </h1>
              <p className="text-lg text-black/70 max-w-xl">
                Share your space, your style, and what you are looking for. Our
                team curates decor, lighting, and custom accents tailored to your
                room.
              </p>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-black/10 bg-white/80 p-4">
                  <p className="text-xs uppercase tracking-[0.3em] text-black/50">
                    Studio
                  </p>
                  <p className="mt-2 text-sm font-semibold">Model Town, Lahore</p>
                  <p className="text-sm text-black/60">Mon–Sat · 10:00 AM – 7:00 PM</p>
                </div>
                <div className="rounded-2xl border border-black/10 bg-white/80 p-4">
                  <p className="text-xs uppercase tracking-[0.3em] text-black/50">
                    Reach Us
                  </p>
                  <p className="mt-2 text-sm font-semibold">eldecorastudio@gmail.com</p>
                  <p className="text-sm text-black/60">+92 300 123 4567</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 text-[11px] uppercase tracking-[0.24em] text-black/60">
                <span className="rounded-full border border-black/10 bg-white/80 px-3 py-1">
                  Styling
                </span>
                <span className="rounded-full border border-black/10 bg-white/80 px-3 py-1">
                  Custom Orders
                </span>
                <span className="rounded-full border border-black/10 bg-white/80 px-3 py-1">
                  Whole Home
                </span>
              </div>
            </div>

            <div className="rounded-3xl border border-black/10 bg-white p-6 shadow-[0_20px_60px_-40px_rgba(0,0,0,0.5)]">
              <div className="flex items-center justify-between">
                <p className="text-sm uppercase tracking-[0.3em] text-black/50">
                  Send a Message
                </p>
                <span className="text-xs text-black/50">We reply within 24–48h</span>
              </div>

              <ContactForm />
            </div>
          </div>
        </div>
        </section>

        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                title: "Styling Consult",
                detail: "Mood boards, layout advice, and product selections."
              },
              {
                title: "Custom Orders",
                detail: "Made-to-measure tables, textiles, and lighting."
              },
              {
                title: "White-Glove Delivery",
                detail: "Assembly, placement, and final styling included."
              }
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-3xl border border-black/10 bg-white p-6 shadow-[0_30px_80px_-60px_rgba(0,0,0,0.6)]"
              >
                <p className="text-xs uppercase tracking-[0.3em] text-black/60">
                  Service
                </p>
                <h3 className="mt-3 text-lg font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm text-black/70">{item.detail}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

