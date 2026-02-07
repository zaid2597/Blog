'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronDown, Search, Menu, X, Star } from 'lucide-react';

// Optional: Import from config file for easier management
// import navigationConfig from '@/config/navigation';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setOpenDropdown(null);
  };

  const toggleDropdown = (menu) => {
    setOpenDropdown(openDropdown === menu ? null : menu);
  };

  const categoriesLinks = [
    { label: 'Style Trends', href: '/categories/style-trends' },
    { label: 'Health & Wellness', href: '/categories/health-wellness' },
    { label: 'Outdoor Gear', href: '/categories/outdoor-gear' },
    { label: 'Digital Tools', href: '/categories/digital-tools' },
    { label: 'Gourmet Picks', href: '/categories/gourmet-picks' },
    { label: 'Parenting Picks', href: '/categories/parenting-picks' },
    { label: 'Gift Ideas', href: '/categories/gift-ideas' },
    { label: 'All Categories', href: '/categories', featured: true },
  ];

  const archiveLinks = [
    { label: '2025', href: '/archive/2025' },
    { label: '2024', href: '/archive/2024' },
    { label: '2023', href: '/archive/2023' },
    { label: 'All Posts', href: '/archive', featured: true },
  ];

  const resourcesLinks = [
    { label: 'Buying Guides', href: '/resources/buying-guides' },
    { label: 'How-To Articles', href: '/resources/how-to' },
    { label: 'Product Comparisons', href: '/resources/comparisons' },
    { label: 'Reviews', href: '/resources/reviews' },
  ];

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 group">
            <div className="flex items-center">
              {/* Logo Container */}
              <div className="relative">
                {/* Placeholder Logo - Replace with your actual logo */}
                <div className="w-32 sm:w-36 md:w-40 h-10 md:h-12 bg-gradient-to-br from-blue-900 via-blue-800 to-purple-700 rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow duration-300">
                  <div className="text-center">
                    <span className="text-white font-bold text-base md:text-lg tracking-wide">DailyDrift</span>
                    <div className="flex justify-center gap-0.5 mt-0.5">
                      <div className="w-1 h-1 bg-yellow-400 rounded-full"></div>
                      <div className="w-1 h-1 bg-yellow-400 rounded-full"></div>
                      <div className="w-1 h-1 bg-yellow-400 rounded-full"></div>
                    </div>
                  </div>
                </div>
                {/* 
                Uncomment when you have the actual logo:
                <Image
                  src="/DailyDrift-logo-black.png"
                  alt="DailyDrift Logo"
                  width={160}
                  height={48}
                  className="h-10 md:h-12 w-auto"
                  priority
                />
                */}
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {/* Categories Dropdown */}
            <DropdownMenu
              title="Categories"
              links={categoriesLinks}
              isOpen={openDropdown === 'categories'}
              onToggle={() => toggleDropdown('categories')}
            />

            {/* Archive Dropdown */}
            <DropdownMenu
              title="Archive"
              links={archiveLinks}
              isOpen={openDropdown === 'archive'}
              onToggle={() => toggleDropdown('archive')}
            />

            {/* Resources Dropdown */}
            <DropdownMenu
              title="Resources"
              links={resourcesLinks}
              isOpen={openDropdown === 'resources'}
              onToggle={() => toggleDropdown('resources')}
            />

            {/* Authors Link */}
            <Link
              href="/authors"
              className="flex items-center gap-1.5 px-3 xl:px-4 py-2 text-gray-700 hover:text-gray-900 text-base font-medium transition-all duration-200 rounded-lg hover:bg-gray-50"
            >
              <Star className="w-4 h-4" />
              <span>Authors</span>
            </Link>

            {/* Tags Link */}
            <Link
              href="/tags"
              className="px-3 xl:px-4 py-2 text-gray-700 hover:text-gray-900 text-base font-medium transition-all duration-200 rounded-lg hover:bg-gray-50"
            >
              Tags
            </Link>
          </div>

          {/* Search and Mobile Menu */}
          <div className="flex items-center gap-2 md:gap-3">
            {/* Search Bar - Desktop */}
            <div className="hidden md:flex items-center">
              <div className="relative group">
                <input
                  type="text"
                  placeholder="Search"
                  className="w-48 lg:w-56 xl:w-64 pl-10 pr-4 py-2 text-sm text-gray-900 placeholder-gray-500 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white transition-all duration-200"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-blue-500 transition-colors duration-200" />
              </div>
            </div>

            {/* Search Icon - Mobile */}
            <button
              className="md:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all duration-200 active:scale-95"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="lg:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all duration-200 active:scale-95"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="py-4 border-t border-gray-200">
            {/* Mobile Search */}
            <div className="mb-4 md:hidden px-1">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search"
                  className="w-full pl-10 pr-4 py-2.5 text-sm text-gray-900 placeholder-gray-500 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white transition-all duration-200"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>
            </div>

            {/* Mobile Navigation Links */}
            <div className="space-y-1">
              <MobileDropdown
                title="Categories"
                links={categoriesLinks}
                isOpen={openDropdown === 'categories-mobile'}
                onToggle={() => toggleDropdown('categories-mobile')}
                onLinkClick={() => setIsMobileMenuOpen(false)}
              />
              <MobileDropdown
                title="Archive"
                links={archiveLinks}
                isOpen={openDropdown === 'archive-mobile'}
                onToggle={() => toggleDropdown('archive-mobile')}
                onLinkClick={() => setIsMobileMenuOpen(false)}
              />
              <MobileDropdown
                title="Resources"
                links={resourcesLinks}
                isOpen={openDropdown === 'resources-mobile'}
                onToggle={() => toggleDropdown('resources-mobile')}
                onLinkClick={() => setIsMobileMenuOpen(false)}
              />
              <Link
                href="/authors"
                className="flex items-center gap-2 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg font-medium transition-all duration-200 active:scale-[0.98]"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Star className="w-4 h-4" />
                <span>Authors</span>
              </Link>
              <Link
                href="/tags"
                className="block px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg font-medium transition-all duration-200 active:scale-[0.98]"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Tags
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

// Desktop Dropdown Menu Component
function DropdownMenu({ title, links, isOpen, onToggle }) {
  return (
    <div className="relative">
      <button
        onClick={onToggle}
        className="flex items-center gap-1 px-3 xl:px-4 py-2 text-gray-700 hover:text-gray-900 text-base font-medium transition-all duration-200 rounded-lg hover:bg-gray-50"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <span>{title}</span>
        <ChevronDown
          className={`w-4 h-4 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-10"
            onClick={onToggle}
            aria-hidden="true"
          />
          {/* Dropdown Menu */}
          <div className="absolute top-full left-0 mt-2 w-60 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-20 animate-in fade-in slide-in-from-top-2 duration-200">
            {links.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                className={`block px-4 py-2.5 text-sm transition-all duration-200 ${
                  link.featured
                    ? 'text-blue-600 font-semibold hover:bg-blue-50'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                }`}
                onClick={onToggle}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// Mobile Dropdown Component
function MobileDropdown({ title, links, isOpen, onToggle, onLinkClick }) {
  return (
    <div>
      <button
        onClick={onToggle}
        className="flex items-center justify-between w-full px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg font-medium transition-all duration-200"
        aria-expanded={isOpen}
      >
        <span>{title}</span>
        <ChevronDown
          className={`w-4 h-4 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="mt-1 ml-4 space-y-1 pb-2">
          {links.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              className={`block px-4 py-2 text-sm rounded-lg transition-all duration-200 ${
                link.featured
                  ? 'text-blue-600 font-semibold hover:bg-blue-50'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
              onClick={onLinkClick}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
