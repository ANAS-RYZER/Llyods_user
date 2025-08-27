export interface OrderFee {
    id: number
    name: string
    value: number
    is_percentage: boolean
  }
  
  export interface User {
    id: number
    name: string
    avatar: string
    email: string
    phone: string
    wallet_address: string | null
    wallet_balance: string
  }
  
  export interface Order {
    id: number
    uuid: string
    user_id: number
    property_id: number
    status: string
    number_of_token: number
    booking_amount: string
    total_amount: string
    document_sign: boolean | null
    token_payment_is_done: boolean | null
    token_transferred: boolean
    fees: OrderFee[]
    user: User
    created_at: string
  }
  
  export interface OrderResponse {
    type: string
    message: string
    data: Order[]
    pager: {
      totalItems: number
      totalPages: number
      currentPage: number
      pageSize: number
      hasMore: boolean
    }
  }
  
  