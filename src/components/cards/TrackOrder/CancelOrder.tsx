import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../../ui/dialog";
import { Button } from "../../ui/button";
import { Textarea } from "../../ui/textarea";
// import useRaiseCancel from "@/hooks/project/cancel/useRaiseCancel";
import { useForm, SubmitHandler, Form } from "react-hook-form";
import { FormField } from "@/components/ui/form";
import { useParams, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import { useState } from "react";

// Define an interface for the form data
interface CancelOrderFormData {
    reason: string;
}

interface CancelOrderProps {
    isCancelDialogOpen: boolean;
    setIsCancelDialogOpen: (value: boolean) => void;
    orderId: number;
    refetchOrder: () => void;
}

export const CancelOrder = ({
    isCancelDialogOpen,
    setIsCancelDialogOpen,
    orderId,
    refetchOrder
}: CancelOrderProps) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    // const { raiseCancel, isLoading } = useRaiseCancel();



    const { control, handleSubmit, register, reset } = useForm<CancelOrderFormData>();

    const onSubmit: SubmitHandler<CancelOrderFormData> = async (data) => {
        
        if (data.reason.trim() === "") {
            toast.error("Please provide a reason");
            return;
        }

        if (!orderId) {
            toast.error("Order ID is required");
            return;
        }

        setIsSubmitting(true);
        try {
            // await raiseCancel(data, orderId);
            setIsCancelDialogOpen(false);
            reset();
            refetchOrder();
        } catch (error) {
            console.error('Error cancelling order:', error);
            toast.error("Failed to submit cancel request");
        } finally {
            setIsSubmitting(false);
        }
    }


    return (
        <Dialog open={isCancelDialogOpen} onOpenChange={setIsCancelDialogOpen} >
            <DialogTrigger asChild>
                <button
                    className="text-sm "
                >
                   Do you want to cancel your order? <span className="text-primary cursor-pointer hover:underline font-primary">Cancel Order</span>
                       </button>
            </DialogTrigger>
            <DialogContent className="max-w-[400px]">
                <DialogHeader>
                    <DialogTitle>Cancel Order</DialogTitle>
                    <DialogDescription>
                        Are you sure you want to cancel this order? You can delete the cancellation request later if needed.
                    </DialogDescription>
                </DialogHeader>

                {/* Use Form from react-hook-form and pass handleSubmit */}
                <form onSubmit={handleSubmit(onSubmit)}>
                    <FormField
                        name="reason"
                        control={control}
                        render={({ field }) => (
                            <Textarea
                                placeholder="Please provide a reason for cancelling this order"
                                className="w-full min-h-[100px]"
                                {...register('reason', { required: "Please provide a reason" })}
                                disabled={isSubmitting}
                            />
                        )}
                    />
                    <DialogFooter className="flex flex-row gap-2 mt-2">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setIsCancelDialogOpen(false)}
                            disabled={isSubmitting}
                        >
                            Keep Order
                        </Button>
                        <Button
                            type="submit"
                            variant="destructive"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "Processing..." : "Confirm Cancel"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default CancelOrder;