'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { getPostBySlug, getRelatedPosts } from '../../../data/posts';

const VIEW_STORAGE_KEY = 'adminViews';
const VIEW_RETENTION_MS = 30 * 24 * 60 * 60 * 1000;

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

    const now = Date.now();
    const raw = localStorage.getItem(VIEW_STORAGE_KEY);
    const entries = raw ? JSON.parse(raw) : [];
    const pruned = entries.filter((entry) => entry?.at >= now - VIEW_RETENTION_MS);
    pruned.push({ slug, at: now });
    localStorage.setItem(VIEW_STORAGE_KEY, JSON.stringify(pruned));
    viewLoggedRef.current = slug;
  }, [post, slug]);

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
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
          {post.title}
        </h1>

        {/* Post Meta */}
        <div className="flex items-center gap-6 mb-8 pb-8 border-b border-gray-200">
          <Link href={`/author/${post.authorSlug}`} className="flex items-center gap-3 group">
            <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gray-200">
              <Image
                src={authorImageSrc}
                alt={post.author}
                fill
                className="object-cover"
                onError={() => setAuthorImageFailed(true)}
                sizes="48px"
              />
            </div>
            <div>
              <div className="text-sm font-semibold text-gray-900 group-hover:text-red-600 transition-colors">
                {post.author}
              </div>
              <div className="text-xs text-gray-500">Author</div>
            </div>
          </Link>
          
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
              </svg>
              <span>{post.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
              </svg>
              <span>{post.comments} Comments</span>
            </div>
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
            <Link
              key={tag}
              href={`/tag/${tag.toLowerCase().replace(/\s+/g, '-')}`}
              className="text-sm bg-gray-100 text-gray-700 px-3 py-1 hover:bg-red-600 hover:text-white transition-colors"
            >
              {tag}
            </Link>
          ))}
        </div>

        {/* Author Bio */}
        <div className="bg-gray-50 p-8 mb-12">
          <div className="flex gap-6">
            <div className="relative w-24 h-24 flex-shrink-0 rounded-full overflow-hidden bg-gray-200">
              <Image
                src={authorImageSrc}
                alt={post.author}
                fill
                className="object-cover"
                onError={() => setAuthorImageFailed(true)}
                sizes="96px"
              />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                <Link href={`/author/${post.authorSlug}`} className="hover:text-red-600 transition-colors">
                  {post.author}
                </Link>
              </h3>
              <p className="text-gray-600 mb-4">
                A passionate writer and NFT enthusiast who explores the intersection of art, technology, and digital ownership. 
                With years of experience in the creative industry, Sandra brings unique insights to the world of NFTs.
              </p>
              <div className="flex gap-3">
                <a href="#" className="text-gray-500 hover:text-red-600 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-500 hover:text-red-600 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-500 hover:text-red-600 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
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

        {/* Comments Section */}
        <section id="comments" className="mt-12 pt-12 border-t border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {post.comments} {post.comments === 1 ? 'Comment' : 'Comments'}
          </h2>
          
          {post.comments === 0 ? (
            <p className="text-gray-500 mb-8">Be the first to comment on this post.</p>
          ) : (
            <div className="space-y-6 mb-8">
              {/* Comment items would go here */}
            </div>
          )}

          {/* Comment Form */}
          <div className="bg-gray-50 p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Leave a Comment</h3>
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Your Name *"
                  className="px-4 py-3 border border-gray-300 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-red-600"
                  required
                />
                <input
                  type="email"
                  placeholder="Your Email *"
                  className="px-4 py-3 border border-gray-300 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-red-600"
                  required
                />
              </div>
              <textarea
                rows={6}
                placeholder="Your Comment *"
                className="w-full px-4 py-3 border border-gray-300 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-red-600"
                required
              />
              <button
                type="submit"
                className="bg-gray-900 text-white px-8 py-3 font-semibold uppercase tracking-wider hover:bg-red-600 transition-colors"
              >
                Post Comment
              </button>
            </form>
          </div>
        </section>

      </div>
    </div>
  );
}
