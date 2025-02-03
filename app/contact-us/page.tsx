import React from 'react'
import Image from 'next/image'

const Contact = () => {
  return (
    <>
    <section className="min-h-screen relative bg-[url('/misionvision-bg.jpg')] bg-cover bg-center py-10">
     <div className="absolute bg-gray-50/80 inset-0 opacity-10"></div>
      <div className="max-w-[80vw] mx-auto relative z-1 py-10">

      <div className="text-center relative z-2 my-10">
        <h1 className='text-[1.5rem] md:text-[2.5rem] font-semibold'>You have any questions?</h1>
        <p className='text-base md:text-lg'>Send us a message</p>
      </div>

      <div className="w-full flex items-center flex-col gap-10 md:flex-row-reverse">
        <div className="w-full md:w-1/2">
          <Image
            src="/group.png"
            alt=""
            className='w-full h-auto object-cover'
            width={500}
            height={500}
          />
        </div>
        <div className="w-full md:w-1/2">
          <form action="">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="my-2">
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                  First Name
                </label>
                <div className="my-2">
                  <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    className="bg-transparent p-2 border-2 focus:ring-black focus:border-black block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                  </div>
                </div>
                <div className="my-2">
                <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                  Last Name
                </label>
                <div className="my-2">
                  <input
                    type="text"
                    name="lastName"
                    id="lastName"
                    className="bg-transparent p-2 border-2 focus:ring-black focus:border-black block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
                </div>
              </div>

                <div className="my-2">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <div className="my-2">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="bg-transparent p-2 border-gray-300 border-2 focus:ring-black focus:border-black block w-full sm:text-sm rounded-md"
                  />
                  </div>
                </div>

                <div className="my-2">
                <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <div className="my-2 flex border-gray-300 outline-none focus:ring-black focus:border-black border-2 rounded-md">
                  <select name="phoneNumber" id="" className='p-2 rounded-md'>
                    <option value="+234">NG</option>
                    <option value="+1">US</option>
                    <option value="+44">UK</option>
                  </select>
                  <input
                    type="phoneNumber"
                    name="phoneNumber"
                    id="phoneNumber"
                    className="bg-transparent p-2 rounded-md outline-none focus:ring-black focus:border-black block w-full sm:text-sm"
                  />
                </div>
                </div>

                <div className="my-2">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                  Message
                </label>
                <div className="my-2">
                  <textarea
                    name="message"
                    id="message"
                    rows={5}
                    cols={5}
                    className="bg-transparent p-2 border-2 focus:ring-black focus:border-black block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                  </div>

                </div>

                <div className="flex gap-2 my-3">
                <input type="checkbox" name="" id="" />
                <span>You agree to our friendly privacy policy</span>
                </div>

                <button
                  type="submit"
                  className="bg-[#2D2F93] hover:bg-indigo-900 w-full text-white font-semibold py-2 px-4 my-3 rounded-md"
                >
                  Send Message
                </button>
                
                </form>
            </div>

        </div>
      </div>
      </section>
      
      </>
  )
}

export default Contact