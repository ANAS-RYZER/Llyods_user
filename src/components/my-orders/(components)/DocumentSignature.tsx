"use client";

import DocumentSignatureSkeleton from "@/components/placeOrder/DocumentSignatureSkeleton";
import { Button } from "@/components/ui/button";
import { IInvestorDocumentSignature } from "@/constants/global";
import api from "@/lib/httpClient";
import { FileText } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const DocumentSignature = ({ order: orderData }: any) => {
  const router = useRouter();
  const { propertyId, orderId } = useParams();
  const investorId = sessionStorage.getItem("userId");

  const [documents, setDocuments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDocs = async () => {
      try {
        if (!orderData) {
          console.warn("DocumentSignature - orderData is null or undefined");
          setDocuments([]);
          setLoading(false);
          return;
        }

        const orderDocs = orderData?.documents || [];
        console.log("DocumentSignature - orderDocs from orderData:", orderDocs);

        if (orderDocs.length === 0) {
          console.warn("DocumentSignature - No documents found in order");
          setDocuments([]);
          setLoading(false);
          return;
        }

        // 2. Get existing signature tracking
        const trackRes = await api.get(
          `/investor-document-signature-tracking/single?assetId=${propertyId}&investorId=${investorId}&orderId=${orderId}`
        );
        const trackData = trackRes.data.data as IInvestorDocumentSignature[];
        const trackingMap = new Map(
          (trackData || []).map((t: any) => [t.documentTemplateId?._id, t])
        );

        // 3. Ensure tracking exists for each doc
        const mergedDocs = await Promise.all(
          orderDocs.map(async (doc: any) => {
            if (!doc || !doc._id) {
              console.warn("DocumentSignature - Invalid document found:", doc);
              return null;
            }

            let tracking = trackingMap.get(doc._id);

            if (!tracking) {
              // create tracking
              const createRes = await api.post(
                `/investor-document-signature-tracking`,
                {
                  assetId: propertyId,
                  documentTemplateId: doc._id,
                }
              );
              tracking = createRes.data.data;
            }

            return {
              ...doc,
              signatureTracking: {
                ...tracking,
                trackingId: tracking._id, // 👈 keep trackingId separately
              },
            };
          })
        );

        const validDocs = mergedDocs.filter((doc) => doc !== null);
        console.log(
          "DocumentSignature - validDocs after processing:",
          validDocs
        );
        setDocuments(validDocs);
      } catch (error) {
        console.error("Error fetching documents:", error);
        setDocuments([]);
      } finally {
        setLoading(false);
      }
    };

    if (propertyId && investorId) {
      fetchDocs();
    } else {
      console.warn("DocumentSignature - Missing propertyId or investorId");
      setLoading(false);
    }
  }, [propertyId, investorId, orderData]);

  if (loading) return <DocumentSignatureSkeleton />;

  if (documents.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No documents available for signature.</p>
      </div>
    );
  }

  const sendForSignature = async (trackingId: string) => {
    try {
      const res = await api.post(
        `/investor-document-signature-tracking/send-document-for-signature/${trackingId}`
      );
      return res;
    } catch (err) {
      console.error("Error sending document for signature", err);
      throw err;
    }
  };

  return (
    <div className="space-y-4">
      {documents.map((doc: any) => {
        if (!doc || !doc._id) {
          console.warn("DocumentSignature - Skipping invalid document:", doc);
          return null;
        }

        const isSigned = !!doc.signatureTracking?.investorDetails?.completedAt;
        return (
          <div
            key={doc._id}
            className="flex justify-between items-center border px-5 py-3 rounded-md"
          >
            <div className="flex space-x-2 items-center gap-3 p-2">
              <div className="flex items-center p-4 bg-[#F3E8FE] text-[#A854F7] rounded-md">
                <FileText />
              </div>
              <div className="flex flex-col space-y-1 gap-2">
                <div className="flex items-center space-x-2">
                  <h2 className="font-semibold">
                    {doc.templateName || "Untitled Document"}
                  </h2>
                  <p
                    className={`${
                      isSigned ? "text-green-600 bg-green-100" : "text-yellow-600 bg-yellow-200"
                    }    px-2 py-1 rounded-full text-xs font-medium`}
                  >
                    {isSigned ? "Signed" : "Yet to Sign"}
                  </p>{" "}
                </div>
                <p className="text-gray-500">
                  Document purpose and why this is important, write here
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              onClick={async () => {
                if (isSigned) {
                  // Already signed → download
                  window.open(
                    doc.signatureTracking?.submissionDocumentURL,
                    "_blank"
                  );
                } else if (doc.signatureTracking?.investorDetails?.slug) {
                  // Already sent → open signing page
                  router.push(
                    `/place-order/${propertyId}/order/${orderId}/${doc.signatureTracking.investorDetails.slug}`
                  );
                } else {
                  // Not sent yet → send first
                  const trackingId = doc.signatureTracking?.trackingId;
                  if (!trackingId) {
                    console.error("Missing trackingId for document", doc);
                    return;
                  }

                  try {
                    const res = await sendForSignature(trackingId);
                    const slug = res?.data?.data.investorDetails.slug;
                    // Redirect after sending
                    router.push(
                      `/place-order/${propertyId}/order/${orderId}/${slug}`
                    );
                  } catch (err) {
                    console.error("Error sending document", err);
                  }
                }
              }}
              className="  border-2 border-[#0eb57b] text-[#0eb57b] hover:text-white hover:bg-primary"
            >
              {isSigned
                ? "Download"
                : doc.signatureTracking?.investorDetails?.slug
                ? "Sign"
                : "Send & Sign"}
            </Button>
          </div>
        );
      })}
    </div>
  );
};

export default DocumentSignature;
