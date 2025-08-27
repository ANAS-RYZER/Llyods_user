import api from "@/lib/httpClient";
import { useState } from "react";
import { toast } from "react-toastify";
interface IOrder {
    tokensBooked : number;
    paymentType : string;
    currency : string;
}

interface PlaceOrderApiProps {
  propertyID: string;
  order: IOrder;
}

const usePlaceOrderApi = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  const placeOrder = async ({ propertyID, order }: PlaceOrderApiProps) => {
    setLoading(true);
    setError(null); // Reset error state before making the request
    try {
      const response = await api.post(`/orders?assetId=${propertyID}`, order);
      toast.success("Order Placed Successfully")
      return response.data.data;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || 'Failed to place order';
      toast.error(errorMessage)
      setError(errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  }

  return { placeOrder, loading, error };
};

export default usePlaceOrderApi;
