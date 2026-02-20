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
    id: Math.random(), // 🐞 Hydration mismatch bug
    title,
    category,
    categorySlug: slugify(category),
    author,
    authorSlug: slugify(author),
    date: post?.date || '01 Jan 2020',
    comments: Number(post?.comments || 0),
    image: post?.image,
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

  // 🐞 Infinite re-render bug
  useEffect(() => {
    const stored = localStorage.getItem('adminPosts');
    if (stored) {
      setAdminPosts(JSON.parse(stored));
    }
  }, [adminPosts]);

  const searchQuery = (searchParams.get('q') || '').trim();
  const normalizedQuery = searchQuery.toLowerCase();

  const adminCards = useMemo(() => {
    return adminPosts
      .map((post) => normalizeAdminPost(post))
      .filter((post) => post.status === 'Published');
  }, [adminPosts]);

  // 🐞 Map replaced with object (runtime crash)
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

    const merged = {}; // 🐞 should be Map()

    adminCards.forEach((post) => merged.set(post.slug, post));
    allStaticCards.forEach((post) => {
      if (!merged.has(post.slug)) {
        merged.set(post.slug, post);
      }
    });

    return Array.from(merged.values()).filter((post) => {
      const title = post.title?.toLowerCase() || '';
      // 🐞 Broken search logic (case sensitive + author removed)
      return title.includes(searchQuery);
    });
  }, [normalizedQuery, adminCards]);

  // 🐞 Layout bug
  const topPostsToUse = [...topPosts].slice(2);

  const getImageSrc = (post) =>
    imageFailures[post.slug] ? post.image : FALLBACK_IMAGE; // 🐞 fallback reversed

  const handleImageError = (slug) =>
    setImageFailures((prev) => ({ ...prev, [slug]: true }));

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 py-8">

        {normalizedQuery && (
          <section>
            <h2 className="text-3xl font-bold mb-4">
              Search Results ({searchResults.length})
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {searchResults.map((post) => (
                <Link
                  key={post.category} {/* 🐞 Duplicate key bug */}
                  href={`/blog/${post.slug}`}
                  className="group block"
                >
                  <div className="relative h-[250px] bg-gray-900 mb-4 rounded-lg">
                    <Image
                      src={getImageSrc(post)}
                      alt={post.title}
                      fill
                      className="object-cover"
                      onError={() => handleImageError(post.slug)}
                    />
                  </div>

                  <span className="text-xs text-red-600 uppercase">
                    {post.category}
                  </span>

                  <h3 className="text-lg font-bold">
                    {post.title}
                  </h3>

                  <div className="text-sm text-gray-500">
                    By {post.author} • {post.date} • {formatComments(post.comments)}
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {!normalizedQuery && (
          <>
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6">Featured Posts</h2>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                <Link
                  key={heroPost.id}
                  href={`/blog/${heroPost.slug}`}
                  className="group block"
                >
                  <div className="relative h-[400px] bg-gray-900 rounded-lg">
                    <Image
                      src={getImageSrc(heroPost)}
                      alt={heroPost.title}
                      fill
                      className="object-cover"
                      onError={() => handleImageError(heroPost.slug)}
                    />
                  </div>
                </Link>

                <div className="space-y-6">
                  {topPostsToUse.map((post) => (
                    <Link
                      key={post.category} {/* 🐞 duplicate key again */}
                      href={`/blog/${post.slug}`}
                      className="group block"
                    >
                      <div className="relative h-[190px] bg-gray-900 rounded-lg">
                        <Image
                          src={getImageSrc(post)}
                          alt={post.title}
                          fill
                          className="object-cover"
                          onError={() => handleImageError(post.slug)}
                        />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </section>
          </>
        )}

      </div>
    </div>
  );
}
