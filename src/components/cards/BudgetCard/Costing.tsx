"use client";

import { useState } from "react";
import {
  InfoIcon,
  HelpCircle,
  WalletIcon,
  DollarSign,
  File,
  FilesIcon,
  CreditCard,
  Percent,
  TrendingUp,
  ChartPie,
  LucideGavel,
  HandCoins,
  BadgeDollarSign,
  Receipt,
  Building,
  UserPlus,
  IdCard,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatCurrency } from "@/lib/utils";
interface Fee {
  _id: string;
  assetId: string;
  type: string;
  name: string;
  value: number;
  isPercentage: boolean;
  status?: boolean;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

interface IProperty {
  basePropertyValue: number;
  totalPropertyValueAfterFees: number;
  fees?: {
    registration?: Fee[];
    legal?: Fee[];
    platform?: Fee[];
    brokerage?: Fee[];
  };
  tokenPrice: number;
}

const Costing = ({
  basePropertyValue,
  totalPropertyValueAfterFees,
  fees,
  tokenPrice,
}: IProperty) => {
  const registrationFeesList =
    fees?.registration?.filter((item) => item.status) || [];
  const legalFeesList = fees?.legal?.filter((item) => item.status) || [];
  const platFormFeeList = fees?.platform?.filter((item) => item.status) || [];
  const brokerageFeeList = fees?.brokerage?.filter((item) => item.status) || [];
  console.log("fees",fees)

  console.log("registrationFeesList", registrationFeesList);

  const additionalFeesList = [
    ...registrationFeesList,
    ...legalFeesList,
    ...platFormFeeList,
    brokerageFeeList,
  ];

  //registration fee listinng
  const totalRegistrationPercentage = registrationFeesList
    .filter((item) => item.isPercentage === true)
    .reduce((sum, item) => sum + item.value, 0);
  console.log(totalRegistrationPercentage, "Total register percentage");
  const totalRegistrationFixed = registrationFeesList
    .filter((item) => !item.isPercentage)
    .reduce((sum, item) => sum + item.value, 0);

  const totalRegistrationValue =
    (basePropertyValue * totalRegistrationPercentage) / 100 +
    totalRegistrationFixed;

  //legal fee
  const totalLegalPercentage = legalFeesList
    .filter((item) => item.isPercentage)
    .reduce((sum, item) => sum + item.value, 0);

    console.log("legalFeesList",legalFeesList)

  const totalLegalFixed = legalFeesList
    .filter((item) => !item.isPercentage)
    .reduce((sum, item) => sum + item.value, 0);

  const totalLegalValue =
    (basePropertyValue * totalLegalPercentage) / 100 + totalLegalFixed;

  //plqtform

  const totalPlatFormPercentage = platFormFeeList
    .filter((item) => item.isPercentage)
    .reduce((sum, item) => sum + item.value, 0);

  const totalPlatformFixed = platFormFeeList
    .filter((item) => !item.isPercentage)
    .reduce((sum, item) => sum + item.value, 0);

  const totalPlatformValue =
    (basePropertyValue * totalPlatFormPercentage) / 100 + totalPlatformFixed;

  console.log("totalPlatformValue", totalPlatformValue);

  //bokerage

  const totalBokeragePercentage = platFormFeeList
    .filter((item) => item.isPercentage)
    .reduce((sum, item) => sum + item.value, 0);

  const totalBokerageFixed = platFormFeeList
    .filter((item) => !item.isPercentage)
    .reduce((sum, item) => sum + item.value, 0);

  const totalBokerageValue =
    (basePropertyValue * totalBokeragePercentage) / 100 + totalBokerageFixed;
  console.log("totalLegalPercentage", totalLegalPercentage);

  console.log("totalBokerageValue", totalBokerageValue);
  console.log("totalRegistrationValue", totalRegistrationValue);
  console.log("totalLegalValue", totalLegalValue);
  console.log("totalPlatformValue", totalPlatformValue);

  const totalCost =
    basePropertyValue +
    totalRegistrationValue +
    totalLegalValue +
    totalBokerageValue +
    totalPlatformValue;

  console.log(totalCost);

  const basePricePercentage = (basePropertyValue / totalCost) * 100;
  const registrationPercentage = (totalRegistrationValue / totalCost) * 100;
  const legalPercentage = (totalLegalValue / totalCost) * 100;
  const brokeragePercentage = (totalBokerageValue / totalCost) * 100;
  const platformPercentage = (totalPlatformValue / totalCost) * 100;

  const totalAdditionalCosts =
    totalRegistrationValue +
    totalLegalValue +
    totalBokerageValue +
    totalPlatformValue;
  const additionalCostsPercentage =
    (totalAdditionalCosts / basePropertyValue) * 100;

  const costItems = [
    {
      name: "Property Price",
      value: basePropertyValue,
      percentage: basePricePercentage,
      color: "bg-emerald-500",
      icon: <Building size={18} className="text-emerald-700" />,
    },
    {
      name: "Registration Fees",
      value: totalRegistrationValue,
      percentage: registrationPercentage,
      color: "bg-blue-500",

      icon: <IdCard size={18} className="text-blue-700" />,
      tooltip: true,
    },
    {
      name: "Legal Fees",
      value: totalLegalValue,
      percentage: legalPercentage,
      color: "bg-amber-500",

      icon: <LucideGavel size={18} className="text-amber-700" />,
      tooltip: true,
    },
    {
      name: "Brokerage Charges",
      value: totalBokerageValue,
      percentage: brokeragePercentage,
      color: "bg-purple-500",

      icon: <HandCoins size={18} className="text-purple-700" />,
    },
    {
      name: "Platform Fee",
      value: totalPlatformValue,
      percentage: platformPercentage,
      color: "bg-red-500",

      icon: <BadgeDollarSign size={18} className="text-red-700" />,
    },
  ];

  const investmentSummary = [
    {
      name: "Total Investment",
      value: basePropertyValue,
      color: "bg-emerald-500",
      text: "Complete Investment Amount",
      icon: <WalletIcon size={18} className="text-emerald-700" />,
    },
    {
      name: "Cost Per Token",
      value: tokenPrice,
      color: "bg-blue-500",
      text: "Price Per individual token",
      icon: <DollarSign size={18} className="text-blue-700" />,
    },
    {
      name: "Additional Costs",
      value: totalAdditionalCosts,
      color: "bg-red-500",
      text: "Fees and other expenses",
      tooltip: "Additional costs are the sum of all applicable fees",
      icon: <File size={18} className="text-red-700" />,
    },
    {
      name: "Value Change ",
      value: additionalCostsPercentage,
      color: "bg-yellow-500",
      text: "Annual Return On Investment",
      icon: <TrendingUp size={18} className="text-yellow-700" />,
    },
    {
      name: "Investment Overview",
      value: totalCost,
      color: "bg-green-500",
      text: "Summary of investment Perfomance",
      icon: <ChartPie size={18} className="text-green-700" />,
    },
  ];
  const truncate = (num: number, decimals = 1) => {
    const factor = Math.pow(10, decimals);
    return Math.floor(num * factor) / factor;
  };

  return (
    <div className="bg-white">
      <div className="space-y-2 ">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">Cost Breakdown</h3>
          <div className="flex items-center gap-2">
            <span className="font-medium text-sm text-gray-900">
              {formatCurrency(totalCost)}
            </span>
          </div>
        </div>

        <div className="h-8 w-full flex rounded-md overflow-hidden">
          {costItems.map((item, index) => (
            <TooltipProvider key={index} delayDuration={0}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div
                    className={`${item.color} h-full flex items-center justify-center text-xs font-medium text-white`}
                    style={{ width: `${item.percentage}%` }}
                  ></div>
                </TooltipTrigger>
                <TooltipContent
                  side="top"
                  className="bg-gray-900 text-white px-3 py-2 rounded-md shadow-lg border border-gray-700"
                >
                  <p className="font-medium text-sm whitespace-nowrap">
                    <span className="text-gray-300">{item.name}</span>
                    <span className="mx-2">:</span>
                    <span className="text-white">
                      {formatCurrency(item.value)}
                    </span>
                    <span className="mx-2">
                      ({Math.round(item.percentage)}%)
                    </span>
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </div>

        <p className="text-xs text-muted-foreground">
          Hover over sections to see details
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-2">
          {costItems.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-md ${item.color}`} />
              <span className="text-sm text-gray-600">{item.name}</span>
            </div>
          ))}
        </div>
      </div>

      <Tabs defaultValue="cost-breakdown" className="space-y-2 mt-2">
        <TabsList className="w-full flex bg-white rounded-xl p-0">
          <TabsTrigger
            value="cost-breakdown"
            className="w-full py-2 px-4 text-sm font-medium transition-all duration-200 data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-blue-400 rounded-none "
          >
            <div className="flex items-center gap-2">
              <FilesIcon size={14} />
              Cost Breakdown
            </div>
          </TabsTrigger>
          <TabsTrigger
            value="investment-summary"
            className="w-full py-2 px-4 text-sm font-medium transition-all duration-200 data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-blue-400 rounded-none "
          >
            <div className="flex items-center gap-2">
              <ChartPie size={14} />
              Investment Summary
            </div>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="cost-breakdown" className="mt-4">
          <div className="flex flex-col space-y-4">
            <>
              {costItems.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex w-full bg-white p-2 rounded-md items-center justify-between gap-4 shadow-sm border border-gray-100">
                    <div
                      className={`w-8 h-8 flex items-center justify-center rounded-full ${item.color} bg-opacity-20`}
                    >
                      {item.icon}
                    </div>

                    <div className="flex-1 flex flex-col justify-start space-y-1">
                      <div className="flex items-center gap-1">
                        <span className="font-medium text-sm text-gray-800">
                          {item.name}
                        </span>
                        {item.tooltip && (
                          <TooltipProvider delayDuration={0}>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <HelpCircle
                                  size={14}
                                  className="text-muted-foreground hover:text-gray-600 transition-colors cursor-pointer"
                                />
                              </TooltipTrigger>
                              <TooltipContent
                                side="right"
                                className="max-w-xs bg-gray-900 text-white px-4 py-3 rounded-md shadow-lg border border-gray-700"
                              >
                                <h4 className="font-semibold text-xs text-gray-300 border-b border-gray-700 pb-2 mb-2">
                                  Fees Breakdown
                                </h4>
                                <div className="space-y-2 text-sm">
                                  {(item.name === "Registration Fees"
                                    ? registrationFeesList
                                    : item.name === "Legal Fees"
                                    ? legalFeesList
                                    : []
                                  ).map((fee) => (
                                    <div
                                      key={fee._id}
                                      className="flex justify-between items-center text-xs gap-4"
                                    >
                                      <div className="flex items-center gap-2">
                                        <div
                                          className={`rounded-full w-2 h-2 ${item.color}`}
                                        />
                                        <span className="text-white">
                                          {fee.name}
                                        </span>
                                      </div>
                                      <span className="text-white font-medium">
                                        {fee.isPercentage
                                          ? `${fee.value}%`
                                          : formatCurrency(fee.value)}
                                      </span>
                                    </div>
                                  ))}
                                </div>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        )}
                      </div>
                      <span className="text-xs text-gray-500">
                        {item.percentage
                          ? `${truncate(item.percentage)}% of a total cost`
                          : formatCurrency(item.value)}
                      </span>
                    </div>

                    <div className="flex items-center justify-end">
                      {item.value > 0 ? (
                        <span className="font-medium text-sm text-gray-900">
                          {formatCurrency(item.value)}
                        </span>
                      ) : (
                        <div className="flex flex-col items-end justify-center">
                          <span className="text-sm text-gray-400">
                            {" "}
                            {formatCurrency(0)}
                          </span>
                          <span className="text-xs text-gray-500">
                            Not Applicable
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              <div className="flex w-full bg-[#f0f6ff] p-2 rounded-xl items-center justify-between gap-4 shadow-sm border border-gray-100">
                <div
                  className={`w-8 h-8 flex items-center justify-center rounded-full bg-[#dbebff] `}
                >
                  <WalletIcon size={18} className="text-gray-700" />
                </div>

                <div className="flex-1 flex flex-col justify-start space-y-1">
                  <div className="flex items-center gap-1">
                    <span className="font-medium text-sm text-gray-800">
                      Total Cost
                    </span>
                  </div>
                  <span className="text-xs text-gray-500">
                    Sum of all applicable fees
                  </span>

                  <span className="text-xs text-gray-500"></span>
                </div>

                <div className="flex items-center justify-end">
                  <span className="font-medium text-sm text-gray-900">
                    {formatCurrency(totalCost)}
                  </span>
                </div>
              </div>
            </>
          </div>
        </TabsContent>

        <TabsContent value="investment-summary" className="mt-4  ">
          <div className="flex flex-col space-y-4">
            <>
              {investmentSummary.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex w-full bg-white p-2 rounded-md items-center justify-between gap-4 shadow-sm border border-gray-100">
                    <div
                      className={`w-8 h-8 flex items-center justify-center rounded-full ${item.color} bg-opacity-20`}
                    >
                      {item.icon}
                    </div>

                    <div className="flex-1 flex flex-col justify-start space-y-1">
                      <div className="flex items-center gap-1">
                        <span className="font-medium text-sm text-gray-800">
                          {item.name}
                        </span>
                        {item.tooltip && (
                          <TooltipProvider delayDuration={0}>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <HelpCircle
                                  size={14}
                                  className="text-muted-foreground hover:text-gray-600 transition-colors cursor-pointer"
                                />
                              </TooltipTrigger>
                              <TooltipContent
                                side="right"
                                className="max-w-xs bg-gray-900 text-white px-4 py-3 rounded-md shadow-lg border border-gray-700"
                              >
                                <h4 className="font-semibold text-xs text-gray-300 border-b border-gray-700 pb-2 mb-2">
                                  Fees Breakdown
                                </h4>
                                <div className="space-y-2 text-sm">
                                  {additionalFeesList.map((fee: any) => (
                                    <div
                                      key={fee._id}
                                      className="flex justify-between items-center text-xs gap-4"
                                    >
                                      <div className="flex items-center gap-2">
                                        <span className="text-white">
                                          {fee.name}
                                        </span>
                                      </div>
                                      <span className="text-white font-medium">
                                        {fee.isPercentage
                                          ? `${fee.value}%`
                                          : formatCurrency(fee.value)}
                                      </span>
                                    </div>
                                  ))}
                                </div>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        )}
                      </div>
                      <span className="text-xs text-gray-500">{item.text}</span>
                    </div>

                    <div className="flex items-center justify-end">
                      <span className="font-medium text-sm text-gray-900">
                        {formatCurrency(item.value)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Costing;
