import {PortfolioCashFlowResponse} from "@/constants/global";
import api from "@/lib/httpClient";
import { useState, useEffect     } from "react";

const useFetchPortfolioOrder = () => {
    const [portfolioOrder, setPortfolioOrder] = useState<PortfolioCashFlowResponse | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<any>(null);

    const fetchPortfolioOrder = async () => {
        try {
            setLoading(true);
            const response = await api.get("/portfolio/metrics");
            setPortfolioOrder(response.data as PortfolioCashFlowResponse) ;
            console.log(response.data);
        } catch (error) {
            setError(error);
        }
    }

    useEffect(() => {
        fetchPortfolioOrder();
    }, []);

    return { portfolioOrder, loading, error };
}
export default useFetchPortfolioOrder;