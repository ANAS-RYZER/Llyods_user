import React from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { StarIcon } from "lucide-react";

interface Review {
  id: string;
  user: string;
  rating: number;
  comment: string;
}

interface ViewAssetReviewsProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  reviews?: Review[];
  onAddReview?: () => void;
}

const AssetReview: React.FC<ViewAssetReviewsProps> = ({
  open,
  onOpenChange,
  reviews,
  onAddReview,
}) => {
  const getRatingText = (rating: number) => {
    switch (rating) {
      case 1:
        return "Bad Experience";
      case 2:
        return "Average Experience";
      case 3:
        return "Good Experience";
      case 4:
        return "Great Experience";
      case 5:
        return "Excellent Experience";
      default:
        return "";
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md w-[500px] p-0 gap-0">
        <DialogHeader className="p-4 pb-2 border-b border-gray-200">
          <DialogTitle className="text-lg font-bold">
            Property Reviews
          </DialogTitle>
        </DialogHeader>
        <div className="p-4 pt-6 flex flex-col gap-4 max-h-[400px] overflow-y-auto">
          {reviews?.length === 0 ? (
            <p className="text-sm text-gray-500 text-center">No reviews yet.</p>
          ) : (
            reviews?.map((review) => (
              <div key={review.id} className="border rounded-lg p-3 shadow-sm">
                <div className="flex justify-between items-center mb-1">
                  <p className="font-medium">{review.user}</p>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <StarIcon
                        key={star}
                        className={`w-4 h-4 ${
                          review.rating >= star
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-300"
                        }`}
                        fill={review.rating >= star ? "currentColor" : "none"}
                        stroke="currentColor"
                      />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-gray-600 italic mb-1">
                  {getRatingText(review.rating)}
                </p>
                <p className="text-sm">{review.comment}</p>
              </div>
            ))
          )}
        </div>
        <DialogFooter>
          <div className="p-2 w-full">
            <Button
              size="lg"
              onClick={onAddReview}
              className="bg-purple-500 hover:bg-purple-600 w-full h-10"
            >
              Add Review
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AssetReview;
