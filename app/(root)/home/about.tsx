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
            className: 'md:row-span-2',
            width: 600,
            height: 800
        },
        {
            src: '/image 157.png',
            alt: 'Wide cityscape',
            className: 'md:col-span-2',
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
            className: 'md:row-span-2',
            width: 400,
            height: 600
        },
        {
            src: '/IMG_1332.JPG',
            alt: 'Portrait shot',
            className: 'md:col-span-2 hidden md:block',
            width: 600,
            height: 400
        }
    ];

    return (
        <div className="md:min-h-screen w-full">
            <div className="max-w-[90vw] lg:max-w-[80vw] mx-auto py-3 md:py-8">
                <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 mt-10 md:mt-20 ">
                    {/* Gallery Section */}
                    <div className="w-full lg:w-1/2">
                        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 auto-rows-[150px] md:auto-rows-[200px]">
                            {images.map((image, index) => (
                                <div
                                    key={index}
                                    className={`group relative overflow-hidden rounded-lg shadow-lg cursor-pointer ${image.className}`}
                                    onClick={() => setSelectedImage(image)}
                                >
                                    <div className="relative w-full h-full">
                                        <Image
                                            src={image.src}
                                            alt={image.alt}
                                            fill
                                            sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 25vw"
                                            className="object-cover transition-transform duration-300 group-hover:scale-110"
                                            priority={index === 0}
                                        />
                                    </div>
                                    
                                    {/* Hover Overlay */}
                                    <div className="absolute inset-0 bg-black/0 hover:bg-black/30 transition-colors duration-300" />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* About Content Section */}
                    <div className="w-full lg:w-1/2 md:pt-6 px-6">
                        <h1 className="text-2xl md:text-3xl lg:text-4xl text-center md:text-start font-semibold">About Us</h1>
                        <p className="text-lg md:text-xl mt-4 md:mb-6 text-center md:text-start">A lot of DIC history</p>
                        <div className="md:mt-6 mt-0">
                            <Timeline />
                        </div>
                    </div>
                </div>
            </div>

            {/* Full Screen Modal */}
            {selectedImage && (
                <div 
                    className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
                    onClick={() => setSelectedImage(null)}
                >
                    <button 
                        className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
                        onClick={(e) => {
                            e.stopPropagation();
                            setSelectedImage(null);
                        }}
                    >
                        <X size={32} />
                    </button>
                    
                    <div className="relative w-[85vw] h-[85vh] max-w-6xl">
                        <Image
                            src={selectedImage.src}
                            alt={selectedImage.alt}
                            fill
                            sizes="85vw"
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