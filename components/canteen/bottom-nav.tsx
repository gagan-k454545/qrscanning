"use client"

import React from "react"
import { Home, Heart, User } from "lucide-react"

export type NavTab = "home" | "orders" | "scan" | "favorites" | "account"

interface BottomNavProps {
  activeTab: NavTab
  onSelectTab: (tab: NavTab) => void
  onScanPayClick: () => void
  onOrdersClick: () => void
  onFavoritesClick: () => void
  onAccountClick: () => void
}

export function BottomNav({
  activeTab,
  onSelectTab,
  onScanPayClick,
  onOrdersClick,
  onFavoritesClick,
  onAccountClick,
}: BottomNavProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto z-40 bg-[var(--surface)] border-t border-[var(--border-strong)] shadow-[0_-4px_24px_rgba(0,0,0,0.08)] select-none safe-bottom">
      <div className="relative flex items-center justify-between px-2 pt-1.5 pb-1">
        {/* 1. Home */}
        <button
          type="button"
          onClick={() => onSelectTab("home")}
          aria-label="Home"
          className={`flex-1 min-h-[44px] flex flex-col items-center justify-center py-1 transition-colors active:scale-[0.94] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] rounded-xl duration-150 cursor-pointer ${
            activeTab === "home" ? "text-[var(--brand)]" : "text-[var(--nav-inactive)] hover:text-[var(--text-primary)]"
          }`}
        >
          <Home
            className={`w-5 h-5 stroke-[2] transition-transform ${
              activeTab === "home" ? "fill-[var(--brand)] scale-105" : ""
            }`}
          />
          <span className="text-[10px] font-semibold mt-1">Home</span>
        </button>

        {/* 2. Orders */}
        <button
          type="button"
          onClick={onOrdersClick}
          aria-label="Orders"
          className={`flex-1 min-h-[44px] flex flex-col items-center justify-center py-1 transition-colors active:scale-[0.94] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] rounded-xl duration-150 cursor-pointer ${
            activeTab === "orders" ? "text-[var(--brand)]" : "text-[var(--nav-inactive)] hover:text-[var(--text-primary)]"
          }`}
        >
          <svg
            className="w-5 h-5 stroke-current fill-none stroke-[2]"
            viewBox="0 0 24 24"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 12h6m-6 4h4M6 3h12a2 2 0 012 2v15l-3-2-3 2-3-2-3 2-3-2-3 2V5a2 2 0 012-2z" />
          </svg>
          <span className="text-[10px] font-semibold mt-1">Orders</span>
        </button>

        {/* 3. Center Floating Scan & Pay Button */}
        <div className="flex-1 flex flex-col items-center justify-center relative -top-3.5">
          <button
            type="button"
            onClick={onScanPayClick}
            aria-label="Scan and Pay"
            className="rounded-full bg-[var(--brand)] hover:bg-[var(--brand-hover)] active:scale-[0.93] text-[var(--brand-contrast)] flex items-center justify-center shadow-xl border-[3.5px] border-[var(--surface)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--brand)] transition-transform duration-150 ease-out cursor-pointer"
            style={{ width: "52px", height: "52px" }}
          >
            <svg
              className="w-5 h-5 stroke-white fill-none stroke-[2.2]"
              viewBox="0 0 24 24"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 8V6a2 2 0 012-2h2M4 16v2a2 2 0 002 2h2M16 4h2a2 2 0 012 2v2M16 20h2a2 2 0 002-2v-2" />
              <rect x="9" y="9" width="6" height="6" rx="1" strokeWidth="2" />
            </svg>
          </button>
          <span className="text-[10px] font-bold text-[var(--text-primary)] mt-1 whitespace-nowrap">
            Scan & Pay
          </span>
        </div>

        {/* 4. Favorites */}
        <button
          type="button"
          onClick={onFavoritesClick}
          aria-label="Favorites"
          className={`flex-1 min-h-[44px] flex flex-col items-center justify-center py-1 transition-colors active:scale-[0.94] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] rounded-xl duration-150 cursor-pointer ${
            activeTab === "favorites" ? "text-[var(--brand)]" : "text-[var(--nav-inactive)] hover:text-[var(--text-primary)]"
          }`}
        >
          <Heart
            className={`w-5 h-5 stroke-[2] ${
              activeTab === "favorites" ? "fill-[var(--brand)] stroke-[var(--brand)]" : ""
            }`}
          />
          <span className="text-[10px] font-semibold mt-1">Favorites</span>
        </button>

        {/* 5. Account */}
        <button
          type="button"
          onClick={onAccountClick}
          aria-label="Account"
          className={`flex-1 min-h-[44px] flex flex-col items-center justify-center py-1 transition-colors active:scale-[0.94] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] rounded-xl duration-150 cursor-pointer ${
            activeTab === "account" ? "text-[var(--brand)]" : "text-[var(--nav-inactive)] hover:text-[var(--text-primary)]"
          }`}
        >
          <User className="w-5 h-5 stroke-[2]" />
          <span className="text-[10px] font-semibold mt-1">Account</span>
        </button>
      </div>
    </div>
  )
}
