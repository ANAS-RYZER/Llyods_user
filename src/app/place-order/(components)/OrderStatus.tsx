"use client";

import { CircleCheckBig, CirclePlay, FileText, PenTool } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { useMemo, useState } from "react";
import WhatHappening from "@/app/place-order/(components)/WhatHappening";
import DocumetSign from "@/app/place-order/(components)/DocumetSign";
import { Stepper } from "@/app/place-order/(components)/Stepper";

type StepState = "pending" | "processing" | "completed";

interface Step {
  id: number;
  label: string;
  processingLabel: string;
  completedLabel: string;
  state: StepState;
  heading: string;
  component?: React.ReactNode;
}

export default function OrderStatus() {
  // Memoized initial steps
  const initialSteps = useMemo<Step[]>(
    () => [
      {
        id: 1,
        label: "Order Submit",
        processingLabel: "Order Submitting",
        completedLabel: "Order Submitted",
        state: "processing",
        heading: "We’re verifying your Order, hang tight!",
        component: <WhatHappening />,
      },
      {
        id: 2,
        label: "Payment Confirm",
        processingLabel: "Payment Confirming...",
        completedLabel: "Payment Confirmed",
        state: "pending",
        heading: "We’re verifying your Payment, hang tight!",
        component: <WhatHappening />,
      },
      {
        id: 3,
        label: "Token Transfers",
        processingLabel: "Token Transferring",
        completedLabel: "Token Transferred",
        state: "pending",
        heading: "We’re verifying your Token Transferring, hang tight!",
        component: <WhatHappening />,
      },
      {
        id: 4,
        label: "Document Signature",
        processingLabel: "Document Signature",
        completedLabel: "Document Signature",
        state: "pending",
        heading: "Final Step: Sign & Complete Your Investment",
        component: <DocumetSign />,
      },
    ],
    []
  );

  // State for current step progress
  const [steps, setSteps] = useState<Step[]>(initialSteps);

  // Derived label for Stepper title
  const getStepLabel = (step: Step) => {
    switch (step.state) {
      case "completed":
        return step.completedLabel;
      case "processing":
        return step.processingLabel;
      default:
        return step.label;
    }
  };

  // Convert Step[] → StepType[] for Stepper
  const stepperSteps = useMemo(() => {
    return steps.map((s) => ({
      id: s.id.toString(),
      title: getStepLabel(s),
      completed: s.state === "completed",
      disabled: s.state === "pending" && s.id !== 1,
    }));
  }, [steps]);

  const currentStepId =
    steps.find((s) => s.state === "processing")?.id.toString() ||
    steps[0].id.toString();

  const currentStep = steps.find((s) => s.id.toString() === currentStepId);

  const progressStep = () => {
    setSteps((prev) => {
      const updated = prev.map((p) => ({ ...p }));
      const idx = updated.findIndex((s) => s.state === "processing");
      if (idx !== -1) {
        updated[idx].state = "completed";
        if (idx + 1 < updated.length) {
          updated[idx + 1].state = "processing";
        }
      }
      return updated;
    });
  };

  const isDocumentStep = () => {
    return steps.find((step) => step.id === 4)?.state === "processing";
  };

  return (
    <div className="w-full rounded-xl my-4">
      <div className="w-[1100px] mx-auto  ">
        <div className="p-6 space-y-6 bg-white shadow-md rounded-lg ">
          <h1 className="text-2xl font-bold">{currentStep?.heading}</h1>

          {/* Stepper */}
          <div className="relative flex items-center justify-center w-full mx-auto">
            <Stepper
              steps={stepperSteps}
              currentStepId={currentStepId}
              onStepChange={(id) => console.log("Step clicked:", id)}
            />
          </div>
          <div className="flex gap-2">
            <Button onClick={progressStep} size="sm">
              Progress Step
            </Button>
            <Button
              onClick={() => setSteps(initialSteps)}
              variant="outline"
              size="sm"
            >
              Reset Demo
            </Button>
          </div>
          <hr />
          {currentStep?.component}
        </div>
        {/* Bottom Actions */}
        <div className="flex justify-between pt-6">
          <Button className="bg-black text-white hover:bg--800 ">
            View My Orders
          </Button>
          <Button className="bg-primary hover:bg-primary/90">
            My Portfolio →
          </Button>
        </div>
      </div>
    </div>
  );
}
