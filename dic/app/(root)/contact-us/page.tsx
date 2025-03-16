"use client"

import React, { useState } from 'react'
import Image from 'next/image'

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneCode: '+234',
    phoneNumber: '',
    message: '',
    privacyPolicy: false
  });

  // Country codes list - organized alphabetically
  const countryCodes = [
    { code: '+1', country: '🇺🇸 US' },
    { code: '+44', country: '🇬🇧 UK' },
    { code: '+61', country: '🇦🇺 AU' },
    { code: '+55', country: '🇧🇷 BR' },
    { code: '+1', country: '🇨🇦 CA' },
    { code: '+86', country: '🇨🇳 CN' },
    { code: '+20', country: '🇪🇬 EG' },
    { code: '+33', country: '🇫🇷 FR' },
    { code: '+49', country: '🇩🇪 DE' },
    { code: '+852', country: '🇭🇰 HK' },
    { code: '+91', country: '🇮🇳 IN' },
    { code: '+39', country: '🇮🇹 IT' },
    { code: '+81', country: '🇯🇵 JP' },
    { code: '+254', country: '🇰🇪 KE' },
    { code: '+60', country: '🇲🇾 MY' },
    { code: '+52', country: '🇲🇽 MX' },
    { code: '+234', country: '🇳🇬 NG' },
    { code: '+92', country: '🇵🇰 PK' },
    { code: '+63', country: '🇵🇭 PH' },
    { code: '+7', country: '🇷🇺 RU' },
    { code: '+65', country: '🇸🇬 SG' },
    { code: '+27', country: '🇿🇦 ZA' },
    { code: '+82', country: '🇰🇷 KR' },
    { code: '+34', country: '🇪🇸 ES' },
    { code: '+46', country: '🇸🇪 SE' },
    { code: '+66', country: '🇹🇭 TH' },
    { code: '+90', country: '🇹🇷 TR' },
    { code: '+971', country: '🇦🇪 AE' },
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted:', formData);
    // Reset form after submission if needed
    // setFormData({ firstName: '', lastName: '', email: '', phoneCode: '+234', phoneNumber: '', message: '', privacyPolicy: false });
  };

  return (
    <section className="min-h-screen w-full flex items-center justify-center 
      py-8 sm:py-10 md:py-16 lg:py-20 
      bg-[url('/misionvision-bg.jpg')] bg-cover bg-center bg-no-repeat relative
      pb-16 sm:pb-20 md:pb-32 lg:pb-40">
      {/* Overlay with better opacity control */}
      <div className="absolute inset-0 bg-white bg-opacity/30"></div>
      
      <div className="relative z-10 w-full max-w-7xl py-10 sm:py-12 md:py-16 lg:py-20 
        px-4 sm:px-6 lg:px-8 mx-auto">
        {/* Header with improved spacing */}
        <div className="text-center mb-6 sm:mb-8 md:mb-12 lg:mb-16">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold 
            mb-2 sm:mb-3 md:mb-4 text-gray-900">
            You have any questions?
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-800">
            Send us a message
          </p>
        </div>

        {/* Content Container with better mobile stacking */}
        <div className="flex flex-col lg:flex-row gap-8 md:gap-10 lg:gap-12">
          {/* Image Section - Hidden on smallest screens if needed */}
          <div className="w-full lg:w-1/2 max-w-lg mx-auto lg:mx-0">
            <Image
              src="/group.png"
              alt="Contact illustration"
              width={600}
              height={600}
              className="w-full h-auto object-contain"
              priority
            />
          </div>

          {/* Form Section */}
          <div className="w-full lg:w-1/2 rounded-lg p-4 sm:p-6 md:p-8">
            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
              {/* Name Inputs - Stack on mobile, side by side on larger screens */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1 md:mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 md:py-3
                      text-base md:text-lg
                      border border-gray-300 rounded-md 
                      focus:outline-none focus:ring-2 focus:ring-transparent focus:border-gray-500
                      transition-all duration-300"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1 md:mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    id="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 md:py-3
                      text-base md:text-lg
                      border border-gray-300 rounded-md 
                      focus:outline-none focus:ring-2 focus:ring-transparent focus:border-gray-500
                      transition-all duration-300"
                  />
                </div>
              </div>

              {/* Email Input */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1 md:mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 md:py-3
                    text-base md:text-lg
                    border border-gray-300 rounded-md 
                    focus:outline-none focus:ring-2 focus:ring-transparent focus:border-gray-500
                    transition-all duration-300"
                />
              </div>

              {/* Phone Number Input - Enhanced with country flags and searchable dropdown */}
              <div>
                <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1 md:mb-2">
                  Phone Number
                </label>
                <div className="flex">
                  <select 
                    name="phoneCode"
                    value={formData.phoneCode}
                    onChange={handleChange}
                    className="w-24 sm:w-32 px-1 sm:px-2 py-2 md:py-3
                      text-xs sm:text-sm
                      bg-white border border-r-0 border-gray-300 rounded-l-md 
                      focus:outline-none focus:ring-2 focus:ring-transparent focus:border-gray-500"
                  >
                    {countryCodes.map((item) => (
                      <option key={item.country} value={item.code}>
                        {item.code}
                      </option>
                    ))}
                  </select>
                  <input
                    type="tel"
                    name="phoneNumber"
                    id="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    required
                    placeholder="Enter phone number"
                    className="flex-1 px-3 py-2 md:py-3
                      text-base md:text-lg
                      border border-gray-300 rounded-r-md 
                      focus:outline-none focus:ring-2 focus:ring-transparent focus:border-gray-500
                      transition-all duration-300"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">Format: {formData.phoneCode} {formData.phoneNumber}</p>
              </div>

              {/* Message Textarea - Adjusted height for different screen sizes */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1 md:mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  id="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="How can we help you?"
                  className="w-full px-3 py-2 md:py-3
                    text-base md:text-lg
                    border border-gray-300 rounded-md 
                    focus:outline-none focus:ring-2 focus:ring-transparent focus:border-gray-500
                    transition-all duration-300 resize-y"
                />
              </div>

              {/* Privacy Policy Checkbox - Improved for touch targets */}
              <div className="flex items-start space-x-2 sm:space-x-3">
                <input 
                  type="checkbox" 
                  id="privacyPolicy"
                  name="privacyPolicy"
                  checked={formData.privacyPolicy}
                  onChange={handleChange}
                  required
                  className="mt-1 rounded text-[#2D2F93] focus:ring-2 focus:ring-transparent focus:border-gray-500
                    w-4 h-4"
                />
                <label htmlFor="privacyPolicy" className="text-sm sm:text-base text-gray-700">
                  You agree to our friendly privacy policy
                </label>
              </div>

              {/* Submit Button - Improved sizing for mobile */}
              <button
                type="submit"
                className="w-full py-2.5 sm:py-3 md:py-4
                  text-base md:text-lg
                  bg-[#2D2F93] text-white font-semibold rounded-md 
                  hover:bg-indigo-800 transition-colors duration-300 
                  focus:outline-none focus:ring-2 focus:ring-transparent focus:border-gray-500"
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