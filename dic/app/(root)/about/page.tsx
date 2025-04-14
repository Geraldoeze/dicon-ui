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
          <h3 className="font-bold text-slate-900 text-3xl lg:text-5xl mb-6 text-center">
            About DIC
          </h3>
          <p className="text-base lg:text-lg text-slate-700 font-medium leading-relaxed">
            The Defence Intelligence College (DIC) hitherto known as the Defence
            Intelligence School (DIS) was established in 2001. At inception it
            was located at a temporary site within the Headquarters of the
            Defence Intelligence Agency (DIA) in Bonny Camp Lagos. However, due
            to the need for a large space and conducive environment, the school
            was relocated to its present location in Karu a suburb of Federal
            Capital Territory Abuja in October 2005. The objective of the
            relocation was to reposition the school with a focus on capacity
            building in support of DIA and the Armed Forces of Nigeria (AFN)
            through the provision of real-time defence intelligence to enhance
            national security. The nomenclature of the school was subsequently
            changed to Defence Intelligence College in March 2013 thereby
            encapsulating the vision of the Agency which is to make the College
            a citadel of intelligence and security training in Nigeria. The
            college has trained personnel drawn from DIA, Nigeria Armed Forces,
            Paramilitary Organisations and Staff of Ministries Department and
            Agencies. It also pertinent to state that the College has trained
            allied officers from Niger, Chad, Benin Republic and Ghana.{" "}
          </p>

          <div className="border-2 border-blue-900 bg-blue-300 rounded p-6 max-w-xl mx-auto my-8 shadow-md">
              <h3 className="font-bold text-5xl mb-4 text-center text-red-600  rounded-t-md py-3">
                Vision Statement
              </h3>
              <p className="text-lg lg:text-xl text-slate-900 text-center font-medium">
                To produce well trained, patriotic and highly motivated manpower working
                with cutting edge technology under an effective leadership in
                collaboration with friendly forces that will provide
                comprehensive and timely defence intelligence in support of
                national security strategy.
              </p>
            </div>

          {/* Mission and Vision */}
          <div className="my-16 space-y-12">
            {/* <div>
              <h3 className="font-bold text-slate-900 text-3xl mb-4 text-center">
                Mission Statement
              </h3>
              <p className="text-base lg:text-lg text-slate-700 font-medium">
                Provide security and intelligence training for all categories of
                DIA staff, personnel of the Nigerian Armed Forces and other
                security agencies, in order to enable them perform optimally
                wherever they may be deployed
              </p>
            </div> */}
            <div className="border-2 border-blue-900 bg-blue-300 rounded p-6 max-w-xl mx-auto my-8 shadow-md">
              <h3 className="font-bold text-5xl mb-4 text-center text-green-900  rounded-t-md py-3">
                Mission Statement
              </h3>
              <p className="text-lg lg:text-xl text-slate-900 text-center font-medium">
                To provide security and intelligence training for all categories of
                DIA staff, personnel of the Nigerian Armed Forces and other
                security agencies, in order to enable them perform optimally
                wherever they may be deployed.
              </p>
            </div>
            {/* <div>
              <h3 className="font-bold text-slate-900 text-3xl mb-4 text-center">
                Vision Statement
              </h3>
              <p className="text-base lg:text-lg text-slate-700 font-medium">
              Well trained, patriotic and highly motivated manpower working
                  with cutting edge technology under an effective leadership in
                  collaboration with friendly forces that will provide
                  comprehensive and timely defence intelligence in support of
                  national security strategy
              </p>
            </div> */}
           
          </div>
          <div className="text-4xl font-bold  text-center my-12">College Management Team</div>

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
