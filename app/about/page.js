import Link from "next/link";
import Navbar from "../components/website/layout/Navbar";
import Footer from "../components/website/layout/Footer";

export const metadata = {
  title: "About Us | Eldecora",
  description:
    "Discover Eldecora Studio, a luxury home decor brand curating timeless elegance for modern living spaces."
};

const values = [
  {
    title: "Timeless Design",
    detail:
      "We blend classic proportions with modern restraint to create pieces that stay relevant."
  },
  {
    title: "Curated Quality",
    detail:
      "Every material is selected for durability, texture, and the way it catches light."
  },
  {
    title: "Intentional Living",
    detail:
      "Our collections are designed to support calm, comfort, and everyday rituals."
  }
];

const steps = [
  {
    title: "Discover",
    detail: "We listen to your space, mood, and lifestyle goals."
  },
  {
    title: "Curate",
    detail: "We assemble a tailored selection of decor and finishes."
  },
  {
    title: "Transform",
    detail: "We deliver, style, and refine the final atmosphere."
  }
];

const stats = [
  { label: "Curated Collections", value: "120+" },
  { label: "Design Partners", value: "40+" },
  { label: "Happy Homes", value: "1,300+" }
];

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#f8f4ee] text-black">
        <section className="relative overflow-hidden border-b border-black/10">
          <div className="pointer-events-none absolute -top-24 -right-20 h-72 w-72 rounded-full bg-[#d7bfa8]/60 blur-3xl animate-[floatSlow_12s_ease-in-out_infinite]" />
          <div className="pointer-events-none absolute -bottom-28 -left-20 h-80 w-80 rounded-full bg-[#b8c8b9]/60 blur-3xl animate-[floatMedium_10s_ease-in-out_infinite]" />

          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
            <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] items-center">
              <div className="space-y-6">
                <p className="text-xs uppercase tracking-[0.45em] text-black/60 animate-[fadeIn_0.8s_ease-out_forwards]">
                  About Eldecora
                </p>
                <h1 className="text-4xl md:text-5xl font-black tracking-tight animate-[fadeUp_0.9s_ease-out_forwards]">
                  Eldecora Studio is a luxury home decor brand dedicated to
                  bringing timeless elegance into modern living spaces.
                </h1>
                <p className="text-lg text-black/70 max-w-xl animate-[fadeUp_1s_ease-out_forwards]">
                  We believe that a beautifully designed home reflects refined
                  taste and personality. Each piece in our collection is curated
                  to blend sophistication, quality, and modern aesthetics.
                </p>
                <div className="flex flex-wrap gap-3 text-[11px] uppercase tracking-[0.24em] text-black/60">
                  <span className="rounded-full border border-black/10 bg-white/80 px-3 py-1">
                    Timeless
                  </span>
                  <span className="rounded-full border border-black/10 bg-white/80 px-3 py-1">
                    Modern Luxury
                  </span>
                  <span className="rounded-full border border-black/10 bg-white/80 px-3 py-1">
                    Curated Living
                  </span>
                </div>
              </div>

              <div className="rounded-3xl border border-black/10 bg-white/90 p-6 md:p-8 shadow-[0_30px_80px_-60px_rgba(0,0,0,0.6)] animate-[fadeUp_1.1s_ease-out_forwards]">
                <p className="text-xs uppercase tracking-[0.3em] text-black/50">
                  Our Mission
                </p>
                <p className="mt-4 text-xl font-semibold leading-snug">
                  To transform everyday spaces into extraordinary experiences.
                </p>
                <p className="mt-3 text-sm text-black/70">
                  We combine decor, lighting, and furniture to create layered
                  interiors that feel calm, refined, and personal.
                </p>
                <div className="mt-6 grid gap-4 sm:grid-cols-3">
                  {stats.map((stat) => (
                    <div
                      key={stat.label}
                      className="rounded-2xl border border-black/10 bg-[#f8f4ee] p-4 text-center"
                    >
                      <p className="text-2xl font-black">{stat.value}</p>
                      <p className="text-xs uppercase tracking-[0.2em] text-black/60">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="grid gap-6 md:grid-cols-3">
            {values.map((value) => (
              <div
                key={value.title}
                className="rounded-3xl border border-black/10 bg-white p-6 shadow-[0_30px_80px_-60px_rgba(0,0,0,0.6)] transition-transform duration-500 hover:-translate-y-2"
              >
                <p className="text-xs uppercase tracking-[0.3em] text-black/60">
                  Value
                </p>
                <h3 className="mt-3 text-lg font-semibold">{value.title}</h3>
                <p className="mt-2 text-sm text-black/70">{value.detail}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] items-center">
            <div className="space-y-5">
              <p className="text-xs uppercase tracking-[0.3em] text-black/60">
                How We Work
              </p>
              <h2 className="text-3xl font-black tracking-tight">
                A collaborative studio process built around your home.
              </h2>
              <p className="text-sm text-black/70">
                Our designers partner with you to refine the details that
                transform a house into a home. From the first mood board to the
                final styling, we keep every decision intentional.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-full border border-black px-5 py-2 text-xs font-semibold uppercase tracking-[0.3em] transition hover:bg-black hover:text-white"
                >
                  Start a Project
                </Link>
              </div>
            </div>

            <div className="rounded-3xl border border-black/10 bg-white/90 p-6 md:p-8">
              <div className="space-y-5">
                {steps.map((step, index) => (
                  <div
                    key={step.title}
                    className="flex items-start gap-4 rounded-2xl border border-black/10 bg-[#f8f4ee] p-4"
                  >
                    <div className="h-10 w-10 rounded-full border border-black/30 bg-white text-sm font-semibold flex items-center justify-center">
                      0{index + 1}
                    </div>
                    <div>
                      <p className="text-sm font-semibold">{step.title}</p>
                      <p className="text-xs text-black/70">{step.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
