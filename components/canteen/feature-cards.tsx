"use client"

import React from "react"
import { Leaf, ShieldCheck, Zap, Users } from "lucide-react"

const features = [
  {
    id: "freshly-made",
    title: "Freshly Made",
    subtitle: "Everyday",
    icon: Leaf,
    cardBg: "bg-[var(--feat-green-bg)]",
    borderBg: "border-[var(--feat-green-border)]",
    iconBg: "bg-[var(--feat-green-icon-bg)]",
    iconColor: "text-[var(--feat-green-icon)]",
  },
  {
    id: "hygienic-safe",
    title: "Hygienic & Safe",
    subtitle: "Quality Assured",
    icon: ShieldCheck,
    cardBg: "bg-[var(--feat-blue-bg)]",
    borderBg: "border-[var(--feat-blue-border)]",
    iconBg: "bg-[var(--feat-blue-icon-bg)]",
    iconColor: "text-[var(--feat-blue-icon)]",
  },
  {
    id: "quick-pickup",
    title: "Quick Pickup",
    subtitle: "No Waiting",
    icon: Zap,
    cardBg: "bg-[var(--feat-orange-bg)]",
    borderBg: "border-[var(--feat-orange-border)]",
    iconBg: "bg-[var(--feat-orange-icon-bg)]",
    iconColor: "text-[var(--feat-orange-icon)]",
  },
  {
    id: "campus-special",
    title: "Campus Special",
    subtitle: "Loved by Students",
    icon: Users,
    cardBg: "bg-[var(--feat-purple-bg)]",
    borderBg: "border-[var(--feat-purple-border)]",
    iconBg: "bg-[var(--feat-purple-icon-bg)]",
    iconColor: "text-[var(--feat-purple-icon)]",
  },
]

export function FeatureCards() {
  return (
    <div className="w-full px-4 mb-3.5 select-none">
      <div className="grid grid-cols-4 gap-1.5 sm:gap-2">
        {features.map((feature) => {
          const Icon = feature.icon
          return (
            <div
              key={feature.id}
              className={`${feature.cardBg} ${feature.borderBg} border rounded-2xl p-2 sm:p-2.5 flex flex-col justify-between transition-transform duration-150 active:scale-[0.97] desktop-hover-lift shadow-[0_2px_8px_rgba(0,0,0,0.04)] min-h-[88px] cursor-pointer`}
            >
              <div
                className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full ${feature.iconBg} ${feature.iconColor} flex items-center justify-center mb-1 shadow-xs border border-white/40`}
              >
                <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.2]" />
              </div>
              <div>
                <h4 className="text-[9.5px] sm:text-[10.5px] font-bold text-[var(--text-primary)] leading-[1.15]">
                  {feature.title}
                </h4>
                <p className="text-[7.5px] sm:text-[8.5px] text-[var(--text-secondary)] font-medium leading-tight mt-0.5 whitespace-nowrap">
                  {feature.subtitle}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
