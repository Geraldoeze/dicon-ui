"use client";

import Link from "next/link";
//import { useEffect } from 'react';
import VideoModal from "./videomodal";
import { strapiService } from "@/services/strapiService";
import { useQuery } from "@tanstack/react-query";
const Hero = () => {
  const { data: hero } = useQuery({
    queryKey: ["hero"],
    queryFn: () => strapiService.getHero(),
  });

  // useEffect(() => {
  //   const elements = [
  //     { selector: '.hero-title', className: 'animate-slide-in' },
  //     { selector: '.hero-subtitle', className: 'animate-fade-in' },
  //     { selector: '.hero-cta', className: 'animate-fade-in' },
  //     { selector: '.hero-video', className: 'animate-fade-in' }
  //   ];

  //   elements.forEach(({ selector, className }) => {
  //     document.querySelector(selector)?.classList.add(className);
  //   });
  // }, []);

  return (
    <div className="relative h-screen xl:max-h-[1200px] w-full overflow-hidden">
      {/* Background with Overlay */}
      <div
        className={`absolute inset-0 bg-[url('/hero.gif')] bg-cover bg-center`}
      >
        <div className="absolute inset-0 bg-[#0F204B]/60 backdrop-blur-xs" />
      </div>

      {hero?.data.map((item) => (
        <section key={item.id}>
          {/* Main Content Container */}
          <div className="relative h-screen xl:max-h-[1200px] px-4 md:px-8 lg:px-16 xl:px-0 max-w-[95vw] mx-auto">
            {/* Center Content Section */}
            <div className="absolute top-1/2 -translate-y-1/2 max-w-3xl lg:max-w-5xl">
              {/* Title Section */}
              {/* <h1 className="hero-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-white transform leading-tight md:leading-tight lg:leading-tight">
                {item.title}
              </h1> */}
              <h1 className="hero-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-white transform leading-tight md:leading-tight lg:leading-tight">
                Welcome to
                <br /> Defence Intelligence College
                <br /> Nigeria
              </h1>
              {/* Subtitle Section */}
              <div className="flex items-start gap-x-3 md:gap-x-5 my-8 md:my-12">
                <div
                  className="w-1.5 md:w-2 h-12 md:h-16 bg-orange-500 
              flex-shrink-0"
                />
                <p className="hero-subtitle text-sm sm:text-base md:text-lg lg:text-xl text-white/90">
                  {item.description}
                </p>
              </div>

              {/* CTA Button */}
              <div className="hero-cta mt-8 md:mt-12">
                <Link
                  href="/courses"
                  className="inline-block bg-[#2D2F93] text-white px-6 py-3 
                md:px-8 md:py-4 rounded-md hover:bg-blue-900 
                transition-colors duration-300 text-sm md:text-base"
                >
                  Explore our programmes
                </Link>
              </div>
            </div>

            {/* Video Button Section */}
            <VideoModal videoUrl={item.videoUrl} />
          </div>
        </section>
      ))}
    </div>
  );
};

export default Hero;
