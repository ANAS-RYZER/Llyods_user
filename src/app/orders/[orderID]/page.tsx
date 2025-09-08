"use client";
import React from "react";
import TokenStatus from "./(components)/TokenStatus";
import { order_res } from "./dummyOrder";
import OrderDetails from "./(components)/OrderDetails";
import { useFetchPropertyById } from "@/hooks/property/useFetchPropertyById";
import { IProperty } from "@/constants/global";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowUpRight, PhoneCall } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import AssetManager from "./(components)/AssetManager";
import useFetchOrderById from "@/hooks/order/useFetchOrderById";
import PropertyHeader from "@/components/my-orders/(components)/PropertyHeader";
import DocumentSignature from "@/components/my-orders/(components)/DocumentSignature";

const OrderStatus = () => {
  const params = useParams();
  const router = useRouter();

  const {
    fetchOrder,
    order,
    error: orderError,
    loading: orderLoading,
  } = useFetchOrderById(params?.orderId as string);
  const { property, error, loading } = useFetchPropertyById(
    order?.asset._id as string
  );

  console.log("order", order);
  console.log("params", params);
  const handleViewOnBlockchain = () => {
    const address = property?.tokenInformation?.blockchainProjectAddress;
    if (address) {
      window.open(
        `https://explorer.testnet.xrplevm.org/token/${address}`,
        "_blank"
      );
    }
  };
  if (loading || orderLoading) {
    return <h1>Loading......</h1>;
  }
  return (
    <div className="space-y-5">
      <PropertyHeader
        property={property as IProperty}
        handleViewOnBlockchain={handleViewOnBlockchain}
        assetmanager={false}
      />

      <div className="flex justify-center gap-3 items-center">
        <div className="w-[39%]">
          <div className="w-full shadow border rounded-lg p-4 space-y-4">
            <TokenStatus status={order?.currentStatus} />
            <OrderDetails property={property} order={order} />
            <DocumentSignature order={order} />
            <hr className="my-2" />
            <div>
              <h1 className="text-xl font-bold">Support Needed?</h1>
              <AssetManager 
              name= {property?.hostedBy?.name as string}
              />
            </div>
          </div>
          <div className="flex justify-between items-center my-5">
            <Button
              onClick={() => router.push("/orders")}
              variant="default"
              className="bg-black hover:bg-black/80"
            >
              <ArrowLeft />
              View Orders
            </Button>
            <Button>
              My Portfolio <ArrowUpRight />
            </Button>
          </div>
        </div>
        <div className="w-[400px]">
          <Image
            className=""
            width={400}
            height={410}
            src={`/Lloyds_mobile.png`}
            alt="Lloyds_mobile"
          />
        </div>
      </div>
    </div>
  );
};

export default OrderStatus;
