"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useFetchAllAssets } from "@/hooks/project/useFetchAssets";
import HomeClientWrapper from "./HomeClientWrapper";

const HomePageContent = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const assetCategory = searchParams?.get("assetCategory")
  const investorId = typeof window !== "undefined" ? sessionStorage.getItem("userId") : null;
  const { properties, pagination, loading } = useFetchAllAssets(page, 10, sort, searchQuery, false, investorId as string);
 
  useEffect(() => {
    if (!assetCategory) {
      const params = new URLSearchParams(searchParams?.toString() || "")
      params.set("assetCategory", "all")
      router.replace(`?${params.toString()}`)
    }
    setPage(1) // reset to page 1 on category change
  }, [assetCategory, searchParams, router])

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    setPage(1)
  }

  const handleSortChange = (newSort: string) => {
    setSort(newSort)
  }

  const handlePageChange = (newPage: number) => {
    setPage(newPage)
  }
    
  return (
    <div className="">

      <HomeClientWrapper
        projects={properties}
        loading={loading}
        onSortChange={handleSortChange}
        currentSort={sort}
        pager={pagination}
        onPageChange={handlePageChange}
        onSearch={handleSearch}
        searchQuery={searchQuery}
      />
    </div>
  );
};

export default HomePageContent;
