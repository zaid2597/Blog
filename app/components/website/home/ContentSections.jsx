'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function ContentSections() {
  return (
    <>
      <WhatsNewSection />
      <NowFeaturedSection />
      <RelatedAreaSection />
    </>
  );
}

// ============================================
// WHAT'S NEW SECTION
// ============================================
function WhatsNewSection() {
  const articles = [
    {
      id: 1,
      image: '/images/stance-socks.svg',
      title: 'The Stance Shift: Redefining Performance from the Ground Up',
      author: 'Mike Lauras',
      date: 'Jan 23, 2026',
      tags: ['#Style Trends', '#Outdoor Gear'],
      gradient: 'from-orange-200 via-orange-300 to-orange-400',
    },
    {
      id: 2,
      image: '/images/coco-moon.svg',
      title: 'The Aloha of Comfort: How Coco Moon Hawaii Redefines the Art of Mindful Parenting',
      author: 'Jerry',
      date: 'Jan 22, 2026',
      tags: ['#Health & Wellness', '#Style Trends'],
      gradient: 'from-teal-200 via-cyan-300 to-blue-400',
    },
    {
      id: 3,
      image: '/images/overtone.svg',
      title: 'How Overtone Transforms Your Haircare, Health, and Confidence',
      author: 'DailyDrift',
      date: 'Jan 17, 2026',
      tags: ['#Taste Filters'],
      gradient: 'from-blue-200 via-teal-300 to-cyan-400',
    },
    {
      id: 4,
      image: '/images/saalt.svg',
      title: 'The Unseen Revolution: Saalt and the Reclamation of Your Cycle Wellness',
      author: 'DailyDrift',
      date: 'Jan 17, 2026',
      tags: ['#Adventure Picks', '#Animal Essentials'],
      gradient: 'from-gray-300 via-gray-400 to-gray-500',
    },
  ];

  const stickyCard = {
    badge: 'Saturday pick',
    badgeBg: 'bg-white/80',
    containerGradient: 'from-orange-300 via-orange-200 to-yellow-200',
    image: '/images/haircare-product.svg',
    imageGradient: 'from-blue-100 to-green-100',
    title: 'How Overtone Transforms Your Haircare, Health, and Confidence',
    date: 'January 17, 2026',
    author: 'DailyDrift',
    tag: '#Digital Tools',
    link: '/article/overtone-haircare',
    contentBg: 'from-purple-100 via-pink-50 to-purple-50',
    buttonGradient: 'from-lime-400 to-green-400 hover:from-lime-500 hover:to-green-500',
  };

  return (
    <section className="bg-white py-12 md:py-16 lg:py-20">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-8 md:mb-12">
          What's new
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {articles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          </div>
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-24">
              <StickyCard card={stickyCard} showButton={true} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================
// NOW FEATURED SECTION
// ============================================
function NowFeaturedSection() {
  const articles = [
    {
      id: 5,
      image: '/images/featured-1.svg',
      title: 'The Ultimate Guide to Sustainable Fashion in 2026',
      author: 'Sarah Johnson',
      date: 'Jan 20, 2026',
      tags: ['#Style Trends', '#Sustainability'],
      gradient: 'from-blue-200 via-purple-300 to-pink-400',
    },
    {
      id: 6,
      image: '/images/featured-2.svg',
      title: 'Top 10 Tech Gadgets That Will Change Your Life',
      author: 'Tech DailyDrift',
      date: 'Jan 19, 2026',
      tags: ['#Digital Tools', '#Gadgets'],
      gradient: 'from-indigo-200 via-blue-300 to-cyan-400',
    },
    {
      id: 7,
      image: '/images/featured-3.svg',
      title: 'Wellness Trends You Need to Know About',
      author: 'Health Team',
      date: 'Jan 18, 2026',
      tags: ['#Health & Wellness'],
      gradient: 'from-green-200 via-emerald-300 to-teal-400',
    },
    {
      id: 8,
      image: '/images/featured-4.svg',
      title: 'Adventure Gear Essentials for Mountain Climbing',
      author: 'Outdoor Expert',
      date: 'Jan 18, 2026',
      tags: ['#Outdoor Gear', '#Adventure'],
      gradient: 'from-amber-200 via-orange-300 to-red-400',
    },
  ];

  const stickyCard = {
    badge: "Editor's choice",
    badgeBg: 'bg-white/90',
    containerGradient: 'from-blue-400 via-blue-300 to-cyan-300',
    image: '/images/editors-pick.svg',
    imageGradient: 'from-purple-100 to-pink-100',
    title: 'The Best Products We Tested This Month',
    date: 'January 15, 2026',
    author: 'Editorial Team',
    tag: '#Reviews',
    link: '/article/best-products-january',
    contentBg: 'white/90',
    buttonGradient: 'from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700',
    buttonText: 'text-white',
  };

  return (
    <section className="bg-gray-50 py-12 md:py-16 lg:py-20">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-8 md:mb-12">
          Now featured
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {articles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          </div>
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-24">
              <StickyCard card={stickyCard} showButton={true} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================
// RELATED AREA SECTION
// ============================================
function RelatedAreaSection() {
  const articles = [
    {
      id: 9,
      image: '/images/related-1.svg',
      title: 'Exploring the Best Coffee Makers for Your Morning Routine',
      author: 'Kitchen Expert',
      date: 'Jan 16, 2026',
      tags: ['#Home Essentials', '#Kitchen'],
      gradient: 'from-rose-200 via-pink-300 to-fuchsia-400',
    },
    {
      id: 10,
      image: '/images/related-2.svg',
      title: 'Pet Care Tips: Everything You Need for a Happy Dog',
      author: 'Pet Specialist',
      date: 'Jan 15, 2026',
      tags: ['#Pet Care Tips'],
      gradient: 'from-yellow-200 via-amber-300 to-orange-400',
    },
    {
      id: 11,
      image: '/images/related-3.svg',
      title: 'Smart Home Devices That Actually Make Life Easier',
      author: 'Tech Reviewer',
      date: 'Jan 14, 2026',
      tags: ['#Digital Tools', '#Smart Home'],
      gradient: 'from-violet-200 via-purple-300 to-indigo-400',
    },
    {
      id: 12,
      image: '/images/related-4.svg',
      title: 'The Art of Minimalist Interior Design',
      author: 'Design Team',
      date: 'Jan 13, 2026',
      tags: ['#Home Essentials', '#Design'],
      gradient: 'from-slate-200 via-gray-300 to-zinc-400',
    },
  ];

  const stickyCard = {
    badge: 'Trending now',
    badgeBg: 'bg-white/90',
    containerGradient: 'from-pink-400 via-rose-300 to-orange-300',
    image: '/images/trending.svg',
    imageGradient: 'from-yellow-100 to-orange-100',
    title: 'Most Popular Articles This Week',
    date: 'Updated daily',
    author: 'DailyDrift',
    tag: '#Trending',
    link: '/trending',
    contentBg: 'white/90',
    buttonGradient: 'from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700',
    buttonText: 'text-white',
  };

  return (
    <section className="bg-white py-12 md:py-16 lg:py-20">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-8 md:mb-12">
          Related area
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {articles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          </div>
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-24">
              <StickyCard card={stickyCard} showButton={true} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================
// SHARED COMPONENTS
// ============================================

// Article Card Component
function ArticleCard({ article }) {
  return (
    <Link href={`/article/${article.id}`} className="group cursor-pointer">
      <article className="flex flex-col h-full">
        {/* Image */}
        <div className={`relative w-full aspect-[4/3] rounded-2xl overflow-hidden mb-4 bg-gradient-to-br ${article.gradient}`}>
          <img
            src={article.image}
            alt={article.title}
            className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col">
          <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 group-hover:text-gray-700 transition-colors duration-200 line-clamp-3">
            {article.title}
          </h3>
          <div className="mt-auto">
            <p className="text-sm text-gray-600 mb-2">{article.author}</p>
            <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500">
              <span>{article.date}</span>
              <span>in</span>
              {article.tags.map((tag, index) => (
                <span key={index} className="text-gray-600">
                  {tag}
                  {index < article.tags.length - 1 && ' '}
                </span>
              ))}
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}

// Sticky Card Component
function StickyCard({ card, showButton = true }) {
  return (
    <div className={`bg-gradient-to-br ${card.containerGradient} rounded-3xl p-6 md:p-8 shadow-lg`}>
      {/* Badge */}
      <div className={`inline-block ${card.badgeBg} backdrop-blur-sm px-4 py-2 rounded-full mb-6`}>
        <span className="text-sm font-medium text-gray-900">{card.badge}</span>
      </div>

      {/* Image */}
      <div className="relative w-full aspect-video rounded-2xl overflow-hidden mb-6 bg-white/50">
        <div className={`absolute inset-0 bg-gradient-to-br ${card.imageGradient} opacity-30`} />
        <img
          src={card.image}
          alt={card.title}
          className="absolute inset-0 h-full w-full object-cover"
          loading="lazy"
        />
      </div>

      {/* Content Box */}
      <div className={`bg-gradient-to-br ${card.contentBg} backdrop-blur-sm rounded-2xl p-6`}>
        <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 leading-tight">
          {card.title}
        </h3>
        <div className="mb-6 space-y-1">
          <p className="text-sm text-gray-700">{card.date}</p>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-700">{card.author}</span>
            <span className="text-gray-500">·</span>
            <span className="text-gray-700">{card.tag}</span>
          </div>
        </div>
        {showButton && (
          <Link
            href={card.link}
            className={`block w-full bg-gradient-to-r ${card.buttonGradient} ${card.buttonText || 'text-gray-900'} font-bold text-center py-3.5 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-[1.02] active:scale-[0.98]`}
          >
            <span className="flex items-center justify-center gap-2">
              Go to article
              <ArrowRight className="w-5 h-5" />
            </span>
          </Link>
        )}
      </div>
    </div>
  );
}




