"use client";

import { strapiService } from "@/services/strapiService";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, PartyPopper } from "lucide-react";

const InformationHeader = () => {
  const { data: info } = useQuery({
    queryKey: ["info"],
    queryFn: () => strapiService.getInfo(),
  });
  return (
    <div>
      <div className="w-full text-center bg-indigo-600 flex items-center justify-center h-12">
        <a href="/apply" className="flex items-center gap-x-1 md:gap-x-2">
          <PartyPopper className="text-green-400" />
          {info?.data.map((info) => (
            <div key={info.id}>
              <p className="flex items-center gap-x-1 md:gap-x-2 text-white text-xs md:text-base font-semibold max-w-[70vw] custom-ping">
                {info.advertisement} <ArrowRight />
              </p>
            </div>
          ))}
        </a>
      </div>
    </div>
  );
};

export default InformationHeader;
