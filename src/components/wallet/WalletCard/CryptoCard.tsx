"use client";
import type React from "react";
import { Card, CardContent } from "@/components/ui/card";

interface CryptoCardProps {
  symbol: string;
  name: string;
  amount: string;
  value: string;
  // change: string
  icon: React.ReactNode;
}

const CryptoCard = ({ symbol, name, amount, value, icon }: CryptoCardProps) => {
  // const isPositive = !change.includes("-")
  // const isNeutral = change === "+0%"

  return (
    <Card className="border shadow-none rounded-xl">
      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100">
            {icon}
          </div>
          <span className="font-medium">{name}</span>
        </div>
        <div className="text-xl font-bold">
          {amount} {symbol}
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-500">{value}</span>
          {/* <span className={`${isNeutral ? "text-gray-500" : isPositive ? "text-green-500" : "text-red-500"}`}>
            {change}
          </span> */}
        </div>
      </CardContent>
    </Card>
  );
};

export default function CryptoBalanceCards({ usdt, xrp, xdc }: any) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <CryptoCard
        symbol="XDC"
        name="XDC"
        amount={xdc.toString()}
        value={`$${xdc.toString()}`}
        // change="+2.5%"
        icon={<span className="text-amber-500 font-bold">₿</span>}
      />

      <CryptoCard
        symbol="XRP"
        name="XRPL"
        amount={xrp.toString()}
        value={`£${(Number(xrp) * 193).toString()}`}
        // change="-1.2%"
        icon={<span className="text-blue-500 font-bold">Ξ</span>}
      />

      <CryptoCard
        symbol="USDT"
        name="Tether"
        amount={usdt.toString()}
        value={`£${(Number(usdt) * 86).toString()}`}
        // change="+0%"
        icon={<span className="text-green-500 font-bold">T</span>}
      />

      {/* <CryptoCard
        symbol="USDC"
        name="USD Coin"
        amount="2500"
        value="$2,500"
        change="+0%"
        icon={<span className="text-blue-600 font-bold">$</span>}
      /> */}
    </div>
  );
}
