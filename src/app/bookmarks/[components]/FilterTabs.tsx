"use client";

import { Button } from "@/components/ui/button";
import { Building, Home, Map, SquareStack, TreePalm } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const navItems = [
  { id: "all", name: "All", length: 0 },
  { id: "commercial", name: "Comericial", length: 0 },
  {
    id: "holiday-homes",
    name: "Holiday Homes",
  },
  {
    id: "residential",
    name: "Residential",
  },
  {
    id: "land-parcel",
    name: "Land Parcel",
  },
];
const FilterTabs = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialTab = searchParams?.get("assetCategory") || navItems[0].id;
  const [activeTab, setActiveTab] = useState(initialTab);

  const updateSearchParams = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams?.toString() || "");
    params.set(key, value);
    router.replace(`?${params.toString()}`);
  };

  const handleTabChange = (id: string) => {
    setActiveTab(id);
    updateSearchParams("assetCategory", id);
  };
  return (
    <div className="flex items-center gap-2 mt-5">
      {navItems.map((item) => (
        <Button
          key={item.id}
          onClick={() => handleTabChange(item.id)}
          className={`${
            activeTab === item.id
              ? "bg-violet-500 text-white"
              : "text-black bg-white border-black"
          } min-w-max flex flex-col items-center justify-center hover:text-white`}
        >
          {item.name}
        </Button>
      ))}
    </div>
  );
};
export default FilterTabs;
