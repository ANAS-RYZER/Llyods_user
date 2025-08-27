import { formatCurrency } from "@/lib/utils";
import { ArrowUpRight, CopyIcon } from "lucide-react";
import React from "react";

const OrderDetails = ({ property, order }: any) => {
  const fields = [
    {
      name: "Property",
      value: property?.name,
      icon: <ArrowUpRight size={17} />,
    },
    {
      name: "Tokens",
      value: order?.tokensBooked,
      icon: <ArrowUpRight size={17} />,
    },
    {
      name: "Token Name",
      value: property?.tokenInformation?.tokenSymbol,
      icon: <ArrowUpRight size={17} />,
    },
    {
      name: "Amount paid",
      value: formatCurrency(order?.totalOrderValue),
      icon: <ArrowUpRight size={17} />,
    },
    {
      name: "Upcoming Dividends",
      value: formatCurrency(order?.totalOrderValue),
      icon: <ArrowUpRight size={17} />,
    },
    {
      name: "Order Id",
      value: order?._id.slice(-4),
      icon: <CopyIcon size={17} />,
    },
    {
      name: "Payment Id",
      value: order?._id.slice(-4),
      icon: <CopyIcon size={17} />,
    },
    {
      name: "View on block chain",
      value: "Click here",
      icon: <ArrowUpRight size={17} />,
      color: "text-violet-500",
    },
  ];

  return (
    <div className="px-1 space-y-4 mt-4">
      {fields.map((field) => (
        <div key={field.name} className="flex justify-between items-center">
          <h1 className="text-muted-foreground text-md">{field.name}</h1>
          <div
            className={`flex items-center gap-2 ${
              field.color ? field.color : ""
            } `}
          >
            <h1 className="text-md font-semibold">{field.value}</h1>
            <div>{field.icon}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderDetails;
