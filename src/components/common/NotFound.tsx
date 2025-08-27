import { Button } from "@/components/ui/button";
import Lottie from "lottie-react";
import { Home } from "lucide-react";
import Link from "next/link";
import notFoundAnimation from "../../../public/lottie-animations/assetNotFound.json";

interface NotFoundProps {
  title?: string;
  description?: string;
  showHomeButton?: boolean;
}

const NotFound = ({
  title = "Property Not Found",
  description = "The property you're looking for doesn't exist or has been removed.",
  showHomeButton = true,
}: NotFoundProps) => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="flex flex-col items-center text-center gap-6 max-w-xl">
        <div className="w-full max-w-md">
          <Lottie animationData={notFoundAnimation} loop autoplay />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">{title}</h1>
        <p className="text-gray-500 text-base md:text-lg">{description}</p>
        {showHomeButton && (
          <Link href="/property">
            <Button className="mt-2 px-6 py-2 text-sm md:text-base">
              <Home className="mr-2 h-4 w-4" />
              Back to Properties
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default NotFound;
