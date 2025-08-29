import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { CheckCircle, Clock, XCircle } from "lucide-react";

export type KYCStatus = "approved" | "submitted" | "failed";

interface KYCStatusCardProps {
  status: KYCStatus;
  className?: string;
  title?: string;
  description?: string;
}

const statusConfig = {
  approved: {
    icon: CheckCircle,
    title: "KYC Verified",
    description: "Your identity has been successfully verified",
    badgeText: "Verified",
    badgeVariant: "default" as const,
    iconColor: "text-green-500",
    borderColor: "border-green-200",
    bgColor: "bg-green-50",
  },
  submitted: {
    icon: Clock,
    title: "KYC Under Review",
    description:
      "Your documents are being reviewed. This usually takes 1-2 business days",
    badgeText: "Pending",
    badgeVariant: "secondary" as const,
    iconColor: "text-yellow-500",
    borderColor: "border-yellow-200",
    bgColor: "bg-yellow-50",
  },
  failed: {
    icon: XCircle,
    title: "KYC Verification Failed",
    description:
      "There was an issue with your verification. Please resubmit your documents",
    badgeText: "Failed",
    badgeVariant: "destructive" as const,
    iconColor: "text-red-500",
    borderColor: "border-red-200",
    bgColor: "bg-red-50",
  },
};

const KYCStatusCard = ({
  status,
  className,
  title,
  description,
}: KYCStatusCardProps) => {
  const config = statusConfig[status];
  const Icon = config?.icon;

  return (
    <Card
      className={cn(
        "w-full max-w-md transition-all duration-200",
        config?.borderColor,
        config?.bgColor,
        className
      )}
    >
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Icon className={cn("h-6 w-6", config?.iconColor)} />
            <CardTitle className="text-lg">{title || config?.title}</CardTitle>
          </div>
          <Badge variant={config?.badgeVariant}>{config?.badgeText}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-sm leading-relaxed">
          {description || config?.description}
        </CardDescription>
      </CardContent>
    </Card>
  );
};
export default KYCStatusCard;