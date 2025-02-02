import Link from 'next/link';
import Image from 'next/image';

const Navigation = () => {
  return (
    <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm z-50 shadow-sm">
      <div className="max-w-[90vw] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/home">
              <Image
                src="/logo.png" // Update with your logo path
                alt="Defence Intelligence College"
                width={50}
                height={50}
                className="h-12 w-auto"
              />
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-row gap-x-10">
            <div className="hidden md:flex md:gap-x-10">
            <div>
            <Link 
              href="/home" 
              className="text-gray-800 hover:text-blue-600 transition-colors"
            >
              Home
            </Link>
            </div>
            <div>
            <Link 
              href="/pg-program" 
              className="text-gray-800 hover:text-blue-600 transition-colors"
            >
              PG Program
            </Link>
            </div>
            <div>
            <Link 
              href="/news" 
              className="text-gray-800 hover:text-blue-600 transition-colors"
            >
              News & Blog
            </Link>
            </div>
            </div>
          
          {/* Apply Button */}
          <div>
            <Link 
              href="/apply"
              className="bg-[#2D2F93] text-white px-6 py-2 rounded-md hover:bg-blue-900 
                transition-colors duration-300"
            >
              Apply
            </Link>
          </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
