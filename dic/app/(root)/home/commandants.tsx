"use client"

import Image from "next/image";
import commandant from '@/public/commandant.jpg'
import img from '@/public/22-24.jpg'
import img2 from '@/public/22.jpg'
import img3 from '@/public/20-22.jpg'
import { ArrowUpRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { strapiService } from "@/services/strapiService";

const Commandants = () => {
  const { data: Commandant } = useQuery({
    queryKey: ['Commandants'],
    queryFn: () => strapiService.getCommandants()
  });

  // Helper function to properly format Strapi image URLs
  const getStrapiImageUrl = (url: string): string => {
    // If the URL already starts with http/https, it's already a full URL
    if (url.startsWith('http')) {
      return url;
    }
    
    // Get the base Strapi URL
    const strapiBaseUrl = 'http://localhost:1337';
    
    // If the URL already includes /uploads, it's a relative path from Strapi
    if (url.startsWith('/uploads')) {
      return `${strapiBaseUrl}${url}`;
    }
    
    // Otherwise, assume it needs the full path structure
    return `${strapiBaseUrl}${url}`;
  };

  return (
    <div className="min-h-screen lg:min-h-full xl:max-h-[1400px] relative bg-[url('/commandants-bg.jpg')] bg-cover bg-center">
        <div className="absolute bg-slate-50/90 inset-0"></div>
        <div className="max-w-[80vw] mx-auto relative z-1 py-5">
            
            <h1 className="text-[1.5rem] text-center md:text-[2.5rem] font-semibold my-10">Commandants</h1>
            <div className="flex justify-center">
                <div className="p-4">
                    <div className="max-w-[300px] min-h-[300px]">
                    {Commandant?.data?.[0]?.images?.[3] ? (
                        <Image 
                            src={getStrapiImageUrl(Commandant.data[0].images[3].url)} 
                            alt={Commandant.data[0].commandants[0].name || "Current Commandant"}
                            width={Commandant.data[0].images[3].width || 828}
                            height={Commandant.data[0].images[3].height || 1066}
                            className="w-full h-auto"
                        />
                    ) : (
                        <Image 
                            src={commandant} 
                            alt="Current Commandant" 
                            className="w-full h-auto"
                        />
                    )}
                    </div>
                    <div className="text-center flex flex-col gap-y-2">
                    <h2 className="text-lg font-semibold">{Commandant?.data?.[0]?.commandants?.[0]?.name || "R ADM. P.E EFFAH"}</h2>
                    <p className="text-gray-600 font-normal text-sm max-w-sm">{Commandant?.data?.[0]?.commandants?.[0]?.qualifications || "DSS psc(+) nwc(+) fdc MSc MLC MIAD FIIPS"} </p>
                    <p className="text-gray-600 font-normal text-sm uppercase">{Commandant?.data?.[0]?.commandants?.[0]?.status || "CURRENT COMMANDANT"}</p>
                    </div>
                </div>
            </div>

            
            <div className="flex flex-col md:flex-row justify-center gap-x-5">
                <div className="p-4">
                    <div className="max-w-[300px] min-h-[200px]">
                    {Commandant?.data?.[0]?.images?.[1] ? (
                        <Image 
                            src={getStrapiImageUrl(Commandant.data[0].images[1].url)} 
                            alt={Commandant?.data[0]?.commandants[1]?.name || "Former Commandant"}
                            width={Commandant.data[0].images[1].width || 864}
                            height={Commandant.data[0].images[1].height || 1080}
                            className="w-full h-auto"
                        />
                    ) : (
                        <Image 
                            src={img} 
                            alt="Former Commandant" 
                            className="w-full h-auto"
                        />
                    )}
                    </div>
                    <div className="text-center flex flex-col gap-y-2">
                    <h2 className="text-lg font-semibold uppercase">{Commandant?.data?.[0]?.commandants?.[1]?.name || "cdre e.o jaiyeola"}</h2>
                    <p className="text-gray-600 font-normal text-sm max-w-sm"> {Commandant?.data?.[0]?.commandants?.[1]?.qualifications || "DSS psc isc mni"} </p>
                    <p className="text-gray-600 font-normal text-sm">{Commandant?.data?.[0]?.commandants?.[1]?.date || "sep 2016 - aug 2018"}</p>
                    </div>
                </div>
                <div className="p-4">
                    <div className="max-w-[300px] min-h-[200px]">
                    {Commandant?.data?.[0]?.images?.[2] ? (
                        <Image 
                            src={getStrapiImageUrl(Commandant.data[0].images[2].url)} 
                            alt={Commandant.data[0].commandants[2].name || "Former Commandant"} 
                            width={Commandant.data[0].images[2].width || 865}
                            height={Commandant.data[0].images[2].height || 1080}
                            className="w-full h-auto"
                        />
                    ) : (
                        <Image 
                            src={img2} 
                            alt="Former Commandant" 
                            className="w-full h-auto"
                        />
                    )}
                    </div>
                    <div className="text-center flex flex-col gap-y-2">
                    <h2 className="text-lg font-semibold uppercase">{Commandant?.data?.[0]?.commandants?.[2]?.name || "cdre m.a emuekpere"}</h2>
                    <p className="text-gray-600 font-normal text-sm max-w-sm">{Commandant?.data?.[0]?.commandants?.[2]?.qualifications || "DSS psc(+) nswc MSc"}</p>
                    <p className="text-gray-600 font-normal text-sm">{Commandant?.data?.[0]?.commandants?.[2]?.date || "sep 2018 - aug 2020"}</p>
                    </div>
                </div>
                <div className="p-4">
                    <div className="max-w-[300px] min-h-[200px]">
                    {Commandant?.data?.[0]?.images?.[0] ? (
                        <Image 
                            src={getStrapiImageUrl(Commandant.data[0].images[0].url)} 
                            alt={Commandant.data[0].commandants[3].name || "Former Commandant"} 
                            width={Commandant.data[0].images[0].width || 864}
                            height={Commandant.data[0].images[0].height || 1080}
                            className="w-full h-auto"
                        />
                    ) : (
                        <Image 
                            src={img3} 
                            alt="Former Commandant" 
                            className="w-full h-auto"
                        />
                    )}
                    </div>
                    <div className="text-center flex flex-col gap-y-2">
                    <h2 className="text-lg font-semibold uppercase">{Commandant?.data?.[0]?.commandants?.[3]?.name || "cdre m.a emuekpere"}</h2>
                    <p className="text-gray-600 font-normal text-sm max-w-sm">{Commandant?.data?.[0]?.commandants?.[3]?.qualifications || "DSS aowc MSc"}</p>
                    <p className="text-gray-600 font-normal text-sm">{Commandant?.data?.[0]?.commandants?.[3]?.date || "sep 2020 - aug 2022"}</p>
                    </div>
                </div>
            </div>

            <div className="flex justify-center my-5">
                <a href="/commandants" className="flex gap-3 items-center bg-gray-200 hover:bg-gray-400 border-gray-600 border-2 text-black font-semibold py-2 px-4 rounded-md">
                <span className="text-[.8rem] md:text-[1rem] min-w-fit">View all Past Commandants</span> 
                <ArrowUpRight/> 
                </a>
            </div>
        </div>
    </div>
  )
}

export default Commandants