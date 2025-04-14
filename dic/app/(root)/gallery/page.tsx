"use client";

import { useState } from "react";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { strapiService } from "@/services/strapiService";
import { useApiLoader } from "@/hooks/use-api-loader";
import Gallery from "../home/gallery";
const DICGallery = () => {
  const [activeTab, setActiveTab] = useState<string | null>(null);

  // Set first department as default active tab

  return <Gallery />;
};

export default DICGallery;
