"use client"
import { useState } from "react";
import Timeline from "./timeline"
import Image from "next/image";
import { X } from 'lucide-react';

const About = () => {
    const [selectedImage, setSelectedImage] = useState<{ src: string; alt: string; className: string; width: number; height: number; } | null>(null);
    const images = [
        {
            src: '/group.jpg',
            alt: 'Tall landscape',
            className: 'lg:row-span-2',
            width: 600,
            height: 800
        },
        {
            src: '/image 157.png',
            alt: 'Wide cityscape',
            className: 'lg:col-span-2',
            width: 600,
            height: 400
        },
        {
            src: '/IMG-20250121-WA0019.jpg',
            alt: 'Square abstract',
            className: '',
            width: 400,
            height: 400
        },
        {
            src: '/IMG-20250121-WA0026.jpg',
            alt: 'Portrait shot',
            className: 'lg:row-span-2',
            width: 400,
            height: 600
        },
        {
            src: '/IMG_1332.JPG',
            alt: 'Portrait shot',
            className: 'lg:col-span-2 hidden lg:block',
            width: 600,
            height: 400
        }
    ];

    return (
        <div className="min-h-screen lg:min-h-full lg:max-h-[1200px] w-full pb-8 sm:pb-12">
            <div className="max-w-[95vw] sm:max-w-[90vw] lg:max-w-[85vw] mx-auto py-4 sm:py-6 md:py-8">
                <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 xl:gap-12 mt-6 sm:mt-8 md:mt-12">
                    {/* Gallery Section */}
                    <div className="w-full lg:w-1/2">
                        <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 md:gap-4 auto-rows-[120px] sm:auto-rows-[150px] md:auto-rows-[180px] lg:auto-rows-[200px]">
                            {images.map((image, index) => (
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
                            A lot of DIC history
                        </p>
                        <div className="">
                            <Timeline />
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
}

export default About;