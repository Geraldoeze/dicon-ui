"use client"

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

const CommandantsGrid = () => {
  
  const allCommandants = [
    {
      id: 1,
      name: 'R ADM. P.E EFFAH',
      title: 'DSS psc(+) mwc(+) fdc MSc MLC MIAD FIIPS',
      period: 'JUL 22 - JUL 24',
      imageUrl: '/22-24.jpg',
    },
    {
      id: 2,
      name: 'CDRE EO JAIYEOLA',
      title: 'DSS psc ISC DMI',
      period: 'SEP 22 - JUL 22',
      imageUrl: '/22.jpg',
    },
    {
      id: 3,
      name: 'CDRE MA EMUEKPERE',
      title: 'DSS psc(+) mni MSc',
      period: 'OCT 20 - SEP 22',
      imageUrl: '/20-22.jpg',
    },
    {
      id: 4,
      name: 'CDRE AS ABDULKABIR',
      title: 'DSS mni MSc',
      period: 'SEP 18 - OCT 20',
      imageUrl: '/18-20.jpg',
    },
    {
      id: 5,
      name: 'R ADM EA ZIPELE',
      title: 'DSS psc (+) mni FIIPS',
      period: 'JUL 16 - SEP 18',
      imageUrl: '/16-18.jpg',
    },
    {
      id: 6,
      name: 'CDRE AT OLAWUNMI',
      title: 'DSS psc(+) fwc PhD',
      period: 'FEB 15 - MAR 16',
      imageUrl: '/15-16.jpg',
    },
    {
      id: 7,
      name: 'CDRE DH MOSES',
      title: 'DSS psc(+) MSc MSc MIAD mni',
      period: 'APR 13 - SEP 15',
      imageUrl: '/1-16.jpg',
    },
    {
      id: 8,
      name: 'R ADM MG OAMEN',
      title: 'DSS psc(+) mni(+) MSc MIAD DMW',
      period: 'APR 12 - FEB 13',
      imageUrl: '/12-13.jpg',
    },
    {
      id: 9,
      name: 'CDRE AM IBRAHIM',
      title: 'DSS psc BSc Navy MASSS mni',
      period: 'NOV 10 - APR 12',
      imageUrl: '/10-12.jpg',
    },
    {
      id: 10,
      name: 'CDRE SH USMAN',
      title: 'DSS psc FWC MSc',
      period: 'JAN 9 - MAR 10',
      imageUrl: '/9-10.jpg',
    },
    {
        id: 11,
        name: 'CDRE SH USMAN',
        title: 'DSS psc FWC MSc',
        period: 'JAN 7 - MAR 9',
        imageUrl: '/7-9.jpg',
    },
    {
        id: 12,
        name: 'CDRE SH USMAN',
        title: 'DSS psc FWC MSc',
        period: 'JAN 19 - MAR 19',
        imageUrl: '/22-24.jpg',
      },

  ];

  const [visibleCount, setVisibleCount] = useState(9);
  const hasMore = visibleCount < allCommandants.length;

  const handleLoadMore = () => {
    setVisibleCount(prev => Math.min(prev + 9, allCommandants.length));
  };

  return (
    <div className="">
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Background with Overlay */}
      <div 
        className={`absolute inset-0 bg-[url('/IMG_6042.JPG')] bg-cover bg-center`}
      >
        <div className="absolute inset-0 bg-slate-950/50 backdrop-blur-xs" />
      </div>

      {/* Main Content Container */}
      <div className="relative h-screen max-w-[85vw] mx-auto">
        
        {/* Center Content Section */}
        <div className="absolute top-[80%] -translate-y-1/2  
          max-w-2xl md:max-w-3xl">
          {/* Title Section */}
          <h1 className="hero-title text-3xl sm:text-4xl md:text-5xl lg:text-7xl 
            font-semibold text-white my-2">
            Our Commandants
          </h1>

          {/* Subtitle Section */}
            <p className="hero-subtitle text-base sm:text-lg md:text-xl lg:text-2xl 
              text-white/90 max-w-xl">
             Here is the museum of our commandants, present and past.
            </p>
          
    </div>
    </div>
    </div>

    <div className="max-w-7xl mx-auto min-h-screen px-4 py-8">
      <h1 className="text-3xl font-bold text-center my-10">Our Commandants</h1>

      <div className="flex justify-center my-5">
      <Card className="bg-white shadow-lg">
            <CardContent className="p-4">
              <div className="aspect-[3/4] relative mb-4">
                <Image
                  src="/commandant.jpg"
                  alt= "commandant"
                  className="w-full h-full object-cover"
                  width={300}
                  height={300}
                />
              </div>
              <div className="text-center">
                <h3 className="font-bold text-lg"></h3>
                <p className="text-sm text-gray-600 mt-1"></p>
                
                  <p className="text-sm font-semibold text-blue-600 mt-1">
                    CURRENT COMMANDANT
                  </p>
              
              </div>
            </CardContent>
          </Card>
          </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {allCommandants.slice(0, visibleCount).map((commandant) => (
          <Card key={commandant.id} className="bg-white shadow-lg">
            <CardContent className="p-4">
              <div className="aspect-[3/4]  relative mb-4">
                <Image
                  src={commandant.imageUrl}
                  alt={commandant.name}
                  className="w-full h-full object-cover"
                  width={300}
                  height={300}
                />
              </div>
              <div className="text-center">
                <h3 className="font-bold text-lg">{commandant.name}</h3>
                <p className="text-sm text-gray-600 mt-1">{commandant.title}</p>
                {commandant.role ? (
                  <p className="text-sm font-semibold text-blue-600 mt-1">
                    {commandant.role}
                  </p>
                ) : (
                  <p className="text-sm text-gray-500 mt-1">{commandant.period}</p>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {hasMore && (
        <div className="text-center mt-8">
          <Button
            onClick={handleLoadMore}
            className="bg-[#2D2F93] hover:bg-indigo-900 text-white px-10 py-2"
          >
            View More
          </Button>
        </div>
      )}
    </div>
    </div>
  );
};

export default CommandantsGrid;