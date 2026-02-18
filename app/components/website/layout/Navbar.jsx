'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isClosing, setIsClosing] = useState(false);
  const menuRef = useRef(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  const toggleMobileMenu = () => {
    if (isMobileMenuOpen) {
      // Close with animation
      setIsClosing(true);
      setTimeout(() => {
        setIsMobileMenuOpen(false);
        setIsClosing(false);
      }, 300); // Match this with CSS transition duration
    } else {
      setIsMobileMenuOpen(true);
    }
  };

  const closeMenu = useCallback(() => {
    if (isMobileMenuOpen) {
      setIsClosing(true);
      setTimeout(() => {
        setIsMobileMenuOpen(false);
        setIsClosing(false);
      }, 300);
    }
  }, [isMobileMenuOpen]);

  const toggleDropdown = (menu) => {
    setOpenDropdown(openDropdown === menu ? null : menu);
  };

  const toggleSearch = () => {
    setIsSearchOpen((prev) => !prev);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    const query = searchValue.trim();
    if (query) {
      router.push(`/?q=${encodeURIComponent(query)}`);
    } else {
      router.push('/');
    }
  };

  const handleClearSearch = () => {
    setSearchValue('');
    router.push('/');
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        closeMenu();
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobileMenuOpen, closeMenu]);

  useEffect(() => {
    const query = searchParams.get('q') || '';
    setSearchValue(query);
    if (query) {
      setIsSearchOpen(true);
    }
  }, [searchParams]);

  // Close menu on escape key press
  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.key === 'Escape' && isMobileMenuOpen) {
        closeMenu();
      }
    };

    document.addEventListener('keydown', handleEscapeKey);
    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isMobileMenuOpen, closeMenu]);

  return (
    <nav className="bg-white text-black sticky top-0 z-50 border-b border-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-black tracking-tight uppercase hover:opacity-80 transition-opacity duration-300">
              DAILY DRIFT
            </Link>
          </div>

          {/* Right Side Icons - Search & Hamburger Menu (Always Visible) */}
          <div className="flex items-center space-x-4">
            {/* Search Icon */}
            <button 
              onClick={toggleSearch}
              className="p-2 hover:opacity-60 transition-opacity duration-300"
              aria-label="Search"
            >
              <svg 
                className="w-5 h-5" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
                />
              </svg>
            </button>

            {/* Hamburger Menu (Always Visible on All Screens) */}
            <button
              onClick={toggleMobileMenu}
              className="p-2 hover:opacity-60 transition-opacity duration-300 focus:outline-none"
              aria-label="Menu"
            >
              {isMobileMenuOpen ? (
                <svg className="h-6 w-6 transition-transform duration-300 rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6 transition-transform duration-300 rotate-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {isSearchOpen && (
        <div className="border-t border-black bg-white">
          <form
            onSubmit={handleSearchSubmit}
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-wrap gap-3 items-center"
          >
            <input
              value={searchValue}
              onChange={(event) => setSearchValue(event.target.value)}
              placeholder="Search by title or author"
              className="flex-1 min-w-[200px] border border-black px-4 py-2 text-sm focus:outline-none"
            />
            <button
              type="submit"
              className="bg-black text-white px-4 py-2 text-sm font-semibold uppercase tracking-wider hover:bg-red-600 transition-colors"
            >
              Search
            </button>
            {searchValue ? (
              <button
                type="button"
                onClick={handleClearSearch}
                className="border border-black px-4 py-2 text-sm font-semibold uppercase tracking-wider hover:bg-black hover:text-white transition-colors"
              >
                Clear
              </button>
            ) : null}
          </form>
        </div>
      )}

      {/* Full Screen Dropdown Menu with Smooth Transition */}
      {(isMobileMenuOpen || isClosing) && (
        <div 
          ref={menuRef}
          className={`
            absolute top-16 left-0 right-0 bg-white border-t border-black shadow-lg 
            max-h-[calc(100vh-4rem)] overflow-y-auto
            transition-all duration-300 ease-in-out
            ${isClosing 
              ? 'opacity-0 -translate-y-4 pointer-events-none' 
              : 'opacity-100 translate-y-0'
            }
          `}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            {/* Home Link */}
            <div className="mb-4">
              <Link
                href="/"
                className="block text-lg font-semibold hover:opacity-60 transition-all duration-300 py-2 transform hover:translate-x-1"
                onClick={closeMenu}
              >
                Home
              </Link>
            </div>

            {/* Features Dropdown */}
            <div className="mb-4">
              <button
                onClick={() => toggleDropdown('features')}
                className="w-full flex items-center justify-between text-lg font-semibold hover:opacity-60 transition-all duration-300 py-2 transform hover:translate-x-1"
              >
                Features
                <svg 
                  className={`w-5 h-5 transition-all duration-300 ${openDropdown === 'features' ? 'rotate-180' : ''}`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div 
                className={`
                  overflow-hidden transition-all duration-300 ease-in-out
                  ${openDropdown === 'features' ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
                `}
              >
                <div className="pl-4 mt-2 space-y-2">
                  <Link 
                    href="/blog-band" 
                    className="block text-base hover:opacity-60 transition-all duration-300 py-1.5 transform hover:translate-x-1" 
                    onClick={closeMenu}
                  >
                    Blog
                  </Link>
                  <Link 
                    href="/about-1" 
                    className="block text-base hover:opacity-60 transition-all duration-300 py-1.5 transform hover:translate-x-1" 
                    onClick={closeMenu}
                  >
                    About 1
                  </Link>
                  <Link 
                    href="/about-2" 
                    className="block text-base hover:opacity-60 transition-all duration-300 py-1.5 transform hover:translate-x-1" 
                    onClick={closeMenu}
                  >
                    About 2
                  </Link>
                  <Link 
                    href="/authors" 
                    className="block text-base hover:opacity-60 transition-all duration-300 py-1.5 transform hover:translate-x-1" 
                    onClick={closeMenu}
                  >
                    Authors
                  </Link>
                  <Link 
                    href="/contacts" 
                    className="block text-base hover:opacity-60 transition-all duration-300 py-1.5 transform hover:translate-x-1" 
                    onClick={closeMenu}
                  >
                    Contacts
                  </Link>
                  <Link 
                    href="/typography" 
                    className="block text-base hover:opacity-60 transition-all duration-300 py-1.5 transform hover:translate-x-1" 
                    onClick={closeMenu}
                  >
                    Typography
                  </Link>
                </div>
              </div>
            </div>

            {/* Post Styles Dropdown */}
            <div className="mb-4">
              <button
                onClick={() => toggleDropdown('poststyles')}
                className="w-full flex items-center justify-between text-lg font-semibold hover:opacity-60 transition-all duration-300 py-2 transform hover:translate-x-1"
              >
                Post styles
                <svg 
                  className={`w-5 h-5 transition-all duration-300 ${openDropdown === 'poststyles' ? 'rotate-180' : ''}`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div 
                className={`
                  overflow-hidden transition-all duration-300 ease-in-out
                  ${openDropdown === 'poststyles' ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
                `}
              >
                <div className="pl-4 mt-2 space-y-2">
                  <Link 
                    href="/why-do-authors-refuse-to-sell-nfts" 
                    className="block text-base hover:opacity-60 transition-all duration-300 py-1.5 transform hover:translate-x-1" 
                    onClick={closeMenu}
                  >
                    Standard
                  </Link>
                  <Link 
                    href="/digital-yin-yang-re-design" 
                    className="block text-base hover:opacity-60 transition-all duration-300 py-1.5 transform hover:translate-x-1" 
                    onClick={closeMenu}
                  >
                    Banner Ads
                  </Link>
                  <Link 
                    href="/old-school-art-principles" 
                    className="block text-base hover:opacity-60 transition-all duration-300 py-1.5 transform hover:translate-x-1" 
                    onClick={closeMenu}
                  >
                    Review Post 1
                  </Link>
                  <Link 
                    href="/fallout-76-has-our-future-ended" 
                    className="block text-base hover:opacity-60 transition-all duration-300 py-1.5 transform hover:translate-x-1" 
                    onClick={closeMenu}
                  >
                    Review Post 2
                  </Link>
                  <Link 
                    href="/new-digital-nft-digest-2022" 
                    className="block text-base hover:opacity-60 transition-all duration-300 py-1.5 transform hover:translate-x-1" 
                    onClick={closeMenu}
                  >
                    Comments Off
                  </Link>
                </div>
              </div>
            </div>

            {/* Shop Dropdown */}
            <div className="mb-4">
              <button
                onClick={() => toggleDropdown('shop')}
                className="w-full flex items-center justify-between text-lg font-semibold hover:opacity-60 transition-all duration-300 py-2 transform hover:translate-x-1"
              >
                Shop
                <svg 
                  className={`w-5 h-5 transition-all duration-300 ${openDropdown === 'shop' ? 'rotate-180' : ''}`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div 
                className={`
                  overflow-hidden transition-all duration-300 ease-in-out
                  ${openDropdown === 'shop' ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
                `}
              >
                <div className="pl-4 mt-2 space-y-2">
                  <Link 
                    href="/shop" 
                    className="block text-base hover:opacity-60 transition-all duration-300 py-1.5 transform hover:translate-x-1" 
                    onClick={closeMenu}
                  >
                    Product Grid
                  </Link>
                  <Link 
                    href="/product/buddah-figurine" 
                    className="block text-base hover:opacity-60 transition-all duration-300 py-1.5 transform hover:translate-x-1" 
                    onClick={closeMenu}
                  >
                    Product
                  </Link>
                  <Link 
                    href="/cart" 
                    className="block text-base hover:opacity-60 transition-all duration-300 py-1.5 transform hover:translate-x-1" 
                    onClick={closeMenu}
                  >
                    Shopping Cart
                  </Link>
                  <Link 
                    href="/checkout" 
                    className="block text-base hover:opacity-60 transition-all duration-300 py-1.5 transform hover:translate-x-1" 
                    onClick={closeMenu}
                  >
                    Checkout
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
