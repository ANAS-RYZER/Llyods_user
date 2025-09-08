import { Button } from "@/components/ui/button";
import { CirclePlay } from "lucide-react";
import Image from "next/image";
import React from "react";

const WhatsHappening = () => {
  return (
    <div>
      <div className="space-y-2 mb-5">
        <h1 className="text-lg font-semibold">Whats happening Now?</h1>
        <p className="text-sm text-black/70">
          USDT is been converting into corresponding native currency
        </p>
      </div>
      <hr />
      <div className="space-y-2 my-5">
        <h1 className="text-lg font-semibold">Cancellation Policy</h1>
        <p className="text-sm text-black/70">
          Free cancellation before 15 August. cancel before 16 August to <br />
          get partial refund.{" "}
          <span className="text-md text-primary underline cursor-pointer">
            Learn more
          </span>
        </p>
      </div>
      <hr />
      <div className="mt-5 space-y-2">
        <h1 className="text-md font-medium">While you wait, let's explore!</h1>
        <div className="flex justify-between items-center border p-2 rounded-md">
          <div className="flex justify-center items-center gap-3">
            <Image
              src={`/unsplash_RFDP7_80v5A.png`}
              alt=""
              width={120}
              height={120}
            />
            <div>
              <h1 className="text-md font-medium">
                Real estate investment basic
              </h1>
              <p className="text-sm text-black/70">
                Earn passive income by investing in real estate
              </p>
            </div>
          </div>
          <Button variant="ghost" className="bg-none text-primary text-md ">
            <CirclePlay className="h-10 w-10" />
            Watch now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WhatsHappening;
