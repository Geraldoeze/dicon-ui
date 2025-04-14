"use client";

import { useState } from "react";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { strapiService } from "@/services/strapiService";
import { useApiLoader } from "@/hooks/use-api-loader";
const Department = () => {
  const [activeTab, setActiveTab] = useState<string | null>(null);

  // Fetch departments & courses from Strapi
  const { data: DC, isLoading } = useQuery({
    queryKey: ["departments"],
    queryFn: () => strapiService.getDC(),
  });

  // Loading & Error States
  useApiLoader(isLoading);
  // if (isLoading) return <p className="text-center text-lg">Loading...</p>;
  // if (isError) return <p className="text-center text-red-600">Failed to load data</p>;

  // Extract departments & courses
  const departments = DC?.data[0]?.departments || [];

  // Set first department as default active tab
  if (!activeTab && departments.length > 0) {
    setActiveTab(departments[0].id);
  }

  const activeDepartment = departments.find((dept) => dept.id === activeTab);

  return (
    <div>
      {/* Hero Section */}
      <div className="relative h-screen lg:min-h-full lg:max-h-[1000px] w-full">
        <div className="absolute inset-0 bg-[url('/IMG_1971.JPG')] bg-cover bg-center">
          <div className="absolute inset-0 bg-slate-650/50 backdrop-blur-xs" />
        </div>
        <div className="relative h-screen lg:max-h-full max-w-[85vw] mx-auto">
          <div className="absolute top-[80%] -translate-y-1/2 max-w-2xl md:max-w-3xl">
            {/* <h1 className="hero-title text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-semibold text-white my-2">
              Our Departments
            </h1> */}
            <p className="hero-subtitle text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 max-w-xl">
              Pioneering Excellence in Intelligence and Strategic Leadership
              since 2001
            </p>
          </div>
        </div>
      </div>

      {/* Departments Section */}
      <section className="min-h-screen lg:min-h-full lg:max-h-[1400px] relative bg-[url('/misionvision-bg.jpg')] bg-cover bg-center">
        <div className="absolute bg-gray-50/80 inset-0 opacity-10"></div>
        <div className="max-w-[80vw] mx-auto relative z-1 py-5">
          <h2 className="text-[1.5rem] text-center md:text-[2.5rem] font-semibold my-10">
            Departments
          </h2>
          <p className="text-gray-900 tracking-wid font-semibold text-lg px-6 lg:px-12">
            The College has six departments, namely Department of Professional
            Studies, Department of Counter Intelligence, Department of Technical
            Studies, Department of General Studies, Department of Joint Military
            Attachè Programme and Department of Language Studies.{" "}
          </p>

          {/* Tabs */}
          <div className="flex flex-wrap justify-center gap-2 my-12 ">
            {departments.map((dept) => (
              <button
                key={dept.id}
                onClick={() => setActiveTab(dept.id)}
                className={`px-6 py-3 rounded-full text-sm md:text-base transition-all duration-300 
                  ${
                    activeTab === dept.id
                      ? "bg-blue-700 text-white"
                      : "bg-blue-50 text-gray-700 hover:bg-blue-100"
                  }`}
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
    </div>
  );
};

export default Department;
