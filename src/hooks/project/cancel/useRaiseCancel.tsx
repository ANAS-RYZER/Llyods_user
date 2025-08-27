// import useFetchOrderById from "@/hooks/order/useFetchOrderById";
// import api from "@/lib/httpClient";
// import { useState } from "react";
// import { toast } from "react-toastify";

// interface CancelData {
//   reason: string;
// }

// const useRaiseCancel = () => {
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [success, setSuccess] = useState<string | null>(null);
//   const { fetchOrder } = useFetchOrderById(orderId);

//   const raiseCancel = async (data: CancelData, orderId: number) => {
//     if (!orderId || isNaN(orderId)) {
//       throw new Error("Invalid order ID");
//     }

//     try {
//       setIsLoading(true);
//       setError(null);

//       const response = await api.post("/v2/cancel", {
//         reason: data.reason,
//         order_id: orderId,
//       });

//       setSuccess("Cancel request raised successfully");
//       await fetchOrder(String(orderId));
//       toast.success("Cancel request raised successfully");

//       return response;
//     } catch (error: any) {
//       const errorMessage = error.response?.data?.message || "Failed to cancel order";
//       setError(errorMessage);
//       toast.error(errorMessage);
//       throw error;
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const deleteCancel = async (orderId: number) => {
//     if (!orderId || isNaN(orderId)) {
//       throw new Error("Invalid order ID");
//     }

//     try {
//       setIsLoading(true);
//       setError(null);

//       const response = await api.delete(`/v2/cancel/${orderId}`);
      
//       await fetchOrder(String(orderId));
//       toast.success("Cancel request deleted successfully");
//       return response;
//     } catch (error: any) {
//       const errorMessage = error.response?.data?.message || "Failed to delete cancel request";
//       setError(errorMessage);
//       toast.error(errorMessage);
//       throw error;
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return { raiseCancel, deleteCancel, isLoading, error, success };
// };

// export default useRaiseCancel;