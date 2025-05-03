"use client";

import { useState } from "react";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { strapiService } from "@/services/strapiService";
import { useApiLoader } from "@/hooks/use-api-loader";
const Courses = () => {
  const [activeTab, setActiveTab] = useState<string | null>(null);

  // Fetch departments & courses from Strapi
  const { data: DC, isLoading } = useQuery({
    queryKey: ["courses"],
    queryFn: () => strapiService.getDC(),
  });

  // Loading & Error States
  useApiLoader(isLoading);
  // if (isLoading) return <p className="text-center text-lg">Loading...</p>;
  // if (isError) return <p className="text-center text-red-600">Failed to load data</p>;

  // Extract departments & courses

  const courses = DC?.data[0]?.courses || [];

  return (
    <div>
      {/* Hero Section */}
      <div className="relative h-screen lg:min-h-full lg:max-h-[1000px] w-full">
        <div className="absolute inset-0 bg-[url('/IMG-20250212-WA0006.jpg')] bg-cover bg-center">
          <div className="absolute inset-0 bg-slate-600/30 backdrop-blur-xs" />
        </div>
        <div className="relative h-screen lg:max-h-full max-w-[85vw] mx-auto">
          <div className="absolute top-[80%] -translate-y-1/2 max-w-2xl md:max-w-3xl">
            <h1 className="hero-title text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-semibold text-white my-2">
              {/* Our Courses  */}
            </h1>
            <p className="hero-subtitle text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 font-semibold max-w-xl">
              Pioneering Excellence in Intelligence and Strategic Leadership
              since 2001
            </p>
          </div>
        </div>
      </div>

      {/* Courses Section */}
      <div className="min-h-screen lg:min-h-full lg:max-h-[1400px] relative bg-[url('/misionvision-bg.jpg')] bg-cover bg-center">
        <div className="absolute bg-slate-50/90 inset-0"></div>
        <div className="max-w-[80vw] mx-auto relative z-1 py-5">
          <h1 className="text-[1.5rem] text-center md:text-[2.5rem] font-semibold my-10">
            {" "}
            Our Courses{" "}
          </h1>

          <div className="max-w-3xl mx-auto">
            {courses.map((course) => (
              <div
                key={course.id}
                className="p-5 flex flex-col md:flex-row justify-between border-y-[1px] border-gray-200"
              >
                <div>
                  <h1 className="text-[1.2rem] md:text-[1.5rem] my-3 md:my-0 font-semibold">
                    {course.title}
                  </h1>
                </div>
                <ul className="list-disc text-start flex flex-col md:w-1/2 gap-y-2">
                  {course.course_types.map((type) => (
                    <li key={type}>{type}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Courses;
