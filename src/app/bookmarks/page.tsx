"use client";
import { Bookmark } from "lucide-react";
import React, { useState, Suspense } from "react";
import { useFetchAllAssets } from "@/hooks/project/useFetchAssets";
import { Button } from "@/components/ui/button";
import ProjectNav from "@/components/projects/PropertyNav";
import { UniversalPagination } from "@/components/common/UniversalPagination";
import ProjectsListing from "@/components/projects/PropertyListing";
import NothingFound from "@/components/common/NothingFound";
import ProjectCard from "@/components/cards/PropertyCard";
import { useFetchAllBookMarks } from "@/hooks/BookMark/useFetchAllBookMarks";
import BookmarkSearch from "./[components]/BookmarkSearch";
import FilterTabs from "./[components]/FilterTabs";

const BookmarksContent = () => {
  const [page, setPage] = useState(1);
  const { properties, pagination, error, loading } = useFetchAllBookMarks(
    page,
    10,
    "all",
    undefined
  );

  return (
    <div className="max-w-6xl mx-auto  p-4">
      <BookmarkSearch onSearch={() => {}} searchQuery={""} />

      <div className="flex items-center justify-start mt-10">
        <Bookmark size={25} className="text-primary mr-2" />
        <h1 className="text-2xl font-bold">Your Bookmarks</h1>
        <span className="bg-[#725ACE]/20 text-primary px-2 py-0 rounded-full ml-2">
          {" "}
          {properties?.length}{" "}
        </span>
      </div>
      <div>
        <FilterTabs />
      </div>

      <section className="w-full flex flex-col mt-5 items-center justify-center">
        <div
          className={`grid ${
            properties.length > 0
              ? "grid-cols-3 gap-4"
              : "grid-cols-1 place-items-center"
          } w-full`}
        >
          {loading ? (
            [...Array(6)].map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="h-64 bg-gray-200 rounded-xl" />
              </div>
            ))
          ) : properties.length > 0 ? (
            properties.map((project: any) => (
              <ProjectCard key={project._id} property={project} />
            ))
          ) : (
            <NothingFound text="No Assets found" />
          )}
        </div>
      </section>
    </div>
  );
};

const page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BookmarksContent />
    </Suspense>
  );
};

export default page;
