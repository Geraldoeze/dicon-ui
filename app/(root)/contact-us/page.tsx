import React from 'react'
import Image from 'next/image'

const Contact = () => {
  return (
    <section className="min-h-screen w-full flex items-center justify-center 
      py-12 md:py-16 lg:py-20 xl:py-24 2xl:py-32 
      bg-[url('/misionvision-bg.jpg')] bg-cover bg-center relative
      pb-24 md:pb-32 lg:pb-40 xl:pb-48 2xl:pb-56">
      {/* Overlay */}
      <div className="absolute inset-0 bg-gray-50/80 opacity-10"></div>
      
      <div className="relative z-10 w-full max-w-7xl py-20 px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-12 md:mb-14 lg:mb-16 xl:mb-20">
          <h1 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-semibold mb-3 sm:mb-4'>
            You have any questions?
          </h1>
          <p className='text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl'>
            Send us a message
          </p>
        </div>

        {/* Content Container */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 xl:gap-16 2xl:gap-24">
          {/* Image Section */}
          <div className="w-full lg:w-1/2 max-w-xl xl:max-w-2xl 2xl:max-w-3xl mx-auto">
            <Image
              src="/group.png"
              alt="Contact illustration"
              width={800}
              height={800}
              className='w-full h-auto object-contain'
              priority
            />
          </div>

          {/* Form Section */}
          <div className="w-full lg:w-1/2 max-w-xl xl:max-w-2xl 2xl:max-w-3xl mx-auto">
            <form className="space-y-4 sm:space-y-6 lg:space-y-8 xl:space-y-10">
              {/* Name Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 xl:gap-6">
                <div>
                  <label htmlFor="firstName" className="block text-sm md:text-base lg:text-lg font-medium text-gray-700 mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    className="w-full px-3 py-2 lg:px-4 lg:py-3 xl:px-5 xl:py-4 
                      text-base lg:text-lg xl:text-xl
                      border border-gray-300 rounded-md 
                      focus:outline-none focus:ring-2 focus:ring-[#2D2F93] focus:border-transparent
                      transition-all duration-300"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm md:text-base lg:text-lg font-medium text-gray-700 mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    id="lastName"
                    className="w-full px-3 py-2 lg:px-4 lg:py-3 xl:px-5 xl:py-4 
                      text-base lg:text-lg xl:text-xl
                      border border-gray-300 rounded-md 
                      focus:outline-none focus:ring-2 focus:ring-[#2D2F93] focus:border-transparent
                      transition-all duration-300"
                  />
                </div>
              </div>

              {/* Email Input */}
              <div>
                <label htmlFor="email" className="block text-sm md:text-base lg:text-lg font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="w-full px-3 py-2 lg:px-4 lg:py-3 xl:px-5 xl:py-4 
                    text-base lg:text-lg xl:text-xl
                    border border-gray-300 rounded-md 
                    focus:outline-none focus:ring-2 focus:ring-[#2D2F93] focus:border-transparent
                    transition-all duration-300"
                />
              </div>

              {/* Phone Number Input */}
              <div>
                <label htmlFor="phoneNumber" className="block text-sm md:text-base lg:text-lg font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <div className="flex">
                  <select 
                    name="phoneCode" 
                    className="w-24 lg:w-32 xl:w-40 px-2 py-2 lg:px-3 lg:py-3 xl:px-4 xl:py-4
                      text-base lg:text-lg xl:text-xl
                      border border-r-0 border-gray-300 rounded-l-md 
                      focus:outline-none focus:ring-2 focus:ring-[#2D2F93]"
                  >
                    <option value="+234">NG</option>
                    <option value="+1">US</option>
                    <option value="+44">UK</option>
                  </select>
                  <input
                    type="tel"
                    name="phoneNumber"
                    id="phoneNumber"
                    className="flex-1 px-3 py-2 lg:px-4 lg:py-3 xl:px-5 xl:py-4 
                      text-base lg:text-lg xl:text-xl
                      border border-gray-300 rounded-r-md 
                      focus:outline-none focus:ring-2 focus:ring-[#2D2F93] focus:border-transparent
                      transition-all duration-300"
                  />
                </div>
              </div>

              {/* Message Textarea */}
              <div>
                <label htmlFor="message" className="block text-sm md:text-base lg:text-lg font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  id="message"
                  rows={5}
                  className="w-full px-3 py-2 lg:px-4 lg:py-3 xl:px-5 xl:py-4 
                    text-base lg:text-lg xl:text-xl
                    border border-gray-300 rounded-md 
                    focus:outline-none focus:ring-2 focus:ring-[#2D2F93] focus:border-transparent
                    transition-all duration-300 resize-y"
                />
              </div>

              {/* Privacy Policy Checkbox */}
              <div className="flex items-center space-x-2 text-sm md:text-base lg:text-lg">
                <input 
                  type="checkbox" 
                  id="privacyPolicy" 
                  className="rounded text-[#2D2F93] focus:ring-[#2D2F93] 
                    w-4 h-4 lg:w-5 lg:h-5"
                />
                <label htmlFor="privacyPolicy" className="text-gray-700">
                  You agree to our friendly privacy policy
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3 lg:py-4 xl:py-5 
                  text-base lg:text-lg xl:text-xl
                  bg-[#2D2F93] text-white font-semibold rounded-md 
                  hover:bg-indigo-800 transition-colors duration-300 
                  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2D2F93]"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact