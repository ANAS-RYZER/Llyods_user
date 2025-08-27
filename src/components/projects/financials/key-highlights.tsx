"use client"

import type React from "react"

import { useState } from "react"
import {
 
  Building,
  TrendingUp,
  DollarSign,
  LayoutGrid,
  Tag,
  Users,
  Percent,
  Info,
  Star,
  ChartArea,
  Ruler,
  File,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { toTitleCase } from "@/lib/format.utility"
import FandoraCrew from "@/components/cards/BudgetCard/FandoraCrew"
import dynamic from "next/dynamic"
import { InfoIcon } from "@/components/common/InfoIcon"
import { truncate } from "fs"
const FandoraCard = dynamic(() => import("@/components/cards/RyzerCard"), { ssr: false });


export enum AssetStyle {
  TOWER = "tower",
  VILLA = "villa",
  BUILDING = "building",
  DEVELOPED_LAND = "developed-land",
  INDIVIDUAL_LAND = "individual-land",
}

export interface IKeyHighlights {
  assetStyle: AssetStyle
  projectedAppreciation: number
  totalAssetValue: number
  totalAreaSqft: number
  pricePerSqft: number
  ownershipType?: string
  spvName?: string
  instrumentType: string
  irr : number

}

interface HighlightItemProps {
  icon: React.ReactNode
  label: string
  value: React.ReactNode
  info?: React.ReactElement
}

const HighlightItem = ({ icon, label, value, info }: HighlightItemProps) => (
  <div className="flex items-start gap-4 p-2">
    <div className="flex-shrink-0 w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">{icon}</div>
    <div className="flex-grow">
      <div className="flex items-center gap-2">
        <p className="text-gray-600 text-sm">{label}</p>
        {info}
      </div>
      <div className="flex items-center gap-2">
        <p className="text-md font-semibold text-gray-900">{value}</p>      
      </div>
    </div>
  </div>
)

const formatCurrency = (value: number) => {
  return `€ ${value.toLocaleString("en-IN")}`
}

export const KeyHighlights = ({ keyHighlights }: { keyHighlights: IKeyHighlights }) => {
  const [isExpanded, setIsExpanded] = useState(true)

  const formatAssetStyle = (style: AssetStyle) => {
    switch (style) {
      case AssetStyle.BUILDING:
        return "Commercial Building"
      case AssetStyle.TOWER:
        return "Tower"
      case AssetStyle.VILLA:
        return "Villa"
      case AssetStyle.DEVELOPED_LAND:
        return "Developed Land"
      case AssetStyle.INDIVIDUAL_LAND:
        return "Individual Land"
      default:
        return style
    }
  }

  return (
    
   
      
    <FandoraCard title="Key Highlights" tooltipData={false} isCollapsible={true} icon={<Star   size={16} className=" text-gray-600" />}    >
    
        <div className="grid grid-cols-1  rounded-xl md:grid-cols-2 gap-2 p-4 bg-gray-50 m-2">
          <HighlightItem
            icon={<Building size={16} className=" text-gray-600" />}
            label="Asset Style"
            value={formatAssetStyle(keyHighlights.assetStyle)}
            info={<InfoIcon tooltip={`Asset Style ${keyHighlights.assetStyle}`} size={12} />}
          />

          <HighlightItem
            icon={<TrendingUp size={16} className=" text-gray-600" />}
            label="Projected IRR"
            value={
              <>
                {keyHighlights?.irr.toFixed(2)}%{" "}
                <span className="text-blue-700 text-sm font-bold">P.A.</span>
              </>
            }
            info={<InfoIcon tooltip={`Projected IRR ${keyHighlights.irr}`} size={12}  />}
          />

          <HighlightItem
            icon={<DollarSign size={16} className=" text-gray-600" />}
            label="Total Asset Value"
            value={formatCurrency(keyHighlights.totalAssetValue)}
            info={<InfoIcon tooltip={`Total Asset Value ${keyHighlights.totalAssetValue}`} size={12}  />}
          />

          <HighlightItem
            icon={<ChartArea size={16} className=" text-gray-600" />}
            label="Total Area (SFT)"
            value={keyHighlights.totalAreaSqft.toLocaleString()}
            info={<InfoIcon tooltip={`Total Area (SFT) ${keyHighlights.totalAreaSqft}`} size={12}  />}
          />

          <HighlightItem
            icon={<Ruler size={16} className=" text-gray-600" />}
            label="Price per SFT"
            value={formatCurrency(keyHighlights.pricePerSqft)}
            info={<InfoIcon tooltip={`Price per SFT ${keyHighlights.pricePerSqft}`}  size={12} />}
          />

          <HighlightItem
            icon={<Users size={16} className=" text-gray-600" />}
            label="Ownership Type"
            value={keyHighlights.ownershipType || "LLP Partnership"}
            info={<InfoIcon tooltip={`Ownership Type ${keyHighlights.ownershipType}`}  size={12}  />}
          />

          <HighlightItem
            icon={<File size={16} className=" text-gray-600" />}
            label="SPV Name"
            value={keyHighlights.spvName || "LLP Partnership"}
            info={<InfoIcon tooltip={`SPV Name ${keyHighlights.spvName}`} size={12}  />}
          />

          <HighlightItem
            icon={<Percent size={16} className=" text-gray-600" />}
            label="Instrument Type"
            value={toTitleCase(keyHighlights.instrumentType)}
            info={<InfoIcon tooltip={`Instrument Type ${keyHighlights.instrumentType}`} size={12}  />}
          />
        </div>
         </FandoraCard>
   
  )
}
