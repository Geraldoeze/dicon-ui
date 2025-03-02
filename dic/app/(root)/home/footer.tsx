import { Facebook, Twitter, Linkedin, Phone, Mail, MapPin } from 'lucide-react';
import Link from 'next/link';

const Footer = () => {
    const currentYear = new Date().getFullYear();
  return (
    <div className="relative bg-[url('/commandants-bg.jpg')] bg-cover bg-center">
        <div className="absolute bg-slate-50/90 inset-0"></div>
        <div className="max-w-[80vw] mx-auto relative z-1 py-5">
        <footer className="py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Follow Us Section */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <Link 
                href="https://facebook.com" 
                className="bg-gray-700 p-2 rounded-full text-white hover:bg-gray-600 transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </Link>
              <Link 
                href="https://twitter.com" 
                className="bg-gray-700 p-2 rounded-full text-white hover:bg-gray-600 transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </Link>
              <Link 
                href="https://linkedin.com" 
                className="bg-gray-700 p-2 rounded-full text-white hover:bg-gray-600 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </Link>
            </div>
          </div>

          {/* Our Links Section */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Our Links</h3>
            <nav className="flex flex-col space-y-2">
              <Link 
                href="/portal/login" 
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Student Login
              </Link>
              <Link 
                href="/portal/login" 
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Staff login
              </Link>
              <Link 
                href="/apply" 
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                PG Application
              </Link>
            </nav>
          </div>

          {/* Contact Us Section */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Phone size={20} className="text-gray-700" />
                <a 
                  href="tel:08036326299" 
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  08036326299
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <Mail size={20} className="text-gray-700" />
                <a 
                  href="mailto:dicunn.pgs@gmail.com" 
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  dicunn.pgs@gmail.com
                </a>
              </div>
              <div className="flex items-start space-x-2">
                <MapPin size={20} className="text-gray-700 mt-1 flex-shrink-0" />
                <span className="text-gray-600">
                  Defense Intelligence College, karu, Abuja
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-center text-gray-600">
            © {currentYear} - Defence Intelligence College
          </p>
        </div>
      </div>
    </footer>

        </div>

    </div>
  )
}

export default Footer