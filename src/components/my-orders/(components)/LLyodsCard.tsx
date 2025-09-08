"use client";
import { Button } from "@/components/ui/button";
import { CheckCheckIcon, CheckCircle, LockKeyholeIcon } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";


interface LLyodsCardProps {
  add: boolean;
  onToggle: () => void;
}
const LLyodsCard: React.FC<LLyodsCardProps> = ({ add, onToggle }) => {
  // const [add, setAdd] = useState(true);
  // const handleAdd = () => {
  //   setAdd((prev) => !prev);
  // };

  return (
    <div className="space-y-5">
      <div className="flex justify-between items-center ">
        <div className="flex items-center gap-3">
          <Image src={`/lloydslogo.svg`} alt="" width={40} height={40} />
          <h1 className="text-lg font-semibold">Insurance Rental protection</h1>
          {add && (
            <div className="flex text-white bg-[#13ba82] rounded-full px-3 py-1 gap-3 text-sm items-center">
              <CheckCircle size={15} />
              <p>Added</p>
            </div>
          )}
        </div>
        <Button
          variant="outline"
          className="border-2 border-[#735aed] text-[#735aed] transition-all duration-200 hover:bg-[#735aed] hover:text-white"
          onClick={onToggle}
        >
          {add ? "Remove" : "Add"}
        </Button>
      </div>
      <ul>
        <li className="list-disc text-muted-foreground list-inside text-lg">
          Pay 5% of your rental yield Lloyd's guarantees the rental payout even
          if the property underperforms or has no tenants.
        </li>
      </ul>
      <div>
        <h1 className="text-blue-800 font-medium mb-3">Coverage inlcudes :</h1>
        <div className="flex gap-3 items-center my-2">
          <CheckCircle size={20} className="text-green-600" />
          <p className="text-lg text-blue-700 tracking-wide">
            Monthly rental protection
          </p>
        </div>
        <div className="flex gap-3 items-center">
          <CheckCircle size={20} className="text-green-600" />
          <p className="text-lg text-blue-700 tracking-wide">
            Extended occupancy protection
          </p>
        </div>
      </div>
      <div className="flex items-center w-full border border-green-600 rounded-md px-4 py-3 bg-green-50 gap-3">
        <LockKeyholeIcon size={25} className="text-green-600" />
        <div className="text-green-600 space-y-1">
          <h1 className="text-md">
            Lloyds platform is using Escrow accounts for Fiat currency
          </h1>
          <p className="text-sm">
            payments are 100% safe with Regulated custodial providers
          </p>
        </div>
      </div>
      <p className="text-xs">
        I accept Lloyds's{" "}
        <span className="font-semibold underline cursor-pointer">
          Terms of Use, Payment Terms,
        </span>{" "}
        and{" "}
        <span className="font-semibold underline cursor-pointer">
          Privacy Policy
        </span>
        . I understand that my investment represents fractional ownership in a
        Special Purpose Vehicle (SPV) and may involve certain risks. I authorize
        Lloyds and its partners to process my payment and manage related
        documentation for this investment.
      </p>
    </div>
  );
};

export default LLyodsCard;