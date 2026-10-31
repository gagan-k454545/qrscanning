"use client"

import React from "react"
import { Wifi } from "lucide-react"

export function StatusBar() {
  return (
    <div className="w-full flex items-center justify-between px-5 pt-2.5 pb-1 select-none text-black">
      <span className="text-[13px] font-semibold tracking-tight">9:41</span>
      
      <div className="flex items-center gap-1.5">
        {/* Cellular Signal Bars */}
        <div className="flex items-end gap-0.5 h-3">
          <div className="w-[3px] h-[3px] bg-black rounded-sm" />
          <div className="w-[3px] h-[5px] bg-black rounded-sm" />
          <div className="w-[3px] h-[8px] bg-black rounded-sm" />
          <div className="w-[3px] h-[11px] bg-black rounded-sm" />
        </div>

        {/* WiFi Icon */}
        <Wifi className="w-3.5 h-3.5 text-black stroke-[2.2]" />

        {/* Battery Icon */}
        <div className="flex items-center">
          <div className="w-5 h-2.5 border-[1.2px] border-black rounded-[3px] p-[1px] flex items-center">
            <div className="w-full h-full bg-black rounded-[1.5px]" />
          </div>
          <div className="w-[1px] h-1 bg-black rounded-r-sm -ml-[0.5px]" />
        </div>
      </div>
    </div>
  )
}
