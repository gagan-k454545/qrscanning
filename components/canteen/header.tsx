"use client"

import React from "react"
import { Bell, ShoppingCart, ChevronDown } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface HeaderProps {
  cartCount: number
  onCartClick: () => void
  onOrdersClick: () => void
}

export function Header({ cartCount, onCartClick, onOrdersClick }: HeaderProps) {
  return (
    <header className="w-full px-4 pt-1 pb-2 flex items-center justify-between select-none">
      {/* Left: App Logo & Title */}
      <div className="flex items-center gap-2.5 flex-shrink-0">
        <div className="w-10 h-10 rounded-2xl bg-[#0D3820] overflow-hidden shadow-sm flex items-center justify-center p-0.5 flex-shrink-0 border border-white/20">
          <img
            src="/images/logo.png"
            alt="Sahyadri Canteen Logo"
            className="w-full h-full object-cover rounded-xl"
          />
        </div>
        <div className="flex flex-col">
          <h1 className="text-[17px] font-bold text-[var(--text-primary)] leading-tight tracking-tight">
            Sahyadri
          </h1>
          <span className="text-[11px] text-[var(--text-secondary)] font-medium leading-tight">
            Digital Canteen
          </span>
        </div>
      </div>

      {/* Right: Actions with Apple HIG 44pt Touch Targets */}
      <div className="flex items-center gap-0.5 sm:gap-1 flex-shrink-0">
        {/* Campus Dropdown Pill */}
        <button
          type="button"
          aria-label="Campus Selector"
          className="flex items-center gap-1 bg-[var(--surface)] border border-[var(--border-subtle)] shadow-[0_1px_4px_rgba(0,0,0,0.05)] px-3 py-1.5 rounded-full text-[11px] font-semibold text-[var(--text-primary)] hover:bg-gray-50 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] transition-[transform,background-color] duration-150 ease-out cursor-pointer mr-1"
        >
          <div className="w-2 h-2 rounded-full bg-[var(--brand)] flex items-center justify-center">
            <div className="w-0.5 h-0.5 rounded-full bg-white" />
          </div>
          <span>Campus</span>
          <ChevronDown className="w-3 h-3 text-[var(--text-secondary)] stroke-[2.2]" />
        </button>

        {/* Notification Bell (44x44pt Hit Target) */}
        <button
          type="button"
          onClick={onOrdersClick}
          aria-label="Notifications & Order Status"
          className="relative w-11 h-11 rounded-full flex items-center justify-center text-[var(--text-primary)] hover:bg-black/[0.04] active:scale-[0.93] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] transition-transform cursor-pointer"
        >
          <Bell className="w-[18px] h-[18px] stroke-[1.8]" />
          <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-[#FF3B30] rounded-full ring-2 ring-white" />
        </button>

        {/* Cart Icon (44x44pt Hit Target with Spring Badge) */}
        <button
          type="button"
          onClick={onCartClick}
          aria-label="Shopping Cart"
          className="relative w-11 h-11 rounded-full flex items-center justify-center text-[var(--text-primary)] hover:bg-black/[0.04] active:scale-[0.93] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] transition-transform cursor-pointer"
        >
          <ShoppingCart className="w-[18px] h-[18px] stroke-[1.8]" />
          <AnimatePresence>
            {cartCount > 0 && (
              <motion.span
                key={cartCount}
                initial={{ scale: 0.6 }}
                animate={{ scale: [1.2, 0.95, 1] }}
                transition={{ type: "spring", duration: 0.35, bounce: 0.3 }}
                className="absolute top-1.5 right-1.5 min-w-[16px] h-[16px] px-1 bg-[var(--brand)] text-[var(--brand-contrast)] rounded-full text-[9.5px] font-bold flex items-center justify-center shadow-sm"
              >
                {cartCount}
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>
    </header>
  )
}
