const defaultAuthor = {
  name: "Ayesha Ali",
  slug: "ayesha-ali",
  image: "https://source.unsplash.com/200x200/?portrait,woman"
};

const authorProfiles = {
  "Ayesha Ali": {
    slug: "ayesha-ali",
    image: "https://source.unsplash.com/200x200/?portrait,woman"
  },
  "Sandra Jones": {
    slug: "sandra-jones",
    image: "https://source.unsplash.com/200x200/?portrait,woman"
  },
  "Kylie Jones": {
    slug: "kylie-jones",
    image: "https://source.unsplash.com/200x200/?portrait,woman"
  },
  "Diana Lewis": {
    slug: "diana-lewis",
    image: "https://source.unsplash.com/200x200/?portrait,woman"
  },
  "Umar Aziz": {
    slug: "umar-aziz",
    image: "https://source.unsplash.com/200x200/?portrait,man"
  }
};

const slugify = (value) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const buildTags = (category) => {
  const base = ["NFT", "Design", "Digital Art", "Technology"];
  if (!category) {
    return base;
  }
  if (!base.includes(category)) {
    return [category, ...base.slice(0, 3)];
  }
  return base;
};

const buildContent = ({ title, category, author }) => `
  <p>${title} is a deep dive into how ${category} stories are shaping the way we build, collect, and share digital experiences. This piece focuses on the patterns that keep audiences engaged and returning for more.</p>

  <p>We explore the latest shifts, practical workflows, and the creative choices that stand out in a fast-moving space. The goal is to help creators and readers understand what works and why.</p>

  <h2>Inside the Craft</h2>

  <p>From concept to execution, the core ideas are consistent: clarity, consistency, and a strong point of view. These pillars show up across the best projects and inspire more confident decisions.</p>

  <blockquote>
    "Great work is built on small, repeatable choices that compound over time."
  </blockquote>

  <h3>Key Takeaways</h3>

  <ul>
    <li>Use a clear structure to guide readers through the story.</li>
    <li>Let visuals reinforce the main theme and tone.</li>
    <li>Keep the narrative focused on one strong idea.</li>
    <li>End with a specific, actionable insight.</li>
  </ul>

  <p>Written by ${author}, this article reflects on what makes a story memorable and how to apply those insights to your next project.</p>
`;

const normalizePost = (post) => {
  const category = post.category || "General";
  const authorName = post.author || defaultAuthor.name;
  const authorProfile = authorProfiles[authorName] || defaultAuthor;
  const commentValue =
    typeof post.comments === "string"
      ? parseInt(post.comments, 10)
      : post.comments;
  const comments = Number.isFinite(commentValue) ? commentValue : 0;

  return {
    ...post,
    category,
    categorySlug: post.categorySlug || slugify(category),
    author: authorName,
    authorSlug: post.authorSlug || authorProfile.slug,
    authorImage: post.authorImage || authorProfile.image,
    date: post.date || "01 Jan 2020",
    comments,
    tags: post.tags || buildTags(category),
    content: post.content || buildContent({
      title: post.title,
      category,
      author: authorName
    })
  };
};

export const heroPost = normalizePost({
  id: 1,
  title: "This Is What Design Has Come To",
  category: "Application",
  categorySlug: "application",
  author: "Sandra Jones",
  authorSlug: "sandra-jones",
  date: "20 Jan 2020",
  comments: 0,
  image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&h=800&fit=crop&q=80",
  slug: "this-is-what-design-has-come-to"
});

export const topPosts = [
  normalizePost({
    id: 2,
    title: "New Digital NFT Digest 2022",
    category: "Application",
    categorySlug: "application",
    author: "Kylie Jones",
    authorSlug: "kylie-jones",
    date: "25 Mar 2020",
    comments: 0,
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=1200&h=800&fit=crop&q=80",
    slug: "new-digital-nft-digest-2022"
  }),
  normalizePost({
    id: 3,
    title: "Must-haves in Your NFT Collection",
    category: "Application",
    categorySlug: "application",
    author: "Diana Lewis",
    authorSlug: "diana-lewis",
    date: "28 Mar 2020",
    comments: 0,
    image: "https://images.unsplash.com/photo-1620321023374-d1a68fbc720d?w=1200&h=800&fit=crop&q=80",
    slug: "must-haves-in-your-nft-collection"
  })
];

export const smallPosts = [
  normalizePost({
    id: 4,
    title: "Do You Like Your NFTs?",
    category: "People",
    categorySlug: "people",
    author: "Umar Aziz",
    date: "18 Feb 2020",
    comments: 0,
    image: "https://images.unsplash.com/photo-1634973357973-f2ed2657db3c?w=800&h=800&fit=crop&q=80",
    slug: "do-you-like-your-nfts"
  }),
  normalizePost({
    id: 5,
    title: "Realistic Robot Models",
    category: "People",
    categorySlug: "people",
    author: "Ayesha Ali",
    date: "19 Feb 2020",
    comments: 0,
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=800&fit=crop&q=80",
    slug: "realistic-robot-models"
  }),
  normalizePost({
    id: 6,
    title: "Digital Yin Yang Re-design",
    category: "People",
    categorySlug: "people",
    author: "Sandra Jones",
    date: "21 Feb 2020",
    comments: 0,
    image: "https://images.unsplash.com/photo-1618556450994-a6a128ef0d9d?w=800&h=800&fit=crop&q=80",
    slug: "digital-yin-yang-re-design"
  }),
  normalizePost({
    id: 7,
    title: "Your Friends Are Aliens",
    category: "People",
    categorySlug: "people",
    author: "Kylie Jones",
    date: "24 Feb 2020",
    comments: 0,
    image: "https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?w=800&h=800&fit=crop&q=80",
    slug: "your-friends-are-aliens"
  })
];

export const editorChoicePosts = [
  normalizePost({
    id: 8,
    title: "What Is the Mysterious Process of Creating an NFT?",
    category: "Blockchain",
    categorySlug: "blockchain",
    date: "01 Feb 2020",
    comments: 0,
    image: "https://images.unsplash.com/photo-1639762681057-408e52192e55?w=1200&h=900&fit=crop&q=80",
    slug: "what-is-the-mysterious-process"
  }),
  normalizePost({
    id: 9,
    title: "Why Do Authors Refuse to Sell NFTs?",
    category: "Blockchain",
    categorySlug: "blockchain",
    date: "25 Mar 2020",
    comments: 6,
    image: "https://images.unsplash.com/photo-1642104704074-907c0698cbd9?w=1200&h=900&fit=crop&q=80",
    slug: "why-do-authors-refuse"
  })
];

export const editorChoiceBottomPosts = [
  normalizePost({
    id: 10,
    title: "Starting an NFT Project From Scratch: Pros & Cons",
    category: "Blockchain",
    categorySlug: "blockchain",
    date: "26 Mar 2020",
    comments: 7,
    image: "https://images.unsplash.com/photo-1644361566696-3d442b5b482a?w=1200&h=900&fit=crop&q=80",
    slug: "starting-nft-project"
  }),
  normalizePost({
    id: 11,
    title: "Changing Your Design Style while Working on an Item",
    category: "Blockchain",
    categorySlug: "blockchain",
    date: "30 Mar 2020",
    comments: 2,
    image: "https://images.unsplash.com/photo-1618172193763-c511deb635ca?w=1200&h=900&fit=crop&q=80",
    slug: "changing-design-style",
    sponsored: true
  })
];

export const trendingPosts = [
  normalizePost({
    id: 12,
    title: "The Phenomenon of NFT Rates",
    category: "Featured",
    categorySlug: "featured",
    author: "Diana Lewis",
    authorSlug: "diana-lewis",
    date: "28 Mar 2020",
    comments: 0,
    image: "https://images.unsplash.com/photo-1635322966219-b75ed372eb01?w=1200&h=900&fit=crop&q=80",
    slug: "phenomenon-of-nft-rates"
  }),
  normalizePost({
    id: 13,
    title: "The Most Expensive NFT Items of All Times",
    category: "Featured",
    categorySlug: "featured",
    author: "Umar Aziz",
    authorSlug: "umar-aziz",
    date: "25 Feb 2020",
    comments: 0,
    image: "https://images.unsplash.com/photo-1622630998477-20aa696ecb05?w=1200&h=900&fit=crop&q=80",
    slug: "most-expensive-nft"
  }),
  normalizePost({
    id: 14,
    title: "Incredible NFT Collection",
    category: "Featured",
    categorySlug: "featured",
    author: "Ayesha Ali",
    authorSlug: "ayesha-ali",
    date: "22 Feb 2020",
    comments: 0,
    image: "https://images.unsplash.com/photo-1634193295627-1cdddf751ebf?w=1600&h=1000&fit=crop&q=80",
    slug: "incredible-nft-collection",
    large: true
  }),
  normalizePost({
    id: 15,
    title: "Creative Web Developers Should Explore the NFT Niche",
    category: "Featured",
    categorySlug: "featured",
    author: "Diana Lewis",
    authorSlug: "diana-lewis",
    date: "20 Feb 2020",
    comments: 0,
    image: "https://images.unsplash.com/photo-1639322537228-f710d846310a?w=1200&h=900&fit=crop&q=80",
    slug: "creative-web-developers"
  }),
  normalizePost({
    id: 16,
    title: "Trending Colors for Minting Unusual NFT Items",
    category: "Featured",
    categorySlug: "featured",
    author: "Sandra Jones",
    authorSlug: "sandra-jones",
    date: "20 Jan 2020",
    comments: 0,
    image: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=1200&h=900&fit=crop&q=80",
    slug: "trending-colors"
  })
];

export const recentPosts = [
  normalizePost({
    id: 17,
    title: "Best Cartoon - NFT Transformations",
    category: "Updates",
    categorySlug: "updates",
    author: "Ayesha Ali",
    date: "27 Jan 2020",
    comments: 0,
    image: "https://images.unsplash.com/photo-1635405074683-96d6921a2a68?w=600&h=600&fit=crop&q=80",
    slug: "best-cartoon-nft"
  }),
  normalizePost({
    id: 18,
    title: "Technology Allows Modern Authors to Go Wild",
    category: "Updates",
    categorySlug: "updates",
    author: "Umar Aziz",
    date: "22 Jan 2020",
    comments: 0,
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&h=600&fit=crop&q=80",
    slug: "technology-allows"
  }),
  normalizePost({
    id: 19,
    title: "NFTs that Bring Aesthetic Pleasure to Viewers",
    category: "Updates",
    categorySlug: "updates",
    author: "Ayesha Ali",
    date: "22 Jan 2020",
    comments: 0,
    image: "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=600&h=600&fit=crop&q=80",
    slug: "aesthetic-pleasure"
  })
];

export const newsPosts = [
  normalizePost({
    id: 20,
    title: "The Future of Digital Art",
    category: "News",
    categorySlug: "news",
    author: "Sandra Jones",
    authorSlug: "sandra-jones",
    date: "20 Jan 2020",
    comments: 0,
    image: "https://images.unsplash.com/photo-1618556450991-2f1af64e8191?w=1200&h=800&fit=crop&q=80",
    slug: "future-digital-art"
  }),
  normalizePost({
    id: 21,
    title: "New Approach to Design",
    category: "News",
    categorySlug: "news",
    author: "Sandra Jones",
    authorSlug: "sandra-jones",
    date: "20 Jan 2020",
    comments: 4,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=800&fit=crop&q=80",
    slug: "new-approach-design"
  }),
  normalizePost({
    id: 22,
    title: "Try Not Staring at It",
    category: "News",
    categorySlug: "news",
    author: "Umar Aziz",
    authorSlug: "umar-aziz",
    date: "28 Jan 2020",
    comments: 0,
    image: "https://images.unsplash.com/photo-1634986666676-ec8fd927c23d?w=1200&h=800&fit=crop&q=80",
    slug: "try-not-staring"
  }),
  normalizePost({
    id: 23,
    title: "Ideas Can Make Money",
    category: "News",
    categorySlug: "news",
    author: "Ayesha Ali",
    authorSlug: "ayesha-ali",
    date: "01 Feb 2020",
    comments: 0,
    image: "https://images.unsplash.com/photo-1620321023374-d1a68fbc720d?w=1200&h=800&fit=crop&q=80",
    slug: "ideas-make-money"
  })
];

export const latestPosts = [
  normalizePost({
    id: 24,
    title: "Creating New NFT Apps for Authors and Sellers",
    category: "Events",
    categorySlug: "events",
    author: "Diana Lewis",
    authorSlug: "diana-lewis",
    date: "08 Mar 2020",
    comments: 0,
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&h=800&fit=crop&q=80",
    slug: "creating-nft-apps"
  }),
  normalizePost({
    id: 25,
    title: "Top Software for Creating Beautiful NFT Art",
    category: "Events",
    categorySlug: "events",
    author: "Ayesha Ali",
    authorSlug: "ayesha-ali",
    date: "19 Feb 2020",
    comments: 0,
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1200&h=800&fit=crop&q=80",
    slug: "top-software"
  }),
  normalizePost({
    id: 26,
    title: "Learn More About Blockchain Through NFTs",
    category: "Events",
    categorySlug: "events",
    author: "Umar Aziz",
    authorSlug: "umar-aziz",
    date: "27 Jan 2020",
    comments: 0,
    image: "https://images.unsplash.com/photo-1642543492481-44e81e3914a7?w=1200&h=800&fit=crop&q=80",
    slug: "learn-blockchain"
  })
];

export const socialLinks = [
  { name: "Facebook", count: "3K", icon: "facebook", url: "#" },
  { name: "Twitter", count: "3K", icon: "twitter", url: "#" },
  { name: "YouTube", count: "740", icon: "youtube", url: "#" },
  { name: "Instagram", count: "3K", icon: "instagram", url: "#" }
];

const allPostsList = [
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

const postMap = new Map();
allPostsList.forEach((post) => {
  postMap.set(post.slug, post);
});

export const allPosts = Array.from(postMap.values());

export const getPostBySlug = (slug) => {
  if (!slug) return undefined;
  return postMap.get(slug);
};

export const getRelatedPosts = (post, limit = 3) => {
  if (!post) return [];
  const results = [];
  const seen = new Set([post.slug]);

  const addUnique = (items) => {
    for (const item of items) {
      if (results.length >= limit) break;
      if (seen.has(item.slug)) continue;
      results.push(item);
      seen.add(item.slug);
    }
  };

  addUnique(allPosts.filter((item) => item.category === post.category));
  addUnique(allPosts);

  return results;
};
