"use client";

import type React from "react";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { ChartLine, ChevronDown, PoundSterling } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { IProperty } from "@/constants/global";
import Image from "next/image";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn, formatCurrency, roundDownToOneDecimal } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import usePlaceOrderApi from "@/hooks/property/usePlaceOrderApi";
import { useParams } from "next/navigation";
import { toast } from "react-toastify";
import { useWebSocket } from "@/hooks/websocket/useWebSocket";

interface TokenPaymentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (response: any) => void;
  property: IProperty;
  totalPrice: number;
  onClick: () => void;
  quantity: number;
  ownerShip: number;
}

export default function TokenPaymentDialog({
  open,
  onOpenChange,
  onSubmit,
  property,
  totalPrice,
  onClick,
  quantity,
  ownerShip,
}: TokenPaymentDialogProps) {
  const [paymentOption, setPaymentOption] = useState("full-payment");
  const [showOrderSummary, setShowOrderSummary] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const { placeOrder, loading, error } = usePlaceOrderApi();
  const [totalPriceInUSDT, setTotalPriceInUSDT] = useState(0);
  const usdtRate = 85; // 1 USDT = £85

  // const BINANCE_TRADE_STREAM_URL =
  //   "wss://stream.binance.com:9443/ws/usdtinr@trade";
  // const { price: usdtRate, isConnected, error: usdtError } = useWebSocket(
  //   BINANCE_TRADE_STREAM_URL
  // );
  // console.log("usdtRate ->", usdtRate);
  // console.log("isConnected ->", isConnected);
  // console.log("usdtError ->", usdtError);

  // useEffect(() => {
  //   if (usdtRate) {
  //     setTotalPriceInUSDT(Number((totalPrice / usdtRate).toFixed(2)));
  //   } else {
  //     setTotalPriceInUSDT(Number((totalPrice / 85).toFixed(2)));
  //   }
  // }, [usdtRate, totalPrice]);

  const { propertyID } = useParams();
  useEffect(() => {
    setTotalPriceInUSDT(Number((totalPrice / usdtRate).toFixed(2)));
  }, [usdtRate, totalPrice]);
  const handlePayment = async () => {
    const order = {
      tokensBooked: quantity,
      paymentType: paymentOption,
      currency: selectedPaymentMethod,
    };

    try {
      const res = await placeOrder({ propertyID: propertyID as string, order });
      if (res) {
        onSubmit(res);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center animate-spin bg-black h-full"></div>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
        className="w-full max-w-[500px] overflow-y-auto h-[80vh] p-4 rounded-xl"
      >
        <DialogHeader>
          <DialogTitle>Buy Property Token</DialogTitle>
          <DialogDescription className="flex items-center gap-2">
            {property?.name} |{" "}
            <span className="text-green-500 flex items-center gap-2">
              <ChartLine size={16} /> Property Token ={" "}
              {property?.tokenInformation?.tokenPrice}
            </span>
          </DialogDescription>
        </DialogHeader>
        <div className="bg-gray-100 border border-gray-200 rounded-xl p-4 space-y-2 ">
          <div className=" ">
            <h3 className="text-lg font-semibold mb-2">Payment Options</h3>

            <RadioGroup
              value={paymentOption}
              onValueChange={setPaymentOption}
              className="space-y-2"
            >
              <div
                className={cn(
                  "flex justify-between items-center p-4 rounded-lg border",
                  paymentOption === "full-payment"
                    ? "border-[#EBEFF5] bg-gray-300/40"
                    : "border-gray-200"
                )}
              >
                <div className="flex items-start gap-3">
                  <RadioGroupItem
                    value="full-payment"
                    id="full-payment"
                    className="mt-1  data-[state=checked]:bg-[#EBEFF5] bg-gray-300/40"
                  />
                  <div>
                    <Label
                      htmlFor="full-payment"
                      className="text-base font-medium"
                    >
                      Full payment now
                    </Label>
                    <p className="text-sm w-56 text-gray-500">
                      Pay the entire amount and start earning returns
                      immediately
                    </p>
                  </div>
                </div>
                <div className="text-lg font-semibold">
                  {formatCurrency(totalPrice)}
                </div>
              </div>

              <div
                className={cn(
                  "flex justify-between items-center p-4 rounded-lg border",
                  paymentOption === "partial"
                    ? "border-blue-200 bg-blue-50"
                    : "border-gray-200"
                )}
              >
                <div className="flex items-start gap-3">
                  <RadioGroupItem
                    value="partial"
                    id="partial-payment"
                    className="mt-1"
                    disabled
                  />
                  <div>
                    <Label
                      htmlFor="partial-payment"
                      className="text-base font-medium"
                    >
                      10% now, rest later
                    </Label>
                    <p className="text-sm text-gray-500">
                      Pay 10% to secure your investment. Complete payment after
                      agreement signatures
                    </p>
                    <Button variant="outline" size="sm" className="mt-2">
                      Coming Soon
                    </Button>
                  </div>
                </div>
              </div>
            </RadioGroup>
          </div>

          <div className="bg-gray-200 border border-gray-300 rounded-xl p-4">
            <div className="flex justify-between">
              <h3 className="text-lg font-semibold mb-4">Payment Method</h3>
              <h1 className="text-xl font-bold mb-4">
                {formatCurrency(totalPrice)}
              </h1>
            </div>

            <Tabs defaultValue="web3" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="fiat">Fiat</TabsTrigger>
                <TabsTrigger value="web3">Crypto</TabsTrigger>
              </TabsList>
              <TabsContent value="fiat" className="mt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div
                    className={cn(
                      "flex flex-col border items-start bg-gray-200 justify-start hover:bg-[#EEF2FF]/80 transition-all duration-300 border-gray-300 rounded-xl p-2 cursor-pointer",
                      selectedPaymentMethod === "cashfree" &&
                        "border-blue-500 bg-blue-50"
                    )}
                    onClick={() => setSelectedPaymentMethod("cashfree")}
                  >
                    <h1 className="text-sm font-medium">Cash free </h1>
                    <Image src="/cash.svg" alt="upi" width={85} height={85} />
                    <span className="text-sm text-gray-500">
                      UPI, Cards , Net Banking
                    </span>
                  </div>

                  <div
                    className={cn(
                      "flex flex-col border items-start bg-gray-200 justify-start hover:bg-[#EEF2FF]/80 transition-all duration-300 border-gray-300 rounded-xl p-2 cursor-pointer",
                      selectedPaymentMethod === "stripe" &&
                        "border-blue-500 bg-blue-50"
                    )}
                    onClick={() => setSelectedPaymentMethod("stripe")}
                  >
                    <h1 className="text-sm font-medium">Stripe </h1>
                    <Image src="/strip.svg" alt="upi" width={85} height={85} />
                    <span className="text-sm text-gray-500">
                      International Cards
                    </span>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="web3" className="mt-4">
                <div className="grid grid-cols-3 gap-4">
                  <div
                    className={cn(
                      "flex flex-col border items-start bg-gray-200 justify-start hover:bg-[#EEF2FF]/80 transition-all duration-300 border-gray-300 rounded-xl p-2 cursor-pointer",
                      selectedPaymentMethod === "usdt" &&
                        "border-blue-500 bg-blue-50"
                    )}
                    onClick={() => setSelectedPaymentMethod("usdt")}
                  >
                    <h1 className="text-sm font-medium">USDT </h1>
                    <h1 className="text-md text-black font-semibold">
                      {totalPriceInUSDT} USDT
                    </h1>
                    <span className="text-sm text-gray-500">
                      1 USDT = <PoundSterling />
                      {usdtRate}
                    </span>
                  </div>
                  <div
                    className={cn(
                      "flex flex-col border items-start justify-start disabled transition-all duration-300 border-gray-300 rounded-xl bg-gray-200 p-2",
                      selectedPaymentMethod === "xrp" &&
                        "border-blue-500 bg-blue-50"
                    )}
                    onClick={() => setSelectedPaymentMethod("xrp")}
                  >
                    <h1 className="text-md font-semibold">XRP </h1>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full"
                      disabled
                    >
                      Coming Soon
                    </Button>
                  </div>
                  <div
                    className={cn(
                      "flex flex-col border items-start justify-start border-gray-300 rounded-xl bg-gray-200 p-2",
                      selectedPaymentMethod === "ryzerx" &&
                        "border-blue-500 bg-blue-50"
                    )}
                    onClick={() => setSelectedPaymentMethod("ryzerx")}
                  >
                    <h1 className="text-md font-semibold">RYZER </h1>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full"
                      disabled
                    >
                      Coming Soon
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        <div className="flex flex-col bg-gray-50 border border-gray-200 rounded-lg p-4">
          <div className="flex justify-between items-center">
            <h1 className="text-lg font-semibold text-gray-700">
              Order Summary
            </h1>
            <ChevronDown
              size={20}
              className={`cursor-pointer transition-transform duration-300 ${
                showOrderSummary ? "rotate-180" : ""
              }`}
              onClick={() => setShowOrderSummary(!showOrderSummary)}
            />
          </div>

          <div
            className={`w-full transition-all duration-300 ease-in-out transform ${
              showOrderSummary
                ? "opacity-100 max-h-[1000px]"
                : "opacity-0 max-h-0 overflow-hidden"
            }`}
          >
            <div className="mt-4 space-y-3">
              <div className="flex items-center justify-between ">
                <div className="flex items-center gap-2">
                  <span className="text-gray-600 font-medium">Property</span>
                </div>
                <span className="text-gray-700 text-md font-medium">
                  {property?.name}
                </span>
              </div>

              <div className="flex items-center justify-between ">
                <div className="flex items-center gap-2">
                  <span className="text-gray-600 font-medium">Tokens</span>
                </div>
                <span className="text-gray-700 text-md font-medium">
                  {quantity}
                </span>
              </div>

              <div className="flex items-center justify-between ">
                <div className="flex items-center gap-2">
                  <span className="text-gray-600  font-medium">
                    Price Per Token
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-gray-600">
                    <PoundSterling />
                  </span>
                  <span className="text-gray-700 text-md font-medium">
                    {property?.tokenInformation?.tokenPrice}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between ">
                <div className="flex items-center gap-2">
                  <span className="text-gray-600 font-medium">Ownership</span>
                </div>
                <span className="text-gray-700  text-md font-medium">
                  {roundDownToOneDecimal(ownerShip)}%
                </span>
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-100 rounded-lg border-t border-gray-200 mt-2">
                <div className="flex items-center gap-2">
                  <span className="text-gray-700 text-md font-medium">
                    Total Investment
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-gray-600">
                    <PoundSterling />
                  </span>
                  <span className="text-gray-700 text-md font-medium">
                    {totalPrice}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="grid grid-cols-2 gap-2">
          <Button
            variant="outline"
            size="lg"
            className="w-full"
            onClick={() => onClick()}
          >
            Back
          </Button>
          <Button
            variant="default"
            size="lg"
            className="w-full"
            disabled={
              !selectedPaymentMethod || selectedPaymentMethod !== "usdt"
            }
            onClick={handlePayment}
          >
            Invest Now
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
