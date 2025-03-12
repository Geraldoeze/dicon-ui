"use client"

import { strapiService } from '@/services/strapiService';
import { useQuery } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

// interface TimelineItem {
//   year: string;
//   title: string;
//   description: string;
// }

// const timelineData: TimelineItem[] = [
//   {
//     year: "2001",
//     title: "Established as DIS",
//     description: "The Defence Intelligence College (DIC) hitherto known as the Defence Intelligence School (DIS) was established in 2001. At inception it was located at a temporary site within the Headquarters of the Defence Intelligence Agency (DIA) in Bonny Camp Lagos."
//   },
//   {
//     year: "2008",
//     title: "Campus Relocation",
//     description: "The college relocated to a permanent site in Victoria Island, expanding its facilities to accommodate more students and programs."
//   },
//   {
//     year: "2015",
//     title: "Curriculum Expansion",
//     description: "Major curriculum overhaul introducing new specialized courses in cyber intelligence and digital forensics."
//   },
//   {
//     year: "2023",
//     title: "Modern Era",
//     description: "Achieved full digitalization of learning systems and international accreditation for all programs."
//   }
// ];

const Timeline = () => {
  const [activeIndex, setActiveIndex] = useState(0);


  const { data: timeline } = useQuery({
    queryKey: ['timeline'],
    queryFn: () => strapiService.getAbout()
  })


  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      {/* Timeline Header */}
      <div className="flex justify-between items-center mb-12">
        {timeline?.data[0].history_content.map((item, index) => (
          <div
            key={item.year}
            className="relative flex flex-col items-center"
          >
            {/* Connector Line */}
            {index < timeline?.data[0].history_content.length - 1 && (
              <div className="absolute w-full h-1 bg-gray-200 top-5 left-1/2">
                <motion.div
                  className="h-full bg-blue-500"
                  initial={{ width: "0%" }}
                  animate={{
                    width: activeIndex > index ? "100%" : "0%"
                  }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            )}

            {/* Timeline Node */}
            <motion.button
              className={`relative z-10 w-10 h-10 rounded-full border-4 
                border-white shadow-lg cursor-pointer
                ${activeIndex === index ? 'bg-blue-500' : 'bg-gray-200'}`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveIndex(index)}
            >
              <motion.div
                className="absolute inset-0 rounded-full bg-blue-500"
                initial={{ scale: 0 }}
                animate={{
                  scale: activeIndex === index ? 1 : 0
                }}
                transition={{ duration: 0.2 }}
              />
            </motion.button>

            {/* Year Label */}
            <motion.p
              className={`mt-4 font-semibold text-sm sm:text-base
                ${activeIndex === index ? 'text-blue-500' : 'text-gray-500'}`}
              animate={{
                scale: activeIndex === index ? 1.1 : 1
              }}
            >
              {item.year}
            </motion.p>
          </div>
         ))}
      </div>

      {/* Content Section */}
      
      <div className="relative h-48 sm:h-40" >
     
        <AnimatePresence mode='wait' >
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="absolute w-full"
          >
             {/* {timeline?.data[0].history_content.map((item) => ( */}
            <div 
            // key={timeline?.data[0].history_content.year}
            >
            <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">
              {timeline?.data[0].history_content[activeIndex].title}
            </h3>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed max-w-3xl">
              {timeline?.data[0].history_content[activeIndex].description}
            </p>
            </div>
            {/* ))} */}
          </motion.div>
        </AnimatePresence>
        
      </div>
       
    </div>
  );
};

export default Timeline;