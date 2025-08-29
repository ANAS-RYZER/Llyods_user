// import {PortfolioCashFlowResponse} from "@/constants/global";
import api from "@/lib/httpClient";
import { useState, useEffect     } from "react";

const useFetchPortfolioOrder = (userId:string) => {
    const [portfolioOrder, setPortfolioOrder] = useState<any | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<any>(null);

    const fetchPortfolioOrder = async () => {
        try {
            setLoading(true);
            const response = await api.get(`/portfolio/portfolio/users/${userId}`);
            setPortfolioOrder(response.data as any) ;
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