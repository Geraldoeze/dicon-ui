// "use client"

// import Image from 'next/image';
// import { useState } from 'react';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Navigation, Pagination, Autoplay, EffectCoverflow } from 'swiper/modules';
// import { Swiper as SwiperType } from 'swiper';
// import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';
// import 'swiper/css/effect-coverflow';
// import { useQuery } from '@tanstack/react-query';
// import { strapiService } from '@/services/strapiService';
// import VideoModal from './videomodal';

// interface GalleryImage {
//   src: string;
//   alt: string;
// }

// interface StrapiImage {
//   id: number;
//   url: string;
//   alternativeText: string | null;
//   formats: {
//     thumbnail?: { url: string };
//     small?: { url: string };
//     medium?: { url: string };
//     large?: { url: string };
//   };
// }

// const Gallery = () => {
//   const [activeIndex, setActiveIndex] = useState(0);

//   // Fallback images if API fails
//   const fallbackImages: GalleryImage[] = [
//     { src: '/IMG-20250212-WA0021.jpg', alt: 'Tall landscape' },
//     { src: '/IMG-20250212-WA0020.jpg', alt: 'Wide cityscape' },
//     { src: '/IMG-20250212-WA0005.jpg', alt: 'Square abstract' },
//     { src: '/IMG-20250121-WA0017.jpg', alt: 'Portrait shot' },
//     { src: '/IMG_0188.JPG', alt: 'Portrait shot' }
//   ];

//   const { data: gallery, isLoading, isError } = useQuery({
//     queryKey: ['Gallery'],
//     queryFn: () => strapiService.getGallery()
//   });

//   // Helper function to properly format Strapi image URLs
//   const getStrapiImageUrl = (url: string): string => {
//     if (!url) return '';

//     // If the URL already starts with http/https, it's already a full URL
//     if (url.startsWith('http')) {
//       return url;
//     }

//     // Get the base Strapi URL
//     // const strapiBaseUrl = 'http://138.197.7.199:1337';
//     // const strapiBaseUrl = 'https://dic-strapi.onrender.com';
//     const strapiBaseUrl =     'https://admin.dicnigeria.com.ng';
//     // Return full URL
//     return `${strapiBaseUrl}${url}`;
//   };

//   // Process gallery images from Strapi
//   const getGalleryImages = (): GalleryImage[] => {
//     if (isLoading || isError || !gallery?.data?.[0]?.images?.length) {
//       return fallbackImages;
//     }

//     return gallery.data[0].images.map((image: StrapiImage) => {
//       // Prefer large format if available, otherwise use original
//       const imgUrl = image.formats?.large?.url || image.url;
//       return {
//         src: getStrapiImageUrl(imgUrl),
//         alt: image.alternativeText || `Gallery image ${image.id}`
//       };
//     });
//   };

//   const images = getGalleryImages();

//   const handleSlideChange = (swiper: SwiperType) => {
//     setActiveIndex(swiper.realIndex);
//   };

//   return (
//     <div className="min-h-fit lg:min-h-full xl:max-h-[1000px] relative bg-[url('/misionvision-bg.jpg')] bg-cover bg-center bg-fixed">
//       <div className="absolute inset-0 bg-gray-50/80 opacity-10"></div>
//       <div className="relative z-10 py-0 md:py-12 w-[95vw] lg:w-[70vw] mx-auto">
//         <h1 className="text-2xl md:text-4xl font-semibold text-center mb-4">
//           Gallery
//         </h1>
//         <p className="text-lg md:text-xl text-center mb-8">
//           Checkout pictures and memories from our activities
//         </p>

//         <div className="w-full">
//           {isLoading ? (
//             <div className="flex justify-center items-center h-[400px]">
//               <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
//             </div>
//           ) : (
//             <Swiper
//               modules={[Navigation, Pagination, Autoplay, EffectCoverflow]}
//               spaceBetween={30}
//               slidesPerView={'auto'}
//               centeredSlides={true}
//               loop={true}
//               autoplay={{
//                 delay: 5000,
//                 disableOnInteraction: false,
//               }}
//               effect="coverflow"
//               coverflowEffect={{
//                 rotate: 0,
//                 stretch: 0,
//                 depth: 100,
//                 modifier: 2.5,
//                 slideShadows: false,
//               }}
//               navigation={{
//                 nextEl: '.swiper-button-next',
//                 prevEl: '.swiper-button-prev',
//               }}
//               pagination={{
//                 clickable: true,
//                 renderBullet: function (index, className) {
//                   return `<span class="${className} ${
//                     activeIndex === index ? 'w-4 bg-black' : 'w-2 bg-gray-400'
//                   } h-2 rounded-full transition-all duration-300"></span>`;
//                 },
//               }}
//               onSlideChange={handleSlideChange}
//               className="relative w-full h-[500px]"
//             >
//               {images.map((image, index) => (
//                 <SwiperSlide
//                   key={index}
//                   className="!w-[500px] transition-all duration-500"
//                 >
//                   {({ isActive }) => (
//                     <div
//                       className={`
//                         relative overflow-hidden rounded-lg transition-all duration-500
//                         ${isActive ? 'lg:scale-110 shadow-xl' : 'lg:scale-90 lg:opacity-75'}
//                       `}
//                       style={{ width: '500px', height: '400px' }}
//                     >
//                       <Image
//                         src={image.src}
//                         alt={image.alt}
//                         width={1000}
//                         height={800}
//                         className="object-cover w-full h-full"
//                         quality={100}
//                         priority={index <= 2}
//                         sizes="(max-width: 1024px) 95vw, 70vw"
//                       />
//                     </div>
//                   )}
//                 </SwiperSlide>
//               ))}

//               {/* Custom Navigation Buttons */}
//               <button className="swiper-button-prev absolute left-0 top-1/2 transform -translate-y-1/2 z-10 hidden lg:flex items-center justify-center w-12 h-12 rounded-full bg-white/80 shadow-lg hover:bg-white transition-colors">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   strokeWidth={2}
//                   stroke="currentColor"
//                   className="w-6 h-6"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     d="M15.75 19.5L8.25 12l7.5-7.5"
//                   />
//                 </svg>
//               </button>
//               <button className="swiper-button-next absolute right-0 top-1/2 transform -translate-y-1/2 z-10 hidden lg:flex items-center justify-center w-12 h-12 rounded-full bg-white/80 shadow-lg hover:bg-white transition-colors">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   strokeWidth={2}
//                   stroke="currentColor"
//                   className="w-6 h-6"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     d="M8.25 4.5l7.5 7.5-7.5 7.5"
//                   />
//                 </svg>
//               </button>
//             </Swiper>
//           )}

//           <style jsx global>{`
//             .swiper-pagination {
//               position: relative;
//               margin-top: 2rem;
//             }
//             .swiper-pagination-bullet {
//               margin: 0 4px;
//             }
//             .swiper-button-next::after,
//             .swiper-button-prev::after {
//               display: none;
//             }
//           `}</style>
//         </div>

//         <div className="my-5 flex item-center justify-center">
//           <VideoModal videoUrl={"https://www.youtube.com/embed/q-JkiUyTaLA?si=4YudGPKpg5uGM6z4"} section='gallery'/>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Gallery;



"use client";

import Image from "next/image";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Autoplay,
  EffectCoverflow,
} from "swiper/modules";
import { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
import { useQuery } from "@tanstack/react-query";
import { strapiService } from "@/services/strapiService";
import VideoModal from "./videomodal";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

interface GalleryImage {
  src: string;
  alt: string;
}

interface StrapiImage {
  id: number;
  url: string;
  alternativeText: string | null;
  formats: {
    thumbnail?: { url: string };
    small?: { url: string };
    medium?: { url: string };
    large?: { url: string };
  };
}

const Gallery = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [gridCurrentIndex, setGridCurrentIndex] = useState(0);
  const imagesPerPage = 8; // 4 columns × 2 rows

  // Fallback images if API fails
  const fallbackImages: GalleryImage[] = [
    { src: "/IMG-20250212-WA0021.jpg", alt: "Tall landscape" },
    { src: "/IMG-20250212-WA0020.jpg", alt: "Wide cityscape" },
    { src: "/IMG-20250212-WA0005.jpg", alt: "Square abstract" },
    { src: "/IMG-20250121-WA0017.jpg", alt: "Portrait shot" },
    { src: "/IMG_0188.JPG", alt: "Portrait shot" },
  ];

  const {
    data: gallery,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["Gallery"],
    queryFn: () => strapiService.getGallery(),
  });

  // Helper function to properly format Strapi image URLs
  const getStrapiImageUrl = (url: string): string => {
    if (!url) return "";

    // If the URL already starts with http/https, it's already a full URL
    if (url.startsWith("http")) {
      return url;
    }

    // Get the base Strapi URL
    // const strapiBaseUrl = 'http://138.197.7.199:1337';
    // const strapiBaseUrl = 'https://dic-strapi.onrender.com';
    const strapiBaseUrl = "https://admin.dicnigeria.com.ng";
    // Return full URL
    return `${strapiBaseUrl}${url}`;
  };

  // Process gallery images from Strapi
  const getGalleryImages = (): GalleryImage[] => {
    if (isLoading || isError || !gallery?.data?.[0]?.images?.length) {
      return fallbackImages;
    }

    return gallery.data[0].images.map((image: StrapiImage) => {
      // Prefer large format if available, otherwise use original
      const imgUrl = image.formats?.large?.url || image.url;
      return {
        src: getStrapiImageUrl(imgUrl),
        alt: image.alternativeText || `Gallery image ${image.id}`,
      };
    });
  };

  const images = getGalleryImages();

  const handleSlideChange = (swiper: SwiperType) => {
    setActiveIndex(swiper.realIndex);
  };

  // Grid navigation functions
  const totalPages = Math.ceil(images.length / imagesPerPage);

  const handleGridNext = () => {
    setGridCurrentIndex((prev) =>
      prev + imagesPerPage < images.length ? prev + imagesPerPage : 0
    );
  };

  const handleGridPrev = () => {
    setGridCurrentIndex((prev) =>
      prev - imagesPerPage >= 0
        ? prev - imagesPerPage
        : Math.max(0, (totalPages - 1) * imagesPerPage)
    );
  };

  const getCurrentGridImages = () => {
    return images.slice(gridCurrentIndex, gridCurrentIndex + imagesPerPage);
  };

  const currentPage = Math.floor(gridCurrentIndex / imagesPerPage) + 1;

  return (
    <div className="min-h-fit lg:min-h-full  relative bg-[url('/misionvision-bg.jpg')] bg-cover bg-center bg-fixed">
      <div className="absolute inset-0 bg-gray-50/80 opacity-10"></div>
      <div className="relative z-10 py-0 md:py-12 w-[95vw] lg:w-[70vw] mx-auto">
        <h1 className="text-2xl md:text-4xl font-semibold text-center mb-4">
          Gallery
        </h1>
        <p className="text-lg md:text-xl text-center mb-8">
          Checkout pictures and memories from our activities
        </p>

        {/* Carousel Section */}
        <div className="w-full mb-12">
          {isLoading ? (
            <div className="flex justify-center items-center h-[400px]">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
            </div>
          ) : (
            <Swiper
              modules={[Navigation, Pagination, Autoplay, EffectCoverflow]}
              spaceBetween={30}
              slidesPerView={"auto"}
              centeredSlides={true}
              loop={true}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
              }}
              effect="coverflow"
              coverflowEffect={{
                rotate: 0,
                stretch: 0,
                depth: 100,
                modifier: 2.5,
                slideShadows: false,
              }}
              navigation={{
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
              }}
              pagination={{
                clickable: true,
                renderBullet: function (index, className) {
                  return `<span class="${className} ${
                    activeIndex === index ? "w-4 bg-black" : "w-2 bg-gray-400"
                  } h-2 rounded-full transition-all duration-300"></span>`;
                },
              }}
              onSlideChange={handleSlideChange}
              className="relative w-full h-[500px]"
            >
              {images.map((image, index) => (
                <SwiperSlide
                  key={index}
                  className="!w-[500px] transition-all duration-500"
                >
                  {({ isActive }) => (
                    <div
                      className={`
                        relative overflow-hidden rounded-lg transition-all duration-500
                        ${
                          isActive
                            ? "lg:scale-110 shadow-xl"
                            : "lg:scale-90 lg:opacity-75"
                        }
                      `}
                      style={{ width: "500px", height: "400px" }}
                    >
                      <Image
                        src={image.src}
                        alt={image.alt}
                        width={1000}
                        height={800}
                        className="object-cover w-full h-full"
                        quality={100}
                        priority={index <= 2}
                        sizes="(max-width: 1024px) 95vw, 70vw"
                      />
                    </div>
                  )}
                </SwiperSlide>
              ))}

              {/* Custom Navigation Buttons */}
              <button className="swiper-button-prev absolute left-0 top-1/2 transform -translate-y-1/2 z-10 hidden lg:flex items-center justify-center w-12 h-12 rounded-full bg-white/80 shadow-lg hover:bg-white transition-colors">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 19.5L8.25 12l7.5-7.5"
                  />
                </svg>
              </button>
              <button className="swiper-button-next absolute right-0 top-1/2 transform -translate-y-1/2 z-10 hidden lg:flex items-center justify-center w-12 h-12 rounded-full bg-white/80 shadow-lg hover:bg-white transition-colors">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 4.5l7.5 7.5-7.5 7.5"
                  />
                </svg>
              </button>
            </Swiper>
          )}

          <style jsx global>{`
            .swiper-pagination {
              position: relative;
              margin-top: 2rem;
            }
            .swiper-pagination-bullet {
              margin: 0 4px;
            }
            .swiper-button-next::after,
            .swiper-button-prev::after {
              display: none;
            }
          `}</style>
        </div>

        {/* Grid Gallery Section */}
        <div className="w-full mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl md:text-2xl font-semibold">More Images</h2>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">
                Page {currentPage} of {totalPages}
              </span>
              <div className="flex gap-2">
                <button
                  onClick={handleGridPrev}
                  disabled={images.length <= imagesPerPage}
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-white/80 shadow-lg hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 19.5L8.25 12l7.5-7.5"
                    />
                  </svg>
                </button>
                <button
                  onClick={handleGridNext}
                  disabled={images.length <= imagesPerPage}
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-white/80 shadow-lg hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 4.5l7.5 7.5-7.5 7.5"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Array.from({ length: 8 }).map((_, index) => (
                <div
                  key={index}
                  className="aspect-square bg-gray-200 animate-pulse rounded-lg"
                />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {getCurrentGridImages().map((image, index) => (
                // <Dialog key={gridCurrentIndex + index}>
                //   <DialogTrigger asChild>
                //     <div className="aspect-square relative overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-all duration-300 group cursor-pointer">
                //       <Image
                //         src={image.src}
                //         alt={image.alt}
                //         fill
                //         className="object-cover group-hover:scale-110 transition-transform duration-300"
                //         sizes="(max-width: 768px) 50vw, 25vw"
                //       />
                //       <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
                //     </div>
                //   </DialogTrigger>

                //   <DialogContent className="max-w-4xl w-full max-h-[90vh] p-2 bg-transparent border-none shadow-none">
                //     <div className="relative w-full h-full flex items-center justify-center">
                //       <Image
                //         src={image.src}
                //         alt={image.alt}
                //         width={1200}
                //         height={900}
                //         className="max-w-full max-h-[80vh] object-contain rounded-lg"
                //         quality={100}
                //       />
                //     </div>
                //     {image.alt && (
                //       <p className="text-white text-center mt-2 text-lg">
                //         {image.alt}
                //       </p>
                //     )}
                //   </DialogContent>
                // </Dialog>

                <Dialog key={gridCurrentIndex + index}>
                  <DialogTrigger asChild>
                    <div className="aspect-square relative overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-all duration-300 group cursor-pointer">
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                        sizes="(max-width: 768px) 50vw, 25vw"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
                    </div>
                  </DialogTrigger>

                  <DialogContent className="max-w-4xl w-full max-h-[90vh] p-2 bg-transparent border-none shadow-none">
                    {/* Accessibility title, hidden visually */}
                    <VisuallyHidden>
                      <DialogTitle>{image.alt || "Image preview"}</DialogTitle>
                    </VisuallyHidden>

                    <div className="relative w-full h-full flex items-center justify-center">
                      <Image
                        src={image.src}
                        alt={image.alt}
                        width={1200}
                        height={900}
                        className="max-w-full max-h-[80vh] object-contain rounded-lg"
                        quality={100}
                      />
                    </div>
                  </DialogContent>
                </Dialog>
              ))}

              {/* Fill empty slots if needed */}
              {getCurrentGridImages().length < imagesPerPage && (
                <>
                  {Array.from({
                    length: imagesPerPage - getCurrentGridImages().length,
                  }).map((_, index) => (
                    <div
                      key={`empty-${index}`}
                      className="aspect-square bg-gray-100 rounded-lg opacity-30"
                    />
                  ))}
                </>
              )}
            </div>
          )}
        </div>

        {/* Video Modal */}
        <div className="my-5 flex item-center justify-center">
          <VideoModal
            videoUrl={
              "https://www.youtube.com/embed/q-JkiUyTaLA?si=4YudGPKpg5uGM6z4"
            }
            section="gallery"
          />
        </div>
      </div>
    </div>
  );
};

export default Gallery;
