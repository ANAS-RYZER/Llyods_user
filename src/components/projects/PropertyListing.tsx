"use client";
import React, { useState } from "react";
import dynamic from 'next/dynamic';
import NothingFound from "@/components/common/NothingFound";
import ProjectsListingHeader from "./PropertyListingHeader";

// Dynamic import for ProjectCard with proper loading state
const ProjectCard = dynamic(() => import("@/components/cards/PropertyCard"), {
  ssr: false,
  loading: () => (
    <div className="animate-pulse">
      <div className="h-64 bg-gray-200 rounded-xl" />
    </div>
  )
});

interface ProjectsListingProps {
  properties: any[];
  loading: boolean;
  onSortChange: (sort: string) => void;
  currentSort: string;
  pager: any;
  onPageChange: (page: number) => void;
}

const ProjectsListing = ({
  properties,
  loading,
  onSortChange,
  currentSort,
  pager,
  onPageChange,
}: ProjectsListingProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query: string) => setSearchQuery(query);
  const handleSort = (value: string) => onSortChange(value);

  return (
    <div className="flex-1 w-full flex flex-col items-stretch gap-3 my-3">
      <div className="flex flex-col justify-between">
        <ProjectsListingHeader
          onSearch={handleSearch}
          onSort={handleSort}
          currentSort={currentSort}
          searchQuery={searchQuery}
        />
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="h-64 bg-gray-200 rounded-xl" />
            </div>
          ))}
        </div>
      ) : properties.length > 0 ? (
        <div className="w-full">
          {/* Mobile: horizontal scroll */}
          <div className="md:hidden flex gap-4 overflow-x-auto px-1 snap-x snap-mandatory scroll-smooth">
            {properties.map((project) => (
              <div key={project._id} className="min-w-[85%] snap-start">
                <ProjectCard property={project} />
              </div>
            ))}
          </div>

          {/* Desktop: grid layout */}
          <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
            {properties.map((project) => (
              <ProjectCard key={project._id} property={project} />
            ))}
          </div>
          
        </div>
      ) : (
        <NothingFound text="No Assets found" />
      )}
    </div>
  );
};

export default ProjectsListing;
