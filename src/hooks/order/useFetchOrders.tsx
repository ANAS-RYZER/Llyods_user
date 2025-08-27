import api from "@/lib/httpClient"
import { useEffect, useState } from "react";
import { format } from "date-fns";

const  defaultPagination = {
  limit: 10,
  page: 1,
  totalCount: 0,
  totalPages: 0, 
};

export const useFetchOrder = (
  orderStatus: string, 
  dateRange: { from: Date; to?: Date } | undefined, 
  quickSelect: string, 
  page: number = 1,
  limit: number = defaultPagination.limit
) => {
  const [orders, setOrders] = useState<any[]>([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState<any>(defaultPagination);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const params: any = {
          orderStatus,
          page,
          limit
        };

        if (dateRange) {
          params.fromDate = format(dateRange.from, 'yyyy-MM-dd');
          if (dateRange.to) {
            params.toDate = format(dateRange.to, 'yyyy-MM-dd');
          }
        }

        // Add quick select parameters
        if (quickSelect) {
          switch (quickSelect) {
            case "last-month":
              params.lastMonth = "true";
              break;
            case "last-3-months":
              params.lastThreeMonths = "true";
              break;
            case "last-6-months":
              params.lastSixMonths = "true";
              break;
            case "last-year":
              params.lastYear = "true";
              break;
            case "today":
              params.date = format(new Date(), 'yyyy-MM-dd');
              break;
          }
        }

        const response = await api.get(`/orders`, {
          params,
        });

        setOrders(response.data.data);
        setPagination(response.data.pagination);
      } catch (err: any) {
        setError(err.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [orderStatus, dateRange, quickSelect, page, limit]);

  return { data: orders, error, loading, pagination };
};
