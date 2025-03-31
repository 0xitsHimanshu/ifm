"use client"

import { useState } from "react"
import {
  Search,
  Grid3X3,
  List,
  Zap,
  ShoppingCart,
  Package,
  Key,
  Shield,
  Gift,
  Clock,
  Sparkles,
  ChevronDown,
  ChevronUp,
  X,
  Check,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/components/ui/use-toast"

// Shop items data
const shopItems = [
  // Energy Packs
  {
    id: 1,
    name: "Energy Pack",
    description: "1 Energy Pack for campaign participation",
    price: { gloCoins: 100, realMoney: 0.99 },
    category: "energy",
    image: "/placeholder.svg?height=100&width=100",
    popular: false,
    bestValue: false,
    limited: false,
    quantity: 1,
  },
  {
    id: 2,
    name: "Energy Bundle",
    description: "5 Energy Packs for campaign participation",
    price: { gloCoins: 450, realMoney: 4.49 },
    category: "energy",
    image: "/placeholder.svg?height=100&width=100",
    popular: true,
    bestValue: false,
    limited: false,
    quantity: 5,
  },
  {
    id: 3,
    name: "Energy Mega Pack",
    description: "10 Energy Packs with 10% bonus",
    price: { gloCoins: 900, realMoney: 8.99 },
    category: "energy",
    image: "/placeholder.svg?height=100&width=100",
    popular: false,
    bestValue: true,
    limited: false,
    quantity: 11, // 10 + 1 bonus
  },

  // Blo-Coins
  {
    id: 4,
    name: "Blo-Coins Starter",
    description: "500 Blo-Coins for exclusive campaigns",
    price: { gloCoins: 1000, realMoney: 9.99 },
    category: "blocoins",
    image: "/placeholder.svg?height=100&width=100",
    popular: false,
    bestValue: false,
    limited: false,
    quantity: 500,
  },
  {
    id: 5,
    name: "Blo-Coins Plus",
    description: "1200 Blo-Coins for exclusive campaigns",
    price: { gloCoins: 2200, realMoney: 19.99 },
    category: "blocoins",
    image: "/placeholder.svg?height=100&width=100",
    popular: true,
    bestValue: false,
    limited: false,
    quantity: 1200,
  },
  {
    id: 6,
    name: "Blo-Coins Premium",
    description: "2500 Blo-Coins with 15% bonus",
    price: { gloCoins: 4250, realMoney: 39.99 },
    category: "blocoins",
    image: "/placeholder.svg?height=100&width=100",
    popular: false,
    bestValue: true,
    limited: false,
    quantity: 2875, // 2500 + 375 bonus
  },

  // Keys
  {
    id: 7,
    name: "Gate Key",
    description: "Unlocks Level 2 campaigns",
    price: { gloCoins: 2000, realMoney: 19.99 },
    category: "keys",
    image: "/placeholder.svg?height=100&width=100",
    popular: true,
    bestValue: false,
    limited: false,
    quantity: 1,
  },
  {
    id: 8,
    name: "Pro Key",
    description: "Unlocks Level 3+ campaigns",
    price: { gloCoins: 5000, realMoney: 49.99 },
    category: "keys",
    image: "/placeholder.svg?height=100&width=100",
    popular: false,
    bestValue: true,
    limited: false,
    quantity: 1,
  },

  // Geekeys
  {
    id: 9,
    name: "Strava Cult Membership",
    description: "Join the Strava Cult for exclusive Nike campaigns",
    price: { gloCoins: 3000, realMoney: 29.99 },
    category: "geekeys",
    image: "/placeholder.svg?height=100&width=100",
    popular: false,
    bestValue: false,
    limited: true,
    quantity: 1,
    expiresIn: "30 days",
  },
  {
    id: 10,
    name: "FPS Masters Clan Access",
    description: "Join the FPS Masters Clan for gaming campaigns",
    price: { gloCoins: 3500, realMoney: 34.99 },
    category: "geekeys",
    image: "/placeholder.svg?height=100&width=100",
    popular: true,
    bestValue: false,
    limited: true,
    quantity: 1,
    expiresIn: "30 days",
  },

  // Boosters
  {
    id: 11,
    name: "XP Booster",
    description: "2x XP for 7 days",
    price: { gloCoins: 1500, realMoney: 14.99 },
    category: "boosters",
    image: "/placeholder.svg?height=100&width=100",
    popular: true,
    bestValue: false,
    limited: true,
    quantity: 1,
    expiresIn: "7 days",
  },
  {
    id: 12,
    name: "Earnings Booster",
    description: "1.5x Glo-Coins earnings for 7 days",
    price: { gloCoins: 2000, realMoney: 19.99 },
    category: "boosters",
    image: "/placeholder.svg?height=100&width=100",
    popular: false,
    bestValue: true,
    limited: true,
    quantity: 1,
    expiresIn: "7 days",
  },

  // Special Bundles
  {
    id: 13,
    name: "Starter Bundle",
    description: "5 Energy Packs, 500 Blo-Coins, and XP Booster",
    price: { gloCoins: 3000, realMoney: 29.99 },
    category: "bundles",
    image: "/placeholder.svg?height=100&width=100",
    popular: true,
    bestValue: true,
    limited: true,
    quantity: 1,
    includes: [
      { name: "Energy Packs", quantity: 5 },
      { name: "Blo-Coins", quantity: 500 },
      { name: "XP Booster (3 days)", quantity: 1 },
    ],
    expiresIn: "Limited time offer",
  },
  {
    id: 14,
    name: "Pro Streamer Bundle",
    description: "Pro Key, 2000 Blo-Coins, and Earnings Booster",
    price: { gloCoins: 8000, realMoney: 79.99 },
    category: "bundles",
    image: "/placeholder.svg?height=100&width=100",
    popular: false,
    bestValue: true,
    limited: true,
    quantity: 1,
    includes: [
      { name: "Pro Key", quantity: 1 },
      { name: "Blo-Coins", quantity: 2000 },
      { name: "Earnings Booster (7 days)", quantity: 1 },
    ],
    expiresIn: "Limited time offer",
  },
]

// User wallet data
const userWallet = {
  gloCoins: 1125,
  bloCoins: 425,
  energyPacks: 4,
}

export function ShopMarketplace() {
  const { toast } = useToast()
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState<string>("all")
  const [sortOrder, setSortOrder] = useState<string>("popular")
  const [selectedItem, setSelectedItem] = useState<any>(null)
  const [cart, setCart] = useState<any[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState<"gloCoins" | "realMoney">("gloCoins")
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  // Filter items based on search and filters
  const filteredItems = shopItems.filter((item) => {
    // Search filter
    if (
      searchQuery &&
      !item.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !item.description.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false
    }

    // Category filter
    if (categoryFilter !== "all" && item.category !== categoryFilter) {
      return false
    }

    return true
  })

  // Sort items
  const sortedItems = [...filteredItems].sort((a, b) => {
    if (sortOrder === "popular") {
      if (a.popular && !b.popular) return -1
      if (!a.popular && b.popular) return 1
      return 0
    } else if (sortOrder === "priceAsc") {
      return a.price.gloCoins - b.price.gloCoins
    } else if (sortOrder === "priceDesc") {
      return b.price.gloCoins - a.price.gloCoins
    } else if (sortOrder === "bestValue") {
      if (a.bestValue && !b.bestValue) return -1
      if (!a.bestValue && b.bestValue) return 1
      return 0
    }
    return 0
  })

  // Add item to cart
  const addToCart = (item: any) => {
    const existingItem = cart.find((cartItem) => cartItem.id === item.id)

    if (existingItem) {
      setCart(
        cart.map((cartItem) =>
          cartItem.id === item.id ? { ...cartItem, cartQuantity: cartItem.cartQuantity + 1 } : cartItem,
        ),
      )
    } else {
      setCart([...cart, { ...item, cartQuantity: 1 }])
    }

    toast({
      title: "Added to cart",
      description: `${item.name} has been added to your cart.`,
      duration: 3000,
    })
  }

  // Remove item from cart
  const removeFromCart = (itemId: number) => {
    setCart(cart.filter((item) => item.id !== itemId))
  }

  // Update item quantity in cart
  const updateCartItemQuantity = (itemId: number, newQuantity: number) => {
    if (newQuantity < 1) {
      removeFromCart(itemId)
      return
    }

    setCart(cart.map((item) => (item.id === itemId ? { ...item, cartQuantity: newQuantity } : item)))
  }

  // Calculate cart total
  const cartTotal = cart.reduce((total, item) => {
    return total + item.price[paymentMethod === "gloCoins" ? "gloCoins" : "realMoney"] * item.cartQuantity
  }, 0)

  // Process checkout
  const processCheckout = () => {
    setIsProcessing(true)

    // Simulate processing delay
    setTimeout(() => {
      setIsProcessing(false)
      setIsSuccess(true)

      // Reset after success
      setTimeout(() => {
        setCart([])
        setIsCheckoutOpen(false)
        setIsSuccess(false)
      }, 2000)
    }, 2000)
  }

  // Get badge for item
  const getItemBadge = (item: any) => {
    if (item.popular) {
      return (
        <Badge variant="outline" className="bg-purple-900/50 text-purple-300 border-purple-800">
          Popular
        </Badge>
      )
    }

    if (item.bestValue) {
      return (
        <Badge variant="outline" className="bg-green-900/50 text-green-300 border-green-800">
          Best Value
        </Badge>
      )
    }

    if (item.limited) {
      return (
        <Badge variant="outline" className="bg-amber-900/50 text-amber-300 border-amber-800">
          Limited
        </Badge>
      )
    }

    return null
  }

  // Get icon for category
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "energy":
        return <Zap className="h-5 w-5 text-purple-500 neon-teal-glow" />
      case "blocoins":
        return (
          <div className="h-5 w-5 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center">
            <span className="text-white font-bold text-[10px]">B</span>
          </div>
        )
      case "keys":
        return <Key className="h-5 w-5 text-amber-500" />
      case "geekeys":
        return <Shield className="h-5 w-5 text-blue-500" />
      case "boosters":
        return <Sparkles className="h-5 w-5 text-yellow-500" />
      case "bundles":
        return <Gift className="h-5 w-5 text-pink-500" />
      default:
        return <Package className="h-5 w-5 text-gray-400" />
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div className="flex-1">
          <h1 className="text-2xl font-bold tracking-tight text-gray-100">In-Platform Shop</h1>
          <p className="text-muted-foreground">Purchase energy packs, coins, and other resources for your campaigns</p>
        </div>

        <div className="flex items-center gap-2">
          <Drawer open={isCartOpen} onOpenChange={setIsCartOpen}>
            <DrawerTrigger asChild>
              <Button variant="outline" className="relative border-gray-700 text-gray-100">
                <ShoppingCart className="h-4 w-4 mr-2" />
                Cart
                {cart.length > 0 && (
                  <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-purple-600 text-white text-xs flex items-center justify-center">
                    {cart.length}
                  </span>
                )}
              </Button>
            </DrawerTrigger>
            <DrawerContent className="bg-gray-900 border-t border-gray-700">
              <DrawerHeader>
                <DrawerTitle className="text-gray-100">Your Cart</DrawerTitle>
                <DrawerDescription>Review your items before checkout</DrawerDescription>
              </DrawerHeader>
              <div className="px-4">
                <ScrollArea className="h-[50vh]">
                  {cart.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-8 text-center">
                      <ShoppingCart className="h-12 w-12 text-gray-500 mb-4" />
                      <p className="text-gray-400">Your cart is empty</p>
                      <p className="text-sm text-gray-500 mt-1">Add items from the shop to get started</p>
                      <Button
                        variant="outline"
                        className="mt-4 border-gray-700 text-gray-100"
                        onClick={() => setIsCartOpen(false)}
                      >
                        Continue Shopping
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4 py-4">
                      {cart.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center justify-between gap-4 pb-4 border-b border-gray-700"
                        >
                          <div className="flex items-center gap-3">
                            <div className="h-12 w-12 rounded-md bg-gray-800 overflow-hidden">
                              <img
                                src={item.image || "/placeholder.svg"}
                                alt={item.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-100">{item.name}</h4>
                              <div className="flex items-center gap-2 mt-1">
                                <div className="flex items-center">
                                  <Button
                                    variant="outline"
                                    size="icon"
                                    className="h-6 w-6 rounded-r-none border-gray-700"
                                    onClick={() => updateCartItemQuantity(item.id, item.cartQuantity - 1)}
                                  >
                                    <ChevronDown className="h-3 w-3" />
                                  </Button>
                                  <div className="h-6 px-2 flex items-center justify-center border-y border-gray-700 text-xs">
                                    {item.cartQuantity}
                                  </div>
                                  <Button
                                    variant="outline"
                                    size="icon"
                                    className="h-6 w-6 rounded-l-none border-gray-700"
                                    onClick={() => updateCartItemQuantity(item.id, item.cartQuantity + 1)}
                                  >
                                    <ChevronUp className="h-3 w-3" />
                                  </Button>
                                </div>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-6 w-6 text-gray-500 hover:text-gray-300"
                                  onClick={() => removeFromCart(item.id)}
                                >
                                  <X className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center justify-end gap-1">
                              {paymentMethod === "gloCoins" ? (
                                <>
                                  <div className="h-4 w-4 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600 flex items-center justify-center">
                                    <span className="text-white font-bold text-[8px]">G</span>
                                  </div>
                                  <span className="font-medium stat-value-amber">
                                    {(item.price.gloCoins * item.cartQuantity).toLocaleString()}
                                  </span>
                                </>
                              ) : (
                                <span className="font-medium text-gray-100">
                                  ${(item.price.realMoney * item.cartQuantity).toFixed(2)}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </ScrollArea>
              </div>
              {cart.length > 0 && (
                <>
                  <div className="px-4 py-2">
                    <div className="bg-gray-800 rounded-md p-4 border border-gray-700">
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-400">Subtotal</span>
                        <div className="flex items-center gap-1">
                          {paymentMethod === "gloCoins" ? (
                            <>
                              <div className="h-4 w-4 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600 flex items-center justify-center">
                                <span className="text-white font-bold text-[8px]">G</span>
                              </div>
                              <span className="font-medium stat-value-amber">{cartTotal.toLocaleString()}</span>
                            </>
                          ) : (
                            <span className="font-medium text-gray-100">${cartTotal.toFixed(2)}</span>
                          )}
                        </div>
                      </div>
                      <Separator className="my-2 bg-gray-700" />
                      <div className="flex justify-between">
                        <span className="text-gray-100 font-medium">Total</span>
                        <div className="flex items-center gap-1">
                          {paymentMethod === "gloCoins" ? (
                            <>
                              <div className="h-4 w-4 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600 flex items-center justify-center">
                                <span className="text-white font-bold text-[8px]">G</span>
                              </div>
                              <span className="font-medium stat-value-amber">{cartTotal.toLocaleString()}</span>
                            </>
                          ) : (
                            <span className="font-medium text-gray-100">${cartTotal.toFixed(2)}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="px-4 py-2">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm text-gray-400">Payment Method</span>
                      <div className="flex gap-2">
                        <Button
                          variant={paymentMethod === "gloCoins" ? "default" : "outline"}
                          size="sm"
                          className={
                            paymentMethod === "gloCoins"
                              ? "bg-gradient-to-r from-yellow-600 to-amber-600"
                              : "border-gray-700 text-gray-300"
                          }
                          onClick={() => setPaymentMethod("gloCoins")}
                        >
                          <div className="h-4 w-4 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600 flex items-center justify-center mr-1">
                            <span className="text-white font-bold text-[8px]">G</span>
                          </div>
                          Glo-Coins
                        </Button>
                        <Button
                          variant={paymentMethod === "realMoney" ? "default" : "outline"}
                          size="sm"
                          className={
                            paymentMethod === "realMoney"
                              ? "bg-gradient-to-r from-green-600 to-emerald-600"
                              : "border-gray-700 text-gray-300"
                          }
                          onClick={() => setPaymentMethod("realMoney")}
                        >
                          $ Real Money
                        </Button>
                      </div>
                    </div>
                  </div>
                </>
              )}
              <DrawerFooter>
                {cart.length > 0 && (
                  <Dialog open={isCheckoutOpen} onOpenChange={setIsCheckoutOpen}>
                    <DialogTrigger asChild>
                      <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                        Proceed to Checkout
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-gray-900 border-gray-700 text-gray-100">
                      <DialogHeader>
                        <DialogTitle>Checkout</DialogTitle>
                        <DialogDescription>Complete your purchase</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        {isSuccess ? (
                          <div className="flex flex-col items-center justify-center py-8 text-center">
                            <div className="h-16 w-16 rounded-full bg-green-900/30 flex items-center justify-center mb-4 border border-green-700">
                              <Check className="h-8 w-8 text-green-500" />
                            </div>
                            <h3 className="text-xl font-medium text-gray-100">Purchase Complete!</h3>
                            <p className="text-gray-400 mt-2">Your items have been added to your inventory</p>
                          </div>
                        ) : (
                          <>
                            <div className="bg-gray-800 rounded-md p-4 border border-gray-700">
                              <h3 className="font-medium mb-2">Order Summary</h3>
                              <div className="space-y-2">
                                {cart.map((item) => (
                                  <div key={item.id} className="flex justify-between text-sm">
                                    <span>
                                      {item.name} × {item.cartQuantity}
                                    </span>
                                    <div className="flex items-center gap-1">
                                      {paymentMethod === "gloCoins" ? (
                                        <>
                                          <div className="h-3 w-3 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600 flex items-center justify-center">
                                            <span className="text-white font-bold text-[6px]">G</span>
                                          </div>
                                          <span>{(item.price.gloCoins * item.cartQuantity).toLocaleString()}</span>
                                        </>
                                      ) : (
                                        <span>${(item.price.realMoney * item.cartQuantity).toFixed(2)}</span>
                                      )}
                                    </div>
                                  </div>
                                ))}
                                <Separator className="my-2 bg-gray-700" />
                                <div className="flex justify-between font-medium">
                                  <span>Total</span>
                                  <div className="flex items-center gap-1">
                                    {paymentMethod === "gloCoins" ? (
                                      <>
                                        <div className="h-4 w-4 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600 flex items-center justify-center">
                                          <span className="text-white font-bold text-[8px]">G</span>
                                        </div>
                                        <span className="stat-value-amber">{cartTotal.toLocaleString()}</span>
                                      </>
                                    ) : (
                                      <span>${cartTotal.toFixed(2)}</span>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>

                            {paymentMethod === "gloCoins" && (
                              <div className="bg-gray-800 rounded-md p-4 border border-gray-700">
                                <div className="flex justify-between items-center mb-2">
                                  <h3 className="font-medium">Your Balance</h3>
                                  <div className="flex items-center gap-1">
                                    <div className="h-4 w-4 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600 flex items-center justify-center">
                                      <span className="text-white font-bold text-[8px]">G</span>
                                    </div>
                                    <span className="stat-value-amber">{userWallet.gloCoins.toLocaleString()}</span>
                                  </div>
                                </div>

                                {cartTotal > userWallet.gloCoins ? (
                                  <div className="bg-red-900/30 p-3 rounded-md border border-red-800 text-sm text-red-300 mb-2">
                                    You don't have enough Glo-Coins for this purchase. Please add more coins or choose a
                                    different payment method.
                                  </div>
                                ) : (
                                  <div className="bg-green-900/30 p-3 rounded-md border border-green-800 text-sm text-green-300 mb-2">
                                    You have enough Glo-Coins for this purchase.
                                  </div>
                                )}

                                <div className="flex justify-between text-sm">
                                  <span>Balance after purchase</span>
                                  <div className="flex items-center gap-1">
                                    <div className="h-3 w-3 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600 flex items-center justify-center">
                                      <span className="text-white font-bold text-[6px]">G</span>
                                    </div>
                                    <span>{Math.max(0, userWallet.gloCoins - cartTotal).toLocaleString()}</span>
                                  </div>
                                </div>
                              </div>
                            )}

                            {paymentMethod === "realMoney" && (
                              <div className="bg-gray-800 rounded-md p-4 border border-gray-700">
                                <h3 className="font-medium mb-3">Payment Details</h3>
                                <div className="space-y-3">
                                  <div>
                                    <label className="text-sm text-gray-400 mb-1 block">Card Number</label>
                                    <Input
                                      placeholder="1234 5678 9012 3456"
                                      className="bg-gray-700 border-gray-600 text-gray-100"
                                    />
                                  </div>
                                  <div className="grid grid-cols-2 gap-3">
                                    <div>
                                      <label className="text-sm text-gray-400 mb-1 block">Expiry Date</label>
                                      <Input
                                        placeholder="MM/YY"
                                        className="bg-gray-700 border-gray-600 text-gray-100"
                                      />
                                    </div>
                                    <div>
                                      <label className="text-sm text-gray-400 mb-1 block">CVC</label>
                                      <Input placeholder="123" className="bg-gray-700 border-gray-600 text-gray-100" />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                          </>
                        )}
                      </div>
                      <DialogFooter>
                        {isSuccess ? (
                          <Button
                            onClick={() => {
                              setIsCheckoutOpen(false)
                              setIsCartOpen(false)
                            }}
                            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                          >
                            Continue Shopping
                          </Button>
                        ) : (
                          <>
                            <Button
                              variant="outline"
                              onClick={() => setIsCheckoutOpen(false)}
                              className="border-gray-700 text-gray-300"
                            >
                              Cancel
                            </Button>
                            <Button
                              onClick={processCheckout}
                              disabled={
                                isProcessing || (paymentMethod === "gloCoins" && cartTotal > userWallet.gloCoins)
                              }
                              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:from-gray-700 disabled:to-gray-800 disabled:text-gray-500"
                            >
                              {isProcessing ? (
                                <>
                                  <svg
                                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                  >
                                    <circle
                                      className="opacity-25"
                                      cx="12"
                                      cy="12"
                                      r="10"
                                      stroke="currentColor"
                                      strokeWidth="4"
                                    ></circle>
                                    <path
                                      className="opacity-75"
                                      fill="currentColor"
                                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    ></path>
                                  </svg>
                                  Processing...
                                </>
                              ) : (
                                `Complete Purchase (${paymentMethod === "gloCoins" ? `${cartTotal.toLocaleString()} Glo-Coins` : `$${cartTotal.toFixed(2)}`})`
                              )}
                            </Button>
                          </>
                        )}
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                )}
                <DrawerClose asChild>
                  <Button variant="outline" className="border-gray-700 text-gray-300">
                    Continue Shopping
                  </Button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>

          <Button variant={viewMode === "grid" ? "default" : "outline"} size="icon" onClick={() => setViewMode("grid")}>
            <Grid3X3 className="h-4 w-4" />
          </Button>
          <Button variant={viewMode === "list" ? "default" : "outline"} size="icon" onClick={() => setViewMode("list")}>
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search items..."
            className="pl-8 bg-gray-800 border-gray-700 text-gray-100"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex gap-2">
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-[180px] bg-gray-800 border-gray-700 text-gray-100">
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-700 text-gray-100">
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="energy">Energy Packs</SelectItem>
              <SelectItem value="blocoins">Blo-Coins</SelectItem>
              <SelectItem value="keys">Keys</SelectItem>
              <SelectItem value="geekeys">Geekeys</SelectItem>
              <SelectItem value="boosters">Boosters</SelectItem>
              <SelectItem value="bundles">Bundles</SelectItem>
            </SelectContent>
          </Select>

          <Select value={sortOrder} onValueChange={setSortOrder}>
            <SelectTrigger className="w-[180px] bg-gray-800 border-gray-700 text-gray-100">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-700 text-gray-100">
              <SelectItem value="popular">Popular</SelectItem>
              <SelectItem value="priceAsc">Price: Low to High</SelectItem>
              <SelectItem value="priceDesc">Price: High to Low</SelectItem>
              <SelectItem value="bestValue">Best Value</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Special Offer Banner */}
      <div className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 border border-purple-800 rounded-lg p-4 flex items-center gap-3">
        <div className="h-12 w-12 rounded-full bg-purple-900/30 flex items-center justify-center border border-purple-800">
          <Gift className="h-6 w-6 text-purple-400" />
        </div>
        <div className="flex-1">
          <h3 className="font-medium text-purple-300">Special Offer: First Purchase Bonus!</h3>
          <p className="text-sm text-purple-200">Get 20% extra Glo-Coins on your first purchase. Limited time offer!</p>
        </div>
        <div>
          <div className="flex items-center gap-2">
            <div className="text-xs text-purple-300 flex items-center">
              <Clock className="h-3 w-3 mr-1" />
              Ends in: 2d 14h
            </div>
            <Button
              size="sm"
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            >
              Claim Now
            </Button>
          </div>
        </div>
      </div>

      {/* Items Grid/List */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {sortedItems.map((item) => (
            <Card
              key={item.id}
              className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-gray-900 to-gray-800 cyber-grid-bg"
            >
              <div className="h-[100px] bg-gray-800 relative flex items-center justify-center p-4">
                <div className="absolute inset-0 flex items-center justify-center">
                  {getCategoryIcon(item.category)}
                </div>
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  className="w-full h-full object-contain z-10 opacity-90"
                />
                {(item.popular || item.bestValue || item.limited) && (
                  <div className="absolute top-2 right-2">{getItemBadge(item)}</div>
                )}
              </div>
              <CardHeader className="pb-2 text-gray-100">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{item.name}</CardTitle>
                </div>
                <CardDescription className="text-gray-400">{item.description}</CardDescription>
              </CardHeader>
              <CardContent className="pb-2 text-gray-200">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <div className="flex items-center gap-1">
                      <div className="h-5 w-5 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600 flex items-center justify-center">
                        <span className="text-white font-bold text-[10px]">G</span>
                      </div>
                      <span className="font-medium stat-value-amber">{item.price.gloCoins.toLocaleString()}</span>
                    </div>
                    <div className="text-gray-400 text-sm">${item.price.realMoney.toFixed(2)}</div>
                  </div>

                  {item.quantity > 1 && (
                    <div className="flex items-center gap-1 text-xs text-gray-400">
                      <Package className="h-3 w-3" />
                      <span>Quantity: {item.quantity}</span>
                    </div>
                  )}

                  {item.expiresIn && (
                    <div className="flex items-center gap-1 text-xs text-amber-300">
                      <Clock className="h-3 w-3" />
                      <span>{item.expiresIn}</span>
                    </div>
                  )}

                  {item.includes && (
                    <div className="bg-gray-800 rounded-md p-2 border border-gray-700">
                      <div className="text-xs text-gray-400 mb-1">Bundle includes:</div>
                      <ul className="text-xs space-y-1">
                        {item.includes.map((included, index) => (
                          <li key={index} className="flex items-center gap-1">
                            <div className="h-1.5 w-1.5 rounded-full bg-blue-500"></div>
                            <span>
                              {included.name} × {included.quantity}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter className="pt-0">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                      onClick={() => setSelectedItem(item)}
                    >
                      View Details
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-gray-900 border-gray-700 text-gray-100">
                    <DialogHeader>
                      <DialogTitle>{item.name}</DialogTitle>
                      <DialogDescription className="text-gray-400">{item.description}</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="h-[120px] bg-gray-800 rounded-md overflow-hidden flex items-center justify-center">
                        <div className="absolute inset-0 flex items-center justify-center opacity-30">
                          {getCategoryIcon(item.category)}
                        </div>
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          className="w-full h-full object-contain z-10"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="flex flex-col gap-1">
                          <span className="text-xs text-muted-foreground">Glo-Coins Price</span>
                          <div className="flex items-center gap-1">
                            <div className="h-5 w-5 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600 flex items-center justify-center">
                              <span className="text-white font-bold text-[10px]">G</span>
                            </div>
                            <span className="font-medium stat-value-amber">{item.price.gloCoins.toLocaleString()}</span>
                          </div>
                        </div>

                        <div className="flex flex-col gap-1">
                          <span className="text-xs text-muted-foreground">Real Money Price</span>
                          <span className="font-medium text-gray-100">${item.price.realMoney.toFixed(2)}</span>
                        </div>
                      </div>

                      {item.quantity > 1 && (
                        <div className="bg-gray-800 rounded-md p-3 border border-gray-700">
                          <div className="flex items-center gap-2">
                            <Package className="h-4 w-4 text-blue-400" />
                            <span className="font-medium">Quantity: {item.quantity}</span>
                          </div>
                        </div>
                      )}

                      {item.expiresIn && (
                        <div className="bg-amber-900/20 rounded-md p-3 border border-amber-800">
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-amber-400" />
                            <span className="font-medium text-amber-300">Expires in: {item.expiresIn}</span>
                          </div>
                        </div>
                      )}

                      {item.includes && (
                        <div className="bg-gray-800 rounded-md p-3 border border-gray-700">
                          <h4 className="font-medium mb-2">Bundle includes:</h4>
                          <ul className="space-y-2">
                            {item.includes.map((included, index) => (
                              <li key={index} className="flex items-center gap-2">
                                <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                                <span>
                                  {included.name} × {included.quantity}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                    <DialogFooter>
                      <Button
                        variant="outline"
                        onClick={() => setSelectedItem(null)}
                        className="border-gray-700 hover:bg-gray-800"
                      >
                        Cancel
                      </Button>
                      <Button
                        className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                        onClick={() => {
                          addToCart(item)
                          setSelectedItem(null)
                        }}
                      >
                        Add to Cart
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {sortedItems.map((item) => (
            <Card
              key={item.id}
              className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-gray-900 to-gray-800"
            >
              <div className="flex flex-col md:flex-row">
                <div className="w-full md:w-[120px] h-[100px] md:h-auto bg-gray-800 relative flex items-center justify-center">
                  <div className="absolute inset-0 flex items-center justify-center">
                    {getCategoryIcon(item.category)}
                  </div>
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    className="w-full h-full object-contain z-10 opacity-90"
                  />
                  {(item.popular || item.bestValue || item.limited) && (
                    <div className="absolute top-2 right-2">{getItemBadge(item)}</div>
                  )}
                </div>
                <div className="flex-1 p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-gray-100">{item.name}</h3>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="h-5 w-5 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600 flex items-center justify-center">
                        <span className="text-white font-bold text-[10px]">G</span>
                      </div>
                      <span className="font-medium stat-value-amber">{item.price.gloCoins.toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-3">
                    <div className="flex flex-col gap-1">
                      <span className="text-xs text-muted-foreground">Real Money Price</span>
                      <span className="text-sm text-gray-200">${item.price.realMoney.toFixed(2)}</span>
                    </div>

                    {item.quantity > 1 && (
                      <div className="flex flex-col gap-1">
                        <span className="text-xs text-muted-foreground">Quantity</span>
                        <div className="flex items-center gap-1">
                          <Package className="h-4 w-4 text-blue-400" />
                          <span className="text-sm">{item.quantity}</span>
                        </div>
                      </div>
                    )}

                    {item.expiresIn && (
                      <div className="flex flex-col gap-1">
                        <span className="text-xs text-muted-foreground">Expires In</span>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4 text-amber-400" />
                          <span className="text-sm text-amber-300">{item.expiresIn}</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {item.includes && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {item.includes.map((included, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-1 text-xs bg-gray-800 p-1.5 rounded-md border border-gray-700"
                        >
                          <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                          <span>
                            {included.name} × {included.quantity}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="mt-3 flex justify-end">
                    <Button
                      variant="default"
                      size="sm"
                      className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                      onClick={() => addToCart(item)}
                    >
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

