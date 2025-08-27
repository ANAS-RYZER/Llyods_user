import * as React from "react";
import { Check, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import LottieAnimation from "@/components/animation/LottieAnimation";
import SignLottie from '../../../../public/lottie-animations/sign.json'

// Update the StepType interface to include an id field
export interface StepType {
  id: string; // Add this line
  title: string;
  active_text?: string;
  description?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  completed?: boolean;
}

// Update the StepperProps interface
export interface StepperProps {
  steps: StepType[];
  currentStepId: string; // Change from currentStep: number
  onStepChange?: (stepId: string) => void; // Change from (step: number)
  className?: string;
}

// Update the Stepper component to work with IDs instead of indices
export function Stepper({
  steps,
  currentStepId,
  onStepChange,
  className,
}: StepperProps) {
  //   const handleStepClick = (id: string) => {
  //     const stepIndex = steps.findIndex((step) => step.id === id);
  //     if (steps[stepIndex].disabled) return;
  //     onStepChange(id);
  //   };

  return (
    <div className={cn("w-full flex items-center justify-center", className)}>
      {/* Steps */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center">
        {steps.map((step, index) => {
          const isActive = step.id === currentStepId;
          const isCompleted = step.completed;
          const isDisabled = step.disabled;
          const isLast = index === steps.length - 1;

          return (
            <React.Fragment key={step.id}>
              <div
                className={cn(
                  "group flex items-center justify-center",
                  isDisabled ? "cursor-not-allowed" : "cursor-pointer"
                )}
                // onClick={() => !isDisabled && handleStepClick(step.id)}
              >
                <div
                  className={cn(
                    "flex h-12 w-12 items-center justify-center rounded-full border-2 transition-colors duration-200",
                    isActive && !isCompleted
                      ? "border-[#165ffa] bg-[#165ffa] text-primary-foreground"
                      : isCompleted
                      ? "border-green-600 bg-green-600 text-white"
                      : isDisabled
                      ? "border-muted bg-muted text-muted-foreground"
                      : "border-border bg-gray-200 text-gray-500"
                  )}
                >
                  {isCompleted ? (
                    <CheckCircle className="h-6 w-6" />
                  ) : step.icon ? (
                    step.icon
                  ) : (
                    <span>{index + 1}</span>
                  )}
                </div>
                <div className="ml-2   md:text-center">
                  <div
                    className={cn(
                      "text-md font-medium",
                      isActive
                        ? "text-[#165ffa]"
                        : isCompleted
                        ? "text-green-600"
                        : isDisabled
                        ? "text-muted-foreground"
                        : "text-gray-500"
                    )}
                  >
                    {isActive
                      ? step.id !== "document_signature"
                        ? `${step.active_text}...`
                        : step.title
                      : step.title}
                  </div>
                 

              
                </div>
              </div>
              {!isLast && (
                <div
                  className={cn(
                    "hidden h-[2px] mx-3 w-[30px] md:block bg-muted-foreground/30"
                    // isCompleted && steps[index + 1].completed
                    //   ? "bg-green-500"
                    //   : isActive || isCompleted
                    //   ? "bg-[#165ffa]"
                    //   : "bg-border"
                  )}
                />
              )}
              {!isLast && (
                <div className="my-2 h-8 w-[2px] md:hidden">
                  <div
                    className={cn(
                      "h-full w-full",
                      isCompleted && steps[index + 1].completed
                        ? "bg-green-500"
                        : isActive || isCompleted
                        ? "bg-primary"
                        : "bg-border"
                    )}
                  />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
