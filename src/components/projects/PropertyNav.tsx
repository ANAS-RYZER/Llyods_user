"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import {
  Building,
  Home,
  Layers,
  Layers2,
  Map,
  SearchIcon,
  SquareStack,
  TreePalm,
} from "lucide-react";
import { Input } from "../ui/input";

const navItems = [
  { id: "all", name: "All", icon: <Layers2 />, length: 0 },
  { id: "commercial", name: "Comericial", icon: <Building />, length: 0 },
  {
    id: "holiday-homes",
    name: "Holiday Homes",
    icon: <TreePalm />,
  },
  {
    id: "residential",
    name: "Residential",
    icon: <Home />,
  },
  {
    id: "land-parcel",
    name: "Land Parcel",
    icon: <Map />,
  },
];

// Custom debounce hook
const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
};

const ProjectNav = ({ onSearch, searchQuery }: { onSearch: (query: string) => void; searchQuery: string }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialTab = searchParams?.get("assetCategory") || navItems[0].id;
  const [activeTab, setActiveTab] = useState(initialTab);
  const [searchInput, setSearchInput] = useState(searchQuery);
  const debouncedSearchQuery = useDebounce(searchInput, 500); 
  
  useEffect(() => {
    onSearch(debouncedSearchQuery);
  }, [debouncedSearchQuery, onSearch]);

  const updateSearchParams = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams?.toString() || "");
    params.set(key, value);
    router.replace(`?${params.toString()}`);
  };

  const handleTabChange = (id: string) => {
    setActiveTab(id);
    updateSearchParams("assetCategory", id);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  return (
    <div className="flex flex-col space-y-2 w-full justify-center items-center">
      <div className="w-[65%] flex items-center justify-center">
        <div className="relative w-full bg-white rounded-full ">
          <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <Input
            type="search"
            placeholder="Search by location, project name, etc."
            value={searchInput}
            onChange={handleSearch}
            className="w-full rounded-full h-14  pl-12"
          />
        </div>
      </div>

      <div className="flex bg-transparent shadow-none w-full items-center justify-center rounded-none overflow-x-auto">
        <div className="border-b border-gray-300 flex items-center space-x-8 justify-center">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleTabChange(item.id)}
              className="w-32 min-w-max flex flex-col items-center justify-center"
            >
              <div className={`flex flex-row items-center justify-center  gap-1 py-4 ${activeTab === item.id ? "border-b-2 border-purple-500" : "border-b-2 border-b-transparent"}`}>
                <span
                  className={`duration-300 linear transition-all 
                            ${activeTab === item.id ? "text-purple-500" : "text-gray-500"}`}
                >
                  {item.icon}
                </span>
                <span
                  className={`text-sm duration-300 linear transition-all ${
                    activeTab === item.id
                      ? "font-semibold text-purple-500"
                      : "text-gray-600"
                  }`}
                >
                  {item.name}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectNav;
