"use client"
import { useState } from 'react';
import Image from 'next/image';

type GalleryImage = {
    id: string;
    src: string;
    alt: string;
  }
  
interface GalleryProps {
  images: GalleryImage[];
  title?: string;
  subtitle?: string;
}

const Gallery = ({ images, title = "Gallery", subtitle = "Take a look at some of our shots" }: GalleryProps) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <div className="min-h-screen relative bg-[url('/misionvision-bg.jpg')] bg-cover bg-center">
        <div className="absolute bg-gray-50/80 inset-0 opacity-10"></div>
        <div className="max-w-[80vw] mx-auto relative z-1 py-5">
    <div className="w-full py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-2">{title}</h2>
          <p className="text-lg text-gray-600">{subtitle}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((image) => (
            <div 
              key={image.id}
              className="relative aspect-square hexagon overflow-hidden cursor-pointer transform transition-transform hover:scale-105"
              onClick={() => setSelectedImage(image.id)}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          ))}
        </div>

        {/* Modal for enlarged image view */}
        {selectedImage && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
            onClick={() => setSelectedImage(null)}
          >
            <div className="relative w-11/12 md:w-4/5 lg:w-3/4 aspect-video">
              <Image
                src={images.find(img => img.id === selectedImage)?.src || ''}
                alt={images.find(img => img.id === selectedImage)?.alt || ''}
                fill
                className="object-contain"
                sizes="100vw"
              />
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .hexagon {
          clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
        }
      `}</style>
    </div>
    </div>
    </div>
  );
};

export default Gallery;