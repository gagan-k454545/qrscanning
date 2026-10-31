"use client"

import React from "react"
import { Star, Clock, Heart, Minus, Plus, ShoppingCart, Leaf, Flame, Sparkles, Check } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export interface FoodItemType {
  id: number
  name: string
  description: string
  price: number
  category: string
  image: string
  rating: number
  reviewCount?: number
  prepTime: string
  veg?: boolean
  popular?: boolean
  tags?: string[]
}

interface FoodCardProps {
  item: FoodItemType
  quantity: number
  isFavorite: boolean
  onAddToCart: () => void
  onRemoveFromCart: () => void
  onToggleFavorite: () => void
}

function getTagStyle(tag: string) {
  const lower = tag.toLowerCase()
  if (lower.includes("healthy") || lower.includes("no maida") || lower.includes("freshly") || lower.includes("protein")) {
    return {
      bg: "bg-[var(--tag-green-bg)]",
      text: "text-[var(--tag-green-text)]",
      border: "border-[var(--tag-green-border)]",
      icon: Leaf,
    }
  }
  if (lower.includes("spicy") || lower.includes("popular") || lower.includes("special")) {
    return {
      bg: "bg-[var(--tag-red-bg)]",
      text: "text-[var(--tag-red-text)]",
      border: "border-[var(--tag-red-border)]",
      icon: lower.includes("spicy") ? Flame : Sparkles,
    }
  }
  return {
    bg: "bg-[var(--tag-orange-bg)]",
    text: "text-[var(--tag-orange-text)]",
    border: "border-[var(--tag-orange-border)]",
    icon: Flame,
  }
}

export function FoodCard({
  item,
  quantity,
  isFavorite,
  onAddToCart,
  onRemoveFromCart,
  onToggleFavorite,
}: FoodCardProps) {
  const tags = item.tags && item.tags.length > 0
    ? item.tags
    : item.popular
    ? ["Popular", "South Indian"]
    : ["Healthy", "Freshly Made"]

  const reviewCount = item.reviewCount || 100

  return (
    <div className="bg-[var(--surface)] rounded-[22px] shadow-[0_4px_16px_rgba(0,0,0,0.06)] border border-[var(--border-strong)] overflow-hidden flex flex-col justify-between transition-shadow duration-200 group">
      {/* Top Media Area with Overlays */}
      <div className="relative w-full h-32 sm:h-34 overflow-hidden bg-gray-100 border-b border-[var(--border-subtle)]">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />

        {/* Top-Left Rating and Time Badges (Apple HIG Frosted Pill with visible border) */}
        <div className="absolute top-2 left-2 flex items-center gap-1 z-10 pointer-events-none">
          <div className="bg-white/95 backdrop-blur-md px-1.5 py-0.5 rounded-full text-[9px] font-bold text-[var(--text-primary)] flex items-center gap-0.5 shadow-xs border border-black/10">
            <Star className="w-2.5 h-2.5 text-amber-500 fill-amber-500" />
            <span>{item.rating}</span>
            <span className="text-[var(--text-secondary)] font-normal">({reviewCount})</span>
          </div>

          <div className="bg-white/95 backdrop-blur-md px-1.5 py-0.5 rounded-full text-[9px] font-bold text-[var(--text-primary)] flex items-center gap-0.5 shadow-xs border border-black/10">
            <Clock className="w-2.5 h-2.5 text-[var(--text-secondary)] stroke-[2.2]" />
            <span>{item.prepTime}</span>
          </div>
        </div>

        {/* Top-Right Favorite Button (Apple 44pt Touch Target Area) */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            onToggleFavorite()
          }}
          aria-label={`Save ${item.name} to favorites`}
          className="absolute -top-1 -right-1 w-11 h-11 flex items-center justify-center z-10 cursor-pointer active:scale-[0.90] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] transition-transform duration-150 ease-out"
        >
          <div className="w-7 h-7 rounded-full bg-white/95 backdrop-blur-md flex items-center justify-center shadow-xs border border-black/10">
            <AnimatePresence mode="wait">
              {isFavorite ? (
                <motion.div
                  key="favorited"
                  initial={{ scale: 0.7 }}
                  animate={{ scale: [1, 1.3, 0.95, 1] }}
                  transition={{ type: "spring", duration: 0.35, bounce: 0.3 }}
                >
                  <Heart className="w-3.5 h-3.5 text-[#E02424] fill-[#E02424]" />
                </motion.div>
              ) : (
                <motion.div
                  key="unfavorited"
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.15 }}
                >
                  <Heart className="w-3.5 h-3.5 text-[#E02424] stroke-[2]" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </button>
      </div>

      {/* Card Content */}
      <div className="p-2 sm:p-2.5 flex flex-col flex-1 justify-between">
        <div>
          {/* Title */}
          <h4 className="font-bold text-xs sm:text-[13px] text-[var(--text-primary)] leading-snug line-clamp-1 tracking-tight">
            {item.name}
          </h4>

          {/* Subtitle / Description */}
          <p className="text-[9.5px] text-[var(--text-secondary)] line-clamp-2 leading-tight mt-0.5 min-h-[22px]">
            {item.description}
          </p>

          {/* Tag Chips */}
          <div className="flex flex-wrap items-center gap-1 mt-1.5 mb-2">
            {tags.map((tag) => {
              const style = getTagStyle(tag)
              const Icon = style.icon
              return (
                <span
                  key={tag}
                  className={`inline-flex items-center gap-0.5 text-[8.5px] font-bold px-1.5 py-0.5 rounded-full border ${style.bg} ${style.text} ${style.border}`}
                >
                  <Icon className="w-2.5 h-2.5 stroke-[2]" />
                  <span>{tag}</span>
                </span>
              )
            })}
          </div>
        </div>

        {/* Bottom Price and Actions Row */}
        <div className="flex items-center justify-between pt-1.5 border-t border-[var(--border-subtle)]">
          {/* Price */}
          <span className="font-bold text-xs sm:text-[12.5px] text-[var(--text-primary)]">
            ₹{item.price.toFixed(2)}
          </span>

          <div className="flex items-center gap-1">
            {/* Stepper with Emil Physical Feedback & Apple HIG Tap Area */}
            <div
              className={`flex items-center rounded-full px-0.5 py-0.5 border shadow-2xs transition-colors duration-150 ${
                quantity > 0
                  ? "bg-[#EAF5ED] border-[var(--brand)] ring-1 ring-[var(--brand)]/25"
                  : "bg-[var(--surface-raised)] border-[var(--border-strong)]"
              }`}
            >
              <button
                type="button"
                onClick={onRemoveFromCart}
                disabled={quantity === 0}
                aria-label={`Decrease quantity of ${item.name}`}
                className="w-6 h-6 rounded-full flex items-center justify-center text-[var(--text-primary)] hover:text-[var(--brand)] disabled:opacity-25 disabled:cursor-not-allowed active:scale-[0.90] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--brand)] transition-transform duration-150 ease-out"
              >
                <Minus className="w-2.5 h-2.5 stroke-[2.5]" />
              </button>
              <span
                className={`w-4 text-center text-[10.5px] font-bold select-none ${
                  quantity > 0 ? "text-[var(--brand)] font-extrabold" : "text-[var(--text-secondary)]"
                }`}
              >
                {quantity}
              </span>
              <button
                type="button"
                onClick={onAddToCart}
                aria-label={`Increase quantity of ${item.name}`}
                className="w-6 h-6 rounded-full flex items-center justify-center text-[var(--text-primary)] hover:text-[var(--brand)] active:scale-[0.90] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--brand)] transition-transform duration-150 ease-out"
              >
                <Plus className="w-2.5 h-2.5 stroke-[2.5]" />
              </button>
            </div>

            {/* Add to Cart Button with Dynamic Feedback */}
            <button
              type="button"
              onClick={onAddToCart}
              aria-label={`Add ${item.name} to cart`}
              className={`px-2.5 py-1 rounded-full text-[10px] font-semibold flex items-center gap-1 shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-[var(--brand)] transition-[transform,background-color] duration-150 ease-out cursor-pointer active:scale-[0.96] ${
                quantity > 0
                  ? "bg-[#115E33] hover:bg-[#0E4E2A] text-white"
                  : "bg-[var(--brand)] hover:bg-[var(--brand-hover)] text-[var(--brand-contrast)]"
              }`}
            >
              {quantity > 0 ? (
                <>
                  <Check className="w-2.5 h-2.5 stroke-[2.5]" />
                  <span>Added</span>
                </>
              ) : (
                <>
                  <ShoppingCart className="w-2.5 h-2.5 stroke-[2]" />
                  <span>Add</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
