import NewsBlog from './../home/news-blog';
// import { blogPosts } from './../home/mock';
// import { Clock, Calendar1 } from 'lucide-react';
// import Image from 'next/image';

const News = () => {
  return (
    <div>
      <div className="relative min-h-screen w-full overflow-hidden">
      {/* Background with Overlay */}
      <div 
        className={`absolute inset-0 bg-[url('/news.jpg')] bg-cover bg-center`}
      >
        <div className="absolute inset-0 bg-slate-950/50 backdrop-blur-xs" />
      </div>

      {/* Main Content Container */}
      <div className="relative h-screen max-w-[85vw] mx-auto">
        
        {/* Center Content Section */}
        <div className="absolute top-[80%] -translate-y-1/2  
          max-w-2xl md:max-w-3xl">
          {/* Title Section */}
          <h1 className="hero-title text-3xl sm:text-4xl md:text-5xl lg:text-7xl 
            font-semibold text-white my-2">
            News Updates
          </h1>

          {/* Subtitle Section */}
            <p className="hero-subtitle text-base sm:text-lg md:text-xl lg:text-2xl 
              text-white/90 max-w-xl">
              Stay up to date with the latest information about the Defence Intelligence College
            </p>
          
    </div>
    </div>
    </div>
    

      <NewsBlog 
      columns={3} visible
      />
    </div>
  )
}

export default News