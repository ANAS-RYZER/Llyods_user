"use client";

import type React from "react";

import { useState } from "react";
import Image from "next/image";
import { ExternalLink, Info, PoundSterling, Users } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn, formatCurrency, formatDate } from "@/lib/utils";
import { Tenant } from "@/constants/global";
import { IRentalInformation } from "@/constants/global";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
export default function TenantInformation({
  tenants,
  rentInformation,
  totalSft,
}: {
  tenants: Tenant[];
  rentInformation: IRentalInformation;
  totalSft: number;
}) {
  const [selectedTenant, setSelectedTenant] = useState(tenants[0]?._id || "");
  const [rentView, setRentView] = useState("monthly");

  console.log(rentInformation?.expenses?.monthlyExpenses);
  const activeTenant =
    tenants.find((tenant) => tenant._id === selectedTenant) || tenants[0];

  return (
    <Accordion
      type="single"
      collapsible
      className="w-full bg-white rounded-2xl border border-[#EBEBEB] my-2"
      defaultValue="tenant-information"
    >
      <AccordionItem value="tenant-information">
        <AccordionTrigger className="p-4 border-b  hover:no-underline">
          <div className="flex items-center gap-2 ">
            <div className="text-gray-800 bg-blue-100 rounded-2xl p-2 hover:text-gray-900">
              <Users size={16} />
            </div>
            <span className="text-lg font-semibold text-gray-900 *:">
              Tenant Information
            </span>
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <div className="p-2">
            {/* Summary Stats */}
            <div className="grid grid-cols-4  gap-4 mb-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-gray-500 text-sm mb-1">
                  Total Area (SFT)
                </div>
                <div className="text-lg font-bold">{totalSft}</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-gray-500 text-sm mb-1">Rent Per SFT</div>
                <div className="text-lg flex items-center gap-1 font-bold">
                  {formatCurrency(rentInformation?.rentPerSft)}
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-gray-500 text-sm mb-1">
                  Vacancy Rate (%)
                </div>
                <div className="text-lg font-bold">
                  {rentInformation?.vacancyRate}%
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-gray-500 text-sm mb-1">
                  Total Gross Rent
                </div>
                <div className="text-lg font-bold">
                  {formatCurrency(rentInformation?.grossMonthlyRent)}
                </div>
              </div>
            </div>

            {/* Rental Income */}
            {/* <div className="border rounded-lg mb-6">
              <div className="p-4 border-b flex justify-between items-center">
                <h3 className="text-lg font-bold">Rental Income</h3>
                <div className="bg-gray-100 rounded-full p-1">
                  <Tabs value={rentView} onValueChange={setRentView}>
                    <TabsList className="bg-transparent">
                      <TabsTrigger
                        value="monthly"
                        className={cn(
                          "text-sm rounded-full px-4 py-1",
                          rentView === "monthly"
                            ? "bg-white shadow-sm"
                            : "bg-transparent"
                        )}
                      >
                        Monthly Rent
                      </TabsTrigger>
                      <TabsTrigger
                        value="yearly"
                        className={cn(
                          "text-sm rounded-full px-4 py-1",
                          rentView === "yearly"
                            ? "bg-white shadow-sm"
                            : "bg-transparent"
                        )}
                      >
                        Yearly Rent
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 p-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-gray-500 text-sm mb-1">Gross Rent</div>
                  <div className="text-lg font-bold">
                    {formatCurrency(
                      rentView === "monthly"
                        ? rentInformation?.grossMonthlyRent
                        : rentInformation?.grossAnnualRent
                    )}
                  </div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg flex items-start justify-between">
                  <div>
                    <div className="text-gray-500 text-sm mb-1">Expenses</div>
                    <div className="text-lg font-bold">
                      {formatCurrency(
                        rentView === "monthly"
                          ? rentInformation?.expenses?.monthlyExpenses
                          : rentInformation?.expenses?.annualExpenses
                      )}
                    </div>
                  </div>
                  <Info className="h-4 w-4 text-gray-400 mt-1" />
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="text-gray-500 text-sm mb-1">Net Rent</div>
                  <div className="text-lg font-bold text-green-600">
                    {formatCurrency(
                      rentView === "monthly"
                        ? rentInformation?.netMonthlyRent
                        : rentInformation?.netAnnualRent
                    )}
                  </div>
                </div>
              </div>
            </div> */}

            {/* Current Tenants */}
            <div className="border rounded-lg">
              <div className="p-4 border-b">
                <h3 className="text-lg font-bold">Current Tenants</h3>
              </div>

              <div className="border-b">
                <div className="flex overflow-x-auto">
                  {tenants
                    .filter((t) => t.status === "active")
                    .map((tenant) => (
                      <button
                        key={tenant._id}
                        className={cn(
                          "px-6 py-3 whitespace-nowrap",
                          selectedTenant === tenant._id
                            ? "border-b-2 border-blue-600 font-medium"
                            : ""
                        )}
                        onClick={() => setSelectedTenant(tenant._id)}
                      >
                        {tenant?.name}
                      </button>
                    ))}
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative h-16 w-16 rounded-full bg-gray-100 overflow-hidden">
                    <Image
                      src={activeTenant?.logo || "/coursel.jpg"}
                      alt={activeTenant?.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold">
                      {activeTenant?.name}
                    </h4>
                    <p className="text-gray-500">{activeTenant?.type}</p>
                  </div>
                  <div className="ml-auto">
                    <span className="bg-green-100 text-green-800 text-xs font-medium px-3 py-1 rounded-full">
                      Tenant{" "}
                      {tenants?.findIndex((t) => t._id === selectedTenant) + 1}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2  space-y-3">
                  <div>
                    <div className="text-gray-500 text-sm mb-1">
                      Lease period
                    </div>
                    <div className="text-md font-semibold">
                      {activeTenant?.leasePeriod} Months
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-500 text-sm mb-1">Start Date</div>
                    <div className="text-md font-semibold">
                      {formatDate(activeTenant?.startDate)}
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-500 text-sm mb-1">
                      Lock-in Period
                    </div>
                    <div className="text-md font-semibold">
                      {activeTenant?.lockInPeriod} Months
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-500 text-sm mb-1">
                      Total Occupied SFT
                    </div>
                    <div className="text-md font-semibold">
                      {activeTenant?.sftsAllocated}
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-500 text-sm mb-1">
                      Rent Per SqFt
                    </div>
                    <div className="text-md font-semibold">
                      {" "}
                      {formatCurrency(activeTenant?.rentPerSft)}
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-500 text-sm mb-1">
                      Security deposit
                    </div>
                    <div className="text-md font-semibold">
                      {" "}
                      {formatCurrency(activeTenant?.securityDeposit)}{" "}
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-center border-t border-gray-200 mt-2">
                  <div>
                    <div className="text-gray-500 text-sm mt-4 ">
                      Annual Rent Escalation
                    </div>
                    <div className="text-md font-semibold text-green-600">
                      {activeTenant?.annualRentEscalation}% Per year
                    </div>
                  </div>
                  <Button variant="outline" className="flex items-center">
                    <a
                      href={activeTenant?.agreement}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-blue-600 hover:text-blue-800"
                    >
                      <span className="mr-2">Lease agreement</span>
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
