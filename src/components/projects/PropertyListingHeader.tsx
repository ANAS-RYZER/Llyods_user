"use client";

import React, { useEffect, useState } from "react";
import { Search, ArrowUpDown, ChevronDown, TrendingUp, WholeWord, EarthIcon, Globe, Timer, CircleCheck, CheckCircle, Clock } from "lucide-react";
import dynamic from 'next/dynamic';

const Select = dynamic(
  () => import("@/components/ui/select").then(mod => mod.Select),
  { ssr: false }
);
const SelectContent = dynamic(
  () => import("@/components/ui/select").then(mod => mod.SelectContent),
  { ssr: false }
);
const SelectItem = dynamic(
  () => import("@/components/ui/select").then(mod => mod.SelectItem),
  { ssr: false }
);
const SelectTrigger = dynamic(
  () => import("@/components/ui/select").then(mod => mod.SelectTrigger),
  { ssr: false }
);
const SelectValue = dynamic(
  () => import("@/components/ui/select").then(mod => mod.SelectValue),
  { ssr: false }
);

// Define an interface for sort options to improve type safety
interface SortOption {
  value: string;
  label: string;
  icon?: React.ReactNode;
}

interface ProjectsListingHeaderProps {
  onSearch: (query: string) => void;
  onSort: (value: string) => void;
  currentSort: string;
  searchQuery?: string;
}

const SORT_OPTIONS: SortOption[] = [
  { value: "high-return", label: "High returns" },
  { value: "low--return", label: "Low Returns" },
  { value: "newest", label: "Newest" },
  { value: "most-popular", label: "Most Popular" },
  { value: "price", label: "Price" },
];
const sort_by_city: SortOption[] = [
  { value: "all", label: "All" },
  { value: "BIR", label: "BIR" },
  { value: "MIA", label: "MIA" }
]
const sort_by_new: SortOption[] = [
  { value: "active-assets", label: "Active Assets", icon: <Clock className="text-blue-500" size={16} /> },
  { value: "completed-assets", label: "Completed Assets", icon: <CircleCheck className="text-green-500" size={16} /> },
]

const ProjectsListingHeader: React.FC<ProjectsListingHeaderProps> = ({
  onSort,
}) => {


  const handleSortChange = React.useCallback(
    (value: string) => {
      console.log("Selected sort value:", value);
      onSort(value);
    },
    [onSort]
  );



  return (
    <div className="w-full">
      <div className="container mx-auto py-4 flex justify-between items-center">
        <div className="flex items-center justify-center gap-2">
          <TrendingUp className="text-gray-800" />
          <h2 className="text-sm lg:text-xl font-bold text-gray-800">
            Trending Assets
          </h2>
        </div>

        <div className="flex items-center justify-center gap-2">
          <div className="flex items-center justify-center gap-2">
            <Select onValueChange={handleSortChange} defaultValue="all">
              <SelectTrigger className="w-full bg-transparent focus:ring-0 border-gray-300 hover:bg-gray-50">
                <p className="text-gray-500 flex items-center gap-1">
                  <Globe className="w-4 h-4 text-gray-700" />
                </p>
                <SelectValue placeholder="Sort by: " />
              </SelectTrigger>

              <SelectContent>
                {sort_by_city.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    <p className="pl-2">{option.label}</p>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center">
            <Select onValueChange={handleSortChange} defaultValue={"active-assets"}>
              <SelectTrigger className="w-full rounded-lg bg-transparent focus:ring-0 border-gray-300 hover:bg-gray-50">
                <p className="text-gray-500 flex items-center gap-1">
                </p>
                <SelectValue placeholder="Sort by: " />
              </SelectTrigger>
              <SelectContent>
                {sort_by_new.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    <div className="pl-2 flex items-center justify-start gap-1">
                      {/* {option.icon} */}
                      {option.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center">
            <Select onValueChange={handleSortChange} defaultValue={"high-return"}>
              <SelectTrigger className="w-full rounded-lg bg-transparent focus:ring-0 border-gray-300 hover:bg-gray-50">
                <p className="text-gray-500 flex items-center gap-1">
                  <ArrowUpDown className="w-4 h-4 text-gray-700" />
                </p>
                <SelectValue placeholder="Sort by: " />
              </SelectTrigger>
              <SelectContent>
                {SORT_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    <p className="pl-2">{option.label}</p>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectsListingHeader;
