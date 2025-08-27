"use client";

import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

interface SuccessDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const KycAcceptedDialog = ({ open, onOpenChange }: SuccessDialogProps) => {
  const handleContinue = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md p-6 sm:p-8 text-center space-y-6">
        <div className="flex justify-center">
          <div className="bg-green-100 rounded-full p-3">
            <CheckCircle className="text-green-600" size={48} />
          </div>
        </div>

        <DialogHeader className="text-center">
          <DialogTitle className="text-green-700 text-2xl font-bold">
            KYC Verified Successfully!
          </DialogTitle>
          <DialogDescription className="text-gray-600 mt-2">
            Your KYC process is complete. You now have full access to all investment opportunities and features on the platform.
          </DialogDescription>
        </DialogHeader>

        <Button
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold"
          onClick={handleContinue}
        >
          Explore Investment Opportunities
        </Button>

        <div className="bg-green-50 p-4 rounded-md text-left">
          <h3 className="font-semibold text-green-700 mb-2">Next Steps</h3>
          <ul className="list-disc list-inside text-sm text-green-800 space-y-1">
            <li>Browse investment projects curated for you</li>
            <li>Complete your risk profile to personalize recommendations</li>
            <li>Set up your investment preferences</li>
          </ul>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default KycAcceptedDialog;
