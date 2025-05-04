/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneCode: "+234",
    phoneNumber: "",
    message: "",
    privacyPolicy: false,
  });

  // Country codes list - organized alphabetically
  const countryCodes = [
    { code: "+1", country: "🇺🇸 US" },
    { code: "+44", country: "🇬🇧 UK" },
    { code: "+61", country: "🇦🇺 AU" },
    { code: "+55", country: "🇧🇷 BR" },
    { code: "+1", country: "🇨🇦 CA" },
    { code: "+86", country: "🇨🇳 CN" },
    { code: "+20", country: "🇪🇬 EG" },
    { code: "+33", country: "🇫🇷 FR" },
    { code: "+49", country: "🇩🇪 DE" },
    { code: "+852", country: "🇭🇰 HK" },
    { code: "+91", country: "🇮🇳 IN" },
    { code: "+39", country: "🇮🇹 IT" },
    { code: "+81", country: "🇯🇵 JP" },
    { code: "+254", country: "🇰🇪 KE" },
    { code: "+60", country: "🇲🇾 MY" },
    { code: "+52", country: "🇲🇽 MX" },
    { code: "+234", country: "🇳🇬 NG" },
    { code: "+92", country: "🇵🇰 PK" },
    { code: "+63", country: "🇵🇭 PH" },
    { code: "+7", country: "🇷🇺 RU" },
    { code: "+65", country: "🇸🇬 SG" },
    { code: "+27", country: "🇿🇦 ZA" },
    { code: "+82", country: "🇰🇷 KR" },
    { code: "+34", country: "🇪🇸 ES" },
    { code: "+46", country: "🇸🇪 SE" },
    { code: "+66", country: "🇹🇭 TH" },
    { code: "+90", country: "🇹🇷 TR" },
    { code: "+971", country: "🇦🇪 AE" },
  ];

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // Handle form submission logic here
    
    // Reset form after submission if needed
    // setFormData({ firstName: '', lastName: '', email: '', phoneCode: '+234', phoneNumber: '', message: '', privacyPolicy: false });
  };

  return (
    <section
      className="min-h-screen xl:min-h-full  w-full 
      bg-gradient-to-b from-white via-indigo-50 to-indigo-100"
    >
      <div className="py-4 border my-10 mx-6 rounded-md shadow-md">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7881.355110565638!2d7.575189113622999!3d9.00178813935801!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x104e0f1ef9fc140b%3A0x25c1e8caf11c24dd!2sDefence%20Intelligence%20College%20Karu!5e0!3m2!1sen!2sch!4v1744209964981!5m2!1sen!2sch"
          width="600"
          height="350"
          style={{ width: "100%" }}
          loading="lazy"
        ></iframe>
      </div>
      <div
        className="w-full max-w-6xl py-10 sm:py-12 
        px-4 sm:px-6 lg:px-8 mx-auto"
      >
        {/* Header */}
        <div className="text-center mb-8 sm:mb-10 md:mb-12 lg:mb-16">
          <h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold 
            mb-3 sm:mb-4 md:mb-5 text-gray-900 bg-clip-text text-transparent bg-gradient-to-r from-indigo-800 to-indigo-600"
          >
            Get in Touch
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-700 max-w-2xl mx-auto">
            Have questions or want to learn more? Send us a message and
            we&apos;ll get back to you shortly.
          </p>
        </div>

        {/* Form Container with enhanced styling */}
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Form Header */}
          <div className="bg-indigo-700 py-4 px-6 text-white">
            <h2 className="text-xl font-semibold">Contact Form</h2>
            <p className="text-indigo-100 text-sm">
              Fill out the form below and we&apos;ll respond within 24 hours
            </p>
          </div>

          {/* Form Section */}
          <div className="p-6 sm:p-8 md:p-10">
            <form onSubmit={handleSubmit} className="space-y-5 md:space-y-6">
              {/* Name Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium text-gray-700 mb-1 md:mb-2"
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3
                      text-base md:text-lg
                      border border-gray-300 rounded-lg
                      focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
                      transition-all duration-300"
                  />
                </div>
                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium text-gray-700 mb-1 md:mb-2"
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    id="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3
                      text-base md:text-lg
                      border border-gray-300 rounded-lg
                      focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
                      transition-all duration-300"
                  />
                </div>
              </div>

              {/* Email Input */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1 md:mb-2"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3
                    text-base md:text-lg
                    border border-gray-300 rounded-lg
                    focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
                    transition-all duration-300"
                />
              </div>

              {/* Phone Number Input */}
              <div>
                <label
                  htmlFor="phoneNumber"
                  className="block text-sm font-medium text-gray-700 mb-1 md:mb-2"
                >
                  Phone Number
                </label>
                <div className="flex">
                  <select
                    name="phoneCode"
                    value={formData.phoneCode}
                    onChange={handleChange}
                    className="w-28 sm:w-32 px-2 sm:px-3 py-3
                      text-sm
                      bg-white border border-r-0 border-gray-300 rounded-l-lg
                      focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
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
                    className="flex-1 px-4 py-3
                      text-base md:text-lg
                      border border-gray-300 rounded-r-lg
                      focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
                      transition-all duration-300"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Format: {formData.phoneCode} {formData.phoneNumber}
                </p>
              </div>

              {/* Message Textarea */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 mb-1 md:mb-2"
                >
                  Message
                </label>
                <textarea
                  name="message"
                  id="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="How can we help you?"
                  className="w-full px-4 py-3
                    text-base md:text-lg
                    border border-gray-300 rounded-lg
                    focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
                    transition-all duration-300 resize-y"
                />
              </div>

              {/* Privacy Policy Checkbox */}
              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  id="privacyPolicy"
                  name="privacyPolicy"
                  checked={formData.privacyPolicy}
                  onChange={handleChange}
                  required
                  className="mt-1 rounded text-indigo-600 focus:ring-2 focus:ring-indigo-500
                    w-5 h-5"
                />
                <label
                  htmlFor="privacyPolicy"
                  className="text-sm sm:text-base text-gray-700"
                >
                  I agree to the{" "}
                  <span className="text-indigo-600 hover:text-indigo-800 cursor-pointer">
                    privacy policy
                  </span>{" "}
                  and consent to being contacted regarding my inquiry
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3 sm:py-4
                  text-base md:text-lg
                  bg-indigo-600 text-white font-semibold rounded-lg
                  hover:bg-indigo-700 transition-colors duration-300 
                  focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
                  shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>

        {/* Contact Information */}
        <div className="mt-12 text-center">
          <p className="text-sm text-gray-600">
            Prefer to reach us directly? Email us at{" "}
            <span className="font-medium text-indigo-600">
              <a href="mailto:dicunn.pgs@gmail.com">dicunn.pgs@gmail.com</a>
            </span>{" "}
            or call{" "}
            <span className="font-medium text-indigo-600">
              <a href="tel:+2348164219007">+234 816 421 9007</a>
            </span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Contact;
