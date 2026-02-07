export default function HeroSection() {
  const categories = [
    {
      title: '#Style Trends',
      bgColor: 'from-purple-600 to-purple-500',
      emoji: '👗',
      textColor: 'text-white'
    },
    {
      title: '#Health & Wellness',
      bgColor: 'from-orange-400 to-orange-300',
      emoji: '🧘‍♀️',
      textColor: 'text-gray-900'
    },
    {
      title: '#Outdoor Gear',
      bgColor: 'from-orange-500 to-orange-400',
      emoji: '🎒',
      textColor: 'text-gray-900'
    },
    {
      title: '#Digital Tools',
      bgColor: 'from-yellow-300 to-yellow-200',
      emoji: '💻',
      textColor: 'text-gray-900'
    },
    {
      title: '#Gourment Picks',
      bgColor: 'from-gray-100 to-gray-50',
      emoji: '🍽️',
      textColor: 'text-gray-900'
    },
    {
      title: '#Parenting Picks',
      bgColor: 'from-orange-200 to-orange-100',
      emoji: '👶',
      textColor: 'text-gray-900'
    },
    {
      title: '#Gift Ideas',
      bgColor: 'from-red-500 to-red-400',
      emoji: '🎁',
      textColor: 'text-white'
    },
    {
      title: '#Explore Destinations',
      bgColor: 'from-blue-800 to-blue-700',
      emoji: '✈️',
      textColor: 'text-white'
    },
    {
      title: '#Movies Picks',
      bgColor: 'from-gray-200 to-gray-100',
      emoji: '🎬',
      textColor: 'text-gray-900'
    },
    {
      title: '#Gadget & Devices',
      bgColor: 'from-pink-400 to-pink-300',
      emoji: '📱',
      textColor: 'text-gray-900'
    },
    {
      title: '#Home Essentials',
      bgColor: 'from-yellow-100 to-yellow-50',
      emoji: '🏠',
      textColor: 'text-gray-900'
    },
    {
      title: '#Pet Care Tips',
      bgColor: 'from-orange-100 to-orange-50',
      emoji: '🐶',
      textColor: 'text-gray-900'
    },
    {
      title: '#Garage Essentials',
      bgColor: 'from-blue-200 to-blue-100',
      emoji: '🔧',
      textColor: 'text-gray-900'
    }
  ];

  return (
    <section className="w-full bg-white py-12 sm:py-16 md:py-20 lg:py-24 xl:py-28 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1400px] mx-auto">
        {/* Hero Title */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-gray-900 mb-10 sm:mb-12 md:mb-14 lg:mb-16 leading-[1.1] tracking-tight">
          Your journey is here.
        </h1>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {/* Row 1: 4 cards */}
          <CategoryCard {...categories[0]} />
          <CategoryCard {...categories[1]} />
          <CategoryCard {...categories[2]} />
          <CategoryCard {...categories[3]} />

          {/* Row 2: 2 single + 1 double */}
          <CategoryCard {...categories[4]} />
          <CategoryCard {...categories[5]} />
          <div className="sm:col-span-2">
            <CategoryCard {...categories[6]} wide />
          </div>

          {/* Row 3: 1 double + 2 single */}
          <div className="sm:col-span-2">
            <CategoryCard {...categories[7]} wide />
          </div>
          <CategoryCard {...categories[8]} />
          <CategoryCard {...categories[9]} />

          {/* Row 4: 2 single + 1 double */}
          <CategoryCard {...categories[10]} />
          <CategoryCard {...categories[11]} />
          <div className="sm:col-span-2">
            <CategoryCard {...categories[12]} wide />
          </div>
        </div>
      </div>
    </section>
  );
}

function CategoryCard({ title, bgColor, emoji, textColor, wide = false }) {
  return (
    <div
      className={`bg-gradient-to-br ${bgColor} rounded-2xl md:rounded-3xl p-5 md:p-6 flex items-center gap-4 md:gap-5 h-24 md:h-28 lg:h-32 cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl group overflow-hidden relative`}
    >
      {/* Icon Container */}
      <div className="relative w-14 h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 flex-shrink-0 bg-white/90 backdrop-blur-sm rounded-xl md:rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
        <span className="text-3xl md:text-4xl lg:text-5xl">{emoji}</span>
      </div>

      {/* Title */}
      <h2 className={`text-lg md:text-xl lg:text-2xl font-bold ${textColor} group-hover:translate-x-1 transition-transform duration-300`}>
        {title}
      </h2>

      {/* Decorative gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>
  );
}