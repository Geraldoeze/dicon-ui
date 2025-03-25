"use client"

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { strapiService } from "@/services/strapiService";

// Import fallback images
import commandant from '@/public/commandant.jpg';
import img from '@/public/22-24.jpg';
import img2 from '@/public/22.jpg';
import img3 from '@/public/20-22.jpg';

// Define proper types for the Strapi response
interface CommandantImage {
  url: string;
  width: number;
  height: number;
  alternativeText?: string;
}

interface CommandantPerson {
  name: string;
  qualifications: string;
  status?: string;
  date?: string;
}

interface CommandantData {
  commandants: CommandantPerson[];
  images: CommandantImage[];
}

interface StrapiResponse {
  data: CommandantData[];
}

const Commandants = () => {
  // Use proper typing for the query response
  const { data: commandantData
    // , isLoading, isError 
  } = useQuery({
    queryKey: ['Commandants'],
    queryFn: () => strapiService.getCommandants(),
  });

  // Helper function to properly format Strapi image URLs
  const getStrapiImageUrl = (url?: string): string => {
    if (!url) return '';
    
    // If the URL already starts with http/https, it's already a full URL
    if (url.startsWith('http')) {
      return url;
    }
    
    // Get the base Strapi URL
    const strapiBaseUrl = 'https://dic-strapi.onrender.com';
    
    // If the URL already includes /uploads, it's a relative path from Strapi
    if (url.startsWith('/uploads')) {
      return `${strapiBaseUrl}${url}`;
    }
    
    // Otherwise, assume it needs the full path structure
    return `${strapiBaseUrl}${url}`;
  };

  // Define a component for individual commandant profile to reduce repetition
  const CommandantProfile = ({
    imageIndex,
    commandantIndex,
    fallbackImage,
    defaultName,
    defaultQualifications,
    defaultStatus,
    defaultDate
  }: {
    imageIndex: number;
    commandantIndex: number;
    fallbackImage: any;
    defaultName: string;
    defaultQualifications: string;
    defaultStatus?: string;
    defaultDate?: string;
  }) => {
    const data = commandantData?.data?.[0];
    const image = data?.images?.[imageIndex];
    const person = data?.commandants?.[commandantIndex];

    return (
      <div className="p-4">
        <div className="max-w-[300px] min-h-[200px]">
          {image?.url ? (
            <Image 
              src={getStrapiImageUrl(image.url)} 
              alt={person?.name || defaultName}
              width={image.width || 800}
              height={image.height || 1000}
              className="w-full h-auto"
            />
          ) : (
            <Image 
              src={fallbackImage} 
              alt={defaultName} 
              className="w-full h-auto"
              priority={commandantIndex === 0} // Prioritize loading the current commandant
            />
          )}
        </div>
        <div className="text-center flex flex-col gap-y-2">
          <h2 className="text-lg font-semibold uppercase">
            {person?.name || defaultName}
          </h2>
          <p className="text-gray-600 font-normal text-sm max-w-sm">
            {person?.qualifications || defaultQualifications}
          </p>
          {(person?.status || defaultStatus) && (
            <p className="text-gray-600 font-normal text-sm uppercase">
              {person?.status || defaultStatus}
            </p>
          )}
          {(person?.date || defaultDate) && (
            <p className="text-gray-600 font-normal text-sm">
              {person?.date || defaultDate}
            </p>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen lg:min-h-full xl:max-h-[1400px] relative bg-[url('/commandants-bg.jpg')] bg-cover bg-center">
      <div className="absolute bg-slate-50/90 inset-0"></div>
      <div className="max-w-[80vw] mx-auto relative z-10 py-5">
        {/* Show loading state or error message if needed */}
        {/* {isLoading && (
          <div className="text-center py-8">Loading commandant data...</div>
        )} */}
        
        {/* {isError && (
          <div className="text-center py-8 text-red-600">
            Error loading commandant data. Please try again later.
          </div>
        )}
         */}
        <h1 className="text-[1.5rem] text-center md:text-[2.5rem] font-semibold my-10">
          Commandants
        </h1>
        
        {/* Current Commandant */}
        <div className="flex justify-center">
          <CommandantProfile
            imageIndex={3}
            commandantIndex={0}
            fallbackImage={commandant}
            defaultName="R ADM. P.E EFFAH"
            defaultQualifications="DSS psc(+) nwc(+) fdc MSc MLC MIAD FIIPS"
            defaultStatus="CURRENT COMMANDANT"
          />
        </div>
        
        {/* Former Commandants */}
        <div className="flex flex-col md:flex-row justify-center gap-x-5">
          <CommandantProfile
            imageIndex={1}
            commandantIndex={1}
            fallbackImage={img}
            defaultName="CDRE E.O JAIYEOLA"
            defaultQualifications="DSS psc isc mni"
            defaultDate="sep 2016 - aug 2018"
          />
          
          <CommandantProfile
            imageIndex={2}
            commandantIndex={2}
            fallbackImage={img2}
            defaultName="CDRE M.A EMUEKPERE"
            defaultQualifications="DSS psc(+) nswc MSc"
            defaultDate="sep 2018 - aug 2020"
          />
          
          <CommandantProfile
            imageIndex={0}
            commandantIndex={3}
            fallbackImage={img3}
            defaultName="CDRE M.A EMUEKPERE"
            defaultQualifications="DSS aowc MSc"
            defaultDate="sep 2020 - aug 2022"
          />
        </div>

        <div className="flex justify-center my-5">
          <a href="/commandants" className="flex gap-3 items-center bg-gray-200 hover:bg-gray-400 border-gray-600 border-2 text-black font-semibold py-2 px-4 rounded-md">
            <span className="text-[.8rem] md:text-[1rem] min-w-fit">View all Past Commandants</span> 
            <ArrowUpRight /> 
          </a>
        </div>
      </div>
    </div>
  );
};

export default Commandants;