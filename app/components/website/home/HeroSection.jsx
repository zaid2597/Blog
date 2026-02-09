'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function HomePage() {
  // Blog posts data based on the website
  const heroPost = {
    id: 1,
    title: "This Is What Design Has Come To",
    category: "Application",
    categorySlug: "application",
    author: "Sandra Jones",
    authorSlug: "sandra-jones",
    date: "20 Jan 2020",
    comments: "0 Comments",
    image: "https://source.unsplash.com/1200x800/?nft,art",
    slug: "this-is-what-design-has-come-to"
  };

  const topPosts = [
    {
      id: 2,
      title: "New Digital NFT Digest 2022",
      category: "Application",
      categorySlug: "application",
      author: "Kylie Jones",
      authorSlug: "kylie-jones",
      date: "25 Mar 2020",
      comments: "0 Comments",
      image: "https://source.unsplash.com/1200x800/?digital,art",
      slug: "new-digital-nft-digest-2022"
    },
    {
      id: 3,
      title: "Must-haves in Your NFT Collection",
      category: "Application",
      categorySlug: "application",
      author: "Diana Lewis",
      authorSlug: "diana-lewis",
      date: "28 Mar 2020",
      comments: "0 Comments",
      image: "https://source.unsplash.com/1200x800/?creative,design",
      slug: "must-haves-in-your-nft-collection"
    }
  ];

  const smallPosts = [
    {
      id: 4,
      title: "Do You Like Your NFTs?",
      category: "People",
      categorySlug: "people",
      image: "https://source.unsplash.com/800x800/?crypto,art",
      slug: "do-you-like-your-nfts"
    },
    {
      id: 5,
      title: "Realistic Robot Models",
      category: "People",
      categorySlug: "people",
      image: "https://source.unsplash.com/800x800/?robot,design",
      slug: "realistic-robot-models"
    },
    {
      id: 6,
      title: "Digital Yin Yang Re-design",
      category: "People",
      categorySlug: "people",
      image: "https://source.unsplash.com/800x800/?abstract,art",
      slug: "digital-yin-yang-re-design"
    },
    {
      id: 7,
      title: "Your Friends Are Aliens",
      category: "People",
      categorySlug: "people",
      image: "https://source.unsplash.com/800x800/?space,art",
      slug: "your-friends-are-aliens"
    }
  ];

  const editorChoicePosts = [
    {
      id: 8,
      title: "What Is the Mysterious Process of Creating an NFT?",
      category: "Blockchain",
      categorySlug: "blockchain",
      date: "01 Feb 2020",
      comments: "0 Comments",
      image: "https://source.unsplash.com/1200x900/?blockchain,technology",
      slug: "what-is-the-mysterious-process"
    },
    {
      id: 9,
      title: "Why Do Authors Refuse to Sell NFTs?",
      category: "Blockchain",
      categorySlug: "blockchain",
      date: "25 Mar 2020",
      comments: "6 Comments",
      image: "https://source.unsplash.com/1200x900/?data,technology",
      slug: "why-do-authors-refuse"
    }
  ];

  const editorChoiceBottomPosts = [
    {
      id: 10,
      title: "Starting an NFT Project From Scratch: Pros & Cons",
      category: "Blockchain",
      categorySlug: "blockchain",
      date: "26 Mar 2020",
      comments: "7 Comments",
      image: "https://source.unsplash.com/1200x900/?startup,technology",
      slug: "starting-nft-project"
    },
    {
      id: 11,
      title: "Changing Your Design Style while Working on an Item",
      category: "Blockchain",
      categorySlug: "blockchain",
      date: "30 Mar 2020",
      comments: "2 Comments",
      image: "https://source.unsplash.com/1200x900/?ui,design",
      slug: "changing-design-style",
      sponsored: true
    }
  ];

  const trendingPosts = [
    {
      id: 12,
      title: "The Phenomenon of NFT Rates",
      category: "Featured",
      categorySlug: "featured",
      author: "Diana Lewis",
      authorSlug: "diana-lewis",
      date: "28 Mar 2020",
      comments: "0 Comments",
      image: "https://source.unsplash.com/1200x900/?neon,city",
      slug: "phenomenon-of-nft-rates"
    },
    {
      id: 13,
      title: "The Most Expensive NFT Items of All Times",
      category: "Featured",
      categorySlug: "featured",
      author: "Peter Parker",
      authorSlug: "peter-parker",
      date: "25 Feb 2020",
      comments: "0 Comments",
      image: "https://source.unsplash.com/1200x900/?futuristic,art",
      slug: "most-expensive-nft"
    },
    {
      id: 14,
      title: "Incredible NFT Collection",
      category: "Featured",
      categorySlug: "featured",
      author: "Ryan Lee",
      authorSlug: "ryan-lee",
      date: "22 Feb 2020",
      comments: "0 Comments",
      image: "https://source.unsplash.com/1600x1000/?digital,landscape",
      slug: "incredible-nft-collection",
      large: true
    },
    {
      id: 15,
      title: "Creative Web Developers Should Explore the NFT Niche",
      category: "Featured",
      categorySlug: "featured",
      author: "Diana Lewis",
      authorSlug: "diana-lewis",
      date: "20 Feb 2020",
      comments: "0 Comments",
      image: "https://source.unsplash.com/1200x900/?creative,code",
      slug: "creative-web-developers"
    },
    {
      id: 16,
      title: "Trending Colors for Minting Unusual NFT Items",
      category: "Featured",
      categorySlug: "featured",
      author: "Sandra Jones",
      authorSlug: "sandra-jones",
      date: "20 Jan 2020",
      comments: "0 Comments",
      image: "https://source.unsplash.com/1200x900/?colorful,design",
      slug: "trending-colors"
    }
  ];

  const recentPosts = [
    {
      id: 17,
      title: "Best Cartoon – NFT Transformations",
      date: "27 Jan 2020",
      comments: "0 Comments",
      image: "https://source.unsplash.com/600x600/?cartoon,art",
      slug: "best-cartoon-nft"
    },
    {
      id: 18,
      title: "Technology Allows Modern Authors to Go Wild",
      date: "22 Jan 2020",
      comments: "0 Comments",
      image: "https://source.unsplash.com/600x600/?technology,writer",
      slug: "technology-allows"
    },
    {
      id: 19,
      title: "NFTs that Bring Aesthetic Pleasure to Viewers",
      date: "22 Jan 2020",
      comments: "0 Comments",
      image: "https://source.unsplash.com/600x600/?aesthetic,art",
      slug: "aesthetic-pleasure"
    }
  ];

  const newsPosts = [
    {
      id: 20,
      title: "The Future of Digital Art",
      category: "News",
      categorySlug: "news",
      author: "Sandra Jones",
      authorSlug: "sandra-jones",
      date: "20 Jan 2020",
      comments: "0 Comments",
      image: "https://source.unsplash.com/1200x800/?news,tech",
      slug: "future-digital-art"
    },
    {
      id: 21,
      title: "New Approach to Design",
      category: "News",
      categorySlug: "news",
      author: "Sandra Jones",
      authorSlug: "sandra-jones",
      date: "20 Jan 2020",
      comments: "4 Comments",
      image: "https://source.unsplash.com/1200x800/?design,studio",
      slug: "new-approach-design"
    },
    {
      id: 22,
      title: "Try Not Staring at It",
      category: "News",
      categorySlug: "news",
      author: "Henry Sanders",
      authorSlug: "henry-sanders",
      date: "28 Jan 2020",
      comments: "0 Comments",
      image: "https://source.unsplash.com/1200x800/?abstract,pattern",
      slug: "try-not-staring"
    },
    {
      id: 23,
      title: "Ideas Can Make Money",
      category: "News",
      categorySlug: "news",
      author: "Ryan Lee",
      authorSlug: "ryan-lee",
      date: "01 Feb 2020",
      comments: "0 Comments",
      image: "https://source.unsplash.com/1200x800/?idea,lightbulb",
      slug: "ideas-make-money"
    }
  ];

  const latestPosts = [
    {
      id: 24,
      title: "Creating New NFT Apps for Authors and Sellers",
      category: "Events",
      categorySlug: "events",
      author: "Diana Lewis",
      authorSlug: "diana-lewis",
      date: "08 Mar 2020",
      comments: "0 Comments",
      image: "https://source.unsplash.com/1200x800/?event,conference",
      slug: "creating-nft-apps"
    },
    {
      id: 25,
      title: "Top Software for Creating Beautiful NFT Art",
      category: "Events",
      categorySlug: "events",
      author: "Shelly Moore",
      authorSlug: "shelly-moore",
      date: "19 Feb 2020",
      comments: "0 Comments",
      image: "https://source.unsplash.com/1200x800/?software,design",
      slug: "top-software"
    },
    {
      id: 26,
      title: "Learn More About Blockchain Through NFTs",
      category: "Events",
      categorySlug: "events",
      author: "Henry Sanders",
      authorSlug: "henry-sanders",
      date: "27 Jan 2020",
      comments: "0 Comments",
      image: "https://source.unsplash.com/1200x800/?blockchain,network",
      slug: "learn-blockchain"
    }
  ];

  const socialLinks = [
    { name: 'Facebook', count: '3K', icon: 'facebook', url: '#' },
    { name: 'Twitter', count: '3K', icon: 'twitter', url: '#' },
    { name: 'YouTube', count: '740', icon: 'youtube', url: '#' },
    { name: 'Instagram', count: '3K', icon: 'instagram', url: '#' }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Hero Section with 3 Large Posts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
          {/* Main Featured Post */}
          <Link href={`/blog/${heroPost.slug}`} className="group block">
            <div className="relative h-[400px] overflow-hidden bg-gray-900">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70 z-10" />
              <Image
                src={heroPost.image}
                alt={heroPost.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                <span className="inline-block text-xs font-semibold text-white bg-red-600 px-3 py-1 mb-3 uppercase tracking-wider hover:bg-red-700 transition-colors">
                  {heroPost.category}
                </span>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-3 leading-tight">
                  {heroPost.title}
                </h2>
                <div className="flex items-center gap-4 text-sm text-gray-300">
                  <span className="hover:text-white transition-colors">
                    By {heroPost.author}
                  </span>
                  <span>{heroPost.date}</span>
                  <span className="hover:text-white transition-colors">
                    {heroPost.comments}
                  </span>
                </div>
              </div>
            </div>
          </Link>

          {/* Two Posts Column */}
          <div className="space-y-6">
            {topPosts.map((post) => (
              <Link key={post.id} href={`/blog/${post.slug}`} className="group block">
                <div className="relative h-[190px] overflow-hidden bg-gray-900">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70 z-10" />
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
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
                        {post.comments}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Four Small Posts Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {smallPosts.map((post) => (
            <Link key={post.id} href={`/blog/${post.slug}`} className="group block">
              <div className="relative h-[200px] overflow-hidden bg-gray-900 mb-3">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
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
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Editor's Choice</h2>
                <p className="text-sm text-gray-500">Articles of the Day</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {editorChoicePosts.map((post) => (
                  <Link key={post.id} href={`/blog/${post.slug}`} className="group block">
                    <div className="relative h-[280px] overflow-hidden bg-gray-900 mb-4">
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 z-10" />
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
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
                        {post.comments}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {editorChoiceBottomPosts.map((post) => (
                  <Link key={post.id} href={`/blog/${post.slug}`} className="group block">
                    <div className="relative h-[280px] overflow-hidden bg-gray-900 mb-4">
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 z-10" />
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      {post.sponsored && (
                        <div className="absolute top-4 left-4 bg-yellow-400 text-gray-900 text-xs font-bold px-3 py-1 z-20">
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
                        {post.comments}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </section>

            {/* Trending Posts Section */}
            <section>
              <div className="mb-6">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Trending Posts</h2>
                <p className="text-sm text-gray-500">Featured Articles</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {trendingPosts.map((post) => (
                  <Link 
                    key={post.id} 
                    href={`/blog/${post.slug}`} 
                    className={`group block ${post.large ? 'md:col-span-2' : ''}`}
                  >
                    <div className={`relative ${post.large ? 'h-[400px]' : 'h-[280px]'} overflow-hidden bg-gray-900 mb-4`}>
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 z-10" />
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
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
                              {post.comments}
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
                            {post.comments}
                          </span>
                        </div>
                      </>
                    )}
                  </Link>
                ))}
              </div>

              <div className="mt-8 text-center">
                <Link 
                  href="/blog" 
                  className="inline-block bg-gray-900 text-white px-8 py-3 font-semibold uppercase tracking-wider hover:bg-red-600 transition-colors"
                >
                  more posts
                </Link>
              </div>
            </section>

          </div>

          {/* Sidebar - 1 column */}
          <aside className="space-y-8">
            
            {/* Follow Us Widget */}
            <div className="bg-gray-50 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Follow us</h3>
              <div className="space-y-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    className="flex items-center justify-between p-3 bg-white border border-gray-200 hover:border-red-600 hover:text-red-600 transition-colors group"
                  >
                    <span className="font-semibold">{social.name}</span>
                    <span className="text-gray-500 group-hover:text-red-600">{social.count}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Recent Posts Widget */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Recent posts</h3>
              <div className="space-y-5">
                {recentPosts.map((post) => (
                  <Link key={post.id} href={`/blog/${post.slug}`} className="group flex gap-4">
                    <div className="relative w-20 h-20 flex-shrink-0 overflow-hidden bg-gray-900">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-bold text-gray-900 mb-2 leading-tight group-hover:text-red-600 transition-colors">
                        {post.title}
                      </h4>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <span>{post.date}</span>
                        <span className="hover:text-gray-700 transition-colors">
                          {post.comments}
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
                    <div className="relative h-[200px] overflow-hidden bg-gray-900 mb-3">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
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
                        {post.comments}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

          </aside>
        </div>

        {/* Latest Posts Section - Full Width */}
        <section className="mt-12">
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Latest Posts</h2>
            <p className="text-sm text-gray-500">Featured News</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {latestPosts.map((post) => (
              <Link key={post.id} href={`/blog/${post.slug}`} className="group block">
                <div className="relative h-[250px] overflow-hidden bg-gray-900 mb-4">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
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
                    {post.comments}
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center">
            <Link 
              href="/blog" 
              className="inline-block bg-gray-900 text-white px-8 py-3 font-semibold uppercase tracking-wider hover:bg-red-600 transition-colors"
            >
              More Posts
            </Link>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="mt-12 bg-gray-900 text-white p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Get the best blog stories into your inbox!</h2>
          <form className="max-w-md mx-auto flex gap-2">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-600"
            />
            <button
              type="submit"
              className="bg-red-600 text-white px-6 py-3 font-semibold uppercase tracking-wider hover:bg-red-700 transition-colors"
            >
              Subscribe
            </button>
          </form>
        </section>

      </div>
    </div>
  );
}
