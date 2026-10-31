"use client"

import React from "react"

export interface CategoryItem {
  id: string
  name: string
  image: string
}

export const CATEGORIES: CategoryItem[] = [
  { id: "popular", name: "Popular", image: "/images/cat-popular.png" },
  { id: "breakfast", name: "Breakfast", image: "/images/cat-breakfast.png" },
  { id: "lunch", name: "Lunch", image: "/images/cat-lunch.png" },
  { id: "snacks", name: "Snacks", image: "/images/cat-snacks.png" },
  { id: "beverages", name: "Beverages", image: "/images/cat-beverages.png" },
  { id: "south-indian", name: "South Indian", image: "/images/cat-south-indian.png" },
  { id: "chinese", name: "Chinese", image: "/images/cat-chinese.png" },
]

interface CategoryScrollerProps {
  activeCategory: string
  onSelectCategory: (categoryId: string) => void
}

export function CategoryScroller({ activeCategory, onSelectCategory }: CategoryScrollerProps) {
  return (
    <div className="w-full mb-4 select-none">
      <div className="flex items-start gap-3.5 overflow-x-auto no-scrollbar px-4 py-1 scroll-smooth">
        {CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat.id

          if (cat.id === "popular" && isActive) {
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => onSelectCategory(cat.id)}
                aria-label={`Category: ${cat.name}`}
                className="relative flex-shrink-0 w-[66px] h-[90px] rounded-2xl overflow-hidden shadow-md border border-[var(--brand)] active:scale-[0.96] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] transition-transform duration-150 cursor-pointer"
              >
                <img
                  src={cat.image}
                  alt="Popular Category"
                  className="w-full h-full object-contain"
                />
              </button>
            )
          }

          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => onSelectCategory(cat.id)}
              aria-label={`Category: ${cat.name}`}
              className="flex-shrink-0 flex flex-col items-center group transition-transform duration-150 active:scale-[0.95] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] rounded-full cursor-pointer"
            >
              <div
                className={`w-14 h-14 rounded-full overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.06)] border transition-[border-color,box-shadow,transform] duration-150 p-0.5 ${
                  isActive
                    ? "border-[var(--brand)] ring-3 ring-[var(--brand)]/25 bg-[var(--surface)]"
                    : "border-[var(--border-strong)] bg-[var(--surface)] group-hover:scale-[1.03]"
                }`}
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <span
                className={`text-[11px] text-center mt-1.5 transition-colors ${
                  isActive ? "text-[var(--brand)] font-bold" : "text-[var(--text-primary)] font-semibold"
                }`}
              >
                {cat.name}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
