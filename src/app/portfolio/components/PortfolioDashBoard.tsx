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
import { formatCurrency, formatCurrencyWithOutZero, formatDate } from "@/lib/utils";
import { useRouter } from "next/navigation";
import NoOrdersError from "./NoOrdersError";
import Banner from "./Banner";
import ActivitiesCard from "./ActivitiesCard";
import  MyAssetsTable  from "./MyAssetsTable";
import PerformanceCard from "./PerformanceCard";

// Mock data - replace with your API calls
const portfolioData = {
  totalValue: 2847500,
  totalValueChange: 18,
  investments: 2650000,
  investmentsChange: 12.3,
  cashflows: 197500,
  cashflowsChange: 8.3,
  annualYields: 8.7,
};

const performanceData = [
  {
    month: "Feb 01",
    grossYield: 20000,
    netYield: 18000,
    potentialEquity: 25000,
  },
  {
    month: "Feb 08",
    grossYield: 35000,
    netYield: 30000,
    potentialEquity: 40000,
  },
  {
    month: "Feb 15",
    grossYield: 25000,
    netYield: 22000,
    potentialEquity: 30000,
  },
  {
    month: "Feb 22",
    grossYield: 45000,
    netYield: 40000,
    potentialEquity: 50000,
  },
  {
    month: "Feb 29",
    grossYield: 60000,
    netYield: 55000,
    potentialEquity: 65000,
  },
];

const overviewStats = {
  states: 2,
  averageLandSize: "90.2 m2",
  averageRent: "$391.5 p/week",
  averagePurchasePrice: "$563,434",
  numberOfProperties: 3,
};

const properties = [
  {
    id: 1,
    address: "31 New Street, Mountain Creek QLD 4557",
    beds: 4,
    baths: 4,
    parks: 4,
    sqft: 579,
    market: "Mountain creek QLD 4557",
    ownedSince: "12 march, 2020(4 years)",
    targetEquity: "21% (+4.1)",
    isTopPerformer: true,
    image: "/modern-house-exterior.png",
  },
  {
    id: 2,
    address: "31 New Street, Mountain Creek QLD 4557",
    beds: 4,
    baths: 4,
    parks: 4,
    sqft: 579,
    market: "Mountain creek QLD 4557",
    ownedSince: "12 march, 2020(4 years)",
    targetEquity: "21% (+4.1)",
    isTopPerformer: true,
    image: "/modern-house-exterior.png",
  },
];

export default function PortfolioDashboard() {
  const [selectedTab, setSelectedTab] = useState("My Assets");
  const { portfolio, loading, error, fetchPortfolio } = useFetchPortfolio();
  const {
    portfolioOrder,
    loading: loadingOrder,
    error: errorOrder,
  } = useFetchPortfolioOrder();
  const router = useRouter(); // No arguments needed for useRouter
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
  console.log("Portfolio Order:", portfolioOrder);

  return (
    <div className="p-0 max-w-7xl ">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-[#1a1b1d] mb-6">
          My Portfolio
        </h1>

        {/* Portfolio Cards */}
       <div className="flex">
        <div>
         <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-[#006861] text-white border-0">
            <CardContent className="p-6">
              <div className="text-sm opacity-90 mb-2">Total  Value</div>
              {/* <div className="text-2xl font-bold mb-2">${portfolioOrder?.summary?.totalCurrentValue}</div> */}
              <div className="text-2xl font-bold mb-2">{formatCurrencyWithOutZero(portfolioData.totalValue)}</div>
              <div className="flex items-center text-sm">
                <TrendingUp className="w-4 h-4 mr-1" />+
                {/* {portfolioOrder?.metrics?.allTimeReturns}% */}
                {portfolioData.totalValueChange}%
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#F3F4F6] border shadow-none">
            <CardContent className="p-6">
              <div className="text-sm text-[#9ea3ae] mb-2"> My Holdings</div>
              <div className="text-2xl font-bold text-[#1a1b1d] mb-2">
                {/* ${portfolioOrder?.metrics?.totalInvestment} */}
                {/* $2,650,000 */}
                {formatCurrencyWithOutZero(portfolioData.investments)}
              </div>
              <div className="flex items-center text-sm text-green-600">
                <TrendingUp className="w-4 h-4 mr-1" />+
                {/* {portfolioOrder?.metrics?.holdingsReturn}% */}
                {portfolioData.investmentsChange}%
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#F3F4F6] border shadow-none">
            <CardContent className="p-6">
              <div className="text-sm text-[#9ea3ae] mb-2">My Cashflows</div>
              {/* <div className="text-2xl font-bold text-[#1a1b1d] mb-2">${portfolioOrder?.metrics?.cashFlows }</div> */}
              <div className="text-2xl font-bold text-[#1a1b1d] mb-2">{formatCurrencyWithOutZero(portfolioData.cashflows)}</div>
              <div className="flex items-center text-sm text-green-600">
                <TrendingUp className="w-4 h-4 mr-1" />+
                {/* {portfolioOrder?.metrics?.cashFlowReturn}% */}
                {portfolioData.cashflowsChange}%
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#F3F4F6] border shadow-none">
            <CardContent className="p-6">
              <div className="text-sm text-[#9ea3ae] mb-2">Annual Yields</div>
              <div className="text-2xl font-bold text-[#1a1b1d] mb-2">{portfolioData.annualYields}%</div>
              <div className="text-sm text-[#9ea3ae]">Average</div>
            </CardContent>
          </Card>
        </div>

        {/* Performance Chart and Overview */}
        <div className="flex  gap-6 mb-8">
          {/* <Card className="lg:col-span-2 border-0 bg-white">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className=" text-xl font-semibold text-[#1a1b1d]">
                  Performance
                </CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-sm bg-transparent"
                >
                  Last month
                </Button>
              </div>
              <hr/>
              <div className="flex items-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#3e54eb]"></div>
                  <span className="text-[#9ea3ae]">Gross yield</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#725aec]"></div>
                  <span className="text-[#9ea3ae]">Net yield</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#c4c4c4]"></div>
                  <span className="text-[#9ea3ae]">Potential equity</span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={performanceData}>
                    <XAxis dataKey="month" axisLine={false} tickLine={false} />
                    <YAxis axisLine={false} tickLine={false} />
                    <Line
                      type="monotone"
                      dataKey="grossYield"
                      stroke="#3e54eb"
                      strokeWidth={2}
                      dot={false}
                    />
                    <Line
                      type="monotone"
                      dataKey="netYield"
                      stroke="#725aec"
                      strokeWidth={2}
                      dot={false}
                    />
                    <Line
                      type="monotone"
                      dataKey="potentialEquity"
                      stroke="#c4c4c4"
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card> */}
         <PerformanceCard/>

          {/* <Card className="w-full border-0 bg-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl font-semibold text-[#1a1b1d]">
                Overview
              </CardTitle>
            </CardHeader>
            <hr />
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-[#9ea3ae]">Assets count</div>
                  <div className="font-semibold text-[#1a1b1d]">
                    {portfolioOrder?.summary.uniqueAssets}
                  </div>
                </div>
                <div>
                  <div className="text-[#9ea3ae]">Monthly Yields</div>
                  <div className="font-semibold text-[#1a1b1d]">
                    {portfolioOrder?.metrics?.monthlyCashFlow}{" "}
                  </div>
                </div>
                <div>
                  <div className="text-[#9ea3ae]">Total Tokens</div>
                  <div className="font-semibold text-[#1a1b1d]">
                    {portfolioOrder?.summary.totalTokens}
                  </div>
                </div>
                <div>
                  <div className="text-[#9ea3ae]">Next Distribution</div>
                  <div className="font-semibold text-[#1a1b1d]">
                    {formatDate(
                      portfolio?.portfolio?.assets[0]?.rentalDistributions[0]
                        ?.month as string
                    )}
                  </div>
                </div>
              </div>
              <div>
                <div className="text-[#9ea3ae] text-sm">Total Orders</div>
                <div className="font-semibold text-[#1a1b1d]">
                  {portfolio?.summary?.totalOrders}
                </div>
              </div>
              <Button variant="outline" className="w-full mt-4 bg-transparent">
                <Plus className="w-4 h-4 mr-2" />
                Import files (properties)
              </Button>
            </CardContent>
          </Card> */}
           <Card className="rounded-2xl border border-gray-200 bg-white w-[600px]">
      <CardHeader className="pb-3">
        <CardTitle className="text-2xl font-semibold text-foreground text-balance">
          Overview
        </CardTitle>
      </CardHeader>

      {/* subtle divider below header */}
      <div className="border-t border-gray-200" aria-hidden="true" />

      <CardContent className="pt-6 space-y-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* Asset Count */}
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Assets Count</p>
            <p className="text-2xl font-semibold text-foreground">
              {/* {portfolioOrder?.summary?.uniqueAssets ?? "-"} */}
              2
            </p>
          </div>

          {/* Monthly Yields */}
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Last Month Yields</p>
            <p className="text-xl font-semibold text-foreground">
              £
              {/* {portfolioOrder?.metrics?.monthlyCashFlow ?? "0"} */}
              100
            </p>
          </div>

            {/* Next Distribution */}
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Upcoming Distribution Date</p>
            <p className="text-xl font-semibold text-foreground">
              {/* {formatDate(
                portfolio?.portfolio?.assets?.[0]?.rentalDistributions?.[0]?.month ??
                  "10 Sep, 2025"
              )} */} 10 Sep, 2025
            </p>
          </div>

          {/* Total Tokens */}
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Upcoming Distribution</p>
            <p className="text-xl font-semibold text-foreground">
              £100
            </p>
          </div>

          
        </div>
      </CardContent>
    </Card>
        </div>

        {/* Assets Section */}
        {/* <Card className="border-0 bg-white">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <button
                  onClick={() => setSelectedTab("My Assets")}
                  className={`text-lg font-semibold pb-2 border-b-2 ${
                    selectedTab === "My Assets"
                      ? "text-[#1a1b1d] border-[#3e54eb]"
                      : "text-[#9ea3ae] border-transparent"
                  }`}
                >
                  My Assets
                </button>
                <button
                  onClick={() => setSelectedTab("Upcoming Earnings")}
                  className={`text-lg font-semibold pb-2 border-b-2 ${
                    selectedTab === "Upcoming Earnings"
                      ? "text-[#1a1b1d] border-[#3e54eb]"
                      : "text-[#9ea3ae] border-transparent"
                  }`}
                >
                  Upcoming Earnings
                </button>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Search className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4" />
                </Button>
                <Button
                  className="bg-[#3e54eb] hover:bg-[#3e54eb]/90"
                  size="sm"
                  onClick={() => router.push("/property")}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Invest more
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {portfolio?.portfolio?.assets.map((property) => (
                <Card
                  key={property._id}
                  className="border border-[#e4e4e4] hover:shadow-md transition-shadow"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="relative">
                        <img
                          src={
                            property.assetDetails.image || "/placeholder.svg"
                          }
                          alt="Property"
                          className="w-40 h-28 object-cover rounded-lg"
                        />
                      </div>

                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="font-semibold text-[#1a1b1d] mb-2">
                              {property.assetDetails.name}
                            </h3>
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-6 text-sm">
                          <div>
                            <div className="text-[#9ea3ae] mb-1">Market</div>
                            <div className="font-medium text-[#1a1b1d]">
                              {property.assetDetails.location}
                            </div>
                          </div>
                          <div>
                            <div className="text-[#9ea3ae] mb-1">
                              Owned since
                            </div>
                            <div className="font-medium text-[#1a1b1d]">
                              {property.investedDate}
                            </div>
                          </div>
                          <div>
                            <div className="text-[#9ea3ae] mb-1">
                              Target equity
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-[#1a1b1d]">
                                {property.tokens}
                              </span>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="p-0 h-auto"
                              >
                                <Edit className="w-4 h-4 text-[#9ea3ae]" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card> */}
        <MyAssetsTable/>
       </div>
        <div className="flex flex-col gap-6 px-4">
          <Banner
        icon={<AlertTriangle className="h-6 w-6 text-yellow-400" aria-hidden="true" />}
        title="Submit tax information"
        description="Redeem reward points or yields to unlock airline promo codes"
      />
      <Banner
        icon={<CircleMinus className="h-6 w-6 text-red-500" aria-hidden="true" />}
        title="Submit tax information"
        description="Redeem reward points or yields to unlock airline promo codes"
      />
      <ActivitiesCard />
        </div>
       </div>
      </div>
    </div>
  );
}
