"use client";
import { useFetchPropertyById } from "@/hooks/property/useFetchPropertyById";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import PaymentMethods from "../../../components/my-orders/(components)/PaymentMethods";
import LLyodsCard from"../../../components/my-orders/(components)/LLyodsCard";
import { useRouter } from "next/navigation";
import Token from "@/app/property/[propertyID]/token";
import { IProperty } from "@/constants/global";
import useInvestorApi from "@/hooks/user/useInvestorApi";
import PropertyHeader from "../../../components/my-orders/(components)/PropertyHeader";
import PaymentMethodsSkeleton from "@/components/placeOrder/PaymentMethodsSkeleton";
import { add } from "date-fns";
import LLyodsCardSkeleton from "@/components/placeOrder/LlyodsCardSkeleton";
import TokenSkeleton from "@/components/placeOrder/TokenSelection";

const PlaceOrder = () => {
  const params = useParams(); // { propertyId: "..."}
  const router = useRouter();
  console.log(params);
  const { property, error, loading } = useFetchPropertyById(
    params?.propertyId as string
  );
  const {
    data: investorData,
    error: investorError,
    loading: investorLoading,
  } = useInvestorApi();
  // const { fetchData, data } = useInvestorApi();
  const [totalOrderValue, setTotalOrderValue] = React.useState(0);
  const [isLlyodsAdded, setIsLlyodsAdded] = React.useState(true);
  const [showLlyodsCard, setShowLlyodsCard] = React.useState(false);

  const handleViewOnBlockchain = () => {
    const address = property?.tokenInformation?.blockchainProjectAddress;
    if (address) {
      window.open(
        `https://explorer.testnet.xrplevm.org/token/${address}`,
        "_blank"
      );
    }
  };
  useEffect(() => {
    if (!loading) {
      const timer = setTimeout(() => {
        setShowLlyodsCard(true);
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [loading]);
  

  return (
    <div className="w-full mb-10 space-y-3">
      
      <PropertyHeader
        property={property as IProperty}
        handleViewOnBlockchain={handleViewOnBlockchain}
        loading={loading}
      />
      <div className="flex justify-center gap-10 items-start">
        <div className="w-[37%]">
          <div className="">
            {loading || !totalOrderValue  ? <PaymentMethodsSkeleton /> : <PaymentMethods totalOrderValue={totalOrderValue} />}

          </div>

          <hr className="w-full  bg-gray-300  my-5" />
          <div>
            {/* <LLyodsCard
              add={isLlyodsAdded}
              onToggle={() => setIsLlyodsAdded((prev) => !prev)}
            /> */}
            {loading || !showLlyodsCard ? <LLyodsCardSkeleton /> : <LLyodsCard add={isLlyodsAdded}
              onToggle={() => setIsLlyodsAdded((prev) => !prev)}/>}
          </div>
        </div>
        
        {
          loading || !property ? <TokenSkeleton/> : <Token
          kycCompleted={investorData?.kycCompleted}
          property={property as IProperty}
          onOrderValueChange={setTotalOrderValue}
          llyodsAdded={isLlyodsAdded} // <--- here
        />
        }
      </div>
    </div>
  );
};

export default PlaceOrder;