'use client';

import Link from 'next/link';
import { Facebook, Instagram, Twitter, Linkedin, Youtube } from 'lucide-react';

export default function Footer() {
  const socialIcons = {
    facebook: Facebook,
    instagram: Instagram,
    twitter: Twitter,
    linkedin: Linkedin,
    youtube: Youtube
  };

  const footerNav = [
    { label: 'Home', href: '/' },
    { label: 'Blog', href: '/blog' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
    { label: 'Authors', href: '/authors' }
  ];

  const legalLinks = [
    { label: 'Privacy', href: '/privacy-policy' },
    { label: 'Terms', href: '/terms-conditions' }
  ];

  const socialLinks = [
    { name: 'Facebook', url: 'https://facebook.com', icon: 'facebook' },
    { name: 'Instagram', url: 'https://instagram.com', icon: 'instagram' },
    { name: 'Twitter', url: 'https://twitter.com', icon: 'twitter' },
    { name: 'LinkedIn', url: 'https://linkedin.com', icon: 'linkedin' }
  ];

  return (
    <footer className="bg-white text-black border-t border-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <Link
              href="/"
              className="text-2xl font-black tracking-tight uppercase hover:opacity-80 transition-opacity duration-300"
            >
              DAILY DRIFT
            </Link>

            <nav className="flex flex-wrap gap-4 text-sm font-semibold uppercase tracking-wider">
              {footerNav.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-gray-700 hover:text-black transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              {socialLinks.map((social) => {
                const IconComponent = socialIcons[social.icon];
                return (
                  <Link
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 flex items-center justify-center border border-black text-black hover:bg-black hover:text-white transition-colors"
                    aria-label={social.name}
                  >
                    <IconComponent className="w-4 h-4" />
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-t border-black pt-6 text-xs uppercase tracking-wider text-gray-600">
            <p className="text-gray-600">(c) {new Date().getFullYear()} Daily Drift. All rights reserved.</p>
            <div className="flex items-center gap-4">
              {legalLinks.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-gray-600 hover:text-black transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
