"use client";

import { useState } from "react";
import Image from "next/image";

const imagesArray = [
  {
    image: "/about/004.jpeg",
    title: "Director Center for Strategic studies ",
    name: "Mr Kenneth Iheasirim",
    role: "(Director)",
  },
  {
    image: "/about/005.jpeg",
    title: "Principal Staff Officer Training ",
    name: "Lt Col BA Abibo",
    role: "",
  },
  {
    image: "/about/008.jpeg",
    title: "Chief Instructor General Studies",
    name: "Mrs OE Oyediran",
    role: "(Ast Director)",
  },
  {
    image: "/about/006.jpeg",
    title: "Chief Instructor Joint Military Attachè ",
    name: "Mr OJ Anyiam",
    role: "(Ast Director)",
  },
  {
    image: "/about/007.jpeg",
    title: "Chief Instructor Technical ",
    name: "Mr AA Ayodele",
    role: "(Ast Director)",
  },
  {
    image: "/about/009.jpeg",
    title: "Chief Instructor Counter Intelligence",
    name: "Mr CT Ezema",
    role: "(Ast Director)",
  },
  {
    image: "/about/011.jpeg",
    title: "Chief Instructor Professional Studies ",
    name: "Mrs EA Andre",
    role: "(CDIO)",
  },
  {
    image: "/about/010.jpeg",
    title: "Chief Instructor Languages ",
    name: "Mrs IA Ogah",
    role: "(SDIO)",
  },
];

const AboutUs = () => {
  return (
    <div className="bg-gray-50 text-slate-800">
      {/* Hero Section */}
      <div className="relative w-full px-6 lg:px-12 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-4xl font-bold  text-center my-12">
            College Management Team
          </div>

          {/* Commandant Section */}
          <div className="flex flex-col items-center space-y-12">
            <div className="text-center">
              <h3 className="font-bold text-2xl text-slate-900 mb-4">
                COMMANDANT
              </h3>
              <div className="shadow-lg rounded-xl overflow-hidden border border-slate-200 bg-white">
                <Image
                  src="/001.jpeg"
                  alt="Commandant"
                  width={650}
                  height={650}
                />
              </div>
            </div>

            {/* Deputy Commandant */}
            <div className="text-center max-w-md">
              <h3 className="font-bold text-2xl text-slate-900 mb-4">
                DEPUTY COMMANDANT
              </h3>
              <div className="shadow-lg rounded-xl border border-slate-200 p-4 bg-white">
                <Image
                  src="/002.jpeg"
                  alt="Deputy"
                  width={450}
                  height={450}
                  className="rounded-md"
                />
                <p className="text-center font-medium text-base lg:text-lg text-slate-800 mt-4">
                  <strong> Gp Capt MF BORGU</strong>
                  <br />
                  MSS psc fawc mni fsi MNARC mnim spsp
                  <br />
                  BSc PGDLT MIADS
                </p>
              </div>
            </div>

            {/* Director of Studies */}
            <div className="text-center max-w-md">
              <h3 className="font-bold text-2xl text-slate-900 mb-4">
                DIRECTOR OF STUDIES
              </h3>
              <div className="shadow-lg rounded-xl border border-slate-200 p-4 bg-white">
                <Image
                  src="/about/003.jpeg"
                  alt="Director of Studies"
                  width={450}
                  height={450}
                  className="rounded-md"
                />
                <div className="mt-4">
                  <h6 className="text-lg text-slate-800 font-semibold">
                    Mr JA Nyam
                  </h6>
                  <p className="text-slate-700 font-medium">(Director)</p>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Staff Cards */}
          <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {imagesArray.map((data, id) => (
              <div
                key={id}
                className="bg-white rounded-xl shadow-lg border border-slate-200 p-4 flex flex-col items-center"
              >
                <h6 className="text-center text-lg font-semibold uppercase text-slate-800 mb-2 min-h-[60px]">
                  {data.title}
                </h6>
                <div className="w-full overflow-hidden rounded-md mb-4">
                  <Image
                    src={data.image}
                    alt={data.name || `person-${id}`}
                    width={300}
                    height={300}
                    className="rounded-md object-cover w-full h-auto"
                  />
                </div>
                {data.name && (
                  <h6 className="text-slate-900 font-semibold text-center">
                    {data.name}
                  </h6>
                )}
                <p className="text-slate-700 font-medium text-center">
                  {data.role}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
