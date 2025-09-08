"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  TrendingUp,
  Search,
  Download,
  Plus,
  Bed,
  Bath,
  Car,
  Maximize,
  Edit,
  ChevronUp,
  AlertTriangle,
  Minus,
  CircleMinus,
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from "recharts";
import useFetchPortfolio from "@/hooks/portfolio/useFetchPortfolio";
import useFetchPortfolioOrder from "@/hooks/portfolio/useFetchPortfolioOrder";
import { formatDate } from "@/lib/utils";
import { useRouter } from "next/navigation";
import NoOrdersError from "./NoOrdersError";
import PerformanceCard from "./PerformanceCard";
import Banner from "./Banner";
import ActivitiesCard from "./ActivitiesCard";
import MyAssetsTable from "./MyAssetsTable";
import AccountCard from "./AccountCard";
import PortfoliobarBar from "./PortfolioBar";

// Mock data - replace with your API calls

export default function MyAccount() {
  const [selectedTab, setSelectedTab] = useState("My Assets");
  const { portfolio, loading, error, fetchPortfolio } = useFetchPortfolio();
  const {
    portfolioOrder,
    loading: loadingOrder,
    error: errorOrder,
  } = useFetchPortfolioOrder();
  const router = useRouter();
  console.log(portfolio);
  if (loading) {
    return <div>Loading...</div>;
  }
  if (
    error?.response?.data?.message === "No completed orders found for this user"
  ) {
    return (
      <div>
        <NoOrdersError />
      </div>
    );
  }
  return (
    <div className="p-0 max-w-7xl ">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-[#1a1b1d] mb-6">
          My Account
        </h1>

        {/* Portfolio Cards */}
        <div className="flex justify-between">
          <div className="flex flex-col w-full">
            <div className=" flex gap-2 mb-4">
             <div className=" flex flex-col gap-4">
               <AccountCard
                type="Current Account"
                accountNumber="80-12-34 29976651"
                balance={2511.27}
                balanceLabel="Current balance"
                availableFunds="£3,511.27"
                overdraft="£1,000"
                interestInfo="Find out how"
                actions={[
                  { label: "View statement" },
                  { label: "Make a payment" },
                  { label: "Make a transfer" },
                  { label: "More actions" },
                ]}
              />

              <AccountCard
                type="Clarity Credit Card"
                accountNumber="**** **** **** 9876"
                balance={-831.15}
                balanceLabel="Current balance"
                isCreditCard
                actions={[
                  { label: "View statement" },
                  { label: "Make a payment" },
                  { label: "Make a transfer" },
                ]}
              />
             </div>
             <div className="">
              <PortfoliobarBar/>
             </div>
            </div>

            

            <MyAssetsTable assets={portfolio?.portfolio?.assets ?? []} />
          </div>
          <div className="flex flex-col gap-6 px-4">
            <Banner
              icon={
                <AlertTriangle
                  className="h-6 w-6 text-yellow-400"
                  aria-hidden="true"
                />
              }
              title="Submit tax information"
              description="Redeem reward points or yields to unlock airline promo codes"
              bgColor="black"
              textColor="white"
            />
            <Banner
              icon={
                <CircleMinus
                  className="h-6 w-6 text-red-500"
                  aria-hidden="true"
                />
              }
              title="Submit tax information"
              description="Redeem reward points or yields to unlock airline promo codes"
              bgColor="#FEF3C6"
            />
            <ActivitiesCard />
          </div>
        </div>
      </div>
    </div>
  );
}
