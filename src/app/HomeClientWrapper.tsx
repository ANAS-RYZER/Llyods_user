"use client";

import TopPartnersSkeleton from '@/assets/skeleton/PartnerSkeleton';
import ProjectsSkeleton from '@/assets/skeleton/Projects';
import ProjectNav from '@/components/projects/PropertyNav';
import { UniversalPagination } from '@/components/common/UniversalPagination';
import dynamic from 'next/dynamic';
import { useState } from 'react';
const ProjectsListing = dynamic(() => import("@/components/projects/PropertyListing"), {
  ssr: false,
  loading: () => <ProjectsSkeleton />,
});



interface HomeClientWrapperProps {
  projects: any[];
  loading: boolean;
  onSortChange: (sort: string) => void;
  currentSort: string; 
  pager: any;
  onPageChange: (page: number) => void;
  onSearch: (query: string) => void;
  searchQuery: string;
}

const HomeClientWrapper = ({
  projects,
  loading,
  onPageChange,
  onSortChange,
  currentSort,
  pager,
  onSearch,
  searchQuery
}: HomeClientWrapperProps) => {
  return (
    <div className="min-h-screen">
      {/* <Header /> */}
      <main className="max-w-7xl mx-auto flex flex-col gap-6 items-stretch p-3">
        <section className="w-full flex flex-col items-center justify-center">
          <ProjectNav onSearch={onSearch} searchQuery={searchQuery} />
          <ProjectsListing
            properties={projects}
            loading={loading}
            onSortChange={onSortChange}
            currentSort={currentSort}
            pager={pager}
            onPageChange={onPageChange}
          />
         {pager.totalPages > 1 && pager.totalPages !== 0 && (
          <UniversalPagination 
            currentPage={pager.page}
            totalPages={pager.totalPages}
            onPageChange={onPageChange}
          />
         )}
        </section>
      </main>
    </div>
  );
};

export default HomeClientWrapper; 