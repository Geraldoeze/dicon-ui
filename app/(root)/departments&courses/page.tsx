"use client";

import { useState } from 'react';
import Image from 'next/image';
import { courses, departments } from '.././home/mock';



const DepartmentCourses = () => {
    const [activeTab, setActiveTab] = useState(departments[0].id);
    const activeDepartment = departments.find(dept => dept.id === activeTab);
  return (
    <div>
    <div className="relative h-screen lg:min-h-full lg:max-h-[1000px] w-full">
      {/* Background with Overlay */}
      <div 
        className={`absolute inset-0 bg-[url('/IMG_0107.JPG')] bg-cover bg-center`}
      >
        <div className="absolute inset-0 bg-slate-950/50 backdrop-blur-xs" />
      </div>

      {/* Main Content Container */}
      <div className="relative h-screen lg:max-h-full max-w-[85vw] mx-auto">
        
        {/* Center Content Section */}
        <div className="absolute top-[80%] -translate-y-1/2  
          max-w-2xl md:max-w-3xl">
          {/* Title Section */}
          <h1 className="hero-title text-3xl sm:text-4xl md:text-5xl lg:text-7xl 
            font-semibold text-white my-2">
            Our Departments and Courses
          </h1>

          {/* Subtitle Section */}
            <p className="hero-subtitle text-base sm:text-lg md:text-xl lg:text-2xl 
              text-white/90 max-w-xl">
              Pioneering Excellence in Intelligence and Strategic Leadership since 2001
            </p>
          
    </div>
    </div>
    </div>



    <section className="min-h-screen lg:min-h-full lg:max-h-[1400px] relative bg-[url('/misionvision-bg.jpg')] bg-cover bg-center">
     <div className="absolute bg-gray-50/80 inset-0 opacity-10"></div>
      <div className="max-w-[80vw] mx-auto relative z-1 py-5">
        <h2 className="text-[1.5rem] text-center md:text-[2.5rem] font-semibold my-10">Departments</h2>
        
        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {departments.map((dept) => (
            <button
              key={dept.id}
              onClick={() => setActiveTab(dept.id)}
              className={`px-6 py-3 rounded-full text-sm md:text-base transition-all duration-300 
                ${activeTab === dept.id 
                  ? 'bg-blue-700 text-white' 
                  : 'bg-blue-50 text-gray-700 hover:bg-blue-100'}`}
            >
              {dept.name}
            </button>
          ))}
        </div>

        {/* Content */}
        {activeDepartment && (
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              {/* Image */}
              <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-900">
                <Image
                  src={activeDepartment.image}
                  alt={activeDepartment.name}
                  fill
                  className="object-cover transition-opacity duration-300"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              </div>

              {/* Text Content */}
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-gray-900">
                  {activeDepartment.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {activeDepartment.description}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
    

        <div className="min-h-screen lg:min-h-full lg:max-h-[1400px] relative bg-[url('/misionvision-bg.jpg')] bg-cover bg-center">
        <div className="absolute bg-slate-50/90 inset-0"></div>
        <div className="max-w-[80vw] mx-auto relative z-1 py-5">

          <h1 className="text-[1.5rem] text-center md:text-[2.5rem] font-semibold my-10"> Our Courses </h1>

          <div className="max-w-3xl mx-auto">
            {courses.map((course) => (
              <div key={course.id} className="p-5 flex flex-col md:flex-row justify-between border-y-[1px] border-gray-200">
                <div className="">
                <h1 className='text-[1.2rem] md:text-[1.5rem] my-3 md:my-0 font-semibold'>{course.title}</h1>
                </div>
               
                  <ul className='list-disc text-start flex flex-col gap-y-2'>
                    <li>{course.course_types[0]}</li>
                    <li>{course.course_types[1]}</li>
                    <li>{course.course_types[2]}</li>
                    <li>{course.course_types[3]}</li>
                    <li>{course.course_types[4]}</li>  
                  </ul>
                
              </div>
            ))}
          </div>

        </div>
        </div>
    </div>
  )
}

export default DepartmentCourses