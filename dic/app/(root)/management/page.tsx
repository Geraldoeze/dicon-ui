"use client";

import { useState } from "react";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { strapiService } from "@/services/strapiService";
import { useApiLoader } from "@/hooks/use-api-loader";

const AboutUs = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["management"],
    queryFn: () => strapiService.getManagement(),
  });

  useApiLoader(isLoading);

  // Extract management data
  const managementData = data?.data?.[0] || {
    commandantdetails: [],
    deputycommandantdetails: [],
    directorofstudiesdetails: [],
    otherstaffs: []
  };

  const commandant = managementData.commandantdetails?.[0];
  const deputyCommandant = managementData.deputycommandantdetails?.[0];
  const directorOfStudies = managementData.directorofstudiesdetails?.[0];
  const otherStaffs = managementData.otherstaffs || [];

  return (
    <div className="bg-gray-50 text-slate-800">
      {/* Hero Section */}
      <div className="relative w-full px-6 lg:px-12 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-4xl font-bold text-center my-12">
            College Management Team
          </div>

          <div className="flex flex-col items-center space-y-12">
            {/* Commandant Section */}
            {commandant && (
              <div className="text-center">
                <h3 className="font-bold text-2xl text-slate-900 mb-4">
                  {commandant.header}
                </h3>
                <div className="shadow-lg rounded-xl overflow-hidden border border-slate-200 bg-white">
                  <Image
                    src={commandant.image}
                    alt={commandant.header}
                    width={650}
                    height={650}
                  />
                  {commandant.name && (
                    <div className="p-4">
                      <h6 className="text-lg text-slate-800 font-semibold">
                        {commandant.name}
                      </h6>
                      {commandant.qualifications && (
                        <p className="text-slate-700 font-medium">
                          {commandant.qualifications}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Deputy Commandant */}
            {deputyCommandant && (
              <div className="text-center max-w-md">
                <h3 className="font-bold text-2xl text-slate-900 mb-4">
                  {deputyCommandant.header}
                </h3>
                <div className="shadow-lg rounded-xl border border-slate-200 p-4 bg-white">
                  <Image
                    src={deputyCommandant.image}
                    alt={deputyCommandant.header}
                    width={450}
                    height={450}
                    className="rounded-md"
                  />
                  <p className="text-center font-medium text-base lg:text-lg text-slate-800 mt-4">
                    <strong>{deputyCommandant.name}</strong>
                    {deputyCommandant.qualifications && (
                      <>
                        <br />
                        {deputyCommandant.qualifications}
                      </>
                    )}
                    {deputyCommandant.secondary_qualifications && (
                      <>
                        <br />
                        {deputyCommandant.secondary_qualifications}
                      </>
                    )}
                  </p>
                </div>
              </div>
            )}

            {/* Director of Studies */}
            {directorOfStudies && (
              <div className="text-center max-w-md">
                <h3 className="font-bold text-2xl text-slate-900 mb-4">
                  {directorOfStudies.header}
                </h3>
                <div className="shadow-lg rounded-xl border border-slate-200 p-4 bg-white">
                  <Image
                    src={directorOfStudies.image}
                    alt={directorOfStudies.header}
                    width={450}
                    height={450}
                    className="rounded-md"
                  />
                  <div className="mt-4">
                    <h6 className="text-lg text-slate-800 font-semibold">
                      {directorOfStudies.name}
                    </h6>
                    <p className="text-slate-700 font-medium">{directorOfStudies.role}</p>
                    {directorOfStudies.qualifications && (
                      <p className="text-slate-700">{directorOfStudies.qualifications}</p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Additional Staff Cards */}
          {otherStaffs.length > 0 && (
            <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherStaffs.map((staff, id) => (
                <div
                  key={id}
                  className="bg-white rounded-xl shadow-lg border border-slate-200 p-4 flex flex-col items-center"
                >
                  <h6 className="text-center text-lg font-semibold uppercase text-slate-800 mb-2 min-h-[60px]">
                    {staff.title}
                  </h6>
                  <div className="w-full overflow-hidden rounded-md mb-4">
                    <Image
                      src={staff.image}
                      alt={staff.name || `person-${id}`}
                      width={300}
                      height={300}
                      className="rounded-md object-cover w-full h-auto"
                    />
                  </div>
                  {staff.name && (
                    <h6 className="text-slate-900 font-semibold text-center">
                      {staff.name}
                    </h6>
                  )}
                  <p className="text-slate-700 font-medium text-center">
                    {staff.role}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AboutUs;