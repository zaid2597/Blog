'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  heroPost,
  topPosts,
  smallPosts,
  editorChoicePosts,
  editorChoiceBottomPosts,
  trendingPosts,
  recentPosts,
  newsPosts,
  latestPosts,
  socialLinks
} from '../../../data/posts';

const FALLBACK_IMAGE = '/images/post-fallback.svg';

const slugify = (value) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

const formatComments = (count) => {
  const value = Number(count) || 0;
  return `${value} Comment${value === 1 ? '' : 's'}`;
};

const normalizeAdminPost = (post) => {
  const title = post?.title || 'Untitled Card';
  const category = post?.category || 'General';
  const author = post?.author || 'Editorial Team';
  const slug = post?.slug || slugify(title);

  return {
    id: post?.id || Date.now(),
    title,
    category,
    categorySlug: slugify(category),
    author,
    authorSlug: slugify(author),
    date: post?.date || '01 Jan 2020',
    comments: Number(post?.comments || 0),
    image: post?.image || FALLBACK_IMAGE,
    slug,
    layout: post?.layout || 'standard',
    status: post?.status || 'Draft',
    section: post?.section || 'latest',
    large: post?.layout === 'hero' ? true : post?.large
  };
};

export default function HomePage() {
  const searchParams = useSearchParams();
  const [imageFailures, setImageFailures] = useState({});
  const [adminPosts, setAdminPosts] = useState([]);
  const fallbackImage = FALLBACK_IMAGE;
  const getImageSrc = (post) =>
    imageFailures[post.slug] || !post.image ? fallbackImage : post.image;
  const handleImageError = (slug) =>
    setImageFailures((prev) => ({ ...prev, [slug]: true }));

  const searchQuery = (searchParams.get('q') || '').trim();
  const normalizedQuery = searchQuery.toLowerCase();

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const stored = localStorage.getItem('adminPosts');
    if (stored) {
      setAdminPosts(JSON.parse(stored));
    }
  }, []);

  const adminCards = useMemo(() => {
    return adminPosts
      .map((post) => normalizeAdminPost(post))
      .filter((post) => post.status === 'Published');
  }, [adminPosts]);

  const searchResults = useMemo(() => {
    if (!normalizedQuery) return [];
    const allStaticCards = [
      heroPost,
      ...topPosts,
      ...smallPosts,
      ...editorChoicePosts,
      ...editorChoiceBottomPosts,
      ...trendingPosts,
      ...recentPosts,
      ...newsPosts,
      ...latestPosts
    ];
    const merged = new Map();
    adminCards.forEach((post) => merged.set(post.slug, post));
    allStaticCards.forEach((post) => {
      if (!merged.has(post.slug)) {
        merged.set(post.slug, post);
      }
    });
    return Array.from(merged.values()).filter((post) => {
      const title = post.title?.toLowerCase() || '';
      const author = post.author?.toLowerCase() || '';
      return title.includes(normalizedQuery) || author.includes(normalizedQuery);
    });
  }, [normalizedQuery, adminCards]);

  const adminFeatured = useMemo(
    () => adminCards.filter((post) => post.section === 'featured'),
    [adminCards]
  );
  const adminTrending = useMemo(
    () => adminCards.filter((post) => post.section === 'trending'),
    [adminCards]
  );
  const adminEditors = useMemo(
    () => adminCards.filter((post) => post.section === 'editors-choice'),
    [adminCards]
  );
  const adminLatest = useMemo(
    () => adminCards.filter((post) => post.section === 'latest'),
    [adminCards]
  );

  const featuredHero =
    adminFeatured.find((post) => post.layout === 'hero') || null;
  const featuredStandard = adminFeatured.filter(
    (post) => post.slug !== featuredHero?.slug
  );
  const heroPostToUse = featuredHero || heroPost;
  const topPostsToUse = [...featuredStandard, ...topPosts].slice(0, 2);

  const editorChoiceCombined = [
    ...adminEditors,
    ...editorChoicePosts,
    ...editorChoiceBottomPosts
  ];
  const editorChoiceTop = editorChoiceCombined.slice(0, 2);
  const editorChoiceBottom = editorChoiceCombined.slice(2, 4);

  const trendingPostsToUse = [...adminTrending, ...trendingPosts].slice(
    0,
    trendingPosts.length
  );
  const latestPostsToUse = [...adminLatest, ...latestPosts].slice(0, 3);

  return (
    <div className="min-h-screen bg-white">
      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {normalizedQuery ? (
          <section className="mb-12">
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Search Results
              </h2>
              <p className="text-sm text-gray-500">
                Showing results for &quot;{searchQuery}&quot; ({searchResults.length})
              </p>
            </div>

            {searchResults.length === 0 ? (
              <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6 text-sm text-gray-500">
                No cards matched your search.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {searchResults.map((post) => (
                  <Link key={post.slug} href={`/blog/${post.slug}`} className="group block">
                    <div className="relative h-[250px] overflow-hidden bg-gray-900 mb-4 rounded-lg">
                      <Image
                        src={getImageSrc(post)}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        onError={() => handleImageError(post.slug)}
                        sizes="(min-width: 1024px) 320px, 100vw"
                      />
                    </div>
                    <span className="inline-block text-xs font-semibold text-red-600 uppercase tracking-wider mb-2 hover:text-red-700 transition-colors">
                      {post.category}
                    </span>
                    <h3 className="text-lg font-bold text-gray-900 mb-3 leading-tight group-hover:text-red-600 transition-colors">
                      {post.title}
                    </h3>
                    <div className="flex items-center gap-3 text-sm text-gray-500">
                      <span className="hover:text-gray-700 transition-colors">
                        By {post.author}
                      </span>
                      <span>{post.date}</span>
                      <span className="hover:text-gray-700 transition-colors">
                        {formatComments(post.comments)}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </section>
        ) : null}

        {normalizedQuery ? null : (
          <>
        
        {/* Featured Posts Section */}
        <section id="featured-blogs" className="mb-12 scroll-mt-24">
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Featured Blogs</h2>
            <p className="text-sm text-gray-500">Top highlights of the day</p>
          </div>

          {/* Hero Section with 3 Large Posts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Main Featured Post */}
          <Link href={`/blog/${heroPostToUse.slug}`} className="group block">
            <div className="relative h-[400px] overflow-hidden bg-gray-900 rounded-lg">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70 z-10" />
              <Image
                src={getImageSrc(heroPostToUse)}
                alt={heroPostToUse.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                onError={() => handleImageError(heroPostToUse.slug)}
                sizes="(min-width: 1024px) 640px, 100vw"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                <span className="inline-block text-xs font-semibold text-white bg-red-600 px-3 py-1 mb-3 uppercase tracking-wider hover:bg-red-700 transition-colors">
                  {heroPostToUse.category}
                </span>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-3 leading-tight">
                  {heroPostToUse.title}
                </h2>
                <div className="flex items-center gap-4 text-sm text-gray-300">
                  <span className="hover:text-white transition-colors">
                    By {heroPostToUse.author}
                  </span>
                  <span>{heroPostToUse.date}</span>
                  <span className="hover:text-white transition-colors">
                    {formatComments(heroPostToUse.comments)}
                  </span>
                </div>
              </div>
            </div>
          </Link>

          {/* Two Posts Column */}
          <div className="space-y-6">
            {topPostsToUse.map((post) => (
              <Link key={post.id} href={`/blog/${post.slug}`} className="group block">
                <div className="relative h-[190px] overflow-hidden bg-gray-900 rounded-lg">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70 z-10" />
                  <Image
                    src={getImageSrc(post)}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={() => handleImageError(post.slug)}
                    sizes="(min-width: 1024px) 320px, 100vw"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-5 z-20">
                    <span className="inline-block text-xs font-semibold text-white bg-red-600 px-3 py-1 mb-2 uppercase tracking-wider hover:bg-red-700 transition-colors">
                      {post.category}
                    </span>
                    <h3 className="text-xl font-bold text-white mb-2 leading-tight">
                      {post.title}
                    </h3>
                    <div className="flex items-center gap-3 text-xs text-gray-300">
                      <span className="hover:text-white transition-colors">
                        By {post.author}
                      </span>
                    <span>{post.date}</span>
                    <span className="hover:text-white transition-colors">
                      {formatComments(post.comments)}
                    </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          </div>
        </section>

        {/* Latest Posts Section - Full Width */}
        <section id="latest-blogs" className="mb-12 scroll-mt-24">
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Latest Blogs</h2>
            <p className="text-sm text-gray-500">Featured News</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {latestPostsToUse.map((post) => (
              <Link key={post.id} href={`/blog/${post.slug}`} className="group block">
                <div className="relative h-[250px] overflow-hidden bg-gray-900 mb-4 rounded-lg">
                  <Image
                    src={getImageSrc(post)}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={() => handleImageError(post.slug)}
                    sizes="(min-width: 1024px) 320px, 100vw"
                  />
                </div>
                <span className="inline-block text-xs font-semibold text-red-600 uppercase tracking-wider mb-2 hover:text-red-700 transition-colors">
                  {post.category}
                </span>
                <h3 className="text-lg font-bold text-gray-900 mb-3 leading-tight group-hover:text-red-600 transition-colors">
                  {post.title}
                </h3>
                <div className="flex items-center gap-3 text-sm text-gray-500">
                  <span className="hover:text-gray-700 transition-colors">
                    By {post.author}
                  </span>
                  <span>{post.date}</span>
                  <span className="hover:text-gray-700 transition-colors">
                    {formatComments(post.comments)}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Four Small Posts Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {smallPosts.map((post) => (
            <Link key={post.id} href={`/blog/${post.slug}`} className="group block">
              <div className="relative h-[200px] overflow-hidden bg-gray-900 mb-3 rounded-lg">
                <Image
                  src={getImageSrc(post)}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={() => handleImageError(post.slug)}
                  sizes="(min-width: 1024px) 240px, 50vw"
                />
              </div>
              <span className="inline-block text-xs font-semibold text-red-600 uppercase tracking-wider mb-2 hover:text-red-700 transition-colors">
                {post.category}
              </span>
              <h4 className="text-sm font-bold text-gray-900 leading-tight group-hover:text-red-600 transition-colors">
                {post.title}
              </h4>
            </Link>
          ))}
        </div>

        {/* Main Content Area with Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content - 2 columns */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* Editor's Choice Section */}
            <section>
              <div className="mb-6">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Editor&apos;s Choice</h2>
                <p className="text-sm text-gray-500">Articles of the Day</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {editorChoiceTop.map((post) => (
                  <Link key={post.id} href={`/blog/${post.slug}`} className="group block">
                    <div className="relative h-[280px] overflow-hidden bg-gray-900 mb-4 rounded-lg">
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 z-10" />
                      <Image
                        src={getImageSrc(post)}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        onError={() => handleImageError(post.slug)}
                        sizes="(min-width: 1024px) 448px, 100vw"
                      />
                    </div>
                    <span className="inline-block text-xs font-semibold text-red-600 uppercase tracking-wider mb-2 hover:text-red-700 transition-colors">
                      {post.category}
                    </span>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight group-hover:text-red-600 transition-colors">
                      {post.title}
                    </h3>
                    <div className="flex items-center gap-3 text-sm text-gray-500">
                      <span>{post.date}</span>
                      <span className="hover:text-gray-700 transition-colors">
                        {formatComments(post.comments)}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {editorChoiceBottom.map((post) => (
                  <Link key={post.id} href={`/blog/${post.slug}`} className="group block">
                    <div className="relative h-[280px] overflow-hidden bg-gray-900 mb-4 rounded-lg">
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 z-10" />
                      <Image
                        src={getImageSrc(post)}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        onError={() => handleImageError(post.slug)}
                        sizes="(min-width: 1024px) 448px, 100vw"
                      />
                      {post.sponsored && (
                        <div className="absolute top-4 left-4 bg-yellow-400 text-gray-900 text-xs font-bold px-3 py-1 z-20 rounded">
                          Sponsored content
                        </div>
                      )}
                    </div>
                    <span className="inline-block text-xs font-semibold text-red-600 uppercase tracking-wider mb-2 hover:text-red-700 transition-colors">
                      {post.category}
                    </span>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight group-hover:text-red-600 transition-colors">
                      {post.title}
                    </h3>
                    <div className="flex items-center gap-3 text-sm text-gray-500">
                      <span>{post.date}</span>
                      <span className="hover:text-gray-700 transition-colors">
                        {formatComments(post.comments)}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </section>

            {/* Trending Posts Section */}
            <section id="trending-blogs" className="scroll-mt-24">
              <div className="mb-6">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Trending Blogs</h2>
                <p className="text-sm text-gray-500">Featured Articles</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {trendingPostsToUse.map((post) => (
                  <Link 
                    key={post.id} 
                    href={`/blog/${post.slug}`} 
                    className={`group block ${post.large ? 'md:col-span-2' : ''}`}
                  >
                    <div className={`relative ${post.large ? 'h-[400px]' : 'h-[280px]'} overflow-hidden bg-gray-900 mb-4 rounded-lg`}>
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 z-10" />
                      <Image
                        src={getImageSrc(post)}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        onError={() => handleImageError(post.slug)}
                        sizes={post.large ? "(min-width: 1024px) 896px, 100vw" : "(min-width: 1024px) 448px, 100vw"}
                      />
                      {post.large && (
                        <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                          <span className="inline-block text-xs font-semibold text-white bg-red-600 px-3 py-1 mb-3 uppercase tracking-wider hover:bg-red-700 transition-colors">
                            {post.category}
                          </span>
                          <h3 className="text-3xl font-bold text-white mb-3 leading-tight">
                            {post.title}
                          </h3>
                          <div className="flex items-center gap-4 text-sm text-gray-300">
                            <span className="hover:text-white transition-colors">
                              By {post.author}
                            </span>
                            <span>{post.date}</span>
                            <span className="hover:text-white transition-colors">
                              {formatComments(post.comments)}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                    {!post.large && (
                      <>
                        <span className="inline-block text-xs font-semibold text-red-600 uppercase tracking-wider mb-2 hover:text-red-700 transition-colors">
                          {post.category}
                        </span>
                        <h3 className="text-lg font-bold text-gray-900 mb-3 leading-tight group-hover:text-red-600 transition-colors">
                          {post.title}
                        </h3>
                        <div className="flex items-center gap-3 text-sm text-gray-500">
                          <span className="hover:text-gray-700 transition-colors">
                            By {post.author}
                          </span>
                          <span>{post.date}</span>
                          <span className="hover:text-gray-700 transition-colors">
                            {formatComments(post.comments)}
                          </span>
                        </div>
                      </>
                    )}
                  </Link>
                ))}
              </div>

            </section>

          </div>

          {/* Sidebar - 1 column */}
          <aside className="space-y-8">
            
            {/* Follow Us Widget */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Follow us</h3>
              <div className="space-y-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    className="flex items-center justify-between p-3 bg-white border border-gray-200 text-gray-900 hover:border-red-600 hover:text-red-600 transition-colors group rounded"
                  >
                    <span className="font-semibold">{social.name}</span>
                    <span className="text-gray-600 group-hover:text-red-600">{social.count}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Recent Posts Widget */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Recent blogs</h3>
              <div className="space-y-5">
                {recentPosts.map((post) => (
                  <Link key={post.id} href={`/blog/${post.slug}`} className="group flex gap-4">
                    <div className="relative w-20 h-20 flex-shrink-0 overflow-hidden bg-gray-900 rounded">
                      <Image
                        src={getImageSrc(post)}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        onError={() => handleImageError(post.slug)}
                        sizes="80px"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-bold text-gray-900 mb-2 leading-tight group-hover:text-red-600 transition-colors">
                        {post.title}
                      </h4>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <span>{post.date}</span>
                        <span className="hover:text-gray-700 transition-colors">
                          {formatComments(post.comments)}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* News Posts Widget */}
            <div>
              <div className="space-y-6">
                {newsPosts.map((post) => (
                  <Link key={post.id} href={`/blog/${post.slug}`} className="group block">
                    <div className="relative h-[200px] overflow-hidden bg-gray-900 mb-3 rounded-lg">
                      <Image
                        src={getImageSrc(post)}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        onError={() => handleImageError(post.slug)}
                        sizes="(min-width: 1024px) 320px, 100vw"
                      />
                    </div>
                    <span className="inline-block text-xs font-semibold text-red-600 uppercase tracking-wider mb-2 hover:text-red-700 transition-colors">
                      {post.category}
                    </span>
                    <h4 className="text-lg font-bold text-gray-900 mb-2 leading-tight group-hover:text-red-600 transition-colors">
                      {post.title}
                    </h4>
                    <div className="flex items-center gap-3 text-sm text-gray-500">
                      <span className="hover:text-gray-700 transition-colors">
                        By {post.author}
                      </span>
                      <span>{post.date}</span>
                      <span className="hover:text-gray-700 transition-colors">
                        {formatComments(post.comments)}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

          </aside>
        </div>

        {/* Newsletter Section */}
        <section className="mt-12 bg-gray-900 text-white p-8 text-center rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Get the best blog stories into your inbox!</h2>
          <form className="max-w-md mx-auto flex gap-2">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-600 rounded"
            />
            <button
              type="submit"
              className="bg-red-600 text-white px-6 py-3 font-semibold uppercase tracking-wider hover:bg-red-700 transition-colors rounded"
            >
              Subscribe
            </button>
          </form>
        </section>

          </>
        )}

      </div>
    </div>
  );
}

