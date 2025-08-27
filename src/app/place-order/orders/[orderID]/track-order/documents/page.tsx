"use client";

import Icon from "@/components/common/Icon";
import Components from "@/components/documents/Componets";
import DocumentsListing from "@/components/documents/DocumentsListing";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import useFetchOrderById from "@/hooks/order/useFetchOrderById";
import { ArrowLeftIcon } from "lucide-react";
import { useParams, useRouter, usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const TrackOrderDocuments = () => {
  // const { order: orderData, loading: orderLoading, error: orderError, fetchOrder } = useFetchOrderById()
  // const params = useParams()
  // const orderID = params?.orderID as string
  // const router = useRouter()
  // const pathname = usePathname()
  // const searchParams = useSearchParams()
  // const redirectSrc = searchParams.get('redirectSrc')
  // const refresh = searchParams.get('refresh')
  // const [isInitialLoad, setIsInitialLoad] = useState(true)

  // // Effect to handle redirect from document signing and refresh order data
  // useEffect(() => {
  //   // Always fetch order data when the component mounts
  //   if (orderID && isInitialLoad) {
  //     fetchOrder(orderID);
  //     setIsInitialLoad(false);
  //   }

  //   // If redirected from document signing with refresh parameter, fetch data again
  //   if (redirectSrc === 'documentSign' && refresh === 'true') {
  //     fetchOrder(orderID);

  //     // Remove the refresh parameter from URL to prevent infinite refresh
  //     const newParams = new URLSearchParams(searchParams.toString());
  //     newParams.delete('refresh');

  //     // Keep the redirectSrc parameter for context

  //     router.replace(`${pathname}?${newParams.toString()}`);
  //     // window.location.reload();
  //   }
  // }, [redirectSrc, orderID, refresh, fetchOrder, router, pathname, searchParams, isInitialLoad]);

  // const pathSegments = pathname?.split("/").filter((segment) => segment);

  return (
    // <main className="min-h-screen p-6  bg-gray-50">
    //   <section className="h-full w-full max-w-[1100px] mx-auto flex flex-col items-start">
    //     <Breadcrumb className="text-xs sm:text-sm space-x-1 sm:space-x-2 mb-2 sm:mb-4 font-medium overflow-x-auto">
    //       <BreadcrumbItem>
    //         <BreadcrumbLink href="/" className="text-fprimary hover:underline text-xs sm:text-sm">
    //           Home
    //         </BreadcrumbLink>
    //       </BreadcrumbItem>

    //       {pathSegments?.map((segment, index) => {
    //         const path = `/${pathSegments?.slice(0, index + 1).join("/")}`;
    //         const isLast = index === pathSegments?.length - 1;

    //         return (
    //           <BreadcrumbItem key={path} className="flex-shrink-0">
    //             <Icon
    //               name="chevron-right"
    //               type="solid"
    //               className="text-gray-500 w-3 h-3 sm:w-4 sm:h-4 items-center"
    //             />
    //             {isLast ? (
    //               <span className="text-black font-medium uppercase text-xs sm:text-sm">
    //                 {segment}
    //               </span>
    //             ) : (
    //               <BreadcrumbLink
    //                 href={path}
    //                 className="text-fprimary hover:underline text-xs sm:text-sm"
    //               >
    //                 {segment}
    //               </BreadcrumbLink>
    //             )}
    //           </BreadcrumbItem>
    //         );
    //       })}
    //     </Breadcrumb>

    //     <div
    //       className="w-full bg-white rounded-2xl flex flex-col items-stretch gap-5"
    //       title="Documents sign"
    //     >
    //       <header className="flex items-center justify-between gap-2 p-4">
    //         <div className="flex items-center gap-2">
    //           <Button
    //             variant="ghost"
    //             onClick={() => router.back()}
    //             className="mr-2 sm:mr-4"
    //           >
    //             <ArrowLeftIcon size={24} />
    //           </Button>
    //           <h1 className="header-text">
    //             Documents
    //           </h1>
    //         </div>
    //       </header>

    //       <div className="flex-1 flex flex-col items-center justify-center gap-6 sm:gap-8 w-full px-4 md:px-8 lg:px-16">


    //         <div className="w-full max-w-4xl">
    //           <DocumentsListing orderData={orderData} />
    //         </div>

    //       </div>
    //       <footer className="w-full border-t-2 mt-4 sm:mt-6 p-3 sm:p-4">
    //         <div className="flex flex-row justify-end items-center gap-3 sm:gap-4">
    //           <Button
    //             variant="secondarybutton"
    //             className="w-full sm:w-auto text-center text-sm sm:text-base"
    //             onClick={() => router.replace(`/projects`)}
    //           >
    //             Explore More Projects
    //           </Button>
    //           <Button
    //             onClick={() => router.replace(`/orders/${orderData?._id}/track-order`)}
    //             className="bg-[#8968ff] hover:bg-[#8968ff]/90 w-full sm:w-auto text-sm sm:text-base"
    //             disabled={!orderData?.allDocumentsSigned}
    //           >
    //             Next
    //           </Button>
    //         </div>
    //       </footer>

    //     </div>

    //   </section>
    // </main>
    <div>
      <h1>Documents</h1>
    </div>
  );
};

export default TrackOrderDocuments;