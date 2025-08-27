"use client"
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Search, Clock, ArrowUpRight } from 'lucide-react'
import { Input } from '@/components/ui/input'

interface Transaction {
  date: string
  type: 'deposit' | 'withdrawal'
  asset: string
  amount: string
  status: 'completed' | 'processing'
  hasDetails: boolean
}

const transactions: Transaction[] = [
  // {
  //   date: 'Apr 10, 2023',
  //   type: 'deposit',
  //   asset: 'USD',
  //   amount: '+5,000.00 USD',
  //   status: 'completed',
  //   hasDetails: false
  // },
  // {
  //   date: 'Apr 08, 2023',
  //   type: 'withdrawal',
  //   asset: 'BTC',
  //   amount: '-0.25 BTC',
  //   status: 'completed',
  //   hasDetails: true
  // },
  // {
  //   date: 'Apr 05, 2023',
  //   type: 'deposit',
  //   asset: 'ETH',
  //   amount: '+5.0 ETH',
  //   status: 'completed',
  //   hasDetails: true
  // },
  // {
  //   date: 'Apr 01, 2023',
  //   type: 'withdrawal',
  //   asset: 'USD',
  //   amount: '-2,500.00 USD',
  //   status: 'processing',
  //   hasDetails: false
  // },
  // {
  //   date: 'Mar 28, 2023',
  //   type: 'deposit',
  //   asset: 'USDT',
  //   amount: '+10,000.00 USDT',
  //   status: 'completed',
  //   hasDetails: true
  // }
]

const Transaction = () => {
  return (
    <div>
      {/* Transaction History Table */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between px-6">
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-muted-foreground" />
            Transaction History
          </CardTitle>
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="All Types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="deposit">Deposits</SelectItem>
              <SelectItem value="withdrawal">Withdrawals</SelectItem>
            </SelectContent>
          </Select>
        </CardHeader>
        <CardContent className="px-6">
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search transactions..." className="pl-9" />
            </div>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Asset</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Details</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((transaction, index) => (
                <TableRow key={index}>
                  <TableCell>{transaction.date}</TableCell>
                  <TableCell>
                    <Badge 
                      variant="outline" 
                      className={`${
                        transaction.type === 'deposit' 
                          ? 'bg-green-100 text-green-700 hover:bg-green-100' 
                          : 'bg-blue-100 text-blue-700 hover:bg-blue-100'
                      }`}
                    >
                      {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell>{transaction.asset}</TableCell>
                  <TableCell className={transaction.type === 'deposit' ? 'text-green-600' : 'text-red-600'}>
                    {transaction.amount}
                  </TableCell>
                  <TableCell>{transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}</TableCell>
                  <TableCell>
                    {transaction.hasDetails ? (
                      <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
                        View <ArrowUpRight className="ml-1 h-3 w-3" />
                      </Button>
                    ) : (
                      '-'
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="mt-4 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">Showing 1-5 of {transactions.length} transactions</p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" disabled>
                Previous
              </Button>
              <Button variant="outline" size="sm">
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Transaction
