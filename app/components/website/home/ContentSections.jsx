'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { getPostBySlug, getRelatedPosts } from '../../../data/posts';

const VIEW_STORAGE_KEY = 'adminViews';
const VIEW_RETENTION_MS = 30 * 24 * 60 * 60 * 1000;
const VIEW_COUNT_KEY = 'viewCounts';

const slugify = (value) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

const buildAdminContent = ({ title, description, excerpt, author, category }) => `
  <p>${description || title} explores the latest ideas in ${category}.</p>
  ${excerpt ? `<blockquote>${excerpt}</blockquote>` : ''}
  <p>Written by ${author}, this story was created from the admin dashboard.</p>
`;

const normalizeAdminPost = (post) => {
  const title = post?.title || 'Untitled Card';
  const category = post?.category || 'General';
  const author = post?.author || 'Editorial Team';
  const rawTags = Array.isArray(post?.tags)
    ? post.tags
    : (post?.tags || '').split(',').map((tag) => tag.trim()).filter(Boolean);

  return {
    ...post,
    title,
    category,
    categorySlug: post?.categorySlug || slugify(category),
    author,
    authorSlug: post?.authorSlug || slugify(author),
    authorImage: post?.authorImage,
    date: post?.date || '01 Jan 2020',
    comments: Number(post?.comments || 0),
    tags: rawTags.length > 0 ? rawTags : ['Design', 'Technology'],
    content:
      post?.content ||
      buildAdminContent({
        title,
        description: post?.description,
        excerpt: post?.excerpt,
        author,
        category
      })
  };
};

export default function BlogPost() {
  const params = useParams();
  const slug = params?.slug;
  const viewLoggedRef = useRef(null);
  const [heroImageFailed, setHeroImageFailed] = useState(false);
  const [authorImageFailed, setAuthorImageFailed] = useState(false);
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [isResolving, setIsResolving] = useState(true);
  const [reviews, setReviews] = useState([]);
  const [viewCount, setViewCount] = useState(0);
  const [reviewForm, setReviewForm] = useState({
    name: '',
    email: '',
    message: '',
    rating: 0
  });
  const [reviewError, setReviewError] = useState('');
  const fallbackImage = '/images/post-fallback.svg';
  const authorFallbackImage =
    'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=200&h=200&fit=crop&q=80';

  useEffect(() => {
    setIsResolving(true);
    const staticPost = getPostBySlug(slug);
    if (staticPost) {
      setPost(staticPost);
      setRelatedPosts(getRelatedPosts(staticPost));
      setIsResolving(false);
      return;
    }

    if (typeof window !== 'undefined' && slug) {
      const stored = JSON.parse(localStorage.getItem('adminPosts') || '[]');
      const match = stored.find((item) => item.slug === slug);
      if (match) {
        const normalized = normalizeAdminPost(match);
        setPost(normalized);
        setRelatedPosts(getRelatedPosts(normalized));
        setIsResolving(false);
        return;
      }
    }

    setPost(null);
    setRelatedPosts([]);
    setIsResolving(false);
  }, [slug]);

  useEffect(() => {
    if (!post || !slug || typeof window === 'undefined') return;
    if (viewLoggedRef.current === slug) return;

    try {
      const now = Date.now();
      const raw = localStorage.getItem(VIEW_STORAGE_KEY);
      const entries = raw ? JSON.parse(raw) : [];
      const pruned = entries.filter((entry) => entry?.at >= now - VIEW_RETENTION_MS);
      pruned.push({ slug, at: now });
      localStorage.setItem(VIEW_STORAGE_KEY, JSON.stringify(pruned));

      const countRaw = localStorage.getItem(VIEW_COUNT_KEY);
      const counts = countRaw ? JSON.parse(countRaw) : {};
      const nextCount = Number(counts[slug] || 0) + 1;
      counts[slug] = nextCount;
      localStorage.setItem(VIEW_COUNT_KEY, JSON.stringify(counts));
      setViewCount(nextCount);
    } catch (error) {
      setViewCount((prev) => prev || 0);
    }
    viewLoggedRef.current = slug;
  }, [post, slug]);

  useEffect(() => {
    if (!slug || typeof window === 'undefined') return;
    try {
      const raw = localStorage.getItem(VIEW_COUNT_KEY);
      const counts = raw ? JSON.parse(raw) : {};
      setViewCount(Number(counts[slug] || 0));
    } catch (error) {
      setViewCount(0);
    }
  }, [slug]);

  useEffect(() => {
    if (!slug || typeof window === 'undefined') return;
    const raw = localStorage.getItem(`reviews:${slug}`);
    if (!raw) {
      setReviews([]);
      return;
    }
    try {
      const parsed = JSON.parse(raw);
      setReviews(Array.isArray(parsed) ? parsed : []);
    } catch (error) {
      setReviews([]);
    }
  }, [slug]);

  const heroImageSrc = heroImageFailed || !post?.image ? fallbackImage : post.image;
  const authorImageSrc =
    authorImageFailed || !post?.authorImage ? authorFallbackImage : post.authorImage;

  if (isResolving) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <p className="text-gray-500">Loading post...</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Post not found
          </h1>
          <p className="text-gray-500 mb-8">
            The article you are looking for does not exist or was moved.
          </p>
          <Link
            href="/"
            className="inline-block bg-gray-900 text-white px-6 py-3 font-semibold uppercase tracking-wider hover:bg-red-600 transition-colors rounded"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm text-gray-500">
          <Link href="/" className="hover:text-red-600 transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <Link href={`/category/${post.categorySlug}`} className="hover:text-red-600 transition-colors">{post.category}</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900">{post.title}</span>
        </nav>

        {/* Category Badge */}
        <Link 
          href={`/category/${post.categorySlug}`}
          className="inline-block text-xs font-semibold text-white bg-red-600 px-3 py-1 mb-4 uppercase tracking-wider hover:bg-red-700 transition-colors"
        >
          {post.category}
        </Link>

        {/* Post Title */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
            {post.title}
          </h1>
          <div className="inline-flex items-center gap-2 text-sm text-gray-500 md:mt-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 3c-4.5 0-8.1 2.9-9.5 7 1.4 4.1 5 7 9.5 7s8.1-2.9 9.5-7c-1.4-4.1-5-7-9.5-7zm0 11a4 4 0 110-8 4 4 0 010 8z" />
              <circle cx="10" cy="10" r="2.2" />
            </svg>
            <span>{viewCount} Views</span>
          </div>
        </div>

        {/* Featured Image */}
        <div className="relative h-[500px] mb-12 overflow-hidden bg-gray-900">
          <Image
            src={heroImageSrc}
            alt={post.title}
            fill
            className="object-cover"
            onError={() => setHeroImageFailed(true)}
            sizes="(min-width: 1024px) 896px, 100vw"
          />
        </div>

        {/* Post Content */}
        <article 
          className="prose prose-lg max-w-none mb-12 text-gray-800 prose-headings:text-gray-900 prose-p:text-gray-700 prose-li:text-gray-700 prose-strong:text-gray-900 prose-blockquote:text-gray-700"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-12 pb-12 border-b border-gray-200">
          <span className="text-sm font-semibold text-gray-700">Tags:</span>
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="text-sm bg-gray-100 text-gray-700 px-3 py-1"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Related Posts */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Posts</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedPosts.map((relPost) => (
              <Link key={relPost.id} href={`/blog/${relPost.slug}`} className="group">
                <div className="relative h-[200px] overflow-hidden bg-gray-900 mb-3">
                  <Image
                    src={relPost.image}
                    alt={relPost.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <span className="inline-block text-xs font-semibold text-red-600 uppercase tracking-wider mb-2">
                  {relPost.category}
                </span>
                <h3 className="text-base font-bold text-gray-900 leading-tight group-hover:text-red-600 transition-colors">
                  {relPost.title}
                </h3>
              </Link>
            ))}
          </div>
        </section>

        {/* Reviews Section */}
        <section id="reviews" className="mt-12 pt-12 border-t border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {reviews.length} {reviews.length === 1 ? 'Review' : 'Reviews'}
          </h2>
          
          {reviews.length === 0 ? (
            <p className="text-gray-500 mb-8">Be the first to review this post.</p>
          ) : (
            <div className="space-y-4 mb-8">
              {reviews.map((review) => (
                <div
                  key={review.id}
                  className="rounded-lg border border-gray-200 bg-white p-4"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="text-sm font-semibold text-gray-900">
                      {review.name}
                    </p>
                    <p className="text-xs text-gray-500">{review.date}</p>
                  </div>
                  {typeof review.rating === 'number' && review.rating > 0 ? (
                    <div className="mt-2 flex items-center gap-1 text-red-600">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <span
                          key={`review-star-${review.id}-${index}`}
                          className={index < review.rating ? '' : 'text-gray-300'}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                  ) : null}
                  <p className="mt-2 text-sm text-gray-700">{review.message}</p>
                </div>
              ))}
            </div>
          )}

          {/* Review Form */}
          <div className="bg-gray-50 p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Leave a Review</h3>
            <form
              className="space-y-4"
              onSubmit={(event) => {
                event.preventDefault();
                setReviewError('');
                if (
                  !reviewForm.name.trim() ||
                  !reviewForm.message.trim() ||
                  reviewForm.rating < 1
                ) {
                  setReviewError('Please add your name, rating, and review.');
                  return;
                }
                const newReview = {
                  id: Date.now(),
                  name: reviewForm.name.trim(),
                  email: reviewForm.email.trim(),
                  message: reviewForm.message.trim(),
                  rating: reviewForm.rating,
                  date: new Date().toLocaleDateString('en-US', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric'
                  })
                };
                const updated = [newReview, ...reviews];
                setReviews(updated);
                if (typeof window !== 'undefined') {
                  localStorage.setItem(`reviews:${slug}`, JSON.stringify(updated));
                }
                setReviewForm({ name: '', email: '', message: '', rating: 0 });
              }}
            >
              <div>
                <p className="text-sm font-semibold text-gray-900 mb-2">
                  Rating *
                </p>
                <div className="flex items-center gap-2">
                  {Array.from({ length: 5 }).map((_, index) => {
                    const value = index + 1;
                    return (
                      <button
                        type="button"
                        key={`rating-${value}`}
                        onClick={() =>
                          setReviewForm((prev) => ({ ...prev, rating: value }))
                        }
                        className={`text-2xl transition-colors ${
                          value <= reviewForm.rating ? 'text-red-600' : 'text-gray-300'
                        }`}
                        aria-label={`${value} star rating`}
                      >
                        ★
                      </button>
                    );
                  })}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Your Name *"
                  value={reviewForm.name}
                  onChange={(event) =>
                    setReviewForm((prev) => ({ ...prev, name: event.target.value }))
                  }
                  className="px-4 py-3 border border-gray-300 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-red-600"
                  required
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  value={reviewForm.email}
                  onChange={(event) =>
                    setReviewForm((prev) => ({ ...prev, email: event.target.value }))
                  }
                  className="px-4 py-3 border border-gray-300 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-red-600"
                />
              </div>
              <textarea
                rows={6}
                placeholder="Your Review *"
                value={reviewForm.message}
                onChange={(event) =>
                  setReviewForm((prev) => ({ ...prev, message: event.target.value }))
                }
                className="w-full px-4 py-3 border border-gray-300 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-red-600"
                required
              />
              {reviewError ? (
                <p className="text-sm text-red-600">{reviewError}</p>
              ) : null}
              <button
                type="submit"
                className="bg-gray-900 text-white px-8 py-3 font-semibold uppercase tracking-wider hover:bg-red-600 transition-colors"
              >
                Post Review
              </button>
            </form>
          </div>
        </section>

      </div>
    </div>
  );
}
