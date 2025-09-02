import React from "react"
export default function Banner({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <div className="bg-neutral-900 text-white p-4 rounded-2xl w-[360px]">
      <div className="flex items-center gap-3">
        <div className="mt-0.5 flex h-7 w-7 items-center justify-center rounded-full">{icon}</div>
        <div className="flex flex-col gap-1">
          <div className="text-[15px] font-semibold leading-5">{title}</div>
          <div className="text-sm leading-5 text-neutral-300">{description}</div>
        </div>
      </div>
    </div>
  )
}
