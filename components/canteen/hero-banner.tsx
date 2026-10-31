"use client"

import React from "react"
import { ArrowRight, Leaf } from "lucide-react"

interface HeroBannerProps {
  onExploreClick?: () => void
}

export function HeroBanner({ onExploreClick }: HeroBannerProps) {
  return (
    <div className="w-full px-4 mb-3.5 select-none">
      <div className="relative w-full overflow-hidden rounded-[26px] bg-gradient-to-br from-[#EAF5ED] via-[#EDF7EF] to-[#DCEFE3] border border-[var(--border-subtle)] shadow-[0_4px_20px_rgba(11,59,36,0.08)] min-h-[195px] flex items-center transition-transform duration-200">
        {/* Background Composite Banner Image */}
        <div className="absolute inset-0 w-full h-full pointer-events-none">
          <img
            src="/images/hero-canteen-banner.png"
            alt="Campus Canteen Hero Feast"
            className="w-full h-full object-cover object-right"
          />
        </div>

        {/* Left Interactive Content */}
        <div className="relative z-10 w-[58%] pl-4 sm:pl-5 py-4 flex flex-col justify-center">
          {/* Eyebrow */}
          <div className="flex items-center gap-1 text-[var(--brand)] mb-1">
            <Leaf className="w-3.5 h-3.5 fill-[var(--brand)] stroke-none" />
            <span className="text-[9px] sm:text-[10px] font-bold tracking-[0.16em] uppercase text-[var(--brand)]">
              GOOD FOOD, BETTER DAYS
            </span>
          </div>

          {/* Headline */}
          <h2 className="font-serif text-[22px] sm:text-[25px] font-bold text-[var(--brand)] leading-[1.12] tracking-tight">
            Freshly Made<br />Campus Food
          </h2>

          {/* Subtitle */}
          <p className="text-[10.5px] sm:text-[11.5px] text-[var(--text-secondary)] font-normal leading-[1.3] mt-1 mb-3 max-w-[185px]">
            Skip the line! Order your favorite campus food online and pick it up when it's ready.
          </p>

          {/* CTA Button with Emil Scale Feedback */}
          <div>
            <button
              type="button"
              onClick={onExploreClick}
              className="inline-flex items-center gap-1.5 bg-[var(--brand)] hover:bg-[var(--brand-hover)] active:scale-[0.96] text-[var(--brand-contrast)] px-4 py-2 rounded-full text-xs font-semibold shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--brand)] transition-[transform,background-color] duration-150 ease-out cursor-pointer"
            >
              <span>Explore Menu</span>
              <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
            </button>
          </div>
        </div>

        {/* Top-Right Badge: 'Same Great Taste On Campus' */}
        <div className="absolute top-2.5 right-3.5 z-10 pointer-events-none text-right">
          <div className="bg-white/85 backdrop-blur-md px-2 py-0.5 rounded-full text-[8.5px] font-bold text-[#0D3820] shadow-sm border border-emerald-100/80 flex items-center gap-1">
            <span>Same Great Taste On Campus</span>
            <span>♡</span>
          </div>
        </div>

        {/* Bottom-Right Badge: '1/4' */}
        <div className="absolute bottom-2.5 right-3 z-10">
          <div className="bg-black/60 text-white text-[9px] font-bold px-2 py-0.5 rounded-full backdrop-blur-md">
            1/4
          </div>
        </div>
      </div>
    </div>
  )
}
