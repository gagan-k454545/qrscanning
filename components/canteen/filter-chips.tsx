"use client"

import React from "react"
import { ArrowRight } from "lucide-react"

export const FILTER_CHIPS = [
  "All",
  "Idli",
  "Dosa",
  "Vada",
  "Uttapam",
  "Rice",
  "Snacks",
  "Beverages",
]

interface FilterChipsProps {
  activeChip: string
  onSelectChip: (chip: string) => void
  onSeeAllClick?: () => void
}

export function FilterChips({ activeChip, onSelectChip, onSeeAllClick }: FilterChipsProps) {
  return (
    <div className="w-full px-4 mb-3.5 select-none">
      {/* Title & See All */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-xl font-bold text-[var(--text-primary)] tracking-tight">
          Today's Menu
        </h3>
        <button
          type="button"
          onClick={onSeeAllClick}
          aria-label="See All Dishes"
          className="text-[var(--brand)] hover:text-[var(--brand-hover)] text-xs font-semibold flex items-center gap-1 group active:scale-[0.96] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] rounded-md px-1 py-0.5 transition-transform duration-150 cursor-pointer"
        >
          <span>See All</span>
          <ArrowRight className="w-3.5 h-3.5 stroke-[2.2] group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>

      {/* Filter Chips Scroller with Snap and Tactile Press */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1 -mx-4 px-4 scroll-smooth">
        {FILTER_CHIPS.map((chip) => {
          const isActive = activeChip.toLowerCase() === chip.toLowerCase()
          return (
            <button
              key={chip}
              type="button"
              onClick={() => onSelectChip(chip)}
              aria-label={`Filter by ${chip}`}
              className={`flex-shrink-0 min-h-[44px] px-4 py-2.5 rounded-full text-xs font-semibold transition-[transform,background-color,border-color,box-shadow] duration-150 active:scale-[0.96] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] cursor-pointer ${
                isActive
                  ? "bg-[var(--brand)] text-[var(--brand-contrast)] border border-[var(--brand)] shadow-sm"
                  : "bg-[var(--surface)] text-[var(--text-primary)] border border-[var(--border-strong)] hover:bg-[var(--surface-raised)] shadow-[0_1px_4px_rgba(0,0,0,0.04)]"
              }`}
            >
              {chip}
            </button>
          )
        })}
      </div>
    </div>
  )
}
