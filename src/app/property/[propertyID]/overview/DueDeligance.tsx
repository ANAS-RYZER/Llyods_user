import { Building, File, Link, Link2Icon, Play } from 'lucide-react'
import React, { useState } from 'react'
import RyzerCard from '@/components/cards/RyzerCard'
import { Button } from '@/components/ui/button';

interface DueDiligenceItem {
    _id: string;
    name: string;
    logoUrl: string;
    location: string;
    link: string;
    createdAt?: string;
    updatedAt?: string;
    __v?: number;
}

interface DueDeliganceProps {
  dueDiligence: {
    legal: DueDiligenceItem[];
    structure: DueDiligenceItem[];
    valuation: DueDiligenceItem[];
  };
}

const TABS = ["legal", "valuation", "structure"] as const;
type TabType = typeof TABS[number];

const DueDeliganceComponent = ({ dueDiligence }: DueDeliganceProps) => {
  const [activeTab, setActiveTab] = useState<TabType>('legal');

  const tabData = dueDiligence[activeTab];
  

  return (
    <div>
      <RyzerCard title="Due Diligence" isCollapsible={true} icon={<File size={16} className=" text-gray-600" />}>
        <div className="flex w-full justify-center bg-gray-100 p-1 rounded-full gap-2">
          {TABS.map(tab => (
            <Button
              key={tab}
              className={`px-4 py-2  rounded-full w-full hover:bg-black text-black  shadow-none hover:text-white capitalize ${activeTab === tab ? "bg-black text-white" : "bg-white-200"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </Button>
          ))}
        </div>

        {tabData && tabData.length > 0 && (
          <div className="flex flex-col md:flex-row items-center gap-4 bg-white p-4 rounded-lg shadow">
            <img src={tabData[0].logoUrl} alt={tabData[0].name} className="w-16 h-16 rounded-full object-cover border" />
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold">{tabData[0].name}</h2>
                <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded">Verified Partner</span>
              </div>
              <div className="text-gray-500 text-sm mb-1">{tabData[0].location}</div>
              <div className="flex items-center gap-2">

                <Link className="text-blue-600 underline text-sm"  size={12}/>
              <a href={tabData[0].link} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline text-sm">
                {tabData[0].link.replace(/^https?:\/\//, '')}
              </a>
              </div>
            </div>
            {/* <Button className="ml-auto bg-transparent hover:bg-gray-50 text-black px-3 py-1 rounded flex items-center gap-1 text-sm" onClick={() => {
              window.open(tabData[0].link, '_blank')
            }}>
              <Play size={12} />
              Watch Video
            </Button> */}
          </div>
        )}
      </RyzerCard>
    </div>
  )
}

export default DueDeliganceComponent
