import { useState } from "react"
import api from '@/lib/httpClient'

interface AadharOtpResponse {
    loading: boolean
    error: string
    handleAadharOtp: (aadhar: Number) => Promise<boolean>
}

const useAadharOtp = (): AadharOtpResponse => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
  
    const handleAadharOtp = async (aadhar: Number): Promise<boolean> => {
        setLoading(true)
        setError("")

        try {
            const response = await api.post("/kyc/otp", {
                aadhaarNumber: aadhar,
            })
            return response.data.data;
        }
        catch(err: any) {
            console.log(err.response.data)
            if (err.response?.data?.data?.message) {
                setError(err.response.data.data.message)
            } else {
                setError(err.response.data.message)
            }
            return false
        }
        finally {
            setLoading(false)
        }
    }

    return {
        loading,
        error,
        handleAadharOtp
    }
}

export default useAadharOtp
