"use client";

import { useState } from "react";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { strapiService } from "@/services/strapiService";

// const imagesArray = [
//   {
//     image: "/about/004.jpeg",
//     title: "Director Center for Strategic studies ",
//     name: "Mr Kenneth Iheasirim",
//     role: "(Director)",
//   },
//   {
//     image: "/about/005.jpeg",
//     title: "Principal Staff Officer Training ",
//     name: "Lt Col BA Abibo",
//     role: "",
//   },
//   {
//     image: "/about/008.jpeg",
//     title: "Chief Instructor General Studies",
//     name: "Mrs OE Oyediran",
//     role: "(Ast Director)",
//   },
//   {
//     image: "/about/006.jpeg",
//     title: "Chief Instructor Joint Military Attachè ",
//     name: "Mr OJ Anyiam",
//     role: "(Ast Director)",
//   },
//   {
//     image: "/about/007.jpeg",
//     title: "Chief Instructor Technical ",
//     name: "Mr AA Ayodele",
//     role: "(Ast Director)",
//   },
//   {
//     image: "/about/009.jpeg",
//     title: "Chief Instructor Counter Intelligence",
//     name: "Mr CT Ezema",
//     role: "(Ast Director)",
//   },
//   {
//     image: "/about/011.jpeg",
//     title: "Chief Instructor Professional Studies ",
//     name: "Mrs EA Andre",
//     role: "(CDIO)",
//   },
//   {
//     image: "/about/010.jpeg",
//     title: "Chief Instructor Languages ",
//     name: "Mrs IA Ogah",
//     role: "(SDIO)",
//   },
// ];


const AboutUs = () => {

  const { data: mv } = useQuery({
    queryKey: ['mv'],
    queryFn: () => strapiService.getMV()
  })

  return (
    <div className="min-h-screen lg:min-h-full relative bg-[url('/misionvision-bg.jpg')] bg-cover bg-center">
      {/* Hero Section */}
      <div className="relative w-full px-6 lg:px-12 py-12">
        <div className="max-w-6xl mx-auto">
          <h3 className="font-bold text-slate-900 text-3xl lg:text-5xl mb-6 text-center">
            About Us
          </h3>
          <div className="">
            <div>
              <p className="text-base lg:text-lg text-slate-700 font-medium leading-relaxed">
                The Defence Intelligence College (DIC) hitherto known as the
                Defence Intelligence School (DIS) was established in 2001. At
                inception it was located at a temporary site within the
                Headquarters of the Defence Intelligence Agency (DIA) in Bonny
                Camp Lagos. However, due to the need for a large space and
                conducive environment, the school was relocated to its present
                location in Karu a suburb of Federal Capital Territory Abuja in
                October 2005. The objective of the relocation was to reposition
                the school with a focus on capacity building in support of DIA
                and the Armed Forces of Nigeria (AFN) through the provision of
                real-time defence intelligence to enhance national security. The
                nomenclature of the school was subsequently changed to Defence
                Intelligence College in March 2013 thereby encapsulating the
                vision of the Agency which is to make the College a citadel of
                intelligence and security training in Nigeria. The college has
                trained personnel drawn from DIA, Nigeria Armed Forces,
                Paramilitary Organisations and Staff of Ministries Department
                and Agencies. It also pertinent to state that the College has
                trained allied officers from Niger, Chad, Benin Republic and
                Ghana.{" "}
              </p>
            </div>
          </div>

          {mv?.data.map((item, index) => (
          <div key={index}>
          {/* Vision Statement */}
          <div className="border-2 bg-white shadow-xl  rounded p-6 max-w-2xl mx-auto my-8 ">
            <h3 className="font-bold text-3xl mb-4 text-center   rounded-t-md py-3">
              Vision Statement
            </h3>
            <p className="text-lg lg:text-xl text-slate-900 text-center font-medium">
              {item.visionText}
            </p>
          </div>

          {/* Mission Statement */}
          <div className="my-16 space-y-12">
            <div className="border-2 bg-white rounded p-6 max-w-2xl mx-auto my-8 shadow-xl">
              <h3 className="font-bold text-3xl mb-4 text-center  rounded-t-md py-3">
                Mission Statement
              </h3>
              <p className="text-lg lg:text-xl text-slate-900 text-center font-medium">
                {item.missionText}
              </p>
            </div>
          </div>
          </div>
          ))}


          <div className="my-4 flex justify-center">
            <Image
              src="/001.jpeg"
              alt="Commandant"
              width={550}
              height={550}
              className="shadow-lg rounded-xl overflow-hidden border border-slate-200 bg-white"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
