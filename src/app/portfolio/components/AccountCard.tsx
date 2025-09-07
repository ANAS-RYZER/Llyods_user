import { Button } from "@/components/ui/button"
import React from "react"

interface Action {
  label: string
  highlight?: boolean
}

interface AccountCardProps {
  type: string
  accountNumber: string
  balance: number
  balanceLabel: string
  availableFunds?: string
  overdraft?: string
  interestInfo?: string
  isCreditCard?: boolean
  creditCardInfo?: string
  actions: Action[]
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount)
}

const AccountCard: React.FC<AccountCardProps> = ({
  type,
  accountNumber,
  balance,
  balanceLabel,
  availableFunds,
  overdraft,
  interestInfo,
  isCreditCard,
  actions,
}) => {
  const isNegative = balance < 0

  return (
    <div className="border flex mx-auto  w-full bg-white">
      {/* Left side */}
      <div className="flex flex-col gap-4 w-full p-6 border">
        <h5 className="text-xs font-semibold text-green-600 uppercase mb-2 flex items-center gap-2">
          {type}
          <span className="text-gray-400 tracking-widest">{accountNumber}</span>
        </h5>

        <div className="flex items-baseline gap-2 mb-1">
          <span
            className={`text-4xl ${
              isNegative ? "text-red-600" : "text-black"
            }`}
          >
            {isNegative
              ? `-${formatCurrency(Math.abs(balance))}`
              : formatCurrency(balance)}
          </span>
          {" "}
          <span className="text-gray-600">{balanceLabel}</span>
        </div>
        <hr />

        {availableFunds && overdraft && (
          <p className="text-xs text-gray-600 mb-1">
            <span className="font-bold">{availableFunds}</span> Available funds
            including your <span className="">{overdraft}</span>{" "}
            overdraft
          </p>
        )}

        {interestInfo && (
          <>
          <hr />
          <p className="text-sm text-gray-600">
            You could earn up to 3% interest.&nbsp;
            <a href="#" className="text-green-600 underline">
              {interestInfo}
            </a>
          </p>
          </>
        )}
        
        {isCreditCard && (
          <div className="text-xs text-gray-600 mt-2 space-x-2">
            <span>Credit limit</span>
            <span>•</span>
            <span>Statement due date</span>
            <span>•</span>
            <span>Minimum payment</span>
          </div>
        )}
      </div>

      {/* Right side */}
      <div className="flex flex-col justify-between w-64 p-2">
        {actions.map((action, index) => (
          <>
          <Button
            key={index}
            className="rounded-none shadow-none px-4 py-8 flex justify-between bg-transparent font-semibold text-green-500 hover:text-white"

          >
            <span>{action.label}</span>
            <span>{`›`}</span>
          </Button>
          {index < actions.length - 1 && <hr />}
          </>
        ))}
      </div>
    </div>
  )
}

export default AccountCard
