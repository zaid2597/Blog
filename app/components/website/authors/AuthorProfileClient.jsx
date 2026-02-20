"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { authors as staticAuthors, allPosts as staticPosts } from "../../../data/posts";
import {
  mergeAuthors,
  normalizeAdminPost,
  slugify,
  FALLBACK_AVATAR
} from "./authorUtils";

const AUTHORS_STORAGE_KEY = "adminAuthors";
const POSTS_STORAGE_KEY = "adminPosts";

const safeParse = (value, fallback) => {
  if (!value) return fallback;
  try {
    const parsed = JSON.parse(value);
    return parsed ?? fallback;
  } catch (error) {
    return fallback;
  }
};

const buildCombinedPosts = (adminPostsRaw) => {
  const adminPosts = Array.isArray(adminPostsRaw)
    ? adminPostsRaw
        .filter((post) => post?.status === "Published" || !post?.status)
        .map((post) => normalizeAdminPost(post))
    : [];
  return [...adminPosts, ...staticPosts];
};

export default function AuthorProfileClient({ slug }) {
  const [authors, setAuthors] = useState(() => mergeAuthors(staticAuthors, []));
  const [allPosts, setAllPosts] = useState(() => staticPosts);
  const [isReady, setIsReady] = useState(false);
  const router = useRouter();
  const params = useParams();
  const routeSlug = typeof params?.slug === "string" ? params.slug : "";
  const activeSlug = routeSlug || slug || "";

  useEffect(() => {
    if (typeof window === "undefined") return;
    const syncFromStorage = () => {
      const storedAuthors = localStorage.getItem(AUTHORS_STORAGE_KEY);
      const storedPosts = localStorage.getItem(POSTS_STORAGE_KEY);

      const adminAuthors = safeParse(storedAuthors, []);
      const adminPostsRaw = safeParse(storedPosts, []);

      setAuthors(mergeAuthors(staticAuthors, adminAuthors));
      setAllPosts(buildCombinedPosts(adminPostsRaw));
      setIsReady(true);
    };

    syncFromStorage();

    const handleStorage = (event) => {
      if (
        event.key === AUTHORS_STORAGE_KEY ||
        event.key === POSTS_STORAGE_KEY
      ) {
        syncFromStorage();
      }
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const author = useMemo(() => {
    const normalized = slugify(activeSlug);
    return (
      authors.find((item) => item.slug === normalized) ||
      authors.find((item) => slugify(item.name) === normalized) ||
      authors.find((item) => slugify(item.id) === normalized) ||
      null
    );
  }, [authors, activeSlug]);

  const posts = useMemo(() => {
    if (!author) return [];
    return allPosts.filter(
      (post) => slugify(post.authorSlug || post.author) === author.slug
    );
  }, [allPosts, author]);

  useEffect(() => {
    if (isReady && !author) {
      router.replace("/authors");
    }
  }, [author, isReady, router]);

  if (!isReady) {
    return (
      <main className="min-h-screen bg-[#f8f4ee] text-black">
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="rounded-3xl border border-black/10 bg-white p-8">
            <p className="text-xs uppercase tracking-[0.3em] text-black/50">
              Loading profile
            </p>
            <div className="mt-4 h-6 w-2/3 rounded bg-[#f0ebe3]" />
            <div className="mt-3 h-4 w-1/2 rounded bg-[#f0ebe3]" />
          </div>
        </section>
      </main>
    );
  }

  if (!author) {
    return null;
  }

  return (
    <main className="min-h-screen bg-[#f8f4ee] text-black">
      <section className="relative overflow-hidden border-b border-black/10">
        <div className="pointer-events-none absolute -top-24 -right-16 h-72 w-72 rounded-full bg-[#d7bfa8]/60 blur-3xl animate-[floatSlow_12s_ease-in-out_infinite]" />
        <div className="pointer-events-none absolute -bottom-28 -left-20 h-80 w-80 rounded-full bg-[#b8c8b9]/60 blur-3xl animate-[floatMedium_10s_ease-in-out_infinite]" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <div className="flex flex-col lg:flex-row lg:items-center gap-8">
            <div className="relative h-32 w-32 md:h-40 md:w-40 overflow-hidden rounded-full border border-black/10 bg-white">
              <Image
                src={author.image || FALLBACK_AVATAR}
                alt={author.name}
                fill
                className="object-cover"
                sizes="160px"
              />
            </div>
            <div className="space-y-4">
              <p className="text-xs uppercase tracking-[0.45em] text-black/60">
                Author Profile
              </p>
              <h1 className="text-4xl md:text-5xl font-black tracking-tight">
                {author.name}
              </h1>
              <p className="text-sm uppercase tracking-[0.24em] text-black/50">
                {author.role}
              </p>
              <p className="text-lg text-black/70 max-w-2xl">{author.bio}</p>
              <div className="flex flex-wrap gap-3">
                <span className="rounded-full border border-black/10 bg-white/80 px-3 py-1 text-xs uppercase tracking-[0.24em] text-black/60">
                  {posts.length} Blogs
                </span>
                <span className="rounded-full border border-black/10 bg-white/80 px-3 py-1 text-xs uppercase tracking-[0.24em] text-black/60">
                  Eldecora Studio
                </span>
              </div>
            </div>
            <div className="lg:ml-auto">
              <Link
                href="/authors"
                className="inline-flex items-center justify-center rounded-full border border-black px-5 py-2 text-xs font-semibold uppercase tracking-[0.3em] transition hover:bg-black hover:text-white"
              >
                Back to Authors
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-black tracking-tight">Latest Blogs</h2>
            <p className="text-sm text-black/60">
              Stories and styling guidance by {author.name}.
            </p>
          </div>
          <Link
            href="/blog"
            className="text-xs uppercase tracking-[0.3em] text-black/60 hover:text-black"
          >
            View all blogs
          </Link>
        </div>

        {posts.length === 0 ? (
          <div className="rounded-3xl border border-black/10 bg-white p-8 text-sm text-black/60">
            No blogs yet from this author.
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group rounded-3xl border border-black/10 bg-white p-4 shadow-[0_30px_80px_-60px_rgba(0,0,0,0.6)] transition-transform duration-500 hover:-translate-y-2"
              >
                <div className="relative h-44 overflow-hidden rounded-2xl bg-[#f8f4ee]">
                  <Image
                    src={post.image || FALLBACK_AVATAR}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(min-width: 1024px) 320px, 100vw"
                  />
                </div>
                <div className="mt-4 space-y-2">
                  <p className="text-xs uppercase tracking-[0.24em] text-black/50">
                    {post.category}
                  </p>
                  <h3 className="text-lg font-semibold text-black leading-snug group-hover:text-black/70 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-xs text-black/60">{post.date}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
