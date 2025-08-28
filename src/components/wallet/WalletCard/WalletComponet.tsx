"use client";
import { Button } from "@/components/ui/button";
import { ArrowDown, ArrowUp, Bitcoin, CreditCard } from "lucide-react";
import React from "react";

const WalletComponet = ({ xrp }: any) => {
  return (
    <div>
      <div className="bg-[#6465f1] p-4 flex justify-between items-center rounded-lg">
        <div className="space-y-2">
          <span className="text-md font-medium text-white">XRP Balance</span>
          <div className="flex items-center gap-2">
            <div className="bg-white/30 rounded-full p-2">
              <Bitcoin size={20} className="text-white" />
            </div>
            <div className="">
              <h1 className="text-2xl font-bold text-white"> {xrp} XRP </h1>
              <span className="text-sm text-white">
                {" "}
                <PoundSterling />
                {xrp * 193}{" "}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center gap-2">
          <Button
            variant="outline"
            className="bg-white/20 border-none text-white"
          >
            {/* <CreditCard size={20} className='text-black' /> */}
            <ArrowDown size={20} className="text-white" />
            Deposit
          </Button>
          <Button
            variant="outline"
            className="bg-white/20 border-none text-white"
          >
            {/* <CreditCard size={20} className='text-black' /> */}
            <ArrowUp size={20} className="text-white" />
            Withdraw
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WalletComponet;
