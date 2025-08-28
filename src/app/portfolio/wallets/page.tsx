import React from "react";
import { WalletHeader } from "./components/WalletHeader";
import { BalanceCard } from "./components/BalanceCard";
import { StatsGrid } from "./components/StatsGrid";
import { BalanceTable } from "./components/BalanceTable";
import { TransactionList } from "./components/TransactionList";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import {}
// This would come from your API
const mockData = {
  totalBalance: "$1,000,000.00",
  apy: 18,
  stats: {
    available: "£375,000",
    upcomingEarnings: "£24,000",
    pnl24h: "+£1,240",
    rewards: "+£18,900",
  },
  balances: [
    {
      asset: "Indian Rupee",
      symbol: "INR",
      methods: ["UPI", "IMPS", "Bank"],
      available: 125000,
      inEarn: 25000,
      total: 150000,
      fiatValue: "£150,000",
    },
    {
      asset: "US Dollar",
      symbol: "USD",
      methods: ["UPI", "IMPS", "Bank"],
      available: 2200,
      inEarn: 0,
      total: 2200,
      fiatValue: "$2,200",
    },
  ],
  transactions: [
    {
      type: "deposit" as const,
      asset: "INR",
      amount: "+ £50,000",
      status: "completed" as const,
      date: "2025-08-20 14:02",
      explorerLink: "#",
    },
    {
      type: "yield" as const,
      asset: "USDT",
      amount: "+ 12.45 USDT",
      status: "completed" as const,
      date: "2025-08-20 22:00",
      explorerLink: "#",
    },
    {
      type: "withdraw" as const,
      asset: "USDC",
      amount: "- 200 USDC",
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
      asset: "INR",
      amount: "- £10,000",
      status: "failed" as const,
      date: "2025-08-22 18:40",
      explorerLink: "#",
    },
  ],
};

const WalletsPage = () => {
  return (
    <div className="max-w-7xl">
      <div className="mb-5 w-full flex justify-center">
        <Tabs defaultValue="fiat" className="w-[400px]">
          <TabsList className="w-full flex bg-gray-200 gap-1">
            <TabsTrigger
              className="flex-1 text-md font-medium transition-all duration-200 data-[state=active]:bg-black data-[state=active]:text-white"
              value="fiat"
            >
              Fiat
            </TabsTrigger>
            <TabsTrigger
              className="flex-1 text-md font-medium transition-all duration-200 data-[state=active]:bg-black data-[state=active]:text-white"
              value="crypto"
            >
              Crypto
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      <WalletHeader totalBalance={mockData.totalBalance} apy={mockData.apy} />

      {/* Removed BalanceCard since we merged it with WalletHeader */}

      <StatsGrid
        available={mockData.stats.available}
        upcomingEarnings={mockData.stats.upcomingEarnings}
        pnl24h={mockData.stats.pnl24h}
        rewards={mockData.stats.rewards}
      />

      <div className="space-y-6">
        <BalanceTable balances={mockData.balances} />
        <TransactionList transactions={mockData.transactions} />
      </div>
    </div>
  );
};

export default WalletsPage;
