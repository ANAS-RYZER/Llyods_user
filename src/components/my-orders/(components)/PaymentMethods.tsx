"use client";
import { InfoIcon } from "@/components/common/InfoIcon";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bitcoin, CreditCard } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import PaymentRadioButton from "./PaymentRadioButton";

const PaymentMethods = ({ totalOrderValue }: { totalOrderValue: number }) => {
  const fiat_types = [
    {
      value: "square_up",
      image: "/square-logo.png",
      name: "Square Up",
      note: "For Indian users only",
      price: ` £${totalOrderValue.toLocaleString("en-IN")}`,
      fee: "Platform fee (0.1%)",
    },
    {
      value: "stripe",
      image: "/stripelogo.svg",
      name: "Stripe",
      note: "For Global users",
      price: ` £${totalOrderValue.toLocaleString("en-IN")}`,
      fee: "Platform fee (0.1%)",
    },
    {
      value: "checkout",
      image: "/checkout-logo.jpeg",
      name: "Checkout",
      note: "For Global users",
      price: ` £${totalOrderValue.toLocaleString("en-IN")}`,
      fee: "Platform fee (0.1%)",
    },
  ];
  const crypto_types = [
    {
      value: "ryzer_token",
      image: "/logo.svg",
      name: "RyzerX Tokens",
      price: "£XXXXXXXX",
      fee: "-10000",
    },
    {
      value: "usdt",
      image: "/logo.svg",
      name: "USDT",
      price: "£XXXXXXXX",
      fee: "-10000",
    },
    {
      value: "usdc",
      image: "/logo.svg",
      name: "USDE",
      price: "£XXXXXXXX",
      fee: "-10000",
    },
  ];
  const [selected, setSelected] = useState("");
  useEffect(() => {
    console.log(selected);
  }, [selected]);
  return (
    <div className="w-full border rounded-xl shadow p-4  space-y-5 bg-white">
      <div className="flex justify-between">
        <h1 className="text-gray-500 font-medium text-2xl tracking-wide">
          Payment methods
        </h1>
        <h1 className="text-xl font-semibold flex items-center gap-2">
          <PoundSterling />
          {totalOrderValue.toLocaleString("en-IN")}
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
      {/* <Tabs defaultValue="fiat_method" className="w-full">
        <TabsList className="flex bg-gray-200 h-15">
          <TabsTrigger
            className="flex-1 text-sm py-2 flex items-center gap-2"
            value="fiat_method"
          >
            <CreditCard size={15} /> Using by Fiat Currency
          </TabsTrigger>
          <TabsTrigger
            className="flex-1 text-sm py-2 flex items-center gap-2"
            value="crypto_method"
          >
            <Bitcoin size={15} /> Using by Crypto
          </TabsTrigger>
        </TabsList>
        <TabsContent value="fiat_method">
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
        </TabsContent>
        <TabsContent value="crypto_method">
          <div className="flex flex-col">
            {crypto_types.map((type) => (
              <PaymentRadioButton
                key={type.value}
                selected={selected}
                setSelected={setSelected}
                {...type}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs> */}
    </div>
  );
};

export default PaymentMethods;
