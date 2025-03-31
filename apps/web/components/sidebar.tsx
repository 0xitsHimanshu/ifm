"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Home,
  BarChart,
  ShoppingBag,
  Wallet,
  Image,
  Settings,
  LogOut,
  User,
  Users,
  ChevronLeft,
  ChevronRight,
  Trophy,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { LogoutButton } from "./auth/logout-button"

export function DashboardSidebar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(true)

  // Define the navigation items
  const navigationItems = [
    { name: "Overview", href: "/dashboard", icon: Home, badge: null },
    { name: "Marketplace", href: "/dashboard/marketplace", icon: ShoppingBag, badge: "New" },
    { name: "Wallet", href: "/dashboard/wallet", icon: Wallet, badge: null },
    { name: "Campaigns", href: "/dashboard/campaigns", icon: BarChart, badge: "3" },
    { name: "Creatives", href: "/dashboard/creatives", icon: Image, badge: null },
    { name: "Groups", href: "/dashboard/groups", icon: Users, badge: "5" },
    { name: "Profile", href: "/dashboard/profile", icon: User, badge: null },
    { name: "Settings", href: "/dashboard/settings", icon: Settings, badge: null },
  ]

  const isActive = (path: string) => {
    return pathname === path
  }

  return (
    <div
      className={`h-screen ${
        open ? "w-64" : "w-20"
      } bg-gradient-to-br from-gray-900 to-gray-800 border-r border-gray-700 transition-all duration-300 flex flex-col relative`}
    >
      {/* Header */}
      <div className="p-4 border-b border-gray-700 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-gradient-to-r from-purple-600 to-blue-500 flex items-center justify-center shadow-neon-purple animate-pulse-glow">
            <Trophy className="h-4 w-4 text-white" />
          </div>
          {open && <div className="font-bold text-lg gaming-gradient-text">GameTriggers</div>}
        </div>
        <button
          onClick={() => setOpen(!open)}
          className="h-6 w-6 rounded-full bg-gray-800 flex items-center justify-center border border-gray-700 hover:bg-gray-700"
        >
          {open ? (
            <ChevronLeft className="h-4 w-4 text-gray-300" />
          ) : (
            <ChevronRight className="h-4 w-4 text-gray-300" />
          )}
        </button>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto py-4">
        {open && (
          <div className="px-4 mb-2">
            <h3 className="text-xs uppercase text-gray-500 font-semibold">Navigation</h3>
          </div>
        )}
        <ul className="space-y-1 px-2">
          {navigationItems.map((item) => (
            <li key={item.name}>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      href={item.href}
                      className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                        isActive(item.href)
                          ? "bg-gradient-to-r from-purple-600/40 to-blue-500/40 border-l-2 border-purple-500 text-white"
                          : "text-gray-300 hover:bg-gradient-to-r hover:from-purple-600/20 hover:to-blue-500/20 hover:text-white"
                      }`}
                    >
                      <item.icon className={`h-5 w-5 ${isActive(item.href) ? "text-white" : "text-gray-400"}`} />
                      {open && (
                        <>
                          <span className="flex-1">{item.name}</span>
                          {item.badge && (
                            <Badge
                              className={`${
                                item.badge === "New"
                                  ? "bg-gradient-to-r from-purple-600 to-blue-500"
                                  : "bg-gradient-to-r from-amber-500 to-red-500"
                              }`}
                              variant="outline"
                            >
                              {item.badge}
                            </Badge>
                          )}
                        </>
                      )}
                    </Link>
                  </TooltipTrigger>
                  {!open && (
                    <TooltipContent side="right">
                      {item.name}
                      {item.badge && ` (${item.badge})`}
                    </TooltipContent>
                  )}
                </Tooltip>
              </TooltipProvider>
            </li>
          ))}
        </ul>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-700">
        {open ? (
          <div className="flex justify-center">
            <LogoutButton isOpen={true}/>
          </div>
        ) : (
          <div className="flex justify-center">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <LogoutButton  isOpen={false}/>
                </TooltipTrigger>
                <TooltipContent side="right">Logout</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        )}
      </div>
    </div>
  )
}

