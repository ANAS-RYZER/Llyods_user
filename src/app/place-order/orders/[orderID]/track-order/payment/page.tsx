"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@/components/ui/breadcrumb"
import { usePathname, useParams, useSearchParams, useRouter } from "next/navigation";
import Icon from "@/components/common/Icon";
import useFetchBalance from "@/hooks/escrow/useFetchBalance"
import { safeFormatCurrency } from "@/lib/format.utility";
import api from "@/lib/httpClient"
import { toast } from "react-toastify"
import useFullPayment from "@/hooks/project/useFullPayment"    
import useFetchOrderById from "@/hooks/order/useFetchOrderById"

export default function RemainingPaymentPage() {
  // const [agreed, setAgreed] = useState(false)
  // const [balance, setBalance] = useState<number>(0);
  // const pathname = usePathname();
  // const searchParams = useSearchParams();
  // const params = useParams();
  // const orderID = params?.orderID
  // const numericOrderId = Number(orderID)
  // const router = useRouter();
  // const { order: orderData, loading: orderLoading, error: orderError, fetchOrder } = useFetchOrderById()
  // const { balance: fetchBalance , error: balanceError } = useFetchBalance()
  // const tokensSelected = searchParams?.get("tokensSelected") || "0";

  // const totalTokensSelected = Number(tokensSelected);

  // const remainingPaymentAmount = orderData?.order?.total_amount - 
  //   (orderData?.order?.booking_amount || 0);

  // useEffect(() => {
  //   if (!orderID || isNaN(numericOrderId)) {
  //     toast.error("Invalid order ID")
  //     console.log("Invalid order ID")
  //     router.push("/orders")
  //   } else {
  //     fetchOrder(String(orderID))
  //   }
  // }, [orderID, numericOrderId, fetchOrder, router])

  // useEffect(() => {
  //   if (fetchBalance) {
  //     setBalance(Number(fetchBalance));
  //   }
  // }, [fetchBalance]);

  // const pathSegments = pathname?.split("/").filter((segment) => segment);

  // const insufficientBalance = balance < remainingPaymentAmount;
  // const { handleFullPayment, isLoading: isFullPaymentLoading, error: isFullPaymentError, paymentData } = useFullPayment()

  return (
    // <main className="p-4 sm:p-6 flex flex-col items-center justify-start bg-gray-50 min-h-screen">
    //   <article className="w-full max-w-[1100px] px-4 sm:px-6 lg:px-8 mx-auto">
    //     <Breadcrumb className="text-sm mb-6 font-medium">
    //       <BreadcrumbItem>
    //         <BreadcrumbLink
    //           href="/"
    //           className="text-primary hover:text-primary/80"
    //         >
    //           Home
    //         </BreadcrumbLink>
    //       </BreadcrumbItem>

    //       {pathSegments?.map((segment, index) => {
    //         const path = `/${pathSegments?.slice(0, index + 1).join("/")}`;
    //         const isLast = index === pathSegments?.length - 1;

    //         return (
    //           <BreadcrumbItem key={path}>
    //             <Icon
    //               name="chevron-right"
    //               type="solid"
    //               className="text-gray-400 w-4 h-4"
    //             />
    //             {isLast ? (
    //               <span className="text-gray-900 font-semibold uppercase">
    //                 {segment}
    //               </span>
    //             ) : (
    //               <BreadcrumbLink
    //                 href={path}
    //                 className="text-primary hover:text-primary/80"
    //               >
    //                 {segment}
    //               </BreadcrumbLink>
    //             )}
    //           </BreadcrumbItem>
    //         );
    //       })}
    //     </Breadcrumb>

    //     <div className="mx-auto max-w-[1100px] bg-white p-6 shadow-sm rounded-lg">
    //       <div className="flex items-center gap-4">
    //         <Button 
    //           variant="ghost" 
    //           onClick={() => router.back()}
    //           className="text-foreground hover:text-foreground/80"
    //         >
    //           <ArrowLeft className="h-6 w-6" />
    //         </Button>
    //         <h1 className="text-xl font-semibold">Remaining Payment</h1>
    //       </div>

    //       <div className="space-y-8 pt-6">
    //         <div className="text-center">
    //           <p className="text-sm text-muted-foreground">Available balance</p>
    //           <p className="text-4xl font-semibold tracking-tight">{ safeFormatCurrency(balance)}</p>
    //           {insufficientBalance && (
    //             <p className="text-sm text-red-500 mt-2">
    //               Insufficient balance. Please add funds to continue.
    //             </p>
    //           )}
    //         </div>

    //         <div className="flex justify-center">
    //           <Button 
    //             variant="secondary" 
    //             className="bg-[#7C3AED] text-white hover:bg-[#7C3AED]/90"
    //             onClick={() => router.push("/wallet/add-balance")}
    //           >
    //             Add amount
    //           </Button>
    //         </div>

    //         <div className="rounded-2xl w-[700px] mx-auto  flex justify-between border b-3 p-4">
    //           <div className="flex  flex-col justify-between">
    //             <span className="text-lg font-medium">Remaining Payment</span>
    //             <p className="text-sm text-muted-foreground">
    //               Total Project Cost: {safeFormatCurrency(orderData?.order?.total_amount || 0)}
    //             </p>
    //             <p className="text-sm text-muted-foreground">
    //               Already Paid (10% EOI): {safeFormatCurrency(orderData?.order?.booking_amount || 0)}
    //             </p>
    //           </div>
    //           <div className="mt-2 text-sm text-muted-foreground">
    //             <span className="text-4xl font-medium text-[#52C1B9]">
    //               {safeFormatCurrency(remainingPaymentAmount)}
    //             </span>
    //           </div>
    //         </div>

    //         <div className="w-[700px] mx-auto p-2 space-y-4">
    //           <div className="flex items-start space-x-2">
    //             <Checkbox id="terms" checked={agreed} onCheckedChange={(checked) => setAgreed(checked as boolean)} />
    //             <div className="grid gap-1.5 leading-none">
    //               <Label
    //                 htmlFor="terms"
    //                 className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
    //               >
    //                 I Agree to{" "}
    //                 <Link href="#" className="text-[#7C3AED] hover:underline">
    //                   Terms & conditions
    //                 </Link>
    //               </Label>
    //             </div>
    //           </div>

    //           <div className="rounded-lg bg-muted/50 p-4">
    //             <p className="text-sm text-muted-foreground">
    //               <span className="font-medium">Note:</span> The remaining payment of {safeFormatCurrency(remainingPaymentAmount)}
    //               {" "} 
    //               will be deducted from your wallet. Please proceed to confirm your payment.
    //             </p>
    //           </div>
    //         </div>
    //       </div>

    //       <div className="flex justify-end gap-4 border-t p-6">
    //         <Button 
    //           variant="outline" 
    //           onClick={() => router.back()} 
    //           disabled={isFullPaymentLoading}
    //         >
    //           Cancel
    //         </Button>
    //         <Button 
    //           disabled={!agreed  || isFullPaymentLoading }
    //           className="bg-[#7C3AED] text-white hover:bg-[#7C3AED]/90"
    //           onClick={()=>handleFullPayment(String(orderID))}
    //         >
    //           {isFullPaymentLoading ? "Processing..." : `Pay Remaining ${safeFormatCurrency(remainingPaymentAmount)}`}
    //         </Button>
    //       </div>
    //     </div>
    //   </article>
    // </main>
    <div>
      <h1>Remaining Payment</h1>
    </div>
  )
}



