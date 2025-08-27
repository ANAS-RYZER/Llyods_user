"use client";

import { Button } from "@/components/ui/button";
import useUserDetails from "@/hooks/user/useUserDetail";
import { DocusealForm } from "@docuseal/react";
import { ArrowLeftIcon } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import {toast} from "react-toastify";

const DocumentPage = () => {
  const params = useParams();
  const { propertyId , orderId,documentId } = useParams()
  const router = useRouter();
  const {data: userData, loading, error} = useUserDetails();
  console.log("User Email: ", propertyId, orderId, documentId);
   

//   useEffect(() => {
//     if (!documentId) {
//       router.replace(`/place-order/${propertyId}/order/${orderId}&refresh=true`);
//     } else if (!orderId) {
//       router.replace("/orders");
//     }
//   }, [documentId, router, orderId]);

  const onDocumentSignComplete = (data: any) => {
    toast.success("Document signed successfully");
    
    // Use window.location.href for a full page reload to ensure fresh data
    // This is more reliable than router.push for ensuring data is refreshed
    window.location.href = `/place-order/${propertyId}/order/${orderId}`;
  }
  return (
    <section className="flex flex-col">
      <header className="flex items-center justify-between gap-2 p-4 sm:p-5 md:p-6 border-b border-gray-200">
        <div className="w-full max-w-6xl mx-auto flex items-center gap-2">
          <Button
            variant="ghost"
            title="Back to Documents"
            onClick={() => router.back()}
            className="mr-2 sm:mr-4 flex items-center gap-2"
          >
            <ArrowLeftIcon size={32} />
            <p className="text-lg font-semibold">Go Back to Documents</p>
          </Button>
        </div>
      </header>
      <div className="w-full">
        <DocusealForm
          src={`https://docuseal.com/s/${documentId}`}
          email={userData?.email}
        onComplete={(data) => onDocumentSignComplete(data)}
          allowToResubmit={false}
          completedMessage={{ title: "Document signing is complete!" }}
        />
      </div>
    </section>
  );
};

export default DocumentPage;