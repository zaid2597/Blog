export const FALLBACK_AVATAR = "/images/post-fallback.svg";
export const FALLBACK_ROLE = "Studio Contributor";
export const FALLBACK_BIO =
  "Eldecora Studio contributor focused on timeless, modern decor.";

export const slugify = (value) =>
  String(value || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

export const mergeAuthors = (staticAuthors = [], adminAuthors = []) => {
  const bySlug = new Map();
  const staticBySlug = new Map();
  const staticByName = new Map();

  staticAuthors.forEach((author) => {
    if (!author?.name) return;
    const slug = author.slug || slugify(author.name);
    staticBySlug.set(slug, author);
    staticByName.set(author.name.toLowerCase(), author);
  });

  const normalize = (author) => {
    const name = String(author?.name || "").trim();
    if (!name) return null;
    const slug = slugify(author?.slug || name || author?.id);
    const match =
      staticBySlug.get(slug) || staticByName.get(name.toLowerCase());

    return {
      name,
      slug,
      id: author?.id || match?.id,
      image: author?.image || author?.imageUrl || match?.image || FALLBACK_AVATAR,
      role: author?.role || author?.title || match?.role || FALLBACK_ROLE,
      bio:
        author?.bio ||
        author?.description ||
        match?.bio ||
        FALLBACK_BIO
    };
  };

  if (Array.isArray(adminAuthors) && adminAuthors.length > 0) {
    adminAuthors.forEach((author) => {
      const normalized = normalize(author);
      if (!normalized) return;
      if (!bySlug.has(normalized.slug)) {
        bySlug.set(normalized.slug, normalized);
      }
    });
  }

  staticAuthors.forEach((author) => {
    const normalized = normalize(author);
    if (!normalized) return;
    if (!bySlug.has(normalized.slug)) {
      bySlug.set(normalized.slug, normalized);
    }
  });

  return Array.from(bySlug.values());
};

export const normalizeAdminPost = (post) => {
  const title = post?.title || "Untitled";
  const author = post?.author || "Editorial Team";
  const category = post?.category || "General";
  const image = post?.image || post?.imageUrl || FALLBACK_AVATAR;
  const date = post?.date || post?.publishDate || "01 Jan 2020";
  const slug = post?.slug || slugify(title);

  return {
    ...post,
    title,
    author,
    authorSlug: post?.authorSlug || slugify(author),
    category,
    image,
    date,
    slug
  };
};
