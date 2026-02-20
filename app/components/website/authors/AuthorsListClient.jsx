"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { authors as staticAuthors, allPosts as staticPosts } from "../../../data/posts";
import { mergeAuthors, normalizeAdminPost, slugify } from "./authorUtils";

const AUTHORS_STORAGE_KEY = "adminAuthors";
const POSTS_STORAGE_KEY = "adminPosts";

const buildCounts = (posts) => {
  const counts = {};
  posts.forEach((post) => {
    const slug = post.authorSlug || slugify(post.author);
    if (!slug) return;
    counts[slug] = (counts[slug] || 0) + 1;
  });
  return counts;
};

const safeParse = (value, fallback) => {
  if (!value) return fallback;
  try {
    const parsed = JSON.parse(value);
    return parsed ?? fallback;
  } catch (error) {
    return fallback;
  }
};

export default function AuthorsListClient() {
  const [authors, setAuthors] = useState(() => mergeAuthors(staticAuthors, []));
  const [allPosts, setAllPosts] = useState(() => staticPosts);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const syncFromStorage = () => {
      const storedAuthors = localStorage.getItem(AUTHORS_STORAGE_KEY);
      const storedPosts = localStorage.getItem(POSTS_STORAGE_KEY);

      const adminAuthors = safeParse(storedAuthors, []);
      const adminPostsRaw = safeParse(storedPosts, []);
      const adminPosts = Array.isArray(adminPostsRaw)
        ? adminPostsRaw
            .filter((post) => post?.status === "Published" || !post?.status)
            .map((post) => normalizeAdminPost(post))
        : [];

      setAuthors(mergeAuthors(staticAuthors, adminAuthors));
      setAllPosts([...adminPosts, ...staticPosts]);
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

  const postCounts = useMemo(() => buildCounts(allPosts), [allPosts]);

  const authorsWithCounts = useMemo(
    () =>
      authors.map((author) => ({
        ...author,
        posts: postCounts[author.slug] || 0
      })),
    [authors, postCounts]
  );

  return (
    <main className="min-h-screen bg-[#f8f4ee] text-black">
      <section className="relative overflow-hidden border-b border-black/10">
        <div className="pointer-events-none absolute -top-24 -right-16 h-72 w-72 rounded-full bg-[#d7bfa8]/60 blur-3xl animate-[floatSlow_12s_ease-in-out_infinite]" />
        <div className="pointer-events-none absolute -bottom-28 -left-20 h-80 w-80 rounded-full bg-[#b8c8b9]/60 blur-3xl animate-[floatMedium_10s_ease-in-out_infinite]" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] items-center">
            <div className="space-y-6">
              <p className="text-xs uppercase tracking-[0.45em] text-black/60 animate-[fadeIn_0.8s_ease-out_forwards]">
                Our Authors
              </p>
              <h1 className="text-4xl md:text-5xl font-black tracking-tight animate-[fadeUp_0.9s_ease-out_forwards]">
                The voices shaping Eldecora Studio.
              </h1>
              <p className="text-lg text-black/70 max-w-xl animate-[fadeUp_1s_ease-out_forwards]">
                Our team blends modern aesthetics with timeless elegance to
                bring calm, refined living into every space.
              </p>
            </div>

            <div className="rounded-3xl border border-black/10 bg-white/90 p-6 md:p-8 shadow-[0_30px_80px_-60px_rgba(0,0,0,0.6)] animate-[fadeUp_1.1s_ease-out_forwards]">
              <p className="text-xs uppercase tracking-[0.3em] text-black/50">
                Studio Snapshot
              </p>
              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                {[
                  { label: "Authors", value: `${authors.length}` },
                  { label: "Blogs", value: `${allPosts.length}` },
                  { label: "Collections", value: "12+" }
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-2xl border border-black/10 bg-[#f8f4ee] p-4 text-center"
                  >
                    <p className="text-2xl font-black">{stat.value}</p>
                    <p className="text-xs uppercase tracking-[0.2em] text-black/60">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {authorsWithCounts.map((author) => (
            <article
              key={author.slug}
              className="group rounded-3xl border border-black/10 bg-white p-6 shadow-[0_30px_80px_-60px_rgba(0,0,0,0.6)] transition-transform duration-500 hover:-translate-y-2"
            >
              <Link
                href={`/authors/${author.slug}`}
                className="flex items-center gap-4 hover:opacity-80 transition-opacity"
                aria-label={`View ${author.name} profile`}
              >
                <div className="relative h-16 w-16 overflow-hidden rounded-full border border-black/10">
                  <Image
                    src={author.image}
                    alt={author.name}
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                </div>
                <div>
                  <p className="text-lg font-semibold">{author.name}</p>
                  <p className="text-xs uppercase tracking-[0.24em] text-black/50">
                    {author.role}
                  </p>
                </div>
              </Link>

              <p className="mt-4 text-sm text-black/70">{author.bio}</p>

              <div className="mt-6 flex items-center justify-between text-xs uppercase tracking-[0.24em] text-black/60">
                <span>{author.posts} Blogs</span>
                <Link
                  href={`/authors/${author.slug}`}
                  className="group-hover:text-black transition-colors"
                >
                  View profile
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
