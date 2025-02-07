"use client"
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { X, Menu } from 'lucide-react';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

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
    <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm z-50 shadow-sm">
      <div className="max-w-[90vw] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
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
          <div className="hidden md:flex items-center gap-x-10">
            {navLinks.map((link) => (
              <Link 
                key={link.href}
                href={link.href}
                className="text-gray-800 hover:text-blue-600 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Apply Button */}
          <div className="hidden md:block">
            <Link 
              href="/"
              className="bg-[#2D2F93] text-white px-6 py-2 rounded-md hover:bg-blue-900 
                transition-colors duration-300"
            >
              Apply
            </Link>
          </div>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden z-50 p-2"
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
          <div className="fixed inset-0 left-0 top-0 bg-gray-700/95 z-40 md:hidden">
            <div className="flex flex-col items-center justify-center bg-gray-600/80 h-screen space-y-8 mt-[-4rem]">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-white text-xl hover:text-blue-400 transition-colors"
                  onClick={() => {
                    setIsOpen(false);
                    document.body.style.overflow = 'unset';
                  }}
                >
                  {link.label}
                </Link>
              ))}
              {/* Mobile Apply Button */}
              <Link 
                href="/"
                className="bg-[#2D2F93] text-white px-8 py-3 rounded-md hover:bg-blue-900 
                  transition-colors duration-300 mt-6"
                onClick={() => {
                  setIsOpen(false);
                  document.body.style.overflow = 'unset';
                }}
              >
                Apply
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;