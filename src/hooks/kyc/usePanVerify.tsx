import api from '@/lib/httpClient'
import React, { useState } from 'react'

interface AadharOtpResponse {
  loading: boolean
  error: string
  handlePanVerify: (pan: string, name: string) => Promise<boolean>
}

const usePanVerify = (): AadharOtpResponse => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
  
    const handlePanVerify = async (pan: string, name: string): Promise<boolean> => {
        setLoading(true)
        setError("")

        try {
            await api.post("/kyc/verify-pan", {
                pan: pan,
                name: name,
            })
            return true
        }
        catch(err: any) {
            setError(err.message || "Failed to verify PAN. Please try again.")
            return false
        }
        finally {
            setLoading(false)
        }
    }

    return {
        loading,
        error,
        handlePanVerify
    }
}

export default usePanVerify
