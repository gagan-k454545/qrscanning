"use client"

import React from "react"
import { toast } from "sonner"
import { Check, Trash2, Heart } from "lucide-react"

/**
 * Apple HIG & Emil Kowalski Design Engineering Notification Engine
 * 
 * Features:
 * - Dynamic Island / iOS Capsule shape (compact ~38px height, rounded-full)
 * - Single-instance stable ID: Rapid additions update the capsule in place rather than stacking
 * - Liquid Glass material: dark translucent backdrop with backdrop-blur-xl and emerald rim
 * - Physics: Spring-based entry/exit, swipe-to-dismiss, and active:scale-95 touch feedback
 * - Non-intrusive: Never blocks screen content or food cards
 */
export const notify = {
  cartAdd: (dishName: string, count: number) => {
    toast.custom(
      (t) => (
        <div
          onClick={() => toast.dismiss(t)}
          className="pointer-events-auto flex items-center gap-2.5 bg-[#0B2E1D]/95 text-white pl-2 pr-3.5 py-1.5 rounded-full shadow-[0_10px_28px_rgba(0,0,0,0.28)] border border-emerald-500/35 backdrop-blur-xl mx-auto cursor-pointer active:scale-95 transition-transform duration-150 select-none max-w-[340px]"
        >
          <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center flex-shrink-0 shadow-xs">
            <Check className="w-3.5 h-3.5 stroke-[3]" />
          </div>
          <div className="flex items-center gap-1.5 text-xs truncate">
            <span className="font-bold text-white tracking-tight">Added</span>
            <span className="text-emerald-200/90 font-medium truncate max-w-[130px] sm:max-w-[160px]">{dishName}</span>
          </div>
          <span className="ml-auto text-[10px] font-bold bg-white/15 text-emerald-100 px-2 py-0.5 rounded-full flex-shrink-0">
            {count} in cart
          </span>
        </div>
      ),
      { id: "cart-capsule", duration: 2200 }
    )
  },

  cartRemove: (dishName: string, remainingCount: number) => {
    toast.custom(
      (t) => (
        <div
          onClick={() => toast.dismiss(t)}
          className="pointer-events-auto flex items-center gap-2 bg-[#1C1C1E]/95 text-white pl-2 pr-3.5 py-1.5 rounded-full shadow-[0_10px_28px_rgba(0,0,0,0.28)] border border-white/15 backdrop-blur-xl mx-auto cursor-pointer active:scale-95 transition-transform duration-150 select-none max-w-[340px]"
        >
          <div className="w-6 h-6 rounded-full bg-zinc-700 text-zinc-200 flex items-center justify-center flex-shrink-0">
            <Trash2 className="w-3 h-3 stroke-[2.2]" />
          </div>
          <div className="flex items-center gap-1.5 text-xs truncate">
            <span className="font-bold text-white">Removed</span>
            <span className="text-zinc-300 font-medium truncate max-w-[130px] sm:max-w-[160px]">{dishName}</span>
          </div>
          {remainingCount > 0 && (
            <span className="ml-auto text-[10px] font-bold bg-white/10 text-zinc-300 px-2 py-0.5 rounded-full flex-shrink-0">
              {remainingCount} left
            </span>
          )}
        </div>
      ),
      { id: "cart-capsule", duration: 2000 }
    )
  },

  cartClear: () => {
    toast.custom(
      (t) => (
        <div
          onClick={() => toast.dismiss(t)}
          className="pointer-events-auto flex items-center gap-2 bg-[#1C1C1E]/95 text-white pl-2.5 pr-4 py-1.5 rounded-full shadow-[0_10px_28px_rgba(0,0,0,0.28)] border border-white/15 backdrop-blur-xl mx-auto cursor-pointer active:scale-95 transition-transform duration-150 select-none"
        >
          <div className="w-6 h-6 rounded-full bg-rose-600/80 text-white flex items-center justify-center flex-shrink-0">
            <Trash2 className="w-3 h-3 stroke-[2.2]" />
          </div>
          <span className="text-xs font-bold text-white">Cart Cleared</span>
          <span className="text-[11px] text-zinc-300">• All dishes removed</span>
        </div>
      ),
      { id: "cart-capsule", duration: 2000 }
    )
  },

  favorite: (dishName: string, isFav: boolean) => {
    toast.custom(
      (t) => (
        <div
          onClick={() => toast.dismiss(t)}
          className="pointer-events-auto flex items-center gap-2 bg-[#1C1C1E]/95 text-white pl-2 pr-3.5 py-1.5 rounded-full shadow-[0_10px_28px_rgba(0,0,0,0.28)] border border-white/15 backdrop-blur-xl mx-auto cursor-pointer active:scale-95 transition-transform duration-150 select-none"
        >
          <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${isFav ? "bg-rose-500/20 text-rose-400" : "bg-zinc-700 text-zinc-300"}`}>
            <Heart className={`w-3.5 h-3.5 ${isFav ? "fill-rose-500 stroke-rose-500" : "stroke-zinc-300"}`} />
          </div>
          <span className="text-xs font-bold text-white">{isFav ? "Saved to Favorites" : "Removed"}</span>
          <span className="text-[11px] text-zinc-300 truncate max-w-[130px]">• {dishName}</span>
        </div>
      ),
      { id: "fav-capsule", duration: 2000 }
    )
  },

  whatsapp: () => {
    toast.custom(
      (t) => (
        <div
          onClick={() => toast.dismiss(t)}
          className="pointer-events-auto flex items-center gap-2 bg-[#0B2E1D]/95 text-white pl-2 pr-4 py-1.5 rounded-full shadow-[0_10px_28px_rgba(0,0,0,0.28)] border border-emerald-500/35 backdrop-blur-xl mx-auto cursor-pointer active:scale-95 transition-transform duration-150 select-none"
        >
          <div className="w-6 h-6 rounded-full bg-[#25D366] text-white flex items-center justify-center flex-shrink-0 shadow-xs">
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
          </div>
          <span className="text-xs font-bold text-white">Opening WhatsApp...</span>
          <span className="text-[11px] text-emerald-200">• +91 84950 54721</span>
        </div>
      ),
      { id: "wa-capsule", duration: 2500 }
    )
  },

  info: (title: string, msg?: string) => {
    toast.custom(
      (t) => (
        <div
          onClick={() => toast.dismiss(t)}
          className="pointer-events-auto flex items-center gap-2 bg-[#1C1C1E]/95 text-white pl-3 pr-4 py-1.5 rounded-full shadow-[0_10px_28px_rgba(0,0,0,0.28)] border border-white/15 backdrop-blur-xl mx-auto cursor-pointer active:scale-95 transition-transform duration-150 select-none max-w-[340px]"
        >
          <span className="text-xs font-bold text-white">{title}</span>
          {msg && <span className="text-[11px] text-zinc-300">• {msg}</span>}
        </div>
      ),
      { duration: 2000 }
    )
  }
}
