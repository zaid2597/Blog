'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Instagram, Twitter, Linkedin, Youtube } from 'lucide-react';

// Optional: Import from config file
// import footerConfig from '@/config/footer';

export default function Footer() {
  // Social media icons mapping
  const socialIcons = {
    facebook: Facebook,
    instagram: Instagram,
    twitter: Twitter,
    linkedin: Linkedin,
    youtube: Youtube,
  };

  const tagsLinks = [
    { label: '#Style Trends', href: '/tags/style-trends' },
    { label: '#Health & Wellness', href: '/tags/health-wellness' },
    { label: '#Gift Ideas', href: '/tags/gift-ideas' },
    { label: '#Explore Destinations', href: '/tags/explore-destinations' },
    { label: '#Pet Care Tips', href: '/tags/pet-care-tips' },
  ];

  const quickLinks = [
    { label: 'Home', href: '/' },
    { label: 'About Us', href: '/about-us' },
    { label: 'Contact', href: '/contact-us' },
    { label: 'Write for Us', href: '/write-for-us' },
  ];

  const legalLinks = [
    { label: 'Privacy Policy', href: '/privacy-policy' },
    { label: 'Terms & Conditions', href: '/terms-conditions' },
  ];

  const socialLinks = [
    { name: 'Facebook', url: 'https://facebook.com', icon: 'facebook' },
    { name: 'Instagram', url: 'https://instagram.com', icon: 'instagram' },
  ];

  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      {/* Main Footer Content */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20">
        {/* Top Section: Logo and Social Icons */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-12 md:mb-16 pb-8 md:pb-10 border-b border-gray-200">
          {/* Logo */}
          <Link href="/" className="mb-6 sm:mb-0 group">
            <div className="w-40 md:w-48 h-12 md:h-14 bg-gradient-to-br from-blue-900 via-blue-800 to-purple-700 rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-300">
              <div className="text-center">
                <span className="text-white font-bold text-lg md:text-xl tracking-wide">
                  DailyDrift
                </span>
                <div className="flex justify-center gap-0.5 mt-0.5">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="w-1 h-1 bg-yellow-400 rounded-full"></div>
                  ))}
                </div>
              </div>
            </div>
            {/* 
            Uncomment when you have actual logo:
            <Image
              src="/DailyDrift-logo-black.png"
              alt="DailyDrift Logo"
              width={192}
              height={56}
              className="h-12 md:h-14 w-auto"
            />
            */}
          </Link>

          {/* Social Media Icons */}
          <div className="flex items-center gap-3 md:gap-4">
            {socialLinks.map((social, index) => {
              const IconComponent = socialIcons[social.icon];
              return (
                <Link
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center text-gray-700 hover:text-blue-600 transition-colors duration-200 hover:scale-110 transform"
                  aria-label={social.name}
                >
                  <IconComponent className="w-5 h-5" />
                </Link>
              );
            })}
          </div>
        </div>

        {/* Footer Links Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 md:gap-10 lg:gap-12">
          {/* Tags Column */}
          <FooterColumn title="Tags" links={tagsLinks} />

          {/* Quick Links Column */}
          <FooterColumn title="Quick Links" links={quickLinks} />

          {/* Legal Column */}
          <FooterColumn title="Legal" links={legalLinks} />

          {/* Get in Touch Column */}
          <div className="lg:col-span-1">
            <h3 className="text-gray-900 font-semibold text-base md:text-lg mb-4 md:mb-5">
              Get in touch
            </h3>
            <ul className="space-y-2.5 md:space-y-3">
              <li>
                <a
                  href="mailto:contact@DailyDrift.com"
                  className="text-gray-600 hover:text-gray-900 text-sm md:text-base transition-colors duration-200 inline-block hover:underline"
                >
                  contact@DailyDrift.com
                </a>
              </li>
              <li>
                <p className="text-gray-600 text-sm md:text-base">
                  Mon–Fri, 9am–6pm
                </p>
              </li>
            </ul>
          </div>

          {/* Affiliate Disclaimer Column */}
          <div className="lg:col-span-1 sm:col-span-2 lg:col-span-1">
            <h3 className="text-gray-900 font-semibold text-base md:text-lg mb-4 md:mb-5">
              Affiliate Disclaimer
            </h3>
            <p className="text-gray-600 text-sm md:text-base leading-relaxed">
              Some links on DailyDrift are affiliate links. If you choose to shop through them, we may earn a small commission at no extra cost to you. Our reviews and recommendations stay independent and editorially honest.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Copyright Bar (Optional) */}
      {/* Uncomment if you want copyright bar */}
      {/*
      <div className="border-t border-gray-200 bg-gray-100">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-600 text-center sm:text-left">
              © {new Date().getFullYear()} DailyDrift. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm">
              <Link href="/sitemap" className="text-gray-600 hover:text-gray-900 transition-colors">
                Sitemap
              </Link>
              <Link href="/cookies" className="text-gray-600 hover:text-gray-900 transition-colors">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
      */}
    </footer>
  );
}

// Reusable Footer Column Component
function FooterColumn({ title, links }) {
  return (
    <div className="lg:col-span-1">
      <h3 className="text-gray-900 font-semibold text-base md:text-lg mb-4 md:mb-5">
        {title}
      </h3>
      <ul className="space-y-2.5 md:space-y-3">
        {links.map((link, index) => (
          <li key={index}>
            <Link
              href={link.href}
              className="text-gray-600 hover:text-gray-900 text-sm md:text-base transition-colors duration-200 inline-block hover:translate-x-0.5 transform"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
