"use client"

import { useState, useEffect, useMemo } from "react"
import {
  ShoppingCart,
  Plus,
  Minus,
  X,
  ChevronRight,
  Check,
  ArrowRight,
  Clock,
  Star,
  History,
  Calendar,
  ArrowLeft,
  Heart,
  QrCode,
  User,
  Shield,
  CreditCard,
  MapPin,
  Bell,
} from "lucide-react"
import QRCode from "react-qr-code"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { motion, AnimatePresence } from "framer-motion"

import { StatusBar } from "@/components/canteen/status-bar"
import { Header } from "@/components/canteen/header"
import { HeroBanner } from "@/components/canteen/hero-banner"
import { FeatureCards } from "@/components/canteen/feature-cards"
import { SearchBar } from "@/components/canteen/search-bar"
import { CategoryScroller } from "@/components/canteen/category-scroller"
import { FilterChips } from "@/components/canteen/filter-chips"
import { FoodCard, FoodItemType } from "@/components/canteen/food-card"
import { BottomNav, NavTab } from "@/components/canteen/bottom-nav"
import { notify } from "@/components/canteen/apple-toast"

// UPI Apps
const upiApps = [
  {
    id: "phonepe",
    name: "PhonePe",
    icon: "/placeholder.svg?height=40&width=40",
    color: "#5f259f",
    package: "com.phonepe.app",
  },
  {
    id: "gpay",
    name: "Google Pay",
    icon: "/placeholder.svg?height=40&width=40",
    color: "#2DA94F",
    package: "com.google.android.apps.nbu.paisa.user",
  },
  {
    id: "paytm",
    name: "Paytm",
    icon: "/placeholder.svg?height=40&width=40",
    color: "#00BAF2",
    package: "net.one97.paytm",
  },
  {
    id: "amazonpay",
    name: "Amazon Pay",
    icon: "/placeholder.svg?height=40&width=40",
    color: "#FF9900",
    package: "in.amazon.mShop.android.shopping",
  },
  {
    id: "bhim",
    name: "BHIM UPI",
    icon: "/placeholder.svg?height=40&width=40",
    color: "#00579E",
    package: "in.org.npci.upiapp",
  },
]

// Food items with prices in INR - Updated Menu matching the exact design
const foodItems: FoodItemType[] = [
  // Top Featured Items (Matches the Screenshot Grid Exactly)
  {
    id: 1,
    name: "Idli (2) / Vada (1)",
    description: "Steamed rice cakes or fried lentil donuts - 3 pieces",
    price: 45,
    category: "breakfast",
    image: "/images/food_idli_vada_premium.jpg",
    rating: 4.7,
    reviewCount: 256,
    prepTime: "5 min",
    veg: true,
    popular: true,
    tags: ["Healthy", "No Maida", "South Indian"],
  },
  {
    id: 2,
    name: "Masala Dosa",
    description: "Crispy rice crepe with spiced potato filling",
    price: 50,
    category: "breakfast",
    image: "/images/food_masala_dosa_premium.jpg",
    rating: 4.8,
    reviewCount: 189,
    prepTime: "10 min",
    veg: true,
    popular: true,
    tags: ["Popular", "Spicy", "South Indian"],
  },
  {
    id: 3,
    name: "Almost Podi Dosa",
    description: "Crispy dosa with flavorful podi and ghee",
    price: 55,
    category: "breakfast",
    image: "/images/food_podi_dosa_premium.jpg",
    rating: 4.6,
    reviewCount: 132,
    prepTime: "10 min",
    veg: true,
    popular: true,
    tags: ["Chef Special", "Freshly Made", "Trending"],
  },
  {
    id: 4,
    name: "Medu Vada (2 pcs)",
    description: "Crispy lentil donuts served with chutney and sambar",
    price: 40,
    category: "snacks",
    image: "/images/food_medu_vada_premium.jpg",
    rating: 4.5,
    reviewCount: 98,
    prepTime: "8 min",
    veg: true,
    popular: true,
    tags: ["High Protein", "Healthy", "Popular"],
  },

  // Additional Campus Menu Items
  {
    id: 5,
    name: "Puri Bhaji/Kurma",
    description: "Deep fried bread with spiced vegetable curry - 3 pieces",
    price: 45,
    category: "snacks",
    image: "/images/food_poori_bhaji.jpg",
    rating: 4.6,
    reviewCount: 114,
    prepTime: "8 min",
    veg: true,
    popular: false,
    tags: ["South Indian", "Popular"],
  },
  {
    id: 6,
    name: "Plain Dosa",
    description: "Simple crispy rice and lentil crepe",
    price: 35,
    category: "breakfast",
    image: "/images/food_plain_dosa.jpg",
    rating: 4.5,
    reviewCount: 88,
    prepTime: "8 min",
    veg: true,
    popular: false,
    tags: ["Healthy", "South Indian"],
  },
  {
    id: 7,
    name: "Uttapam Special",
    description: "Thick savory rice pancake topped with onion and tomatoes",
    price: 45,
    category: "breakfast",
    image: "/images/food_uttapam.jpg",
    rating: 4.6,
    reviewCount: 75,
    prepTime: "10 min",
    veg: true,
    popular: false,
    tags: ["Freshly Made", "South Indian"],
  },
  {
    id: 8,
    name: "Gobi Manchurian",
    description: "Crispy batter fried cauliflower in tangy Indo-Chinese sauce",
    price: 60,
    category: "chinese",
    image: "/images/food_gobi_manchurian.jpg",
    rating: 4.6,
    reviewCount: 145,
    prepTime: "12 min",
    veg: true,
    popular: true,
    tags: ["Chinese", "Spicy", "Popular"],
  },
  {
    id: 9,
    name: "Veg Fried Rice",
    description: "Wok-tossed aromatic basmati rice with crunchy vegetables",
    price: 75,
    category: "chinese",
    image: "/images/food_veg_fried_rice.jpg",
    rating: 4.7,
    reviewCount: 160,
    prepTime: "15 min",
    veg: true,
    popular: true,
    tags: ["Chinese", "Rice", "Popular"],
  },
  {
    id: 10,
    name: "Special Meal (Thali)",
    description: "2 Poori/1 Chapathi, Curd, Rice, Sambar, Palya, Gassi",
    price: 70,
    category: "lunch",
    image: "/images/cat-lunch.png",
    rating: 4.8,
    reviewCount: 310,
    prepTime: "12 min",
    veg: true,
    popular: true,
    tags: ["Healthy", "Lunch", "Popular"],
  },
  {
    id: 11,
    name: "Lemon Rice with Pickle",
    description: "Tangy spiced tempered lemon rice with roasted peanuts",
    price: 45,
    category: "lunch",
    image: "/images/food_lemon_rice.jpg",
    rating: 4.4,
    reviewCount: 65,
    prepTime: "8 min",
    veg: true,
    popular: false,
    tags: ["Rice", "Lunch", "South Indian"],
  },
  {
    id: 12,
    name: "Samosa (2 pcs)",
    description: "Crisp flaky pastry filled with spiced potatoes and peas",
    price: 30,
    category: "snacks",
    image: "/images/cat-snacks.png",
    rating: 4.7,
    reviewCount: 220,
    prepTime: "5 min",
    veg: true,
    popular: true,
    tags: ["Snacks", "Popular"],
  },
  {
    id: 13,
    name: "Filter Coffee / Masala Chai",
    description: "Authentic South Indian aromatic filter coffee or hot tea",
    price: 20,
    category: "beverages",
    image: "/images/cat-beverages.png",
    rating: 4.8,
    reviewCount: 420,
    prepTime: "3 min",
    veg: true,
    popular: true,
    tags: ["Beverages", "Popular"],
  },
  {
    id: 14,
    name: "Chicken Biryani",
    description: "Fragrant rice layered with tender marinated chicken and spices",
    price: 90,
    category: "lunch",
    image: "/images/food_chicken_biryani.jpg",
    rating: 4.9,
    reviewCount: 380,
    prepTime: "20 min",
    veg: false,
    popular: true,
    tags: ["Rice", "Lunch", "Popular"],
  },
]

// Order history type
type OrderHistoryItem = {
  id: string
  date: string
  items: Array<{
    id: number
    name: string
    price: number
    quantity: number
    veg?: boolean
  }>
  totalAmount: number
}

export default function SahyadriDigitalCanteen() {
  const [cart, setCart] = useState<{ id: number; name: string; price: number; quantity: number; veg?: boolean; image?: string }[]>([
    // Initialize with 3 items in cart to match the cart badge "3" in the screenshot
    { id: 1, name: "Idli (2) / Vada (1)", price: 45, quantity: 1, veg: true },
    { id: 2, name: "Masala Dosa", price: 50, quantity: 1, veg: true },
    { id: 4, name: "Medu Vada (2 pcs)", price: 40, quantity: 1, veg: true },
  ])
  const [isQROpen, setIsQROpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState("popular")
  const [activeChip, setActiveChip] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState<NavTab>("home")
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isPaymentSuccess, setIsPaymentSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [orderHistory, setOrderHistory] = useState<OrderHistoryItem[]>([])
  const [isHistoryOpen, setIsHistoryOpen] = useState(false)
  const [isAccountOpen, setIsAccountOpen] = useState(false)
  const [favorites, setFavorites] = useState<number[]>([1, 2])

  // Load order history, favorites, and cart from local storage
  useEffect(() => {
    const storedHistory = localStorage.getItem("orderHistory")
    const storedFavorites = localStorage.getItem("favorites")
    const storedCart = localStorage.getItem("sahyadri_cart_items")

    if (storedHistory) {
      try {
        setOrderHistory(JSON.parse(storedHistory))
      } catch (error) {
        console.error("Failed to parse order history:", error)
      }
    }

    if (storedFavorites) {
      try {
        setFavorites(JSON.parse(storedFavorites))
      } catch (error) {
        console.error("Failed to parse favorites:", error)
      }
    }

    if (storedCart) {
      try {
        const parsed = JSON.parse(storedCart)
        if (Array.isArray(parsed)) {
          setCart(parsed)
        }
      } catch (error) {
        console.error("Failed to parse cart items:", error)
      }
    }
  }, [])

  // Sync cart to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem("sahyadri_cart_items", JSON.stringify(cart))
    } catch (e) {
      console.error("Failed to save cart to localStorage:", e)
    }
  }, [cart])

  // Calculate total items
  const totalItems = useMemo(() => cart.reduce((total, item) => total + item.quantity, 0), [cart])

  // Calculate total price
  const totalPrice = useMemo(() => cart.reduce((total, item) => total + item.price * item.quantity, 0), [cart])

  // Get item quantity in cart
  const getItemQuantity = (itemId: number) => {
    const cartItem = cart.find((item) => item.id === itemId)
    return cartItem ? cartItem.quantity : 0
  }

  // Add item to cart (with Apple HIG Dynamic Island capsule feedback)
  const addToCart = (item: FoodItemType) => {
    const existingItem = cart.find((cartItem) => cartItem.id === item.id)
    const newTotal = totalItems + 1

    if (existingItem) {
      setCart(
        cart.map((cartItem) => (cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem)),
      )
    } else {
      setCart([...cart, { ...item, quantity: 1 }])
    }

    notify.cartAdd(item.name, newTotal)
  }

  // Remove item from cart
  const removeFromCart = (id: number) => {
    const existingItem = cart.find((cartItem) => cartItem.id === id)
    if (!existingItem) return
    const remainingCount = Math.max(0, totalItems - 1)

    if (existingItem.quantity === 1) {
      setCart(cart.filter((cartItem) => cartItem.id !== id))
    } else {
      setCart(
        cart.map((cartItem) => (cartItem.id === id ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem)),
      )
    }

    notify.cartRemove(existingItem.name, remainingCount)
  }

  // Delete item from cart completely
  const deleteFromCart = (id: number) => {
    const existingItem = cart.find((cartItem) => cartItem.id === id)
    setCart(cart.filter((cartItem) => cartItem.id !== id))
    if (existingItem) {
      notify.cartRemove(existingItem.name, Math.max(0, totalItems - existingItem.quantity))
    }
  }

  // Clear entire cart
  const clearCart = () => {
    setCart([])
    try {
      localStorage.setItem("sahyadri_cart_items", JSON.stringify([]))
    } catch (e) {
      console.error(e)
    }
    notify.cartClear()
  }

  // Toggle favorite
  const toggleFavorite = (itemId: number) => {
    const isFav = favorites.includes(itemId)
    const newFavorites = isFav ? favorites.filter((id) => id !== itemId) : [...favorites, itemId]
    const item = foodItems.find((f) => f.id === itemId)

    setFavorites(newFavorites)
    localStorage.setItem("favorites", JSON.stringify(newFavorites))

    notify.favorite(item ? item.name : "Dish", !isFav)
  }

  // Filter items based on Category, Chip, Search, and Favorites tab
  const filteredItems = useMemo(() => {
    return foodItems.filter((item) => {
      // Favorites tab filter
      if (activeTab === "favorites" && !favorites.includes(item.id)) {
        return false
      }

      // Search query filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim()
        const matchesName = item.name.toLowerCase().includes(query)
        const matchesDesc = item.description.toLowerCase().includes(query)
        const matchesCategory = item.category.toLowerCase().includes(query)
        const matchesTags = item.tags?.some((tag) => tag.toLowerCase().includes(query))
        if (!matchesName && !matchesDesc && !matchesCategory && !matchesTags) {
          return false
        }
      }

      // Filter chips
      if (activeChip !== "All") {
        const chip = activeChip.toLowerCase()
        const name = item.name.toLowerCase()
        const desc = item.description.toLowerCase()
        const cat = item.category.toLowerCase()

        if (chip === "idli" && !name.includes("idli") && !desc.includes("idli")) return false
        if (chip === "dosa" && !name.includes("dosa") && !desc.includes("dosa")) return false
        if (chip === "vada" && !name.includes("vada") && !desc.includes("vada")) return false
        if (chip === "uttapam" && !name.includes("uttapam") && !desc.includes("uttapam")) return false
        if (chip === "rice" && !name.includes("rice") && !desc.includes("rice") && !name.includes("biryani")) return false
        if (chip === "snacks" && cat !== "snacks") return false
        if (chip === "beverages" && cat !== "beverages") return false
      }

      // Category filter (when chip is "All" or relaxed)
      if (activeChip === "All" && !searchQuery.trim()) {
        if (activeCategory === "popular") {
          return item.popular || [1, 2, 3, 4].includes(item.id)
        }
        if (activeCategory === "south-indian") {
          return item.tags?.includes("South Indian") || ["breakfast", "snacks"].includes(item.category)
        }
        if (activeCategory === "chinese") {
          return item.category === "chinese"
        }
        return item.category === activeCategory
      }

      return true
    })
  }, [activeCategory, activeChip, searchQuery, activeTab, favorites])

  // Payment string
  const paymentString = `upi://pay?pa=gagankunder332@oksbi&pn=${encodeURIComponent("Sahyadri Digital Canteen")}&am=${totalPrice.toFixed(2)}&cu=INR&tn=${encodeURIComponent("Food Order Payment")}&tr=SDC${Date.now()}`

  // Save order to history
  const saveOrderToHistory = () => {
    if (cart.length === 0) return

    const newOrder: OrderHistoryItem = {
      id: Date.now().toString(),
      date: new Date().toLocaleString(),
      items: cart.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        veg: item.veg,
      })),
      totalAmount: totalPrice,
    }

    const updatedHistory = [newOrder, ...orderHistory]
    setOrderHistory(updatedHistory)
    localStorage.setItem("orderHistory", JSON.stringify(updatedHistory))
    return newOrder
  }

  // Handle direct payment with UPI apps
  const handleDirectPayment = (app: typeof upiApps[0]) => {
    const amount = totalPrice.toFixed(2)
    const transactionId = `SDC${Date.now()}`
    const upiId = "gagankunder332@oksbi"
    const payeeName = "Sahyadri Digital Canteen"
    const note = "Food Order Payment"

    let paymentUrl = ""
    switch (app.id) {
      case "phonepe":
        paymentUrl = `phonepe://pay?pa=${upiId}&pn=${encodeURIComponent(payeeName)}&am=${amount}&tr=${transactionId}&tn=${encodeURIComponent(note)}`
        break
      case "gpay":
        paymentUrl = `tez://upi/pay?pa=${upiId}&pn=${encodeURIComponent(payeeName)}&am=${amount}&tr=${transactionId}&tn=${encodeURIComponent(note)}`
        break
      case "paytm":
        paymentUrl = `paytmmp://pay?pa=${upiId}&pn=${encodeURIComponent(payeeName)}&am=${amount}&tr=${transactionId}&tn=${encodeURIComponent(note)}`
        break
      case "amazonpay":
        paymentUrl = `amazonpay://pay?pa=${upiId}&pn=${encodeURIComponent(payeeName)}&am=${amount}&tr=${transactionId}&tn=${encodeURIComponent(note)}`
        break
      default:
        paymentUrl = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(payeeName)}&am=${amount}&tr=${transactionId}&tn=${encodeURIComponent(note)}`
    }

    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      window.location.href = paymentUrl
    } else {
      notify.info(`Open ${app.name}`, "Scan the QR code to complete payment")
    }
  }

  // Simulate successful payment
  const simulatePaymentSuccess = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      setIsPaymentSuccess(true)
      setIsQROpen(false)

      saveOrderToHistory()

      notify.info("Payment Successful!", `₹${totalPrice.toFixed(2)} sent to Sahyadri Canteen`)

      setTimeout(() => {
        setCart([])
        setIsPaymentSuccess(false)
      }, 3000)
    }, 1200)
  }

  // Generate WhatsApp order URL for +91 84950 54721 with complete item list
  const getWhatsAppUrl = () => {
    if (cart.length === 0) return "#"

    const phone = "918495054721"
    const orderTime = new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })
    const orderDate = new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })

    let text = `🍽️ *SAHYADRI DIGITAL CANTEEN - NEW ORDER*\n`
    text += `━━━━━━━━━━━━━━━━━━━━━\n`
    text += `📅 *Date & Time:* ${orderDate} at ${orderTime}\n`
    text += `📍 *Pickup Location:* Campus Food Court Counter\n\n`
    text += `📋 *ORDERED DISHES:*\n`

    cart.forEach((item, index) => {
      const itemTotal = (item.price * item.quantity).toFixed(2)
      text += `${index + 1}. *${item.name}* × ${item.quantity}\n`
      text += `   ↳ ₹${item.price.toFixed(2)} each = ₹${itemTotal}\n`
    })

    text += `\n━━━━━━━━━━━━━━━━━━━━━\n`
    text += `📦 *Total Items:* ${totalItems}\n`
    text += `💰 *Total Amount:* ₹${totalPrice.toFixed(2)}\n`
    text += `━━━━━━━━━━━━━━━━━━━━━\n\n`
    text += `✅ Please confirm my order and start preparation for campus pickup. Thank you!`

    return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`
  }

  // Send order to WhatsApp (+91 84950 54721) with foolproof link click
  const sendOrderToWhatsApp = (e?: React.MouseEvent) => {
    if (cart.length === 0) {
      if (e) e.preventDefault()
      notify.info("Cart is empty", "Add dishes before ordering on WhatsApp")
      return
    }

    // Save order to history locally as well
    saveOrderToHistory()

    notify.whatsapp()

    const whatsappUrl = getWhatsAppUrl()

    // Programmatic anchor click fallback to avoid popup blockers
    const link = document.createElement("a")
    link.href = whatsappUrl
    link.target = "_blank"
    link.rel = "noopener noreferrer"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div className="min-h-screen bg-[#F4F6F5] flex justify-center selection:bg-emerald-100 selection:text-emerald-900">
      {/* Mobile App Canvas Container (Level 0 Background) */}
      <div className="w-full max-w-md min-h-screen bg-[var(--bg-page)] shadow-2xl relative flex flex-col pb-32 overflow-x-hidden">
        
        {/* 1. Status Bar */}
        <StatusBar />

        {/* 2. Header */}
        <Header
          cartCount={totalItems}
          onCartClick={() => setIsCartOpen(true)}
          onOrdersClick={() => setIsHistoryOpen(true)}
        />

        {/* 3. Hero Banner */}
        <HeroBanner
          onExploreClick={() => {
            document.getElementById("todays-menu-section")?.scrollIntoView({ behavior: "smooth" })
          }}
        />

        {/* 4. Feature Highlights Row */}
        <FeatureCards />

        {/* 5. Search Area */}
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          onFilterClick={() => {
            setActiveChip("All")
            setActiveCategory("popular")
          }}
        />

        {/* 6. Category Scroller */}
        <CategoryScroller
          activeCategory={activeCategory}
          onSelectCategory={(catId) => {
            setActiveCategory(catId)
            setActiveChip("All")
            setActiveTab("home")
          }}
        />

        {/* 7. Today's Menu Section Header & Filter Chips */}
        <div id="todays-menu-section">
          <FilterChips
            activeChip={activeChip}
            onSelectChip={(chip) => {
              setActiveChip(chip)
              setActiveTab("home")
            }}
            onSeeAllClick={() => {
              setActiveChip("All")
              setActiveCategory("popular")
            }}
          />
        </div>

        {/* Active Filter Indicator if Favorites or Search */}
        {activeTab === "favorites" && (
          <div className="px-4 mb-2 flex items-center justify-between">
            <span className="text-xs font-semibold text-rose-600 flex items-center gap-1">
              <Heart className="w-3.5 h-3.5 fill-rose-600" />
              Showing {filteredItems.length} Favorite Dishes
            </span>
            <button
              type="button"
              onClick={() => setActiveTab("home")}
              className="text-[11px] font-semibold text-gray-500 hover:text-gray-800"
            >
              Clear
            </button>
          </div>
        )}

        {/* 8. Product Cards Grid (Two-Column) */}
        <div className="px-4 flex-1">
          {filteredItems.length > 0 ? (
            <div className="grid grid-cols-2 gap-3">
              {filteredItems.map((item) => (
                <FoodCard
                  key={item.id}
                  item={item}
                  quantity={getItemQuantity(item.id)}
                  isFavorite={favorites.includes(item.id)}
                  onAddToCart={() => addToCart(item)}
                  onRemoveFromCart={() => removeFromCart(item.id)}
                  onToggleFavorite={() => toggleFavorite(item.id)}
                />
              ))}
            </div>
          ) : (
            <div className="py-12 flex flex-col items-center justify-center text-center px-4">
              <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center mb-3">
                <Star className="w-6 h-6 text-gray-400" />
              </div>
              <h4 className="text-sm font-bold text-gray-800">No dishes found</h4>
              <p className="text-xs text-gray-500 mt-1 max-w-xs">
                Try searching for something else or reset your filter chips.
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSearchQuery("")
                  setActiveChip("All")
                  setActiveCategory("popular")
                  setActiveTab("home")
                }}
                className="mt-4 rounded-full text-xs font-semibold"
              >
                Reset Filters
              </Button>
            </div>
          )}
        </div>

        {/* 9. Sticky Floating Cart & WhatsApp Bar (Visible when totalItems > 0) */}
        <AnimatePresence>
          {totalItems > 0 && (
            <motion.div
              initial={{ y: 70, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 70, opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 350, damping: 28 }}
              className="fixed bottom-[78px] left-0 right-0 max-w-md mx-auto z-40 px-3 pointer-events-none"
            >
              <div className="pointer-events-auto bg-[var(--surface)] text-[var(--text-primary)] rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.12)] border border-[var(--border-subtle)] p-2.5 flex items-center justify-between gap-2 backdrop-blur-md">
                {/* Left: Cart Info & View Cart Trigger */}
                <button
                  type="button"
                  onClick={() => setIsCartOpen(true)}
                  className="flex items-center gap-2.5 text-left flex-1 min-w-0 hover:opacity-90 active:scale-[0.98] transition-all cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#EAF5ED] text-[var(--brand)] border border-[var(--brand)]/20 flex items-center justify-center relative flex-shrink-0 shadow-2xs">
                    <ShoppingCart className="w-5 h-5 text-[var(--brand)] stroke-[2]" />
                    <span className="absolute -top-1.5 -right-1.5 bg-[#FF3B30] text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center ring-2 ring-white shadow-xs">
                      {totalItems}
                    </span>
                  </div>
                  <div className="flex flex-col min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="font-extrabold text-[15px] text-[var(--text-primary)] leading-tight">
                        ₹{totalPrice.toFixed(2)}
                      </span>
                      <span className="text-[10px] bg-[#EAF5ED] text-[var(--brand)] border border-[var(--brand)]/20 px-2 py-0.5 rounded-full font-bold">
                        {totalItems} {totalItems === 1 ? "item" : "items"}
                      </span>
                    </div>
                    <span className="text-[10.5px] text-[var(--text-secondary)] font-medium truncate mt-0.5">
                      Tap to view order
                    </span>
                  </div>
                </button>

                {/* Right: Direct WhatsApp Order Action with Sahyadri Brand Theme */}
                <a
                  href={getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => {
                    if (cart.length === 0) {
                      e.preventDefault()
                      return
                    }
                    saveOrderToHistory()
                    notify.whatsapp()
                  }}
                  className="bg-[var(--brand)] hover:bg-[var(--brand-hover)] text-white font-bold text-xs py-2.5 px-3.5 rounded-xl flex items-center gap-1.5 shadow-sm active:scale-95 transition-all flex-shrink-0 cursor-pointer no-underline"
                >
                  <svg className="w-4 h-4 fill-current flex-shrink-0" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                  <span>WhatsApp Order</span>
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 10. Bottom Navigation Bar */}
        <BottomNav
          activeTab={activeTab}
          onSelectTab={(tab) => {
            setActiveTab(tab)
            if (tab === "home") {
              setActiveChip("All")
              setSearchQuery("")
            }
          }}
          onScanPayClick={() => setIsQROpen(true)}
          onOrdersClick={() => setIsHistoryOpen(true)}
          onFavoritesClick={() => {
            setActiveTab("favorites")
            notify.info("Saved Favorites", `Showing ${favorites.length} saved dishes`)
          }}
          onAccountClick={() => setIsAccountOpen(true)}
        />

        {/* Cart Sheet Drawer */}
        <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
          <SheetContent className="w-full sm:max-w-md flex flex-col bg-white p-6">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#EAF5ED] text-[#0B3B24] flex items-center justify-center">
                  <ShoppingCart className="w-4 h-4 stroke-[2.2]" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-gray-900">Your Cart</h3>
                  <span className="text-xs text-gray-500">{totalItems} items selected</span>
                </div>
              </div>
              <div className="flex items-center gap-2 mr-6">
                {cart.length > 0 && (
                  <button
                    type="button"
                    onClick={clearCart}
                    className="text-xs text-rose-600 hover:text-rose-700 hover:bg-rose-50 px-2.5 py-1 rounded-full font-semibold transition-colors cursor-pointer"
                  >
                    Clear all
                  </button>
                )}
              </div>
            </div>

            {cart.length > 0 ? (
              <>
                <ScrollArea className="flex-1 my-4 pr-3">
                  <div className="space-y-3">
                    {cart.map((item) => (
                      <div
                        key={item.id}
                        className="p-3 bg-gray-50/80 rounded-2xl flex items-center justify-between border border-gray-100"
                      >
                        <div className="flex-1 pr-3">
                          <h4 className="text-xs font-bold text-gray-900 leading-snug">{item.name}</h4>
                          <span className="text-xs font-semibold text-[#0B3B24]">₹{item.price.toFixed(2)}</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <div className="flex items-center bg-white border border-gray-200 rounded-full px-1 py-0.5 shadow-sm">
                            <button
                              type="button"
                              onClick={() => removeFromCart(item.id)}
                              className="w-5 h-5 rounded-full flex items-center justify-center text-gray-600 hover:text-gray-900 active:scale-90"
                            >
                              <Minus className="w-3 h-3 stroke-[2.2]" />
                            </button>
                            <span className="w-5 text-center text-xs font-bold text-gray-900">{item.quantity}</span>
                            <button
                              type="button"
                              onClick={() => addToCart(item as unknown as FoodItemType)}
                              className="w-5 h-5 rounded-full flex items-center justify-center text-gray-600 hover:text-gray-900 active:scale-90"
                            >
                              <Plus className="w-3 h-3 stroke-[2.2]" />
                            </button>
                          </div>

                          <button
                            type="button"
                            onClick={() => deleteFromCart(item.id)}
                            className="p-1 rounded-full text-gray-400 hover:text-rose-500 transition-colors"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>

                <div className="pt-3 border-t border-gray-100">
                  <div className="flex justify-between py-1 text-xs text-gray-600">
                    <span>Subtotal</span>
                    <span className="font-semibold text-gray-900">₹{totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between py-1 text-xs text-gray-600">
                    <span>Campus Canteen Fee</span>
                    <span className="font-semibold text-emerald-700">FREE</span>
                  </div>
                  <div className="flex justify-between py-2 font-bold text-base border-t border-gray-100 mt-2">
                    <span>Total Amount</span>
                    <span className="text-[#0B3B24]">₹{totalPrice.toFixed(2)}</span>
                  </div>

                  {/* Primary WhatsApp Order Button (+91 84950 54721) */}
                  <a
                    href={getWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => {
                      if (cart.length === 0) {
                        e.preventDefault()
                        notify.info("Cart is empty", "Add dishes before ordering on WhatsApp")
                        return
                      }
                      saveOrderToHistory()
                      notify.whatsapp()
                    }}
                    className="w-full mt-3 bg-[#0B3B24] hover:bg-[#072D1B] text-white py-3.5 px-4 rounded-full font-bold text-xs sm:text-sm shadow-md transition-all active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer no-underline text-center"
                  >
                    <svg className="w-5 h-5 fill-current flex-shrink-0" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                    </svg>
                    <span>Order on WhatsApp (+91 84950 54721)</span>
                  </a>

                  {/* Secondary UPI / QR Payment Button */}
                  <Button
                    variant="outline"
                    className="w-full mt-2 border-[#0B3B24] text-[#0B3B24] hover:bg-[#EAF5ED] py-2.5 rounded-full font-semibold text-xs transition-all active:scale-[0.98] cursor-pointer"
                    onClick={() => {
                      setIsCartOpen(false)
                      setIsQROpen(true)
                    }}
                  >
                    <span>Pay with UPI / QR Code (₹{totalPrice.toFixed(2)})</span>
                  </Button>
                </div>
              </>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-center p-6">
                <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-800 flex items-center justify-center mb-3">
                  <ShoppingCart className="w-8 h-8 stroke-[1.8]" />
                </div>
                <h4 className="text-base font-bold text-gray-900">Your cart is empty</h4>
                <p className="text-xs text-gray-500 mt-1 max-w-xs mb-4">
                  Add some hot and freshly prepared meals to place your campus order.
                </p>
                <Button
                  onClick={() => setIsCartOpen(false)}
                  className="bg-[#0B3B24] hover:bg-[#072D1B] text-white rounded-full text-xs font-semibold px-5"
                >
                  Browse Menu
                </Button>
              </div>
            )}
          </SheetContent>
        </Sheet>

        {/* Scan & Pay / UPI Payment Dialog */}
        <Dialog open={isQROpen} onOpenChange={setIsQROpen}>
          <DialogContent className="sm:max-w-md bg-white border border-gray-100 p-6 rounded-3xl">
            {isPaymentSuccess ? (
              <div className="flex flex-col items-center justify-center py-6 text-center">
                <div className="w-16 h-16 bg-[#EBF7EE] text-[#1B743F] rounded-full flex items-center justify-center mb-3">
                  <Check className="w-8 h-8 stroke-[2.5]" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Payment Successful!</h3>
                <p className="text-xs text-gray-500 mt-1">Your food order has been sent to the canteen counter.</p>
                <Button
                  onClick={() => setIsQROpen(false)}
                  className="mt-6 bg-[#0B3B24] text-white rounded-full text-xs font-semibold px-6"
                >
                  Done
                </Button>
              </div>
            ) : (
              <>
                <DialogHeader>
                  <DialogTitle className="text-base font-bold text-gray-900 flex items-center gap-2">
                    <QrCode className="w-5 h-5 text-[#0B3B24]" />
                    UPI Scan & Pay
                  </DialogTitle>
                  <DialogDescription className="text-xs text-gray-500">
                    Pay ₹{totalPrice > 0 ? totalPrice.toFixed(2) : "45.00"} directly to Sahyadri Digital Canteen
                  </DialogDescription>
                </DialogHeader>

                {/* QR Code Card */}
                <div className="flex flex-col items-center justify-center p-5 bg-[#F9FAF9] rounded-2xl border border-gray-100 my-2">
                  <div className="bg-white p-3 rounded-xl shadow-sm border border-gray-100">
                    <QRCode
                      value={paymentString}
                      size={150}
                      level="H"
                    />
                  </div>
                  <div className="mt-3 text-center">
                    <span className="font-bold text-base text-gray-900">
                      ₹{totalPrice > 0 ? totalPrice.toFixed(2) : "45.00"}
                    </span>
                    <p className="text-[10px] text-gray-500 font-mono mt-0.5">UPI ID: gagankunder332@oksbi</p>
                    <p className="text-[9.5px] text-[#0B3B24] font-medium mt-1">
                      Scan using any UPI App (GPay, PhonePe, Paytm)
                    </p>
                  </div>
                </div>

                {/* Direct UPI Apps */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-gray-800">Or Pay with UPI App:</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {upiApps.slice(0, 4).map((app) => (
                      <button
                        key={app.id}
                        type="button"
                        onClick={() => handleDirectPayment(app)}
                        className="flex items-center gap-2 p-2 bg-gray-50 hover:bg-gray-100/80 rounded-xl border border-gray-100 text-left transition-colors"
                      >
                        <div
                          className="w-6 h-6 rounded-full flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0"
                          style={{ backgroundColor: app.color }}
                        >
                          {app.name.charAt(0)}
                        </div>
                        <span className="text-xs font-semibold text-gray-800 truncate">{app.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Send Order to WhatsApp Option (+91 84950 54721) */}
                <div className="pt-2 border-t border-gray-100">
                  <a
                    href={getWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => {
                      if (cart.length === 0) {
                        e.preventDefault()
                        notify.info("Cart is empty", "Add dishes before ordering on WhatsApp")
                        return
                      }
                      saveOrderToHistory()
                      notify.whatsapp()
                    }}
                    className="w-full bg-[#0B3B24] hover:bg-[#072D1B] text-white text-xs font-bold rounded-full py-2.5 flex items-center justify-center gap-2 shadow-xs cursor-pointer active:scale-[0.98] no-underline"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                    </svg>
                    <span>Send Order to WhatsApp (+91 84950 54721)</span>
                  </a>
                </div>

                {/* Demo Action */}
                <div className="pt-2 border-t border-gray-100">
                  <Button
                    variant="outline"
                    onClick={simulatePaymentSuccess}
                    className="w-full text-xs font-semibold text-[#0B3B24] border-emerald-200 hover:bg-emerald-50 rounded-full"
                  >
                    Simulate Successful Payment
                  </Button>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>

        {/* Order History Dialog */}
        <Dialog open={isHistoryOpen} onOpenChange={setIsHistoryOpen}>
          <DialogContent className="sm:max-w-md bg-white border border-gray-100 p-6 rounded-3xl">
            <DialogHeader>
              <DialogTitle className="text-base font-bold text-gray-900 flex items-center gap-2">
                <History className="w-5 h-5 text-[#0B3B24]" />
                Campus Order History
              </DialogTitle>
              <DialogDescription className="text-xs text-gray-500">
                Track and review your past orders
              </DialogDescription>
            </DialogHeader>

            <div className="py-2">
              {orderHistory.length > 0 ? (
                <ScrollArea className="h-[55vh] pr-3">
                  <div className="space-y-3">
                    {orderHistory.map((order) => (
                      <div
                        key={order.id}
                        className="p-3.5 bg-gray-50 rounded-2xl border border-gray-100 flex flex-col gap-2"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-medium text-gray-500 flex items-center gap-1">
                            <Calendar className="w-3 h-3 text-[#0B3B24]" />
                            {formatDate(order.date)}
                          </span>
                          <span className="font-bold text-xs text-[#0B3B24]">
                            ₹{order.totalAmount.toFixed(2)}
                          </span>
                        </div>
                        <div className="space-y-1 pt-1 border-t border-gray-200/50">
                          {order.items.map((item, idx) => (
                            <div key={idx} className="flex justify-between text-xs text-gray-700">
                              <span>
                                {item.name} × {item.quantity}
                              </span>
                              <span className="font-medium">₹{(item.price * item.quantity).toFixed(2)}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              ) : (
                <div className="py-10 text-center flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-2">
                    <History className="w-6 h-6 text-gray-400" />
                  </div>
                  <h4 className="text-sm font-bold text-gray-800">No past orders yet</h4>
                  <p className="text-xs text-gray-500 mt-0.5">Orders you place will be saved here automatically.</p>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>

        {/* Account Profile Dialog */}
        <Dialog open={isAccountOpen} onOpenChange={setIsAccountOpen}>
          <DialogContent className="sm:max-w-md bg-white border border-gray-100 p-6 rounded-3xl">
            <DialogHeader>
              <DialogTitle className="text-base font-bold text-gray-900 flex items-center gap-2">
                <User className="w-5 h-5 text-[#0B3B24]" />
                Student Account
              </DialogTitle>
              <DialogDescription className="text-xs text-gray-500">
                Sahyadri College of Engineering & Management
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-2">
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-2xl border border-gray-100">
                <div className="w-12 h-12 rounded-full bg-[#0B3B24] text-white flex items-center justify-center font-bold text-lg">
                  SC
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900">Sahyadri Student</h4>
                  <span className="text-xs text-gray-500">ID: 4SF22CS108 • CSE Dept</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-center">
                <div className="p-3 bg-[#EAF5ED] rounded-xl">
                  <span className="text-lg font-bold text-[#0B3B24]">{favorites.length}</span>
                  <p className="text-[10px] font-semibold text-gray-600">Saved Favorites</p>
                </div>
                <div className="p-3 bg-[#EAF5ED] rounded-xl">
                  <span className="text-lg font-bold text-[#0B3B24]">{orderHistory.length}</span>
                  <p className="text-[10px] font-semibold text-gray-600">Past Orders</p>
                </div>
              </div>

              <div className="space-y-1 text-xs">
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-500">Campus Block</span>
                  <span className="font-semibold text-gray-800">Main Food Court</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-500">UPI Link</span>
                  <span className="font-semibold text-emerald-700">Verified</span>
                </div>
              </div>

              <Button
                onClick={() => setIsAccountOpen(false)}
                className="w-full bg-[#0B3B24] text-white rounded-full text-xs font-semibold py-2.5"
              >
                Close
              </Button>
            </div>
          </DialogContent>
        </Dialog>

      </div>
    </div>
  )
}
