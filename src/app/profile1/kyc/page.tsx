"use client";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useProfile } from "../ProfileContext";
import { Clock } from "lucide-react";

const page = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { data: profile, loading, updateProfile, fetchData } = useProfile();
  useEffect(() => {
    fetchData();
  }, []);
  console.log(profile);

  const renderStatusBox=()=>{
    
  }

  return (
    <>
      <div className="bg-white  rounded-xl shadow">
        <div className="flex flex-col  bg-blue-50/30 items-start justify-between gap-2 mb-4 p-4">
          <div>
            <div className="flex items-center gap-2">
              <Image src="/idcard.svg" alt="kyc" width={24} height={24} />
              {isLoading ? (
                <Skeleton className="w-40 h-6 rounded-md" />
              ) : (
                <h1 className="text-2xl font-semibold">KYC Verification</h1>
              )}
            </div>

            {isLoading ? (
              <Skeleton className="w-64 h-4 mt-1 rounded-md" />
            ) : (
              <p className="text-sm text-gray-500"> Identity of The User</p>
            )}
          </div >{" "}
          <div className="flex items-center justify-center w-full">
            {!profile?.kycCompleted && (
              <div className="px-5 py-6 border border-red-600 rounded-md flex gap-2 bg-red-50">
                <span className="w-8 h-8 rounded-full bg-red-200 flex items-center justify-center ">
                  <Clock size={15} className="text-red-700" />
                </span>
                <h1 className="text-red-700 text-xl">
                  Verification not Completed
                </h1>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
