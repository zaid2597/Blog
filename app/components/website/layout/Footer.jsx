'use client';

import Link from 'next/link';

export default function Footer() {
  const legalLinks = [
    { label: 'Privacy', href: '/privacy-policy' },
    { label: 'Terms', href: '/terms-conditions' }
  ];

  return (
    <footer className="bg-[#f8f4ee] text-black border-t border-black/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="relative overflow-hidden rounded-3xl bg-white/80 border border-black/10 p-8 md:p-12">
          <div className="pointer-events-none absolute -top-24 -right-12 h-56 w-56 rounded-full bg-[#d7bfa8]/50 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-12 h-64 w-64 rounded-full bg-[#b8c8b9]/45 blur-3xl" />

          <div className="relative grid gap-10 lg:grid-cols-[1.5fr_1fr]">
            <div className="space-y-4">
              <Link
                href="/"
                className="text-3xl font-black tracking-tight uppercase hover:opacity-80 transition-opacity duration-300"
              >
                ELDECORA
              </Link>
              <p className="text-lg md:text-xl font-medium text-black/80">
                Curated home decor, furniture, lighting, and accents designed to
                bring calm and warmth to every space.
              </p>
              <div className="flex flex-wrap gap-3 text-[11px] uppercase tracking-[0.24em] text-black/60">
                <span className="rounded-full border border-black/10 bg-white/80 px-3 py-1">
                  Handpicked
                </span>
                <span className="rounded-full border border-black/10 bg-white/80 px-3 py-1">
                  Timeless
                </span>
                <span className="rounded-full border border-black/10 bg-white/80 px-3 py-1">
                  Made For Home
                </span>
              </div>
            </div>

            <div className="space-y-5">
              <p className="text-xs uppercase tracking-[0.3em] text-black/60">
                Studio
              </p>
              <div className="text-sm text-black/70 leading-relaxed">
                <p>Model Town, Lahore</p>
                <p>Mon–Sat · 10:00 AM – 7:00 PM</p>
                <p className="mt-3">hello@eldecorastudio.com</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-full border border-black px-5 py-2 text-xs font-semibold uppercase tracking-[0.3em] transition hover:bg-black hover:text-white"
                >
                  Contact
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-xs uppercase tracking-wider text-black/60">
          <p>(c) {new Date().getFullYear()} Eldecora. All rights reserved.</p>
          <div className="flex items-center gap-4">
            {legalLinks.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-black/60 hover:text-black transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
