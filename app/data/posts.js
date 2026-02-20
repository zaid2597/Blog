const defaultAuthor = {
  name: "Ayesha Ali",
  slug: "ayesha-ali",
  image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=200&h=200&fit=crop&q=80",
  role: "Creative Director",
  bio: "Ayesha leads Eldecora's studio vision, blending warm minimalism with layered, livable luxury."
};

const authorProfiles = {
  "Ayesha Ali": {
    slug: "ayesha-ali",
    image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=200&h=200&fit=crop&q=80",
    role: "Creative Director",
    bio: "Ayesha curates elevated, calm interiors with a focus on light, texture, and timeless materials."
  },
  "Sandra Jones": {
    slug: "sandra-jones",
    image: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?w=200&h=200&fit=crop&q=80",
    role: "Senior Stylist",
    bio: "Sandra brings refined styling and editorial polish, turning everyday rooms into design moments."
  },
  "Kylie Jones": {
    slug: "kylie-jones",
    image: "https://images.unsplash.com/photo-1525134479668-1bee5c7c6845?w=200&h=200&fit=crop&q=80",
    role: "Lighting & Spatial Designer",
    bio: "Kylie specializes in lighting and spatial flow, creating rooms that feel open and intentional."
  },
  "Diana Lewis": {
    slug: "diana-lewis",
    image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=200&h=200&fit=crop&q=80",
    role: "Material Curator",
    bio: "Diana focuses on tactile details and layered materials to elevate modern interiors."
  },
  "Umar Aziz": {
    slug: "umar-aziz",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&q=80",
    role: "Home Decor Specialist",
    bio: "Umar blends modern comfort with classic craftsmanship, curating pieces that feel lived-in."
  }
};

const slugify = (value) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const buildTags = (category) => {
  const base = ["Home Decor", "Interior Design", "Styling", "DIY"];
  if (!category) {
    return base;
  }
  if (!base.includes(category)) {
    return [category, ...base.slice(0, 3)];
  }
  return base;
};

const buildContent = ({ title, category, author }) => `
  <p>${title} focuses on practical ${category.toLowerCase()} ideas that make a home feel layered, calm, and intentional. You will learn how to use light, texture, and layout to create a space that works beautifully every day.</p>

  <p>We cover easy upgrades, smart styling tricks, and the simple decisions that lift a room without overwhelming it. The goal is to help you build a home that feels personal, warm, and easy to maintain.</p>

  <h2>Design Approach</h2>

  <p>Start with a clear palette, then add contrast with textiles, wood tones, and a touch of metal. The best spaces balance comfort with clarity, so every piece feels like it belongs.</p>

  <blockquote>
    "Great rooms are built from small, thoughtful choices that add up over time."
  </blockquote>

  <h3>Key Takeaways</h3>

  <ul>
    <li>Pick one hero element and let it lead the rest of the room.</li>
    <li>Layer lighting for both mood and task use.</li>
    <li>Mix materials to avoid a flat, one-note look.</li>
    <li>Finish with styling that reflects real life, not a showroom.</li>
  </ul>

  <p>Written by ${author}, this article shares the home decor habits that keep spaces fresh and welcoming.</p>
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
  title: "Warm Minimalist Living Rooms That Feel Cozy",
  category: "Living Room",
  categorySlug: "living-room",
  author: "Sandra Jones",
  authorSlug: "sandra-jones",
  date: "05 Feb 2026",
  comments: 0,
  image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1200&h=800&fit=crop&q=80",
  slug: "warm-minimalist-living-rooms"
});

export const topPosts = [
  normalizePost({
    id: 2,
    title: "5 Statement Lighting Ideas for Small Spaces",
    category: "Lighting",
    categorySlug: "lighting",
    author: "Kylie Jones",
    authorSlug: "kylie-jones",
    date: "02 Feb 2026",
    comments: 0,
    image: "https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=1200&h=800&fit=crop&q=80",
    slug: "statement-lighting-ideas"
  }),
  normalizePost({
    id: 3,
    title: "How to Style Open Shelving Without Clutter",
    category: "Kitchen",
    categorySlug: "kitchen",
    author: "Diana Lewis",
    authorSlug: "diana-lewis",
    date: "30 Jan 2026",
    comments: 0,
    image: "https://images.unsplash.com/photo-1501045661006-fcebe0257c3f?w=1200&h=800&fit=crop&q=80",
    slug: "style-open-shelving"
  })
];

export const smallPosts = [
  normalizePost({
    id: 4,
    title: "Layered Bedding for Hotel-Style Comfort",
    category: "Bedroom",
    categorySlug: "bedroom",
    author: "Umar Aziz",
    date: "26 Jan 2026",
    comments: 0,
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&h=800&fit=crop&q=80",
    slug: "layered-bedding-comfort"
  }),
  normalizePost({
    id: 5,
    title: "Earthy Color Palettes That Soothe",
    category: "Color",
    categorySlug: "color",
    author: "Ayesha Ali",
    date: "24 Jan 2026",
    comments: 0,
    image: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=800&h=800&fit=crop&q=80",
    slug: "earthy-color-palettes"
  }),
  normalizePost({
    id: 6,
    title: "Entryway Refresh in One Afternoon",
    category: "Entryway",
    categorySlug: "entryway",
    author: "Sandra Jones",
    date: "22 Jan 2026",
    comments: 0,
    image: "https://images.unsplash.com/photo-1505691723518-36a5ac3be353?w=800&h=800&fit=crop&q=80",
    slug: "entryway-refresh"
  }),
  normalizePost({
    id: 7,
    title: "Dining Tablescapes for Everyday Elegance",
    category: "Dining",
    categorySlug: "dining",
    author: "Kylie Jones",
    date: "20 Jan 2026",
    comments: 0,
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=800&fit=crop&q=80",
    slug: "dining-tablescapes-everyday"
  })
];

export const editorChoicePosts = [
  normalizePost({
    id: 8,
    title: "The Rule of Three for Styling Surfaces",
    category: "Decor Tips",
    categorySlug: "decor-tips",
    date: "28 Jan 2026",
    comments: 0,
    image: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?w=1200&h=900&fit=crop&q=80",
    slug: "rule-of-three-styling"
  }),
  normalizePost({
    id: 9,
    title: "Choosing the Right Sofa Size for Your Room",
    category: "Furniture",
    categorySlug: "furniture",
    date: "27 Jan 2026",
    comments: 4,
    image: "https://images.unsplash.com/photo-1505693314127-8b06b8967fcc?w=1200&h=900&fit=crop&q=80",
    slug: "right-sofa-size"
  })
];

export const editorChoiceBottomPosts = [
  normalizePost({
    id: 10,
    title: "High-End Look on a Budget: 7 Quick Wins",
    category: "Budget Decor",
    categorySlug: "budget-decor",
    date: "25 Jan 2026",
    comments: 3,
    image: "https://images.unsplash.com/photo-1481277542470-605612bd2d61?w=1200&h=900&fit=crop&q=80",
    slug: "high-end-look-budget"
  }),
  normalizePost({
    id: 11,
    title: "Mixing Wood Tones Without the Clash",
    category: "Materials",
    categorySlug: "materials",
    date: "23 Jan 2026",
    comments: 2,
    image: "https://images.unsplash.com/photo-1449247709967-d4461a6a6103?w=1200&h=900&fit=crop&q=80",
    slug: "mixing-wood-tones",
    sponsored: true
  })
];

export const trendingPosts = [
  normalizePost({
    id: 12,
    title: "2026 Home Decor Trends Worth Trying",
    category: "Trends",
    categorySlug: "trends",
    author: "Diana Lewis",
    authorSlug: "diana-lewis",
    date: "10 Feb 2026",
    comments: 0,
    image: "https://images.unsplash.com/photo-1487014679447-9f8336841d58?w=1200&h=900&fit=crop&q=80",
    slug: "2026-home-decor-trends"
  }),
  normalizePost({
    id: 13,
    title: "Low-Light Houseplants That Still Thrive",
    category: "Plants",
    categorySlug: "plants",
    author: "Umar Aziz",
    authorSlug: "umar-aziz",
    date: "08 Feb 2026",
    comments: 0,
    image: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=1200&h=900&fit=crop&q=80",
    slug: "low-light-houseplants"
  }),
  normalizePost({
    id: 14,
    title: "Built-In Style: Bookshelf Styling Secrets",
    category: "Storage",
    categorySlug: "storage",
    author: "Ayesha Ali",
    authorSlug: "ayesha-ali",
    date: "06 Feb 2026",
    comments: 0,
    image: "https://images.unsplash.com/photo-1451153378752-16ef2b36ad05?w=1600&h=1000&fit=crop&q=80",
    slug: "bookshelf-styling-secrets",
    large: true
  }),
  normalizePost({
    id: 15,
    title: "Gallery Wall Layouts That Always Work",
    category: "Wall Decor",
    categorySlug: "wall-decor",
    author: "Diana Lewis",
    authorSlug: "diana-lewis",
    date: "05 Feb 2026",
    comments: 0,
    image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=1200&h=900&fit=crop&q=80",
    slug: "gallery-wall-layouts"
  }),
  normalizePost({
    id: 16,
    title: "Rugs 101: Size, Placement, and Texture",
    category: "Textiles",
    categorySlug: "textiles",
    author: "Sandra Jones",
    authorSlug: "sandra-jones",
    date: "03 Feb 2026",
    comments: 0,
    image: "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?w=1200&h=900&fit=crop&q=80",
    slug: "rugs-101"
  })
];

export const recentPosts = [
  normalizePost({
    id: 17,
    title: "A Calm Morning Corner with Two Chairs",
    category: "Living Room",
    categorySlug: "living-room",
    author: "Ayesha Ali",
    date: "04 Feb 2026",
    comments: 0,
    image: "https://images.unsplash.com/photo-1502005097973-6a7082348e28?w=600&h=600&fit=crop&q=80",
    slug: "calm-morning-corner"
  }),
  normalizePost({
    id: 18,
    title: "Small Balcony Makeover with Big Impact",
    category: "Outdoor",
    categorySlug: "outdoor",
    author: "Umar Aziz",
    date: "02 Feb 2026",
    comments: 0,
    image: "https://images.unsplash.com/photo-1469796466635-455ede028aca?w=600&h=600&fit=crop&q=80",
    slug: "small-balcony-makeover"
  }),
  normalizePost({
    id: 19,
    title: "Kitchen Counter Styling: The 3-Item Rule",
    category: "Kitchen",
    categorySlug: "kitchen",
    author: "Ayesha Ali",
    date: "01 Feb 2026",
    comments: 0,
    image: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?w=600&h=600&fit=crop&q=80",
    slug: "kitchen-counter-styling"
  })
];

export const newsPosts = [
  normalizePost({
    id: 20,
    title: "Neutral Kitchens Are Back—with Warm Wood",
    category: "News",
    categorySlug: "news",
    author: "Sandra Jones",
    authorSlug: "sandra-jones",
    date: "09 Feb 2026",
    comments: 0,
    image: "https://images.unsplash.com/photo-1502673530728-f79b4cab31b1?w=1200&h=800&fit=crop&q=80",
    slug: "neutral-kitchens-warm-wood"
  }),
  normalizePost({
    id: 21,
    title: "Paint Finish Guide: Matte vs Eggshell",
    category: "News",
    categorySlug: "news",
    author: "Sandra Jones",
    authorSlug: "sandra-jones",
    date: "08 Feb 2026",
    comments: 4,
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1200&h=800&fit=crop&q=80",
    slug: "paint-finish-guide"
  }),
  normalizePost({
    id: 22,
    title: "Vintage Finds: Where to Start",
    category: "News",
    categorySlug: "news",
    author: "Umar Aziz",
    authorSlug: "umar-aziz",
    date: "07 Feb 2026",
    comments: 0,
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=1200&h=800&fit=crop&q=80",
    slug: "vintage-finds-start"
  }),
  normalizePost({
    id: 23,
    title: "Mirror Placement to Maximize Light",
    category: "News",
    categorySlug: "news",
    author: "Ayesha Ali",
    authorSlug: "ayesha-ali",
    date: "06 Feb 2026",
    comments: 0,
    image: "https://images.unsplash.com/photo-1501183638710-841dd1904471?w=1200&h=800&fit=crop&q=80",
    slug: "mirror-placement-light"
  })
];

export const latestPosts = [
  normalizePost({
    id: 24,
    title: "Weekend Project: Peel-and-Stick Backsplash",
    category: "DIY",
    categorySlug: "diy",
    author: "Diana Lewis",
    authorSlug: "diana-lewis",
    date: "11 Feb 2026",
    comments: 0,
    image: "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=1200&h=800&fit=crop&q=80",
    slug: "peel-and-stick-backsplash"
  }),
  normalizePost({
    id: 25,
    title: "Bathroom Spa Vibes with Simple Upgrades",
    category: "Bathroom",
    categorySlug: "bathroom",
    author: "Ayesha Ali",
    authorSlug: "ayesha-ali",
    date: "10 Feb 2026",
    comments: 0,
    image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=1200&h=800&fit=crop&q=80",
    slug: "bathroom-spa-vibes"
  }),
  normalizePost({
    id: 26,
    title: "Curtains That Make Ceilings Look Higher",
    category: "Window Treatments",
    categorySlug: "window-treatments",
    author: "Umar Aziz",
    authorSlug: "umar-aziz",
    date: "09 Feb 2026",
    comments: 0,
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&h=800&fit=crop&q=80",
    slug: "curtains-make-ceilings-higher"
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

const buildAuthorList = (posts) => {
  const map = new Map();

  posts.forEach((post) => {
    const name = post.author || defaultAuthor.name;
    const profile = authorProfiles[name] || defaultAuthor;
    const author = {
      name,
      slug: profile.slug || slugify(name),
      image: profile.image || defaultAuthor.image,
      role: profile.role || defaultAuthor.role,
      bio: profile.bio || defaultAuthor.bio
    };

    map.set(author.slug, author);
  });

  if (!map.has(defaultAuthor.slug)) {
    map.set(defaultAuthor.slug, { ...defaultAuthor });
  }

  return Array.from(map.values());
};

export const authors = buildAuthorList(allPosts);

export const getAuthorBySlug = (slug) =>
  authors.find((author) => author.slug === slug);

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
