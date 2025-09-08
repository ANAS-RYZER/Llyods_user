"use client";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Image from "next/image";
import React from "react";

interface PaymentOptionProps {
  selected: string;
  setSelected: (value: string) => void;
  image: string;
  name: string;
  value: string;
  note?: string;
  price?: string;
  fee?: string;
}

const PaymentRadioButton = ({
  selected,
  setSelected,
  image,
  name,
  value,
  note,
  price,
  fee,
}: PaymentOptionProps) => {
  return (
    <RadioGroup
      value={selected}
      onValueChange={setSelected}
      className="space-y-4 my-2"
    >
      {/* Cashfree Option */}
      <div
        onClick={() => setSelected(value)}
        className={`flex items-center justify-between space-x-2 px-3 py-4 rounded-lg cursor-pointer   hover:bg-blue-50 ${
          selected === value
            ? "border-2 border-blue-400 bg-blue-50 shadow-sm"
            : "bg-gray-100"
        }`}
      >
        <div className="flex items-center gap-4">
          <RadioGroupItem value={value} id={value} defaultValue = "my_lloyds_saving_account" />
          <Image src={image} alt={name} width={40} height={40} />
          <Label htmlFor={value} className="cursor-pointer">
            <h1 className="text-lg font-semibold tracking-wide">{name}</h1>
            {note && (
              <span className="text-xs text-muted-foreground font-normal">
                {note}
              </span>
            )}
          </Label>
        </div>

        {price && (
          <div className="flex flex-col items-end">
            <h1 className="text-lg font-semibold">{price}</h1>
            {fee && (
              <span className="text-xs text-muted-foreground font-normal">
                {fee}
              </span>
            )}
          </div>
        )}
      </div>
    </RadioGroup>
  );
};

export default PaymentRadioButton;
