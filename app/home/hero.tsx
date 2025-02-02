"use client"

import Link from 'next/link';
import { useEffect } from 'react';
import { Play } from 'lucide-react';

const Hero = () => {
  useEffect(() => {
    const elements = [
      { selector: '.hero-title', className: 'animate-slide-in' },
      { selector: '.hero-subtitle', className: 'animate-fade-in' },
      { selector: '.hero-cta', className: 'animate-fade-in' },
      { selector: '.hero-video', className: 'animate-fade-in' }
    ];

    elements.forEach(({ selector, className }) => {
      document.querySelector(selector)?.classList.add(className);
    });
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Background with Overlay */}
      <div 
        className="absolute inset-0 bg-[url('/hero.gif')] bg-cover bg-center"
      >
        <div className="absolute inset-0 bg-[#0F204B]/80 backdrop-blur-xs" />
      </div>

      {/* Main Content Container */}
      <div className="relative h-screen px-4 md:px-8 lg:px-16 xl:px-0 
        max-w-[85vw] mx-auto">
        
        {/* Center Content Section */}
        <div className="absolute top-1/2 -translate-y-1/2  
          max-w-2xl lg:max-w-3xl">
          {/* Title Section */}
          <h1 className="hero-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl 
            font-semibold text-white opacity-0 transform -translate-x-12
            leading-tight md:leading-tight lg:leading-tight">
            Welcome to Defence Intelligence College Nigeria
          </h1>

          {/* Subtitle Section */}
          <div className="flex items-start gap-x-3 md:gap-x-5 my-8 md:my-12">
            <div className="w-1.5 md:w-2 h-12 md:h-16 bg-orange-500 
              flex-shrink-0" />
            <p className="hero-subtitle text-sm sm:text-base md:text-lg lg:text-xl 
              text-white/90 opacity-0">
              Empowering security professionals with world-class intelligence 
              training to safeguard Nigeria and beyond
            </p>
          </div>

          {/* CTA Button */}
          <div className="hero-cta mt-8 md:mt-12 opacity-0">
            <Link 
              href="/programs"
              className="inline-block bg-[#2D2F93] text-white px-6 py-3 
                md:px-8 md:py-4 rounded-md hover:bg-blue-900 
                transition-colors duration-300 text-sm md:text-base"
            >
              Explore our programs
            </Link>
          </div>
        </div>

        {/* Video Button Section */}
        <div className="hero-video absolute bottom-8 md:bottom-12 right-4 
          md:right-8 opacity-0">
          <div className="flex flex-col-reverse sm:flex-row items-center 
            gap-4 sm:gap-6">
            <span className="text-white text-sm md:text-base">
              Watch our documentary video
            </span>
            <button 
              className="rounded-full bg-orange-500 border-none outline-none p-2 custom-ping
                hover:bg-orange-600 transition-colors duration-300"
            >
              <Play className="w-2 h-2 md:w-5 md:h-5 text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;