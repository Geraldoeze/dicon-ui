"use client";
import { useState } from "react";
import Timeline from "./timeline";
import Image from "next/image";
import { X } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { strapiService } from "@/services/strapiService";
import Link from "next/link";

// Define image interface based on the API response
interface ApiImage {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string | null;
  width: number;
  height: number;
  url: string;
  formats: {
    thumbnail: {
      width: number;
      height: number;
      url: string;
    };
    small: {
      width: number;
      height: number;
      url: string;
    };
    medium: {
      width: number;
      height: number;
      url: string;
    };
    large: {
      width: number;
      height: number;
      url: string;
    };
  };
}

// Define our display image interface
interface DisplayImage {
  src: string;
  alt: string;
  className: string;
  width: number;
  height: number;
}

const About = () => {
  const { data: aboutData } = useQuery({
    queryKey: ["Images"],
    queryFn: () => strapiService.getAbout(),
  });

  const [selectedImage, setSelectedImage] = useState<DisplayImage | null>(null);

  // Fallback images array
  const fallbackImages: DisplayImage[] = [
    {
      src: "/IMG-20250212-WA0019.jpg",
      alt: "Tall landscape",
      className: "lg:row-span-2",
      width: 600,
      height: 800,
    },
    {
      src: "/IMG-20250212-WA0006.jpg",
      alt: "Wide cityscape",
      className: "lg:col-span-2",
      width: 600,
      height: 400,
    },
    {
      src: "/IMG-20250121-WA0019.jpg",
      alt: "Square abstract",
      className: "",
      width: 400,
      height: 400,
    },
    {
      src: "/IMG-20250212-WA0010.jpg",
      alt: "Portrait shot",
      className: "lg:row-span-2",
      width: 400,
      height: 600,
    },
    {
      src: "/IMG-20250212-WA0015.jpg",
      alt: "Portrait shot",
      className: "lg:col-span-2 hidden lg:block",
      width: 600,
      height: 400,
    },
  ];

  // Helper function to properly format Strapi image URLs
  const getStrapiImageUrl = (url: string): string => {
    // If the URL already starts with http/https, it's already a full URL
    if (url.startsWith("http")) {
      return url;
    }

    // Get the base Strapi URL
    const strapiBaseUrl = "http://138.197.7.199:1337";

    // If the URL already includes /uploads, it's a relative path from Strapi
    if (url.startsWith("/uploads")) {
      return `${strapiBaseUrl}${url}`;
    }

    // Otherwise, assume it needs the full path structure
    return `${strapiBaseUrl}${url}`;
  };

  // Transform API images to display format if available
  const apiImages: DisplayImage[] =
    aboutData?.data?.[0]?.images?.map((img: ApiImage, index: number) => {
      // Use the classes from fallback images for layout if they exist
      const correspondingFallback =
        index < fallbackImages.length ? fallbackImages[index] : null;

      return {
        src: getStrapiImageUrl(img.url),
        alt: img.alternativeText || img.name || `Image ${index + 1}`,
        className: correspondingFallback?.className || "",
        width: img.width,
        height: img.height,
      };
    }) || [];

  // Use API images if available, otherwise use fallback
  const displayImages = apiImages.length > 0 ? apiImages : fallbackImages;

  return (
    <div className="min-h-screen lg:min-h-full lg:max-h-[1200px] w-full pb-8 sm:pb-12">
      <div className="max-w-[95vw] sm:max-w-[90vw] lg:max-w-[85vw] mx-auto py-4 sm:py-6 md:py-8">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 xl:gap-12 mt-6 sm:mt-8 md:mt-12">
          {/* Gallery Section */}
          <div className="w-full lg:w-1/2">
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 md:gap-4 auto-rows-[120px] sm:auto-rows-[150px] md:auto-rows-[180px] lg:auto-rows-[200px]">
              {displayImages.map((image, index) => (
                <div
                  key={index}
                  className={`group relative overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer ${image.className}`}
                  onClick={() => setSelectedImage(image)}
                >
                  <div className="relative w-full h-full">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="(max-width: 640px) 45vw, (max-width: 1024px) 40vw, 35vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      priority={index === 0}
                    />
                  </div>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors duration-300" />
                </div>
              ))}
            </div>
          </div>

          {/* About Content Section */}
          <div className="w-full lg:w-1/2 px-2 sm:px-4 md:pt-6">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl text-center lg:text-start font-semibold">
              About Us
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-center lg:text-start">
              {/* A lot of DIC history */}
              {/* {aboutData?.data?.[0]?.description || 'A lot of DIC history'} */}
            </p>
            <div className="">
              <Timeline />
            </div>
            <div>
              <Link href={"/about"}>
                <button className="bg-[#2D2F93] text-white px-6 py-2 rounded-md hover:bg-blue-600 ">
                  Read more
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Full Screen Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-2 right-2 sm:top-4 sm:right-4 text-white hover:text-gray-300 transition-colors p-2"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedImage(null);
            }}
          >
            <X className="w-6 h-6 sm:w-8 sm:h-8" />
          </button>

          <div className="relative w-full h-[80vh] max-w-5xl mx-auto">
            <Image
              src={selectedImage.src}
              alt={selectedImage.alt}
              fill
              sizes="(max-width: 640px) 95vw, (max-width: 1024px) 90vw, 85vw"
              className="object-contain"
              priority
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default About;
