"use client"

import React from "react"
import { Search, SlidersHorizontal, X } from "lucide-react"

interface SearchBarProps {
  value: string
  onChange: (val: string) => void
  onFilterClick?: () => void
}

export function SearchBar({ value, onChange, onFilterClick }: SearchBarProps) {
  return (
    <div className="w-full px-4 mb-3.5">
      <div className="w-full bg-[var(--surface)] rounded-full shadow-[0_2px_12px_rgba(0,0,0,0.06)] border border-[var(--border-strong)] flex items-center px-4 py-2 transition-[box-shadow,border-color] duration-150 ease-out focus-within:ring-2 focus-within:ring-[var(--brand)] focus-within:border-[var(--brand)]">
        {/* Left Search Icon */}
        <Search className="w-4 h-4 text-[var(--text-secondary)] stroke-[2.2] mr-2.5 flex-shrink-0" />

        {/* Input */}
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search for dishes, cuisines, or categories..."
          className="w-full bg-transparent text-xs text-[var(--text-primary)] placeholder:text-[var(--text-muted)] font-normal outline-none"
        />

        {/* Clear Button (44x44pt Apple HIG Tap Area) */}
        {value && (
          <button
            type="button"
            onClick={() => onChange("")}
            aria-label="Clear Search"
            className="w-11 h-11 -my-2 flex items-center justify-center rounded-full text-[var(--text-secondary)] hover:text-[var(--text-primary)] active:scale-90 transition-transform cursor-pointer"
          >
            <div className="w-5 h-5 rounded-full bg-[var(--surface-raised)] flex items-center justify-center">
              <X className="w-3 h-3 stroke-[2.5]" />
            </div>
          </button>
        )}

        {/* Right Sliders / Filter Button (44x44pt Touch Target with Level 2 Pill) */}
        <button
          type="button"
          onClick={onFilterClick}
          aria-label="Filter Dishes"
          className="w-11 h-11 -my-2 -mr-2 flex items-center justify-center text-[var(--brand)] hover:text-[var(--brand-hover)] active:scale-[0.92] transition-transform flex-shrink-0 cursor-pointer"
        >
          <div className="w-7 h-7 rounded-full bg-[var(--surface-raised)] border border-[var(--border-subtle)] flex items-center justify-center shadow-xs">
            <SlidersHorizontal className="w-3.5 h-3.5 stroke-[2.2]" />
          </div>
        </button>
      </div>
    </div>
  )
}
