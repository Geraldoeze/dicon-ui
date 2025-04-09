"use client"
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { X, Menu } from 'lucide-react';
import InformationHeader from './informationHeader'
// import { useQuery } from '@tanstack/react-query';
// import { strapiService } from '@/services/strapiService';


// Navigation Component 
   

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

    // const { data: navs } = useQuery({
    //   queryKey: ['navs'],
    //   queryFn: () => strapiService.getNavs()
    // })

  

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    document.body.style.overflow = !isOpen ? 'hidden' : 'unset';
  };

  const navLinks = [
    { href: "home", label: "Home" },
    { href: "departments&courses", label: "Departments & Courses" },
    { href: "/pg-program", label: "PG Program" },
    { href: "/news", label: "News & Blog" },
    { href: "/contact-us", label: "Contact Us" },
  ];

  return (
    <div className="sticky top-0 z-50 w-full">
      <InformationHeader/>
    <nav className="bg-white/95 backdrop-blur-sm shadow-sm">
      <div className="max-w-[90vw] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between space-x-5 h-16 md:h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/home">
              <Image
                src="/logo.png" 
                alt="Defence Intelligence College"
                width={50}
                height={50}
                className="h-12 w-auto"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="flex gap-x-10">
          <div className="hidden lg:flex items-center  lg:gap-x-5 xl:gap-x-10">
            {navLinks.map((nav) => (
              <Link 
                key={nav.href}
                href={nav.href}
                className="text-gray-800 min-w-fit md:text-[.8rem] lg:text-[1rem] hover:text-blue-600 transition-colors"
              >
                {nav.label}
              </Link>
            ))}
          </div>

          {/* Log In Button */}
          <div className="hidden lg:block">
            <Link 
              href="/portal/login"
              className="bg-[#2D2F93] text-white px-6 py-2 rounded-md hover:bg-blue-900 
                transition-colors duration-300"
            >
              Log In
            </Link>
          </div>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden z-50 p-2"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <X className="w-6 h-6 text-white" />
            ) : (
              <Menu className="w-6 h-6 text-gray-800" />
            )}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        {isOpen && (
          <div className="fixed inset-0 left-0 top-0 bg-gray-700/95 min-h-screen z-40 lg:hidden">
            <div className="flex flex-col items-center justify-center bg-gray-600/80 min-h-screen space-y-8 mt-[-4rem]">
              {navLinks.map((nav) => (
                <Link
                  key={nav.href}
                  href={nav.href}
                  className="text-white text-xl hover:text-blue-400 transition-colors"
                  onClick={() => {
                    setIsOpen(false);
                    document.body.style.overflow = 'unset';
                  }}
                >
                  {nav.label}
                </Link>
              ))}
              {/* Mobile Apply Button */}
              <Link 
                href="/portal/login"
                className="bg-[#2D2F93] text-white px-8 py-3 rounded-md hover:bg-blue-900 
                  transition-colors duration-300 mt-6"
                onClick={() => {
                  setIsOpen(false);
                  document.body.style.overflow = 'unset';
                }}
              >
                Log In
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
    </div>
  );
};

export default Navigation;