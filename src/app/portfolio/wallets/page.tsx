import React from "react";
import { WalletHeader } from "./components/WalletHeader";
import { BalanceCard } from "./components/BalanceCard";
import { StatsGrid } from "./components/StatsGrid";
import { BalanceTable } from "./components/BalanceTable";
import { TransactionList } from "./components/TransactionList";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// This would come from your API
const mockData = {
  totalBalance: "1000000",
  apy: 18,
  stats: {
    available: "€375,000",
    upcomingEarnings: "€24,000",
    pnl24h: "+€1,240",
    rewards: "+€18,900",
  },
  balances: [
    {
      asset: " UK Pounds",
      symbol: "GBP",
      methods: ["UPI", "IMPS", "Bank"],
      available: 125000,
      // inEarn: 25000,
      // total: 150000,
      fiatValue: "£150,000",
    },
    {
      asset: "UK Pounds",
      symbol: "GBP",
      methods: ["UPI", "IMPS", "Bank"],
      available: 2200,
      // inEarn: 0,
      // total: 2200,
      fiatValue: "£2,200",
    },
  ],
  transactions: [
    {
      type: "deposit" as const,
      asset: "GBP",
      amount: "+ £50,000",
      status: "completed" as const,
      date: "2025-08-20 14:02",
      explorerLink: "#",
    },
    {
      type: "yield" as const,
      asset: "GBP",
      amount: "+ 12.45 GBP",
      status: "completed" as const,
      date: "2025-08-20 22:00",
      explorerLink: "#",
    },
    {
      type: "withdraw" as const,
      asset: "GBP",
      amount: "- 200 GBP",
      status: "in-progress" as const,
      date: "2025-08-21 10:17",
      explorerLink: "#",
    },
    {
      type: "reward" as const,
      asset: "RYZR",
      amount: "+ 250 RYZR",
      status: "completed" as const,
      date: "2025-08-22 09:00",
      explorerLink: "#",
    },
    {
      type: "transfer" as const,
      asset: "GBP",
      amount: "- £10,000",
      status: "failed" as const,
      date: "2025-08-22 18:40",
      explorerLink: "#",
    },
  ],
};

const WalletsPage = () => {
  return (
    <div className="flex justify-center w-full gap-4 ">
      {" "}
      <div className="w-[67%]">
        <div className="mb-5 w-full flex justify-between">
          <h1 className="text-2xl font-semibold text-[#1a1b1d] mb-6">
            My Wallet
          </h1>
          <Tabs defaultValue="fiat" className="w-[250px]">
            <TabsList className="w-full flex bg-gray-200 gap-1 rounded-2xl">
              <TabsTrigger
                className="flex-1 text-md font-medium transition-all duration-200 data-[state=active]:bg-black data-[state=active]:rounded-2xl data-[state=active]:text-white rounded-2xl"
                value="fiat"
              >
                Fiat Wallet
              </TabsTrigger>
              <TabsTrigger
                className="flex-1 text-md font-medium transition-all duration-200 data-[state=active]:bg-black data-[state=active]:text-white data-[state=active]:rounded-2xl rounded-2xl"
                value="crypto"
              >
                Crypto Wallet
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        <WalletHeader totalBalance={mockData.totalBalance} apy={mockData.apy} />

        {/* Removed BalanceCard since we merged it with WalletHeader */}

        {/* <StatsGrid
          available={mockData.stats.available}
          upcomingEarnings={mockData.stats.upcomingEarnings}
          pnl24h={mockData.stats.pnl24h}
          rewards={mockData.stats.rewards}
        /> */}

        <div className="space-y-6">
          <BalanceTable balances={mockData.balances} />
          <TransactionList transactions={mockData.transactions} />
        </div>
      </div>
      <div className="w-[30%] border  min-h-screen"></div>
    </div>
  );
};

export default WalletsPage;
