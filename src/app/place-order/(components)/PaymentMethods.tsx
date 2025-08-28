"use client";
import { InfoIcon } from "@/components/common/InfoIcon";
import PaymentRadioButton from "./PaymentRadioButton";
import React, { useEffect, useState } from "react";
import { PoundSterling } from "lucide-react";

const PaymentMethods = ({ totalOrderValue }: { totalOrderValue: number }) => {
  const fiat_types = [
    {
      value: "square_up",
      image: "/square-logo.png",
      name: "Square Up",
      note: "For Indian users only",
      price: `£${totalOrderValue.toLocaleString("en-US")}`,
      fee: "Platform fee (0.1%)",
    },
    {
      value: "stripe",
      image: "/stripelogo.svg",
      name: "Stripe",
      note: "For Global users",
      price: `£${totalOrderValue.toLocaleString("en-US")}`,
      fee: "Platform fee (0.1%)",
    },
    {
      value: "taza_pay",
      image: "/tazapaylogo.svg",
      name: "Tazapay",
      note: "For Global users",
      price: `£${totalOrderValue.toLocaleString("en-US")}`,
      fee: "Platform fee (0.1%)",
    },
  ];

  const [selected, setSelected] = useState("");

  useEffect(() => {
    console.log(selected);
  }, [selected]);

  return (
    <div className="w-full border rounded-xl shadow p-4 space-y-5 bg-white">
      <div className="flex justify-between">
        <h1 className="text-gray-500 font-medium tracking-wide">
          Payment methods
        </h1>
        <h1 className="text-xl font-semibold flex items-center gap-2">
          £{totalOrderValue.toLocaleString("en-US")}
          <span>
            <InfoIcon
              tooltip="dummy data"
              className="text-muted-foreground"
              size={14}
            />
          </span>
        </h1>
      </div>

      <div className="flex flex-col">
        {fiat_types.map((type) => (
          <PaymentRadioButton
            key={type.value}
            selected={selected}
            setSelected={setSelected}
            {...type}
          />
        ))}
      </div>
    </div>
  );
};

export default PaymentMethods;
