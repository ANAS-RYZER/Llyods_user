"use client"

import dynamic from "next/dynamic"
import { useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { useFetchAllAssets } from "@/hooks/project/useFetchAssets"
import { UniversalPagination } from "@/components/common/UniversalPagination"

// Fix loading prop to avoid recursive reference
const ProjectsSkeleton = dynamic(() => import("@/assets/skeleton/Projects"), {
  ssr: false,
  loading: () => <div><ProjectsSkeleton /></div>,
})

const ProjectsListing = dynamic(() => import("@/components/projects/PropertyListing"), {
  ssr: false,
  loading: () => (
    <div className="w-full flex items-center justify-center">
      <ProjectsSkeleton />
    </div>
  ),
})

const ProjectNav = dynamic(() => import("@/components/projects/PropertyNav"), {
  ssr: false,
  loading: () => <div></div>,
})


const PropertyPageContent = () => {
  const [sort, setSort] = useState("1")
  const [page, setPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState("")
  const searchParams = useSearchParams()
  const router = useRouter()
  const assetCategory = searchParams?.get("assetCategory")

  // Mark it client-side

  useEffect(() => {
    if (!assetCategory) {
      const params = new URLSearchParams(searchParams?.toString() || "")
      params.set("assetCategory", "all")
      router.replace(`?${params.toString()}`)
    }
    setPage(1) // reset to page 1 on category change
  }, [assetCategory, searchParams, router])

  const { properties, pagination, loading } = useFetchAllAssets(page, 10, sort, searchQuery, false)

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
    <div className="min-h-screen">
    <main className="max-w-7xl mx-auto flex flex-col gap-6 items-stretch p-3">
      <ProjectNav onSearch={handleSearch} searchQuery={searchQuery} />

      <section className="w-full flex flex-col items-center justify-center">
      <ProjectsListing
          properties={properties}
          loading={loading}
          onSortChange={handleSortChange}
          currentSort={sort}
          pager={pagination}
          onPageChange={handlePageChange}
        />
       {pagination.totalPages > 1 && pagination.totalPages !== 0 && (
          <UniversalPagination 
            currentPage={pagination.page}
            totalPages={pagination.totalPages}
            onPageChange={handlePageChange}
          />
         )}   
          </section>
    </main>
    </div>
  )
}

export default PropertyPageContent
