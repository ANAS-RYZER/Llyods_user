"use client";

import React, { useState } from "react";
import dynamic from 'next/dynamic';
import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight, CoinsIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useFetchOrder } from "@/hooks/order/useFetchOrders";
import { getStatusClasses } from "@/constants/helper";
import { formatDate, formatString } from "@/lib/utils";
import { FilterDropdown } from "./FilterDropdown";
import { Skeleton } from "@/components/ui/skeleton";
import NothingFound from "../common/NothingFound";
import { Input } from "../ui/input";
import CustomDatePicker from "@/constants/CustomDatePicker";
import { ScrollArea } from "../ui/scroll-area";
import { Select, SelectContent, SelectValue, SelectItem, SelectTrigger } from "@/components/ui/select";
const Table = dynamic(() => import("@/components/ui/table").then(mod => mod.Table), { ssr: false });
const TableBody = dynamic(() => import("@/components/ui/table").then(mod => mod.TableBody), { ssr: false });
const TableCell = dynamic(() => import("@/components/ui/table").then(mod => mod.TableCell), { ssr: false });
const TableHead = dynamic(() => import("@/components/ui/table").then(mod => mod.TableHead), { ssr: false });
const TableHeader = dynamic(() => import("@/components/ui/table").then(mod => mod.TableHeader), { ssr: false });
const TableRow = dynamic(() => import("@/components/ui/table").then(mod => mod.TableRow), { ssr: false });

export const OrdersTable = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const [dateRange, setDateRange] = useState<{ from: Date; to?: Date } | undefined>(undefined);
  const [quickSelect, setQuickSelect] = useState<string>("");
  const { data: orders, loading, pagination } = useFetchOrder(selectedStatus, dateRange, quickSelect, page, limit);
  const router = useRouter();

  const navigateToOrder = (orderId: string) => {
    router.push(`/orders/${orderId}`);
  };

  const handleFiltersChange = (filters: { id: string; enabled: boolean; label: string }[]) => {
    const enabledFilters = filters.filter((filter) => filter.enabled);
    setSelectedStatus(enabledFilters.length > 0 ? enabledFilters[0].id : "");
  };

  const handleQuickSelect = (value: string) => {
    setQuickSelect(value);
    setDateRange(undefined);
  };

  const handleLimitChange = (value: string) => {
    setLimit(Number(value));
    setPage(1);
  };

  const renderTableHeader = () => (
    <TableHeader>
      <TableRow className="bg-gray-50">
        <TableHead className="px-2 py-4 text-left text-sm font-medium text-gray-900">Order ID</TableHead>
        <TableHead className="px-2 py-4 text-left text-sm font-medium text-gray-900">Asset Name</TableHead>
        <TableHead className="px-2 py-4 text-left text-sm font-medium text-gray-900">No. of Tokens</TableHead>
        <TableHead className="px-2 py-4 text-left text-sm font-medium text-gray-900"> Token Amount</TableHead>
        <TableHead className="px-2 py-4 text-left text-sm font-medium text-gray-900">Payment Type</TableHead>
        <TableHead className="px-2 py-4 text-left text-sm font-medium text-gray-900">Order Date</TableHead>
        <TableHead className="px-2 py-4 text-left text-sm font-medium text-gray-900">Order Status</TableHead>
        <TableHead className="px-2 py-4 text-right text-sm font-medium text-gray-900">Action</TableHead>
      </TableRow>
    </TableHeader>
  );

  const renderTableRow = (order: any) => {
    const statusClasses = getStatusClasses(order.currentStatus);
    console.log(statusClasses)
    return (
      <TableRow key={order._id} className="hover:bg-gray-50 transition-colors duration-150">
        <TableCell className="px-2 py-4 text-sm text-gray-900">{order._id || 'N/A'}</TableCell>
        <TableCell className="px-2 py-4 text-sm text-gray-900">{formatString(order.assetId?.name || 'N/A' )}</TableCell>
        <TableCell className="px-2 py-4 text-sm text-gray-900">
          <div className="text-gray-600 flex items-center justify-start text-sm">
            <div className="flex items-center gap-2 bg-blue-50 p-1 rounded-full">
              <CoinsIcon size={14} />
            </div>

            {order.tokensBooked}
          </div>
        </TableCell>
        <TableCell className="px-2 py-4 text-sm text-gray-900">
          <div className="text-gray-600 flex flex-col items-start justify-start text-sm">
            <span className="font-semibold">{order.currency}</span>
            <span className="text-xs text-gray-400">
              {order.paymentType}
            </span>
          </div>
        </TableCell>
        <TableCell className="px-2 py-4 text-sm text-gray-900">{formatString(order.paymentType || 'N/A')}</TableCell>

        <TableCell className="px-2 py-4 text-sm text-gray-900">{formatDate(order.createdAt || 'N/A')}</TableCell>
        <TableCell className="px-2 py-4">

          <div className={`${statusClasses.textClass} ${statusClasses.bgClass} ${statusClasses.rounded} px-3 py-1 text-sm font-medium inline-block`}>
            {statusClasses.text}
          </div>
        </TableCell>
        <TableCell className="px-2 py-4 text-right">
          <Button variant="ghost" onClick={() => navigateToOrder(order._id)} className="flex items-center gap-2 hover:bg-gray-100">
            <ChevronRight className="w-4 h-4" />
          </Button>
        </TableCell>
      </TableRow>
    );
  };

  const renderSkeletonRows = () => {
    return Array.from({ length: 5 }).map((_, idx) => (
      <TableRow key={idx}>
        {Array.from({ length: 6 }).map((_, colIdx) => (
          <TableCell key={colIdx} className="px-6 py-4">
            <Skeleton className="h-4 w-full" />
          </TableCell>
        ))}
      </TableRow>
    ));
  };


  const handleCustomDateSelect = (dates: { from: Date; to?: Date }) => {
    setDateRange(dates.to ? dates : undefined);
    setQuickSelect("");
  }



  return (
    <div className="w-full">
      <div className="flex flex-col">
        <h1 className="text-2xl font-bold">My Orders</h1>
        <span className="text-sm text-gray-500">Manage and track your orders Investment</span>
      </div>

      <div className="flex flex-col md:flex-row p-4 justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-2 ">
          <Input type="text" placeholder="Search" className="h-[35px]" />
          <CustomDatePicker
            className="w-full lg:w-full md:w-full sm:w-full"
            onDateSelect={handleCustomDateSelect}
            initialDateRange={dateRange}
          />
        </div>
        <div className="">
          <div className="flex items-center justify-between space-x-2">
            <Select
              value={quickSelect}
              onValueChange={handleQuickSelect}
            >
              <SelectTrigger className="w-full h-8">
                <SelectValue placeholder="Quick Select" />
              </SelectTrigger>
              <SelectContent>
                <ScrollArea className="h-[200px]">
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="last-week">Last Week</SelectItem>
                  <SelectItem value="last-month">Last Month</SelectItem>
                  <SelectItem value="last-3-months">Last 3 Months</SelectItem>
                  <SelectItem value="last-6-months">Last 6 Months</SelectItem>
                  <SelectItem value="last-year">Last Year</SelectItem>
                </ScrollArea>
              </SelectContent>
            </Select>
            <FilterDropdown onFiltersChange={handleFiltersChange} selectedStatus={selectedStatus} />
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <Table className="w-full border rounded-lg border-gray-200 ">
          {renderTableHeader()}
          <TableBody>
            {loading
              ? renderSkeletonRows()
              : orders.map((order: any) => renderTableRow(order))}
            {!loading && orders.length === 0 && (
              <TableRow>
                <TableCell colSpan={8} className="py-8">
                  <div className="flex items-center justify-center w-full">
                    <NothingFound text="No orders found" />
                  </div>
                </TableCell>
              </TableRow>
            )}

          </TableBody>
        </Table>
        {pagination && (
          <div className="flex flex-col md:flex-row justify-between items-center mt-4 gap-4">
            <div className="flex items-center gap-2">
              <Select
                value={limit.toString()}
                onValueChange={handleLimitChange}
              >
                <SelectTrigger className="w-[80px]  focus:ring-0 h-6 border-none">
                  <SelectValue placeholder="10" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1</SelectItem>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="25">25</SelectItem>

                </SelectContent>
              </Select>
              <span className="text-sm text-gray-600">per page</span>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <span className="text-sm text-gray-600">
                Page {page} of {pagination.totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage(page + 1)}
                disabled={page === pagination.totalPages}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
