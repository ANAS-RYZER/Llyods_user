import api from '@/lib/httpClient'
import React, { useState } from 'react'

function usegetBlockChainBalance() {
    const userid = sessionStorage.getItem('userId')
 
    const [usdt , setUsdt] = useState(0)
    const [xrp , setXrp] = useState(0)
    const[xdc, setXdc] = useState(0)

    async function getUSDTBalance(){
       const res = await api.post('/custodial-wallet/get-usdt-balance',{
        userId: userid
       })
       setUsdt(res.data.data.usdtBalance)
       console.log(res.data.data.usdtBalance)
        
    }
    async function getXRPBalance(){
        const res = await api.post('/custodial-wallet/get-xrp-balance',{
         userId: userid
        })
        setXrp(res.data.data.xrpBalance)
        console.log(res.data.data.xrpBalance)
         
     } 
       async function getXDCBalance(){
        const res = await api.post('/custodial-wallet/get-xdc-balance',{
         userId: userid
        })
        setXdc(res.data.data.xdcBalance)
        console.log(res.data.data.xdcBalance)
         
     }
 
      return {
        usdt,
        xrp,
        xdc,
        getUSDTBalance,
        getXRPBalance,
        getXDCBalance
      }
  
    
}

export default usegetBlockChainBalance
