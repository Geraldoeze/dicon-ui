"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, LogIn } from "lucide-react";
import { useEffect } from "react";

const Unauthorized = () => {
  // Optional: You can add a timer to auto-redirect after a few seconds
  useEffect(() => {
    const redirectTimer = setTimeout(() => {
      window.location.href = "/portal/login";
    }, 10000); // Redirect after 10 seconds

    return () => clearTimeout(redirectTimer);
  }, []);

  return (
    <div className="min-h-screen bg-[#080825] flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full">
        <div className="flex flex-col items-center space-y-6">
          {/* Logo */}
          <div className="mb-2">
            <Image
              src="/logo.png"
              alt="Logo"
              width={80}
              height={80}
              className="mx-auto"
            />
          </div>

          {/* Icon */}
          <div className="bg-red-100 p-3 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 text-red-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>

          {/* Message */}
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Access Denied</h1>
            <p className="text-gray-600 mb-6">
              You don't have permission to access this page. Please log in with the appropriate credentials.
            </p>
            <p className="text-sm text-gray-500 mb-6">
              You will be redirected to the login page automatically in a few seconds.
            </p>
          </div>

          {/* Buttons */}
          <div className="flex flex-col space-y-3 w-full">
            <Link
              href="/portal/login"
              className="flex items-center justify-center gap-2 bg-[#2D2F93] text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors w-full"
            >
              <LogIn size={20} />
              Go to Login
            </Link>
            
            <Link
              href="/home"
              className="flex items-center justify-center gap-2 border border-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-100 transition-colors w-full"
            >
              <ArrowLeft size={20} />
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;