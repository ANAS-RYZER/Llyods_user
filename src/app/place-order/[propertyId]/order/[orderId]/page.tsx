"use client";

import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import LottieAnimation from "@/components/animation/LottieAnimation";
import SignLottie from "../../../../../../public/lottie-animations/sign.json";
import LoadingLottie from "../../../../../../public/lottie-animations/loading.json";

import useFetchOrderById from "@/hooks/order/useFetchOrderById";
import { useFetchPropertyById } from "@/hooks/property/useFetchPropertyById";

import PropertyHeader from "@/components/my-orders/(components)/PropertyHeader";
import WhatsHappening from "@/components/my-orders/(components)/WhatsHappening";
import DocumentSignature from "@/components/my-orders/(components)/DocumentSignature";
import { Stepper } from "@/components/my-orders/(components)/stepper";
import { IProperty } from "@/constants/global";
import OrderStatusSkeleton from "@/components/placeOrder/OrderStatusSkeleton";
import DocumentSignatureSkeleton from "@/components/placeOrder/DocumentSignatureSkeleton";
import { StepperSkeleton } from "@/components/placeOrder/StepperSkeleton";

const OrderStatus = () => {
  const params = useParams();
  const router = useRouter();
  const { property, loading } = useFetchPropertyById(
    params?.propertyId as string
  );
  const { orderId } = useParams();
  const { order, fetchOrder } = useFetchOrderById(orderId as string);

  useEffect(() => {
    if (orderId) fetchOrder(orderId as string);
  }, [orderId]);

  const baseSteps = [
  {
    id: "order_submitted",
    title: "Order Submitted",
    active_text: "Verifying Order", 
    heading: "We're verifying your order, hang tight!",
    component: <WhatsHappening />,
  },
  {
    id: "payment_confirmation",
    title: "Payment Confirmation",
    active_text: "Verifying Payment", 
    heading: "We're verifying your payment, hang tight!",
    component: <WhatsHappening />,
  },
  {
    id: "token_transfers",
    title: "Token Transfers",
    active_text: "Transferring Tokens", 
    heading: "We're transferring tokens to your wallet, hang tight!",
    component: <WhatsHappening />,
  },
  {
    id: "document_signature",
    title: "Document Signature",
    heading: "Final Step: Sign & Complete Your Investment",
    component: order ? (
      <DocumentSignature order={order} />
    ) : (
      <DocumentSignatureSkeleton />
    ),
  },
];


  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<boolean[]>(
    Array(baseSteps.length).fill(false) 
  );

  useEffect(() => {
    if (!baseSteps.length) return;

    if (currentStepIndex < baseSteps.length - 1) {
      const timer = setTimeout(() => {
        setCompletedSteps((prev) => {
          const updated = [...prev];
          updated[currentStepIndex] = true; 
          return updated;
        });
        setCurrentStepIndex((prev) => prev + 1);
      }, 5000); 

      return () => clearTimeout(timer);
    }
  }, [currentStepIndex, baseSteps.length]);

  
  const steps = baseSteps.map((step, index) => ({
    ...step,
    completed: completedSteps[index],
  }));

  const currentStep = steps[currentStepIndex];

  const handleViewOnBlockchain = () => {
    const address = property?.tokenInformation?.blockchainProjectAddress;
    if (address)
      window.open(
        `https://explorer.testnet.xrplevm.org/token/${address}`,
        "_blank"
      );
  };

  if (loading || !property) return <OrderStatusSkeleton />;

  return (
    <div className="w-full mb-10 space-y-8 px-4 md:px-10">
      {/* Property Header */}
      <PropertyHeader
        property={property as IProperty}
        handleViewOnBlockchain={handleViewOnBlockchain}
      />

      {/* Stepper & Content */}
      <div className="flex flex-col items-center justify-between">
        <div className="w-full max-w-5xl border border-gray-200 rounded-xl shadow-md px-4 py-3 bg-white">
          <div className="flex flex-col md:flex-row justify-between items-center gap-2">
            <h1 className="text-2xl font-bold text-gray-900">
              {currentStep?.heading}
            </h1>
          {
            currentStep.id === "document_signature" ? (
              <LottieAnimation
              animationData={SignLottie}
              style={{ width: 60, height: 60 }}
            />
            ) : (
              <LottieAnimation
              animationData={LoadingLottie}
              style={{ width: 60, height: 60 }}
            />
            )}
            </div>

          <div className="mt-8">
            {loading || !steps ? (
              <StepperSkeleton count={steps.length} />
            ) : (
              <Stepper
                steps={steps}
                currentStepId={currentStep.id}
              />
            )}
          </div>
          <hr />
          <div className="mt-6">{currentStep?.component}</div>
          <hr className="mt-6" />
          <div className="">
            <p className="text-sm text-gray-500 p-3">
              By proceeding, I agree to the{" "}
              <span className="text-blue-500 cursor-pointer underline ">
                Investment Terms,
              </span>{" "}
              <span className="text-blue-500 cursor-pointer underline ">
                SPV Participation Agreement,
              </span>{" "}
              and{" "}
              <span className="text-blue-500 cursor-pointer underline ">
                Investor Onboarding Documents
              </span>
              . I also accept Ryzer’s{" "}
              <span className="text-blue-500 cursor-pointer underline ">
                Terms of Use, Payment Terms,
              </span>{" "}
              and{" "}
              <span className="text-blue-500 cursor-pointer underline ">
                Privacy Policy.
              </span>{" "}
              I understand that my investment represents fractional ownership in
              a Special Purpose Vehicle (SPV) and may involve certain risks.
            </p>
          </div>
        </div>
        <div className="w-full flex justify-between items-center mt-6 max-w-5xl mx-auto gap-4">
          <Button
            variant="outline"
            className="flex items-center gap-2 px-6 py-3 bg-black text-white hover:bg-gray-900 hover:text-white"
            onClick={() => router.push("/orders")}
          >
            <ArrowLeft size={16} /> View My Orders
          </Button>

          <Button
            className="flex items-center gap-2 px-7 py-3"
            onClick={() => router.push("/portfolio")}
          >
            My Portfolio <ArrowUpRight size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OrderStatus;
