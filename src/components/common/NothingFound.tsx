import Image from "next/image";
import React from "react";
import dynamic from "next/dynamic";
import  empty from "../../../public/lottie-animations/empty-card.json";

const LottieAnimation = dynamic(() => import("@/components/animation/LottieAnimation"), { ssr: false });

const NothingFound = ({ text }: { text?: string }) => {
  return (
    <div className="max-w-sm w-full mx-auto p-3 flex items-center justify-center">
    <div className="flex flex-col items-center justify-center gap-3">
      <div className="w-72 h-72 overflow-hidden">
        <LottieAnimation animationData={empty} style={{ height: '100%', width: '100%', objectFit: 'contain' }} />
      </div>
      <p className="text-muted-foreground text-center text-lg font-medium">{text}</p>
    </div>
  </div>
  
  );
};

export default NothingFound;
